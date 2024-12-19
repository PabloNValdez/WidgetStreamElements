let currentProgress = 0;
const progressGoal = 100; // Meta total
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');

// Leer el valor inicial del span y actualizar la barra de progreso
document.addEventListener('DOMContentLoaded', () => {
    const initialProgress = parseInt(progressText.textContent.match(/\d+/)[0], 10);
    currentProgress = initialProgress;
    updateProgress();
});

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

    // Cambiar el color de la barra de progreso según el porcentaje
    progressFill.classList.remove('low', 'medium', 'high');
    if (progressPercentage < 50) {
        progressFill.classList.add('low');
    } else if (progressPercentage < 75) {
        progressFill.classList.add('medium');
    } else {
        progressFill.classList.add('high');
    }

    // Actualizar los puntos negros según el progreso
    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach((milestone, index) => {
        if (progressPercentage >= (index + 1) * 20) {
            milestone.classList.add('reached');
        } else {
            milestone.classList.remove('reached');
        }
    });
}
