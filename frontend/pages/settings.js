// import { AccSettings } from "./settings/acc_settings.js";
// import { NotSettings } from "./settings/not_settings.js";
// import { PrSettings } from "./settings/pr_settings.js";

// export const SettingsPage = {
//     id: "settings",
//     responsive: true,
//     type: "space",
//     cols: [
//         { 
//             view: "layout",
//             id: "settingsMenuWrapper",
//             rows: [
//                 {
//                     view: "button",
//                     id: "toggleMenuButton",
//                     value: "☰ Menu",
//                     hidden: true,
//                     click: function () {
//                         let menu = $$("settingsMenu");
//                         let isVisible = menu.isVisible();
//                         if (isVisible) {
//                             menu.hide();
//                         } else {
//                             menu.show();
//                         }
//                     }
//                 },
//                 {
//                     view: "list", 
//                     id: "settingsMenu",
//                     data: [
//                         { id: "acc_settings", value: "Account" },
//                         { id: "pr_settings", value: "Privacy" },
//                         { id: "not_settings", value: "Notification" }
//                     ],
//                     ready: function () { 
//                         this.select(this.getFirstId()); 
//                     },
//                     on: {
//                         onItemClick: function (id) {
//                             let selectedItem = this.getItem(id);
//                             showsettingsView(selectedItem.id);
//                         }
//                     },
//                     select: true,
//                     scroll: false,
//                     width: 120 
//                 }
//             ]
//         },
//         {
//             view: "scrollview",
//             body: {
//                 view: "multiview",
//                 id: "settingsView",
//                 cells: [
//                     { id: "acc_settings", ...AccSettings },
//                     { id: "pr_settings", ...PrSettings },
//                     { id: "not_settings", ...NotSettings },
//                 ]
//             }
//         }
//     ],
//     on: {
//         onViewResize: function () {
//             let menu = $$("settingsMenu");
//             let button = $$("toggleMenuButton");
//             if (window.innerWidth < 600) { // Adjust this breakpoint as needed
//                 menu.hide();
//                 button.show();
//             } else {
//                 menu.show();
//                 button.hide();
//             }
//         }
//     }
// };

// window.showsettingsView = function (viewId) {
//     $$("settingsView").setValue(viewId);
// };

import { AccSettings } from "./settings/acc_settings.js";
import { NotSettings } from "./settings/not_settings.js";
import { PrSettings } from "./settings/pr_settings.js";
import {ThemeSettings} from "./settings/theme_settings.js";

export const SettingsPage = {
    id: "settings",
    responsive: true,
    type: "clean",
    rows: [
        {
            view: "toolbar",
            responsive: true,
            cols: [
                {
                    view: "icon",
                    icon: "bars",
                    id: "mobileMenuToggle",
                    hidden: true,
                    width: 50,
                    click: function() {
                        $$("settingsMobileMenu").toggle();
                    }
                },
                { 
                    view: "segmented", 
                    id: "settingsNavigation",
                    multiview: true,
                    options: [
                        { value: "Account", id: "acc_settings" },
                        { value: "Privacy", id: "pr_settings" },
                        { value: "Notifications", id: "not_settings" },
                        {value: "Appearance", id:"theme_settings"}
                    ],
                    on: {
                        onChange: function(newv) {
                            $$("settingsMultiview").setValue(newv);
                        }
                    }
                }
            ]
        },
        {
            view: "multiview", 
            id: "settingsMultiview",
            cells: [
                { 
                    id: "acc_settings", 
                    ...AccSettings,
                    responsive: true
                },
                { 
                    id: "pr_settings", 
                    ...PrSettings,
                    responsive: true
                },
                { 
                    id: "not_settings", 
                    ...NotSettings,
                    responsive: true
                },
                { 
                    id: "theme_settings", 
                    ...ThemeSettings,
                    responsive: true
                }
            ]
        }
    ],
    // Responsive configuration
    responsiveConfig: {
        mobile: {
            breakpoint: 600,
            params: {
                layout: {
                    type: "space"
                }
            }
        },
        tablet: {
            breakpoint: 1024,
            params: {
                layout: {
                    type: "wide"
                }
            }
        }
    },
    
    // Dynamic responsiveness handler
    on: {
        onAfterRender: function() {
            // Manage mobile menu visibility
            const width = this.getParentView().config.width || window.innerWidth;
            const mobileMenuToggle = $$("mobileMenuToggle");
            const settingsNavigation = $$("settingsNavigation");

            if (width < 600) {
                // Mobile view
                mobileMenuToggle.show();
                settingsNavigation.hide();
            } else {
                // Desktop/Tablet view
                mobileMenuToggle.hide();
                settingsNavigation.show();
            }
        }
    }
};

// Mobile menu popup for small screens
webix.ui({
    view: "popup",
    id: "settingsMobileMenu",
    width: 250,
    body: {
        view: "list",
        select: true,
        data: [
            { id: "acc_settings", value: "Account", icon: "user" },
            { id: "pr_settings", value: "Privacy", icon: "lock" },
            { id: "not_settings", value: "Notifications", icon: "bell" },
            { id: "theme_settings", value: "Appearance", icon: "paint-brush" }
        ],
        template: "<div class='mobile-menu-item'><span class='webix_icon fa-#icon#'></span> #value#</div>",
        on: {
            onItemClick: function(id) {
                $$("settingsNavigation").setValue(id);
                $$("settingsMultiview").setValue(id);
                $$("settingsMobileMenu").hide();
            }
        }
    }
});

// Optional: Add responsive CSS
webix.html.addStyle(`
    .mobile-menu-item {
        display: flex;
        align-items: center;
        padding: 10px;
    }
    .mobile-menu-item .webix_icon {
        margin-right: 10px;
    }
`);

// Utility function for view switching
function switchSettingsView(viewId) {
    try {
        const settingsMultiview = $$("settingsMultiview");
        const settingsNavigation = $$("settingsNavigation");
        
        if (settingsMultiview && settingsNavigation) {
            settingsMultiview.setValue(viewId);
            settingsNavigation.setValue(viewId);
        }
    } catch (error) {
        console.error("Error switching settings view:", error);
    }
}

window.showsettingsView = function (viewId) {
    $$("settingsView").setValue(viewId);
};

if ($$("settings")) {
    $$("settings").attachEvent("onKeyPress", function (key, e) {
      switch (key) {
        case 65: // 'A' key
          if (e.altKey) {
            showSettingsView("acc_settings");
          }
          break;
        case 80: // 'P' key
          if (e.altKey) {
            showSettingsView("pr_settings");
          }
          break;
        case 78: // 'N' key
          if (e.altKey) {
            showSettingsView("not_settings");
          }
          break;
      }
    });
  }