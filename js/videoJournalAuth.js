// Video Journal Authentication Protection
// This script checks if user is logged in and approved before allowing access

// Wait for all dependencies to load
function waitForDependencies() {
    return new Promise((resolve) => {
        if (window.auth && window.supabaseClient) {
            resolve();
        } else {
            setTimeout(() => {
                waitForDependencies().then(resolve);
            }, 50); // Check more frequently
        }
    });
}

async function isVideoJournalPublicAccessEnabled() {
    try {
        const { data, error } = await supabaseClient
            .from('app_settings')
            .select('setting_value')
            .eq('setting_key', 'video_journals_public_access')
            .maybeSingle();

        if (error) throw error;

        return !!(data && data.setting_value === true);
    } catch (error) {
        console.warn('Public access setting unavailable; defaulting to protected mode.', error);
        return false;
    }
}

async function checkVideoJournalAccess() {
    // Wait for auth to be ready
    await waitForDependencies();

    const publicAccessEnabled = await isVideoJournalPublicAccessEnabled();
    if (publicAccessEnabled) {
        document.body.style.display = 'block';
        return;
    }
    
    const user = await auth.getCurrentUser();

    if (!user) {
        // Not logged in - redirect to login immediately
        const redirectUrl = encodeURIComponent(window.location.pathname);
        window.location.replace('../auth-login.html?redirect=' + redirectUrl);
        return;
    }

    // Check if user is approved (admins always allowed)
    const isAdmin = await auth.isAdmin(user.id);
    const isApproved = isAdmin || await auth.isUserApproved(user.id);

    if (!isApproved) {
        // Not approved - redirect to pending page immediately
        window.location.replace('../auth-pending.html');
        return;
    }

    // User is approved - show content
    document.body.style.display = 'block';
}

// Run check immediately
checkVideoJournalAccess();
