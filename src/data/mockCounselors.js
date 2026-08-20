export const COUNSELORS = [
  {
    id: 'c1',
    name: 'Dr. Elena Rostova, PsyD',
    title: 'Senior Clinical Psychologist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    specialties: ['Academic Anxiety', 'CBT', 'Perfectionism', 'Sleep Disorders'],
    languages: ['English', 'Russian'],
    bio: 'Specializing in helping undergraduate and graduate students navigate high-pressure academic environments, imposter syndrome, and burnout through evidence-based cognitive behavioral strategies.',
    rating: 4.9,
    reviewCount: 48,
    location: 'Student Health & Wellness Center, Rm 308 (or Video)',
    nextAvailable: 'Today, 3:30 PM',
    formats: ['In-Person', 'Video', 'Audio'],
    availableSlots: [
      { date: 'Today (Aug 21)', times: ['3:30 PM', '4:45 PM', '6:00 PM'] },
      { date: 'Tomorrow (Aug 22)', times: ['10:00 AM', '11:30 AM', '2:00 PM', '4:15 PM'] },
      { date: 'Monday (Aug 25)', times: ['9:30 AM', '1:00 PM', '3:00 PM'] }
    ]
  },
  {
    id: 'c2',
    name: 'Marcus Vance, LCSW',
    title: 'Licensed Clinical Social Worker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    specialties: ['First-Gen Students', 'Identity & Belonging', 'BIPOC Support', 'Life Transitions'],
    languages: ['English', 'Spanish'],
    bio: 'Dedicated to fostering a supportive, culturally responsive space where students can explore personal identity, family dynamics, and college transitions with warmth and mutual respect.',
    rating: 5.0,
    reviewCount: 62,
    location: 'Campus Intercultural Hub, Rm 104 (or Video)',
    nextAvailable: 'Tomorrow, 11:00 AM',
    formats: ['Video', 'In-Person'],
    availableSlots: [
      { date: 'Tomorrow (Aug 22)', times: ['11:00 AM', '1:30 PM', '3:45 PM'] },
      { date: 'Friday (Aug 23)', times: ['10:30 AM', '12:00 PM', '2:30 PM'] }
    ]
  },
  {
    id: 'c3',
    name: 'Aisha Patel, LPC',
    title: 'Mindfulness & Trauma-Informed Counselor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
    specialties: ['Mindfulness-Based Stress Reduction', 'Relationships & Boundaries', 'ADHD Coaching'],
    languages: ['English', 'Hindi', 'Gujarati'],
    bio: 'Blending somatic grounding, breathwork, and practical executive functioning strategies to empower students to reconnect with their inner calm and study rhythm.',
    rating: 4.8,
    reviewCount: 39,
    location: 'Wellness Pavilion Rm 202 (or Video)',
    nextAvailable: 'Friday, 10:00 AM',
    formats: ['Video', 'In-Person', 'Audio'],
    availableSlots: [
      { date: 'Friday (Aug 23)', times: ['10:00 AM', '11:15 AM', '1:45 PM', '4:00 PM'] },
      { date: 'Monday (Aug 25)', times: ['11:00 AM', '2:15 PM'] }
    ]
  },
  {
    id: 'c4',
    name: 'Jordan Lee, LMFT',
    title: 'Couples & Peer Dynamics Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    specialties: ['LGBTQ+ Affirming', 'Social Anxiety', 'Roommate & Family Dynamics', 'Self-Compassion'],
    languages: ['English'],
    bio: 'Passionate about guiding queer and questioning young adults, resolving interpersonal conflicts, and dismantling shame through affirmative, compassionate dialogue.',
    rating: 4.9,
    reviewCount: 51,
    location: 'Student Health & Wellness Center, Rm 312',
    nextAvailable: 'Monday, 2:00 PM',
    formats: ['Video', 'In-Person'],
    availableSlots: [
      { date: 'Monday (Aug 25)', times: ['2:00 PM', '3:30 PM', '5:00 PM'] },
      { date: 'Tuesday (Aug 26)', times: ['10:00 AM', '1:00 PM', '4:30 PM'] }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    counselorId: 'c1',
    counselorName: 'Dr. Elena Rostova, PsyD',
    counselorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    date: 'Aug 24, 2026',
    time: '2:30 PM - 3:15 PM',
    format: 'Video Call',
    location: 'Encrypted Telehealth Room #482',
    status: 'Upcoming',
    topic: 'Midterm anxiety & sleep routine adjustments',
    notes: 'Please complete the pre-session check-in if possible.'
  }
];
