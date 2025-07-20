// Contact Center JavaScript - Unique Functions

// Global Contact Variables
let contactChaos = false;
let messageQueue = [];
let emergencyContact = false;
let formSubmission = false;

// DOM Elements
const contactInfoContent = document.getElementById("contact-info-content");
const contactForm = document.getElementById("contact-form");

// Initialize Contact System
function initializeContactSystem() {
  console.log("📞 Contact system initializing...");
  loadContactInfo();
  setupContactForm();
  activateContactChaos();
}

// Load Contact Information
async function loadContactInfo() {
  try {
    const response = await fetch("assets/data/contact-info.json");
    const contactData = await response.json();
    renderContactInfo(contactData.contacts);
    console.log("📞 Contact info loaded");
  } catch (error) {
    console.error("📞 Contact info loading failed:", error);
    createEmergencyContactInfo();
  }
}

// Render Contact Information
function renderContactInfo(contacts) {
  if (!contactInfoContent) return;

  const contactHTML = contacts
    .map(
      (contact) => `
        <div class="trap-card">
            <h3 class="panic-title">${contact.title}</h3>
            <p class="gridlock-text"><strong>Email:</strong> ${contact.email}</p>
            <p class="gridlock-text"><strong>Phone:</strong> ${contact.phone}</p>
            <p class="gridlock-text"><strong>Location:</strong> ${contact.location}</p>
            <p class="gridlock-text">${contact.description}</p>
        </div>
    `
    )
    .join("");

  contactInfoContent.innerHTML = contactHTML;
}

// Emergency Contact Info
function createEmergencyContactInfo() {
  if (!contactInfoContent) return;

  const emergencyContacts = [
    {
      title: "Main Office",
      email: "chaos@experiencehb.com",
      phone: "+39 091 616 5691",
      location: "Via Roma, 375, 90133 Palermo PA, Italia",
      description:
        "Our main headquarters where all the traffic chaos is coordinated.",
    },
    {
      title: "Support Team",
      email: "support@experiencehb.com",
      phone: "+39 091 616 5691",
      location: "Via Roma, 375, 90133 Palermo PA, Italia",
      description:
        "Technical support and game assistance for all your traffic trap needs.",
    },
    {
      title: "Emergency Hotline",
      email: "emergency@experiencehb.com",
      phone: "+39 091 616 5691",
      location: "Via Roma, 375, 90133 Palermo PA, Italia",
      description: "24/7 emergency support for critical traffic situations.",
    },
  ];

  renderContactInfo(emergencyContacts);
}

// Setup Contact Form
function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleFormSubmission();
  });
}

// Handle Form Submission
function handleFormSubmission() {
  if (formSubmission) return;

  const formData = new FormData(contactForm);
  const driverName = formData.get("driverName").trim();
  const phoneNumber = formData.get("phoneNumber").trim();
  const messageText = formData.get("messageText").trim();

  // Simple validation
  if (!driverName || !phoneNumber || !messageText) {
    showErrorMessage("Compila tutti i campi");
    return;
  }

  formSubmission = true;
  console.log("📝 Form submission initiated");

  // Show overlay with spinner
  showOverlay();

  // Simulate form processing
  const submitButton = contactForm.querySelector(".escape-button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  setTimeout(() => {
    console.log("📝 Message sent:", { driverName, phoneNumber, messageText });

    // Add to message queue
    messageQueue.push({
      name: driverName,
      phone: phoneNumber,
      message: messageText,
      timestamp: new Date().toISOString(),
    });

    // Scroll to top
    scrollToTop();

    // Show falling notification
    showFallingNotification(
      "Messaggio inviato con successo! Ti risponderemo presto."
    );

    // Reset form
    contactForm.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    formSubmission = false;

    // Trigger emergency contact if needed
    if (
      messageText.toLowerCase().includes("emergency") ||
      messageText.toLowerCase().includes("urgent")
    ) {
      triggerEmergencyContact();
    }
  }, 2000);
}

// Show Overlay
function showOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.add("active");
  }
}

// Hide Overlay
function hideOverlay() {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Show Falling Notification
function showFallingNotification(message) {
  const notification = document.createElement("div");
  notification.className = "falling-notification";
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification and hide overlay after animation
  setTimeout(() => {
    notification.remove();
    hideOverlay();
  }, 4000);
}

// Show Error Message
function showErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
        <h3 class="panic-title">Errore!</h3>
        <p class="gridlock-text">${message}</p>
    `;

  // Remove existing error message if any
  const existingError = contactForm.parentNode.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  contactForm.parentNode.insertBefore(errorDiv, contactForm);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Trigger Emergency Contact
function triggerEmergencyContact() {
  if (!emergencyContact) {
    emergencyContact = true;
    console.log("🚨 Emergency contact triggered");

    // Flash the page
    const body = document.querySelector(".gridlock-body");
    body.style.backgroundColor = "var(--brake-light)";

    setTimeout(() => {
      body.style.backgroundColor = "";
      emergencyContact = false;
    }, 1000);

    // Show emergency alert
    alert(
      "🚨 Messaggio di emergenza ricevuto! Il nostro team risponderà immediatamente."
    );
  }
}

// Activate Contact Chaos
function activateContactChaos() {
  if (!contactChaos) {
    contactChaos = true;
    console.log("🔥 Contact chaos activated");

    // Add some interactive chaos to contact cards
    const contactCards = document.querySelectorAll(".trap-card");
    contactCards.forEach((card, index) => {
      card.addEventListener("click", function () {
        this.style.transform = "scale(1.05) rotate(1deg)";
        setTimeout(() => {
          this.style.transform = "scale(1) rotate(0deg)";
        }, 300);
      });
    });
  }
}

// Validate Phone Number
function validatePhoneNumber(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

// Validate Email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("📞 Contact center system starting...");
  initializeContactSystem();
});

// Export functions for potential external use
window.contactCenter = {
  loadContactInfo,
  handleFormSubmission,
  activateContactChaos,
  messageQueue,
  emergencyContact,
};
