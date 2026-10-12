
class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);

        if (!this.slider) return;

        this.track = this.slider.querySelector(".slider-track");
        this.slides = Array.from(this.track.children);
        this.prevButton = this.slider.querySelector(".prev");
        this.nextButton = this.slider.querySelector(".next");
        this.dotsContainer = this.slider.querySelector(".slider-dots");
        this.currentIndex = 0;
        this.dots = [];
        this.autoSlide = null;

        if (this.slides.length === 0) return;

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSliderPosition();
        this.startAutoSlide();
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        this.dots = [];

        this.slides.forEach((slide, index) => {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.classList.add("dot");
            dot.setAttribute("aria-label", `Go to image ${index + 1}`);

            dot.addEventListener("click", () => {
                this.currentIndex = index;
                this.updateSliderPosition();
                this.restartAutoSlide();
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateSliderPosition() {
        const offset = -this.currentIndex * 100;

        this.track.style.transform = `translateX(${offset}%)`;

        this.dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }

    nextSlide() {
        this.currentIndex =
            (this.currentIndex + 1) % this.slides.length;

        this.updateSliderPosition();
    }

    prevSlide() {
        this.currentIndex =
            (this.currentIndex - 1 + this.slides.length) %
            this.slides.length;

        this.updateSliderPosition();
    }

    startAutoSlide() {
        this.stopAutoSlide();

        this.autoSlide = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
        this.autoSlide = null;
    }

    restartAutoSlide() {
        this.startAutoSlide();
    }

    bindEvents() {
        this.nextButton.addEventListener("click", () => {
            this.nextSlide();
            this.restartAutoSlide();
        });

        this.prevButton.addEventListener("click", () => {
            this.prevSlide();
            this.restartAutoSlide();
        });

        this.slider.addEventListener("mouseenter", () => {
            this.stopAutoSlide();
        });

        this.slider.addEventListener("mouseleave", () => {
            this.startAutoSlide();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ImageSlider("#gallery .slider");
});