// Traffic Chaos JavaScript - Unique Variables and Functions

// Global Chaos Variables
let chaosBoost = true;
let signalGlitch = false;
let panicLevel = 0;
let escapeRoute = null;
let trafficJam = [];
let hornSignal = null;

// DOM Elements Cache
const headerContainer = document.getElementById("header-container");
const footerContainer = document.getElementById("footer-container");
const escapeContent = document.getElementById("escape-content");
const reactionsContent = document.getElementById("reactions-content");

// Initialize Traffic System
function initializeTrafficSystem() {
  console.log("🚦 Traffic system initializing...");
  loadHeaderComponent();
  loadFooterComponent();
  loadEscapeData();
  loadReactionsData();
  updateCopyrightYear();
  activateChaosMode();
}

// Load Header Component
async function loadHeaderComponent() {
  try {
    const response = await fetch("header-trap.html");
    const headerContent = await response.text();
    headerContainer.innerHTML = headerContent;
    console.log("🚨 Header loaded successfully");
    setupBurgerMenu();
  } catch (error) {
    console.error("🚨 Header loading failed:", error);
  }
}

// Load Footer Component
async function loadFooterComponent() {
  try {
    const response = await fetch("footer-trap.html");
    const footerContent = await response.text();
    footerContainer.innerHTML = footerContent;
    console.log("🚧 Footer loaded successfully");
  } catch (error) {
    console.error("🚧 Footer loading failed:", error);
    createEmergencyFooter();
  }
}

// Emergency Footer Creation
function createEmergencyFooter() {
  const currentYear = new Date().getFullYear();
  const emergencyFooter = `
        <footer class="jam-footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3 class="footer-title">Legal</h3>
                    <a href="./traffic-disclaimer.html" class="footer-link">Disclaimer</a>
                    <a href="./traffic-cookies.html" class="footer-link">Cookie Policy</a>
                    <a href="./traffic-privacy.html" class="footer-link">Privacy Policy</a>
                </div>
                <div class="footer-section">
                    <h3 class="footer-title">Contact</h3>
                    <p class="footer-text">chaos@experiencehb.com</p>
                                          <p class="footer-text">+39 091 616 5691</p>
                      <p class="footer-text">Via Roma, 375, 90133 Palermo PA, Italia</p>
                </div>
            </div>
            <div class="copyright-text">
                © ${currentYear} Traffic Trap. All rights reserved.
            </div>
        </footer>
    `;
  footerContainer.innerHTML = emergencyFooter;
}

// Load Escape Data from JSON
async function loadEscapeData() {
  try {
    const response = await fetch("assets/data/escape-tips.json");
    const escapeData = await response.json();
    renderEscapeTips(escapeData.tips);
    console.log("🚨 Escape tips loaded");
  } catch (error) {
    console.error("🚨 Escape tips loading failed:", error);
    createEmergencyEscapeTips();
  }
}

// Load Reactions Data from JSON
async function loadReactionsData() {
  try {
    const response = await fetch("assets/data/driver-reactions.json");
    const reactionsData = await response.json();
    renderDriverReactions(reactionsData.reactions);
    console.log("🚗 Driver reactions loaded");
  } catch (error) {
    console.error("🚗 Driver reactions loading failed:", error);
    createEmergencyReactions();
  }
}

// Render Escape Tips
function renderEscapeTips(tips) {
  if (!escapeContent) return;

  const tipsHTML = tips
    .map(
      (tip) => `
        <div class="escape-card">
            <h3 class="escape-title">${tip.title}</h3>
            <p class="escape-text">${tip.content}</p>
        </div>
    `
    )
    .join("");

  escapeContent.innerHTML = tipsHTML;
}

// Render Driver Reactions
function renderDriverReactions(reactions) {
  const reactionsContent1 = document.getElementById("reactions-content-1");
  const reactionsContent2 = document.getElementById("reactions-content-2");

  if (!reactionsContent1 || !reactionsContent2) return;

  // Split reactions into two groups
  const firstGroup = reactions.slice(0, 4);
  const secondGroup = reactions.slice(4, 8);

  const renderGroup = (reactions, container) => {
    const reactionsHTML = reactions
      .map(
        (reaction) => `
          <div class="reaction-item">
              <h4 class="reaction-name">${reaction.name}</h4>
              <p class="reaction-text">"${reaction.text}"</p>
          </div>
      `
      )
      .join("");

    container.innerHTML = reactionsHTML;
  };

  renderGroup(firstGroup, reactionsContent1);
  renderGroup(secondGroup, reactionsContent2);
}

// Emergency Escape Tips
function createEmergencyEscapeTips() {
  if (!escapeContent) return;

  const emergencyTips = [
    {
      title: "Stay Alert",
      content:
        "Always keep your eyes on the road and be prepared for sudden obstacles.",
    },
    {
      title: "Use Signals",
      content:
        "Proper signaling can help you communicate with other drivers and avoid collisions.",
    },
    {
      title: "Maintain Distance",
      content:
        "Keep a safe distance from other vehicles to give yourself time to react.",
    },
  ];

  renderEscapeTips(emergencyTips);
}

// Emergency Reactions
function createEmergencyReactions() {
  if (!reactionsContent) return;

  const emergencyReactions = [
    {
      name: "Speed Demon",
      text: "This game is absolutely insane! The chaos is real and I love every second of it.",
    },
    {
      name: "Traffic Master",
      text: "Finally, a game that captures the true essence of rush hour madness!",
    },
    {
      name: "Road Warrior",
      text: "The traps are unpredictable and the adrenaline rush is incredible!",
    },
  ];

  renderDriverReactions(emergencyReactions);
}

// Setup Burger Menu
function setupBurgerMenu() {
  const burgerTrigger = document.querySelector(".burger-trigger");
  const trafficMenu = document.querySelector(".traffic-menu");

  if (burgerTrigger && trafficMenu) {
    burgerTrigger.addEventListener("click", function () {
      this.classList.toggle("active");
      trafficMenu.classList.toggle("active");

      // Add show class after a small delay to trigger animation
      if (trafficMenu.classList.contains("active")) {
        setTimeout(() => {
          trafficMenu.classList.add("show");
        }, 10);
        // Block scroll when menu is open
        document.body.style.overflow = "hidden";
      } else {
        trafficMenu.classList.remove("show");
        // Restore scroll when menu is closed
        document.body.style.overflow = "";
      }

      console.log("🍔 Burger menu toggled");
    });

    // Close menu when clicking on menu links
    const menuLinks = trafficMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        burgerTrigger.classList.remove("active");
        trafficMenu.classList.remove("active", "show");
        document.body.style.overflow = "";
        console.log("🍔 Menu closed by link click");
      });
    });
  }
}

// Update Copyright Year
function updateCopyrightYear() {
  const copyrightElements = document.querySelectorAll(".copyright-text");
  const currentYear = new Date().getFullYear();

  copyrightElements.forEach((element) => {
    element.textContent = element.textContent.replace(/\d{4}/, currentYear);
  });
}

// Activate Chaos Mode
function activateChaosMode() {
  if (chaosBoost) {
    console.log("🔥 Chaos mode activated");
    setInterval(() => {
      panicLevel = Math.min(panicLevel + 0.1, 10);
      if (panicLevel > 5) {
        triggerSignalGlitch();
      }
    }, 5000);
  }
}

// Trigger Signal Glitch
function triggerSignalGlitch() {
  if (!signalGlitch) {
    signalGlitch = true;
    console.log("⚠️ Signal glitch detected");

    const glitchElements = document.querySelectorAll(".glitch-heading");
    glitchElements.forEach((element) => {
      element.style.animation = "signalBlink 0.5s infinite";
    });

    setTimeout(() => {
      signalGlitch = false;
      glitchElements.forEach((element) => {
        element.style.animation = "signalBlink 2s infinite";
      });
    }, 3000);
  }
}

// Initiate Escape Function
function initiateEscape() {
  console.log("🚨 Escape initiated!");
  alert(
    "🚨 Welcome to Traffic Trap! Prepare for the ultimate road chaos experience!"
  );

  // Simulate loading game
  const escapeButton = document.querySelector(".escape-button");
  if (escapeButton) {
    escapeButton.textContent = "Loading...";
    escapeButton.disabled = true;

    setTimeout(() => {
      escapeButton.textContent = "Game Starting...";
      setTimeout(() => {
        escapeButton.textContent = "Play Now";
        escapeButton.disabled = false;
      }, 2000);
    }, 1000);
  }
}

// Reroute Traffic Function
function rerouteTraffic() {
  console.log("🔄 Traffic rerouting...");
  const cards = document.querySelectorAll(
    ".trap-card, .intersection-card, .upgrade-card"
  );

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transform = "translateY(-10px) rotate(2deg)";
      setTimeout(() => {
        card.style.transform = "translateY(0) rotate(0deg)";
      }, 300);
    }, index * 100);
  });
}

// Horn Signal Function
function activateHornSignal() {
  if (!hornSignal) {
    hornSignal = setInterval(() => {
      const hornElements = document.querySelectorAll(".horn-title");
      hornElements.forEach((element) => {
        element.style.color =
          element.style.color === "var(--horn-signal)"
            ? "var(--panic-glow)"
            : "var(--horn-signal)";
      });
    }, 500);

    setTimeout(() => {
      clearInterval(hornSignal);
      hornSignal = null;
      const hornElements = document.querySelectorAll(".horn-title");
      hornElements.forEach((element) => {
        element.style.color = "var(--lane-white)";
      });
    }, 3000);
  }
}

// Panic Level Monitor
function monitorPanicLevel() {
  setInterval(() => {
    if (panicLevel > 7) {
      console.log("🚨 High panic level detected!");
      activateHornSignal();
      panicLevel = 0;
    }
  }, 10000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚦 Traffic Trap system starting...");
  initializeTrafficSystem();
  monitorPanicLevel();

  // Add some interactive chaos
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("trap-card") ||
      e.target.classList.contains("intersection-card") ||
      e.target.classList.contains("upgrade-card")
    ) {
      rerouteTraffic();
    }
  });
});

// Export functions for potential external use
window.trafficChaos = {
  initiateEscape,
  rerouteTraffic,
  activateHornSignal,
  chaosBoost,
  panicLevel,
};
