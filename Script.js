let currentProgress = 0;
const progressGoal = 100; // Meta total
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const customIcon = document.querySelector('.custom-icon');

// Se lee el valor inicial del span del HTML y se actualiza la barra de progreso
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
        const tier = event.tier; // Obtenermos el nivel de suscripción

        if (event.gifted) {
            console.log("Gifted subscription detected, no points added.");
            return; // Si encuentra el flag de suscripción regalada, la ignora
        }

        switch (tier) {
            case "1000": // Tier 1
                console.log("Tier 1 detected");
                currentProgress += 1; // Incrementa 1 punto para los Tier 1
                break;

            case "2000": // Tier 2
                console.log("Tier 2 detected");
                currentProgress += 2; // Incrementa 2 puntos para los Tier 2
                break;

            case "3000": // Tier 3
                console.log("Tier 3 detected");
                currentProgress += 6; // Incrementa 6 puntos para los Tier 3
                break;

            default:
                console.log("Unknown tier: ", tier);
                break;
        }

        updateProgress(); // Actualiza el progreso independientemente del tier
    }
});

//Función para actualizar el progreso
function updateProgress() {
    const progressPercentage = Math.min((currentProgress / progressGoal) * 100, 100);
    progressFill.style.width = progressPercentage + '%';
    progressText.innerHTML = `<b>${currentProgress}/${progressGoal}</b>`;

    // Cambiar el color de la barra de progreso y el icono según el porcentaje
	// Se define previamente mantener un único color por gusto de Sofi
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

    // Función para actualizar los puntos negros según el progreso
    const milestones = document.querySelectorAll('.milestone');
    milestones.forEach((milestone, index) => {
        if (progressPercentage >= (index + 1) * 20) {
            milestone.classList.add('reached');
        } else {
            milestone.classList.remove('reached');
        }
    });
}