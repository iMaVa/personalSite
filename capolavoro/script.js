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
            enable: false,
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

    tsParticles.load("tsparticles", options).then((container) => {
        document.addEventListener("click", (event) => {
            const tileWrapper = document.getElementById("tile-wrapper");
            const tileRect = tileWrapper.getBoundingClientRect();

            const x = event.clientX;
            const y = event.clientY;

            const isInTileWrapper =
            x >= tileRect.left &&
            x <= tileRect.right &&
            y >= tileRect.top &&
            y <= tileRect.bottom;

            if (!isInTileWrapper) {
            // Use tsparticles' internal mouse position (already scaled correctly)
            const pos = container.interactivity.mouse.position;
            if (pos) {
                container.particles.push(4, { position: { x: pos.x, y: pos.y } });
            }
            }
        });
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


    const piastre = document.getElementById('piastre');
    const rows = 15;
    const cols = 15;
    const tiles = [];
    const colors = ['orange', 'mediumseagreen', 'purple', 'tomato', '#3498db', 'yellow', 'magenta'];
    let colorIndex = 0;

    // Create grid and store references
    for (let row = 0; row < rows; row++) {
        tiles[row] = [];
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', 'transparent');
            tile.dataset.row = row;
            tile.dataset.col = col;
            tile.dataset.color = 'transparent';
            piastre.appendChild(tile);
            tiles[row][col] = tile;
        }
    }

    // Hover effect logic
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = tiles[row][col];

            tile.addEventListener("mouseenter", () => {
                if (tile.dataset.color === "transparent") {
                    tile.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                } else {
                    tile.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
            });

            tile.addEventListener("mouseleave", () => {
                if (tile.dataset.color === "transparent") {
                    tile.style.backgroundColor = "transparent";
                } else {
                    tile.style.backgroundColor = tile.dataset.color;
                }
            });
        }
    }

    function spreadWave(startRow, startCol, targetColor, reverse = false) {
        const visited = new Set();
        const queue = [{ row: startRow, col: startCol, step: 0 }];

        function animate() {
            const nextQueue = [];

            for (const { row, col } of queue) {
                const key = `${row},${col}`;
                if (visited.has(key)) continue;
                if (row < 0 || col < 0 || row >= rows || col >= cols) continue;

                visited.add(key);
                const tile = tiles[row][col];

                if (reverse && tile.dataset.color !== targetColor) continue;
                if (!reverse && tile.dataset.color !== 'transparent') continue;

                requestAnimationFrame(() => {
                    if (reverse) {
                        tile.style.backgroundColor = 'transparent';
                        tile.dataset.color = 'transparent';
                        tile.classList.add('transparent');
                    } else {
                        tile.style.backgroundColor = targetColor;
                        tile.dataset.color = targetColor;
                        tile.classList.remove('transparent');
                    }
                });

                const directions = [
                    { dr: 1, dc: 0 }, { dr: -1, dc: 0 }, { dr: 0, dc: 1 }, { dr: 0, dc: -1 }
                ];
                for (const { dr, dc } of directions) {
                    nextQueue.push({ row: row + dr, col: col + dc });
                }
            }

            if (nextQueue.length) {
                setTimeout(() => {
                    queue.length = 0;
                    queue.push(...nextQueue);
                    animate();
                }, 5);
            }
        }

        animate();
    }

    piastre.addEventListener('click', (e) => {
        if (!e.target.classList.contains('tile')) return;

        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const currentColor = e.target.dataset.color;

        if (currentColor !== 'transparent') {
            spreadWave(row, col, currentColor, true);
        } else {
            const nextColor = colors[colorIndex];
            spreadWave(row, col, nextColor, false);
            colorIndex = (colorIndex + 1) % colors.length;
        }
    });

    const scrollButton = document.getElementById("hopButton");

    scrollButton.addEventListener("click", () => {
        window.scrollBy({
            top: 800,
            left: 0,
            behavior: "smooth"
        });
    });
});