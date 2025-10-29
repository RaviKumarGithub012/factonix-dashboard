// Authentication Guard - Add to all main pages (index.html, courses.html, etc.)
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Add logout functionality to header
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn-outline-light ms-2';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt me-1"></i> Logout';
    logoutBtn.onclick = logout;
    
    const actionContainer = document.querySelector('.d-flex.align-items-center');
    if (actionContainer && !actionContainer.querySelector('.btn[onclick="logout()"]')) {
        actionContainer.appendChild(logoutBtn);
    }
});

function checkAuth() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    
    try {
        const user = JSON.parse(userData);
        // Validate token expiration (simple check)
        const tokenData = atob(token).split(':');
        if (Date.now() - parseInt(tokenData[1]) > 24 * 60 * 60 * 1000) { // 24h expiration
            logout();
            return false;
        }
        return true;
    } catch (e) {
        logout();
        return false;
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('completedAssignments');
    window.location.href = 'login.html';
}

// Export for use in other scripts
window.checkAuth = checkAuth;
window.logout = logout;