"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../lib/i18n";

export default function Security() {
  const { t } = useI18n();

  return (
    <section id="security" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            {t.security.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            {t.security.title}<span className="gradient-text">{t.security.titleHighlight}</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            {t.security.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal className="flex justify-center mb-12" direction="scale">
          <div className="glass-card rounded-2xl p-8 text-center animate-pulse-glow">
            <div className="text-5xl font-extrabold text-green-400 mb-2">
              10/10
            </div>
            <div className="text-sm text-dark-300">{t.security.score}</div>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid gap-3">
          {t.security.checks.map((check, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="glass-card rounded-xl px-6 py-4 flex items-start gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green-500/20 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{check.title}</h3>
                  <p className="text-sm text-dark-300 leading-relaxed">{check.desc}</p>
                </div>
                <span className="ml-auto shrink-0 px-2.5 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold uppercase">
                  {t.security.pass}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
