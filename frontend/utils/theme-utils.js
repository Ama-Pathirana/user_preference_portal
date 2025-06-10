// theme-utils.js

// Function to darken a hex color (helper for accent color)
function darkenColor(hex, percent) {
    // ... (your existing darkenColor logic) ...
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
}

// Export toggleAccentColor
export const toggleAccentColor = function (color) {
    // ... (your existing toggleAccentColor logic) ...
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    if (!isValidHex) {
        console.warn(`Invalid accent color format: ${color}. Using default blue.`);
        color = '#3498db'; // Fallback to a default hex color
    }

    const hoverColor = darkenColor(color, 0.1);
    const activeColor = darkenColor(color, 0.2);
    const textColorOnAccent = webix.color.lightness(color) < 170 ? '#ffffff' : '#333333';

    document.documentElement.style.setProperty('--accent-color-primary', color);
    document.documentElement.style.setProperty('--accent-color-hover', hoverColor);
    document.documentElement.style.setProperty('--accent-color-active', activeColor);
    document.documentElement.style.setProperty('--accent-text-color', textColorOnAccent);

    document.body.setAttribute('data-accent-color', color);

    const event = new CustomEvent('accentColorChanged', {
        detail: { color: color }
    });
    window.dispatchEvent(event);

    try {
        localStorage.setItem('app_accent_color', color);
    } catch (e) {
        console.warn('Could not save accent color to local storage', e);
    }
};

// Export toggleTheme
export const toggleTheme = function (isDark) {
    // ... (your existing toggleTheme logic) ...
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    webix.skin.set(isDark ? "dark" : "material");

    try {
        localStorage.setItem('app_theme_mode', isDark ? "dark" : "light");
    } catch (e) {
        console.warn('Could not save theme mode to local storage', e);
    }

    const event = new CustomEvent('themeChanged', {
        detail: { theme: isDark ? "dark" : "light" }
    });
    window.dispatchEvent(event);
};

// Export toggleFont
export const toggleFont = function (fontType) {
    // ... (your existing toggleFont logic) ...
    const fontMap = {
        default: "Roboto, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        monospace: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
    };

    document.documentElement.style.setProperty('--main-font-family', fontMap[fontType] || fontMap.default);
    document.body.setAttribute("data-font", fontType);

    try {
        localStorage.setItem('app_font_style', fontType);
    } catch (e) {
        console.warn('Could not save font style to local storage', e);
    }
};

// Export initializeThemeSettings
export const initializeThemeSettings = function () {
    // ... (your existing initializeThemeSettings logic) ...
    // Note: ThemeSettings is not yet imported here, so it needs to be passed or imported if needed.
    // For simplicity, we'll assume ThemeSettings.defaultValues can be accessed globally,
    // or better, you'd pass it as an argument or import it too.
    // For now, let's just use the defaults as hardcoded in the values below.
    let savedThemeMode = 'light';
    try {
        savedThemeMode = localStorage.getItem('app_theme_mode') || 'light';
    } catch (e) { console.warn('Could not load theme mode from local storage', e); }
    toggleTheme(savedThemeMode === 'dark'); // Call the exported function

    let savedFontStyle = 'default';
    try {
        savedFontStyle = localStorage.getItem('app_font_style') || 'default';
    } catch (e) { console.warn('Could not load font style from local storage', e); }
    toggleFont(savedFontStyle); // Call the exported function

    let savedAccentColor = '#3498db';
    try {
        savedAccentColor = localStorage.getItem('app_accent_color') || '#3498db';
    } catch (e) { console.warn('Could not load accent color from local storage', e); }
    toggleAccentColor(savedAccentColor); // Call the exported function

    let savedContrastMode = false;
    try {
        savedContrastMode = localStorage.getItem('accessibility_contrast_mode') === 'true';
    } catch (e) { console.warn('Could not load contrast mode from local storage', e); }
    document.body.classList.toggle("high-contrast", savedContrastMode);

    let savedReducedMotion = false;
    try {
        savedReducedMotion = localStorage.getItem('accessibility_reduced_motion') === 'true';
    } catch (e) { console.warn('Could not load reduced motion from local storage', e); }
    document.body.classList.toggle("reduced-motion", savedReducedMotion);

    webix.ui(() => {
        const form = $$("themeForm");
        if (form) {
            form.setValues({
                theme_mode: savedThemeMode,
                font_style: savedFontStyle,
                accent_color: savedAccentColor,
                contrast_mode: savedContrastMode,
                reduced_motion: savedReducedMotion,
            });
        }
    });
};

// Export applyResponsiveLayout
export const applyResponsiveLayout = function () {
    // ... (your existing applyResponsiveLayout logic) ...
    const width = window.innerWidth;
    const form = $$("themeForm");
    const resetButton = $$("reset_theme_button");
    const saveButton = $$("save_theme_button");
    const buttonContainer = resetButton ? resetButton.getParentView() : null;

    if (!form || !buttonContainer || !resetButton || !saveButton) return;

    if (width <= 767) {
        form.define("elementsConfig", { labelPosition: "top", labelWidth: "auto" });
        buttonContainer.define("cols", []);
        buttonContainer.define("rows", [
            {},
            { ...resetButton.config, width: 250, maxWidth: 250 },
            { height: 10 },
            { ...saveButton.config, width: 250, maxWidth: 250 },
        ]);
    } else {
        form.define("elementsConfig", { labelPosition: "left", labelWidth: 150 });
        buttonContainer.define("rows", []);
        buttonContainer.define("cols", [
            {},
            { ...resetButton.config, width: 150, maxWidth: 250 },
            { width: 10 },
            { ...saveButton.config, width: 150, maxWidth: 250 },
        ]);
    }
    form.reconstruct();
    if (webix && webix.ui && webix.ui.resize) {
        webix.ui.resize();
    }
};

// Export initializeResponsiveness
export const initializeResponsiveness = function () {
    // ... (your existing initializeResponsiveness logic) ...
    window.removeEventListener("resize", applyResponsiveLayout);
    window.addEventListener("resize", applyResponsiveLayout);
    applyResponsiveLayout();
};

// Note: No need for `document.addEventListener('DOMContentLoaded', window.initializeThemeSettings);` here anymore.
// That will be handled in your main application file after importing.