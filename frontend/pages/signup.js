import { updateProfile } from "../utils/updateprofile.js";
import { addUser, checkUserExists } from "../utils/dataService.js";

export const SignupPage = {
  id: "signup",
  rows: [
    { gravity: 1 },
    {
      cols: [
        { gravity: 1 },
        {
          view: "form",
          id: "signup_form",
          borderless: true,
          width: Math.min(window.innerWidth * 0.8, 400),
          elements: [
            {
              view: "toolbar",
              height: 50,
              borderless: true,
              elements: [
                {
                  view: "icon",
                  icon: "wxi-angle-left",
                  click: function () {
                    showView("home");
                  }
                },
                {
                  view: "label",
                  id: "signup_label",
                  label: "Sign Up",
                  align: "center",
                  css: "dark-label",

                },
              ]
            },
            {
              view: "text",
              name: "first_name",
              css: "dark-input",
              placeholder: "First Name",
              required: true
            },
            {
              view: "text",
              name: "last_name",
              css: "dark-input",
              placeholder: "Last Name",
              
              required: true
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
              type: "password",
              name: "password",
              id: "password_input",
              placeholder: "Password",
              required: true,
              validate: function (value) {
                return value.length >= 6;
              },
              on: {
                onTimedKeyPress: function () {
                  const value = this.getValue();
                  if (value.length < 6) {
                    $$("password_error").setHTML("<span style='color: red;'>Password must contain a minimum of 6 characters and include both letters.</span>");
                  } else {
                    $$("password_error").setHTML("");
                  }
                }
              }
            },

// confirm password field

            {
              view: "text",
              name: "confirm_password",
              type: "password",
              id: "confirm_password_input",
              placeholder: "Confirm Password",
              required: true,
              validate: function (value) {
                const original = $$("password_input").getValue();
                return value === original;
              },
              on: {
                onTimedKeyPress: function () {
                  const confirmValue = this.getValue();
                  const originalValue = $$("password_input").getValue();

                  if (confirmValue !== originalValue) {
                    $$("confirm_password_error").setHTML("<span style='color: red;'>Passwords do not match.</span>");
                  } else {
                    $$("confirm_password_error").setHTML("");
                  }
                }
              }
            },
            {
              view: "template",
              id: "confirm_password_error",
              borderless: true,
              height: 20,
              template: ""
            },
            
            {
              view: "template",
              id: "password_error",
              borderless: true,
              height: 40,
              template: ""
            },
            {
              view: "button",
              value: "Sign Up",
              height: 50,
              click: async function () {
                if ($$("signup_form").validate()) {
                  const values = $$("signup_form").getValues();
                  const newUser = {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password 
                  };

                  try {
                    if (await checkUserExists(newUser.email)) {
                      webix.message({ type: "error", text: "User already exists" });
                      return;
                    }

                    //const addedUser = await addUser(newUser);
                    // localStorage.setItem("userProfile", JSON.stringify(addedUser));
                    // updateProfile(addedUser);
                    const user = {
                      email: newUser.email,
                      password: newUser.password
                    };

                    sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email, password: user.password }));
                    localStorage.setItem("loggedUser", JSON.stringify(user));
                    webix.message("Account created successfully");
                    showView("login"); 
                  } catch (error) {
                    console.error("Error registering user:", error);
                    webix.message({ type: "error", text: error.message });
                  }
                } else {
                  webix.message({ type: "error", text: "Please enter valid details" });
                }
              }
            },
            { height: 15 },
            {
              view: "template",
              template: "<div class='login-text'>Already have an account? <a href='#' class='login-link'>Log in</a></div>",
              height: 40,
              borderless: true,
              onClick: {
                "login-link": function () {
                  showView("login");
                }
              }
            }
          ],
          rules: {
            "first_name": webix.rules.isNotEmpty,
            "last_name": webix.rules.isNotEmpty,
            "email": webix.rules.isEmail,
            "password": function (value) {
              return value.length >= 6 && /[A-Za-z]/.test(value);
            },
            "confirm_password": function (value) {
              return value === $$("password_input").getValue();
            }
          }
        },
        { gravity: 1 }
      ]
    },
    { gravity: 1 }
  ]
};
