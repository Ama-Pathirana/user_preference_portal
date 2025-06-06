import { AccountForm } from "../components/forms/account.js";
import { NotificationsForm } from "../components/forms/notifications.js";
import { PrivacyForm } from "../components/forms/privacy.js";
import { ThemeForm } from "../components/forms/theme.js";

export const settings = {
    id: "settings_page",
    responsive: true,
    type: "clean",
    rows: [
        {
            view: "toolbar",
            id: "settings_toolbar", // \Added ID for layout adjustment
            responsive: true,
            height: 64,
            minHeight: 31,
            minWidth: 300,
            css: "webix_header toolbar-enhanced", //  Styling class
            cols: [
                {
                    view: "button",
                    type: "icon",
                    icon: "mdi mdi-arrow-left",
                    label: "Back",
                    width: 100,
                    responsive: true,
                    minWidth: 44,
                    css: "webix_primary",
                    click: function () {
                        $$("main_content").setValue("home_ui");
                    }
                },
                { 
                    view: "segmented", 
                    id: "settingsNavigation",
                    multiview: true,
                    responsive: true,
                    css: "segmented-enhanced", 
                    options: [
                        { value: "Account", id: "account_settings_cell" },
                        { value: "Privacy", id: "privacy_settings_cell" },
                        { value: "Notifications", id: "notifications_settings_cell" },
                        { value: "Theme", id: "theme_settings_cell" }
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
                    id: "account_settings_cell", 
                    ...AccountForm,
                    responsive: true
                },
                { 
                    id: "privacy_settings_cell", 
                    ...PrivacyForm,
                    responsive: true
                },
                { 
                    id: "notifications_settings_cell", 
                    ...NotificationsForm,
                    responsive: true
                },
                { 
                    id: "theme_settings_cell", 
                    ...ThemeForm,
                    responsive: true
                }
            ]
        }
    ],
    
    responsiveConfig: {
        ipadPro: {
            breakpoint: 1366,
            params: {
                layout: {
                    type: "wide",
                    padding: 10
                }
            }
        },
        tablet: {
            breakpoint: 1024,
            params: {
                layout: {
                    type: "wide",
                    padding: 30
                }
            }
        },
        mobile: {
            breakpoint: 390,
            params: {
                layout: {
                    type: "space",
                    padding: 15
                }
            }
        }
    },
    
    on: {
        onAfterRender: function() {
            this.adjustLayout();

            let resizeTimeout;
            webix.event(window, "resize", () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => this.adjustLayout(), 150);
            });

            webix.event(window, "orientationchange", () => {
                setTimeout(() => this.adjustLayout(), 300);
            });
        }
    },

    adjustLayout: function() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const settingsNavigation = $$("settingsNavigation");
        const mobileMenuToggle = $$("mobileMenuToggle");
        const toolbar = $$("settings_toolbar");
        const multiview = $$("settingsMultiview");

        if (width >= 1194) {
            this.applyIPadProLayout(toolbar, settingsNavigation, mobileMenuToggle, width);
        } else if (width >= 390) {
            this.applyIPhone12ProLayout(toolbar, settingsNavigation, mobileMenuToggle);
        } else {
            this.applySmallMobileLayout(toolbar, settingsNavigation, mobileMenuToggle);
        }

        webix.ui.resize();
    },
};

// Mobile Menu Popup
if (!$$("settingsMobileMenu")) {
    webix.ui({
        view: "popup",
        id: "settingsMobileMenu",
        width: 280,
        body: {
            view: "list",
            select: true,
            css: "settings-mobile-menu",
            data: [
                { id: "account_settings_cell", value: "Account", icon: "mdi mdi-account" },
                { id: "privacy_settings_cell", value: "Privacy", icon: "mdi mdi-shield-lock" },
                { id: "notifications_settings_cell", value: "Notifications", icon: "mdi mdi-bell" },
                { id: "theme_settings_cell", value: "Appearance", icon: "mdi mdi-palette" }
            ],
            template: "<div class='mobile-menu-item'><span class='#icon#'></span> #value#</div>",
            on: {
                onItemClick: function(id) {
                    $$("settingsNavigation").setValue(id);
                    $$("settingsMultiview").setValue(id);
                    $$("settingsMobileMenu").hide();
                }
            }
        }
    });
}

// Style Enhancements
webix.html.addStyle(`
    .mobile-menu-item {
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 16px;
        border-bottom: 1px solid #eee;
        transition: background 0.2s;
    }

    .mobile-menu-item:last-child {
        border-bottom: none;
    }

    .mobile-menu-item:hover {
        background-color: #f5f5f5;
    }

    .mobile-menu-item .mdi {
        margin-right: 15px;
        font-size: 20px;
        width: 24px;
        text-align: center;
    }

    .toolbar-enhanced {
        background-color: #f9f9f9;
        border-bottom: 1px solid #ddd;
    }

    .segmented-enhanced .webix_segment_0.webix_selected {
        background: #007acc !important;
        color: white !important;
    }

    @media screen and (min-width: 1024px) and (max-width: 1366px) {
        .mobile-menu-item {
            padding: 20px;
            font-size: 18px;
        }

        .mobile-menu-item .mdi {
            font-size: 24px;
            width: 30px;
        }
    }

    @media screen and (max-width: 390px) {
        .mobile-menu-item {
            padding: 12px;
            font-size: 15px;
        }

        .mobile-menu-item .mdi {
            font-size: 18px;
            width: 20px;
            margin-right: 12px;
        }
    }
`);

// Accessibility 
webix.ready(function () {
    setTimeout(() => {
        const toolbarEl = document.querySelector('.toolbar-enhanced');
        if (toolbarEl) toolbarEl.setAttribute("role", "navigation");

        const menuEl = document.querySelector('.settings-mobile-menu');
        if (menuEl) menuEl.setAttribute("role", "menu");
    }, 500);
});

// View Switching Utility
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

// Keyboard Shortcuts
webix.event(document, "keydown", function (e) {
    if (e.altKey) {
        switch (e.key.toUpperCase()) {
            case "A":
                switchSettingsView("account_settings_cell");
                break;
            case "P":
                switchSettingsView("privacy_settings_cell");
                break;
            case "N":
                switchSettingsView("notifications_settings_cell");
                break;
            case "T":
                switchSettingsView("theme_settings_cell");
                break;
        }
    }
});
