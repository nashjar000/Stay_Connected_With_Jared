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

async function checkVideoJournalAccess() {
    // Wait for auth to be ready
    await waitForDependencies();
    
    const user = await auth.getCurrentUser();

    if (!user) {
        // Not logged in - redirect to login immediately
        const redirectUrl = encodeURIComponent(window.location.pathname);
        window.location.replace('../auth-login.html?redirect=' + redirectUrl);
        return;
    }

    // Check if user is approved
    const isApproved = await auth.isUserApproved(user.id);

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
