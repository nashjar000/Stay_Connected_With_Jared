// User Status Component - Shows login/logout status in header

// Wait for dependencies
function waitForAuth() {
    return new Promise((resolve) => {
        if (window.auth && window.supabaseClient) {
            resolve();
        } else {
            setTimeout(() => {
                waitForAuth().then(resolve);
            }, 100);
        }
    });
}

function getHomePath() {
    return window.location.pathname.includes('/pages/') ? '../index.html' : './index.html';
}

async function initUserStatus() {
    await waitForAuth();
    
    // Wait for user-status container to exist (since header.js creates it)
    let userStatusContainer = document.getElementById('user-status');
    let attempts = 0;
    while (!userStatusContainer && attempts < 50) {
        await new Promise(resolve => setTimeout(resolve, 100));
        userStatusContainer = document.getElementById('user-status');
        attempts++;
    }
    
    if (!userStatusContainer) {
        return;
    }
    
    // Detect if we're in a subdirectory
    const pathPrefix = window.location.pathname.includes('/pages/') ? '../' : './';
    
    try {
        const user = await auth.getCurrentUser();
        
        if (user) {
            // User is logged in
            const displayName = user.user_metadata?.display_name || user.email.split('@')[0];
            const isAdmin = await auth.isAdmin(user.id);
            const isApproved = isAdmin || await auth.isUserApproved(user.id);

            startPresenceHeartbeat(user);
            
            // Show admin link if user is admin
            const adminLink = isAdmin ? `<a href="${pathPrefix}admin-dashboard.html" class="admin-link">Admin Dashboard</a>` : '';
            
            userStatusContainer.innerHTML = `
                <div class="user-status-logged-in">
                    <span class="user-greeting">Hi, ${displayName}!</span>
                    ${isApproved ? '<span class="status-badge approved">✓ Approved</span>' : '<span class="status-badge pending">⏳ Pending</span>'}
                    ${adminLink}
                    <button onclick="handleDeleteAccount()" class="delete-button">Delete Account</button>
                    <button onclick="handleLogout()" class="logout-button">Log Out</button>
                </div>
            `;
        } else {
            // User is not logged in
            stopPresenceHeartbeat();
            userStatusContainer.innerHTML = `
                <div class="user-status-logged-out">
                    <a href="${pathPrefix}auth-login.html" class="login-link">Log In</a>
                    <a href="${pathPrefix}auth-signup.html" class="signup-link">Sign Up</a>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading user status:', error);
        // Show login option on error
        userStatusContainer.innerHTML = `
            <div class="user-status-logged-out">
                <a href="${pathPrefix}auth-login.html" class="login-link">Log In</a>
            </div>
        `;
    }
}

async function handleLogout() {
    await waitForAuth();
    const confirmed = confirm('Are you sure you want to log out?');
    if (confirmed) {
        stopPresenceHeartbeat();
        await auth.signOut();
        window.location.href = getHomePath();
    }
}

async function handleDeleteAccount() {
    await waitForAuth();
    const confirmed = confirm('This will permanently delete your account. Are you sure?');
    if (!confirmed) {
        return;
    }

    const result = await auth.deleteAccount();

    if (!result.success) {
        alert(result.error || 'Unable to delete account. Please try again.');
        return;
    }

    stopPresenceHeartbeat();
    await auth.signOut();
    alert('Your account has been deleted.');
    window.location.href = getHomePath();
}

function startPresenceHeartbeat(user) {
    if (window.presenceInterval) {
        return;
    }

    auth.updatePresence(user);
    window.presenceInterval = setInterval(() => {
        auth.updatePresence(user);
    }, 60000);
}

function stopPresenceHeartbeat() {
    if (window.presenceInterval) {
        clearInterval(window.presenceInterval);
        window.presenceInterval = null;
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUserStatus);
} else {
    initUserStatus();
}

// Make handleLogout available globally
window.handleLogout = handleLogout;
window.handleDeleteAccount = handleDeleteAccount;
