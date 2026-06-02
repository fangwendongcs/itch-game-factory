const rules = window.RULE_JUDGEMENT_RULES ?? [];
const guests = window.RULE_JUDGEMENT_GUESTS ?? [];
const endings = window.RULE_JUDGEMENT_ENDINGS ?? [];

const elements = {
  ruleList: document.querySelector("#rule-list"),
  subjectCard: document.querySelector("#subject-card"),
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

  elements.progressLabel.textContent = `访客 ${state.currentIndex + 1} / ${guests.length}`;
  elements.subjectCard.replaceChildren();

  const name = document.createElement("h2");
  name.textContent = guest.name;
  elements.subjectCard.append(name);

  const details = document.createElement("dl");
  guest.details.forEach(({ label, value }) => {
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    details.append(term, description);
  });
  elements.subjectCard.append(details);
}

function setDecisionButtonsEnabled(enabled) {
  elements.approveButton.disabled = !enabled;
  elements.rejectButton.disabled = !enabled;
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

  window.setTimeout(showNextGuest, 650);
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
  elements.progressLabel.textContent = "值班结束";
  elements.subjectCard.innerHTML = '<p class="placeholder">所有访客都已处理完毕。</p>';
  elements.endingTitle.textContent = ending?.title ?? "流程结束";
  elements.endingDescription.textContent = ending?.description ?? "请补充结局数据。";
  elements.endingPanel.hidden = false;
}

function updateScore() {
  elements.scoreLabel.textContent = `正确 ${state.correctCount} / ${guests.length}`;
}

elements.startButton.addEventListener("click", beginShift);
elements.approveButton.addEventListener("click", () => decide("approve"));
elements.rejectButton.addEventListener("click", () => decide("reject"));
elements.restartButton.addEventListener("click", beginShift);

renderRules();
