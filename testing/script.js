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
            duration: 2,
            speed: 0.2,
        },
        push: {
            quantity: 4,
        },
        },
    },
    particles: {
        number: {
        value: 50,
        density: {
            enable: true,
            area: 900,
        },
        },
        color: { value: "#ffffff" },
        shape: { type: "triangle" },
        opacity: {
        value: 0.15,
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
});