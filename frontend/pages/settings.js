// pages/settings.js

import { AccSettings } from "./settings/acc_settings.js";
import { NotSettings } from "./settings/notifications.js";
import { PrSettings } from "./settings/privacy.js";
import {ThemeSettings} from "./settings/themes.js";

export const SettingsPage = {
    id: "settings", // ID for this main settings view
    responsive: true,
    type: "clean", // Ensures minimal default padding/margins
    cols: [ // Main columns layout for sidebar and content
        {
            // Left sidebar for settings navigation
            view: "layout", // A general layout to hold the title and the list
            id: "settingsSidebarWrapper", // Useful for targeting this wrapper if needed
            width: 200, // Fixed width for the sidebar
            minWidth: 150, // Minimum width for responsive adjustments
            maxWidth: 250, // Maximum width
            rows: [
                {
                    // Title for the sidebar
                    template: "<h3 class='settings-sidebar-title'>Customize Panel</h3>",
                    autoheight: true, // Adjust height based on content
                    css: "settings-sidebar-title", // Custom CSS class for styling
                },
                {
                    // The navigation list
                    view: "list",
                    id: "settingsNavigation", // Reuses ID from previous segmented control for consistency
                    select: true, // Allows single item selection
                    scroll: false, // Prevents internal scrollbar if content fits
                    data: [ // Data for the list items, including icons
                        { id: "acc_settings", value: "Account", icon: "user" },
                        { id: "privacy", value: "Privacy", icon: "lock" },
                        { id: "notifications", value: "Notifications", icon: "bell" },
                        { id: "themes", value: "Appearance", icon: "paint-brush" }
                    ],
                    // Template to render each list item with an icon
                    template: "<div class='mobile-menu-item'><span class='webix_icon fa-#icon#'></span> #value#</div>",
                    on: {
                        onItemClick: function (id) {
                            // When a list item is clicked, switch the multiview to the corresponding panel
                            $$("settingsMultiview").setValue(id);
                        }
                    },
                    ready: function () {
                        // Automatically select the first item when the list is rendered
                        this.select(this.getFirstId());
                    }
                }
            ]
        },
        {
            // Right-side content area for the selected setting panel
            view: "scrollview", // Ensures content can scroll if it overflows
            body: { // The actual multiview is inside the scrollview's body
                view: "multiview",
                id: "settingsMultiview", // ID for the content multiview
                cells: [ // List of all possible setting panels
                    {
                        id: "acc_settings",
                        ...AccSettings, // Spreads properties from AccSettings object
                        responsive: true
                    },
                    {
                        id: "privacy",
                        ...PrSettings, // Spreads properties from PrSettings object
                        responsive: true
                    },
                    {
                        id: "notifications",
                        ...NotSettings, // Spreads properties from NotSettings object
                        responsive: true
                    },
                    {
                        id: "themes",
                        ...ThemeSettings, // Spreads properties from ThemeSettings object
                        responsive: true
                    }
                ]
            }
        }
    ],
    // Event handler for when the view is resized (e.g., window resize)
    on: {
        onViewResize: function() {
            // Adjusts the layout of this component to fit the new size
            this.adjust();
        }
    }
};