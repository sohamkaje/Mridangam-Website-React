import { buildTalamLayout } from '../lib/korvaiTalam'

export default function KorvaiTalamGrid({ segments, matrasPerCycle, beatsPerCycle, title }) {
  const layout = buildTalamLayout(segments, matrasPerCycle, beatsPerCycle)

  if (!segments?.length) return null

  return (
    <div className="korvai-talam">
      {title && <h4 className="korvai-talam__title">{title}</h4>}
      <p className="korvai-talam__line">
        <strong>Counts:</strong> {layout.numberLine}
      </p>
      {layout.avartanams.length > 0 && (
        <div className="korvai-talam__grid-wrap">
          {layout.avartanams.map((av) => (
            <div key={av.index} className="korvai-talam__avartanam">
              {layout.avartanams.length > 1 && (
                <p className="korvai-talam__av-label">Avartanam {av.index}</p>
              )}
              <table className="korvai-talam__table">
                <thead>
                  <tr>
                    <th scope="col" className="korvai-talam__corner">
                      Beat
                    </th>
                    {av.beats.map((b) => (
                      <th key={b.beat} scope="col">
                        {b.beat}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="korvai-talam__row-label">
                      {layout.matrasPerBeat}/beat
                    </th>
                    {av.beats.map((b) => (
                      <td
                        key={b.beat}
                        className={
                          b.labels.some((l) => l.type === 'kaarvai')
                            ? 'korvai-talam__cell korvai-talam__cell--kaarvai'
                            : 'korvai-talam__cell korvai-talam__cell--pattern'
                        }
                      >
                        {b.labels.length > 0 ? b.labels.map((l) => l.text).join(', ') : '·'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <p className="korvai-talam__hint">
            Samam on beat 1. Each cell shows matra count where a block starts ({layout.matrasPerBeat}{' '}
            matras per beat).
          </p>
        </div>
      )}
    </div>
  )
}
