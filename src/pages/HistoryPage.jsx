import './Page.css'

const mridangamKalanidhi = [
  { year: 2021, name: 'Thiruvarur Bakthavathsalam', note: 'Mridangam' },
  { year: 2014, name: 'T. V. Gopalakrishnan', note: 'Vocalist / mridangam (multi-faceted career)' },
  { year: 2011, name: 'Trichy Sankaran', note: 'Mridangam' },
  { year: 2007, name: 'Palghat R. Raghu', note: 'Mridangam' },
  { year: 2004, name: 'Vellore G. Ramabhadran', note: 'Mridangam' },
  { year: 2001, name: 'Umayalpuram K. Sivaraman', note: 'Mridangam' },
  { year: 1994, name: 'T. K. Murthy', note: 'Mridangam' },
  { year: 1966, name: 'Palghat Mani Iyer', note: 'Mridangam' },
]

export default function HistoryPage() {
  return (
    <div className="page page--wide">
      <header className="page-header">
        <h1 className="page-header__title">History & masters</h1>
        <p className="page-header__intro">
          A short map of the mridangam in Carnatic music—great lineages, common kinds of construction
          (kuchi and kappi right heads, straps vs. bolts, synthetics), how honours like Sangita
          Kalanidhi fit in, and where this site is coming from musically.
        </p>
      </header>

      <div className="prose prose--history">
        <h2 className="prose__h2">Lineages and “great masters”</h2>
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

        <h2 className="prose__h2">Kinds of mridangams: kuchi, kappi, straps, bolts, and synthetics</h2>
        <p>
          Beyond “which guru style you play,” the physical instrument varies a lot. Terminology
          shifts between makers and regions, but a few distinctions are useful when you shop, travel,
          or talk to a <em>mirudanga maker</em> about a new pudi (head).
        </p>
        <p>
          <strong>Kuchi and kappi (right-head / valanthal types).</strong> These words describe how
          the playable right membrane is layered and voiced—not two unrelated drum families, but
          different recipes for the same side of the shell. In a <strong>kuchi</strong> mridangam,
          thin wooden splints or reeds are often worked under the outer skin at the points where
          tension from the straps meets the head; that tends to brighten articulation and sustain.
          In a <strong>kappi</strong> build, dense black <em>soru</em> (traditionally a mineral-and-starch
          paste) is built up between the wood and the inner skin layers instead of splints, which
          many players associate with a weightier, more compact “chapu” colour and a slightly
          different feel under the fingers. Artists choose one or the other—or change over
          time—based on taste, concert pitch, and what their maker recommends for a given shell.
        </p>
        <p>
          <strong>Strap-tied vs. nut-and-bolt hardware.</strong> Classic concert mridangams are held
          together with leather <em>thol</em> (straps) woven around the body; tension and fine
          tuning are managed by sliding the straps and by the maker when a head is seated or
          replaced. <strong>Nut-and-bolt</strong> (sometimes called <em>aram</em> / screw-type)
          instruments use metal rings and threaded hardware to pull the heads onto the shell.
          Bolts make day-to-day pitch tweaks and travel much easier, which is why they are common
          for learners and flight cases; many advanced players still keep a traditional strap drum
          for certain halls or recordings, while using hardware drums for teaching or tours. The
          “right” choice is practical as much as tonal.
        </p>
        <p>
          <strong>Swapping heads and “latching.”</strong> On a strap drum you do not usually pop
          the valanthal off like a snare drum for a different gig the same evening: the whole head
          assembly is a craft object tied to that shell until a maker rebuilds it. What <em>is</em>{' '}
          modular is the lifecycle of the instrument: the same wooden shell can receive new thoppi
          and valanthal assemblies over decades. Some modern hardware kits experiment with quicker
          head changes or hybrid rings; they sit alongside the mainstream model where the artist
          works with one or two trusted makers for periodic re-skinning and voice matching.
        </p>
        <p>
          <strong>Synthetic shells and membranes.</strong> Jackfruit wood (<em>panasa kaya</em>)
          remains the reference for professional Carnatic tone, but shells moulded from fibreglass
          or other composites are sold widely—especially where humidity swings crack wood or where
          students need a lighter drum. Synthetic or partially synthetic <em>drum heads</em> also
          exist (for practice, outdoor gigs, or reduced maintenance). Opinions differ sharply on
          how close they come to traditional skin on wood in a sabha; most senior artists still
          perform on natural membranes for kutcheri work, while accepting synthetics where logistics
          demand it. If you are buying, try to play the exact drum before committing, and ask your
          guru what matches the sound concept you are training for.
        </p>

        <h2 className="prose__h2">This site and my training</h2>
        <p>
          I come from the <strong>Karaikudi Mani school of mridangam</strong> and have learned from{' '}
          <strong>Vidwan A. V. Manikantan</strong>. That lineage informs how I think about lessons
          and rhythm on this site—especially clarity of phrasing, korvai structure, and respecting
          the concert tradition even when we experiment with new tools (such as the planned Korvai
          AI section).
        </p>

        <h2 className="prose__h2">Sangita Kalanidhi and mridangam today</h2>
        <p>
          <strong>Sangita Kalanidhi</strong> (also spelled Sangeetha Kalanidhi) is the highest
          honour the <strong>Madras Music Academy</strong> confers each December season on one senior
          Carnatic musician. The choice rotates across vocalists, violinists, percussionists, and
          other disciplines—so many of the artists you hear every week in Chennai or abroad may never
          hold that specific title, while still being indispensable to the art form.
        </p>
        <p>
          Because the award is annual and discipline rotates, the list below is <em>not</em> a
          ranking of “greatest” players; it is simply the sequence in which the Academy has named{' '}
          <strong>mridangam-led</strong> (or clearly mridangam-inclusive) honourees in its published
          tables. For the authoritative, up-to-date list—including vocalists, violinists, and the
          current year’s name—see the Academy’s own page.
        </p>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <caption className="data-table__caption">
            Sangita Kalanidhi: honourees listed as mridangam (or mridangam-inclusive) in Music
            Academy tables (newest first)
          </caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Recipient</th>
              <th scope="col">Field (as listed)</th>
            </tr>
          </thead>
          <tbody>
            {mridangamKalanidhi.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{row.name}</td>
                <td>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="prose prose--history prose--footnote">
        <small>
          Years and names follow the{' '}
          <a href="https://en.wikipedia.org/wiki/Sangita_Kalanidhi" target="_blank" rel="noreferrer">
            recipient table
          </a>{' '}
          summarised from the Music Academy’s Sangita Kalanidhi sequence; the Academy’s official list
          at{' '}
          <a href="https://musicacademymadras.in/awards/sangita-kalanidhi/" target="_blank" rel="noreferrer">
            musicacademymadras.in
          </a>{' '}
          is the final word when you need the latest honouree (including non-mridangam artists in
          other years).
        </small>
      </p>

      <div className="prose prose--history">
        <h2 className="prose__h2">Who is “relevant” right now?</h2>
        <p>
          “Relevance” on the concert stage is wider than any single prize: it includes senior
          vidwans who tour and teach, middle-generation artists who shape today’s sound, and young
          players redefining ensemble work. A few Sangita Kalanidhi names from recent seasons—such
          as vocalist or violin awardees—reflect what the Academy chose to spotlight that year,
          not the whole field of working mridangam artists.
        </p>
        <p>
          For mridangam specifically, the most recent honouree in the table above is{' '}
          <strong>Thiruvarur Bakthavathsalam</strong> (2021). Many other leading mridangists continue
          to anchor kutcheris, teach internationally, and record; following sabha listings, festival
          brochures, and trusted teachers is still the best way to map who is active in your city
          or tradition.
        </p>
      </div>
    </div>
  )
}
