export const ThemeSettings = {
  id: "themes",

  responsive: true,
  adaptivity: true,
  type: "clean",

  // ACCENT_COLORS are no longer strictly needed here if using a color picker
  // but kept for reference if you have specific pre-defined palettes you still want to support
  ACCENT_COLORS: {
    blue: {
      primary: "#3498db",
      hover: "#2980b9",
      active: "#2c3e50",
    },
    green: {
      primary: "#2ecc71",
      hover: "#27ae60",
      active: "#2c3e50",
    },
    purple: {
      primary: "#9b59b6",
      hover: "#8e44ad",
      active: "#2c3e50",
    },
    red: {
      primary: "#e74c3c",
      hover: "#c0392b",
      active: "#2c3e50",
    },
  },

  defaultValues: {
    theme_mode: "light",
    font_style: "default",
    accent_color: "#3498db", // Default to a blue hex code
    contrast_mode: false,
    reduced_motion: false,
  },

  rows: [
    {
      template: "<h2 tabindex='0' class='settings-title'>Theme & Appearance</h2>",
      autoheight: true,
      css: "settings-title",
    },
    {
      view: "form",
      id: "themeForm",
      scroll: true,
      elementsConfig: {
        labelPosition: "left",
      },
      elements: [
        {
          view: "fieldset",
          label: "Color Theme",
          body: {
            paddingY: 10,
            rows: [
              {
                view: "segmented",
                label: "Mode",
                name: "theme_mode",
                labelWidth: 150,
                options: [
                  { id: "light", value: "Light" },
                  { id: "dark", value: "Dark" },
                ],
                tabFocus: true,
                tooltip: "Switch between light and dark themes",
                on: {
                  onChange: function (newv) {
                    window.toggleTheme(newv === "dark");
                  },
                },
              },
              {
                // Replaced segmented with a text input for color picker
                view: "colorpicker", // Webix colorpicker control
                label: "Accent Color",
                name: "accent_color",
                labelWidth: 150,
                value: "#3498db", // Initial default color
                tabFocus: true,
                tooltip: "Choose your accent color",
                on: {
                  onChange: function (newv) {
                    window.toggleAccentColor(newv);
                    console.log("Accent color changed to:", newv);
                  },
                },
              },
            ],
          },
        },

        {
          view: "fieldset",
          label: "Typography",
          body: {
            paddingY: 10,
            rows: [
              {
                view: "segmented",
                label: "Font Style",
                name: "font_style",
                labelWidth: 150,
                options: [
                  { id: "default", value: "Default" },
                  { id: "serif", value: "Serif" },
                  { id: "monospace", value: "Monospace" },
                  
                ],
                tabFocus: true,
                tooltip: "Choose your preferred font style",
                on: {
                  onChange: function (newv) {
                    window.toggleFont(newv);
                  },
                },
              },
            ],
          },
        },

        {
          view: "fieldset",
          label: "Accessibility",
          body: {
            paddingY: 10,
            rows: [
              {
                view: "switch",
                label: "High Contrast Mode",
                name: "contrast_mode",
                labelWidth: 150,
                onLabel: "On",
                offLabel: "Off",
                tabFocus: true,
                tooltip: "Enable high contrast for better readability",
                on: {
                  onChange: function (newv) {
                    document.body.classList.toggle("high-contrast", newv);
                  },
                },
              },
              {
                view: "switch",
                label: "Reduced Motion",
                name: "reduced_motion",
                labelWidth: 150,
                onLabel: "On",
                offLabel: "Off",
                tabFocus: true,
                tooltip: "Minimize animations for motion sensitivity",
                on: {
                  onChange: function (newv) {
                    document.body.classList.toggle("reduced-motion", newv);
                  },
                },
              },
            ],
          },
        },

        {
          margin: 20,
          cols: [
            {},
            {
              view: "button",
              id: "reset_theme_button",
              value: "Reset to Default",
              minWidth: 150,
              maxWidth: 250,
              css: "reset-button",
              tabFocus: true,
              tooltip: "Reset all theme settings to default",
              hotkey: "alt+r",
              click: function () {
                const form = $$("themeForm");
                if (form) {
                  form.clear();
                  form.setValues({
                    theme_mode: "light",
                    font_style: "default",
                    accent_color: "#3498db", // Reset accent color to default blue hex
                    contrast_mode: false,
                    reduced_motion: false,
                  });

                  // Reset visual settings
                  window.toggleTheme(false);
                  window.toggleFont("default");
                  window.toggleAccentColor("#3498db"); // Reset accent color visually
                  document.body.classList.remove(
                    "high-contrast",
                    "reduced-motion"
                  );

                  webix.message("Theme settings reset to default");
                }
              },
            },

            {
              view: "button",
              id: "save_theme_button",
              value: "Save Changes",
              minWidth: 150,
              maxWidth: 250,
              css: "webix_primary save-button",
              tabFocus: true,
              tooltip: "Save your theme preferences",
              hotkey: "alt+s",
              click: function () {
                const form = $$("themeForm");
                if (form) {
                  const values = form.getValues();
                  // save these values to your backend here
                  console.log("Saving theme settings:", values);
                  webix.message({
                    type: "success",
                    text: "Theme settings updated!",
                  });
                }
              },
            },
          ],
        },
      ],
    },
  ],

  on: {
    onViewResize: function () {
      // Adjust layout for different screen sizes
      this.adjust();
      applyResponsiveLayout();
    },

    onAfterRender: function () {
      // Initialize responsiveness
      initializeResponsiveness();

      // Set up keyboard navigatio
      if (webix.UIManager) {
        webix.UIManager.addHotKey("enter", function (view) {
          if (view && view.config && view.config.view === "button") {
            view.callEvent("onItemClick", []);
          } else if (
            view &&
            view.config &&
            (view.config.view === "checkbox" ||
              view.config.view === "switch" ||
              view.config.view === "segmented")
          ) {
            view.setValue(!view.getValue());
          }
        });

        // Focus the first element for keyboard navigation
        const form = $$("themeForm");
        if (form && form.getChildViews().length > 0) {
          webix.UIManager.setFocus(form.getChildViews()[0]);
        }
      }
    },
  },
};

// Global function for accent color toggling
window.toggleAccentColor = function (color) {
  // Validate color format (simple check for hex)
  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  if (!isValidHex) {
    console.warn(`Invalid accent color format: ${color}. Using default blue.`);
    color = '#3498db'; // Fallback to a default hex color
  }

  // Create or update style element
  let styleElement = document.getElementById('accent-color-style');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'accent-color-style';
    document.head.appendChild(styleElement);
  }

  // Define hover and active colors based on the chosen primary color
  // You might want a more sophisticated color manipulation library for this
  // For simplicity, I'll darken the primary color for hover/active states.
  const darkenColor = (hex, percent) => {
    let f = parseInt(hex.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      "#" +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  };

  const hoverColor = darkenColor(color, 0.15); // Darken by 15%
  const activeColor = darkenColor(color, 0.3); // Darken by 30%

  // Generate CSS for segmented views and other UI elements
  styleElement.textContent = `
    /* Accent Color Styles for primary and hover states */
    .webix_button.webix_primary,
    .webix_primary {
      background-color: ${color} !important;
      border-color: ${color} !important;
    }
      
    .webix_button.webix_primary:hover,
    .webix_primary:hover {
      background-color: ${hoverColor} !important;
      border-color: ${hoverColor} !important;
    }

    /* Style for segmented control selected option */
    .webix_segmented .webix_selected {
      background-color: ${color} !important;
      border-color: ${color} !important;
    }

    .webix_segmented .webix_selected:hover {
      background-color: ${hoverColor} !important;
      border-color: ${hoverColor} !important;
    }

    /* Additional UI elements that might use the accent color */
    .webix_datatable .webix_ss_header .webix_hcell.webix_sort_active,
    .webix_selected {
      background-color: ${color};
    }
    .webix_selected:hover {
      background-color: ${hoverColor};
    }

    /* Focus and active states for interactive elements */
    .webix_el_button.webix_focused,
    .webix_el_segmented.webix_focused .webix_selected,
    .webix_el_switch.webix_focused {
      box-shadow: 0 0 0 2px ${color};
      outline: none; /* Remove default outline */
    }

    /* Example for active states - adjust as needed for your specific Webix components */
    .webix_button:active,
    .webix_segmented_item:active {
      background-color: ${activeColor} !important;
      border-color: ${activeColor} !important;
    }
  `;

  // Update body attribute for tracking
  document.body.setAttribute('data-accent-color', color);

  // Update colorpicker control in theme settings if exists
  const themeForm = $$("themeForm");
  if (themeForm) {
    const accentColorControl = themeForm.getChildViews().find(view =>
      view.config.name === "accent_color"
    );
    if (accentColorControl) {
      accentColorControl.setValue(color);
    }
  }

  // Dispatch custom event
  const event = new CustomEvent('accentColorChanged', {
    detail: { color: color }
  });
  window.dispatchEvent(event);

  // Store in local storage for persistence
  try {
    localStorage.setItem('app_accent_color', color);
  } catch (e) {
    console.warn('Could not save accent color to local storage', e);
  }
};

// Initialize accent color on page load
window.initAccentColor = function () {
  // Try to get saved accent color from local storage
  let savedColor = '#3498db'; // default blue hex code
  try {
    savedColor = localStorage.getItem('app_accent_color') || '#3498db';
  } catch (e) {
    console.warn('Could not retrieve accent color from local storage', e);
  }

  // Apply the saved or default accent color
  window.toggleAccentColor(savedColor);
};

// Call initialization on page load
window.addEventListener('load', window.initAccentColor);

// Responsive layout function (similar to NotSettings)
function applyResponsiveLayout() {
  const width = window.innerWidth;
  const form = $$("themeForm");
  const saveButton = $$("save_theme_button");
  const resetButton = $$("reset_theme_button");

  if (width <= 767) {
    // Mobile view adjustments
    if (form) {
      form.define("elementsConfig", { labelPosition: "top" });
      form.refresh();
    }

    // Stack buttons vertically
    if (resetButton && saveButton) {
      resetButton.getParentView().define("cols", []);
      resetButton.getParentView().define("rows", [
        {},
        {
          view: "button",
          id: "reset_theme_button",
          css: "webix_primary reset-button",
          value: "Reset to Default",
          css: "reset-button",
          click: resetButton.config.click, // Keep the original click handler
        },
        { height: 10 },
        {
          view: "button",
          id: "save_theme_button",
          value: "Save Changes",
          css: "webix_primary save-button",
          click: saveButton.config.click, // Keep the original click handler
        },
      ]);
      resetButton.getParentView().refresh();
    }
  } else {
    // Desktop/Tablet view
    if (form) {
      form.define("elementsConfig", { labelPosition: "left", labelWidth: 150 });
      form.refresh();
    }

    // Reset button layout
    if (resetButton && saveButton) {
      resetButton.getParentView().define("rows", []);
      resetButton.getParentView().define("cols", [
        {},
        {
          view: "button",
          id: "reset_theme_button",
          value: "Reset to Default",
          width: 150,
          css: "wewbix_primary reset-button",
          click: resetButton.config.click, // Keep the original click handler
        },
        { width: 10 },
        {
          view: "button",
          id: "save_theme_button",
          value: "Save Changes",
          width: 150,
          css: "webix_primary save-button",
          click: saveButton.config.click, // Keep the original click handler
        },
      ]);
      resetButton.getParentView().refresh();
    }
  }

  // Force UI to adjust
  if (webix && webix.ui && webix.ui.resize) {
    webix.ui.resize();
  }
}

// Initialize responsiveness
function initializeResponsiveness() {
  window.addEventListener("resize", applyResponsiveLayout);
  applyResponsiveLayout();
}

// Global functions for theme and font toggling (as you provided)
window.toggleTheme = function (isDark) {
  const darkTheme = document.querySelector('link[href*="dark.css"]');
  if (isDark) {
    darkTheme.removeAttribute("disabled"); // Enable the dark theme
    webix.skin.set("dark");
    document.body.classList.add("dark-mode");
  } else {
    darkTheme.setAttribute("disabled", "true"); // Disable the dark theme
    webix.skin.set("material");
    document.body.classList.remove("dark-mode");
  }
  window.isDarkMode = isDark;
};

window.toggleFont = function (fontType) {
  // Define your font options
  const fontOptions = {
    default: "'Roboto', sans-serif",
    serif: "'Times New Roman', serif",
    monospace: "'Courier New', monospace",
  };

  // Get the current style element or create a new one
  let styleElement = document.getElementById("custom-font-style");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "custom-font-style";
    document.head.appendChild(styleElement);
  }

  // Set the new font
  if (fontOptions[fontType]) {
    styleElement.textContent = `
          .webix_view, .webix_el_box {
            font-family: ${fontOptions[fontType]} !important;
          }
        `;
    // Optionally, you can set a data attribute on body to track the current font
    document.body.setAttribute("data-font", fontType);
  } else {
    console.warn(`Font type '${fontType}' not recognized. Using default.`);
    styleElement.textContent = "";
    document.body.removeAttribute("data-font");
  }
};