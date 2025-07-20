// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptButton = document.getElementById("accept-cookies");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("trafficTrapCookiesAccepted");

  if (!cookiesAccepted && cookieConsent) {
    // Show cookie consent bar after a short delay
    setTimeout(() => {
      cookieConsent.classList.add("show");
    }, 1000);
  }

  // Handle accept button click
  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      // Store acceptance in localStorage
      localStorage.setItem("trafficTrapCookiesAccepted", "true");

      // Hide the cookie consent bar
      cookieConsent.classList.remove("show");

      // Add a small delay before completely removing from DOM
      setTimeout(() => {
        cookieConsent.style.display = "none";
      }, 500);

      console.log("🍪 Cookies accepted and stored in localStorage");
    });
  }

  // Function to check if cookies are accepted
  window.checkCookiesAccepted = function () {
    return localStorage.getItem("trafficTrapCookiesAccepted") === "true";
  };

  // Function to reset cookie consent (for testing)
  window.resetCookieConsent = function () {
    localStorage.removeItem("trafficTrapCookiesAccepted");
    if (cookieConsent) {
      cookieConsent.style.display = "block";
      cookieConsent.classList.add("show");
    }
    console.log("🍪 Cookie consent reset");
  };
});
