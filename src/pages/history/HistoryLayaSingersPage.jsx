import '../Page.css'
import './History.css'

export default function HistoryLayaSingersPage() {
  return (
    <div className="history-section">
      <h2 className="history-section__title">Laya-minded vocalists</h2>
      <p className="history-section__lead">
        Singers who make tala, korvai logic, and rhythmic architecture as audible as raga and
        lyrics—useful models for mridangam students who want to phrase <em>with</em> the voice.
      </p>

      <div className="prose prose--history">
        <p>
          Carnatic vocalism is often discussed in terms of raga, bhava, and sahitya, but many
          leading artists also carry a percussionist’s sense of <strong>laya</strong>: where each
          phrase sits against the <em>eduppu</em>, how swaras group into korvai-like arcs, and when
          to leave space for the mridangam to answer. Listening to such singers is excellent training
          for accompanists and soloists alike—you hear the shared grid the whole kutcheri is built
          on.
        </p>
        <p>
          Contemporary artists often cited for especially strong rhythmic imagination include{' '}
          <strong>Abhishek Raghuram</strong>, whose kalpana swaras and niraval work are known for
          density and clarity without losing gaita; <strong>Bharat Sundar</strong>, who brings a
          similarly architectural sense of pace and accent to modern concert platforms; and{' '}
          <strong>Kunnakudi Balamuralikrishna</strong>, whose singing reflects deep engagement with
          tala and phrase boundaries in the lineage of serious concert training. These are
          examples, not a ranking—many other vocalists could sit on the same list depending on the
          era and the rasika you ask.
        </p>
        <p>
          Earlier generations often point to <strong>Dr. M. Balamuralikrishna</strong> as a
          paradigm of rhythmically daring vocalism—whether in chauka-style expansions, spare
          phrasing that exposes the tala, or collaborations that treated percussion as a true
          co-voice. Studying such records alongside mridangam lessons helps connect what you practise
          on the drum to what the main artist is trying to sculpt in real time.
        </p>
        <p>
          If you maintain this site as a living document, you can rotate in short listening notes
          (specific kriti recordings, festival clips, or classroom examples) for each name—always
          with credit to artists and rights holders.
        </p>
      </div>
    </div>
  )
}
