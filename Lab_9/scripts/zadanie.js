
// ============================================================
// 0. ЗВУКОВОЙ ДВИЖОК (Web Audio API)
// ============================================================
const AudioEngine = {
    ctx: null,
    init: function () {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playShot: function () {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Основной выстрел (белый шум + фильтр)
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.15);

        // Низкий бас (тело выстрела)
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
        oscGain.gain.setValueAtTime(0.4, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    },
    playHover: function () {
        if (!this.ctx) return;
        const ctx = this.ctx;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
    }
};

// ============================================================
// 1. ЛОГИКА СТРАНИЦЫ (Курсор, Гильзы, Эффекты)
// ============================================================
document.addEventListener("DOMContentLoaded", function () {

    // Инициализация звука при первом клике (политика браузеров)
    document.body.addEventListener("click", function () {
        AudioEngine.init();
    }, { once: true });

    // --- Матричный дождь ---
    const matrixContainer = document.getElementById("matrixRain");
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 30; i++) {
        const col = document.createElement("div");
        col.className = "matrix-column";
        col.style.left = Math.random() * 100 + "%";
        col.style.animationDuration = (5 + Math.random() * 10) + "s";
        col.style.animationDelay = (Math.random() * -15) + "s";
        let text = "";
        for (let j = 0; j < 40; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + "<br>";
        }
        col.innerHTML = text;
        matrixContainer.appendChild(col);
    }

    // --- Частицы ---
    const particlesContainer = document.getElementById("particles");
    for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDelay = Math.random() * 10 + "s";
        p.style.animationDuration = (6 + Math.random() * 8) + "s";
        const colors = ["#00e5ff", "#ff006e", "#ffffff"];
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = "0 0 8px " + p.style.background;
        particlesContainer.appendChild(p);
    }

    // --- КУРСОР-АВТОМАТ ---
    const cursorWrapper = document.getElementById("cursorWrapper");
    const gunCursor = document.getElementById("gunCursor");
    const crosshair = document.getElementById("crosshair");
    const muzzleFlashLayer = document.getElementById("muzzleFlashLayer");
    const shellsLayer = document.getElementById("shellsLayer");
    const glitchOverlay = document.getElementById("glitchOverlay");
    const hudCoords = document.getElementById("hudCoords");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;

    // Плавное следование курсора
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;

        cursorWrapper.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        const dx = mouseX - lastMouseX;
        const dy = mouseY - lastMouseY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const clampedAngle = Math.max(-15, Math.min(15, angle * 0.2));

        if (!gunCursor.classList.contains("firing")) {
            gunCursor.style.transform = `translate(-20px, -20px) rotate(${clampedAngle}deg)`;
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Отслеживание мыши
    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        hudCoords.textContent = `X: ${e.clientX} Y: ${e.clientY}`;
    });

    // Эффект выстрела при клике
    document.addEventListener("mousedown", function (e) {
        gunCursor.classList.add("firing");
        setTimeout(() => gunCursor.classList.remove("firing"), 120);

        AudioEngine.init();
        AudioEngine.playShot();

        createMuzzleFlash(e.clientX, e.clientY);
        createShell(e.clientX, e.clientY);
        triggerGlitch();
    });

    // Наведение
    const interactiveElements = document.querySelectorAll("input, button, a, th, td, .field-index");
    interactiveElements.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            gunCursor.classList.add("hovering");
            crosshair.classList.add("hovering");
            AudioEngine.init();
            AudioEngine.playHover();
        });
        el.addEventListener("mouseleave", function () {
            gunCursor.classList.remove("hovering");
            crosshair.classList.remove("hovering");
        });
    });

    // --- Функции создания эффектов ---
    function createMuzzleFlash(x, y) {
        const flash = document.createElement("div");
        flash.className = "muzzle-flash";
        flash.style.left = (x + 90) + "px";
        flash.style.top = y + "px";
        muzzleFlashLayer.appendChild(flash);
        setTimeout(() => flash.remove(), 150);
    }

    function createShell(x, y) {
        const shell = document.createElement("div");
        shell.className = "shell";
        shell.style.left = (x + 20) + "px";
        shell.style.top = (y + 10) + "px";

        // Случайное направление полета гильзы
        const dx = (Math.random() - 0.7) * 150;
        const dy = (Math.random() * -100) - 50;
        shell.style.setProperty('--dx', dx + "px");
        shell.style.setProperty('--dy', dy + "px");

        shellsLayer.appendChild(shell);
        setTimeout(() => shell.remove(), 1200);
    }

    function triggerGlitch() {
        glitchOverlay.classList.add("active");
        setTimeout(() => glitchOverlay.classList.remove("active"), 150);
    }
});





























function checkData () {
    var ans;

    var name = document.getElementById("name_f").value.trim();
    var company = document.getElementById("company_f").value.trim();
    var phone = document.getElementById("number_f").value.trim();
    var email = document.getElementById("mail_f").value.trim();

    if (name.length === 0 || company.length === 0 || phone.length === 0 || email.length === 0) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    var phonePattern = /^(\+7|8)[\s\-\(]*\d{3}[\s\-\)]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}$/;
    if (!phonePattern.test(phone)) {
        alert("Введите корректный номер телефона (например: +7 999 123-45-67 или 8 999 123 45 67)");
        return;
    }

    ans = confirm("Вы уверены, что хотите отправить введенные данные ?");
    if (ans) {document.getElementById("registration_form").submit()}






































}