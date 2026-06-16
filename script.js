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
const modalBody = document.querySelector("[data-modal-body]");
const modalClose = document.querySelector("[data-modal-close]");
const proofCards = Array.from(document.querySelectorAll("[data-slot-id]"));

const slotTemplates = {
  reel: `
    <div class="mock-player">
      <div class="player-screen">
        <div class="player-overlay">
          <button type="button" class="play-trigger" data-player-btn aria-label="재생">
            <svg class="play-icon" viewBox="0 0 24 24" width="32" height="32"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
            <svg class="pause-icon" viewBox="0 0 24 24" width="32" height="32" style="display:none;"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <span class="player-status-text">재생 버튼을 누르면 가상 쇼릴 재생이 시작됩니다.</span>
        </div>
        <div class="player-visualizer">
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
          <div class="vis-bar"></div>
        </div>
      </div>
      <div class="player-controls">
        <span class="player-time" data-player-time>00:00 / 00:45</span>
        <div class="player-progress-track">
          <div class="player-progress-bar" data-player-progress style="width: 0%"></div>
        </div>
      </div>
    </div>
    <div class="reel-description">
      <p><strong>주요 수록 내용</strong>: 인게임 시네마틱 컷편집, AI 생성 일러스트를 활용한 숏폼 모션 그래픽, 게임 패치노트 요약 썸네일/타이틀 모음 등 총 45초의 포트폴리오 요약본입니다.</p>
    </div>
  `,
  campaign: `
    <div class="modal-campaign-detail">
      <h4>모의 캠페인 기획: 신작 인디 게임 런칭 프로모션</h4>
      <p class="campaign-desc">인지도 확보 및 전환 유도를 위해 숏폼 크리에이터 4인과 협업한 가상 캠페인 성과 데이터 분석입니다.</p>
      
      <div class="campaign-stats-grid">
        <div class="stat-item">
          <span class="stat-label">총 조회수</span>
          <div class="stat-num-container">
            <span class="stat-value">142.5K</span>
            <span class="stat-target">목표: 100K (142% 달성)</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="100%"></div></div>
        </div>
        <div class="stat-item">
          <span class="stat-label">평균 CTR (클릭률)</span>
          <div class="stat-num-container">
            <span class="stat-value">8.4%</span>
            <span class="stat-target">게임 평균: 5.0%</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="84%"></div></div>
        </div>
        <div class="stat-item">
          <span class="stat-label">시청 유지율 (Shorts)</span>
          <div class="stat-num-container">
            <span class="stat-value">58.0%</span>
            <span class="stat-target">인기 영상 기준: 50%+</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="58%"></div></div>
        </div>
      </div>

      <div class="campaign-learnings">
        <h5>💡 핵심 분석 및 배운 점</h5>
        <ul>
          <li><strong>초반 3초 후킹 개선:</strong> 인트로에 게임 핵심 타격음과 자막 연출을 배치하여 시청 유지율을 평균 15% 상승시켰습니다.</li>
          <li><strong>타깃 매칭:</strong> 서브컬처 취향이 뚜렷한 마이크로 인플루언서 조합이 일반 종합게임 크리에이터 대비 전환 효율이 2.4배 높았습니다.</li>
        </ul>
      </div>
    </div>
  `,
  ai: `
    <div class="modal-ai-detail">
      <div class="ai-split">
        <div class="ai-prompt-box">
          <h5>✍️ 사용 프롬프트 (Prompt)</h5>
          <code>A high-quality cyberpunk futuristic sci-fi gaming character concept art, neon glowing details, digital painting style, dark background, professional portfolio asset, 4k resolution</code>
          <div class="ai-tools-used">
            <span class="tool-tag">Midjourney v6</span>
            <span class="tool-tag">ChatGPT-4o</span>
            <span class="tool-tag">Magnific AI (Upscaler)</span>
          </div>
        </div>
        <div class="ai-image-preview">
          <img src="ai_artwork.png" alt="AI Generated Gaming Concept Art" class="artwork-img">
          <span class="image-caption">실제 프롬프트로 생성한 4K 일러스트레이션</span>
        </div>
      </div>
      <div class="ai-workflow-desc">
        <h5>⚙️ 제작 워크플로우</h5>
        <ol>
          <li>ChatGPT로 게임 세계관에 어울리는 캐릭터 외형 및 배경 묘사 프롬프트 구조 설계</li>
          <li>Midjourney v6에서 다중 시드 조합 및 배율 조정하여 핵심 원안 이미지 생성</li>
          <li>스케일링 및 디테일 개선 툴을 활용해 노이즈 제거 및 선명도 업스케일링 진행</li>
        </ol>
      </div>
    </div>
  `,
  tools: `
    <div class="modal-tools-detail">
      <p class="tools-intro">지원하는 모든 직무에서 즉시 활용할 수 있는 소프트웨어 및 AI 툴 숙련도입니다.</p>
      
      <div class="tools-category-grid">
        <div class="tools-cat">
          <h5>🎥 영상 제작 & 디자인</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Premiere Pro (숏폼 컷편집/자막 템플릿)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>Photoshop / Illustrator (썸네일/아트웍)</span><strong>80%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="80%"></div></div>
          </div>
        </div>
        
        <div class="tools-cat">
          <h5>🤖 Generative AI</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Midjourney / Stable Diffusion (컨셉 비주얼)</span><strong>85%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>ChatGPT / Claude (프롬프트/기획서/대본)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
          </div>
        </div>

        <div class="tools-cat">
          <h5>💼 업무 운영 & 협업</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Discord (서버 구축/관리 봇 설정)</span><strong>85%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>Notion / Slack (일정 조율/데이터 관리)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
          </div>
        </div>
      </div>
    </div>
  `
};

let playerInterval = null;

function setupModalInteractions(slotId) {
  if (slotId === "reel") {
    const playBtn = document.querySelector("[data-player-btn]");
    const playIcon = document.querySelector(".play-icon");
    const pauseIcon = document.querySelector(".pause-icon");
    const statusText = document.querySelector(".player-status-text");
    const progressBar = document.querySelector("[data-player-progress]");
    const timeDisplay = document.querySelector("[data-player-time]");
    const visualizer = document.querySelector(".player-visualizer");
    
    let isPlaying = false;
    let currentSeconds = 0;
    const totalSeconds = 45;
    
    playBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        statusText.textContent = "가상 쇼릴을 재생 중입니다...";
        visualizer.classList.add("is-playing");
        
        playerInterval = setInterval(() => {
          currentSeconds += 1;
          if (currentSeconds > totalSeconds) {
            currentSeconds = 0;
            isPlaying = false;
            clearInterval(playerInterval);
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
            statusText.textContent = "쇼릴 재생이 완료되었습니다.";
            visualizer.classList.remove("is-playing");
          }
          const pct = (currentSeconds / totalSeconds) * 100;
          progressBar.style.width = `${pct}%`;
          const min = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
          const sec = String(currentSeconds % 60).padStart(2, '0');
          timeDisplay.textContent = `${min}:${sec} / 00:45`;
        }, 1000);
      } else {
        clearInterval(playerInterval);
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
        statusText.textContent = "쇼릴 재생이 일시 정지되었습니다.";
        visualizer.classList.remove("is-playing");
      }
    });
  }
  
  const animElements = document.querySelectorAll("[data-animate-width]");
  if (animElements.length > 0) {
    setTimeout(() => {
      animElements.forEach(el => {
        el.style.width = el.getAttribute("data-animate-width");
      });
    }, 150);
  }
}

function clearModalInteractions() {
  if (playerInterval) {
    clearInterval(playerInterval);
    playerInterval = null;
  }
}

function openModal(card) {
  const slotId = card.dataset.slotId;
  modalTitle.textContent = card.dataset.title;
  
  // Set modal body based on template
  if (slotTemplates[slotId]) {
    modalBody.innerHTML = slotTemplates[slotId];
    setupModalInteractions(slotId);
  } else {
    modalBody.innerHTML = `<small data-modal-copy>${card.dataset.proofCopy || "상세 설명이 존재하지 않습니다."}</small>`;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}

function closeModal() {
  clearModalInteractions();
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

