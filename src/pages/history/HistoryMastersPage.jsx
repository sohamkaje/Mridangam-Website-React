import '../Page.css'
import './History.css'

export default function HistoryMastersPage() {
  return (
    <div className="history-section">
      <h2 className="history-section__title">Masters & lineages</h2>
      <p className="history-section__lead">
        How the mridangam sits inside Carnatic kutcheri culture—and a note on this site’s own
        musical roots.
      </p>

      <div className="prose prose--history">
        <p>
          The mridangam has long been central to Carnatic concerts: it holds the tala, lifts the
          main artist, and carries its own solo language of korvais, moharas, and rhythmic dialogue.
          Over the last century, several teaching and playing lineages became reference points for
          students worldwide—often named after regions or gurus, while always overlapping in
          concert practice.
        </p>
        <p>
          Figures such as{' '}
          <strong>Thanjavur Vaidyanatha Iyer</strong> helped shape a widely studied fingering
          approach; <strong>Palghat Mani Iyer</strong> set a benchmark for concert mridangam in the
          twentieth century; <strong>Palani Subramania Pillai</strong> and{' '}
          <strong>Pudukkottai Dakshinamurthy Pillai</strong> represent the depth of the Pudukkottai
          tradition; and generations of artists after them—on stage and in the classroom—carried
          those ideas forward. Many senior vidwans today studied across more than one stream,
          blending what they heard from their own gurus with what the concert circuit demanded.
        </p>
        <p>
          <strong>Karaikudi R. Mani</strong> (widely known as <strong>Karaikudi Mani</strong>) was
          among the most influential percussionists and pedagogues of recent times: a prolific
          accompanist, composer, and explainer of rhythm who inspired a distinct “Karaikudi school”
          of thought and practice for many students globally.
        </p>

        <h3 className="prose__h3">This site and my training</h3>
        <p>
          I come from the <strong>Karaikudi Mani school of mridangam</strong> and have learned from{' '}
          <strong>Vidwan A. V. Manikantan</strong>. That lineage informs how I think about lessons
          and rhythm on this site—especially clarity of phrasing, korvai structure, and respecting
          the concert tradition even when we experiment with new tools (such as the planned Korvai
          AI section).
        </p>
      </div>
    </div>
  )
}
