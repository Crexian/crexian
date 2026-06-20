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
  campaign: {
    score: "88",
    mode: "캠페인 기획",
    label: "캠페인 기획",
    title: "마케팅 캠페인 제안서",
    desc: "구글 클라우드의 차세대 자율형 AI 에이전트 코딩 플랫폼인 'Antigravity'를 국내 IT/개발자 시장에 성공적으로 브랜딩하기 위해 기획된 실무 제안서입니다. 단순 일회성 노출 광고에서 벗어나 채널 특유의 서브컬처 팬덤과 방송 밈(Meme)을 기술의 특장점과 절묘하게 결합하는 마케팅 전략을 담고 있습니다. 과거 방송 중 발생한 AI 에러를 유쾌하게 소화했던 크리에이터 '똘똘똘이'와의 파트너십을 통해 높은 몰입도와 화제성을 보장합니다.",
    bullets: [
      "<strong>콘셉트 설정:</strong> AI가 스스로 빌드와 디버깅을 실행하는 과정을 '방관형 코딩 예능' 포맷으로 의인화하여 생중계(믛죈26) 진행",
      "<strong>리워드 프로모션:</strong> 구글 클라우드 신규 Active 가입 유도를 위해 인챈트 MCN 자체 선투자로 특별 제작된 기념 전용 테크 굿즈(티셔츠 & 스티커 팩) 추첨 지급",
      "<strong>위기 대응 계획:</strong> 라이브 특성상 불가피한 런타임 에러나 무한 루프 등의 돌발 상황을 시청자의 '훈수'와 '소통 개입'으로 유도하는 놀이 문화로 승화",
      "<strong>채널 매칭 타겟:</strong> 전직 개발자 출신 스트리머의 팬덤층인 2030 IT/개발 매니아를 정밀 타겟팅하여 단순 클릭을 넘어 실제 가입 전환율(CTR) 극대화"
    ]
  },
  thumbnails: {
    score: "91",
    mode: "썸네일 디자인",
    label: "썸네일 디자인",
    title: "게임 썸네일 디자인",
    desc: "직접 기획하고 디자인한 e스포츠 및 게임 전문 유튜브 채널의 고가독성 썸네일 컬렉션입니다. 썸네일은 콘텐츠의 첫인상이자 클릭률(CTR)을 결정짓는 핵심 기획 에셋입니다. 인게임 뷰와 핵심 정보를 조화롭게 배치하는 레이아웃 구조와 모바일 화면에서도 뭉개지지 않고 선명하게 읽히는 타이포그래피 설계를 최우선으로 제작되었습니다.",
    bullets: [
      "<strong>레이아웃 최적화:</strong> e스포츠 대회의 브랜딩 톤앤매너에 맞춘 4분할 화면 구성 및 선수의 스탯 지표 리포트 카드 디자인 도입",
      "<strong>시각적 계층 구조:</strong> 정보의 명확한 전달을 위한 타이포그래피 두께감 조절과 배틀그라운드 공식 엠블럼을 활용한 신뢰감 연출",
      "<strong>실제 포트폴리오:</strong> 프로게임단 DRX 주최 클랜 대항전 및 PMGC 스크림 하이라이트 중계용 썸네일 등 현업 수준의 완성도 검증",
      "<strong>제작 워크플로우:</strong> 포토샵 및 일러스트레이터를 활용한 벡터 그래픽 보정과 하이라이트 훈장/메달 3D 오브제 리터칭 작업 진행"
    ]
  },
  pipeline: {
    score: "95",
    mode: "AI 비주얼",
    label: "AI 이미지 실험",
    title: "AI 비주얼 실험실",
    desc: "생성형 AI 도구인 'Stable Diffusion (SDXL)'과 'ComfyUI' 노드 연동을 통해, 2D 애니메이션 캐릭터 및 복잡한 배경 일러스트의 비주얼 스타일 일관성(Consistency)을 정밀 제어한 기술 탐구 기록입니다. AI 이미지 생성 시 가장 해결하기 어려운 '일관된 화풍과 데생 형태 유지' 문제를 극복하기 위해 다중 ControlNet과 IP-Adapter 노드 파이프라인을 커스텀 설계했습니다.",
    bullets: [
      "<strong>일관성 제어 파이프라인:</strong> Pose 및 Depth ControlNet을 조합하여 동일 캐릭터의 정면/측면/배면 3D 모델링용 캐릭터 turn-around 시안을 정확하게 추출",
      "<strong>감정 및 표정 시트:</strong> 캐릭터의 고유한 성격을 잃지 않으면서 슬픔, 기쁨, 당황 등 12가지 다른 감정의 페이셜 익스프레션을 단일 시트로 생성하는 노드 빌드",
      "<strong>배경 및 오브제 합성:</strong> 수채화풍의 하늘, 뭉게구름, 그리고 비행 정비 격납고와 버스 등 복잡한 소품들을 캐릭터와 동일한 광원 및 채도로 블렌딩 렌더링",
      "<strong>프로덕션 적용 가능성:</strong> 게임 제작 초기 단계의 컨셉 기획, 피규어 모델링 가이드 가안 및 서브컬처 일러스트 에셋 제작 속도를 비약적으로 향상"
    ]
  }
};

const focusCards = Array.from(document.querySelectorAll("[data-focus-card]"));
const heroScore = document.querySelector("[data-hero-score]");
const heroMode = document.querySelector("[data-hero-mode]");

focusCards.forEach((card) => {
  card.addEventListener("click", () => {
    const focus = focusData[card.dataset.focusCard];
    heroScore.textContent = focus.score;
    heroMode.textContent = focus.mode;
    
    // Update active state on right cards
    focusCards.forEach((item) => item.classList.toggle("active-card", item === card));
    
    // Update detailed panel on the left
    const detailLabel = document.querySelector("[data-hero-detail-label]");
    const detailTitle = document.querySelector("[data-hero-detail-title]");
    const detailDesc = document.querySelector("[data-hero-detail-desc]");
    const detailBullets = document.querySelector("[data-hero-detail-bullets]");
    
    if (detailLabel) detailLabel.textContent = focus.label;
    if (detailTitle) detailTitle.textContent = focus.title;
    if (detailDesc) detailDesc.textContent = focus.desc;
    if (detailBullets) {
      detailBullets.innerHTML = focus.bullets.map(b => `<li>${b}</li>`).join("");
    }
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
    const now = ctx.currentTime;

    const playTone = (freq, typeStr, startTime, duration, startGain, endGain) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = typeStr;
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(startGain, startTime);
      gainNode.gain.exponentialRampToValueAtTime(endGain, startTime + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    };

    if (type === "hover") {
      playTone(1567.98, "sine", now, 0.08, 0.004, 0.0001); // G6, 아주 가볍고 투명한 마우스 호버 비프음
    } else if (type === "click") {
      // 블루 아카이브 시그니처 똑- 물방울 소리 (Bubble sweep)
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1650, now + 0.05);
      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "open") {
      // 맑고 경쾌한 청색 톤 아르페지오 (A5, C6, E6, A6)
      const notes = [880.00, 1046.50, 1318.51, 1760.00];
      notes.forEach((freq, idx) => {
        playTone(freq, "sine", now + idx * 0.04, 0.3, 0.006, 0.0001);
      });
    } else if (type === "close") {
      // 맑고 가벼운 하강 아르페지오
      const notes = [1760.00, 1318.51, 1046.50, 880.00];
      notes.forEach((freq, idx) => {
        playTone(freq, "sine", now + idx * 0.03, 0.25, 0.005, 0.0001);
      });
    } else if (type === "powerup") {
      // 퓨처리스틱 레벨업 벨
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, idx) => {
        playTone(freq, "sine", now + idx * 0.035, 0.4, 0.005, 0.0001);
      });
    } else if (type === "coin") {
      playTone(1046.50, "sine", now, 0.2, 0.005, 0.0001); // C6
      playTone(1567.98, "sine", now + 0.04, 0.25, 0.004, 0.0001); // G6
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

      // 마비노기 판타지 RPG 테마에 맞춰 그림자를 부드러운 골드 브라운 그림자로 동적 투영
      const offsetFactor = 0.8;
      const blurFactor = 15;
      card.style.boxShadow = `${shadowX * offsetFactor}px ${8 + shadowY * offsetFactor}px ${blurFactor}px rgba(54, 42, 33, 0.15), 0 0 12px var(--gold-glow), inset 1.5px 1.5px 0px rgba(255, 255, 255, 0.35)`;
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
  campaign: `
    <div class="modal-campaign-detail">
      <div class="campaign-header">
        <h4>차세대 AI 에이전트 코딩 플랫폼 마케팅 제안서</h4>
        <span class="campaign-sub">Agentic AI를 활용한 1인 개발 자동화 파이프라인 구축 라이브</span>
      </div>

      <div class="campaign-meta-info">
        <div class="meta-badge-grid">
          <div class="meta-badge">
            <span class="meta-label">WRITER</span>
            <strong class="meta-val">손영우 (광고사업팀)</strong>
          </div>
          <div class="meta-badge">
            <span class="meta-label">CLIENT</span>
            <strong class="meta-val">구글 클라우드 코리아 / Antigravity 마케팅 파트</strong>
          </div>
          <div class="meta-badge">
            <span class="meta-label">CREATOR</span>
            <strong class="meta-val">똘똘똘이 (인챈트 MCN 소속)</strong>
          </div>
        </div>
      </div>

      <div class="campaign-overview-card">
        <div class="overview-title">👾 10초 핵심 오버뷰 (Executive Summary)</div>
        <div class="overview-grid">
          <div class="overview-item">
            <div class="ov-badge">Concept</div>
            <p class="ov-text">자율 코딩 AI(Antigravity)와 개발자 스트리머(똘똘똘이)의 <strong>'1인 자율 게임 개발 생중계 (믛죈26)'</strong></p>
          </div>
          <div class="overview-item">
            <div class="ov-badge accent">Strategy</div>
            <p class="ov-text">서브컬처 팬덤에 최적화된 테크 굿즈(티셔츠, 스티커) 리워드로 <strong>구글 클라우드 신규 Active 가입 유도</strong></p>
          </div>
        </div>
      </div>

      <div class="campaign-tabs" role="tablist">
        <button type="button" class="campaign-tab active" data-tab-btn="1">기획 의도 & 요약</button>
        <button type="button" class="campaign-tab" data-tab-btn="2">분석 & 매칭</button>
        <button type="button" class="campaign-tab" data-tab-btn="3">콘텐츠 연출안</button>
        <button type="button" class="campaign-tab" data-tab-btn="4">예산 & 시뮬레이션</button>
        <button type="button" class="campaign-tab" data-tab-btn="5">위기 대응</button>
      </div>

      <div class="campaign-tab-contents">
        <!-- TAB 1 -->
        <div class="campaign-tab-pane active" data-tab-pane="1">
          <div class="pane-section">
            <h5>💡 기획 의도</h5>
            <p>언리얼 엔진 5(UE5) 기반 PVE MOBA 및 익스트랙션 장르 개발 과정에서 ComfyUI, ChatGPT 등 다양한 AI 도구를 직접 워크플로우에 적용하며, 보조형 AI를 넘어 <strong>스스로 실행하는 자율형 에이전트(Autonomous Agent)</strong>로의 패러다임 전환을 실감했습니다.</p>
            <p>본 기획은 단순히 구독자 수에 기반한 브랜드 매칭을 탈피하여, <strong>채널의 특유 서브컬처와 제품의 기술적 강점을 정확하게 일치</strong>시키는 MCN 파트너십 실무자로서의 전략을 담고 있습니다.</p>
          </div>
          <div class="pane-section border-top-dashed">
            <h5>📋 제안 요약</h5>
            <p>구글의 차세대 자율형 코딩 에이전트 플랫폼 <strong>'Antigravity'</strong>의 한국 개발자 시장 안착을 목적으로 합니다.</p>
            <p>과거 AI 오류로 "믛죈25"라는 전설적인 방송 밈을 탄생시켰던 전직 개발자 스트리머 <strong>'똘똘똘이'</strong>와 함께, 스트리머는 지시만 하고 빌드와 디버깅은 AI가 다 하는 <strong>"1인 개발 쇼케이스: 믛죈26"</strong>을 제안합니다.</p>
          </div>
        </div>

        <!-- TAB 2 -->
        <div class="campaign-tab-pane" data-tab-pane="2">
          <div class="pane-section">
            <h5>🔍 크리에이터 매칭 포인트</h5>
            <ul class="pixel-list">
              <li><strong>국내 유일의 포지션:</strong> 전직 인디 게임 개발자 출신으로, 어려운 코딩 개념을 유머러스하게 해설하는 2030 남성 IT/개발 매니아층 팬덤 보유.</li>
              <li><strong>믛 세계관의 확장:</strong> 완벽한 AI보다 에러와 씨름하고 협업하는 과정에서 나오는 돌발 상황에 시청자들이 더 크게 열광하며, 이는 높은 방송 몰입도로 직결됩니다.</li>
              <li><strong>무결점 라이브 지원:</strong> 인챈트 내부의 기술/기획 지원팀이 컴파일 환경을 사전 알파 테스트하여 라이브 돌발 사고 리스크를 최소화합니다.</li>
            </ul>
          </div>
          <div class="pane-section border-top-dashed">
            <h5>🤖 Antigravity 제품 특성 & 연출 매칭</h5>
            <p>Antigravity는 자율형 에이전트로서 <strong>AI가 스스로 디렉토리를 생성하고, 파일을 읽고 쓰며 디버깅을 실행하는 모습</strong>을 실시간 대시보드(패널)로 보여줍니다.</p>
            <p>이 독특한 특징을 살려 마치 <strong>"엉뚱하지만 부지런한 신입 개발자를 고용해 일시키는 상황"</strong>으로 의인화하여 중계하는 '방관형 코딩 예능' 포맷을 설계했습니다.</p>
          </div>
        </div>

        <!-- TAB 3 -->
        <div class="campaign-tab-pane" data-tab-pane="3">
          <div class="pane-section">
            <h5>🎬 콘텐츠 발행 & 방송 연출 계획</h5>
            <div class="timeline-row">
              <div class="timeline-item">
                <span class="timeline-badge">생방송</span>
                <strong>치지직 라이브 (1회)</strong>
                <p>실시간 게임 개발 생중계, 런타임 에러 디버깅 중계 및 시청자 훈수/소통</p>
              </div>
              <div class="timeline-item">
                <span class="timeline-badge accent">유튜브</span>
                <strong>메인 기획 영상 (1편)</strong>
                <p>기획 단계부터 빌드 완료, 게임 시연까지의 하이라이트 요약본 (15분 내외)</p>
              </div>
              <div class="timeline-item">
                <span class="timeline-badge cool">숏폼</span>
                <strong>쇼츠 콘텐츠 (2편)</strong>
                <p>에이전트의 재치 넘치는 버그 대처 상황 및 웃음 벨 에피소드를 클립화하여 확산</p>
              </div>
            </div>
          </div>
          <div class="pane-section border-top-dashed">
            <h5>🎮 크리에이티브 시나리오 ("믛죈26")</h5>
            <p><strong>[미션 지시]</strong> 스트리머는 관리자로서 "메탈슬러그 풍 횡스크롤 슈팅 게임을 제작하라"는 대략적인 기획 목표만 입력합니다.</p>
            <p><strong>[자율 실행]</strong> AI 에이전트들이 분업하여 폴더 생성, 코드 작성, 컴파일 및 빌드를 실시간으로 수행합니다. 에러 발생 시 스스로 로그를 읽고 디버깅합니다.</p>
            <p><strong>[차별화 이벤트]</strong> 구글 클라우드 가입 활성화를 극대화하기 위해, <strong>'믛죈26' 기념 전용 굿즈(빌드 성공 티셔츠 & 스티커 팩)</strong>를 제작하여 가입 후 프로젝트를 시작한 유저에게 추첨 지급합니다. (비용은 인챈트 마케팅 예산으로 선투자 제안)</p>
          </div>
        </div>

        <!-- TAB 4 -->
        <div class="campaign-tab-pane" data-tab-pane="4">
          <div class="pane-section">
            <h5>💰 스탠다드 제안 예산안</h5>
            <table class="pixel-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>상세 세부 구성</th>
                  <th>제안 예산 (원)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>치지직 라이브</strong></td>
                  <td>실시간 코딩 챌린지 및 브랜디드 생중계 (2시간+)</td>
                  <td>₩15,000,000</td>
                </tr>
                <tr>
                  <td><strong>유튜브 영상</strong></td>
                  <td>편집 기획본 1편 제작 및 똘똘똘이 채널 발행</td>
                  <td>₩12,000,000</td>
                </tr>
                <tr>
                  <td><strong>쇼츠 제작</strong></td>
                  <td>유튜브 쇼츠 / 치지직 클립 2편 제작 및 확산</td>
                  <td>₩3,000,000</td>
                </tr>
                <tr>
                  <td><strong>굿즈 제작/배송</strong></td>
                  <td>MCN (인챈트) 자체 선투자 프로모션</td>
                  <td>₩0 (자체 투자)</td>
                </tr>
                <tr class="table-total">
                  <td><strong>합계</strong></td>
                  <td>패키지 최종 금액 (VAT 별도)</td>
                  <td>₩30,000,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pane-section border-top-dashed">
            <h5>📊 실시간 성과 시뮬레이터 (조회수 4만 회 기준)</h5>
            <p class="sim-help">슬라이더를 조정하여 전환율에 따른 가입 유저 수와 고객 획득 비용(CPA)을 예측해 보세요.</p>
            
            <div class="sim-container">
              <div class="sim-control">
                <label for="sim-ctr-slider">예상 가입 전환율: <span id="sim-ctr-val">1.5</span>%</label>
                <input type="range" id="sim-ctr-slider" min="0.5" max="5.0" step="0.1" value="1.5">
              </div>
              <div class="sim-results">
                <div class="sim-res-box">
                  <span>예상 가입자 수</span>
                  <strong><span id="sim-users">600</span> 명</strong>
                </div>
                <div class="sim-res-box">
                  <span>CPA (고객 획득 비용)</span>
                  <strong><span id="sim-cpa">50,000</span> 원</strong>
                </div>
                <div class="sim-res-box">
                  <span>캠페인 평가 등급</span>
                  <strong id="sim-grade" class="grade-normal">EXPECTED</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 5 -->
        <div class="campaign-tab-pane" data-tab-pane="5">
          <div class="pane-section">
            <h5>⚠️ 소통형 위기관리 시나리오</h5>
            <p>라이브 코딩의 특성상 무한 루프나 치명적 런타임 에러는 필연적으로 발생합니다. 하지만 이를 방송 실패로 규정하지 않고, AI의 멈춤 상태를 **'에이전트 조는 중'**, **'에이전트가 삐짐'** 등으로 밈화하여 시청자들의 실시간 훈수와 개입을 유도합니다.</p>
            <p>오히려 시청자가 스트리머에게 힌트를 주고 스트리머가 AI에게 피드백을 전달하는 소통 구조를 통해, 기술 광고주의 플랫폼을 친근하고 유쾌한 플레이그라운드로 브랜딩하는 마케팅 효과를 낳을 것입니다.</p>
          </div>
          <div class="pane-section border-top-dashed">
            <h5>💡 종합 파트너십 제언</h5>
            <p>구글 클라우드 Antigravity 마케팅 파트가 바라는 기술의 유용성 전달과, 크리에이터 똘똘똘이가 가진 독특한 문법("믛죈")을 자연스럽게 엮었습니다.</p>
            <p>광고주의 비용 리스크는 줄이면서 적극적인 고객 유치를 달성하는, 실행 가능한 최고의 마케팅 제안이 될 것을 자신합니다.</p>
          </div>
        </div>
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

  if (slotId === "campaign") {
    const tabBtns = document.querySelectorAll("[data-tab-btn]");
    const tabPanes = document.querySelectorAll("[data-tab-pane]");
    
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabId = btn.getAttribute("data-tab-btn");
        
        tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
        tabPanes.forEach((p) => p.classList.toggle("active", p.getAttribute("data-tab-pane") === tabId));
        playSound("click");
      });
    });
    
    // Simulator logic
    const slider = document.getElementById("sim-ctr-slider");
    const ctrVal = document.getElementById("sim-ctr-val");
    const usersVal = document.getElementById("sim-users");
    const cpaVal = document.getElementById("sim-cpa");
    const gradeVal = document.getElementById("sim-grade");
    
    if (slider) {
      const updateSim = () => {
        const ctr = parseFloat(slider.value);
        ctrVal.textContent = ctr.toFixed(1);
        
        const views = 40000;
        const budget = 30000000; // ₩30,000,000
        const users = Math.round(views * (ctr / 100));
        usersVal.textContent = users.toLocaleString();
        
        const cpa = Math.round(budget / users);
        cpaVal.textContent = cpa.toLocaleString();
        
        // Grade thresholds
        if (ctr < 1.0) {
          gradeVal.textContent = "CONSERVATIVE (보수적)";
          gradeVal.className = "grade-low";
        } else if (ctr < 2.5) {
          gradeVal.textContent = "EXPECTED (기대 수준)";
          gradeVal.className = "grade-normal";
        } else {
          gradeVal.textContent = "OPTIMISTIC (초과 달성!)";
          gradeVal.className = "grade-high";
        }
      };
      
      slider.addEventListener("input", updateSim);
      updateSim(); // initial call
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

let scrollPosition = 0;

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

  // 모바일 배경 스크롤 방지를 위한 스크롤 락
  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
  
  playSound("open");
}

function closeModal() {
  clearModalInteractions();
  
  // 스크롤 락 해제 및 원래 스크롤 위치 복원
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("position");
  document.body.style.removeProperty("top");
  document.body.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);

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
    ctx.fillStyle = "#d4b074"; // Mabinogi gold
    ctx.strokeStyle = "#543b27"; // Dark wood brown
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    
    // Draw inner details (coin rim line)
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.5, 0, Math.PI * 2);
    ctx.strokeStyle = "#967151"; // Leather brown
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

// --- Quick Map Link Actions ---
const mapLinks = document.querySelectorAll("[data-go-slot]");
mapLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const slotId = btn.getAttribute("data-go-slot");
    const targetSlotCard = document.querySelector(`[data-slot-id="${slotId}"]`);
    if (targetSlotCard) {
      const targetSec = document.getElementById("proof");
      if (targetSec) {
        // Smooth scroll to the proof section
        targetSec.scrollIntoView({ behavior: "smooth" });
        // Automatically open modal once scroll completes
        setTimeout(() => {
          openModal(targetSlotCard);
        }, 550);
      }
    }
  });
});

// --- Key Visual Card Deck ---
const keyVisuals = [
  {
    src: "hero-archive.webp",
    kicker: "PORTFOLIO LINK",
    status: "STANDBY",
    alt: "밝은 학원형 아카이브 공간에서 디지털 태블릿을 들고 포트폴리오 자료를 정리하는 여성 크리에이티브 플래너"
  },
  {
    src: "hero-archive-campaign.webp",
    kicker: "CAMPAIGN FILE",
    status: "PLANNING",
    alt: "밝은 학원형 전략실에서 캠페인 보드와 태블릿을 확인하는 여성 미디어 플래너"
  },
  {
    src: "hero-archive-ai.webp",
    kicker: "AI VISUAL LAB",
    status: "RENDERING",
    alt: "밝은 학원형 크리에이티브 랩에서 AI 비주얼 워크플로우를 검토하는 여성 플래너"
  }
];

let keyVisualIndex = 0;
const keyVisualCards = Array.from(document.querySelectorAll("[data-keyvisual-cycle]"));
const keyVisualImages = Array.from(document.querySelectorAll("[data-keyvisual-image]"));
const keyVisualKickers = Array.from(document.querySelectorAll("[data-keyvisual-kicker]"));
const keyVisualStatuses = Array.from(document.querySelectorAll("[data-keyvisual-status]"));
const keyVisualCounts = Array.from(document.querySelectorAll("[data-keyvisual-count]"));

function renderKeyVisual() {
  const visual = keyVisuals[keyVisualIndex];
  const countText = `${String(keyVisualIndex + 1).padStart(2, "0")} / ${String(keyVisuals.length).padStart(2, "0")}`;

  keyVisualImages.forEach((img) => {
    img.src = visual.src;
    if (!img.hasAttribute("aria-hidden")) {
      img.alt = visual.alt;
    }
  });

  keyVisualKickers.forEach((el) => { el.textContent = visual.kicker; });
  keyVisualStatuses.forEach((el) => { el.textContent = visual.status; });
  keyVisualCounts.forEach((el) => { el.textContent = countText; });
}

function cycleKeyVisual() {
  keyVisualIndex = (keyVisualIndex + 1) % keyVisuals.length;
  keyVisualCards.forEach((card) => {
    card.classList.remove("is-switching");
    // Force reflow so the swap animation restarts on rapid clicks.
    void card.offsetWidth;
    card.classList.add("is-switching");
  });
  renderKeyVisual();
  playSound("open");
}

keyVisualCards.forEach((card) => {
  card.addEventListener("click", cycleKeyVisual);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cycleKeyVisual();
    }
  });
});

renderKeyVisual();
