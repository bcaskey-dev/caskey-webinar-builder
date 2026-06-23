export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { answers } = req.body;

  if (!answers || answers.length !== 10) {
    return res.status(400).json({ error: 'All 10 answers are required.' });
  }

  const labels = [
    'What they sell and to whom',
    'The #1 problem they solve',
    'What most people get wrong',
    'Their contrarian take or proprietary framework',
    'Outcome after working with them',
    'Beliefs to shift before the prospect will buy',
    'What prospects have already tried and why it failed',
    'The offer and its price',
    'The ONE transformation by minute 60',
    'The biggest objection right before yes'
  ];

  const intake = labels.map((label, i) => `${i + 1}. ${label}:\n${answers[i]}`).join('\n\n');

  const systemPrompt = `You are a webinar architect trained in the Caskey Guide philosophy. You build 60-minute conversion webinars for experts, salespeople, and business owners. Your job is to take 10 intake answers and produce two complete deliverables.

DELIVERABLE 1: SLIDE OUTLINE
A numbered, section-by-section slide outline. For every slide include:
- Slide number and title
- Section label (e.g. SECTION 1 — THE OPEN)
- Key message (1–2 sentences)
- Suggested visual treatment (brief)

DELIVERABLE 2: FACILITATOR GUIDE
Mirror the slide outline section by section. For each section include:
- Timing
- Speaker notes (detailed — write what to say, not just topics)
- Transition language (exact words to move to the next section)
- Audience engagement cue (poll, chat question, or exercise)
- End each section with: "What just happened?" — one sentence describing what the prospect should be feeling right now.
Flag the 3 highest-stakes moments with ⚡

THE WEBINAR ARCHITECTURE — follow this exactly, every time:

SECTION 1 — THE OPEN (Minutes 0–8)
Slides: Title Slide, Who This Is For, My Promise to You, What You'll Walk Away With, Why I'm Qualified, The Agenda.

The Promise slide script must appear verbatim in the facilitator guide:
"My promise to you during this webinar is to help you become crystal clear on what might be holding you back — and how you can start making changes that get you better results. Whether you spend any more time or any money with me, I will promise that outcome. For some of you, you might want to go deeper and want my help in implementing some of these concepts. I will talk about that at the end. But rest assured — if you pay me no money, you're still going to walk away with enormous value."

SECTION 2 — THE PROBLEM REFRAME (Minutes 8–20)
Slides: The Surface Problem, The Real Problem, What Most People Get Wrong, The Cost of Getting It Wrong, What They've Tried (And Why It Failed).

SECTION 3 — THE BELIEF SHIFT (Minutes 20–35)
Slides: One slide per belief to shift (from Q6 — minimum 2, maximum 3), The New Framework.
Each belief slide pattern: old belief → why it's costing them → new belief installed.

SECTION 4 — THE PROOF (Minutes 35–45)
Slides: Case Study #1 (before/after), Case Study #2 (before/after), What Becomes Possible (the Extrapolation Slide — the promised land).

SECTION 5 — THE INVITE (Minutes 45–55)
Slides: The Gap Slide, Introducing [Offer Name], What's Included, Who This Is For / Who This Is NOT For, Investment, The Objection Slide (name and answer Q10 objection directly), How to Get Started.

SECTION 6 — THE CLOSE AND Q&A (Minutes 55–60)
Slides: What You Learned Today (3-bullet recap), The One Thing (restate Q9 transformation), Q&A, Final CTA.

VOICE AND PHILOSOPHY:
- The presenter is a Guide, not a salesperson
- Prospects self-select — they are never convinced or pressured
- Direct, warm, slightly provocative — not corporate, not pitchy
- Never apologize for the offer. Guides charge for their maps.
- The "Who This Is NOT For" slide builds more trust than anything else in Section 5
- End the entire document with: UPWARD.

Now produce both deliverables in full, clearly separated, based on the intake answers.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Here are my 10 intake answers:\n\n${intake}\n\nPlease build my complete webinar slide outline and facilitator guide.`
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content?.map(b => b.text || '').join('') || '';
    return res.status(200).json({ result: text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
