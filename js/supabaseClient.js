// Supabase Client Configuration
const SUPABASE_URL = window.APP_CONFIG?.SUPABASE_URL;
const SUPABASE_ANON_KEY = window.APP_CONFIG?.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in js/config.js');
}

// Initialize Supabase client (only if not already initialized)
if (!window.supabaseClient && SUPABASE_URL && SUPABASE_ANON_KEY) {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Use the client instance
const supabaseInstance = window.supabaseClient;

function getResetRedirectUrl() {
    return new URL('./auth-reset.html', window.location.href).toString();
}

// Auth helper functions
const auth = {
    // Get current user
    async getCurrentUser() {
        const { data: { user }, error } = await supabaseInstance.auth.getUser();
        if (error) {
            console.error('Error getting user:', error);
            return null;
        }
        return user;
    },

    // Check if user is approved
    async isUserApproved(userId) {
        const { data, error } = await supabaseInstance
            .from('approved_users')
            .select('approved, email')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error checking approval status:', error);
            return false;
        }

        return data && data.approved === true;
    },

    // Check if user is an admin
    async isAdmin(userId) {
        const { data, error } = await supabaseInstance
            .from('admins')
            .select('user_id')
            .eq('user_id', userId)
            .single();

        if (error) {
            return false;
        }

        return !!data;
    },

    // Update user presence
    async updatePresence(user) {
        const activeUser = user || await this.getCurrentUser();
        if (!activeUser) {
            return { success: false, error: 'No active user' };
        }

        const payload = {
            user_id: activeUser.id,
            email: activeUser.email,
            display_name: activeUser.user_metadata?.display_name || null,
            last_seen: new Date().toISOString()
        };

        const { error } = await supabaseInstance
            .from('user_presence')
            .upsert(payload);

        if (error) {
            console.error('Error updating presence:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    },

    // Sign up new user
    async signUp(email, password, displayName) {
        console.log('Starting signup process for:', email);
        
        const { data, error } = await supabaseInstance.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    display_name: displayName
                }
            }
        });

        if (error) {
            console.error('Supabase auth signup error:', error);
            return { success: false, error: error.message };
        }

        console.log('Auth signup successful:', data.user?.id);
        console.log('Database trigger should automatically create approved_users entry');
        
        // The database trigger (handle_new_user) will create the approved_users entry
        // No need to manually insert here

        return { success: true, data };
    },

    // Sign in user
    async signIn(email, password) {
        const { data, error } = await supabaseInstance.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Error signing in:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    },

    // Sign out user
    async signOut() {
        const { error } = await supabaseInstance.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
            return { success: false, error: error.message };
        }
        return { success: true };
    },

    // Send password reset email
    async resetPassword(email) {
        const { error } = await supabaseInstance.auth.resetPasswordForEmail(email, {
            redirectTo: getResetRedirectUrl()
        });

        if (error) {
            console.error('Error sending reset email:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    },

    // Update password after reset link
    async updatePassword(newPassword) {
        const { error } = await supabaseInstance.auth.updateUser({
            password: newPassword
        });

        if (error) {
            console.error('Error updating password:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    },

    // Delete account via Edge Function
    async deleteAccount() {
        // Get the current session to extract the access token
        const { data: { session }, error: sessionError } = await supabaseInstance.auth.getSession();
        
        if (sessionError || !session) {
            console.error('Error getting session:', sessionError);
            return { success: false, error: 'No active session found' };
        }

        console.log('Invoking delete-account Edge Function...');
        const { data, error } = await supabaseInstance.functions.invoke('delete-account', {
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        });

        if (error) {
            console.error('Error deleting account:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            return { success: false, error: error.message || 'Edge Function returned a non-2xx status code' };
        }

        console.log('Delete account response:', data);
        return { success: true, data };
    },

    // Listen to auth state changes
    onAuthStateChange(callback) {
        return supabaseInstance.auth.onAuthStateChange(callback);
    }
};

// Export for use in other scripts
window.auth = auth;
// supabaseClient is already set above
