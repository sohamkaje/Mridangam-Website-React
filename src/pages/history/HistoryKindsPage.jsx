import '../Page.css'
import './History.css'

export default function HistoryKindsPage() {
  return (
    <div className="history-section">
      <h2 className="history-section__title">Kinds of mridangams</h2>
      <p className="history-section__lead">
        Kuchi and kappi right heads, strap vs. bolt hardware, how heads are replaced over time, and
        synthetic options—without pretending there is only one “correct” drum.
      </p>

      <div className="prose prose--history">
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
      </div>
    </div>
  )
}
