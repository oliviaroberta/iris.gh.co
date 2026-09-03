import Button from '../../components/common/Button';
import SectionHeading from '../../components/common/SectionHeading';
import storyImage from '../../assets/images/story/iris-story-workshop.png';

export default function StoryPreview() { return <section className="home-story-preview"><div className="home-story-preview__grid"><img className="home-story-preview__image" src={storyImage} alt="IRIS denim craftsmanship at a sewing workshop" /><div className="home-story-preview__copy"><SectionHeading eyebrow="Our Story" title="More than denim. A culture, a statement." /><div className="home-story-preview__body"><p>IRIS creates thoughtful wardrobe pieces that hold heritage and modern life in the same frame. We blend contemporary silhouettes with African textile details, not as decoration, but as intention.</p><p>For the woman who knows who she is. Confident. Expressive. Unapologetically rooted.</p></div><Button to="/our-story">Learn More About Us</Button></div></div></section>; }
 