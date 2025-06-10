import { Navbar } from "./components/navbar.js";
import { HomePage } from "./pages/home.js";
import { LoginPage } from "./pages/login.js";
import { SignupPage } from "./pages/signup.js";
import { SettingsPage } from "./pages/settings.js";
import { ForgotPasswordPage } from "./pages/forgotpassword.js";
import { OtpVerificationPage } from "./pages/otpverify.js";




webix.ready(function () {
  let isDarkMode = false;

  webix.ui({
    container: "app",
    rows: [
      Navbar,
      {
        view: "scrollview",
        body: {
          view: "multiview",
          id: "mainView",
          cells: [
            { id: "home", ...HomePage },
            { id: "login", ...LoginPage },
            { id: "signup", ...SignupPage },
            { id: "settings", ...SettingsPage },
            { id: "forgotpassword", ...ForgotPasswordPage },
            { id: "otpverification", ...OtpVerificationPage },
          ],
        },
      },
    ],
  });

  // Function to handle navigation
  window.showView = function (viewId) {
    $$("mainView").setValue(viewId);
  };

  // Set default view
  showView("home");

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
    isDarkMode = isDark; 
  };

  // Keyboard Navigation
  webix.event(document, "keydown", function (e) {
    const multiview = $$("mainView");
    const views = multiview.getChildViews();
    let currentIndex = views.findIndex(
      (view) => view.config.id === multiview.getValue()
    );
    
    let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;

    if (e.ctrlKey && e.key === "ArrowRight") {
      // Move to next view
      let nextIndex = (currentIndex + 1) % views.length;
      multiview.setValue(views[nextIndex].config.id);

      e.preventDefault(); // Prevent tabbing out of the app
    } else if (e.ctrlKey && e.key === "ArrowLeft") {
      // Move to previous view
      let prevIndex = (currentIndex - 1 + views.length) % views.length;
      multiview.setValue(views[prevIndex].config.id);
    } else if (e.key === "ArrowDown") {
      let currentIndex;
    } else if (e.key === "Enter") {
      // Reload current view (or trigger an action)
      multiview.setValue(views[currentIndex].config.id);
    } else if (e.altKey && e.key === "h") {
      showView("home");
    } else if (e.altKey && e.key === "l") {
      showView("login");
    } else if (e.altKey && e.key == "s") {
      showView("signup");
    }

    if (e.altKey && e.key === "t") {
      toggleTheme(!isDarkMode);
    }
  });
});
