/* ============================================================
   BIRDWATCHING — TYPEWRITER EFFECT
   Печатает текст по буквам в <section> <p>
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const paragraphs = document.querySelectorAll('section p');

    // Настройки скорости (мс на символ)
    const speed = 18;              // скорость печати
    const startDelay = 800;        // задержка перед началом (мс)
    const pauseBetween = 600;      // пауза между абзацами (мс)

    paragraphs.forEach((el, index) => {
        // Запоминаем оригинальный текст
        const text = el.textContent.trim();

        // Очищаем элемент и прячем его
        el.textContent = '';
        el.style.opacity = '0';
        el.style.clipPath = 'none';       // отключаем CSS clip-path, если был
        el.classList.add('typing');       // включаем курсор

        // Считаем задержку: первый абзац — startDelay, остальные — после предыдущего
        const delay = startDelay + index * (text.length * speed + pauseBetween);

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transition = 'opacity 0.3s';

            let i = 0;
            const timer = setInterval(() => {
                el.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    // Убираем курсор, когда допечатали
                    setTimeout(() => el.classList.remove('typing'), 800);
                }
            }, speed);

        }, delay);
    });

});