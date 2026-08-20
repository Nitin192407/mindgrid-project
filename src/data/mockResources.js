export const RESOURCE_CATEGORIES = [
  'All',
  'Academic Stress',
  'Sleep & Rest',
  'Anxiety & Panic',
  'Mindfulness',
  'Relationships',
  'Motivation & ADHD'
];

export const RESOURCES = [
  {
    id: 'res-1',
    title: 'The 4-7-8 Breathing Technique for Sudden Study Panic',
    category: 'Anxiety & Panic',
    type: 'Guided Exercise',
    readTime: '4 min practice',
    icon: 'Wind',
    author: 'Campus Wellness Lab',
    summary: 'A fast, neurobiological technique to regulate the vagus nerve and shift your body from fight-or-flight into calm focus.',
    content: `When exam anxiety peaks, your sympathetic nervous system triggers an increased heart rate, shallow breathing, and racing thoughts. 

The 4-7-8 breath acts as a natural tranquilizer for the nervous system:
1. **Inhale quietly through the nose** for a count of 4 seconds.
2. **Hold your breath** gently for 7 seconds. Keep shoulders relaxed.
3. **Exhale completely through your mouth** making a soft whoosh sound for 8 seconds.
4. Repeat this cycle 4 times.

**Why it works:** Prolonged exhales stimulate the parasympathetic nervous system, lowering your heart rate and signaling safety to the brain.`,
    tags: ['Breathwork', 'Instant Calm', 'Exam Prep'],
    featured: true
  },
  {
    id: 'res-2',
    title: 'Dorm Room Sleep Hygiene: Reclaiming Deep Rest in Shared Spaces',
    category: 'Sleep & Rest',
    type: 'Article',
    readTime: '6 min read',
    icon: 'Moon',
    author: 'Dr. Marcus Vance, LCSW',
    summary: 'Practical strategies for college students dealing with irregular roommates, late-night noise, and blue light overload.',
    content: `Sleeping well in university housing can feel nearly impossible when roommates have opposing schedules and dorm halls stay lively late into the night.

Here are research-backed adjustments:
- **Designate the bed for sleep only:** Avoid studying, eating, or stressing about finals directly on top of your bedsheets. This strengthens your brain's neurological association between your mattress and sleep.
- **The 30-minute buffer window:** Shift screens to warm night mode 60 minutes before bed, and switch to a podcast, lo-fi music, or reading physical paper 30 minutes prior.
- **Sound masking:** A brown noise app or fan creates an acoustic blanket that smooths out unpredictable corridor noises.`,
    tags: ['Sleep', 'Dorm Life', 'Recovery'],
    featured: true
  },
  {
    id: 'res-3',
    title: 'Overcoming the Procrastination-Guilt Spiral',
    category: 'Academic Stress',
    type: 'Guide & Worksheet',
    readTime: '5 min read',
    icon: 'Sparkles',
    author: 'Dr. Elena Rostova, PsyD',
    summary: 'Understanding why procrastination is an emotional regulation challenge rather than a time-management flaw.',
    content: `Procrastination is rarely caused by laziness. Most often, it is an unconscious attempt to avoid unpleasant emotions like fear of failure, perfectionist self-doubt, or boredom.

**The "2-Minute Gentle Start" Method:**
- Give yourself permission to work on the daunting essay for just 2 minutes.
- Accept that the first draft can be messy and imperfect.
- Once the friction of starting is breached, dopamine momentum carries you forward naturally.`,
    tags: ['Academics', 'Perfectionism', 'Focus'],
    featured: false
  },
  {
    id: 'res-4',
    title: '5-Minute Mindful Body Scan for Tension Release',
    category: 'Mindfulness',
    type: 'Audio Practice',
    readTime: '5 min audio',
    icon: 'Headphones',
    author: 'Aisha Patel, LPC',
    summary: 'A calming somatic guide to systematically release jaw, shoulder, and neck tension accumulated during long library sessions.',
    content: `Take a comfortable seated or reclined position. Close your eyes or soften your gaze downward.

Take one deep, slow breath in... and let it out.

Notice the contact between your feet and the floor. Feel the support beneath you. Gently scan upward:
- Soften the muscles in your forehead and behind your eyes.
- Unclench your jaw and let your tongue rest away from the roof of your mouth.
- Drop your shoulders an inch down away from your ears.
- Feel your chest rise and fall naturally without trying to change anything.`,
    tags: ['Somatic', 'Body Scan', 'Stress Relief'],
    featured: true
  },
  {
    id: 'res-5',
    title: 'Setting Healthy Boundaries with Friends and Group Projects',
    category: 'Relationships',
    type: 'Article',
    readTime: '7 min read',
    icon: 'Users',
    author: 'Jordan Lee, LMFT',
    summary: 'How to say no kindly without guilt, and how to delegate shared coursework without resentment.',
    content: `College brings an intense influx of social obligations, student club responsibilities, and team assignments. Learning to protect your energy is vital to your mental wellness.

**Helpful Scripts:**
- "I'd love to help, but my plate is completely full this week and I wouldn't be able to give it the focus it deserves."
- "Let's establish clear task divisions for our group presentation today so everyone knows what they own by Friday."`,
    tags: ['Boundaries', 'Social', 'Communication'],
    featured: false
  },
  {
    id: 'res-6',
    title: 'Navigating ADHD and Executive Dysfunction at University',
    category: 'Motivation & ADHD',
    type: 'Guide',
    readTime: '8 min read',
    icon: 'Compass',
    author: 'Campus Disability & Wellness Alliance',
    summary: 'Actionable executive functioning scaffolds: body doubling, visual timers, and sensory accommodations.',
    content: `University academic freedom can overwhelm neurodivergent brains that previously relied on structured high school schedules.

Key scaffolding strategies:
1. **Body Doubling:** Study in communal quiet spaces like library reading rooms or virtual study streams. The passive presence of others working activates focus.
2. **Visual Timers:** Seeing time elapse visually prevents time blindness.
3. **Campus Accommodations:** You are entitled to support such as testing accommodations, note-taking support, and flexible deadline extensions.`,
    tags: ['ADHD', 'Executive Function', 'Accommodations'],
    featured: false
  }
];
