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

    // Ignorar suscripciones regaladas
    if (event.gifted) return;

    if (listener === 'subscriber') {
        currentProgress += event.amount || 1; //++ subs
        updateProgress();
    }
});

function updateProgress() {
    const progressPercentage = Math.min((currentProgress / progressGoal) * 100, 100);
    progressFill.style.width = progressPercentage + '%';
    progressText.innerHTML = `<b>${currentProgress}/${progressGoal}</b>`;

    // Cambiar el color de la barra de progreso y el icono según el porcentaje
    progressFill.classList.remove('low', 'medium', 'high');
    if (progressPercentage < 20) {
        progressFill.style.backgroundColor = '#dac2fe'; 
        customIcon.style.color = '#dac2fe'; 
    } else if (progressPercentage < 40) {
        progressFill.style.backgroundColor = '#dac2fe'; 
        customIcon.style.color = '#dac2fe'; 
    } else if (progressPercentage < 60) {
        progressFill.style.backgroundColor = '#dac2fe'; // Morado pastel
        customIcon.style.color = '#dac2fe'; // Morado pastel
    } else if (progressPercentage < 80) {
        progressFill.style.backgroundColor = '#dac2fe'; 
        customIcon.style.color = '#dac2fe'; 
    } else if (progressPercentage < 100) {
        progressFill.style.backgroundColor = '#dac2fe';
        customIcon.style.color = '#dac2fe'; 
    } else {
        progressFill.style.backgroundColor = '#dac2fe'; 
        customIcon.style.color = '#dac2fe'; 
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
