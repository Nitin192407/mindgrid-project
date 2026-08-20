import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Play, 
  Pause, 
  Headphones, 
  Sparkles, 
  Share2, 
  ArrowRight,
  Wind,
  Moon,
  Users,
  Compass
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { RESOURCES, RESOURCE_CATEGORIES } from '../../data/mockResources';
import { useWellness } from '../../context/WellnessContext';

export const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30);

  const { bookmarks, toggleBookmark, isBookmarked } = useWellness();

  // Filter resources
  const filteredResources = RESOURCES.filter(res => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Sleep & Rest': return Moon;
      case 'Anxiety & Panic': return Wind;
      case 'Mindfulness': return Headphones;
      case 'Relationships': return Users;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-calm-700 uppercase tracking-wider mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Based Self-Care</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Student Resources Library
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Practical strategies, audio-guided body scans, and sleep hygiene guides crafted specifically for university life.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search by topic, keyword, or stressor (e.g., sleep, panic, exam, ADHD)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-calm-500/20 focus:border-calm-500 text-sm shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {RESOURCE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-calm-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => {
          const bookmarked = isBookmarked(res.id);
          const CatIcon = getCategoryIcon(res.category);

          return (
            <Card
              key={res.id}
              hoverable
              onClick={() => setActiveResource(res)}
              className="p-5 bg-white flex flex-col justify-between shadow-soft border-slate-200/80 hover:border-calm-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="teal" size="sm">
                    {res.category}
                  </Badge>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(res.id);
                    }}
                    className="text-slate-400 hover:text-calm-600 transition-colors p-1"
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-calm-600 fill-calm-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                  {res.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{res.readTime}</span>
                </span>
                <span className="font-semibold text-calm-700 inline-flex items-center gap-1 hover:underline">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card className="p-12 text-center bg-white">
          <p className="text-sm text-slate-500">No resources found matching your search.</p>
          <Button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            variant="ghost"
            size="sm"
            className="mt-3"
          >
            Clear Filters
          </Button>
        </Card>
      )}

      {/* Resource Detail Modal */}
      {activeResource && (
        <Modal
          isOpen={!!activeResource}
          onClose={() => { setActiveResource(null); setIsPlayingAudio(false); }}
          maxWidth="max-w-2xl"
          title={activeResource.title}
          subtitle={`${activeResource.category} • ${activeResource.author}`}
        >
          <div className="space-y-4 text-left">
            {/* Audio Simulation Player if Audio type */}
            {activeResource.type.includes('Audio') && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-calm-100 to-indigo-50 border border-calm-200">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-12 h-12 rounded-2xl bg-calm-600 hover:bg-calm-700 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 flex-shrink-0"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Guided Audio Track (5:00)</span>
                      <span className="text-calm-800 font-semibold">{isPlayingAudio ? 'Playing...' : 'Paused'}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-calm-600 h-full rounded-full transition-all" style={{ width: isPlayingAudio ? '65%' : '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Body */}
            <div className="prose prose-sm max-w-none text-slate-700 space-y-3 leading-relaxed text-xs sm:text-sm">
              {activeResource.content.split('\n\n').map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
              {activeResource.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toggleBookmark(activeResource.id)}
                icon={isBookmarked(activeResource.id) ? BookmarkCheck : Bookmark}
              >
                {isBookmarked(activeResource.id) ? 'Saved in Bookmarks' : 'Save for Later'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => { setActiveResource(null); setIsPlayingAudio(false); }}
              >
                Done Reading
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
