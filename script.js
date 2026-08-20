// script.js
document.addEventListener('DOMContentLoaded', function() {
    const acceptBtn = document.getElementById('acceptBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const acceptMsg = document.getElementById('acceptMessage');
    const rejectMsg = document.getElementById('rejectMessage');

    // ====== ТАЙМЕР ДО СВИДАНИЯ ======
    // Суббота, 20:45 (замени на свою дату)
    const targetDate = new Date(2026, 7, 20, 20, 45); // 20 августа 2026

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = '🎬 СЕГОДНЯ! 🎬';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);

    // ====== КНОПКА "ИДУ!" ======
    function handleAccept() {
        // Скрываем все сообщения
        acceptMsg.classList.remove('show');
        rejectMsg.classList.remove('show');

        // Показываем нужное
        setTimeout(() => {
            acceptMsg.classList.add('show');
        }, 50);

        // Меняем кнопку
        acceptBtn.innerHTML = '<span>🎫 БИЛЕТ ЗАБРОНИРОВАН!</span>';
        acceptBtn.style.background = 'linear-gradient(145deg, #2b6b4a, #1a4a2a)';
        acceptBtn.style.boxShadow = '0 6px 0 #0a2a1a, 0 4px 20px rgba(43, 107, 74, 0.3)';
        acceptBtn.disabled = true;
        rejectBtn.disabled = true;
        rejectBtn.style.opacity = '0.3';

        // Вибрация
        if (navigator.vibrate) navigator.vibrate(30);

        // Конфетти
        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.5, x: 0.3 } }), 200);
            setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.5, x: 0.7 } }), 400);
        }
    }

    // ====== КНОПКА "НЕ СМОГУ..." ======
    function handleReject() {
        // Скрываем все сообщения
        acceptMsg.classList.remove('show');
        rejectMsg.classList.remove('show');

        // Показываем грустного щеночка
        setTimeout(() => {
            rejectMsg.classList.add('show');
        }, 50);

        // Блокируем обе кнопки
        rejectBtn.disabled = true;
        acceptBtn.disabled = true;
        rejectBtn.style.opacity = '0.4';
        acceptBtn.style.opacity = '0.4';
        acceptBtn.style.transform = 'translateY(4px)';
        acceptBtn.style.boxShadow = '0 4px 0 #b8960e';

        // Грустная вибрация (длинная)
        if (navigator.vibrate) navigator.vibrate([50, 100, 50]);

        // Никакого конфетти! Только грусть 😢
    }

    // ====== НАВЕШИВАЕМ СОБЫТИЯ ======
    acceptBtn.addEventListener('click', handleAccept);
    acceptBtn.addEventListener('touchstart', function(e) {
        if (acceptBtn.disabled) return;
        e.preventDefault();
        handleAccept();
    }, { passive: false });

    rejectBtn.addEventListener('click', handleReject);
    rejectBtn.addEventListener('touchstart', function(e) {
        if (rejectBtn.disabled) return;
        e.preventDefault();
        handleReject();
    }, { passive: false });
});
