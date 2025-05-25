import { motion } from "framer-motion";
import "../styles/team_page.css"



export default function TeamPage() {
    return (
         <section className="team-book">
            <h1>🎉 Unser Team – Freundschaftsbuch 🎉</h1>
            <div className="entries">
                    <motion.div
                        className="entry-card"
                        initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                        transition={{ delay: 1 * 0.2, duration: 0.5 }}
                        whileHover={{backgroundColor: "#fffaf2", scale: 1.05}}
                    >
                        <img
                            src="https://fkpscorpio.de/fileadmin/_processed_/3/5/csm_snoop_dogg_news_9d3b016464.jpg"
                            alt="name"
                            className="entry-img"
                        />
                        <div className="entry-info">
                            <h2>Oguz</h2>
                            <p><strong>🎵 Lieblingslied:</strong> Bohemian Rhapsody – Queen</p>
                            <p><strong>🍽 Lieblingsessen:</strong> Pizza</p>
                            <p><strong>✨ Fun Fact:</strong> Kann rückwärts lesen</p>
                            <p><strong>👩‍💻 Rolle:</strong> Backend-Engineer</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="entry-card"
                        initial={{ opacity: 0, y: -60, x: 60, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0 ,x: 0, scale: 1}}
                        transition={{ delay: 2* 0.2, duration: 0.5 }}                        
                        whileHover={{backgroundColor: "#fffaf2", scale: 1.05}}
                    >
                        <img
                            src="https://fkpscorpio.de/fileadmin/_processed_/3/5/csm_snoop_dogg_news_9d3b016464.jpg"
                            alt="name"
                            className="entry-img"
                        />
                        <div className="entry-info">
                            <h2>Oguz</h2>
                            <p><strong>🎵 Lieblingslied:</strong> Bohemian Rhapsody – Queen</p>
                            <p><strong>🍽 Lieblingsessen:</strong> Pizza</p>
                            <p><strong>✨ Fun Fact:</strong> Kann rückwärts lesen</p>
                            <p><strong>👩‍💻 Rolle:</strong> Backend-Engineer</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="entry-card"
                        initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0 ,x: 0, scale: 1}}
                        transition={{ delay: 3* 0.2, duration: 0.5 }}
                        whileHover={{backgroundColor: "#fffaf2", scale: 1.05}}
                    >
                        <img
                            src="https://fkpscorpio.de/fileadmin/_processed_/3/5/csm_snoop_dogg_news_9d3b016464.jpg"
                            alt="name"
                            className="entry-img"
                        />
                        <div className="entry-info">
                            <h2>Oguz</h2>
                            <p><strong>🎵 Lieblingslied:</strong> Bohemian Rhapsody – Queen</p>
                            <p><strong>🍽 Lieblingsessen:</strong> Pizza</p>
                            <p><strong>✨ Fun Fact:</strong> Kann rückwärts lesen</p>
                            <p><strong>👩‍💻 Rolle:</strong> Backend-Engineer</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="entry-card"
                        initial={{ opacity: 0, y: -60, x: 60, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0 ,x: 0, scale: 1}}
                        transition={{ delay: 4* 0.2, duration: 0.5 }}
                        whileHover={{backgroundColor: "#fffaf2", scale: 1.05}}
                    >
                        <img
                            src="https://fkpscorpio.de/fileadmin/_processed_/3/5/csm_snoop_dogg_news_9d3b016464.jpg"
                            alt="name"
                            className="entry-img"
                        />
                        <div className="entry-info">
                            <h2>Oguz</h2>
                            <p><strong>🎵 Lieblingslied:</strong> Bohemian Rhapsody – Queen</p>
                            <p><strong>🍽 Lieblingsessen:</strong> Pizza</p>
                            <p><strong>✨ Fun Fact:</strong> Kann rückwärts lesen</p>
                            <p><strong>👩‍💻 Rolle:</strong> Backend-Engineer</p>
                        </div>
                    </motion.div>
            </div>
        </section>
    );
}
        
