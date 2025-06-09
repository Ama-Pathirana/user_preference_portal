let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;

export const Navbar = {
  id: "navbar",
  view: "toolbar",
  height: 56,
  css: "navContainer",
  responsive: true,
  cols: [
    // Home Icon
    { 
      view: "button", 
      label: "Home", 
      width: 80,
      css: "homeButton", 
       
      click: () => showView("home"),
      
    },
    
    // Spacer for alignment
    { 
      view: "spacer", 
      fillspace: true 
    },
    
    // Right-aligned items (Settings, Theme Switch, Logout, Profile)
    {
      cols: [
        { 
          view: "icon", 
          icon: "mdi mdi-cog", 
          click: () => showView("settings"), 
          hidden: !isLogin,
          width: 40,
          css: "rightAlign",
          hidden: !isLogin
        },
        {
          view: "switch",
          id: "themeSwitch",
          width: 100,
          value: 0,
          on: {
            onChange: function (value) {
              toggleTheme(value);
            }
          },
          hidden: !isLogin,
          css: "rightAlign",
          onLabel: "<span class='webix_icon fas fa-sun'></span>",
          offLabel: "<span class='webix_icon fas fa-moon'></span>"
        },
        { 
          view: "button", 
          label: "LOGOUT", 
          width: 100, 
          click: () => {
            localStorage.setItem("loggedUser", "false");
            location.reload();
          }, 
          hidden: !isLogin,
          css: "rightAlign",
          responsive: {
            "screen-xxs": { width: 80, height: 32 },  // Smaller size for very small screens
            "screen-s": { width: 100, height: 40 },   // Slightly larger on small screens
            "screen-m": { width: 150, height: 56 }    // Default size for larger screens
        }
        }
      ],
    },
    
    // When not logged in
    {
      cols: [
        { 
          view: "button", 
          label: "LOG IN", 
          width: 100, 
          click: () => showView("login"), 
          hidden: isLogin,
          css: "reduceSpacing"
        },
        {
          view: "button", 
          label: "SIGNUP", 
          width: 100, 
          click: () => showView("signup"), 
          hidden: isLogin,
          css: "reduceSpacing"
        },
        {
          view: "switch",
          id: "themeSwitchPublic",
          width: 100,
          value: 0,
          onLabel: "<span class='webix_icon fas fa-sun'></span>",
          offLabel: "<span class='webix_icon fas fa-moon'></span>",
          on: {
            onChange: function (value) {
              toggleTheme(value);
            }
          },
          hidden: isLogin,
          css: "reduceSpacing"
        }
      ],
      responsive: "hide"
    }
  ]
};
