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
    kicker: "게임 퍼블리싱/운영",
    title: "게임 트렌드와 업데이트를 분석해 흥행 콘텐츠를 기획하는 인재",
    copy: "게임 퍼블리셔 마케팅, 커뮤니티 운영, 브랜드 홍보 직무에 적합합니다.",
    skills: ["게임 트렌드 분석 및 리서치", "유저 커뮤니티 동향 모니터링", "숏폼 및 바이럴 콘텐츠 기획"],
  },
  mcn: {
    kicker: "MCN 매니지먼트",
    title: "크리에이터와 브랜드를 연결해 성공적인 캠페인을 만드는 운영자",
    copy: "크리에이터 파트너십, 인플루언서 마케팅, 캠페인 운영 및 채널 관리에 적합합니다.",
    skills: ["크리에이터 커뮤니케이션", "브랜드 마케팅 캠페인 조율", "프로젝트 관리 및 KPI 리포팅"],
  },
  ai: {
    kicker: "AI 콘텐츠 기획",
    title: "생성형 AI 툴을 활용한 고효율 콘텐츠 제작 프로세스 설계자",
    copy: "AI 콘텐츠 제작 및 소셜 채널 운영, 뉴미디어 크리에이티브 부서 지원에 적합합니다.",
    skills: ["생성형 AI 프롬프트 엔지니어링", "AI 이미지/영상 제작 파이프라인 구축", "콘텐츠 제작 자동화 실험"],
  },
};

const trackButtons = Array.from(document.querySelectorAll("[data-track]"));
const trackKicker = document.querySelector("[data-track-kicker]");
const trackTitle = document.querySelector("[data-track-title]");
const trackCopy = document.querySelector("[data-track-copy]");
const trackSkills = document.querySelector("[data-track-skills]");
const trackPanel = document.querySelector(".track-panel");

function renderTrack(trackName) {
  const track = trackData[trackName];
  trackKicker.textContent = track.kicker;
  trackTitle.textContent = track.title;
  trackCopy.textContent = track.copy;
  trackSkills.innerHTML = track.skills.map((skill) => `<li>${skill}</li>`).join("");
  trackButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.track === trackName);
  });
  
  if (trackPanel) {
    trackPanel.classList.remove("animate-fade-in");
    void trackPanel.offsetWidth; // trigger reflow
    trackPanel.classList.add("animate-fade-in");
  }
}

trackButtons.forEach((button) => {
  button.addEventListener("click", () => renderTrack(button.dataset.track));
});

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
    title: "게임 브랜드 인지도 제고 캠페인",
    copy: "유튜브 시청자층의 관심을 빠르게 확보하기 위해 리액션 숏폼, AI 보조 썸네일, 첫인상 리뷰를 결합한 단기 집중 기획입니다.",
    length: "14일",
  },
  conversion: {
    title: "신규 유저 유치(전환) 프로모션",
    copy: "명확한 다운로드 유도(CTA), 핵심 강점 중심의 스크립트, 프로모션 코드 노출로 실질적인 유저 유치를 목표로 하는 캠페인입니다.",
    length: "10일",
  },
  retention: {
    title: "유저 커뮤니티 활성화 캠페인",
    copy: "게임 패치노트의 숏폼 요약, 디스코드 내 유저 참여형 이벤트, 정기적인 소통 피드백 루프를 통해 유저 이탈을 방지하는 상시형 운영 전략입니다.",
    length: "21일",
  },
  experiment: {
    title: "신규 AI 포맷 파일럿 테스트",
    copy: "AI 생성 배경 일러스트와 가상 성우 스크립트를 활용한 숏폼 콘텐츠를 신속히 제작하여, 소셜 채널의 유저 반응과 제작 효율을 검증하는 실험 모델입니다.",
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
          <img src="ai_char_1.png" alt="귀여운 SD 캐릭터 시안 (정비사)" class="ai-main-img" data-ai-main>
        </div>
        <div class="ai-info">
          <h4 data-ai-title>귀여운 SD 캐릭터 시안 (정비사)</h4>
          <p data-ai-desc>프로젝트나 게임 속 꼬마 정비사 캐릭터를 구상하기 위해 생성한 귀여운 SD 2D 애니메이션 스타일의 캐릭터 시안입니다.</p>
          <div class="ai-tools-used">
            <span class="tool-tag">Midjourney v6</span>
            <span class="tool-tag">Stable Diffusion</span>
            <span class="tool-tag">Magnific AI (Upscaler)</span>
          </div>
        </div>
      </div>
      
      <div class="ai-carousel">
        <button type="button" class="ai-nav-item active" data-ai-index="0">
          <img src="ai_char_1.png" alt="SD 캐릭터">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="1">
          <img src="ai_char_2.png" alt="캐릭터 시트">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="2">
          <img src="ai_char_3.jpg" alt="청명한 하늘 컨셉">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="3">
          <img src="ai_char_4.jpg" alt="격납고 컨셉">
        </button>
        <button type="button" class="ai-nav-item" data-ai-index="4">
          <img src="ai_char_5.jpg" alt="사이버펑크 테크">
        </button>
      </div>

      <div class="ai-workflow-desc">
        <h5>⚙️ 캐릭터 생성 파이프라인 (Pipeline)</h5>
        <ol>
          <li><strong>컨셉 기획 및 묘사:</strong> 게임/콘텐츠 세계관에 맞는 캐릭터 외형, 직업(정비사 등), 소품, 감정 상태 묘사</li>
          <li><strong>생성형 AI 에셋 러프 생성:</strong> 다양한 화면비와 시드 조합을 통해 완성도 높은 캐릭터 시안 생성</li>
          <li><strong>턴어라운드 및 멀티 뷰 추출:</strong> 캐릭터 원안을 바탕으로 정면/측면/배면 등 3D 모델링용 캐릭터 시트 및 배경 무드 시안 생성</li>
          <li><strong>디테일 업스케일링:</strong> AI 업스케일러를 이용해 고해상도(4K) 스케일업 및 외곽선 노이즈 제거</li>
        </ol>
      </div>
    </div>
  `,
  tools: `
    <div class="modal-tools-detail">
      <p class="tools-intro">콘텐츠 기획, 영상 프로덕션, AI 제작 실험실에서 개인 프로젝트를 진행하며 숙달한 실무 툴 숙련도입니다.</p>
      
      <div class="tools-category-grid">
        <div class="tools-cat">
          <h5>🎥 영상 제작 및 디자인</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Premiere Pro (숏폼 편집 및 템플릿 제작)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>Photoshop / Illustrator (아트웍 및 썸네일 디자인)</span><strong>80%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="80%"></div></div>
          </div>
        </div>
        
        <div class="tools-cat">
          <h5>🤖 생성형 AI 활용 역량</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Midjourney / Stable Diffusion (비주얼 시안 생성)</span><strong>85%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>ChatGPT / Claude (대본 작성 및 기획안 고도화)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
          </div>
        </div>

        <div class="tools-cat">
          <h5>💼 프로젝트 운영 및 협업</h5>
          <div class="tool-skill">
            <div class="tool-meta"><span>Discord (커뮤니티 서버 구축 및 봇 연동)</span><strong>85%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="85%"></div></div>
          </div>
          <div class="tool-skill">
            <div class="tool-meta"><span>Notion / Slack (기획 캘린더 설계 및 일정 조율)</span><strong>90%</strong></div>
            <div class="tool-bar"><div class="tool-bar-fill" style="width: 0%" data-animate-width="90%"></div></div>
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
        src: "ai_char_1.png",
        title: "귀여운 SD 캐릭터 시안 (정비사)",
        desc: "프로젝트나 게임 속 꼬마 정비사 캐릭터를 구상하기 위해 생성한 귀여운 SD 2D 애니메이션 스타일의 캐릭터 시안입니다."
      },
      {
        src: "ai_char_2.png",
        title: "캐릭터 시트 (정면/측면 턴어라운드)",
        desc: "3D 모델링이나 원화 작업의 가이드로 활용할 수 있도록 정면과 측면 턴어라운드로 생성한 캐릭터 설정 설정 시트입니다."
      },
      {
        src: "ai_char_3.jpg",
        title: "비주얼 무드 시안 (청명한 하늘)",
        desc: "정비사 캐릭터가 야외 옥상에서 하늘을 올려다보고 있는 무드를 시각화하여 작품의 배경 색감과 분위기를 설정한 일러스트입니다."
      },
      {
        src: "ai_char_4.jpg",
        title: "비주얼 무드 시안 (격납고 & 클라우드)",
        desc: "비행 정비소 느낌의 격납고 배경과 뭉게구름을 세밀한 2D 애니메이션 스타일로 묘사하여 공간적 완성도를 높인 배경 시안입니다."
      },
      {
        src: "ai_char_5.jpg",
        title: "사이버펑크 테크 / DJ 캐릭터",
        desc: "헤드폰을 쓴 사이버펑크 분위기의 캐릭터 시안으로, 네온 글로우 조명과 전자기기 배경 구도를 실험한 이미지입니다."
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

