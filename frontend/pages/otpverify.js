export const OtpVerificationPage = {
    id: "otpverification",
    css: "otp-verification-page",
    rows: [
      { gravity: 1 },
      {
        cols: [
          { gravity: 1 },
          {
            view: "form",
            id: "otp_verification_form",
            css: "otp-verification-container",
            borderless: true,
            width: Math.min(window.innerWidth * 0.8, 400),
            elements: [
              {
                view: "toolbar",
                css: "otp-verification-header",
                height: 50,
                borderless: true,
                elements: [
                  {
                    view: "icon",
                    icon: "wxi-angle-left",
                    css: "back-arrow",
                    click: function () {
                      showView("forgotpassword"); 
                    }
                  },
                  {
                    view: "label",
                    label: "OTP Verification",
                    css: "otp-verification-title",
                    align: "center"
                  },
                ]
              },
              {
                view: "template",
                css: "otp-description",
                template: "<div class='otp-text'>Please check your email to see the verification code.</div>",
                height: 50,
                borderless: true
              },
              {
                view: "label",
                label: "Verification Code",
                css: "otp-label"
              },
              {
                cols: [
                    { 
                      view: "text", 
                      id: "otp1", 
                      css: "otp-input", 
                      inputAlign: "center", 
                      width: 50, 
                      attributes: { maxlength: 1 }, 
                      on: {
                        onKeyPress: function(code, e) {
                          // Allow only numbers
                          if (!/^\d$/.test(e.key)) {
                            e.preventDefault();  // Prevent non-numeric input
                          }
                        },
                        onKeyUp: function(code, e) {
                          if (code === 39 || code === 13) { // Right arrow or Enter key
                            $$("otp2").focus();
                          } else if (code === 37) { // Left arrow key
                            $$("otp1").focus();
                          } else if (code === 8 && e.target.value === "") { // Backspace key and field is empty
                            $$("otp1").focus(); // Go backward if backspace is pressed in an empty field
                          }
                        }
                      }
                    },
                    { 
                      view: "text", 
                      id: "otp2", 
                      css: "otp-input", 
                      inputAlign: "center", 
                      width: 50, 
                      attributes: { maxlength: 1 }, 
                      on: {
                        onKeyPress: function(code, e) {
                          // Allow only numbers
                          if (!/^\d$/.test(e.key)) {
                            e.preventDefault();  // Prevent non-numeric input
                          }
                        },
                        onKeyUp: function(code, e) {
                          if (code === 39 || code === 13) { // Right arrow or Enter key
                            $$("otp3").focus();
                          } else if (code === 37) { // Left arrow key
                            $$("otp1").focus();
                          } else if (code === 8 && e.target.value === "") { // Backspace key and field is empty
                            $$("otp1").focus(); // Go backward if backspace is pressed in an empty field
                          }
                        }
                      }
                    },
                    { 
                      view: "text", 
                      id: "otp3", 
                      css: "otp-input", 
                      inputAlign: "center", 
                      width: 50, 
                      attributes: { maxlength: 1 }, 
                      on: {
                        onKeyPress: function(code, e) {
                          // Allow only numbers
                          if (!/^\d$/.test(e.key)) {
                            e.preventDefault();  // Prevent non-numeric input
                          }
                        },
                        onKeyUp: function(code, e) {
                          if (code === 39 || code === 13) { // Right arrow or Enter key
                            $$("otp4").focus();
                          } else if (code === 37) { // Left arrow key
                            $$("otp2").focus();
                          } else if (code === 8 && e.target.value === "") { // Backspace key and field is empty
                            $$("otp2").focus(); // Go backward if backspace is pressed in an empty field
                          }
                        }
                      }
                    },
                    { 
                      view: "text", 
                      id: "otp4", 
                      css: "otp-input", 
                      inputAlign: "center", 
                      width: 50, 
                      attributes: { maxlength: 1 },
                      on: {
                        onKeyPress: function(code, e) {
                          // Allow only numbers
                          if (!/^\d$/.test(e.key)) {
                            e.preventDefault();  // Prevent non-numeric input
                          }
                        },
                        onKeyUp: function(code, e) {
                          if (code === 37) { // Left arrow key
                            $$("otp3").focus();
                          } else if (code === 8 && e.target.value === "") { // Backspace key and field is empty
                            $$("otp3").focus(); // Go backward if backspace is pressed in an empty field
                          }
                        }
                      }
                    }
                  ]
                  
                  
              },
              {
                view: "button",
                value: "Verify",
                css: "otp-verify-button",
                height: 50,
                click: function () {
                  const values = $$("otp_verification_form").getValues();
                  const otp = values.otp1 + values.otp2 + values.otp3 + values.otp4;
                  
                  if (otp.length === 4 && /^\d{4}$/.test(otp)) {
                    webix.message("OTP Verified Successfully");
                    showView("resetpassword"); // Redirect to reset password page
                  } else {
                    webix.message({ type: "error", text: "Invalid OTP. Please enter a 4-digit code." });
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
  