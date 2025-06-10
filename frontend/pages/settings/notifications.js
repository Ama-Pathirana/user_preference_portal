export const NotSettings = {
    id: "notifications",
    responsive: true,
    adaptivity: true,
    type: "clean",

    // Centralized default values for easier management and resetting
    defaultValues: {
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        newsletter_subscriptions: false,
        notification_sound: "default",
        sound_mode: "keep",
        text_preview: true,
        media_preview: true,
        mute_notifications: false,
        message_tone: "Default",
        group_tone: "Default",
        custom_message_tone_path: "", // New default for custom tone path
        custom_group_tone_path: "",   // New default for custom tone path
    },

    rows: [
        {
            // Enhanced main title with a descriptive subtitle
            template: `
                <div class='settings-header-container'>
                    <h2 tabindex='0' class='settings-title'>Notification Settings</h2>
                    <p class='settings-description'>Customize how you receive alerts and manage notification behaviors across the application.</p>
                </div>
            `,
            autoheight: true,
            css: "settings-header-wrapper", // A wrapper class for specific styling
        },
        {
            view: "form",
            id: "notificationForm",
            scroll: true,
            elementsConfig: {
                labelPosition: "left", // Default label position
                labelWidth: 180, // Slightly increased label width for better readability
                // Add some default padding to controls
                paddingY: 8,
            },
            elements: [
                {
                    // Fieldset for Alert Preferences with an added description
                    view: "fieldset",
                    label: "Alert Preferences",
                    body: {
                        paddingY: 10,
                        rows: [
                            {
                                template: `<div class='fieldset-intro'>Choose your preferred channels for receiving updates and important information.</div>`,
                                autoheight: true,
                                borderless: true,
                                css: "fieldset-intro-text",
                            },
                            {
                                view: "checkbox",
                                label: "Email Notifications", // More descriptive label
                                name: "email_notifications",
                                tooltip: "Receive notifications and updates via email.",
                                tabFocus: true,
                            },
                            {
                                view: "checkbox",
                                label: "SMS Notifications", // More descriptive label
                                name: "sms_notifications",
                                tooltip: "Receive urgent alerts and essential updates via text message. (Carrier rates may apply)", // Added disclaimer
                                tabFocus: true,
                            },
                            {
                                view: "checkbox",
                                label: "Push Notifications", // More descriptive label
                                name: "push_notifications",
                                tooltip: "Get instant notifications on your device when you're active in the app.",
                                tabFocus: true,
                            },
                            {
                                view: "checkbox",
                                label: "Newsletter Subscriptions", // More descriptive label
                                name: "newsletter_subscriptions",
                                tooltip: "Subscribe to our periodic newsletters for news and promotions.",
                                tabFocus: true,
                            },
                        ],
                    },
                },

                {
                    // Fieldset for Sound Settings with an added description
                    view: "fieldset",
                    label: "Sound Settings",
                    body: {
                        paddingY: 10,
                        rows: [
                            {
                                template: `<div class='fieldset-intro'>Configure the general sound behaviors for incoming notifications.</div>`,
                                autoheight: true,
                                borderless: true,
                                css: "fieldset-intro-text",
                            },
                            {
                                view: "combo",
                                label: "Default Notification Sound", // More specific label
                                name: "notification_sound",
                                options: [
                                    { id: "default", value: "Default (App Chime)" }, // More descriptive default
                                    { id: "chime", value: "Chime" },
                                    { id: "beep", value: "Beep" },
                                    { id: "silent", value: "Silent" },
                                ],
                                tooltip: "Select the primary sound played for most notifications.",
                                tabFocus: true,
                            },
                            {
                                view: "segmented",
                                label: "Notification Sound Mode", // More descriptive label
                                name: "sound_mode",
                                options: [
                                    { id: "mute", value: "Mute All Sounds", width: 150 }, // Wider segments
                                    { id: "keep", value: "Keep Sounds On", width: 150 },
                                ],
                                tooltip: "Choose whether to play sounds for all notifications or mute them globally.",
                                tabFocus: true,
                            },
                        ],
                    },
                },

                {
                    // Fieldset for Preview Settings with an added description
                    view: "fieldset",
                    label: "Preview Settings",
                    body: {
                        paddingY: 10,
                        rows: [
                            {
                                template: `<div class='fieldset-intro'>Control what content is displayed in notification previews.</div>`,
                                autoheight: true,
                                borderless: true,
                                css: "fieldset-intro-text",
                            },
                            {
                                view: "switch",
                                label: "Show Text Preview", // More specific label
                                name: "text_preview",
                                onLabel: "On",
                                offLabel: "Off",
                                tabFocus: true,
                                tooltip: "When enabled, notification previews will show the message text.",
                            },
                            {
                                view: "switch",
                                label: "Show Media Preview", // More specific label
                                name: "media_preview",
                                onLabel: "On",
                                offLabel: "Off",
                                tabFocus: true,
                                tooltip: "When enabled, notification previews will show image or video thumbnails.",
                            },
                            {
                                view: "switch",
                                label: "Mute All Notifications", // This covers all types including sounds/vibrations
                                name: "mute_notifications",
                                onLabel: "Muted", // Changed labels for clarity
                                offLabel: "Active",
                                tabFocus: true,
                                tooltip: "Temporarily silence all notifications. This will override individual sound and tone settings.",
                            },
                        ],
                    },
                },

                {
                    // Fieldset for Custom Notification Tones with an added description
                    view: "fieldset",
                    label: "Custom Notification Tones", // Renamed for clarity
                    body: {
                        paddingY: 10,
                        rows: [
                            {
                                template: `<div class='fieldset-intro'>Personalize the sound for specific types of messages and groups.</div>`,
                                autoheight: true,
                                borderless: true,
                                css: "fieldset-intro-text",
                            },
                            {
                                id: "message_tone_row",
                                height: 40,
                                cols: [
                                    { view: "label", label: "Messages", width: 100, css: "tone-label" },
                                    {
                                        view: "button",
                                        type: "icon",
                                        icon: "mdi mdi-play",
                                        width: 40,
                                        click: "playMessageTone",
                                        tabFocus: true,
                                        tooltip: "Play current message tone sample",
                                        hotkey: "alt+1",
                                        css: "play-button",
                                    },
                                    {
                                        view: "richselect",
                                        name: "message_tone",
                                        options: ["Default", "Chime", "Beep", "Custom"],
                                        value: "Default",
                                        tabFocus: true,
                                        css: "tone-select",
                                        tooltip: "Select a tone for private messages.",
                                    },
                                ],
                            },
                            {
                                // Conditional text input for custom message tone path
                                view: "text",
                                name: "custom_message_tone_path",
                                label: "Custom Tone URL",
                                labelWidth: 150,
                                hidden: true, // Hidden by default
                                placeholder: "e.g., /sounds/my-custom-message.mp3",
                                tooltip: "Enter the direct URL or path to your custom tone file (e.g., .mp3, .ogg).",
                                // Show/hide logic based on 'message_tone' selection
                                bind: "{obj.message_tone}",
                                on: {
                                    onBindApply: function (value) {
                                        if (value === "Custom") {
                                            this.show();
                                        } else {
                                            this.hide();
                                        }
                                    },
                                },
                            },
                            {
                                id: "group_tone_row",
                                height: 40,
                                cols: [
                                    { view: "label", label: "Groups", width: 100, css: "tone-label" },
                                    {
                                        view: "button",
                                        type: "icon",
                                        icon: "mdi mdi-play",
                                        width: 40,
                                        click: "playGroupTone",
                                        tabFocus: true,
                                        tooltip: "Play current group tone sample",
                                        hotkey: "alt+2",
                                        css: "play-button",
                                    },
                                    {
                                        view: "richselect",
                                        name: "group_tone",
                                        options: ["Default", "Chime", "Beep", "Custom"],
                                        value: "Default",
                                        tabFocus: true,
                                        css: "tone-select",
                                        tooltip: "Select a tone for group chat notifications.",
                                    },
                                ],
                            },
                            {
                                // Conditional text input for custom group tone path
                                view: "text",
                                name: "custom_group_tone_path",
                                label: "Custom Tone URL",
                                labelWidth: 150,
                                hidden: true, // Hidden by default
                                placeholder: "e.g., /sounds/my-custom-group.mp3",
                                tooltip: "Enter the direct URL or path to your custom tone file (e.g., .mp3, .ogg).",
                                // Show/hide logic based on 'group_tone' selection
                                bind: "{obj.group_tone}",
                                on: {
                                    onBindApply: function (value) {
                                        if (value === "Custom") {
                                            this.show();
                                        } else {
                                            this.hide();
                                        }
                                    },
                                },
                            },
                        ],
                    },
                },

                {
                    // Action buttons row with an ID for responsive adjustments
                    margin: 20,
                    id: "settings_action_buttons", // Added ID for easier reference in responsive functions
                    cols: [
                        {}, // Spacer
                        {
                            view: "button",
                            id: "reset_button",
                            value: "Reset to Default",
                            minWidth: 150,
                            maxWidth: 250,
                            css: "webix_danger reset-button", // Changed to danger color for emphasis on reset
                            tabFocus: true,
                            tooltip: "Revert all settings to their initial default values.",
                            hotkey: "alt+r",
                            click: function () {
                                webix.confirm({
                                    title: "Reset Notification Settings",
                                    text: "Are you sure you want to reset all notification settings to their default values? This action cannot be undone.",
                                    callback: function (result) {
                                        if (result) {
                                            const form = $$("notificationForm");
                                            if (form) {
                                                // Use the defaultValues object directly for a full reset
                                                form.setValues(NotSettings.defaultValues, true); // true for partial update (merges new values)
                                                webix.message({
                                                    type: "success",
                                                    text: "Notification settings reset to default!",
                                                });
                                            }
                                        }
                                    },
                                });
                            },
                        },
                        { width: 15 }, // Increased space between buttons
                        {
                            view: "button",
                            id: "save_button",
                            value: "Save Changes",
                            minWidth: 150,
                            maxWidth: 250,
                            css: "webix_primary save-button",
                            tabFocus: true,
                            tooltip: "Save your current notification settings.",
                            hotkey: "alt+s",
                            click: function () {
                                webix.confirm({
                                    title: "Save Notification Settings",
                                    text: "Are you sure you want to save these notification settings?",
                                    callback: function (result) {
                                        if (result) {
                                            const form = $$("notificationForm");
                                            if (form) {
                                                const values = form.getValues();
                                                console.log("Saving settings:", values);
                                                // Here, you would typically send `values` to your backend API
                                                webix.message({
                                                    type: "success",
                                                    text: "Notification settings updated successfully!",
                                                });
                                            }
                                        }
                                    },
                                });
                            },
                        },
                    ],
                },
            ],
        },
    ],

    on: {
        onViewResize: function () {
            this.adjust(); // Adjust the scrollview itself
            applyResponsiveLayout(); // Apply custom responsive logic
        },

        onAfterRender: function () {
            // Initialize responsiveness only once after the view is rendered
            initializeResponsiveness();

            // Set up keyboard navigation (already good, ensuring focus management)
            if (webix.UIManager) {
                webix.UIManager.addHotKey("tab", function (view) {
                    const next = webix.UIManager.getNext(view);
                    if (next) webix.UIManager.setFocus(next);
                });

                webix.UIManager.addHotKey("shift+tab", function (view) {
                    const prev = webix.UIManager.getPrev(view);
                    if (prev) webix.UIManager.setFocus(prev);
                });

                webix.UIManager.addHotKey("enter", function (view) {
                    if (view && view.config && view.config.view === "button") {
                        view.callEvent("onItemClick", []);
                    } else if (
                        view &&
                        view.config &&
                        (view.config.view === "checkbox" || view.config.view === "switch" || view.config.view === "segmented")
                    ) {
                        view.setValue(!view.getValue()); // Toggle value for checkbox/switch/segmented
                    } else if (view && view.config && (view.config.view === "combo" || view.config.view === "richselect")) {
                        // For selects, opening the options
                        view.getPopup().show();
                    }
                });

                // Focus the first element for keyboard navigation initially
                const form = $$("notificationForm");
                if (form && form.getChildViews().length > 0) {
                    // Try to focus the first control within the first fieldset
                    const firstFieldsetBody = form.elements[0].body;
                    if (firstFieldsetBody && firstFieldsetBody.rows && firstFieldsetBody.rows.length > 0) {
                        webix.UIManager.setFocus(firstFieldsetBody.rows[1]); // Skip the intro template
                    } else {
                        webix.UIManager.setFocus(form.getChildViews()[0]);
                    }
                }
            }
        },
    },
};

// --- Responsive Functions (Enhanced for robustness) ---

// Store original desktop layouts to revert to
const desktopMessageToneCols = [
    { view: "label", label: "Messages", width: 100, css: "tone-label" },
    { view: "button", type: "icon", icon: "mdi mdi-play", width: 40, click: "playMessageTone", tabFocus: true, tooltip: "Play current message tone sample", hotkey: "alt+1", css: "play-button" },
    { view: "richselect", name: "message_tone", options: ["Default", "Chime", "Beep", "Custom"], value: "Default", tabFocus: true, css: "tone-select", tooltip: "Select a tone for private messages." },
];
const desktopGroupToneCols = [
    { view: "label", label: "Groups", width: 100, css: "tone-label" },
    { view: "button", type: "icon", icon: "mdi mdi-play", width: 40, click: "playGroupTone", tabFocus: true, tooltip: "Play current group tone sample", hotkey: "alt+2", css: "play-button" },
    { view: "richselect", name: "group_tone", options: ["Default", "Chime", "Beep", "Custom"], value: "Default", tabFocus: true, css: "tone-select", tooltip: "Select a tone for group chat notifications." },
];
const desktopButtonCols = [
    {}, // Spacer
    { view: "button", id: "reset_button", value: "Reset to Default", minWidth: 150, maxWidth: 250, css: "webix_danger reset-button", tabFocus: true, tooltip: "Revert all settings to their initial default values.", hotkey: "alt+r" },
    { width: 15 },
    { view: "button", id: "save_button", value: "Save Changes", minWidth: 150, maxWidth: 250, css: "webix_primary save-button", tabFocus: true, tooltip: "Save your current notification settings.", hotkey: "alt+s" },
];

// Function to initialize responsiveness by adding resize listener and applying initial layout
function initializeResponsiveness() {
    window.addEventListener("resize", applyResponsiveLayout);
    applyResponsiveLayout(); // Initial call
    addResponsiveStyles(); // Add custom CSS
}

// Function to apply responsive layout based on screen width
function applyResponsiveLayout() {
    const width = window.innerWidth;
    const form = $$("notificationForm");
    const messageToneRow = $$("message_tone_row");
    const groupToneRow = $$("group_tone_row");
    const actionButtonsRow = $$("settings_action_buttons"); // Reference the new ID

    // Helper to define new elements config
    const updateElementsConfig = (labelPosition, labelWidth) => {
        if (form) {
            form.define("elementsConfig", { labelPosition, labelWidth });
            form.refresh();
        }
    };

    if (width <= 767) {
        // Mobile view adjustments
        console.log("Applying mobile layout");
        updateElementsConfig("top", 0); // Labels above controls

        // Convert tone rows to vertical layout only if not already vertical
        if (messageToneRow && messageToneRow.config.cols && messageToneRow.config.cols.length > 0) {
            messageToneRow.define("cols", []);
            messageToneRow.define("rows", [
                { view: "label", label: "Messages", height: 30, css: "tone-label" },
                {
                    cols: [
                        { view: "button", type: "icon", icon: "mdi mdi-play", width: 40, click: "playMessageTone", css: "play-button" },
                        { view: "richselect", name: "message_tone", options: ["Default", "Chime", "Beep", "Custom"], value: "Default", css: "tone-select" },
                    ],
                },
                { view: "text", name: "custom_message_tone_path", label: "Custom Tone URL", labelWidth: 150, hidden: true, placeholder: "e.g., /sounds/my-custom-message.mp3", bind: "{obj.message_tone}", on: { onBindApply: function(val) { if (val === "Custom") this.show(); else this.hide(); } } },
            ]);
            messageToneRow.define("height", 110); // Adjusted height
            messageToneRow.refresh();
        }

        if (groupToneRow && groupToneRow.config.cols && groupToneRow.config.cols.length > 0) {
            groupToneRow.define("cols", []);
            groupToneRow.define("rows", [
                { view: "label", label: "Groups", height: 30, css: "tone-label" },
                {
                    cols: [
                        { view: "button", type: "icon", icon: "mdi mdi-play", width: 40, click: "playGroupTone", css: "play-button" },
                        { view: "richselect", name: "group_tone", options: ["Default", "Chime", "Beep", "Custom"], value: "Default", css: "tone-select" },
                    ],
                },
                { view: "text", name: "custom_group_tone_path", label: "Custom Tone URL", labelWidth: 150, hidden: true, placeholder: "e.g., /sounds/my-custom-group.mp3", bind: "{obj.group_tone}", on: { onBindApply: function(val) { if (val === "Custom") this.show(); else this.hide(); } } },
            ]);
            groupToneRow.define("height", 110); // Adjusted height
            groupToneRow.refresh();
        }

        // Stack buttons vertically only if not already vertical
        if (actionButtonsRow && actionButtonsRow.config.cols && actionButtonsRow.config.cols.length > 0) {
            actionButtonsRow.define("cols", []);
            actionButtonsRow.define("rows", [
                {}, // Spacer
                {
                    view: "button", id: "reset_button", value: "Reset to Default",
                    css: "webix_danger reset-button", tabFocus: true, tooltip: "Revert all settings to their initial default values.", hotkey: "alt+r", click: NotSettings.rows[1].elements[4].cols[1].click // Reference click handler
                },
                { height: 10 },
                {
                    view: "button", id: "save_button", value: "Save Changes",
                    css: "webix_primary save-button", tabFocus: true, tooltip: "Save your current notification settings.", hotkey: "alt+s", click: NotSettings.rows[1].elements[4].cols[3].click // Reference click handler
                },
            ]);
            actionButtonsRow.refresh();
        }

    } else if (width <= 991) {
        // Tablet view adjustments
        console.log("Applying tablet layout");
        updateElementsConfig("left", 140); // Labels on left, smaller width

        // Reset to horizontal layout if currently vertical
        resetToneRows();
        resetButtonLayout();

    } else {
        // Desktop view adjustments
        console.log("Applying desktop layout");
        updateElementsConfig("left", 180); // Original label width

        // Ensure horizontal layout
        resetToneRows();
        resetButtonLayout();
    }

    webix.ui.resize(); // Force UI adjustment
}

// Function to reset tone rows to original horizontal layout
function resetToneRows() {
    const messageToneRow = $$("message_tone_row");
    const groupToneRow = $$("group_tone_row");

    // Only redefine if currently vertical (check for 'rows' definition)
    if (messageToneRow && messageToneRow.config.rows && messageToneRow.config.rows.length > 0) {
        messageToneRow.define("rows", []); // Clear rows
        messageToneRow.define("cols", desktopMessageToneCols);
        messageToneRow.define("height", 40);
        messageToneRow.refresh();
    }

    if (groupToneRow && groupToneRow.config.rows && groupToneRow.config.rows.length > 0) {
        groupToneRow.define("rows", []); // Clear rows
        groupToneRow.define("cols", desktopGroupToneCols);
        groupToneRow.define("height", 40);
        groupToneRow.refresh();
    }
}

// Function to reset button layout to original horizontal layout
function resetButtonLayout() {
    const actionButtonsRow = $$("settings_action_buttons");
    // Only redefine if currently vertical (check for 'rows' definition)
    if (actionButtonsRow && actionButtonsRow.config.rows && actionButtonsRow.config.rows.length > 0) {
        actionButtonsRow.define("rows", []); // Clear rows
        actionButtonsRow.define("cols", desktopButtonCols);
        actionButtonsRow.refresh();
    }
}

// --- CSS for a more professional look (place this in your main CSS file) ---


// --- Sound Playback Functions (enhanced to handle custom tones) ---
window.playMessageTone = function () {
    const form = $$("notificationForm");
    if (!form) return;

    const values = form.getValues();
    const tone = values.message_tone;
    let audioPath = "";

    if (tone === "Custom") {
        audioPath = values.custom_message_tone_path;
        if (!audioPath) {
            webix.message({ type: "error", text: "Please provide a URL for the custom message tone." });
            return;
        }
    } else {
        audioPath = `/sounds/${tone.toLowerCase()}.mp3`; // Assuming tones are in /sounds/
    }

    webix.message(`Playing "${tone}" message tone.`);
    try {
        const audio = new Audio(audioPath);
        audio.play().catch((e) => console.error("Error playing sound:", e));
    } catch (e) {
        console.error("Error with audio playback:", e);
        webix.message({ type: "error", text: "Failed to play sound. Check the URL or file format." });
    }
};

window.playGroupTone = function () {
    const form = $$("notificationForm");
    if (!form) return;

    const values = form.getValues();
    const tone = values.group_tone;
    let audioPath = "";

    if (tone === "Custom") {
        audioPath = values.custom_group_tone_path;
        if (!audioPath) {
            webix.message({ type: "error", text: "Please provide a URL for the custom group tone." });
            return;
        }
    } else {
        audioPath = `/sounds/${tone.toLowerCase()}.mp3`; // Assuming tones are in /sounds/
    }

    webix.message(`Playing "${tone}" group tone.`);
    try {
        const audio = new Audio(audioPath);
        audio.play().catch((e) => console.error("Error playing sound:", e));
    } catch (e) {
        console.error("Error with audio playback:", e);
        webix.message({ type: "error", text: "Failed to play sound. Check the URL or file format." });
    }
};