const root = document.documentElement;
const header = document.querySelector("[data-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

// Game HUD Global Variables
let bonusScore = 0;
let totalCredits = 0;

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

// Scroll event listener is consolidated below using requestAnimationFrame for performance.

const focusData = {
  reel: { score: "92", mode: "영상 실험실" },
  campaign: { score: "88", mode: "크리에이터 분석" },
  pipeline: { score: "95", mode: "AI 비주얼" },
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

// Arcade Sound Synth Engine (Web Audio API)
let soundEnabled = localStorage.getItem("portfolio-sound") !== "false";
const soundToggle = document.querySelector("[data-sound-toggle]");
const soundIcon = document.querySelector("[data-sound-icon]");

function updateSoundButton() {
  if (soundToggle && soundIcon) {
    soundIcon.textContent = soundEnabled ? "🔊 소리 켬" : "🔇 소리 끎";
    soundToggle.classList.toggle("sound-muted", !soundEnabled);
  }
}
updateSoundButton();

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem("portfolio-sound", soundEnabled);
    updateSoundButton();
    if (soundEnabled) playSound("powerup");
  });
}

// AudioContext Singleton — 브라우저 최대 6개 한도 대비, 매 호출마다 생성하지 않고 하나를 재사용합니다.
let _audioCtx = null;
function getAudioContext() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // 브라우저 정책(autoplay policy)으로 suspended 상태일 수 있으므로 resume 보장
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "hover") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "click") {
      osc.type = "square";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(900, now + 0.05);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "open") {
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "close") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.15);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "powerup") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "coin") {
      osc.type = "square";
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (e) {
    console.warn("Web Audio API blocked or not supported: ", e);
  }
}

document.addEventListener("mouseenter", (e) => {
  const target = e.target.closest(".mode-button, .button, .tab-button, .preview-card, .proof-card, .site-nav a, .thumb-nav-item, .ai-nav-item, [data-player-btn], [data-insert-coin], .quest-item");
  if (target) {
    playSound("hover");
  }
}, true);

document.addEventListener("click", (e) => {
  const target = e.target.closest(".tab-button, .thumb-nav-item, .ai-nav-item, [data-player-btn], .proof-card, .preview-card, .mode-button, .button, [data-insert-coin], .quest-item");
  if (target) {
    playSound("click");
    // Gamification: Give points on click!
    bonusScore += 100;
    updateScore();
  }
}, true);

// 3D Card Hover Tilt Parallax Effect — requestAnimationFrame으로 throttle하여 프레임 드랍 방지
const tiltCards = document.querySelectorAll(".preview-card, .proof-card");
tiltCards.forEach((card) => {
  let tiltRafId = null;

  card.addEventListener("mousemove", (e) => {
    if (tiltRafId) return; // 이전 프레임 처리 중이면 새 이벤트 무시
    tiltRafId = requestAnimationFrame(() => {
      tiltRafId = null;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const angleX = (yc - y) / 10;
      const angleY = (x - xc) / 15;

      card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;

      const shadowX = -angleY * 1.5;
      const shadowY = angleX * 1.5;

      let shadowColor = "var(--text)";
      if (card.dataset.slotId === "reel") shadowColor = "var(--blue)";
      else if (card.dataset.slotId === "campaign") shadowColor = "var(--cyan)";
      else if (card.dataset.slotId === "ai") shadowColor = "var(--pink)";
      else if (card.dataset.slotId === "tools") shadowColor = "var(--lime)";
      else if (card.dataset.slotId === "thumbnails") shadowColor = "var(--gold)";
      else if (card.classList.contains("accent")) shadowColor = "var(--pink)";
      else if (card.dataset.focusCard === "reel") shadowColor = "var(--blue)";
      else if (card.dataset.focusCard === "campaign") shadowColor = "var(--cyan)";
      else if (card.dataset.focusCard === "pipeline") shadowColor = "var(--pink)";

      card.style.boxShadow = `${8 + shadowX}px ${8 + shadowY}px 0px ${shadowColor}`;
    });
  });

  card.addEventListener("mouseleave", () => {
    if (tiltRafId) {
      cancelAnimationFrame(tiltRafId);
      tiltRafId = null;
    }
    card.style.transform = "";
    card.style.boxShadow = "";
  });
});

// Consolidated scroll handling with requestAnimationFrame for performance
const scrollProgressBar = document.querySelector("[data-scroll-progress]");
const blob1 = document.querySelector("[data-blob-1]");
const blob2 = document.querySelector("[data-blob-2]");
const blob3 = document.querySelector("[data-blob-3]");

// HUD Live Update Functions
const hudScore = document.querySelector("[data-hud-score]");
const hudStage = document.querySelector("[data-hud-stage]");

function updateScore() {
  if (hudScore) {
    const currentScore = Math.floor(window.scrollY * 1.5) + bonusScore;
    hudScore.textContent = String(currentScore).padStart(6, '0');
  }
}

const proofSection = document.getElementById("proof");
const workflowSection = document.getElementById("workflow");
const footerSection = document.querySelector(".site-footer");

// DOM 캐싱 — 스크롤마다 querySelectorAll을 반복 호출하지 않도록 초기화 시 한 번만 조회
const hudCredits = document.querySelector("[data-hud-credits]");
const questItems = Array.from(document.querySelectorAll(".quest-item"));

function updateHudStage() {
  if (!hudStage) return;
  const scrollY = window.scrollY + window.innerHeight / 3;

  let currentStage = "01";
  if (footerSection && scrollY >= footerSection.offsetTop) {
    currentStage = "04";
  } else if (workflowSection && scrollY >= workflowSection.offsetTop) {
    currentStage = "03";
  } else if (proofSection && scrollY >= proofSection.offsetTop) {
    currentStage = "02";
  }

  hudStage.textContent = currentStage;

  // Highlight active quest item in JRPG quest log on scroll
  if (questItems.length > 0) {
    questItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isActive = (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 3);
      item.classList.toggle("active-stage", isActive);
    });
  }
}

let isScrollTicking = false;
function handleScroll() {
  if (!isScrollTicking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      // Update header scrolled state
      if (header) {
        header.classList.toggle("is-scrolled", scrollY > 16);
      }
      
      // Update scroll progress bar
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (scrollY / height) * 100 : 0;
      if (scrollProgressBar) {
        scrollProgressBar.style.width = scrolled + "%";
      }

      // Parallax translation on ambient glow blobs
      if (blob1) blob1.style.transform = `translate3d(0, ${scrollY * 0.15}px, 0)`;
      if (blob2) blob2.style.transform = `translate3d(0, ${-scrollY * 0.1}px, 0)`;
      if (blob3) blob3.style.transform = `translate3d(0, ${scrollY * 0.05}px, 0)`;

      // Update HUD game dashboard values
      updateScore();
      updateHudStage();

      isScrollTicking = false;
    });
    isScrollTicking = true;
  }
}

// Initial invocation to set the state on page load
handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

// 스크롤 등장 애니메이션 — 관찰 대상 전체 확장
const observerOptions = {
  threshold: 0.01,
  rootMargin: "0px 0px -10px 0px"
};

const ANIM_SELECTORS = [
  ".preview-card",
  ".proof-card",
  ".track-panel",
  ".steps article",
  ".section-heading",
  ".quest-item",
  ".contact-heading",
  ".contact-card",
  ".history-item",
  ".steam-monitor-panel",
  ".footer-header",
].join(", ");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("view-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(ANIM_SELECTORS).forEach((el, index) => {
  el.classList.add("view-hidden");
  // 같은 부모 안의 요소들은 순차적으로 등장
  const siblings = el.parentElement
    ? Array.from(el.parentElement.children).filter(c => c.classList.contains(el.classList[0]))
    : [];
  const siblingIndex = siblings.indexOf(el);
  if (siblingIndex > 0) {
    el.style.transitionDelay = `${siblingIndex * 80}ms`;
  }
  observer.observe(el);
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
          <span class="player-status-text">재생 버튼을 누르면 영상 편집 실험 재생 시뮬레이션이 실행됩니다.</span>
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
      <p><strong>주요 구성</strong>: 인게임 연출 및 컷편집, AI 일러스트 기반 모션 그래픽, 주요 패치노트 요약 썸네일 기획 등 개인적인 실험과 취미로 제작한 영상들의 요약본입니다.</p>
    </div>
  `,
  campaign: `
    <div class="modal-campaign-detail">
      <h4>개인 캠페인 기획: 신작 인디 게임 브랜드 마케팅</h4>
      <p class="campaign-desc">좋아하는 인디 게임의 인지도 확보 및 팬덤 형성을 위해, 평소 눈여겨본 크리에이터 4인과의 모의 협업을 데이터로 구상한 캠페인 리포트입니다.</p>
      
      <div class="campaign-stats-grid">
        <div class="stat-item">
          <span class="stat-label">총 조회수</span>
          <div class="stat-num-container">
            <span class="stat-value">142.5K</span>
            <span class="stat-target">목표: 100K (142% 초과 달성)</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="100%"></div></div>
        </div>
        <div class="stat-item">
          <span class="stat-label">평균 CTR (클릭률)</span>
          <div class="stat-num-container">
            <span class="stat-value">8.4%</span>
            <span class="stat-target">업계 평균: 5.0%</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="84%"></div></div>
        </div>
        <div class="stat-item">
          <span class="stat-label">시청 유지율 (Shorts)</span>
          <div class="stat-num-container">
            <span class="stat-value">58.0%</span>
            <span class="stat-target">Shorts 흥행 기준: 50%+</span>
          </div>
          <div class="stat-progress"><div class="stat-progress-fill" style="width: 0%" data-animate-width="58%"></div></div>
        </div>
      </div>

      <div class="campaign-learnings">
        <h5>💡 데이터 기반 인사이트 및 개선 방향</h5>
        <ul>
          <li><strong>초반 3초 후킹 최적화:</strong> 인트로에 임팩트 있는 게임 사운드와 타이포 연출을 적용하여 시청 유지율을 평균 15% 개선했습니다.</li>
          <li><strong>타깃 매칭의 유효성:</strong> 서브컬처 팬덤이 뚜렷한 마이크로 인플루언서 매칭을 설계하여, 종합 게임 채널 대비 전환 효율을 약 2.4배 향상했습니다.</li>
        </ul>
      </div>
    </div>
  `,
  ai: `
    <div class="modal-ai-detail">
      <div class="ai-viewer">
        <div class="ai-main-wrapper">
          <img src="ai_char_6.png" alt="애니메이션 캐릭터 시트 (정면/측면/배면)" class="ai-main-img" data-ai-main>
        </div>
        <div class="ai-info">
          <h4 data-ai-title>애니메이션 캐릭터 시트 (정면/측면/배면)</h4>
          <p data-ai-desc>ComfyUI의 ControlNet 노드 파이프라인을 구축하여 일관된 디자인과 화풍으로 정밀하게 제어한 3D 모델링용 캐릭터 turn-around 시안입니다.</p>
          <div class="ai-tools-used">
            <span class="tool-tag">ComfyUI</span>
            <span class="tool-tag">Stable Diffusion (SDXL)</span>
            <span class="tool-tag">ControlNet</span>
            <span class="tool-tag">IP-Adapter</span>
          </div>
        </div>
      </div>
      
      <div class="ai-carousel">
        <button type="button" class="ai-nav-item active" data-ai-index="0">
          <img src="ai_char_6.png" alt="캐릭터 시트">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="1">
          <img src="ai_char_7.jpg" alt="표정 시트">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="2">
          <img src="ai_char_8.jpg" alt="정거장 일러스트">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="3">
          <img src="ai_char_1.png" alt="SD 캐릭터">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="4">
          <img src="ai_char_2.png" alt="정비사 시트">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="5">
          <img src="ai_char_3.jpg" alt="정비사 하늘">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="6">
          <img src="ai_char_4.jpg" alt="정비사 격납고">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="7">
          <img src="ai_char_5.jpg" alt="사이버펑크 테크">
        </button>
      </div>

      <div class="ai-workflow-desc">
        <h5>⚙️ ComfyUI 노드 기반 캐릭터 디자인 파이프라인</h5>
        <ol>
          <li><strong>기획 및 컨셉화:</strong> 만들고자 하는 캐릭터의 직업(마법사, 정비사), 배색(블루, 민트), 의상 형태 및 장식의 키워드 구상</li>
          <li><strong>ComfyUI 커스텀 워크플로우 설계:</strong> KSampler, LoRA 복합 연동, 일관된 스타일 유지를 위한 IP-Adapter 노드 구성</li>
          <li><strong>ControlNet을 통한 각도 및 표정 제어:</strong> Pose/Depth 맵 노드를 활용하여 정면/측면/배면 턴어라운드 시트 및 12가지 페이셜 익스프레션 시트 일관성 제어</li>
          <li><strong>배경 블렌딩 및 해상도 복원:</strong> 업스케일러 및 Latent Detail러 노드를 구성하여 초고해상도 캐릭터 모델 에셋 및 배경 시각화</li>
        </ol>
      </div>
    </div>
  `,
  tools: `
    <div class="modal-tools-layout">
      <!-- RPG Status Board -->
      <div class="rpg-status-board">
        <div class="rpg-header">
          <span class="rpg-level" data-rpg-level>LV 1</span>
          <h4 class="rpg-title">CHARACTER STATUS</h4>
          <p class="rpg-class-name">디지털 미디어 멀티플레이어</p>
        </div>
        <div class="rpg-stats-list">
          <div class="rpg-stat-row">
            <div class="rpg-stat-label">
              <strong>STR</strong> <span class="rpg-stat-desc">영상 제작 및 실행력</span>
            </div>
            <div class="rpg-stat-control">
              <span class="rpg-stat-val" data-rpg-stat="str">80</span>
              <button type="button" class="rpg-plus-btn" data-rpg-inc="str" aria-label="STR 증가">+</button>
            </div>
          </div>
          <div class="rpg-stat-row">
            <div class="rpg-stat-label">
              <strong>DEX</strong> <span class="rpg-stat-desc">AI 툴 활용 능력</span>
            </div>
            <div class="rpg-stat-control">
              <span class="rpg-stat-val" data-rpg-stat="dex">82</span>
              <button type="button" class="rpg-plus-btn" data-rpg-inc="dex" aria-label="DEX 증가">+</button>
            </div>
          </div>
          <div class="rpg-stat-row">
            <div class="rpg-stat-label">
              <strong>INT</strong> <span class="rpg-stat-desc">데이터 & 기획 전략</span>
            </div>
            <div class="rpg-stat-control">
              <span class="rpg-stat-val" data-rpg-stat="int">80</span>
              <button type="button" class="rpg-plus-btn" data-rpg-inc="int" aria-label="INT 증가">+</button>
            </div>
          </div>
          <div class="rpg-stat-row">
            <div class="rpg-stat-label">
              <strong>LUK</strong> <span class="rpg-stat-desc">트렌드 감각</span>
            </div>
            <div class="rpg-stat-control">
              <span class="rpg-stat-val" data-rpg-stat="luk">81</span>
              <button type="button" class="rpg-plus-btn" data-rpg-inc="luk" aria-label="LUK 증가">+</button>
            </div>
          </div>
        </div>
        <div class="rpg-footer">
          <div class="rpg-points-left">
            <span>남은 스탯 포인트:</span>
            <strong class="rpg-points-val" data-rpg-points>5</strong>
          </div>
          <button type="button" class="rpg-reset-btn" data-rpg-reset style="display:none;">RESET STATS</button>
          <div class="rpg-levelup-msg" data-rpg-msg>스탯 포인트를 모두 분배하면 레벨이 상승합니다!</div>
        </div>
      </div>

      <!-- Tools Proficiency -->
      <div class="modal-tools-detail">
        <p class="tools-intro">사이드 프로젝트 진행 및 비즈니스 분석 업무 수행을 위해 숙달한 실무 툴 숙련도입니다.</p>
        <div class="tools-category-stack">
          <div class="tools-cat">
            <h5>🎥 영상 제작 & 디자인</h5>
            <div class="tool-skill">
              <div class="tool-meta"><span>Premiere Pro (숏폼 편집 & 템플릿 제작)</span><strong>90%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
            </div>
            <div class="tool-skill">
              <div class="tool-meta"><span>Photoshop / Illustrator (디자인 & 아트웍)</span><strong>80%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="80%"></div></div>
            </div>
          </div>
          
          <div class="tools-cat">
            <h5>🤖 생성형 AI 활용 역량</h5>
            <div class="tool-skill">
              <div class="tool-meta"><span>Midjourney / Stable Diffusion (비주얼 시안)</span><strong>85%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
            </div>
            <div class="tool-skill">
              <div class="tool-meta"><span>ChatGPT / Claude (대본 작성 & 기획안 고도화)</span><strong>90%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
            </div>
          </div>

          <div class="tools-cat">
            <h5>💼 프로젝트 운영 & 협업</h5>
            <div class="tool-skill">
              <div class="tool-meta"><span>Discord / Slack (커뮤니티 빌딩)</span><strong>85%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
            </div>
            <div class="tool-skill">
              <div class="tool-meta"><span>Notion (기획 캘린더 & 일정 조율)</span><strong>90%</strong></div>
              <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  thumbnails: `
    <div class="modal-thumbnails-detail">
      <div class="thumbnail-viewer">
        <div class="thumbnail-main-wrapper">
          <img src="thumb_1.jpg" alt="프로게이머가 알려주는 모배꿀팁 열가지!" class="thumbnail-main-img" data-thumb-main>
        </div>
        <div class="thumbnail-info">
          <h4 data-thumb-title>프로게이머가 알려주는 모배꿀팁 열가지!</h4>
          <p data-thumb-desc>인게임 4분할 레이아웃과 높은 가독성의 타이포그래피를 적용하여, 유저들에게 실용적인 팁을 제공하는 콘텐츠용 유튜브 썸네일 디자인입니다.</p>
        </div>
      </div>
      
      <div class="thumbnail-carousel">
        <button type="button" class="thumb-nav-item active" data-thumb-index="0">
          <img src="thumb_1.jpg" alt="모배 꿀팁">
        </button>
        <button type="button" class="thumb-nav-item" data-thumb-index="1">
          <img src="thumb_2.jpg" alt="Ssung Super Weekend">
        </button>
        <button type="button" class="thumb-nav-item" data-thumb-index="2">
          <img src="thumb_3.jpg" alt="DRX 주최클랜 대항전">
        </button>
        <button type="button" class="thumb-nav-item" data-thumb-index="3">
          <img src="thumb_4.jpg" alt="RESTART 국가대표 선발전">
        </button>
        <button type="button" class="thumb-nav-item" data-thumb-index="4">
          <img src="thumb_5.jpg" alt="PMGC 스크림 하이라이트">
        </button>
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
  
  if (slotId === "thumbnails") {
    const mainImg = document.querySelector("[data-thumb-main]");
    const titleEl = document.querySelector("[data-thumb-title]");
    const descEl = document.querySelector("[data-thumb-desc]");
    const navItems = document.querySelectorAll(".thumb-nav-item");
    
    const thumbData = [
      {
        src: "thumb_1.jpg",
        title: "프로게이머가 알려주는 모배꿀팁 열가지!",
        desc: "인게임 4분할 레이아웃과 높은 가독성의 타이포그래피를 적용하여, 유저들에게 실용적인 팁을 제공하는 콘텐츠용 유튜브 썸네일 디자인입니다."
      },
      {
        src: "thumb_2.jpg",
        title: "TOP PLAYERS - Ssung (Super Weekend)",
        desc: "e스포츠 PMGC 대회 브랜딩에 맞춰 선수의 기록 지표를 직관적으로 분석하고 구성한 리포트 카드 디자인입니다."
      },
      {
        src: "thumb_3.jpg",
        title: "DRX 주최클랜 대항전",
        desc: "프로게임단 DRX 주최 대회 홍보용 썸네일로, 다수의 대전 클랜 로고와 정보를 정돈된 그리드 레이아웃으로 전달합니다."
      },
      {
        src: "thumb_4.jpg",
        title: "RESTART 국가대표 선발전",
        desc: "배틀그라운드 모바일 공식 선발전 중계용 썸네일로, 레드 포인트 타이포그래피와 공식 엠블럼을 조화롭게 배치했습니다."
      },
      {
        src: "thumb_5.jpg",
        title: "PMGC 스크림 하이라이트!",
        desc: "대회 메인 그래픽 에셋과 하이라이트 훈장/메달 오브제를 전면에 배치해 박진감 넘치는 매치 영상의 특성을 부각했습니다."
      }
    ];
    
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.getAttribute("data-thumb-index"), 10);
        const data = thumbData[index];
        
        mainImg.src = data.src;
        mainImg.alt = data.title;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        
        navItems.forEach((btn) => btn.classList.toggle("active", btn === item));
      });
    });
  }
  
  if (slotId === "ai") {
    const mainImg = document.querySelector("[data-ai-main]");
    const titleEl = document.querySelector("[data-ai-title]");
    const descEl = document.querySelector("[data-ai-desc]");
    const navItems = document.querySelectorAll(".ai-nav-item");
    
    const aiData = [
      {
        src: "ai_char_6.png",
        title: "애니메이션 캐릭터 시트 (정면/측면/배면)",
        desc: "ComfyUI의 ControlNet 노드 파이프라인을 구축하여 일관된 디자인과 화풍으로 정밀하게 제어한 3D 모델링용 캐릭터 turn-around 시안입니다."
      },
      {
        src: "ai_char_7.jpg",
        title: "캐릭터 감정 표정 시트 (12 Expressions)",
        desc: "동일 캐릭터의 일관된 성격을 살리기 위해 ComfyUI에서 12가지 다른 페이셜 감정 표현을 단일 시트 형태로 균일하게 생성한 시안입니다."
      },
      {
        src: "ai_char_8.jpg",
        title: "배경 일러스트 시안 (정거장 & 버스)",
        desc: "ComfyUI를 이용해 청명한 수채화풍 하늘 아래 정거장에 서 있는 은발 소녀 캐릭터와 버스 오브제의 감성적인 무드를 시각화한 무드 시안입니다."
      },
      {
        src: "ai_char_1.png",
        title: "귀여운 SD 캐릭터 시안 (꼬마 정비사)",
        desc: "ComfyUI 워크플로우를 활용해 2D 애니메이션 스타일로 연출한 SD 정비사 캐릭터 디자인 시안입니다."
      },
      {
        src: "ai_char_2.png",
        title: "정비사 캐릭터 시트 (턴어라운드)",
        desc: "정비사 소녀 캐릭터의 정면과 측면 턴어라운드 일러스트를 추출하여 피규어 및 모델링 가이드로 설계한 시트입니다."
      },
      {
        src: "ai_char_3.jpg",
        title: "비주얼 무드 시안 (청명한 하늘)",
        desc: "인물과 청명한 수채화풍의 하늘, 뭉게구름의 광원을 ComfyUI 노드로 통합 렌더링한 감성적 일러스트 배경 시안입니다."
      },
      {
        src: "ai_char_4.jpg",
        title: "비주얼 무드 시안 (격납고 & 클라우드)",
        desc: "비행 정비창의 복잡한 기계 소품과 2D 애니메이션풍의 풍경 묘사를 ComfyUI 특화 노드로 디테일업한 시안입니다."
      },
      {
        src: "ai_char_5.jpg",
        title: "사이버펑크 테크 / DJ 캐릭터",
        desc: "헤드폰을 쓴 캐릭터와 네온 글로잉 하이라이트, 테크니컬한 전자회로 배경을 정밀 제어한 사이버펑크 디자인 시안입니다."
      }
    ];
    
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.getAttribute("data-ai-index"), 10);
        const data = aiData[index];
        
        mainImg.src = data.src;
        mainImg.alt = data.title;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        
        navItems.forEach((btn) => btn.classList.toggle("active", btn === item));
      });
    });
  }
  
  if (slotId === "tools") {
    const levelEl = document.querySelector("[data-rpg-level]");
    const pointsEl = document.querySelector("[data-rpg-points]");
    const resetBtn = document.querySelector("[data-rpg-reset]");
    const msgEl = document.querySelector("[data-rpg-msg]");
    const plusButtons = document.querySelectorAll("[data-rpg-inc]");
    
    let stats = { str: 80, dex: 82, int: 80, luk: 81 };
    let initialStats = { ...stats };
    let points = 5;
    let level = 1;
    
    function updateRpgUI() {
      levelEl.textContent = `LV ${level}`;
      pointsEl.textContent = points;
      
      for (const statName in stats) {
        const valEl = document.querySelector(`[data-rpg-stat="${statName}"]`);
        if (valEl) valEl.textContent = stats[statName];
      }
      
      if (points === 0) {
        level = 2;
        levelEl.textContent = `LV ${level}`;
        levelEl.classList.add("levelup-blink");
        msgEl.innerHTML = `<span class="rpg-success-text">🎉 LEVEL UP! 능력을 완벽하게 강화했습니다!</span>`;
        resetBtn.style.display = "block";
        plusButtons.forEach(btn => btn.disabled = true);
        playSound("powerup");
        
        // Spawn coin explosion at the LEVEL UP text location!
        const rect = levelEl.getBoundingClientRect();
        spawnCoins(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
      } else {
        level = 1;
        levelEl.classList.remove("levelup-blink");
        msgEl.textContent = "스탯 포인트를 모두 분배하면 레벨이 상승합니다!";
        resetBtn.style.display = "none";
        plusButtons.forEach(btn => btn.disabled = false);
      }
    }
    
    plusButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const statName = btn.getAttribute("data-rpg-inc");
        if (points > 0) {
          stats[statName] += 1;
          points -= 1;
          updateRpgUI();
        }
      });
    });
    
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        playSound("click");
        stats = { ...initialStats };
        points = 5;
        level = 1;
        updateRpgUI();
      });
    }
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
  
  playSound("open");
}

function closeModal() {
  clearModalInteractions();
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  
  playSound("close");
}

proofCards.forEach((card) => card.addEventListener("click", () => openModal(card)));
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
// Escape 가드 — 모달이 열려 있을 때만 닫기 동작 실행 (불필요한 사운드 방지)
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

// --- Retro Arcade Start Screen Logic ---
const startScreen = document.querySelector("[data-start-screen]");
const insertCoinBtn = document.querySelector("[data-insert-coin]");

if (insertCoinBtn && startScreen) {
  insertCoinBtn.addEventListener("click", () => {
    // Spawn coin explosion right at the start button
    const rect = insertCoinBtn.getBoundingClientRect();
    spawnCoins(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    
    // Animate start screen slide out after a short explosion delay
    setTimeout(() => {
      startScreen.classList.add("is-started");
      document.body.classList.remove("start-active");
    }, 200);
  });
}

// --- Canvas Coin Particle Physics Engine (Easter Egg) ---
const canvas = document.createElement("canvas");
canvas.id = "coin-canvas";
canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
let coins = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
// resize debounce — 리사이즈 이벤트 폭발 방지 (연속 이벤트 중 마지막 것만 처리)
let _resizeDebounceId = null;
window.addEventListener("resize", () => {
  if (_resizeDebounceId) clearTimeout(_resizeDebounceId);
  _resizeDebounceId = setTimeout(resizeCanvas, 150);
});
resizeCanvas();

class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8; // Horizontal velocity
    this.vy = -Math.random() * 8 - 4;   // Upward velocity
    this.gravity = 0.35;
    this.radius = 7;
    this.rotation = Math.random() * Math.PI;
    this.rotationSpeed = Math.random() * 0.2 + 0.1;
    this.bounce = 0.35;
    this.life = 100;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off bottom
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.vy = -this.vy * this.bounce;
      this.vx *= 0.85; // Friction
    }

    this.rotation += this.rotationSpeed;
    this.life -= 1.6;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(Math.abs(Math.sin(this.rotation)), 1); // Simulate spin
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd11a"; // Sunny Gold
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    
    // Draw inner details (coin rim line)
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();
  }
}

let isAnimating = false;

function spawnCoins(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    coins.push(new Coin(x, y));
  }
  playSound("coin");
  
  // Increment credits in HUD! (hudCredits는 상단에서 캐싱된 변수 사용)
  totalCredits += count;
  if (hudCredits) {
    hudCredits.textContent = String(totalCredits).padStart(2, '0');
  }
  
  // Add extra score bonus!
  bonusScore += count * 50;
  updateScore();
  
  if (!isAnimating) {
    isAnimating = true;
    animateCoins();
  }
}

function animateCoins() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  coins = coins.filter(coin => coin.life > 0);
  coins.forEach(coin => {
    coin.update();
    coin.draw();
  });
  
  if (coins.length > 0) {
    requestAnimationFrame(animateCoins);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isAnimating = false;
  }
}

