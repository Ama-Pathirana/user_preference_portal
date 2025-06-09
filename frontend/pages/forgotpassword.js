import { checkUserByEmail } from "../utils/dataService.js";

export const ForgotPasswordPage = {
  id: "forgotpassword",
  css: "forgot-password-page",
  rows: [{
    view: "template", 
    id: "backgroundContainer", 
    css: "background-container-f", 
    height: 1 
  },
    { gravity: 1 },
    {
      cols: [
        { gravity: 1 },
        {
          view: "form",
          id: "forgot_password_form",
          css: "forgot-password-container",
          borderless: true,
          width: Math.min(window.innerWidth * 0.8, 400),
          elements: [
            {
              view: "toolbar",
              css: "forgot-password-header",
              height: 50,
              borderless: true,
              elements: [
                {
                  cols: [
                    {
                      view: "icon",
                      icon: "wxi-angle-left",
                      css: "back-arrow",
                      click: function () {
                        showView("login"); // Navigate back to the login page
                      }
                    },
                    {
                      view: "label",
                      label: "Forgot Password",
                      css: "forgot-password-title",
                      align: "center"
                    }
                  ]
                }
              ]
            },
            {
              view: "text",
              name: "email",
              css: "dark-input",
              placeholder: "Email",
              required: true,
              validate: webix.rules.isEmail
            },
            {
              view: "text",
              name: "confirm_email",
              css: "dark-input",
              placeholder: "Confirm Email",
              required: true,
              validate: function (value) {
                return value === $$("forgot_password_form").getValues().email;
              }
            },
            {
              view: "button",
              value: "Send OTP",
              css: "otp-button",
              height: 50,
              click: async function () {
                let form = $$("forgot_password_form");
                let values = form.getValues();

                if (form.validate()) {
                  try {
                    const user = await checkUserByEmail(values.email);
                    

                    if (!user) {
                      webix.modalbox({
                        title: "Not Registered",
                        text: "You are not registered. Want to create an account?",
                        buttons: ["Cancel", "Sign Up"],
                        callback: function (result) {
                          if (result === 1) {
                            webix.ui(SignUpPage);
                          }
                        }
                      });
                      return;
                    }

                    // Simulate sending OTP (Replace this with an API call)
                    webix.message("OTP Sent to your Email");

                    setTimeout(() => {
                      showView("otpverification");
                    }, 500);
                  } catch (error) {
                    console.error("Error checking user:", error);
                    webix.message({ type: "error", text: "Something went wrong. Try again later." });
                  }
                } else {
                  webix.message({ type: "error", text: "Emails do not match or invalid email format" });
                }
              }
            }
          ]
        },
        { gravity: 1 }
      ]
    },
    { gravity: 1 }
  ]
};
