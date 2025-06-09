let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;

export const HomePage = {
    id: "home",
    type: "space",
    view: "layout",
    css: "home-container",
    responsive: true,
    rows: [
        // Hero Section with Welcome Message
        // {
        //     view: "template",
        //     height: 400,
        //     css: "image-container",

        //     template: `
        //         <div class="image-container">
        //             <h2 class="h2tag">Your Own Customizable App!</h2>
        //             <p class="description">Customize your experience with personalized settings and seamless navigation.</p>
                    
        //         </div>
        //     `
        // },

        // adding carousel
        {
  view: "carousel",
  id: "backgroundCarousel",
  height: 400,
  cols: [
    {
      view: "template",
      css: "image-slide",
      template: `
        <div class="carousel-content">
          <h2 class="h2tag">Your Own Customizable App!</h2>
          <p class="description">Customize your experience with personalized settings and seamless navigation.</p>
        </div>
      `
    },
    {
      view: "template",
      css: "image-slide2",
      template: `
        <div class="carousel-content">
          <h2 class="h2tag">Smarter Preferences</h2>
          <p class="description">Easily update notifications, themes, and privacy settings.</p>
        </div>
      `
    },
    {
      view: "template",
      css: "image-slide3",
      template: `
        <div class="carousel-content">
          <h2 class="h2tag">Seamless Experience</h2>
          <p class="description">Designed for all devices with responsive design in mind.</p>
        </div>
      `
    }
  ]
},

        


        {
            view: "accordion",
            css: "accordion-container",
            rows: [
                {
                    header: "User Settings",
                    collapsed: true,
                    body: {
                        view: "template",
                        template: `
                            <div class="settings-container">
                                <p class="description">The User Settings lets you customize notifications, themes, and language for a personalized experience.</p>
                                
                            </div>
                        `,
                        autoheight: true
                    }
                },
                {
                    header: "About Us",
                    collapsed: true,
                    body: {
                        view: "template",
                        template: `
                            <div class="about-container">
                                <p class="description">We are dedicated to providing the best user experience with personalized settings and seamless navigation.</p>
                            </div>
                        `,
                        autoheight: true
                    }
                },
                {
                    // Use a 'template' view to display multi-line text with formatting
                    header: "Contact Us",
                    collapsed: true,
                  
                    // --- MODIFIED STYLES AND ALIGNMENT ---
// Custom CSS class for further styling if needed
                    body: {
                      view: "template",
                      template: ` 
                      <div style="font-size: 14px; line-height: 1.4; text-align: left; color: #333;">
                            <div>Contact: <span style="font-weight: bold;">0714077272</span></div>
                            <div>Email: <span style="font-weight: bold;">sachini.20@cse.mrt.ac.lk</span></div>
                            <div>GitHub: <span style="font-weight: bold;">Ama-Pathirana</span></div>
                        </div>
                    `,
                    gravity: 1, // Allows it to take up available space
                    // We remove align:'right' as we set text-align:left in the template directly
                    css: "contact-info-template" 

                    }
                }
            ]

        }

        // // Responsive Section with Two Columns
        // {
        //     type: "space",
        //     responsive: "home",
        //     css:"detail-container",
        //     responsiveCell: true,
        //     cols: [
        //         // Left Column: Profile Call-to-Action (Displayed only when not logged in)
        //         // {
        //         //     view: "layout",
        //         //     gravity: 1, // Makes it adapt to screen width
        //         //     rows: [
        //         //         {
        //         //             view: "template",
        //         //             height: 400,
        //         //             css: "login-container",
        //         //             template: `
        //         //                 <div class="login-container">
        //         //                     <p class="description">The User Settings lets you customize notifications, themes, and language for a personalized experience.</p>
        //         //                     <button class="login-button" onclick="showView('login')" ${isLogin ? 'style="display:none;"' : '' }>Log In</button>
        //         //                 </div>
        //         //             `
        //         //         },
        //         //     ]
        //         // },

        //         // {
        //         //     view: "scrollview",
        //         //     gravity: 2,
        //         //     css: "info-section",
        //         //     body: {
        //         //       rows: [
        //         //         {
        //         //           template:`<div class="info-section">
        //         //            <h2 class="about-text">About Us</h2>
        //         //            <p>We are dedicated to providing the best user experience with personalized settings and seamless navigation.</p>
        //         //            </div>`,
        //         //           autoheight: true
        //         //         },
        //         //         {
        //         //           template: `<div class="contact-section">
        //         //            <h2>Contact Us</h2>
        //         //            </div>`,
        //         //           autoheight: true
        //         //         },
        //         //         {
        //         //           css: "contact-info",
        //         //           cols: [
        //         //             { template: `<i class="fas fa-phone fa-2x"></i>`, autoheight: true, css: "contact-icon" },
        //         //             { template: `<i class="fas fa-envelope fa-2x"></i>`, autoheight: true, css: "contact-icon" },
        //         //             { template: `<i class="fab fa-linkedin fa-2x"></i>`, autoheight: true, css: "contact-icon" }
        //         //           ]
        //         //         }
        //         //       ]
        //         //     }
        //         // }
        //     ]
        // }
    ]
};
