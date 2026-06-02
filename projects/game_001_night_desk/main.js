const rules = window.NIGHT_DESK_RULES ?? [];
const guests = window.NIGHT_DESK_GUESTS ?? [];
const endings = window.NIGHT_DESK_ENDINGS ?? [];

const elements = {
  ruleList: document.querySelector("#rule-list"),
  guestCard: document.querySelector("#guest-card"),
  progressLabel: document.querySelector("#progress-label"),
  scoreLabel: document.querySelector("#score-label"),
  feedback: document.querySelector("#feedback"),
  startButton: document.querySelector("#start-button"),
  approveButton: document.querySelector("#approve-button"),
  rejectButton: document.querySelector("#reject-button"),
  endingPanel: document.querySelector("#ending-panel"),
  endingTitle: document.querySelector("#ending-title"),
  endingDescription: document.querySelector("#ending-description"),
  restartButton: document.querySelector("#restart-button"),
};

const state = {
  currentIndex: -1,
  correctCount: 0,
  locked: true,
};

function renderRules() {
  elements.ruleList.replaceChildren(
    ...rules.map((rule) => {
      const item = document.createElement("li");
      item.textContent = rule.description;
      return item;
    }),
  );
}

function renderGuest() {
  const guest = guests[state.currentIndex];
  elements.progressLabel.textContent = `柜台来客 ${state.currentIndex + 1} / ${guests.length}`;
  elements.guestCard.replaceChildren();

  const cameraLabel = document.createElement("p");
  cameraLabel.className = "eyebrow";
  cameraLabel.textContent = `LOBBY CAMERA / ${guest.arrivalTime}`;

  const name = document.createElement("h2");
  name.textContent = guest.name;

  const request = document.createElement("p");
  request.textContent = guest.request;

  const details = document.createElement("dl");
  guest.details.forEach(({ label, value }) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    details.append(term, description);
  });

  elements.guestCard.append(cameraLabel, name, request, details);
}

function setDecisionButtonsEnabled(enabled) {
  elements.approveButton.disabled = !enabled;
  elements.rejectButton.disabled = !enabled;
}

function updateScore() {
  elements.scoreLabel.textContent = `判断记录 ${state.correctCount} / ${guests.length}`;
}

function beginShift() {
  state.currentIndex = 0;
  state.correctCount = 0;
  state.locked = false;
  elements.endingPanel.hidden = true;
  elements.startButton.hidden = true;
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  updateScore();
  renderGuest();
  setDecisionButtonsEnabled(true);
}

function decide(decision) {
  if (state.locked) {
    return;
  }

  const guest = guests[state.currentIndex];
  const isCorrect = guest.correctDecision === decision;
  state.correctCount += isCorrect ? 1 : 0;
  state.locked = true;
  elements.feedback.textContent = isCorrect ? guest.correctFeedback : guest.wrongFeedback;
  elements.feedback.className = `feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
  updateScore();
  setDecisionButtonsEnabled(false);
  window.setTimeout(showNextGuest, 850);
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
  const ending = endings.find(({ minScore }) => state.correctCount >= minScore) ?? endings.at(-1);
  elements.progressLabel.textContent = "值班结束 / 06:00";
  elements.guestCard.innerHTML = `
    <div class="empty-card">
      <p class="eyebrow">LOBBY CAMERA: NO SIGNAL</p>
      <p>天亮后，大堂恢复了安静。</p>
    </div>
  `;
  elements.endingTitle.textContent = ending?.title ?? "值班结束";
  elements.endingDescription.textContent = ending?.description ?? "请补充结局数据。";
  elements.endingPanel.hidden = false;
}

elements.startButton.addEventListener("click", beginShift);
elements.approveButton.addEventListener("click", () => decide("approve"));
elements.rejectButton.addEventListener("click", () => decide("reject"));
elements.restartButton.addEventListener("click", beginShift);

renderRules();
