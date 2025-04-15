import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const MyForm = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }

    try {
      const response = await fetch("http://localhost:3008/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaValue }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Form submitted successfully!");
      } else {
        alert("Captcha verification failed!");
      }
    } catch (error) {
      console.error("Error verifying CAPTCHA:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <ReCAPTCHA
        sitekey="6LfUlQArAAAAAOoM9hlIKJrUr7DW4aUlu-ZdeSpX" // Replace with your actual site key
        onChange={handleCaptchaChange}
      />
      
    </form>
  );
};

export default MyForm;
