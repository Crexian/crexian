const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) root.dataset.theme = savedTheme;

function updateThemeLabel() {
  themeIcon.textContent = root.dataset.theme === "dark" ? "다크" : "라이트";
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
    kicker: "게임 포트폴리오",
    title: "게임 커뮤니티를 읽고 업데이트를 콘텐츠로 바꾸는 사람",
    copy: "게임사, 퍼블리셔, 커뮤니티 팀, 게임 채널 지원에 맞춘 버전입니다.",
    skills: ["게임 트렌드 리서치", "커뮤니티 인사이트 정리", "숏폼 콘텐츠 기획"],
  },
  mcn: {
    kicker: "MCN 매니저",
    title: "크리에이터, 브랜드, 일정, 성과를 연결하는 운영자",
    copy: "MCN 에이전시, 크리에이터 파트너십, 인플루언서 캠페인, 채널 운영 지원에 맞춘 버전입니다.",
    skills: ["크리에이터 커뮤니케이션", "캠페인 운영 조율", "성과 리포트 정리"],
  },
  ai: {
    kicker: "AI 콘텐츠 크리에이터",
    title: "AI 툴을 실전 콘텐츠 제작 시스템으로 바꾸는 사람",
    copy: "AI 콘텐츠 직무, 크리에이티브 운영, 소셜 실험, 비주얼 제작 팀 지원에 맞춘 버전입니다.",
    skills: ["프롬프트 설계", "AI 이미지/영상 워크플로우", "콘텐츠 자동화 실험"],
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
  reel: { score: "92", mode: "쇼릴" },
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
    title: "런칭 인지도 스프린트",
    copy: "리액션 클립, AI 보조 썸네일 시안, 댓글 인사이트 루프를 중심으로 구성한 크리에이터 콘텐츠 플랜입니다.",
    length: "14일",
  },
  conversion: {
    title: "크리에이터 전환 캠페인",
    copy: "명확한 후킹, 장점 중심 스크립트, 측정 가능한 시청자 행동을 목표로 하는 크리에이터 캠페인입니다.",
    length: "10일",
  },
  retention: {
    title: "커뮤니티 유지 루프",
    copy: "디스코드 질문, 패치노트 요약, 주간 하이라이트, 피드백 수집을 묶은 콘텐츠 리듬입니다.",
    length: "21일",
  },
  experiment: {
    title: "AI 포맷 테스트",
    copy: "AI 생성 비주얼, 짧은 스크립트, 대체 썸네일, 플랫폼 맞춤 편집을 빠르게 검증하는 실험입니다.",
    length: "7일",
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
  modalCopy.textContent = card.dataset.proofCopy || "여기에 실제 스크린샷, 썸네일, 리포트, 짧은 클립을 넣으면 됩니다.";
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
