import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ParticleNetwork() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mouse = useRef({
        x: null,
        y: null
    });

    const PARTICLE_COUNT = 55;
    const PARTICLE_RADIUS = 1.6;
    const LINE_DISTANCE = 130;

    class Particle {
        constructor(width, height) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
        }

        update(width, height) {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x <= 0 || this.x >= width) {
                this.vx *= -1;
            }

            if (this.y <= 0 || this.y >= height) {
                this.vy *= -1;
            }
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                PARTICLE_RADIUS,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles = Array.from(
            { length: PARTICLE_COUNT },
            () => new Particle(width, height)
        );

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            /* Premium monochrome glass effect */
            ctx.fillStyle = "rgba(255,255,255,0.22)";
            ctx.strokeStyle = "rgba(255,255,255,0.08)";
            ctx.lineWidth = 0.4;

            /* Draw particles */
            particles.forEach((particle) => {
                particle.update(width, height);
                particle.draw(ctx);
            });

            /* Connect particles */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < LINE_DISTANCE) {
                        ctx.globalAlpha =
                            1 - distance / LINE_DISTANCE;

                        ctx.beginPath();
                        ctx.moveTo(
                            particles[i].x,
                            particles[i].y
                        );

                        ctx.lineTo(
                            particles[j].x,
                            particles[j].y
                        );

                        ctx.stroke();
                    }
                }
            }

            /* Mouse interaction */
            if (
                mouse.current.x !== null &&
                mouse.current.y !== null
            ) {
                particles.forEach((particle) => {
                    const dx =
                        particle.x - mouse.current.x;
                    const dy =
                        particle.y - mouse.current.y;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < LINE_DISTANCE) {
                        ctx.globalAlpha =
                            0.22 *
                            (1 - distance / LINE_DISTANCE);

                        ctx.beginPath();
                        ctx.moveTo(
                            particle.x,
                            particle.y
                        );

                        ctx.lineTo(
                            mouse.current.x,
                            mouse.current.y
                        );

                        ctx.stroke();
                    }
                });
            }

            ctx.globalAlpha = 1;

            animationRef.current =
                requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        const handleMouseLeave = () => {
            mouse.current = {
                x: null,
                y: null
            };
        };

        window.addEventListener(
            "resize",
            handleResize
        );

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseleave",
            handleMouseLeave
        );

        return () => {
            cancelAnimationFrame(
                animationRef.current
            );

            window.removeEventListener(
                "resize",
                handleResize
            );

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseleave",
                handleMouseLeave
            );
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-60"
            animate={{
                scale: [1, 1.01, 1]
            }}
            transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}