let currentProgress = 0;
const progressGoal = 100; // Meta total
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const customIcon = document.querySelector('.custom-icon');

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
        customIcon.style.color = '#58c6f5'; // Azul claro
    } else if (progressPercentage < 75) {
        progressFill.classList.add('medium');
        customIcon.style.color = '#f5a623'; // Naranja
    } else {
        progressFill.classList.add('high');
        customIcon.style.color = '#f54242'; // Rojo
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