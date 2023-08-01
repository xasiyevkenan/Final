let slider = document.getElementById("slider");
let singleslides = document.querySelectorAll(".singleslide");
let dots = document.querySelectorAll(".dot_img");
let x = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPos = e.clientX;
    slider.style.cursor = "grabbing";
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos;
    const dragTranslate = currentTranslate + (deltaX / slider.clientWidth) * 400;
    slider.style.transform = `translateX(${dragTranslate}%)`;
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
    currentTranslate = parseFloat(
        slider.style.transform.replace("translateX(", "").replace("%)", "")
    );
    slider.style.cursor = "default";
    adjustSlide();
});

slider.addEventListener("mouseleave", () => {
    if (isDragging) {
        isDragging = false;
        adjustSlide();
    }
});

function adjustSlide() {
    let length = singleslides.length;
    let y = currentTranslate;
    let closestIndex = Math.round(y / -100);

    if (closestIndex < 0) closestIndex = 0;
    if (closestIndex >= length) closestIndex = length - 1;

    let targetTranslate = closestIndex * -100;
    slider.style.transform = `translateX(${targetTranslate}%)`;
    currentTranslate = targetTranslate;

    dots.forEach((dot, index) => {
        if (index === closestIndex) {
            dot.classList.add("active-dot");
        } else {
            dot.classList.remove("active-dot");
        }
    });
}

dots.forEach((dot, index) => {
    dot.onclick = function () {
        let targetTranslate = index * -100;
        slider.style.transform = `translateX(${targetTranslate}%)`;
        currentTranslate = targetTranslate;

        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add("active-dot");
            } else {
                dot.classList.remove("active-dot");
            }
        });
    };
});

setInterval(() => {
    let currentIndex = Math.abs(currentTranslate / 100);
    let nextIndex = (currentIndex + 1) % singleslides.length;
    let targetTranslate = nextIndex * -100;
    slider.style.transform = `translateX(${targetTranslate}%)`;
    currentTranslate = targetTranslate;

    dots.forEach((dot, index) => {
        if (index === nextIndex) {
            dot.classList.add("active-dot");
        } else {
            dot.classList.remove("active-dot");
        }
    });
}, 4000);


document.addEventListener('DOMContentLoaded', function () {
    let bar_toggle = document.querySelector('.responsive_bar');
    let barmenu = document.querySelector('.bar_menu');

    if (bar_toggle) {
        bar_toggle.onclick = function () {
            bar_toggle.classList.toggle('active');
            bar_toggle.classList.toggle('active_second');

            if (bar_toggle.classList.contains('active')) {
                barmenu.style.left = '0';
                document.body.style.overflow = 'hidden'
            } else {
                barmenu.style.left = '100%';
                document.body.style.overflow = 'scroll'
            }
        };
    }
});
