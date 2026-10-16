import { Link } from 'react-router-dom';
import irisLogo from '../../assets/images/branding/iris-logo-primary.png';
import './PrivacyPolicyPage.css';

const sections = [
  {
    title: '1. Introduction',
    paragraphs: [
      'Welcome to IRIS (“IRIS”, “we”, “our” or “us”).',
      'IRIS is a fashion brand offering contemporary denim with African-inspired designs that celebrate culture through modern fashion.',
      'We respect your privacy and are committed to protecting your personal information when you visit our website, browse our collections, join our waitlist, contact us, subscribe to our communications or purchase our products.',
      'This Privacy Policy explains how we collect, use, store, disclose and protect your personal information in accordance with applicable data protection laws, including Ghana’s Data Protection Act, 2012 (Act 843), where applicable.',
      'By using our website, you acknowledge that you have read this Privacy Policy. Where consent is legally required, we will request it separately.',
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: ['Depending on how you interact with IRIS, we may collect the following categories of information:'],
    groups: [
      ['Personal identification information', ['Your name and surname.', 'Email address and telephone number.', 'Delivery and billing addresses, where applicable.']],
      ['Order and transaction information', ['When you purchase our products, we may collect order details, items purchased, order history, delivery preferences, transaction references and payment status.', 'Payment card details or other sensitive payment credentials should be handled by our payment service provider where applicable. We do not intentionally store full payment card details on our website.']],
      ['Waitlist and marketing information', ['If you join our waitlist or subscribe to our updates, we may collect your name, email address, telephone number and stated product preferences, depending on the information requested.']],
      ['Communications', ['When you contact us through our website, email, telephone or social media, we may retain the information you provide to respond to your enquiry and improve our customer service.']],
      ['Website usage information', ['Our website or service providers may collect technical information such as your IP address, browser type, device information, pages visited and interactions with our website, subject to the technologies we use and applicable consent requirements.', 'We aim to collect only information that is reasonably necessary for the relevant purpose.']],
    ],
  },
  {
    title: '3. How We Use Your Information',
    paragraphs: ['We may use your personal information to:'],
    items: ['Process and fulfil orders, payments, deliveries, returns and exchanges.', 'Manage our waitlist and notify you about new collections, product launches and restocks.', 'Respond to enquiries, complaints and customer service requests.', 'Send promotional messages where we have the required consent or other lawful basis.', 'Improve our website, products, customer experience and marketing activities.', 'Detect, investigate and prevent fraud, misuse and security incidents.', 'Maintain appropriate business, tax, accounting and transaction records.', 'Comply with applicable legal and regulatory obligations.'],
    after: ['We will not use your information for a materially different purpose without providing the required information and obtaining consent where the law requires it.'],
  },
  {
    title: '4. Lawful Basis for Processing',
    paragraphs: ['We process personal information only where an appropriate lawful basis applies. Depending on the circumstances, this may include:'],
    items: ['Contractual necessity: To process and deliver an order you place with us.', 'Consent: For activities such as optional marketing communications or non-essential cookies where consent is required.', 'Legal obligations: To maintain records or comply with applicable laws.', 'Legitimate interests, where legally available: To secure our website, prevent fraud and improve our services, provided those interests do not override your applicable rights.'],
    after: ['Where processing relies on consent, you may withdraw your consent at any time. Withdrawal does not affect processing lawfully carried out before withdrawal.'],
  },
  {
    title: '5. Sharing Your Information',
    paragraphs: ['IRIS does not sell your personal information to third parties.', 'We may share relevant information with trusted service providers where necessary to operate our business, including:'],
    items: ['Payment processors to facilitate transactions.', 'Courier and delivery companies to fulfil orders.', 'Website hosting and technical service providers.', 'Email, messaging and marketing service providers.', 'Professional advisers, auditors and relevant authorities where required by law.'],
    after: ['These parties should receive only the information necessary to perform their services and should be subject to appropriate confidentiality and data protection obligations.', 'We may also disclose information where legally required or necessary to protect our legal rights, customers or business.'],
  },
  {
    title: '6. International Data Transfers',
    paragraphs: ['Some of our website hosting, payment, analytics or communication providers may process information outside Ghana.', 'Where personal information is transferred internationally, we will take appropriate steps to ensure that the transfer and subsequent processing comply with applicable data protection requirements and provide appropriate safeguards.'],
  },
  {
    title: '7. Cookies and Similar Technologies',
    paragraphs: ['Our website may use cookies or similar technologies to support website functionality, remember preferences, understand website traffic and improve the shopping experience.', 'Where applicable, we will provide appropriate information and obtain consent before using non-essential cookies or similar technologies.', 'You may be able to manage cookies through your browser settings or our cookie preference controls. Disabling certain cookies may affect some website functions.', 'If IRIS does not use analytics, advertising or other tracking technologies, this section should be adjusted to reflect the actual website configuration.'],
  },
  {
    title: '8. Data Retention',
    paragraphs: ['We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including order fulfilment, customer support, legal compliance, dispute resolution and legitimate business recordkeeping.', 'For example, waitlist information may be deleted when it is no longer needed for the relevant launch or marketing purpose, while transaction records may need to be retained for applicable statutory periods.', 'When information is no longer required, we will take reasonable steps to delete it securely or anonymise it, subject to legal retention obligations.'],
  },
  {
    title: '9. How We Protect Your Information',
    paragraphs: ['We implement reasonable technical and organisational safeguards designed to protect personal information against unauthorised access, disclosure, alteration, loss or destruction.', 'Depending on our systems and operations, these measures may include access controls, secure hosting, restricted staff access, appropriate authentication and secure handling of customer information.', 'However, no website, electronic transmission or storage system can be guaranteed to be completely secure.', 'If a personal data breach occurs, we will take appropriate steps to investigate, mitigate the impact and notify the relevant parties or authorities where required by law.'],
  },
  {
    title: '10. Your Privacy Rights',
    paragraphs: ['Subject to applicable law, you may have the right to:'],
    items: ['Request access to personal information we hold about you.', 'Request correction of inaccurate or incomplete information.', 'Request deletion of information where legally applicable.', 'Withdraw consent for processing that relies on your consent.', 'Object to certain processing or request restrictions where applicable.', 'Opt out of promotional communications at any time.', 'Lodge a complaint with the relevant data protection authority.'],
    after: ['To exercise your rights, contact us using the details provided in Section 13. We may need to verify your identity before processing certain requests.', "Under Ghana's Data Protection Act, 2012 (Act 843), individuals have rights relating to access to and correction of their personal information, subject to the Act's provisions."],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: ['Our website and products are intended for a general fashion audience. We do not knowingly collect personal information from children in circumstances where doing so would be unlawful.', 'If you believe that a child has provided personal information to us unlawfully, please contact us so that we can review the matter and take appropriate action.'],
  },
  {
    title: '12. Third-Party Websites',
    paragraphs: ['Our website may contain links to third-party websites or services, including social media platforms and payment providers.', 'These third parties operate under their own privacy policies and practices. IRIS is not responsible for the privacy practices of independent third-party websites, and we encourage you to review their policies before providing personal information.'],
  },
  {
    title: '14. Changes to This Privacy Policy',
    paragraphs: ['We may update this Privacy Policy when our business practices, website features or applicable legal requirements change.', 'The revised version will be published on our website with an updated “Last Updated” date. Where legally required, we will provide additional notice or obtain fresh consent before implementing changes that require it.', 'We encourage visitors and customers to review this page periodically.'],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <Link to="/" aria-label="Return to IRIS"><img src={irisLogo} alt="IRIS" /></Link>
        <Link className="privacy-back" to="/">Back to IRIS</Link>
      </header>
      <main className="privacy-content">
        <p className="privacy-eyebrow">IRIS — Rooted in Culture</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-date">Effective Date: 16 October 2026<br />Last Updated: 16 October 2026</p>
        {sections.slice(0, 12).map((section) => <PolicySection key={section.title} section={section} />)}
        <section>
          <h2>13. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, wish to exercise your privacy rights or have a concern about how your personal information is handled, please contact us:</p>
          <address>
            <strong>Brand:</strong> IRIS<br />
            <strong>Website:</strong> <a href="https://iris-gh-co.vercel.app/">iris-gh-co.vercel.app</a><br />
            <strong>Email:</strong> <a href="mailto:weariris@outlook.com">weariris@outlook.com</a><br />
            <strong>Country of operation:</strong> Ghana
          </address>
          <p>For concerns regarding data protection compliance in Ghana, you may also contact the Ghana Data Protection Commission through its official website: <a href="https://dpc.gov.gh/" target="_blank" rel="noreferrer">dpc.gov.gh</a>.</p>
        </section>
        <PolicySection section={sections[12]} />
        <p className="privacy-signoff">IRIS — Rooted in Culture.</p>
      </main>
    </div>
  );
}

function PolicySection({ section }) {
  return (
    <section>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.groups?.map(([title, paragraphs], index) => (
        <div className="privacy-group" key={title}>
          <h3>{String.fromCharCode(97 + index)}. {title}</h3>
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      ))}
      {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
      {section.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
  );
}
