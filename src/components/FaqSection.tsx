import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { ThemeCustomization } from '../types';

interface FaqSectionProps {
  themeConfig?: ThemeCustomization;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ themeConfig }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  const toggle = (idx: number) => {
    if (allExpanded) {
      setAllExpanded(false);
      setOpenIndex(idx);
    } else {
      setOpenIndex(openIndex === idx ? null : idx);
    }
  };

  const handleToggleAll = () => {
    setAllExpanded(!allExpanded);
    if (!allExpanded) {
      setOpenIndex(null);
    }
  };

  const whatsapp = themeConfig?.whatsappNumber || '+44 7731 454811';

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#060814] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black border border-indigo-500/25 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.faq.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400">{t.faq.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Global Expand All / Collapse All Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleToggleAll}
            className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-sky-500/30 text-sky-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {allExpanded ? (
              <span>Collapse All Questions</span>
            ) : (
              <span>Expand All Questions ({FAQS.length})</span>
            )}
          </button>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = allExpanded || openIndex === idx;
            return (
              <div
                key={idx}
                className="electric-card rounded-2xl overflow-hidden transition-colors border border-white/10"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[52px] p-4 sm:p-6 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-white hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 bg-slate-950/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-3xl electric-glass border border-white/10 text-center space-y-3">
          <h4 className="text-base font-black text-white">{t.faq.stillHaveQuestions}</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {t.faq.stillHaveQuestionsDesc}
          </p>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{t.faq.chatWhatsapp}: {whatsapp}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
