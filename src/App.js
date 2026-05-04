import React, { useState } from 'react';

const NAVY = '#0D1B2A';
const GOLD = '#C9A84C';
const LIGHT_GOLD = '#F5EDD6';

const questions = [
  {
    id: 'q1',
    number: 1,
    section: 'Core Business Questions',
    label: 'What do you sell — and to whom?',
    hint: 'Product or service + your target buyer',
    placeholder: 'e.g. Sales coaching programs for VPs of Sales at B2B companies ($25M–$100M revenue)'
  },
  {
    id: 'q2',
    number: 2,
    section: null,
    label: 'What is the #1 problem your prospect has that you solve?',
    hint: null,
    placeholder: 'e.g. Their team isn\'t hitting quota and they don\'t know why — and traditional training hasn\'t fixed it'
  },
  {
    id: 'q3',
    number: 3,
    section: null,
    label: 'What do most people in your space get wrong about this problem?',
    hint: null,
    placeholder: 'e.g. They think more sales training is the answer — but training without a system is just motivation that wears off'
  },
  {
    id: 'q4',
    number: 4,
    section: null,
    label: 'What is your contrarian take, unique methodology, or proprietary framework?',
    hint: null,
    placeholder: 'e.g. The Sales Engine — a 9-step system that generates pipeline systematically instead of relying on individual heroics'
  },
  {
    id: 'q5',
    number: 5,
    section: null,
    label: 'What outcome does a prospect walk away with after working with you?',
    hint: null,
    placeholder: 'e.g. A fully operational revenue engine that generates qualified pipeline without adding headcount'
  },
  {
    id: 'q6',
    number: 6,
    section: null,
    label: 'What beliefs do you need to shift before they\'ll buy?',
    hint: 'List 2–3 beliefs that are blocking them right now',
    placeholder: 'e.g. 1. More salespeople = more revenue. 2. Training alone changes behavior. 3. Lead generation is marketing\'s job.'
  },
  {
    id: 'q7',
    number: 7,
    section: null,
    label: 'What have they already tried to fix this — and why did it fail?',
    hint: null,
    placeholder: 'e.g. Hired more reps (expensive, slow to ramp), bought CRM tools (unused), ran sales training (no implementation follow-through)'
  },
  {
    id: 'q8',
    number: 8,
    section: 'Webinar-Specific Questions',
    label: 'What is the offer you\'re making at the end — and what does it cost?',
    hint: null,
    placeholder: 'e.g. 12-week Sales Engine build program — $12,000'
  },
  {
    id: 'q9',
    number: 9,
    section: null,
    label: 'What is the ONE transformation you want someone to feel by minute 60?',
    hint: 'Write it as if they\'re thinking it',
    placeholder: 'e.g. "I finally understand why my team isn\'t growing — and I know exactly what to do about it."'
  },
  {
    id: 'q10',
    number: 10,
    section: null,
    label: 'What is the biggest objection right before they say yes?',
    hint: null,
    placeholder: 'e.g. "I\'ve tried coaching before and it didn\'t stick — how is this different?"'
  }
];

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f7f6f2',
    fontFamily: 'Georgia, serif'
  },
  header: {
    backgroundColor: NAVY,
    padding: '28px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  headerSite: {
    color: GOLD,
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '4px',
    fontFamily: 'Georgia, serif'
  },
  headerTitle: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
    fontFamily: 'Georgia, serif'
  },
  headerBar: {
    width: '4px',
    height: '48px',
    backgroundColor: GOLD,
    borderRadius: '2px'
  },
  main: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '48px 24px'
  },
  intro: {
    backgroundColor: '#fff',
    border: `1px solid #e8e4d9`,
    borderLeft: `4px solid ${GOLD}`,
    borderRadius: '4px',
    padding: '24px 28px',
    marginBottom: '40px'
  },
  introHeadline: {
    fontSize: '18px',
    color: NAVY,
    fontWeight: 'bold',
    margin: '0 0 10px',
    fontFamily: 'Georgia, serif'
  },
  introBody: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.7',
    margin: 0,
    fontFamily: 'Georgia, serif'
  },
  progressWrap: {
    marginBottom: '36px'
  },
  progressTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  progressLabel: {
    fontSize: '12px',
    color: '#888',
    fontFamily: 'Georgia, serif'
  },
  progressTrack: {
    height: '3px',
    backgroundColor: '#e0dbd0',
    borderRadius: '2px',
    overflow: 'hidden'
  },
  progressFill: (pct) => ({
    height: '100%',
    width: `${pct}%`,
    backgroundColor: GOLD,
    borderRadius: '2px',
    transition: 'width 0.3s ease'
  }),
  sectionDivider: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: GOLD,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderBottom: `1px solid ${GOLD}`,
    paddingBottom: '8px',
    marginBottom: '24px',
    marginTop: '40px',
    fontFamily: 'Georgia, serif'
  },
  fieldWrap: {
    marginBottom: '28px'
  },
  fieldLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    marginBottom: '6px'
  },
  fieldNum: {
    backgroundColor: NAVY,
    color: GOLD,
    fontSize: '11px',
    fontWeight: 'bold',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '1px',
    fontFamily: 'Georgia, serif'
  },
  fieldText: {
    fontSize: '14px',
    color: NAVY,
    fontWeight: 'bold',
    lineHeight: '1.4',
    fontFamily: 'Georgia, serif'
  },
  fieldHint: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
    marginLeft: '32px',
    fontFamily: 'Georgia, serif'
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Georgia, serif',
    color: '#333',
    backgroundColor: '#fff',
    resize: 'vertical',
    minHeight: '80px',
    lineHeight: '1.6',
    boxSizing: 'border-box'
  },
  submitWrap: {
    marginTop: '48px',
    textAlign: 'center'
  },
  submitBtn: {
    backgroundColor: NAVY,
    color: GOLD,
    border: 'none',
    padding: '16px 48px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    fontFamily: 'Georgia, serif'
  },
  submitBtnDisabled: {
    backgroundColor: '#ccc',
    color: '#888',
    border: 'none',
    padding: '16px 48px',
    fontSize: '15px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'not-allowed',
    letterSpacing: '0.04em',
    fontFamily: 'Georgia, serif'
  },
  statusWrap: {
    marginTop: '24px',
    textAlign: 'center'
  },
  statusText: {
    fontSize: '14px',
    color: '#666',
    fontFamily: 'Georgia, serif'
  },
  errorText: {
    fontSize: '14px',
    color: '#c0392b',
    fontFamily: 'Georgia, serif'
  },
  outputWrap: {
    marginTop: '48px',
    backgroundColor: '#fff',
    border: `1px solid #e8e4d9`,
    borderTop: `4px solid ${GOLD}`,
    borderRadius: '4px',
    padding: '32px'
  },
  outputHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  outputTitle: {
    fontSize: '18px',
    color: NAVY,
    fontWeight: 'bold',
    margin: 0,
    fontFamily: 'Georgia, serif'
  },
  copyBtn: {
    backgroundColor: 'transparent',
    color: GOLD,
    border: `1px solid ${GOLD}`,
    padding: '8px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontFamily: 'Georgia, serif'
  },
  outputContent: {
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    color: '#333',
    lineHeight: '1.8',
    fontFamily: 'Georgia, serif',
    borderTop: '1px solid #eee',
    paddingTop: '24px'
  },
  footer: {
    textAlign: 'center',
    padding: '32px',
    color: '#aaa',
    fontSize: '12px',
    letterSpacing: '0.06em',
    fontFamily: 'Georgia, serif'
  }
};

export default function App() {
  const [answers, setAnswers] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const filled = Object.values(answers).filter(v => v.trim().length > 10).length;
  const pct = Math.round((filled / 10) * 100);

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const answerArray = questions.map(q => answers[q.id]);
    const empty = answerArray.filter(a => a.trim().length < 5);
    if (empty.length > 0) {
      setError('Please answer all 10 questions before submitting.');
      return;
    }

    setError('');
    setResult('');
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answerArray })
      });

      const data = await response.json();

      if (data.error) {
        setError('Something went wrong: ' + data.error);
      } else {
        setResult(data.result);
        setTimeout(() => {
          document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } catch (err) {
      setError('Network error. Please try again: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  let currentSection = null;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.headerSite}>billcaskey.com</span>
          <h1 style={styles.headerTitle}>Webinar Builder</h1>
        </div>
        <div style={styles.headerBar} />
      </div>

      <div style={styles.main}>
        <div style={styles.intro}>
          <p style={styles.introHeadline}>Answer 10 questions. Get your complete webinar.</p>
          <p style={styles.introBody}>
            This tool generates a full 60-minute webinar slide outline and facilitator guide — built on the Caskey Guide philosophy. 
            No selling. No convincing. Just a clear roadmap that lets the right prospects self-select and take action.
            <br /><br />
            Be specific in your answers. The more real detail you give, the better your webinar will be.
          </p>
        </div>

        <div style={styles.progressWrap}>
          <div style={styles.progressTop}>
            <span style={styles.progressLabel}>Questions answered</span>
            <span style={styles.progressLabel}>{filled} of 10</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={styles.progressFill(pct)} />
          </div>
        </div>

        {questions.map((q) => {
          const showSection = q.section && q.section !== currentSection;
          if (showSection) currentSection = q.section;

          return (
            <div key={q.id}>
              {showSection && (
                <div style={styles.sectionDivider}>{q.section}</div>
              )}
              <div style={styles.fieldWrap}>
                <div style={styles.fieldLabel}>
                  <span style={styles.fieldNum}>{q.number}</span>
                  <span style={styles.fieldText}>{q.label}</span>
                </div>
                {q.hint && <p style={styles.fieldHint}>{q.hint}</p>}
                <textarea
                  style={styles.textarea}
                  value={answers[q.id]}
                  onChange={e => handleChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                />
              </div>
            </div>
          );
        })}

        <div style={styles.submitWrap}>
          <button
            style={loading ? styles.submitBtnDisabled : styles.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Building your webinar...' : 'Build My Webinar →'}
          </button>
        </div>

        {error && (
          <div style={styles.statusWrap}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {loading && (
          <div style={styles.statusWrap}>
            <p style={styles.statusText}>
              Claude is building your slide outline and facilitator guide. This takes about 30–45 seconds...
            </p>
          </div>
        )}

        {result && (
          <div id="output-section" style={styles.outputWrap}>
            <div style={styles.outputHeader}>
              <h2 style={styles.outputTitle}>Your webinar is ready</h2>
              <button style={styles.copyBtn} onClick={handleCopy}>
                {copied ? 'Copied ✓' : 'Copy all'}
              </button>
            </div>
            <div style={styles.outputContent}>{result}</div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        billcaskey.com &nbsp;|&nbsp; UPWARD.
      </div>
    </div>
  );
}
