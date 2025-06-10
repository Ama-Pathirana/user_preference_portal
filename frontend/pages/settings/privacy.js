export const PrSettings = {
    id: "privacy",
    view: "scrollview",
    responsive: true,
    scroll: "y",
    body: {
        rows: [
            {
                template: "<div class='privacy-settings-header'><h2>Privacy Settings</h2><p>Manage who can see your information and how your data is used.</p></div>",
                height: 90, // Increased height for description
                css: "privacy-settings-header-container" // New CSS class for overall header container
            },
            {
                view: "flexlayout",
                responsiveCell: true,
                cols: [
                    // Profile Picture Settings
                    {
                        view: "form",
                        id: "profile-picture-settings",
                        borderless: true,
                        minWidth: 300,
                        padding: 15, // Add some padding for better spacing
                        rows: [
                            {
                                template: "<div class='settings-section-header'><h3>Profile Picture Settings</h3><p>Control the visibility and download options for your profile picture.</p></div>",
                                height: 70, // Increased height for description
                                css: "settings-section-header-container"
                            },
                            {
                                view: "select",
                                label: "Who can see my profile picture?",
                                name: "profile_pic_visibility",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "everyone", value: "Everyone" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "private", value: "Only Me" }
                                ],
                                tooltip: "Determines who can view your profile picture on your profile and in feeds."
                            },
                            {
                                view: "select",
                                label: "Who can download or save my profile picture?",
                                name: "profile_pic_download",
                                labelPosition: "top",
                                value: "no_one", // Changed default to 'no_one' for stronger privacy
                                options: [
                                    { id: "no_one", value: "No One" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "everyone", value: "Everyone" }
                                ],
                                tooltip: "Controls who is allowed to download or save a copy of your profile picture."
                            },
                            {} // Spacer
                        ]
                    },
                    // Account Privacy
                    {
                        view: "form",
                        id: "account-privacy",
                        borderless: true,
                        minWidth: 300,
                        padding: 15,
                        rows: [
                            {
                                template: "<div class='settings-section-header'><h3>Account Privacy</h3><p>Manage who can view your profile and send you requests.</p></div>",
                                height: 70,
                                css: "settings-section-header-container"
                            },
                            {
                                view: "select",
                                label: "Who can see my profile?",
                                name: "account_privacy",
                                labelPosition: "top",
                                value: "public",
                                options: [
                                    { id: "public", value: "Public" },
                                    { id: "friends", value: "Friends Only" },
                                    { id: "private", value: "Only Me" }
                                ],
                                tooltip: "Sets the overall visibility of your profile to other users."
                            },
                            {
                                view: "select",
                                label: "Who can send me connection requests?",
                                name: "connection_requests",
                                labelPosition: "top",
                                value: "everyone",
                                options: [
                                    { id: "everyone", value: "Everyone" },
                                    { id: "friends_of_friends", value: "Friends of Friends" },
                                    { id: "no_one", value: "No One" }
                                ],
                                tooltip: "Controls who is able to send you friend or connection requests."
                            },
                            {} // Spacer
                        ]
                    }
                ]
            },
            {
                view: "flexlayout",
                responsiveCell: true,
                cols: [
                    // Data Sharing Preferences
                    {
                        view: "form",
                        id: "data-sharing-preferences",
                        borderless: true,
                        minWidth: 300,
                        padding: 15,
                        rows: [
                            {
                                template: "<div class='settings-section-header'><h3>Data Sharing Preferences</h3><p>Control how your data is shared and indexed.</p></div>",
                                height: 70,
                                css: "settings-section-header-container"
                            },
                            {
                                view: "checkbox",
                                labelRight: "Allow search engines to index my profile",
                                name: "search_engine_visibility",
                                labelWidth: 0,
                                value: 0, // Default to unchecked for privacy
                                tooltip: "If checked, your profile may appear in search engine results (e.g., Google, Bing)."
                            },
                            {
                                view: "checkbox",
                                labelRight: "Allow third-party apps to access my data",
                                name: "third_party_access",
                                labelWidth: 0,
                                value: 0, // Default to unchecked for privacy
                                tooltip: "Grant or revoke permission for external applications to access your profile data."
                            },
                            {
                                view: "checkbox",
                                labelRight: "Show my active status",
                                name: "active_status_visibility",
                                labelWidth: 0,
                                value: 1, // Default to checked for common social platforms
                                tooltip: "Display a green dot or similar indicator when you are online and active."
                            },
                            {
                                view: "checkbox",
                                labelRight: "Allow profile views tracking",
                                name: "profile_view_tracking",
                                labelWidth: 0,
                                value: 1, // Default to checked for common social platforms
                                tooltip: "Enables or disables the ability for others to see that you have viewed their profile, and for you to see who viewed yours."
                            },
                            {} // Spacer
                        ]
                    },
                    // Advanced Privacy Controls
                    {
                        view: "form",
                        id: "advanced-privacy-controls",
                        borderless: true,
                        minWidth: 300,
                        padding: 15,
                        rows: [
                            {
                                template: "<div class='settings-section-header'><h3>Advanced Privacy Controls</h3><p>Configure advanced settings related to your data and privacy.</p></div>",
                                height: 70,
                                css: "settings-section-header-container"
                            },
                            {
                                view: "select",
                                label: "Data Retention Period",
                                name: "data_retention",
                                labelPosition: "top",
                                value: "1_month",
                                options: [
                                    { id: "1_month", value: "1 Month" },
                                    { id: "3_months", value: "3 Months" },
                                    { id: "6_months", value: "6 Months" },
                                    { id: "1_year", value: "1 Year" },
                                    { id: "forever", value: "Forever" }
                                ],
                                tooltip: "Choose how long your non-essential data will be stored by the platform after deletion or inactivity."
                            },
                            {
                                view: "select",
                                label: "Data Export Options",
                                name: "data_export",
                                labelPosition: "top",
                                value: "full",
                                options: [
                                    { id: "full", value: "Full Export" },
                                    { id: "minimal", value: "Minimal Export" },
                                    { id: "no_export", value: "No Export" }
                                ],
                                tooltip: "Select the type of data you wish to include when exporting your personal data from the platform."
                            },
                            {
                                // Placeholder for a button or link to initiate data export
                                view: "button",
                                value: "Request Data Export",
                                css: "webix_secondary",
                                align: "left", // Align to left to match label position
                                width: 180, // Give it a fixed width
                                click: function() {
                                    webix.message("A data export request has been initiated. You will be notified when your data is ready.");
                                }
                            },
                            {} // Spacer
                        ]
                    }
                ]
            },
            // Action Buttons
            {
                height: 60, // Fixed height for buttons row
                css: "button-bar",
                cols: [
                    { gravity: 1 }, // Spacer to push buttons to the right
                    {
                        view: "button",
                        value: "Save Changes",
                        css: "webix_primary",
                        width: 150, // Fixed width for consistent button size
                        click: function() {
                            webix.confirm({
                                title: "Save Privacy Settings",
                                text: "Are you sure you want to save these privacy settings?",
                                callback: function(result) {
                                    if (result) {
                                        // In a real application, you'd gather values from all forms here
                                        // const profilePicSettings = $$("profile-picture-settings").getValues();
                                        // const accountPrivacySettings = $$("account-privacy").getValues();
                                        // const dataSharingSettings = $$("data-sharing-preferences").getValues();
                                        // const advancedPrivacySettings = $$("advanced-privacy-controls").getValues();

                                        // Here you would send data to your backend
                                        // For demonstration, we just show a message
                                        webix.message({
                                            type: "success",
                                            text: "Privacy settings updated successfully!"
                                        });
                                    }
                                }
                            });
                        }
                    },
                    { width: 10 }, // Small space between buttons
                    {
                        view: "button",
                        value: "Reset to Default",
                        css: "webix_secondary",
                        width: 150, // Fixed width for consistent button size
                        click: function() {
                            webix.confirm({
                                title: "Reset Settings",
                                text: "Are you sure you want to reset all privacy settings to their default values? This action cannot be undone.",
                                callback: function(result) {
                                    if (result) {
                                        // Reset profile picture settings
                                        $$("profile-picture-settings").setValues({
                                            profile_pic_visibility: "everyone",
                                            profile_pic_download: "no_one" // Changed default
                                        });

                                        // Reset account privacy settings
                                        $$("account-privacy").setValues({
                                            account_privacy: "public",
                                            connection_requests: "everyone"
                                        });

                                        // Reset data sharing preferences
                                        $$("data-sharing-preferences").setValues({
                                            search_engine_visibility: 0,
                                            third_party_access: 0,
                                            active_status_visibility: 1, // Changed default
                                            profile_view_tracking: 1      // Changed default
                                        });

                                        // Reset advanced privacy controls
                                        $$("advanced-privacy-controls").setValues({
                                            data_retention: "1_month",
                                            data_export: "full"
                                        });

                                        webix.message({
                                            type: "success",
                                            text: "Privacy settings reset to default!"
                                        });
                                    }
                                }
                            });
                        }
                    },
                    { gravity: 1 } // Spacer
                ]
            }
        ]
    }
};

// Optional: Add some basic CSS for better visual appeal
/*
You would typically put this in a separate .css file linked to your application.
.privacy-settings-header-container {
    background-color: #f7f7f7;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.privacy-settings-header h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 5px;
}

.privacy-settings-header p {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.settings-section-header-container {
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.settings-section-header h3 {
    font-size: 18px;
    color: #555;
    margin-bottom: 5px;
}

.settings-section-header p {
    font-size: 13px;
    color: #888;
    margin: 0;
}

.webix_form {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    margin: 10px; // Adds space between forms
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.webix_control.webix_el_select,
.webix_control.webix_el_checkbox {
    margin-bottom: 15px; // Space out controls
}

.webix_el_label {
    font-weight: 600;
    color: #444;
}

.button-bar {
    padding: 15px;
    background-color: #f7f7f7;
    border-top: 1px solid #eee;
    text-align: right; // Align buttons to the right
}
*/