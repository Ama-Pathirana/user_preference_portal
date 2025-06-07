let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;

export const HomePage = {
    id: "home",
    type: "space",
    view: "layout",
    css: "home-container",
    responsive: true,
    rows: [
        // Hero Section with Welcome Message
        {
            view: "template",
            height: 400,
            css: "image-container",
            template: `
                <div class="image-container">
                    <h2 class="h2tag">Welcome to the <span class="app-name">Demo App!</span></h2>
                </div>
            `
        },

        // Responsive Section with Two Columns
        {
            type: "space",
            responsive: "home",
            css:"detail-container",
            responsiveCell: true,
            cols: [
                // Left Column: Profile Call-to-Action (Displayed only when not logged in)
                {
                    view: "layout",
                    gravity: 1, // Makes it adapt to screen width
                    rows: [
                        {
                            view: "template",
                            height: 400,
                            css: "login-container",
                            template: `
                                <div class="login-container">
                                    <p class="description">The User Settings lets you customize notifications, themes, and language for a personalized experience.</p>
                                    <button class="login-button" onclick="showView('login')" ${isLogin ? 'style="display:none;"' : '' }>Log In</button>
                                </div>
                            `
                        },
                    ]
                },

                {
                    view: "scrollview",
                    gravity: 2,
                    css: "info-section",
                    body: {
                      rows: [
                        {
                          template:`<div class="info-section">
                           <h2 class="about-text">Guide</h2>
                           <p>We are dedicated to providing the best user experience with personalized settings and seamless navigation.</p>
                           </div>`,
                          autoheight: true
                        },
                        {
                          template: `<div class="contact-section">
                           <h2>Contact Us</h2>
                           </div>`,
                          autoheight: true
                        },
                        {
                          css: "contact-info",
                          cols: [
                            { template: `<i class="fas fa-phone fa-2x"></i>`, autoheight: true, css: "contact-icon" },
                            { template: `<i class="fas fa-envelope fa-2x"></i>`, autoheight: true, css: "contact-icon" },
                            { template: `<i class="fab fa-linkedin fa-2x"></i>`, autoheight: true, css: "contact-icon" }
                          ]
                        }
                      ]
                    }
                }
            ]
        }
    ]
};
