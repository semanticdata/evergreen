/* eslint-disable react/prop-types */
import "./LightBulb.scss"

// Pixel-art light bulb drawn on an 11x16 grid.
// o = glass outline, g = glass, f = filament, b = metal base, . = empty
const BULB_PIXELS = [
  "...ooooo...",
  "..ogggggo..",
  ".ogggggggo.",
  "ogggggggggo",
  "ogggggggggo",
  "ogggfgfgggo",
  "ogggfgfgggo",
  "oggggfggggo",
  "ogggggggggo",
  ".ogggggggo.",
  "..ogggggo..",
  "...ooooo...",
  "...bbbbb...",
  "...b.b.b...",
  "...bbbbb...",
  "....bbb....",
]

const PIXEL_CLASS = {".": "e", "o": "o", "g": "g", "f": "f", "b": "b"}

const BulbLayer = ({variant}) => (
  <div className={`bulb bulb-${variant}`} aria-hidden="true">
    {BULB_PIXELS.flatMap((row, y) =>
      [...row].map((char, x) => (
        <span key={`${y}-${x}`} className={`px px-${PIXEL_CLASS[char]}`} />
      )),
    )}
  </div>
)

const LightBulb = () => (
  <figure className="LightBulb">
    <div
      className="LightBulbStage"
      role="img"
      aria-label="A pixel light bulb flickers as it tries to turn on, then fails and stays dark."
    >
      <BulbLayer variant="off" />
      <BulbLayer variant="on" />
    </div>
    <figcaption className="LightBulbCaption">
      This one shorted out&hellip; the note isn&rsquo;t here.
    </figcaption>
  </figure>
)

export default LightBulb
