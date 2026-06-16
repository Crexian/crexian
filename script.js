const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeLabel() {
  themeIcon.textContent = root.dataset.theme === "dark" ? "Dark" : "Light";
}

updateThemeLabel();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeLabel();
});

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const trackData = {
  game: {
    kicker: "Game Portfolio",
    title: "Reads game communities and turns updates into content.",
    copy: "Use this version for game studios, publishers, community teams, and gaming channels.",
    skills: ["Game trend research", "Community insight", "Short-form content planning"],
  },
  mcn: {
    kicker: "MCN Manager",
    title: "Connects creators, brands, schedules, and performance.",
    copy: "Use this version for MCN agencies, creator partnerships, influencer campaigns, and channel operations.",
    skills: ["Creator communication", "Campaign coordination", "Performance reporting"],
  },
  ai: {
    kicker: "AI Content Creator",
    title: "Turns AI tools into a practical content production system.",
    copy: "Use this version for AI content roles, creative operations, social experiments, and visual production teams.",
    skills: ["Prompt design", "AI image and video workflow", "Content automation tests"],
  },
};

const trackButtons = Array.from(document.querySelectorAll("[data-track]"));
const trackKicker = document.querySelector("[data-track-kicker]");
const trackTitle = document.querySelector("[data-track-title]");
const trackCopy = document.querySelector("[data-track-copy]");
const trackSkills = document.querySelector("[data-track-skills]");

function renderTrack(trackName) {
  const track = trackData[trackName];
  trackKicker.textContent = track.kicker;
  trackTitle.textContent = track.title;
  trackCopy.textContent = track.copy;
  trackSkills.innerHTML = track.skills.map((skill) => `<li>${skill}</li>`).join("");
  trackButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.track === trackName);
  });
}

trackButtons.forEach((button) => {
  button.addEventListener("click", () => renderTrack(button.dataset.track));
});

const focusData = {
  reel: { score: "92", mode: "Reel" },
  campaign: { score: "88", mode: "MCN" },
  pipeline: { score: "95", mode: "AI" },
};

const focusCards = Array.from(document.querySelectorAll("[data-focus-card]"));
const heroScore = document.querySelector("[data-hero-score]");
const heroMode = document.querySelector("[data-hero-mode]");

focusCards.forEach((card) => {
  card.addEventListener("click", () => {
    const focus = focusData[card.dataset.focusCard];
    heroScore.textContent = focus.score;
    heroMode.textContent = focus.mode;
    focusCards.forEach((item) => item.classList.toggle("active-card", item === card));
  });
});

const platformInput = document.querySelector("[data-platform]");
const goalInput = document.querySelector("[data-goal]");
const aiInput = document.querySelector("[data-ai-range]");
const creatorInput = document.querySelector("[data-creator-range]");
const briefPlatform = document.querySelector("[data-brief-platform]");
const briefTitle = document.querySelector("[data-brief-title]");
const briefCopy = document.querySelector("[data-brief-copy]");
const kpiOne = document.querySelector("[data-kpi-one]");
const kpiTwo = document.querySelector("[data-kpi-two]");
const kpiThree = document.querySelector("[data-kpi-three]");

const briefData = {
  awareness: {
    title: "Launch awareness sprint",
    copy: "A creator plan built around reaction clips, AI-assisted thumbnail variants, and comment insight loops.",
    length: "14d",
  },
  conversion: {
    title: "Creator conversion push",
    copy: "A creator-led campaign focused on clear hooks, benefit-led scripts, and measurable audience actions.",
    length: "10d",
  },
  retention: {
    title: "Community retention loop",
    copy: "A content rhythm for Discord prompts, patch-note summaries, weekly highlights, and feedback capture.",
    length: "21d",
  },
  experiment: {
    title: "AI format test",
    copy: "A fast test of AI-generated visuals, short scripts, alternate thumbnails, and platform-native edits.",
    length: "7d",
  },
};

function updateBrief() {
  const selectedGoal = briefData[goalInput.value];
  briefPlatform.textContent = platformInput.options[platformInput.selectedIndex].text;
  briefTitle.textContent = selectedGoal.title;
  briefCopy.textContent = selectedGoal.copy;
  kpiOne.textContent = creatorInput.value;
  kpiTwo.textContent = `${aiInput.value}%`;
  kpiThree.textContent = selectedGoal.length;
}

[platformInput, goalInput, aiInput, creatorInput].forEach((input) => {
  input.addEventListener("input", updateBrief);
});

updateBrief();

document.querySelectorAll("[data-step-toggle]").forEach((step) => {
  step.addEventListener("click", () => step.classList.toggle("is-done"));
});

const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalCopy = document.querySelector("[data-modal-copy]");
const modalClose = document.querySelector("[data-modal-close]");
const proofCards = Array.from(document.querySelectorAll("[data-title]"));

function openModal(card) {
  modalTitle.textContent = card.dataset.title;
  modalCopy.textContent = card.dataset.proofCopy || "Add a real screenshot, thumbnail, report, or short clip here.";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

proofCards.forEach((card) => card.addEventListener("click", () => openModal(card)));
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
