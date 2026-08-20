import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search, 
  Star, 
  MapPin, 
  Video, 
  Phone, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { COUNSELORS } from '../../data/mockCounselors';
import { useWellness } from '../../context/WellnessContext';

export const CounselorBooking = () => {
  const { appointments, bookAppointment, cancelAppointment } = useWellness();
  const [selectedTab, setSelectedTab] = useState('counselors'); // 'counselors' | 'appointments'
  const [formatFilter, setFormatFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Booking Modal State
  const [activeCounselor, setActiveCounselor] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState('Video Call');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const tabs = [
    { id: 'counselors', label: 'Browse Counselors', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'appointments', label: 'My Appointments', icon: <Calendar className="w-4 h-4" />, count: appointments.filter(a => a.status === 'Upcoming').length }
  ];

  const filteredCounselors = COUNSELORS.filter(c => {
    const matchesFormat = formatFilter === 'All' || c.formats.includes(formatFilter);
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          c.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  const handleOpenBooking = (counselor) => {
    setActiveCounselor(counselor);
    setSelectedDate(counselor.availableSlots[0]?.date || 'Today');
    setSelectedTime(counselor.availableSlots[0]?.times[0] || '3:30 PM');
    setBookingStep(1);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = async () => {
    await bookAppointment({
      counselorId: activeCounselor.id,
      counselorName: activeCounselor.name,
      counselorAvatar: activeCounselor.avatar,
      date: selectedDate,
      time: `${selectedTime} - 45 mins`,
      format: selectedFormat,
      location: selectedFormat === 'Video Call' ? 'Encrypted Telehealth Room' : activeCounselor.location,
      topic: sessionTopic || 'General Wellness & Academic Support',
      notes: 'Confidential appointment confirmed.'
    });
    setBookingSuccess(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-calm-700 uppercase tracking-wider mb-1">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Confidential University Care</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Campus Counseling Services
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Connect with licensed university mental health professionals. 100% free and confidential for all enrolled students.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={selectedTab}
        onChange={setSelectedTab}
        variant="underline"
      />

      {/* VIEW 1: Browse Counselors */}
      {selectedTab === 'counselors' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by specialty (e.g. CBT, LGBTQ+, ADHD, Anxiety)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {['All', 'Video', 'In-Person', 'Audio'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormatFilter(fmt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    formatFilter === fmt
                      ? 'bg-calm-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Counselor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCounselors.map((counselor) => (
              <Card key={counselor.id} className="p-6 bg-white flex flex-col justify-between shadow-soft border-slate-200/80 hover:border-calm-300 transition-all">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={counselor.avatar}
                      alt={counselor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-calm-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-bold text-slate-800 truncate">{counselor.name}</h3>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{counselor.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-calm-700 font-medium">{counselor.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{counselor.location}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {counselor.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {counselor.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Next Opening</span>
                    <span className="font-bold text-emerald-700">{counselor.nextAvailable}</span>
                  </div>
                  <Button
                    onClick={() => handleOpenBooking(counselor)}
                    variant="primary"
                    size="sm"
                    icon={CalendarCheck}
                  >
                    Book Appointment
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: My Appointments */}
      {selectedTab === 'appointments' && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <Card className="p-12 text-center bg-white">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">No appointments scheduled</p>
              <p className="text-xs text-slate-400 mt-1">Select a counselor above to book your confidential session.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {appointments.map((apt) => (
                <Card key={apt.id} className="p-5 bg-white shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={apt.counselorAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'}
                      alt={apt.counselorName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-800">{apt.counselorName}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-indigo-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{apt.date} • {apt.time}</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {apt.format} • {apt.topic}
                      </p>
                    </div>
                  </div>

                  {apt.status === 'Upcoming' && (
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        onClick={() => alert("Connecting to HIPAA encrypted telehealth video room #482...")}
                        variant="primary"
                        size="sm"
                        icon={Video}
                      >
                        Join Video Call
                      </Button>
                      <Button
                        onClick={() => cancelAppointment(apt.id)}
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Booking Modal */}
      {activeCounselor && (
        <Modal
          isOpen={!!activeCounselor}
          onClose={() => setActiveCounselor(null)}
          maxWidth="max-w-xl"
          title={bookingSuccess ? "Appointment Confirmed!" : `Book with ${activeCounselor.name}`}
          subtitle={bookingSuccess ? "You're all set. We've added this to your confidential calendar." : "Select your preferred format, date, and time slot."}
        >
          {bookingSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Counselor:</span>
                  <span className="font-bold text-slate-800">{activeCounselor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-bold text-slate-800">{selectedDate} • {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Format:</span>
                  <span className="font-bold text-slate-800">{selectedFormat}</span>
                </div>
              </div>
              <Button
                onClick={() => { setActiveCounselor(null); setSelectedTab('appointments'); }}
                variant="primary"
                className="w-full"
              >
                View in My Appointments
              </Button>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              {/* Step 1: Format selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Session Format:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Video Call', 'In-Person', 'Phone Call'].map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedFormat === fmt
                          ? 'bg-calm-100 border-calm-500 text-calm-900 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date and Time slots */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Available Slots:
                </label>
                <div className="space-y-3">
                  {activeCounselor.availableSlots.map((slotGroup, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700 block mb-2">{slotGroup.date}</span>
                      <div className="flex flex-wrap gap-2">
                        {slotGroup.times.map((t) => {
                          const isSelected = selectedDate === slotGroup.date && selectedTime === t;
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => { setSelectedDate(slotGroup.date); setSelectedTime(t); }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-calm-600 text-white shadow-xs'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Optional Reason / Focus note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Optional: What would you like to focus on? (Confidential)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Midterm stress, sleep issues, relationship boundaries..."
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Free university covered care</span>
                </span>
                <Button
                  onClick={handleConfirmBooking}
                  variant="primary"
                  size="md"
                  icon={CalendarCheck}
                  disabled={!selectedTime}
                >
                  Confirm Appointment
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
