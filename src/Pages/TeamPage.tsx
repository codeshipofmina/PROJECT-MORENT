import { useEffect } from "react";
import { motion } from "framer-motion";
import minaImg from "../assets/img/mina.jpg";
import ninaImg from "../assets/img/nina.jpg";
import monaImg from "../assets/img/mona.jpg";
import oguzImg from "../assets/img/oguz.jpeg";
import "../styles/team_page.css";

export default function TeamPage() {
    useEffect(() => {
        const canvas = document.getElementById(
            "bg-canvas"
        ) as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d");

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 4 + 1,
            dx: (Math.random() - 1) * 2,
            dy: (Math.random() - 1) * 2,
        }));

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "#ff7f59";
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0) p.x = canvas.width;
                if (p.y < 0) p.y = canvas.height;
                if (p.x > canvas.width) p.x = 0;
                if (p.y > canvas.height) p.y = 0;
            });
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <section className="team-book">
            {/* Canvas für Animation */}
            <canvas id="bg-canvas"></canvas>
            <div className="song">
            <h1>🎉 Unser Team – Freundschaftsbuch 🎉</h1>
                <audio controls>
                <source src="/audio/Coding People.mp3" type="audio/mpeg" />
                Dein Browser unterstützt dieses Audio-Element nicht.
            </audio>
            </div>
            
            <div className="entries">
                <motion.div
                    className="entry-card oguz"
                    initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    transition={{ delay: 1 * 0.5, duration: 0.5 }}
                    whileHover={{
                        backgroundColor: "rgba(91, 157, 255, 0.3)",
                        scale: 1.05,
                    }}
                >
                    <img
                        src={oguzImg}
                        alt="Oguz"
                        className="entry-img"
                    />
                    <div className="entry-info">
                        <h2>Oguz</h2>

                        <div className="div-container">
                            <h5>⭐️ Sternzeichen:</h5>
                            <p>Krebs</p>
                        </div>

                        <div className="div-container">
                            <h5>👟 Schuhgröße:</h5>
                            <p>43</p>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Codeflowsong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=XxxfQ7-aMrE"
                                target="_blank"
                            >
                                Survivor - Eye of the Tiger
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Happysong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=OPDJsHsNlFA"
                                target="_blank"
                            >
                                SawanoHiroyuki[nZk] - Inertia
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🍽 Lieblingsessen:</h5>
                            <p>Döner</p>
                        </div>

                        <div className="div-container">
                            <h5>✨ Fun Fact:</h5>
                            <p>Kann einändig Liegestütze machen</p>
                        </div>

                        <div className="div-container">
                            <h5>👏 Proud of:</h5>
                            <p>
                                als Team eine professionelle Website erstellt zu
                                haben
                            </p>
                        </div>

                        <div className="div-container">
                            <h5>👍 Ich lieb auf Mørent:</h5>
                            <p>Die dynamische Struktur der Seite</p>
                        </div>
                        <div className="div-container">
                            <h5>🚗 Fav VehicleCard:</h5>
                            <p>Porsche 911</p>
                        </div>

                        <div className="div-container">
                            <h5>👩‍💻 Rollen im Team:</h5>
                            <div className="roles-container">
                                <div className="roles">
                                    <p>Backend-Developer</p>
                                </div>
                                <div className="roles">
                                    <p>Database Builder</p>
                                </div>
                                <div className="roles">
                                    <p>HeavyLogicLifter</p>
                                </div>
                                <div className="roles">
                                    <p>CodeWizardBrain</p>
                                </div>
                                <div className="roles">
                                    <p>Authenticator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="entry-card mona"
                    initial={{ opacity: 0, y: -60, x: 60, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    transition={{ delay: 1 * 1, duration: 0.5 }}
                    whileHover={{
                        backgroundColor: "rgb(246, 99, 155,0.3)",
                        scale: 1.05,
                    }}
                >
                    <img
                        src={monaImg}
                        alt="Mona"
                        className="entry-img"
                    />

                    <div className="entry-info">
                        <h2>Mona</h2>
                        <div className="div-container">
                            <h5>⭐️ Sternzeichen:</h5>
                            <p>Waage</p>
                        </div>

                        <div className="div-container">
                            <h5>👟 Schuhgröße:</h5>
                            <p>39</p>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Codeflowsong:</h5>
                            <a href="https://youtu.be/owQNHvBhPHg?feature=shared" target="_blank">
                                Maggie Rogers - The Kill
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Happysong:</h5>
                            <a href="https://youtu.be/y2OBN0ZrVJg?feature=shared" target="_blank">
                                5K HD - Happy Fxxxing Life
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🍽 Lieblingsessen:</h5>
                            <p>Phø</p>
                        </div>
                        <div className="div-container">
                            <h5>✨ Fun Fact:</h5>
                            <p>Schlechte Wortwitze-Queen</p>
                        </div>

                        <div className="div-container">
                            <h5>👏 Proud of:</h5>
                            <p>Beschte Teamarbeit - Harmonyliebe</p>
                        </div>

                        <div className="div-container">
                            <h5>👍 Ich lieb auf Mørent:</h5>
                            <p>Das alle was richtig cooles beigetragen haben</p>
                        </div>

                        <div className="div-container">
                            <h5>🚗 Fav VehicleCard:</h5>
                            <p>Supercode Ape</p>
                        </div>

                        <div className="div-container">
                            <h5>👩‍💻 Rollen im Team:</h5>
                            <div className="roles-container">
                                <div className="roles">
                                    <p>Maschine</p>
                                </div>
                                <div className="roles">
                                    <p>Frontend-Developer</p>
                                </div>
                                <div className="roles">
                                    <p>Make-it-Responive-Babe</p>
                                </div>
                                <div className="roles">
                                    <p>Motivationsrednerin</p>
                                </div>
                                <div className="roles">
                                    <p>Animateurin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="entry-card mina"
                    initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    transition={{ delay: 1 * 1.5, duration: 0.5 }}
                    whileHover={{
                        backgroundColor: "rgb(246, 122, 85, 0.3)",
                        scale: 1.05,
                    }}
                >
                    <img
                        src={minaImg}
                        alt="Mina"
                        className="entry-img"
                    />

                    <div className="entry-info">
                        <h2>Mina</h2>
                        <div className="div-container">
                            <h5>⭐️ Sternzeichen:</h5>
                            <p>Krebs</p>
                        </div>

                        <div className="div-container">
                            <h5>👟 Schuhgröße:</h5>
                            <p>40/41</p>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Codeflowsong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=GdzrrWA8e7A&list=PLBsm_SagFMmefZzqPX4iD8FxlbQMI5eHs"
                                target="_blank"
                            >
                                Zelda - Fairy Mountain
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Happysong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=o7IJt-6YMIg"
                                target="_blank"
                            >
                                MSPEEDY - GAS/GAS/GAS
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🍽 Lieblingsessen:</h5>
                            <p>japanisches Curry</p>
                        </div>
                        <div className="div-container">
                            <h5>✨ Fun Fact:</h5>
                            <p>Ich bin eine Tetrachromatin</p>
                        </div>

                        <div className="div-container">
                            <h5>👏 Proud of:</h5>
                            <p>insert</p>
                        </div>

                        <div className="div-container">
                            <h5>👍 Ich lieb auf Mørent:</h5>
                            <p>insert</p>
                        </div>

                        <div className="div-container">
                            <h5>🚗 Fav VehicleCard:</h5>
                            <p>insert</p>
                        </div>

                        <div className="div-container">
                            <h5>👩‍💻 Rollen im Team:</h5>
                            <div className="roles-container">
                                <div className="roles">
                                    <p>Frontend-Developer</p>
                                </div>
                                <div className="roles">
                                    <p>Merge-Master</p>
                                </div>
                                <div className="roles">
                                    <p>Glücksbringer</p>
                                </div>
                                <div className="roles">
                                    <p>Review-Star-Creator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="entry-card nina"
                    initial={{ opacity: 0, y: -60, x: 60, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    transition={{ delay: 1 * 2, duration: 0.5 }}
                    whileHover={{
                        backgroundColor: "rgb(69, 221, 180,0.3)",
                        scale: 1.05,
                    }}
                >
                    <img
                        src={ninaImg}
                        alt="Nina"
                        className="entry-img"
                    />
                    <div className="entry-info">
                        <h2>Nina</h2>
                        <div className="div-container">
                            <h5>⭐️ Sternzeichen:</h5>
                            <p>Fische</p>
                        </div>

                        <div className="div-container">
                            <h5>👟 Schuhgröße:</h5>
                            <p>39/40</p>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Codeflowsong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=wGapgpOAgjo"
                                target="_blank"
                            >
                                VIC MENSA - Down on my luck
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🎵 Happysong:</h5>
                            <a
                                href="https://www.youtube.com/watch?v=44F34jc7wGI"
                                target="_blank"
                            >
                                Stevie Wonder - Master Blaster (Jammin')
                            </a>
                        </div>

                        <div className="div-container">
                            <h5>🍽 Lieblingsessen:</h5>
                            <p>Strammer Max</p>
                        </div>
                        <div className="div-container">
                            <h5>✨ Fun Fact:</h5>
                            <p>HipHop-Weltmeister 2009</p>
                        </div>

                        <div className="div-container">
                            <h5>👏 Proud of:</h5>
                            <p>Miro-TeamOrga, DB-Architecture </p>
                        </div>

                        <div className="div-container">
                            <h5>👍 Ich lieb auf Mørent:</h5>
                            <p>møre Fun, Pedro, Konfettiii, HorstPower</p>
                        </div>

                        <div className="div-container">
                            <h5>🚗 Fav VehicleCard:</h5>
                            <p>all the møre Fun Cars</p>
                        </div>

                        <div className="div-container">
                            <h5>👩‍💻 Rollen im Team:</h5>
                            <div className="roles-container">
                                <div className="roles">
                                    <p>Backend-Developer</p>
                                </div>
                                <div className="roles">
                                    <p>OrgaQueen</p>
                                </div>
                                <div className="roles">
                                    <p>Miro-Hackerin</p>
                                </div>
                                <div className="roles">
                                    <p>Motivationsrednerin</p>
                                </div>
                                <div className="roles">
                                    <p>CSV-Streichler</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
