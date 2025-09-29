// Variables globales
let currentSlide = 1;
const totalSlides = 7;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    updateNavigationButtons();
    updateSectionIndicator();
    
    // Navegación por teclado
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            event.preventDefault();
            nextSlide();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousSlide();
        }
    });
});

// Navegación entre slides
function nextSlide() {
    if (currentSlide < totalSlides) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        currentSlide++;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        updateProgressBar();
        updateNavigationButtons();
        updateSectionIndicator();
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        currentSlide--;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        updateProgressBar();
        updateNavigationButtons();
        updateSectionIndicator();
    }
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
    
    if (currentSlide === totalSlides) {
        nextBtn.textContent = '¡Finalizado!';
    } else {
        nextBtn.textContent = 'Siguiente →';
    }
}

function updateSectionIndicator() {
    document.getElementById('current-section').textContent = currentSlide;
    document.getElementById('total-sections').textContent = totalSlides;
}

// Funciones interactivas - Sección 1
function revealAnswer() {
    const answer = document.getElementById('intro-answer');
    const button = document.querySelector('.reveal-btn');
    
    answer.classList.remove('hidden');
    button.style.transform = 'scale(0.95)';
    button.textContent = '¡Exacto! Sigamos...';
    button.disabled = true;
    
    // Animar la aparición
    setTimeout(() => {
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(20px)';
        answer.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            answer.style.opacity = '1';
            answer.style.transform = 'translateY(0)';
        }, 50);
    }, 100);
}

// Funciones interactivas - Sección 2
function highlightExample(element) {
    // Quitar highlight de todos
    document.querySelectorAll('.example-item').forEach(item => {
        item.classList.remove('highlighted');
    });
    
    // Añadir highlight al clickeado
    element.classList.add('highlighted');
    
    // Efecto de vibración
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
    
    // Añadir CSS para la animación shake si no existe
    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Funciones interactivas - Sección 3
function calculateLostTime() {
    const interruptionsInput = document.getElementById('interruptions-input');
    const result = document.getElementById('calc-result');
    const interruptions = parseInt(interruptionsInput.value) || 10;
    
    const minutesPerInterruption = 25; // Tiempo para recuperar concentración
    const totalMinutesLost = interruptions * minutesPerInterruption;
    const hoursLost = Math.floor(totalMinutesLost / 60);
    const minutesRemaining = totalMinutesLost % 60;
    
    let timeText;
    if (hoursLost > 0) {
        timeText = `${hoursLost} hora${hoursLost > 1 ? 's' : ''} y ${minutesRemaining} minutos`;
    } else {
        timeText = `${minutesRemaining} minutos`;
    }
    
    result.innerHTML = `
        <p>Con <strong>${interruptions}</strong> interrupciones diarias pierdes <span class="highlight">${timeText}</span> en volver a retomar la tarea con concentración.</p>
        <p class="dramatic-text">¿Entonces CUÁNDO TRABAJAS? 🤷‍♀️</p>
        <div style="margin-top: 16px; padding: 12px; background: var(--color-bg-4); border-radius: 8px; border-left: 4px solid var(--color-error);">
            <strong>Dato adicional:</strong> Si cada interrupción dura solo 3 minutos, ya estás perdiendo ${interruptions * 3} minutos adicionales en la interrupción misma.
        </div>
    `;
    
    // Animar el resultado
    result.style.transform = 'scale(0.95)';
    setTimeout(() => {
        result.style.transform = 'scale(1)';
    }, 150);
}

// Funciones interactivas - Sección 4
function animateResponse(element) {
    const answer = element.querySelector('.answer');
    
    // Efecto de máquina de escribir en la respuesta
    answer.style.opacity = '0';
    setTimeout(() => {
        answer.style.opacity = '1';
        answer.style.background = 'var(--color-success)';
        answer.style.color = 'var(--color-btn-primary-text)';
        answer.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            answer.style.transform = 'scale(1)';
        }, 200);
    }, 100);
    
    // Añadir sonido mental de "ding" con vibración
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
    
    // Añadir CSS para pulse si no existe
    if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(var(--color-success-rgb), 0.4); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Funciones interactivas - Sección 5
function calculateTotalWaste() {
    const interruptions = parseInt(document.getElementById('interruptions-time').value) || 0;
    const notifications = parseInt(document.getElementById('notifications-time').value) || 0;
    const meetings = parseInt(document.getElementById('meetings-time').value) || 0;
    const social = parseInt(document.getElementById('social-time').value) || 0;
    const email = parseInt(document.getElementById('email-time').value) || 0;
    
    const totalWaste = interruptions + notifications + meetings + social + email;
    const workDayMinutes = 8 * 60; // 8 horas laborales
    const wastePercentage = Math.round((totalWaste / workDayMinutes) * 100);
    
    // Mostrar resultado
    const resultDiv = document.getElementById('audit-result');
    const wasteNumber = document.getElementById('total-waste');
    const wastePercent = document.getElementById('waste-percent');
    
    resultDiv.classList.remove('hidden');
    
    // Animar los números
    animateNumber(wasteNumber, 0, totalWaste, 2000);
    animateNumber(wastePercent, 0, wastePercentage, 2000);
    
    // Cambiar color según la gravedad
    if (wastePercentage > 50) {
        resultDiv.style.borderColor = 'var(--color-error)';
        resultDiv.style.background = 'var(--color-bg-4)';
    } else if (wastePercentage > 25) {
        resultDiv.style.borderColor = 'var(--color-warning)';
        resultDiv.style.background = 'var(--color-bg-2)';
    } else {
        resultDiv.style.borderColor = 'var(--color-success)';
        resultDiv.style.background = 'var(--color-bg-3)';
    }
    
    // Mensaje personalizado
    setTimeout(() => {
        let message = '';
        if (wastePercentage > 50) {
            message = '<div style="margin-top: 16px; color: var(--color-error); font-weight: bold;">🚨 ¡ALERTA! Más de la mitad de tu día se va en ladrones de tiempo</div>';
        } else if (wastePercentage > 25) {
            message = '<div style="margin-top: 16px; color: var(--color-warning); font-weight: bold;">⚠️ Cuidado: Una cuarta parte de tu día no es productiva</div>';
        } else {
            message = '<div style="margin-top: 16px; color: var(--color-success); font-weight: bold;">✅ ¡Bien! Tienes un control aceptable de tu tiempo</div>';
        }
        
        resultDiv.innerHTML += message;
    }, 2200);
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Funciones interactivas - Sección 6
function toggleStrategy(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Cerrar todas las demás tarjetas
    document.querySelectorAll('.strategy-card').forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });
    
    // Toggle la tarjeta actual
    if (isExpanded) {
        card.classList.remove('expanded');
    } else {
        card.classList.add('expanded');
        
        // Efecto de destaque
        card.style.borderColor = 'var(--color-success)';
        card.style.boxShadow = '0 8px 25px rgba(var(--color-success-rgb), 0.2)';
        
        setTimeout(() => {
            card.style.borderColor = 'var(--color-primary)';
            card.style.boxShadow = 'var(--shadow-lg)';
        }, 1000);
    }
}

// Funciones interactivas - Sección 7
function schedulePersonalTime() {
    const button = document.querySelector('.challenge-btn');
    const result = document.getElementById('challenge-result');
    
    // Deshabilitar botón
    button.disabled = true;
    button.textContent = 'Programando...';
    button.style.background = 'var(--color-warning)';
    
    // Simular proceso de programación
    setTimeout(() => {
        button.textContent = '¡Hora programada! ✅';
        button.style.background = 'var(--color-success)';
        
        // Mostrar resultado
        result.classList.remove('hidden');
        result.style.opacity = '0';
        result.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            result.style.transition = 'all 0.5s ease';
            result.style.opacity = '1';
            result.style.transform = 'translateY(0)';
        }, 100);
        
        // Añadir confeti visual
        createConfetti();
        
    }, 1500);
}

function createConfetti() {
    const colors = ['var(--color-primary)', 'var(--color-success)', 'var(--color-warning)', 'var(--color-info)'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.width = '10px';
        confettiPiece.style.height = '10px';
        confettiPiece.style.background = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.top = '-10px';
        confettiPiece.style.borderRadius = '50%';
        confettiPiece.style.animation = `fall ${Math.random() * 2 + 3}s linear forwards`;
        
        confettiContainer.appendChild(confettiPiece);
    }
    
    // Añadir CSS para la animación de caída
    if (!document.querySelector('#confetti-animation')) {
        const style = document.createElement('style');
        style.id = 'confetti-animation';
        style.textContent = `
            @keyframes fall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Limpiar confeti después de 5 segundos
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

// Función para ir a una slide específica (útil para debugging)
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        currentSlide = slideNumber;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        updateProgressBar();
        updateNavigationButtons();
        updateSectionIndicator();
    }
}

// Función para resetear la presentación
function resetPresentation() {
    // Volver a la primera slide
    document.getElementById(`slide-${currentSlide}`).classList.remove('active');
    currentSlide = 1;
    document.getElementById(`slide-${currentSlide}`).classList.add('active');
    
    // Resetear elementos interactivos
    const introAnswer = document.getElementById('intro-answer');
    const revealBtn = document.querySelector('.reveal-btn');
    
    if (introAnswer) {
        introAnswer.classList.add('hidden');
    }
    
    if (revealBtn) {
        revealBtn.textContent = '¿Cuántas veces te han interrumpido hoy?';
        revealBtn.disabled = false;
        revealBtn.style.transform = '';
    }
    
    // Resetear highlights
    document.querySelectorAll('.example-item').forEach(item => {
        item.classList.remove('highlighted');
    });
    
    // Resetear calculadora
    document.getElementById('interruptions-input').value = '10';
    
    // Resetear auditoría
    document.querySelectorAll('#slide-5 input').forEach(input => {
        input.value = '';
    });
    
    const auditResult = document.getElementById('audit-result');
    if (auditResult) {
        auditResult.classList.add('hidden');
    }
    
    // Resetear estrategias
    document.querySelectorAll('.strategy-card').forEach(card => {
        card.classList.remove('expanded');
    });
    
    // Resetear desafío final
    const challengeBtn = document.querySelector('.challenge-btn');
    const challengeResult = document.getElementById('challenge-result');
    
    if (challengeBtn) {
        challengeBtn.disabled = false;
        challengeBtn.textContent = 'Bloquear 1 hora mañana para mí';
        challengeBtn.style.background = 'var(--color-success)';
    }
    
    if (challengeResult) {
        challengeResult.classList.add('hidden');
    }
    
    // Actualizar interfaz
    updateProgressBar();
    updateNavigationButtons();
    updateSectionIndicator();
}

// Funciones de accesibilidad
document.addEventListener('DOMContentLoaded', function() {
    // Añadir indicadores de navegación por teclado
    const navigationInfo = document.createElement('div');
    navigationInfo.style.position = 'fixed';
    navigationInfo.style.bottom = '10px';
    navigationInfo.style.left = '10px';
    navigationInfo.style.background = 'rgba(0,0,0,0.7)';
    navigationInfo.style.color = 'white';
    navigationInfo.style.padding = '8px 12px';
    navigationInfo.style.borderRadius = '4px';
    navigationInfo.style.fontSize = '12px';
    navigationInfo.style.zIndex = '1000';
    navigationInfo.innerHTML = 'Usa ← → o Espacio para navegar';
    navigationInfo.style.opacity = '0.7';
    
    document.body.appendChild(navigationInfo);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        navigationInfo.style.opacity = '0';
        setTimeout(() => {
            if (navigationInfo.parentNode) {
                navigationInfo.parentNode.removeChild(navigationInfo);
            }
        }, 500);
    }, 5000);
});

// Función para estadísticas de uso (opcional)
function trackSlideTime() {
    const slideStartTime = Date.now();
    
    return function() {
        const timeSpent = Date.now() - slideStartTime;
        console.log(`Tiempo en slide ${currentSlide}: ${Math.round(timeSpent/1000)} segundos`);
    };
}

// Inicializar tracking si se desea
let currentSlideTracker = trackSlideTime();

// Override nextSlide y previousSlide para incluir tracking
const originalNextSlide = nextSlide;
const originalPreviousSlide = previousSlide;

nextSlide = function() {
    currentSlideTracker();
    originalNextSlide();
    currentSlideTracker = trackSlideTime();
};

previousSlide = function() {
    currentSlideTracker();
    originalPreviousSlide();
    currentSlideTracker = trackSlideTime();
};