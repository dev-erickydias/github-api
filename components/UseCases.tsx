"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../lib/i18n";

const icons = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
];

export default function UseCases() {
  const { t } = useI18n();

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            {t.useCases.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            {t.useCases.title}<span className="gradient-text">{t.useCases.titleHighlight}</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            {t.useCases.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.useCases.items.map((c, i) => (
            <ScrollReveal key={i} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
              <div className="glass-card rounded-2xl p-7 h-full glow-border group">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-5 group-hover:bg-brand-500/20 transition-colors duration-500">
                  {icons[i]}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {c.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed mb-4">
                  {c.desc}
                </p>
                <div className="flex gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
