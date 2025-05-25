import { motion } from "framer-motion";
import "../styles/team_page.css";

export default function TeamPage() {
  return (
    <section className="team-book">
      <h1>🎉 Unser Team – Freundschaftsbuch 🎉</h1>
      <div className="entries">
        <motion.div
          className="entry-card oguz"
          initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          transition={{ delay: 1 * 0.2, duration: 0.5 }}
          whileHover={{
            backgroundColor: "rgba(91, 157, 255, 0.3)",
            scale: 1.05,
          }}
        >
          <img
            src="https://fkpscorpio.de/fileadmin/_processed_/3/5/csm_snoop_dogg_news_9d3b016464.jpg"
            alt="name"
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
              <p>als Team eine professionelle Website erstellt zu haben</p>
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
          transition={{ delay: 2 * 0.2, duration: 0.5 }}
          whileHover={{
            backgroundColor: "rgb(246, 99, 155,0.3)",
            scale: 1.05,
          }}
        >
          <img
            src="https://i0.wp.com/dervinylist.com/wp-content/uploads/2018/07/pnk_06-csc3b8lve-sundsbc3b8_gross.jpg?fit=400%2C349&ssl=1"
            alt="name"
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
              <a href="#" target="_blank">
                artist -song
              </a>
            </div>

            <div className="div-container">
              <h5>🎵 Happysong:</h5>
              <a href="#" target="_blank">
                artist -song
              </a>
            </div>

            <div className="div-container">
              <h5>🍽 Lieblingsessen:</h5>
              <p>Phø</p>
            </div>
            <div className="div-container">
              <h5>✨ Fun Fact:</h5>
              <p>Kann rückwärts lesen</p>
            </div>

            <div className="div-container">
              <h5>👏 Proud of:</h5>
              <p>Insert </p>
            </div>

            <div className="div-container">
              <h5>👍 Ich lieb auf Mørent:</h5>
              <p>Insert</p>
            </div>

            <div className="div-container">
              <h5>🚗 Fav VehicleCard:</h5>
              <p>Insert</p>
            </div>

            <div className="div-container">
              <h5>👩‍💻 Rollen im Team:</h5>
              <div className="roles-container">
                <div className="roles">
                  <p>Front-Developer</p>
                </div>
                <div className="roles">
                  <p>Style-Guide</p>
                </div>
                <div className="roles">
                  <p>Maschine</p>
                </div>
                <div className="roles">
                  <p>Motivationsrednerin</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="entry-card mina"
          initial={{ opacity: 0, y: -60, x: -60, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          transition={{ delay: 3 * 0.2, duration: 0.5 }}
          whileHover={{
            backgroundColor: "rgb(246, 122, 85, 0.3)",
            scale: 1.05,
          }}
        >
          <img
            src="https://cdn.shopify.com/s/files/1/0397/4879/6567/files/Maud_Stevens_Wagner_1.jpg?v=1652354010"
            alt="name"
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
               
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="entry-card nina"
          initial={{ opacity: 0, y: -60, x: 60, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          transition={{ delay: 4 * 0.2, duration: 0.5 }}
          whileHover={{
            backgroundColor: "rgb(69, 221, 180,0.3)",
            scale: 1.05,
          }}
        >
          <img
            src="https://s.wsj.net/public/resources/images/ON-CO892_Cover__B1280_20180625110533.jpg"
            alt="name"
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
