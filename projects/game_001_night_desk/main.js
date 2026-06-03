const nights = window.NIGHT_DESK_NIGHTS ?? [];
const guests = window.NIGHT_DESK_GUESTS ?? [];
const endings = window.NIGHT_DESK_ENDINGS ?? [];

const elements = {
  ruleList: document.querySelector("#rule-list"),
  guestCard: document.querySelector("#guest-card"),
  progressLabel: document.querySelector("#progress-label"),
  scoreLabel: document.querySelector("#score-label"),
  feedback: document.querySelector("#feedback"),
  startButton: document.querySelector("#start-button"),
  allowButton: document.querySelector("#allow-button"),
  rejectButton: document.querySelector("#reject-button"),
  policeButton: document.querySelector("#police-button"),
  errorButton: document.querySelector("#error-button"),
  endingPanel: document.querySelector("#ending-panel"),
  endingTitle: document.querySelector("#ending-title"),
  endingDescription: document.querySelector("#ending-description"),
  endingSummary: document.querySelector("#ending-summary"),
  restartButton: document.querySelector("#restart-button"),
  clockLabel: document.querySelector("#clock-label"),
  nightTitle: document.querySelector("#night-title"),
  memoNote: document.querySelector("#memo-note"),
  sidebarDossier: document.querySelector("#sidebar-dossier"),
  moneyLabel: document.querySelector("#money-label"),
  complaintsLabel: document.querySelector("#complaints-label"),
  corruptionLabel: document.querySelector("#corruption-label"),
  sanityLabel: document.querySelector("#sanity-label"),
  bossTrustLabel: document.querySelector("#boss-trust-label"),
};

const initialStats = {
  money: 80,
  complaints: 0,
  corruption: 0,
  sanity: 100,
  bossTrust: 60,
};

const statLabels = {
  money: "Money",
  complaints: "Complaints",
  corruption: "Corruption",
  sanity: "Sanity",
  bossTrust: "Boss Trust",
};

const decisionButtons = {
  allow: elements.allowButton,
  refuse: elements.rejectButton,
  police: elements.policeButton,
  error: elements.errorButton,
};

const audio = {
  unlocked: false,
  tracks: {
    button: createAudio("./assets/audio/button.wav", 0.42),
    doorbell: createAudio("./assets/audio/doorbell.wav", 0.34),
    anomaly: createAudio("./assets/audio/anomaly.wav", 0.36),
    rain: createAudio("./assets/audio/rain_loop.wav", 0.18, true),
  },
};

const state = {
  currentIndex: -1,
  correctCount: 0,
  locked: true,
  stats: { ...initialStats },
  history: [],
};

function getCurrentGuest() {
  return guests[state.currentIndex];
}

function getNightForGuest(guest = getCurrentGuest()) {
  return nights.find((night) => night.night === guest?.night) ?? nights[0];
}

function renderRules() {
  const currentNight = getNightForGuest();
  elements.nightTitle.textContent = currentNight?.title ?? "今晚的入住规则";
  elements.memoNote.textContent = currentNight?.memo ?? "不要追问规则来源。只需执行。";

  const rules = currentNight?.rules ?? [];
  elements.ruleList.replaceChildren(
    ...rules.map((rule) => {
      const item = document.createElement("li");
      item.textContent = rule;
      return item;
    }),
  );
}

function renderStats() {
  elements.moneyLabel.textContent = `$${state.stats.money}`;
  elements.complaintsLabel.textContent = String(state.stats.complaints);
  elements.corruptionLabel.textContent = String(state.stats.corruption);
  elements.sanityLabel.textContent = String(state.stats.sanity);
  elements.bossTrustLabel.textContent = String(state.stats.bossTrust);

  flagStat(elements.moneyLabel, state.stats.money <= 25);
  flagStat(elements.complaintsLabel, state.stats.complaints >= 50);
  flagStat(elements.corruptionLabel, state.stats.corruption >= 55);
  flagStat(elements.sanityLabel, state.stats.sanity <= 30);
  flagStat(elements.bossTrustLabel, state.stats.bossTrust <= 30);
}

function flagStat(element, isDanger) {
  element.closest(".stat-card").classList.toggle("is-danger", isDanger);
}

function renderGuest() {
  const guest = getCurrentGuest();
  const currentNight = getNightForGuest(guest);
  elements.clockLabel.textContent = guest.arrivalTime;
  elements.progressLabel.textContent = `第 ${currentNight.night} 夜 / 来客 ${state.currentIndex + 1} / ${guests.length}`;
  elements.guestCard.replaceChildren();

  const scene = buildVisitorScene(guest);
  const dossier = document.createElement("div");
  dossier.className = "dossier-grid";
  dossier.append(
    buildDefinitionList("登记资料", guest.details, "registry-panel"),
    buildInspectionPanel(guest.inspection ?? guest.traits ?? []),
    buildListSection("话语线索", guest.speechClues, "speech-panel"),
  );

  elements.guestCard.append(scene);
  elements.sidebarDossier.replaceChildren(dossier);
  renderRules();
  playSound("doorbell");
}

function buildVisitorScene(guest) {
  const visual = guest.visual ?? {};
  const scene = document.createElement("section");
  scene.className = `visitor-scene scene-${visual.scene ?? "frontdesk"} threat-${visual.threat ?? guest.type}`;

  const cameraHud = document.createElement("div");
  cameraHud.className = "camera-hud";
  cameraHud.innerHTML = `
    <span>LOBBY CAM / ${guest.arrivalTime}</span>
    <span>ROOM ${guest.room}</span>
    <span>REC</span>
  `;

  const set = document.createElement("div");
  set.className = "motel-set";
  set.innerHTML = `
    <span class="set-light"></span>
    <span class="set-door set-door-left"></span>
    <span class="set-door set-door-right"></span>
    <span class="set-counter"></span>
    <span class="set-rates">NIGHT DESK<br>NO VACANCY</span>
  `;

  const figure = document.createElement("div");
  figure.className = `visitor-figure ${visual.silhouette ?? "visitor-average"} ${visual.portrait ? "has-portrait" : ""} ${getInspectionClasses(guest)}`;
  figure.setAttribute("aria-label", `${guest.name} 的监控画面`);

  if (visual.portrait) {
    const image = document.createElement("img");
    image.src = visual.portrait;
    image.alt = guest.name;
    figure.append(image);
  } else {
    figure.innerHTML = `
      <span class="figure-shadow"></span>
      <span class="figure-body"></span>
      <span class="figure-head"></span>
      <span class="figure-eye figure-eye-left"></span>
      <span class="figure-eye figure-eye-right"></span>
      <span class="figure-mouth"></span>
      <span class="figure-hand figure-hand-left"></span>
      <span class="figure-hand figure-hand-right"></span>
    `;
  }

  (guest.inspection ?? []).forEach((item) => {
    const marker = document.createElement("span");
    marker.className = `organ-marker marker-${item.part} severity-${item.severity}`;
    marker.title = `${item.label}: ${item.value}`;
    marker.textContent = item.label.slice(0, 1);
    figure.append(marker);
  });

  const dialogue = document.createElement("div");
  dialogue.className = "dialogue-box";
  dialogue.innerHTML = `
    <p class="speaker-name">${guest.name}</p>
    <p>${guest.request}</p>
  `;

  scene.append(cameraHud, set, figure, dialogue);
  return scene;
}

function getInspectionClasses(guest) {
  return (guest.inspection ?? [])
    .filter((item) => item.severity >= 2)
    .map((item) => `has-${item.part}`)
    .join(" ");
}

function buildDefinitionList(title, rows, className = "") {
  const section = document.createElement("section");
  section.className = `guest-section ${className}`.trim();

  const heading = document.createElement("h3");
  heading.textContent = title;

  const list = document.createElement("dl");
  rows.forEach(({ label, value }) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    list.append(term, description);
  });

  section.append(heading, list);
  return section;
}

function buildListSection(title, rows, className = "") {
  const section = document.createElement("section");
  section.className = `guest-section ${className}`.trim();

  const heading = document.createElement("h3");
  heading.textContent = title;

  const list = document.createElement("ul");
  rows.forEach((row) => {
    const item = document.createElement("li");
    item.textContent = row;
    list.append(item);
  });

  section.append(heading, list);
  return section;
}

function buildInspectionPanel(rows) {
  const section = document.createElement("section");
  section.className = "guest-section inspection-panel";

  const heading = document.createElement("h3");
  heading.textContent = "器官 / 异常检查";

  const list = document.createElement("ul");
  rows.forEach((row) => {
    const item = document.createElement("li");
    const severity = Number(row.severity ?? 0);
    item.className = `inspection-item severity-${severity}`;
    item.innerHTML = `
      <span class="inspection-part">${row.label ?? "特征"}</span>
      <span class="inspection-value">${row.value ?? row}</span>
      <span class="inspection-meter" aria-label="异常程度 ${severity} / 3">${"■".repeat(severity)}${"□".repeat(3 - severity)}</span>
    `;
    list.append(item);
  });

  section.append(heading, list);
  return section;
}

function setDecisionButtonsEnabled(enabled) {
  Object.values(decisionButtons).forEach((button) => {
    button.disabled = !enabled;
  });
}

function updateScore() {
  elements.scoreLabel.textContent = `正确判断 ${state.correctCount} / ${guests.length}`;
}

function beginShift() {
  unlockAudio();
  playSound("button");
  startRainLoop();
  state.currentIndex = 0;
  state.correctCount = 0;
  state.locked = false;
  state.stats = { ...initialStats };
  state.history = [];
  elements.endingPanel.hidden = true;
  elements.startButton.hidden = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.sidebarDossier.innerHTML = `
    <p class="eyebrow">VISITOR DOSSIER</p>
    <p class="sidebar-empty">系统正在读取第一位客人的脸。</p>
  `;
  updateScore();
  renderStats();

  if (guests.length === 0) {
    finishShift();
    return;
  }

  renderGuest();
  setDecisionButtonsEnabled(true);
}

function decide(decision) {
  if (state.locked) {
    return;
  }

  playSound("button");
  const guest = getCurrentGuest();
  const isCorrect = guest.correctDecision === decision;
  const effects = getDecisionEffects(guest, decision, isCorrect);
  const text = guest.outcomeText?.[decision] ?? "前台日志：这次处置没有留下明确记录。";

  state.correctCount += isCorrect ? 1 : 0;
  state.locked = true;
  applyEffects(effects);
  state.history.push({ guestId: guest.id, decision, isCorrect, effects });

  elements.feedback.textContent = `${isCorrect ? "判断正确。" : "判断失误。"} ${text} ${formatEffects(effects)}`;
  elements.feedback.className = `feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
  if (shouldPlayAnomaly(guest, decision, isCorrect)) {
    playSound("anomaly");
  }
  updateScore();
  renderStats();
  setDecisionButtonsEnabled(false);
  window.setTimeout(showNextGuest, 1450);
}

function getDecisionEffects(guest, decision, isCorrect) {
  if (isCorrect) {
    return getCorrectEffects(decision);
  }

  if (guest.type === "normal") {
    return getWrongNormalEffects(decision);
  }

  return getWrongAbnormalEffects(guest.type, decision);
}

function getCorrectEffects(decision) {
  const effects = {
    allow: { money: 26, bossTrust: 5 },
    refuse: { money: -4, bossTrust: 2, sanity: -1 },
    police: { money: -8, bossTrust: -2, corruption: -5, sanity: -3 },
    error: { money: -10, complaints: 2, bossTrust: -3, sanity: -2 },
  };
  return effects[decision] ?? {};
}

function getWrongNormalEffects(decision) {
  const effects = {
    refuse: { money: -12, complaints: 14, bossTrust: -10, sanity: -2 },
    police: { money: -16, complaints: 20, bossTrust: -14, sanity: -3 },
    error: { money: -14, complaints: 8, bossTrust: -6, sanity: -1 },
  };
  return effects[decision] ?? { complaints: 10, bossTrust: -6 };
}

function getWrongAbnormalEffects(type, decision) {
  const allowDamage = type === "danger"
    ? { money: 24, corruption: 28, sanity: -18, bossTrust: 4 }
    : { money: 20, corruption: 18, sanity: -11, bossTrust: 3 };

  const effects = {
    allow: allowDamage,
    refuse: { money: -5, corruption: 4, sanity: -4, bossTrust: -2 },
    police: { money: -10, corruption: 2, sanity: -6, bossTrust: -7 },
    error: { money: -8, corruption: 5, sanity: -5, bossTrust: -4 },
  };
  return effects[decision] ?? {};
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([stat, delta]) => {
    state.stats[stat] = (state.stats[stat] ?? 0) + delta;
  });

  state.stats.money = Math.max(0, state.stats.money);
  state.stats.complaints = Math.max(0, state.stats.complaints);
  state.stats.corruption = Math.max(0, Math.min(100, state.stats.corruption));
  state.stats.sanity = Math.max(0, Math.min(100, state.stats.sanity));
  state.stats.bossTrust = Math.max(0, Math.min(100, state.stats.bossTrust));
}

function formatEffects(effects) {
  const changes = Object.entries(effects)
    .filter(([, delta]) => delta !== 0)
    .map(([stat, delta]) => `${statLabels[stat] ?? stat} ${delta > 0 ? "+" : ""}${delta}`);

  return changes.length > 0 ? `(${changes.join(" / ")})` : "";
}

function showNextGuest() {
  state.currentIndex += 1;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";

  if (state.currentIndex >= guests.length) {
    finishShift();
    return;
  }

  state.locked = false;
  renderGuest();
  setDecisionButtonsEnabled(true);
}

function finishShift() {
  stopRainLoop();
  const ending = endings.find(matchesEnding) ?? endings.at(-1);
  elements.progressLabel.textContent = "值班结束 / 06:00";
  elements.clockLabel.textContent = "06:00";
  elements.guestCard.innerHTML = `
    <div class="empty-card">
      <p class="eyebrow">LOBBY CAMERA: NO SIGNAL</p>
      <p>天亮后，大堂恢复了安静。至少监控画面是这么显示的。</p>
    </div>
  `;
  elements.sidebarDossier.innerHTML = `
    <p class="eyebrow">VISITOR DOSSIER</p>
    <p class="sidebar-empty">本夜记录已封存。不要重新读自己的笔迹。</p>
  `;
  elements.endingTitle.textContent = ending?.title ?? "值班结束";
  elements.endingDescription.textContent = ending?.description ?? "请补充结局数据。";
  elements.endingSummary.textContent = `最终记录：正确 ${state.correctCount}/${guests.length} / Money $${state.stats.money} / Complaints ${state.stats.complaints} / Corruption ${state.stats.corruption} / Sanity ${state.stats.sanity} / Boss Trust ${state.stats.bossTrust}`;
  elements.endingPanel.hidden = false;
}

function matchesEnding(ending) {
  const conditions = ending.conditions ?? [];
  if (conditions.length === 0) {
    return true;
  }

  const checks = conditions.map((condition) => checkCondition(condition));
  return ending.match === "any" ? checks.some(Boolean) : checks.every(Boolean);
}

function checkCondition(condition) {
  const value = getStatForEnding(condition.stat);
  if (condition.gte !== undefined && value < condition.gte) {
    return false;
  }
  if (condition.lte !== undefined && value > condition.lte) {
    return false;
  }
  return true;
}

function getStatForEnding(stat) {
  if (stat === "correctCount") {
    return state.correctCount;
  }
  if (stat === "mistakes") {
    return guests.length - state.correctCount;
  }
  return state.stats[stat] ?? 0;
}

Object.entries(decisionButtons).forEach(([decision, button]) => {
  button.addEventListener("click", () => decide(decision));
});
elements.startButton.addEventListener("click", beginShift);
elements.restartButton.addEventListener("click", beginShift);

renderRules();
renderStats();
updateScore();

function createAudio(src, volume, loop = false) {
  const track = new Audio(src);
  track.preload = "auto";
  track.volume = volume;
  track.loop = loop;
  return track;
}

function unlockAudio() {
  if (audio.unlocked) {
    return;
  }

  audio.unlocked = true;
  Object.values(audio.tracks).forEach((track) => {
    track.load();
  });
}

function playSound(name) {
  if (!audio.unlocked) {
    return;
  }

  const track = audio.tracks[name];
  if (!track) {
    console.warn(`Audio track not found: ${name}`);
    return;
  }

  track.currentTime = 0;
  track.play().catch((error) => {
    console.warn(`Audio playback failed: ${name}`, error);
  });
}

function startRainLoop() {
  const rain = audio.tracks.rain;
  if (!rain || !audio.unlocked) {
    return;
  }

  rain.currentTime = 0;
  rain.play().catch((error) => {
    console.warn("Audio playback failed: rain", error);
  });
}

function stopRainLoop() {
  const rain = audio.tracks.rain;
  if (!rain) {
    return;
  }

  rain.pause();
  rain.currentTime = 0;
}

function shouldPlayAnomaly(guest, decision, isCorrect) {
  if (!isCorrect && guest.type !== "normal") {
    return true;
  }

  return guest.type === "danger" && ["allow", "police"].includes(decision);
}
