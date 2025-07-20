// Traffic Updates JavaScript - Unique Functions

// Global Update Variables
let updateChaos = false;
let crashLogLevel = 0;
let patchNotes = [];
let emergencyBroadcasts = [];

// DOM Elements
const gameUpdatesContent = document.getElementById("game-updates-content");
const crashLogsContent = document.getElementById("crash-logs-content");

// Initialize Updates System
function initializeUpdatesSystem() {
  console.log("📰 Traffic updates system initializing...");
  loadGameUpdates();
  loadCrashLogs();
  activateUpdateChaos();
}

// Load Game Updates
async function loadGameUpdates() {
  try {
    const response = await fetch("assets/data/game-updates.json");
    const updatesData = await response.json();
    renderGameUpdates(updatesData.updates);
    console.log("🔄 Game updates loaded");
  } catch (error) {
    console.error("🔄 Game updates loading failed:", error);
    createEmergencyUpdates();
  }
}

// Load Crash Logs
async function loadCrashLogs() {
  try {
    const response = await fetch("assets/data/crash-logs.json");
    const crashData = await response.json();
    renderCrashLogs(crashData.crashes);
    console.log("💥 Crash logs loaded");
  } catch (error) {
    console.error("💥 Crash logs loading failed:", error);
    createEmergencyCrashLogs();
  }
}

// Render Game Updates
function renderGameUpdates(updates) {
  if (!gameUpdatesContent) return;

  const updatesHTML = updates
    .map(
      (update) => `
        <div class="trap-card">
            <h3 class="panic-title">${update.title}</h3>
            <p class="gridlock-text"><strong>Version:</strong> ${
              update.version
            }</p>
            <p class="gridlock-text"><strong>Date:</strong> ${update.date}</p>
            <p class="gridlock-text">${update.description}</p>
            <div class="update-details">
                <h4>Changes:</h4>
                <ul>
                    ${update.changes
                      .map((change) => `<li>${change}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `
    )
    .join("");

  gameUpdatesContent.innerHTML = updatesHTML;
}

// Render Crash Logs
function renderCrashLogs(crashes) {
  if (!crashLogsContent) return;

  const crashesHTML = crashes
    .map(
      (crash) => `
        <div class="intersection-card">
            <h3 class="panic-title">${crash.title}</h3>
            <p class="gridlock-text"><strong>Location:</strong> ${crash.location}</p>
            <p class="gridlock-text"><strong>Date:</strong> ${crash.date}</p>
            <p class="gridlock-text">${crash.description}</p>
            <div class="crash-severity">
                <span class="severity-level">Severity: ${crash.severity}</span>
            </div>
        </div>
    `
    )
    .join("");

  crashLogsContent.innerHTML = crashesHTML;
}

// Emergency Updates
function createEmergencyUpdates() {
  if (!gameUpdatesContent) return;

  const emergencyUpdates = [
    {
      title: "Emergency Patch v2.1.1",
      version: "2.1.1",
      date: "December 15, 2024",
      description:
        "Critical bug fixes and performance improvements to handle increased traffic chaos.",
      changes: [
        "Fixed collision detection in high-speed scenarios",
        "Improved AI driver behavior patterns",
        "Enhanced emergency brake responsiveness",
        "Reduced lag in crowded intersections",
      ],
    },
    {
      title: "Chaos Expansion v2.1.0",
      version: "2.1.0",
      date: "December 10, 2024",
      description:
        "Major update introducing new intersection types and enhanced chaos mechanics.",
      changes: [
        "Added 5 new intersection types",
        "Implemented dynamic weather effects",
        "Enhanced panic level system",
        "New vehicle upgrade categories",
      ],
    },
  ];

  renderGameUpdates(emergencyUpdates);
}

// Emergency Crash Logs
function createEmergencyCrashLogs() {
  if (!crashLogsContent) return;

  const emergencyCrashes = [
    {
      title: "Massive Gridlock Incident",
      location: "Downtown Los Angeles",
      date: "December 14, 2024",
      description:
        "A record-breaking traffic jam involving 50+ vehicles created the most chaotic intersection scenario ever recorded.",
      severity: "Critical",
    },
    {
      title: "Signal System Failure",
      location: "Times Square, NYC",
      date: "December 12, 2024",
      description:
        "Complete traffic signal malfunction led to unprecedented chaos with vehicles moving in all directions simultaneously.",
      severity: "High",
    },
    {
      title: "Emergency Vehicle Chaos",
      location: "Chicago Loop",
      date: "December 10, 2024",
      description:
        "Multiple emergency vehicles created a complex traffic pattern that tested even the most experienced drivers.",
      severity: "Medium",
    },
  ];

  renderCrashLogs(emergencyCrashes);
}

// Activate Update Chaos
function activateUpdateChaos() {
  if (!updateChaos) {
    updateChaos = true;
    console.log("🔥 Update chaos activated");

    setInterval(() => {
      crashLogLevel = Math.min(crashLogLevel + 0.2, 10);
      if (crashLogLevel > 7) {
        triggerEmergencyBroadcast();
      }
    }, 8000);
  }
}

// Trigger Emergency Broadcast
function triggerEmergencyBroadcast() {
  console.log("🚨 Emergency broadcast triggered");

  const emergencyElements = document.querySelectorAll(".panic-title");
  emergencyElements.forEach((element) => {
    element.style.color = "var(--brake-light)";
    element.style.animation = "signalBlink 0.3s infinite";
  });

  setTimeout(() => {
    emergencyElements.forEach((element) => {
      element.style.color = "var(--panic-glow)";
      element.style.animation = "signalBlink 2s infinite";
    });
    crashLogLevel = 0;
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("📰 Traffic updates system starting...");
  initializeUpdatesSystem();
});

// Export functions for potential external use
window.trafficUpdates = {
  loadGameUpdates,
  loadCrashLogs,
  activateUpdateChaos,
  crashLogLevel,
  updateChaos,
};
