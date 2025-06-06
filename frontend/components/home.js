import { settings } from "./settings.js";

function isUserLoggedIn() {
    const authToken = localStorage.getItem("authToken");
    const loggedUser = localStorage.getItem("loggedUser");
    
    return authToken && loggedUser && authToken.trim() !== "" && loggedUser !== "null";
}

function getLoggedUserData() {
    try {
        const loggedUser = localStorage.getItem("loggedUser");
        if (loggedUser && loggedUser !== "null") {
            return JSON.parse(loggedUser);
        }
    } catch (error) {
        console.error("Error parsing logged user data:", error);
    }
    return null;
}

function updateUIForLoginStatus() {
    const settingsButton = $$("settings_button");
    const topNavSettings = $$("top_nav_settings");
    const topNavLogout = $$("top_nav_logout");
    const topNavLogin = $$("top_nav_login");
    const loginForm = $$("login_form");
    const userDashboard = $$("user_dashboard_card");
    const loggedUser = getLoggedUserData();
    const isLoggedIn = isUserLoggedIn();
    
    if (settingsButton) {
        if (isLoggedIn && loggedUser) {
            settingsButton.show();
        } else {
            settingsButton.hide();
        }
    }
    
    
    if (topNavSettings) {
        if (isLoggedIn) {
            topNavSettings.show();
        } else {
            topNavSettings.hide();
        }
    }
    
    if (topNavLogout) {
        if (isLoggedIn) {
            topNavLogout.show();
        } else {
            topNavLogout.hide();
        }
    }
    
    if (topNavLogin) {
        if (!isLoggedIn) {
            topNavLogin.show();
        } else {
            topNavLogin.hide();
        }
    }
    
   
    if (loginForm && userDashboard) {
        if (isLoggedIn) {
            loginForm.hide();
            userDashboard.show();
        } else {
            loginForm.show();
            userDashboard.hide();
        }
    }
    
   
    const headerTemplate = $$("header_template");
    if (headerTemplate) {
        headerTemplate.refresh();
    }
    
   
    const userInfo = $$("top_nav_user_info");
    if (userInfo) {
        userInfo.refresh();
    }
    
  
    if (userDashboard && isLoggedIn) {
        userDashboard.refresh();
    }
}


const headerStyles = `
    .modern-header-banner {
        position: relative;
        overflow: hidden;
        border-radius: 0 0 24px 24px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .header-content {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header-background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-size: 400% 400%;
        animation: gradientShift 8s ease infinite;
        z-index: 1;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .header-background-image::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            135deg,
            rgba(45, 55, 72, 0.3) 0%,
            rgba(79, 172, 254, 0.2) 50%,
            rgba(0, 242, 254, 0.1) 100%
        );
        z-index: 2;
    }

    .header-content-inner {
        position: relative;
        z-index: 3;
        text-align: center;
        color: white;
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
        animation: fadeInUp 1s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .header-title {
        font-size: 2.8rem;
        font-weight: 800;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        line-height: 1.2;
        background: linear-gradient(45deg, #ffffff, #e2e8f0);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .subtitle {
        font-size: 1.3rem;
        font-weight: 500;
        opacity: 0.95;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
        line-height: 1.5;
        color: #f7fafc;
    }

    /* Modern Top Navigation */
    .modern-top-nav {
        background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        border-bottom: 3px solid #667eea;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .app-logo-container {
        display: flex;
        align-items: center;
        padding: 8px 0;
    }

    .logo-content {
        display: flex;
        align-items: center;
        color: #e2e8f0;
        font-weight: 600;
    }

    .logo-icon {
        font-size: 28px;
        margin-right: 12px;
        color: #667eea;
    }

    .logo-text {
        font-size: 18px;
        letter-spacing: 0.5px;
    }

    .user-info-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 8px 0;
    }

    .user-info {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 12px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }

    .user-info:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
    }

    .user-avatar {
        margin-right: 10px;
    }

    .avatar {
        border: 2px solid #667eea !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .user-details {
        display: flex;
        flex-direction: column;
        color: #e2e8f0;
    }

    .user-name {
        font-size: 13px;
        font-weight: 600;
        line-height: 1.2;
    }

    .user-status {
        font-size: 11px;
        opacity: 0.8;
        color: #68d391;
    }

    .top-nav-btn {
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
    }

    .top-nav-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    }

    /* User Dashboard Styles - Enhanced */
    .user-dashboard {
        padding: 24px;
        background: linear-gradient(135deg, #4299e1 0%, #667eea 50%, #805ad5 100%);
        border-radius: 20px;
        color: white;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .user-dashboard::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
        pointer-events: none;
    }

    .user-dashboard:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
    }

    .dashboard-header {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        position: relative;
        z-index: 2;
    }

    .dashboard-avatar {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
        font-size: 22px;
        font-weight: bold;
        border: 2px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .dashboard-user-info h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .dashboard-user-info p {
        margin: 4px 0 0 0;
        opacity: 0.85;
        font-size: 14px;
        font-weight: 500;
    }

    .dashboard-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin: 24px 0;
        position: relative;
        z-index: 2;
    }

    .stat-item {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .stat-item:hover {
        transform: translateY(-3px);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    }

    .stat-number {
        display: block;
        font-size: 28px;
        font-weight: 800;
        margin-bottom: 6px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .stat-label {
        font-size: 12px;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
    }

    .dashboard-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
        position: relative;
        z-index: 2;
    }

    .dashboard-btn {
        flex: 1;
        padding: 14px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
        color: white;
        border-radius: 12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 600;
        backdrop-filter: blur(10px);
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .dashboard-btn:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .dashboard-btn i {
        margin-right: 8px;
        font-size: 16px;
    }

    .recent-activity {
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        position: relative;
        z-index: 2;
    }

    .activity-title {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 12px;
        opacity: 0.95;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .activity-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        font-size: 13px;
        opacity: 0.85;
        transition: opacity 0.3s ease;
    }

    .activity-item:hover {
        opacity: 1;
    }

    .activity-icon {
        width: 24px;
        margin-right: 12px;
        text-align: center;
        font-size: 16px;
    }

    /* Login/Signup Form Cards */
    .modern-login-card {
        background: linear-gradient(135deg, #ffffff 0%, #f7fafc 100%);
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .modern-login-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
    }

    @keyframes shimmer {
        0%, 100% { background-position: 200% 0; }
        50% { background-position: -200% 0; }
    }

    .modern-login-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    }

    .card-header-template {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-title {
        font-size: 24px;
        font-weight: 700;
        color: #2d3748;
        text-align: center;
        margin: 0;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .btn-modern {
        border-radius: 12px !important;
        font-weight: 600 !important;
        letter-spacing: 0.5px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
    }

    .btn-modern:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
    }

    /* Info and Feature Cards */
    .modern-info-card, .modern-feature-card {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border-radius: 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        border: 1px solid #e2e8f0;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .modern-info-card::before, .modern-feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #48bb78, #38b2ac, #4299e1);
    }

    .modern-info-card:hover, .modern-feature-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .info-content, .feature-content {
        display: flex;
        align-items: flex-start;
        padding: 24px;
        height: 100%;
    }

    .info-icon-container, .feature-icon-container {
        width: 64px;
        height: 64px;
        border-radius: 16px;
        background: linear-gradient(135deg, #48bb78, #38b2ac);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        flex-shrink: 0;
        box-shadow: 0 4px 16px rgba(72, 187, 120, 0.3);
    }

    .feature-icon-container {
        background: linear-gradient(135deg, #4299e1, #667eea);
        box-shadow: 0 4px 16px rgba(66, 153, 225, 0.3);
    }

    .info-icon, .feature-icon {
        font-size: 28px;
        color: white;
    }

    .info-text, .feature-text {
        flex: 1;
    }

    .info-title, .feature-title {
        font-size: 20px;
        font-weight: 700;
        color: #2d3748;
        margin: 0 0 12px 0;
        line-height: 1.3;
    }

    .info-description {
        font-size: 14px;
        color: #4a5568;
        line-height: 1.6;
        margin: 0;
    }

    .feature-list {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 14px;
        color: #4a5568;
    }

    .feature-list li {
        padding: 6px 0;
        padding-left: 20px;
        position: relative;
        line-height: 1.5;
    }

    .feature-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #48bb78;
        font-weight: bold;
        font-size: 16px;
    }

    /* Layout */
    .modern-home-ui {
        background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
        min-height: 100vh;
    }

    /* Responsive Design scheme */
    @media screen and (max-width: 1024px) {
        .header-title {
            font-size: 2.2rem;
        }
        
        .subtitle {
            font-size: 1.15rem;
        }

        .user-dashboard {
            padding: 20px;
        }

        .dashboard-stats {
            grid-template-columns: 1fr;
            gap: 12px;
        }

        .dashboard-actions {
            flex-direction: column;
            gap: 10px;
        }

        .dashboard-btn {
            margin-bottom: 0;
        }

        .info-content, .feature-content {
            padding: 20px;
        }
    }

    @media screen and (max-width: 768px) {
        .header-title {
            font-size: 2rem;
        }

        .subtitle {
            font-size: 1.1rem;
        }

        .logo-text {
            display: none;
        }

        .user-info {
            flex-direction: column;
            align-items: center;
            padding: 6px 8px;
        }

        .user-details {
            display: none;
        }

        .dashboard-header {
            flex-direction: column;
            text-align: center;
        }

        .dashboard-avatar {
            margin: 0 auto 12px;
        }

        .info-content, .feature-content {
            flex-direction: column;
            text-align: center;
            padding: 18px;
        }

        .info-icon-container, .feature-icon-container {
            margin: 0 auto 16px;
        }
    }

    @media screen and (max-width: 480px) {
        .header-title {
            font-size: 1.7rem;
        }

        .subtitle {
            font-size: 1rem;
        }

        .user-dashboard {
            padding: 16px;
        }

        .dashboard-stats {
            gap: 10px;
            margin: 16px 0;
        }

        .stat-item {
            padding: 16px;
        }

        .stat-number {
            font-size: 24px;
        }

        .dashboard-actions {
            gap: 8px;
            margin-top: 16px;
        }

        .dashboard-btn {
            padding: 12px;
            font-size: 13px;
        }

        .info-content, .feature-content {
            padding: 16px;
        }

        .info-icon-container, .feature-icon-container {
            width: 48px;
            height: 48px;
            margin-bottom: 12px;
        }

        .info-icon, .feature-icon {
            font-size: 24px;
        }

        .info-title, .feature-title {
            font-size: 18px;
        }

        .info-description, .feature-list {
            font-size: 13px;
        }
    }

    /* iPad Pro (1024x1366)  Styles */
    @media screen and (min-width: 1024px) and (max-width: 1366px) {
        .header-title {
            font-size: 2.4rem;
            line-height: 1.3;
        }
        
        .subtitle {
            font-size: 1.2rem;
            line-height: 1.4;
        }

        .user-dashboard {
            padding: 28px;
            min-height: 420px;
        }

        .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
        }

        .dashboard-actions {
            flex-direction: row;
            gap: 14px;
        }

        .dashboard-btn {
            padding: 16px;
            font-size: 15px;
        }

        .info-content, .feature-content {
            padding: 28px;
        }

        .info-icon-container, .feature-icon-container {
            width: 68px;
            height: 68px;
        }

        .info-icon, .feature-icon {
            font-size: 30px;
        }
    }

    /* iPhone 12 Pro (390x844)  Styles */
    @media screen and (max-width: 390px) {
        .header-title {
            font-size: 1.6rem;
            line-height: 1.2;
            margin-bottom: 0.8rem;
        }

        .subtitle {
            font-size: 0.95rem;
            line-height: 1.4;
        }

        .user-dashboard {
            padding: 14px;
            min-height: 320px;
        }

        .dashboard-avatar {
            width: 48px;
            height: 48px;
            font-size: 18px;
        }

        .dashboard-header {
            margin-bottom: 16px;
            padding-bottom: 14px;
        }

        .dashboard-user-info h3 {
            font-size: 17px;
        }

        .dashboard-user-info p {
            font-size: 13px;
        }

        .dashboard-stats {
            grid-template-columns: 1fr;
            gap: 8px;
            margin: 14px 0;
        }

        .stat-item {
            padding: 14px;
        }

        .stat-number {
            font-size: 22px;
        }

        .stat-label {
            font-size: 10px;
        }

        .dashboard-actions {
            flex-direction: column;
            gap: 6px;
            margin-top: 14px;
        }

        .dashboard-btn {
            padding: 11px;
            font-size: 12px;
        }

        .recent-activity {
            margin-top: 14px;
            padding-top: 12px;
        }

        .activity-title {
            font-size: 12px;
        }

        .activity-item {
            font-size: 11px;
            padding: 5px 0;
        }

        .activity-icon {
            font-size: 14px;
            width: 20px;
        }
    }

    /* Loading Animation */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }

    .loading {
        animation: pulse 2s ease-in-out infinite;
    }

    /* Smooth Transitions */
    * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Focus States for Accessibility */
    .dashboard-btn:focus,
    .btn-modern:focus,
    .top-nav-btn:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    }
`;



const styleSheet = document.createElement("style");
styleSheet.textContent = headerStyles;
document.head.appendChild(styleSheet);

export const HomeUI = {
    id: "home_ui",
    type: "clean",
    scroll: false, 
    css: "modern-home-ui",
    rows: [
 
        {
            view: "toolbar",
            id: "top_navigation",
            height: 64,
            css: "modern-top-nav",
            responsive: true,
            minHeight:32,
            paddingX: 24,
            minWidth: 160,
            cols: [
             
                {
                    view: "template",
                    id: "app_logo",
                    width: 240,
                    css: "app-logo-container",
                    template: `
                        <div class="logo-content">
                            <span class="mdi mdi-shield-account logo-icon"></span>
                            <span class="logo-text">User Preferences</span>
                        </div>
                    `
                },
             
                {},
           
                {
                    view: "template",
                    id: "top_nav_user_info",
                    width: 140,
                    height: 20,
                    responsive: true,
                    minHeight:10,
                    minWidth: 70,
                    css: "user-info-container",
                    template: function() {
                        const loggedUser = getLoggedUserData();
                        const isLoggedIn = isUserLoggedIn();
                        
                        if (isLoggedIn && loggedUser) {
                            const profileImage = localStorage.getItem("profileImage") || 

                            window.profileImageData || 
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format";
                            return `
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <img class="avatar" src="${profileImage}"  
                                         alt="User Avatar" 
                                         style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #e0e0e0;"/>
                                    </div>
                                    <div class="user-details">
                                        <span class="user-name">${loggedUser.displayName || loggedUser.firstName || loggedUser.lastName || 'User'}</span>
                                        <span class="user-status">Online</span>
                                    </div>
                                </div>
                            `;
                        }
                        return '<div class="user-info-placeholder"></div>';
                    }
                },
              
                {
                    view: "layout",
                    type: "clean",
                    width: 152,
                    height: 64,
                    cols: [
                        {
                            view: "button",
                            id: "top_nav_login",
                            type: "icon",
                            icon: "mdi mdi-login",
                            width: 40,
                            height: 40,
                            css: "webix_primary top-nav-btn",
                            tooltip: "Login",
                            hidden: isUserLoggedIn(),
                            click: function() {
                                try {
                                    $$("main_content").setValue("login");
                                } catch (error) {
                                    console.error("Navigation error:", error);
                                    window.showView && window.showView("login");
                                }
                            }
                        },
                        { width: 8 },
                        {
                            view: "button",
                            id: "top_nav_settings",
                            type: "icon",
                            icon: "mdi mdi-cog",
                            width: 40,
                            height: 40,
                            hotkey: "s",
                            css: "webix_info top-nav-btn",
                            tooltip: "Settings",
                            hotkey: "s",
                            hidden: !isUserLoggedIn(),
                            click: function() {
                                try {
                                    $$("main_content").setValue("settings_page");
                                } catch (error) {
                                    console.error("Navigation error:", error);
                                    window.showView && window.showView("settings_page");
                                }
                            }
                        },
                        { width: 8 },
                        {
                            view: "button",
                            id: "top_nav_logout",
                            type: "icon",
                            icon: "mdi mdi-logout",
                            width: 40,
                            height: 40,
                            css: "webix_danger top-nav-btn",
                            tooltip: "Logout",
                            hidden: !isUserLoggedIn(),
                            click: async function() {
                                try {
                                    const { logoutUser } = await import("./utils/dataService.js");
                                    
                                    await logoutUser();
                                    
                                    webix.message({ type: "success", text: "Logged out successfully!" });
                                    
                                    updateUIForLoginStatus();
                                    
                                    setTimeout(() => {
                                        location.reload();
                                    }, 1000);
                                    
                                } catch (error) {
                                    console.error("Logout error:", error);
                                    localStorage.removeItem("authToken");
                                    localStorage.removeItem("loggedUser");
                                    sessionStorage.removeItem("currentLoggedin");
                                    
                                    webix.message({ type: "info", text: "Logged out locally" });
                                    updateUIForLoginStatus();
                                    location.reload();
                                }
                            }
                        },
                        { width: 16 } 
                    ]
                }
            ]
        },
       
        {
            view: "template",
            id: "header_template",
            height: 280,
            css: "modern-header-banner",
            template: function() {
                const loggedUser = getLoggedUserData();
                const isLoggedIn = isUserLoggedIn();
                
                return `
            <div class="header-content">
                <div class="header-background-image"></div>
                <div class="header-content-inner">
                    <div class="header-text">
                        <h1 class="header-title">
                            ${isLoggedIn && loggedUser 
                                ? `Welcome back, ${loggedUser.displayName||loggedUser.firstName || loggedUser.username || 'User' || userProfile.full_name }!` 
                                : "Welcome to User Preferences!"
                            }
                        </h1>
                        <p class="subtitle">
                            ${isLoggedIn 
                                ? "Your personal preferences at a glance" 
                                : "Please log in to access your personalized dashboard"
                            }
                        </p>
                    </div>
                </div>
            </div>
        `;
            }
        },

       
        {
            view: "scrollview",
            scroll: "y",
            body: {
                view: "layout",
                type: "clean",
                paddingX: 32,
                paddingY: 32,
                rows: [
                    {
                        view: "layout",
                        type: "clean",
                        cols: [
                          
                            {
                                view: "layout",
                                width: 360,
                                rows: [
                                   
                                    {
                                        view: "form",
                                        id: "login_form",
                                        hidden: isUserLoggedIn(),
                                        css: "modern-login-card",
                                        paddingX: 24,
                                        paddingY: 24,
                                        elements: [
                                            {
                                                view: "template",
                                                height: 60,
                                                css: "card-header-template",
                                                template: "<h2 class='card-title'>Account Access</h2>"
                                            },
                                            { height: 16 },
                                            {
                                                view: "button",
                                                id: "login_button",
                                                value: "Login",
                                                icon: "mdi mdi-login",
                                                css: "webix_primary btn-modern",
                                                height: 48,
                                                click: function() {
                                                    try {
                                                        $$("main_content").setValue("login");
                                                    } catch (error) {
                                                        console.error("Navigation error:", error);
                                                        window.showView && window.showView("login");
                                                    }
                                                }
                                            },
                                            { height: 12 },
                                            {
                                                view: "button",
                                                id: "signup_button",
                                                value: "Sign Up",
                                                hotkey: "enter",
                                                icon: "mdi mdi-account-plus",
                                                css: "webix_secondary btn-modern",
                                                height: 48,
                                                click: function() {
                                                    try {
                                                        $$("main_content").setValue("signup");
                                                    } catch (error) {
                                                        console.error("Navigation error:", error);
                                                        window.showView && window.showView("signup");
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                   
                                    {
                                        view: "template",
                                        id: "user_dashboard_card",
                                        hidden: !isUserLoggedIn(),
                                        css: "modern-dashboard-card",
                                        height: 300,
                                        scroll: "y",
                                        minHeight: 300,
                                        maxHeight: 400,
                                        template: function() {
                                            const loggedUser = getLoggedUserData();
                                            const isLoggedIn = isUserLoggedIn();
                                            
                                            if (!isLoggedIn || !loggedUser) return "";
                                            
                                            const userName = loggedUser.displayName||loggedUser.firstName || loggedUser.username|| 'User';
                                            const userEmail = loggedUser.email || 'user@example.com';
                                            const userInitials = userName.substring(0, 2).toUpperCase();
                                            const loginDate = new Date().toLocaleDateString();
                                            
                                            return `
                                                <div class="user-dashboard">
                                                    <div class="dashboard-header">
                                                        <div class="dashboard-avatar">${userInitials}</div>
                                                        <div class="dashboard-user-info">
                                                            <h3>${userName}</h3>
                                                            <p>${userName}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="dashboard-stats">
                                                        <div class="stat-item">
                                                            <span class="stat-number">12</span>
                                                            <span class="stat-label">Settings</span>
                                                        </div>
                                                        <div class="stat-item">
                                                            <span class="stat-number">3</span>
                                                            <span class="stat-label">Alerts</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="dashboard-actions">
                                                        <div class="dashboard-btn" onclick="$$('main_content').setValue('settings_page')">
                                                            <i class="mdi mdi-cog"></i>Settings
                                                        </div>
                                                        <div class="dashboard-btn" onclick="$$('main_content').setValue('profile')">
                                                            <i class="mdi mdi-account"></i>Profile
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="recent-activity">
                                                        <div class="activity-title">Recent Activity</div>
                                                        <div class="activity-item">
                                                            <i class="mdi mdi-login activity-icon"></i>
                                                            Last login: ${loginDate}
                                                        </div>
                                                        <div class="activity-item">
                                                            <i class="mdi mdi-shield-check activity-icon"></i>
                                                            Security settings updated
                                                        </div>
                                                        <div class="activity-item">
                                                            <i class="mdi mdi-bell activity-icon"></i>
                                                            Notifications enabled
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    },
                                    {}  
                                ]
                            },
                          
                            { width: 32 },
                           
                            {
                                view: "layout",
                                rows: [
                                   
                                    {
                                        view: "template",
                                        id: "info_card_template",
                                        height: 130,
                                        css: "modern-info-card",
                                        template: function() {
                                            const loggedUser = getLoggedUserData();
                                            const isLoggedIn = isUserLoggedIn();
                                            
                                            return `
                                                <div class="info-content">
                                                    <div class="info-icon-container">
                                                        <span class="mdi mdi-information-outline info-icon"></span>
                                                    </div>
                                                    <div class="info-text">
                                                        <h3 class="info-title">Quick Info</h3>
                                                        <p class="info-description">${isLoggedIn && loggedUser
                                                            ? `Welcome ${loggedUser.displayName||loggedUser.firstName || loggedUser.username}! Access and adjust your security preferences. Manage your account settings and notification preferences from the settings panel.`
                                                            : "Log in or sign up to access your personalized dashboard and security settings."}
                                                        </p>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    },
                                   
                                    { height: 2 },
                                    
                                    {
                                        view: "template",
                                        height: 180,
                                        css: "modern-feature-card",
                                        template: `
                                            <div class="feature-content">
                                                <div class="feature-icon-container">
                                                    <span class="mdi mdi-shield-check feature-icon"></span>
                                                </div>
                                                <div class="feature-text">
                                                    <h3 class="feature-title">User Preferences Features</h3>
                                                    <ul class="feature-list">
                                                        <li>Real-time security monitoring</li>
                                                        <li>Customizable alert preferences</li>
                                                        <li>Comprehensive activity logs</li>
                                                        <li>Advanced privacy controls</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        `
                                    },
                                    {}  
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ],
    on: {
        onShow: function() {
            
            updateUIForLoginStatus();
            
            this.adjustLayout();
            webix.event(window, "resize", () => this.adjustLayout());
        },
        onAfterShow: function() {
         
            setTimeout(() => {
                updateUIForLoginStatus();
            }, 100);
        }
    },
    adjustLayout: function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // iPad Pro (1024x1366)
        if (width >= 1024 && width <= 1366) {
            const logoTemplate = $("app_logo");
            if (logoTemplate) {
                logoTemplate.define("width", 200);
                logoTemplate.refresh();
            }
            
            const userInfo = $("top_nav_user_info");
            if (userInfo) {
                userInfo.define("width", 160);
                userInfo.refresh();
            }

            // Adjust header height for iPad Pro
            const headerTemplate = $$("header_template");
            if (headerTemplate) {
                headerTemplate.define("height", 300);
                headerTemplate.refresh();
            }

            // Adjust padding for iPad Pro
            const mainContent = $$("main_content");
            if (mainContent) {
                mainContent.define("paddingX", 40);
                mainContent.define("paddingY", 40);
                mainContent.refresh();
            }
        }
        
        // iPhone 12 Pro (390x844)
        if (width <= 390) {
            const logoTemplate = $("app_logo");
            if (logoTemplate) {
                logoTemplate.define("width", 110);
                logoTemplate.refresh();
            }
            
            const userInfo = $("top_nav_user_info");
            if (userInfo) {
                userInfo.define("width", 70);
                userInfo.refresh();
            }

            // Adjust header height for iPhone
            const headerTemplate = $$("header_template");
            if (headerTemplate) {
                headerTemplate.define("height", 160);
                headerTemplate.refresh();
            }

            // Adjust padding for iPhone
            const mainContent = $$("main_content");
            if (mainContent) {
                mainContent.define("paddingX", 12);
                mainContent.define("paddingY", 12);
                mainContent.refresh();
            }

            // Adjust top navigation height
            const topNav = $$("top_navigation");
            if (topNav) {
                topNav.define("height", 50);
                topNav.refresh();
            }
        }
    }
};


if (typeof window !== 'undefined') {
    window.addEventListener('storage', function(e) {
        if (e.key === 'authToken' || e.key === 'loggedUser') {
            
            updateUIForLoginStatus();
        }
    });
    
    
    window.updateHomeUIForLoginStatus = updateUIForLoginStatus;
}
export function refreshUserInfo() {
  if ($$("top_nav_user_info")) {
    $$("top_nav_user_info").refresh();
  }
}


window.addEventListener('profileUpdated', function(event) {
  refreshUserInfo();
});