let currentProgress = 0;
const progressGoal = 100; // Meta total
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) return;
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;

    if (listener === 'subscriber') {
        currentProgress += event.amount || 1; //++ subs
        updateProgress();
    }
});

function updateProgress() {
    const progressPercentage = Math.min((currentProgress / progressGoal) * 100, 100);
    progressFill.style.width = progressPercentage + '%';
    progressText.innerHTML = `<b>${currentProgress}/${progressGoal}</b>`;
}
