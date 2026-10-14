import Container from '../../components/common/Container';
import SectionHeading from '../../components/common/SectionHeading';
import { denimSizeChart, lengthOptions, measurementInstructions } from '../../data/sizing';
import './size-guide.css';

export default function SizeGuidePage() {
  return (
    <div className="size-guide">
      <Container>
        <section className="size-guide__intro">
          <SectionHeading
            eyebrow="Size Guide"
            title="Find Your IRIS Fit"
            description="Denim should fit you - not the other way around. Use your measurements to find your IRIS size, then choose the length that works for you."
          />
        </section>

        <section className="size-guide__section" aria-labelledby="denim-size-guide-title">
          <div className="size-guide__section-heading">
            <h2 id="denim-size-guide-title">IRIS Denim Size Guide</h2>
          </div>
          <div className="size-guide__table-wrap" tabIndex="0" aria-label="IRIS denim size chart. Scroll horizontally on smaller screens.">
            <table className="size-guide__table">
              <thead><tr><th scope="col">IRIS Size</th><th scope="col">UK Size</th><th scope="col">Waist</th><th scope="col">Hips</th></tr></thead>
              <tbody>{denimSizeChart.map((size) => <tr key={size.irisSize}><td>{size.irisSize}</td><td>{size.ukSize}</td><td>{size.waist}</td><td>{size.hips}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section className="size-guide__section" aria-labelledby="length-title">
          <div className="size-guide__section-heading">
            <h2 id="length-title">Choose Your Length</h2>
            <p>Use your height as a quick guide, or measure your inseam for the most accurate fit.</p>
          </div>
          <div className="size-guide__lengths">
            {lengthOptions.map((option) => <article className="size-guide__length" key={option.name}><h3>{option.name}</h3><p>{option.height}</p><p>Approx. inseam: {option.inseam}</p></article>)}
          </div>
        </section>

        <section className="size-guide__section" aria-labelledby="measure-title">
          <div className="size-guide__section-heading"><h2 id="measure-title">How to Measure</h2></div>
          <div className="size-guide__measure-grid">
            <div className="size-guide__illustration" aria-label="Reserved space for a future IRIS body measurement illustration"><span>Measurement illustration</span></div>
            <div className="size-guide__instructions">
              {measurementInstructions.map((instruction) => <article className="size-guide__instruction" key={instruction.number}><span className="size-guide__instruction-number">{instruction.number}</span><div><h3>{instruction.title}</h3><p>{instruction.copy}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="size-guide__section" aria-labelledby="between-sizes-title">
          <div className="size-guide__between"><h2 id="between-sizes-title">Between Sizes?</h2><p>For structured denim, choose your size primarily from your hip measurement. If your waist and hips fall into different sizes, choose the size that best accommodates your hips.</p></div>
        </section>

        <section className="size-guide__section" aria-labelledby="fit-title">
          <div className="size-guide__fit">
            <div className="size-guide__fit-copy"><h2 id="fit-title">Find My IRIS Fit</h2><p>Compare your measurements with the tables above to identify your size and preferred length.</p></div>
            <div className="size-guide__fit-example"><dl><dt>Waist</dt><dd>29&quot;</dd><dt>Hips</dt><dd>39&quot;</dd><dt>Height</dt><dd>5'6&quot;</dd></dl><p>Suggested IRIS fit</p><strong>M / UK 10 - Regular</strong></div>
          </div>
        </section>
      </Container>
    </div>
  );
}
