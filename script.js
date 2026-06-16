const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

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

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const trackData = {
  game: {
    kicker: "Game Portfolio",
    title: "게임 콘텐츠와 유저 반응을 읽는 사람",
    copy: "게임 클립, 이벤트 운영 아이디어, 커뮤니티 반응 분석, 업데이트 콘텐츠 기획을 보여주는 섹션입니다.",
    skills: ["게임 트렌드 리서치", "유저 커뮤니티 관찰", "숏폼/롱폼 콘텐츠 기획"],
  },
  mcn: {
    kicker: "MCN Manager",
    title: "크리에이터와 브랜드 사이를 연결하는 운영자",
    copy: "크리에이터 섭외, 일정 관리, 캠페인 제안, 성과 리포트까지 매니저형 역량을 보여주는 섹션입니다.",
    skills: ["크리에이터 커뮤니케이션", "브랜드 캠페인 운영", "성과 리포트 정리"],
  },
  ai: {
    kicker: "AI Content Creator",
    title: "AI 툴을 콘텐츠 제작 속도로 바꾸는 사람",
    copy: "프롬프트 설계, 이미지/영상 생성, 스크립트 제작, 편집 워크플로우를 보여주는 섹션입니다.",
    skills: ["프롬프트 설계", "AI 이미지/영상 제작", "콘텐츠 자동화 실험"],
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

const modal = document.querySelector("[data-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalClose = document.querySelector("[data-modal-close]");
const proofCards = Array.from(document.querySelectorAll("[data-title]"));

function openModal(card) {
  modalTitle.textContent = card.dataset.title;
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

proofCards.forEach((card) => {
  card.addEventListener("click", () => openModal(card));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
