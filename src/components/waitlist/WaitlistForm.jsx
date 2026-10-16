import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitWaitlistEntry } from '../../services/waitlist';

const questions = [
  { name: 'style', legend: 'Which IRIS style caught your eye?', options: ['Ohemaa — Kente Hem', 'Agyeiwaa — African Print Pocket & Side Insert', 'I love both', "I'd like to see more styles"] },
  { name: 'excitement', legend: 'What would make you most excited to own an IRIS piece?', options: ['The unique African-inspired details', 'The fit & silhouette', 'The versatility — dressing it up or down', 'The quality & finishing', 'The fact that it feels different from regular denim'] },
  { name: 'priority', legend: 'When you shop for denim, what matters most to you?', options: ['Fit', 'Comfort', 'Quality', 'Design/details', 'Price'] },
  { name: 'size', legend: 'What size would you usually wear in jeans?', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Other'], compact: true },
  { name: 'likelihood', legend: 'If your favourite IRIS style becomes available, how likely are you to purchase?', options: ['Definitely — tell me when it drops 👀', 'Very likely', "I'm interested but want to see the price first", "I'm just exploring for now"] },
];

function ChoiceGroup({ question, value, onChange }) {
  return (
    <fieldset className={`waitlist-question ${question.compact ? 'waitlist-question--compact' : ''}`}>
      <legend>{question.legend} <span aria-label="required">*</span></legend>
      <div className="waitlist-options">
        {question.options.map((option) => (
          <label key={option}>
            <input type="radio" name={question.name} value={option} checked={value === option} onChange={onChange} required />
            <span className="waitlist-radio" aria-hidden="true" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function WaitlistForm({ onSuccess }) {
  const formRef = useRef(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ fullName: '', email: '', whatsapp: '', style: '', excitement: '', priority: '', size: '', customSize: '', likelihood: '', consent: false });
  const [status, setStatus] = useState({ loading: false, error: '' });
  const totalSteps = 4;
  const update = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.type === 'checkbox' ? target.checked : target.value }));
    setStatus((current) => ({ ...current, error: '' }));
  };

  const validateStep = () => {
    const panel = formRef.current?.querySelector(`[data-step="${step}"]`);
    const invalid = panel?.querySelector('input:invalid');
    if (invalid) {
      invalid.reportValidity();
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.loading || !validateStep()) return;
    setStatus({ loading: true, error: '' });
    try {
      await submitWaitlistEntry({ ...form, customSize: form.size === 'Other' ? form.customSize : '' });
      onSuccess();
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  return (
    <div className="waitlist-card">
      <header className="waitlist-card__header">
        <p className="waitlist-kicker">Get to Know Your IRIS</p>
        <h2>Welcome to IRIS, doll. 🤎</h2>
        <p>Before we bring our first pieces to life, we want to know you — your style, your preferences and the pieces you can't wait to wear.</p>
      </header>
      <div className="waitlist-progress" aria-label={`Step ${step + 1} of ${totalSteps}`}>
        <span>Step {step + 1} of {totalSteps}</span>
        <div><i style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
      </div>
      <form ref={formRef} className="waitlist-form" onSubmit={handleSubmit} noValidate>
        <div className="waitlist-step" data-step={step} key={step}>
          {step === 0 && (
            <fieldset className="waitlist-question waitlist-details">
              <legend>Your details</legend>
              <label>Full name <span>*</span><input name="fullName" value={form.fullName} onChange={update} autoComplete="name" placeholder="Your name" required /></label>
              <label>Email address <span>*</span><input name="email" value={form.email} onChange={update} type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>WhatsApp number <small>(optional)</small><input name="whatsapp" value={form.whatsapp} onChange={update} type="tel" autoComplete="tel" inputMode="tel" placeholder="+233 00 000 0000" /></label>
            </fieldset>
          )}
          {step === 1 && (
            <div className="waitlist-question-pair">
              {questions.slice(0, 2).map((question, index) => <div key={question.name}><p className="waitlist-question-number">Question {index + 1}</p><ChoiceGroup question={question} value={form[question.name]} onChange={update} /></div>)}
            </div>
          )}
          {step === 2 && (
            <div className="waitlist-question-pair">
              {questions.slice(2, 4).map((question, index) => <div key={question.name}><p className="waitlist-question-number">Question {index + 3}</p><ChoiceGroup question={question} value={form[question.name]} onChange={update} />{question.name === 'size' && form.size === 'Other' && <label className="waitlist-custom-size">Please specify your size<input name="customSize" value={form.customSize} onChange={update} required /></label>}</div>)}
            </div>
          )}
          {step === 3 && (
            <div className="waitlist-question-pair">
              <div><p className="waitlist-question-number">Question 5</p><ChoiceGroup question={questions[4]} value={form.likelihood} onChange={update} /></div>
              <div className="waitlist-final-step">
              <h3>Thank you for sharing your style with us.</h3>
              <p>One last thing before we add you to the IRIS waitlist.</p>
              <div className="waitlist-consent">
                <label><input name="consent" type="checkbox" checked={form.consent} onChange={update} required /><span className="waitlist-checkbox" aria-hidden="true" /><span>I agree to receive updates about IRIS collections, launches and early access. <b>*</b></span></label>
                <p>Your information will be used to manage the waitlist, understand customer preferences and send launch updates. <Link className="waitlist-policy" to="/privacy-policy">Privacy Policy</Link>.</p>
              </div>
              </div>
            </div>
          )}
        </div>
        {status.error && <p className="waitlist-error" role="alert">{status.error}</p>}
        <div className="waitlist-form__actions">
          {step > 0 && <button className="waitlist-back" type="button" onClick={() => setStep((current) => current - 1)} disabled={status.loading}>Back</button>}
          {step < totalSteps - 1
            ? <button className="waitlist-next" type="button" onClick={next}>Next <span aria-hidden="true">→</span></button>
            : <button className="waitlist-submit" type="submit" disabled={status.loading}>{status.loading ? 'Joining the waitlist…' : 'Join the IRIS waitlist'}</button>}
        </div>
      </form>
    </div>
  );
}
