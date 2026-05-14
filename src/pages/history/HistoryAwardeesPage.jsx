import { mridangamKalanidhi } from '../../data/mridangamKalanidhi'
import '../Page.css'
import './History.css'

export default function HistoryAwardeesPage() {
  return (
    <div className="history-section">
      <h2 className="history-section__title">Sangita Kalanidhi awardees (mridangam)</h2>
      <p className="history-section__lead">
        The Music Academy’s highest title, and the subset of honourees whose citation centres on
        mridangam (or clearly includes it)—plus how to read “relevance” beyond any single list.
      </p>

      <div className="prose prose--history">
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
        <h3 className="prose__h3">Who is “relevant” right now?</h3>
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
