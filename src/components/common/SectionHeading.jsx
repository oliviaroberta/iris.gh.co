export default function SectionHeading({ eyebrow, title, description, alignment = 'left' }) {
  return <div className={`section-heading section-heading--${alignment}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2>{title}</h2>
    {description && <p className="section-heading__description">{description}</p>}
  </div>;
}
