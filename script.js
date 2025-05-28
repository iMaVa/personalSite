document.addEventListener("DOMContentLoaded", () => {
    const options = {
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
        events: {
        onHover: {
            enable: true,
            mode: "repulse",
        },
        onClick: {
            enable: true,
            mode: "push",
        },
        resize: true,
        },
        modes: {
        repulse: {
            distance: 60,
            duration: 5,
            speed: 0.2,
        },
        push: {
            quantity: 4,
        },
        },
    },
    particles: {
        number: {
        value: 100,
        density: {
            enable: true,
            area: 900,
        },
        },
        color: { value: "#ffffff" },
        shape: { type: "triangle" },
        rotate: {
            value: { min: 0, max: 360 },
            direction: "random",
            animation: {
                enable: true,
                speed: 5,
                sync: false
            }
        },
        opacity: {
        value: 0.2,
        random: { enable: true, minimumValue: 0.1 },
        },
        size: {
        value: 15,
        random: { enable: true, minimumValue: 5 },
        },
        move: {
        enable: true,
        speed: 0.3,     // più lento per movimento generale
        direction: "none",
        outModes: { default: "bounce" },
        random: true,
        straight: false,
        attract: { enable: false },
        },
        collisions: { enable: true },
    },
    detectRetina: true,
    };

    tsParticles.load("tsparticles", options);

    window.addEventListener("scroll", () => {
        const canvas = document.querySelector("#tsparticles canvas");
        if (!canvas) return;

        const maxScroll = 6000;
        const opacity = Math.max(0, 1 - window.scrollY / maxScroll);
        canvas.style.opacity = opacity;
    });

    window.addEventListener("load", () => {
    gsap.to("#toptitle", {
        opacity: 1,
        y: -20,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
    });

    gsap.to("#toptitle", {
        y: -140,
        delay: 3,
        duration: 1.5,
        ease: "power2.inOut"
    });

    gsap.to(".buttons", {
        opacity: 1,
        delay: 4.8,
        duration: 1.2,
        ease: "power2.out"
    });

    gsap.to(".buttons", {
        y: -140,
        delay: 5,
        duration: 2.2,
        ease: "power2.inOut"
    });
    });
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));

            gsap.to(window, {
                duration: 1.8,
                scrollTo: target,
                ease: "power2.out"
            });
        });
    });

    const sun = document.querySelector(".sunrise");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const maxScroll = 5500;
        const progress = Math.min(scrollY / 5500, 1);
        const topPercent = 100 - (70 * progress);
        const opacity = Math.min(progress * 1.2, 0.4);
        const blur = 100 - (60 * progress);

        sun.style.top = `${topPercent}vh`;
        sun.style.opacity = opacity;
        sun.style.filter = `blur(${blur}px)`;
    });
    
    const toggleButton = document.getElementById("toggleEspandi");
    const extraText = document.getElementById("extraText");

    toggleButton.addEventListener("click", () => {
        extraText.classList.toggle("expanded");
        toggleButton.classList.toggle("rotate");
    });
});