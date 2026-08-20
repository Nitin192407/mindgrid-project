export const ASSESSMENTS = [
  {
    id: 'phq-9',
    title: 'PHQ-9: Mood & Vitality Screening',
    description: 'A 9-question reflection on your energy, mood patterns, and enjoyment of daily activities over the last two weeks.',
    category: 'Mood',
    duration: '3-4 mins',
    badge: 'Standard Clinical Screen',
    intro: 'Over the last 2 weeks, how often have you been bothered by any of the following problems? Please answer honestly — there are no right or wrong answers.',
    scale: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ],
    questions: [
      'Little interest or pleasure in doing things you usually enjoy',
      'Feeling down, depressed, or hopeless',
      'Trouble falling or staying asleep, or sleeping too much',
      'Feeling tired or having little energy throughout the day',
      'Poor appetite or overeating',
      'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      'Trouble concentrating on things, such as schoolwork, reading, or watching television',
      'Moving or speaking so slowly that others have noticed, or being unusually fidgety/restless',
      'Thoughts that you would be better off or of hurting yourself in some way'
    ],
    scoringGuide: [
      {
        min: 0,
        max: 4,
        level: 'Minimal / Balanced',
        color: 'emerald',
        message: 'Your responses reflect steady mood and emotional balance right now. Continuing your self-care habits is a great way to stay grounded.',
        recommendations: [
          'Maintain your regular sleep and movement routine',
          'Explore mindful breathing exercises to keep stress low',
          'Engage with peer study and wellness groups'
        ]
      },
      {
        min: 5,
        max: 9,
        level: 'Mild Fatigue / Strain',
        color: 'teal',
        message: 'You are experiencing some mild fatigue or emotional strain. College life can be demanding, and small self-care adjustments can bring relief.',
        recommendations: [
          'Practice 10-minute daily decompression or mindfulness',
          'Review your academic workload with a mentor or peer',
          'Explore our Sleep & Rest library guides'
        ]
      },
      {
        min: 10,
        max: 14,
        level: 'Moderate Emotional Burden',
        color: 'amber',
        message: 'You appear to be carrying a noticeable amount of emotional weight. You do not have to carry this alone — supportive resources are ready for you.',
        recommendations: [
          'Consider scheduling a confidential conversation with a university counselor',
          'Talk with a trusted advisor, friend, or family member',
          'Try structured cognitive reframing exercises in our Resource Library'
        ]
      },
      {
        min: 15,
        max: 27,
        level: 'Substantial Support Recommended',
        color: 'rose',
        message: 'Your responses indicate you are dealing with significant challenges. We strongly encourage connecting with a professional counselor who can listen and support you.',
        recommendations: [
          'Book a priority confidential session with campus counseling',
          'Use our 24/7 crisis support options if you feel overwhelmed at any time',
          'Reach out to campus student support services for academic accommodations'
        ]
      }
    ]
  },
  {
    id: 'gad-7',
    title: 'GAD-7: Anxiety & Worry Scale',
    description: 'A 7-question check-in to understand feelings of restlessness, worry, and nervous tension.',
    category: 'Anxiety',
    duration: '2-3 mins',
    badge: 'Popular Check-in',
    intro: 'Over the last 2 weeks, how often have you been bothered by the following problems? Take your time and reflect on your general feelings.',
    scale: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Several days' },
      { value: 2, label: 'More than half the days' },
      { value: 3, label: 'Nearly every day' }
    ],
    questions: [
      'Feeling nervous, anxious, or on edge',
      'Not being able to stop or control worrying',
      'Worrying too much about different things (classes, exams, future, relationships)',
      'Trouble relaxing or unwinding during free time',
      'Being so restless that it is hard to sit still',
      'Becoming easily annoyed, frustrated, or irritable',
      'Feeling afraid, as if something awful might happen'
    ],
    scoringGuide: [
      {
        min: 0,
        max: 4,
        level: 'Calm & Settled',
        color: 'emerald',
        message: 'Your anxiety levels are currently within a calm, manageable range. Keep leaning into healthy stress boundaries.',
        recommendations: [
          'Continue balanced study breaks and hydration',
          'Use grounding exercises before presentations or exams'
        ]
      },
      {
        min: 5,
        max: 9,
        level: 'Mild Nervous Tension',
        color: 'teal',
        message: 'You have some occasional worry or nervous energy. This is very common during exam and project periods.',
        recommendations: [
          'Try the 4-7-8 breathing exercise whenever you feel tense',
          'Write down your top 3 worries in a worry journal to externalize them'
        ]
      },
      {
        min: 10,
        max: 14,
        level: 'Moderate Anxiety',
        color: 'amber',
        message: 'Worry seems to be occupying quite a bit of space in your days. Targeted coping strategies can help reduce this cognitive load.',
        recommendations: [
          'Book a session with a campus counselor specializing in anxiety',
          'Practice 5-4-3-2-1 sensory grounding when feeling overwhelmed',
          'Break large academic tasks into 20-minute focus blocks'
        ]
      },
      {
        min: 15,
        max: 21,
        level: 'High Anxiety',
        color: 'rose',
        message: 'Your anxiety is significantly affecting your daily comfort and peace of mind. Professional support can offer compassionate, practical relief.',
        recommendations: [
          'Schedule an appointment with university mental health services',
          'Connect with the 24/7 student support line for instant de-escalation',
          'Consider discussing workload adjustments with your academic department'
        ]
      }
    ]
  },
  {
    id: 'burnout-scale',
    title: 'Student Burnout & Academic Fatigue Inventory',
    description: 'Measure academic exhaustion, detachment, and study efficacy during the semester.',
    category: 'Academics',
    duration: '3 mins',
    badge: 'Semester Wellness',
    intro: 'Reflect on your academic routine over the past month. Rate how closely each statement reflects your experience.',
    scale: [
      { value: 0, label: 'Rarely / Never' },
      { value: 1, label: 'Sometimes' },
      { value: 2, label: 'Frequently' },
      { value: 3, label: 'Almost always' }
    ],
    questions: [
      'I feel emotionally drained by my coursework and academic deadlines',
      'I find it difficult to feel enthusiastic about my major or classes',
      'I feel exhausted when waking up and thinking about facing another day of lectures/studying',
      'I feel less confident in my academic abilities than I used to',
      'I feel disconnected or cynical about group projects and campus activities',
      'I postpone studying even when I know deadlines are approaching'
    ],
    scoringGuide: [
      {
        min: 0,
        max: 5,
        level: 'Academic Flow & Energy',
        color: 'emerald',
        message: 'Your study engagement is healthy and energized. You have a good rhythm balancing coursework and personal time.',
        recommendations: [
          'Keep your current schedule boundaries',
          'Share your study strategies with peer study groups'
        ]
      },
      {
        min: 6,
        max: 11,
        level: 'Early Signs of Fatigue',
        color: 'teal',
        message: 'You are beginning to show signs of semester fatigue. Stepping back for dedicated recovery can prevent deeper burnout.',
        recommendations: [
          'Schedule at least one full evening or half-day without coursework',
          'Use the Pomodoro technique to avoid marathon study sessions',
          'Get 7-8 hours of sleep to restore cognitive stamina'
        ]
      },
      {
        min: 12,
        max: 18,
        level: 'Significant Academic Burnout',
        color: 'amber',
        message: 'You are experiencing substantial academic burnout and emotional fatigue. It is completely okay to pause and recharge.',
        recommendations: [
          'Consult with an academic success coach or counselor',
          'Prioritize essential assignments and request extensions where possible',
          'Engage with restful, non-screen hobbies this week'
        ]
      }
    ]
  }
];
