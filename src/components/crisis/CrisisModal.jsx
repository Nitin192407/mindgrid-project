import React, { useState } from 'react';
import { Phone, MessageSquare, ShieldAlert, Heart, Wind, Compass, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { BreathingTool } from './BreathingTool';
import { GroundingTool } from './GroundingTool';
import { useWellness } from '../../context/WellnessContext';

export const CrisisModal = () => {
  const { isCrisisModalOpen, closeCrisisModal, crisisModalInitialTab } = useWellness();
  const [activeTab, setActiveTab] = useState(crisisModalInitialTab || 'hotlines');

  // Sync tab when opening
  React.useEffect(() => {
    if (crisisModalInitialTab) {
      setActiveTab(crisisModalInitialTab);
    }
  }, [crisisModalInitialTab, isCrisisModalOpen]);

  const tabs = [
    { id: 'hotlines', label: '24/7 Crisis Lines', icon: <Phone className="w-4 h-4" /> },
    { id: 'breathe', label: 'Breathing Tool', icon: <Wind className="w-4 h-4" /> },
    { id: 'ground', label: '5-4-3-2-1 Grounding', icon: <Compass className="w-4 h-4" /> }
  ];

  const crisisContacts = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support available 24/7 by call or text across the US and Canada.',
      phone: '988',
      type: 'Call or Text',
      badge: 'Immediate 24/7',
      variant: 'rose'
    },
    {
      name: 'Crisis Text Line',
      description: 'Text HOME to connect with a trained crisis counselor via text.',
      phone: '741741',
      actionText: 'Text HOME to 741741',
      type: 'Text Only',
      badge: 'Free & Confidential',
      variant: 'indigo'
    },
    {
      name: 'University 24/7 Crisis Counselor on Duty',
      description: 'Direct campus health line for students experiencing acute distress or safety concerns.',
      phone: '(555) 948-HELP (4357)',
      type: 'Campus On-Call',
      badge: 'University Staff',
      variant: 'teal'
    },
    {
      name: 'The Trevor Project (LGBTQ+ Crisis Support)',
      description: '24/7 confidential phone, text, and chat suicide prevention support for LGBTQ youth.',
      phone: '1-866-488-7386',
      type: 'Specialized Support',
      badge: 'LGBTQ+ Affirming',
      variant: 'violet'
    },
    {
      name: 'Campus Safety / Emergency Escort',
      description: 'On-campus physical safety, security escorts, and urgent medical dispatch.',
      phone: '(555) 948-3333',
      type: 'Campus Security',
      badge: 'Physical Emergency',
      variant: 'slate'
    }
  ];

  return (
    <Modal
      isOpen={isCrisisModalOpen}
      onClose={closeCrisisModal}
      maxWidth="max-w-2xl"
      title="Support & Crisis Care"
      subtitle="You are not alone. Free, confidential support is available right now."
    >
      <div className="space-y-5">
        {/* Soft reassuring banner */}
        <div className="bg-gradient-to-r from-teal-50 to-indigo-50 p-4 rounded-2xl border border-teal-100 flex items-start gap-3">
          <div className="p-2 bg-white rounded-xl text-teal-700 shadow-xs flex-shrink-0">
            <Heart className="w-5 h-5 fill-teal-100" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Take a breath — we are here with you</h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Whether you need someone to listen, immediate emergency help, or a quick tool to calm your body, explore the options below.
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center border-b border-slate-100 pb-3">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab 1: Hotlines & Direct Contacts */}
        {activeTab === 'hotlines' && (
          <div className="space-y-3">
            {crisisContacts.map((contact, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="text-sm font-bold text-slate-800">{contact.name}</h5>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {contact.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal max-w-md">
                    {contact.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-calm-600 hover:bg-calm-700 text-white shadow-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{contact.actionText || contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-400">
                If you are in immediate life-threatening danger, call 911 or visit the nearest university emergency room.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Breathing Tool */}
        {activeTab === 'breathe' && (
          <BreathingTool technique="478" />
        )}

        {/* Tab 3: Grounding Tool */}
        {activeTab === 'ground' && (
          <GroundingTool />
        )}
      </div>
    </Modal>
  );
};
