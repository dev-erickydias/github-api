"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../lib/i18n";

export default function HowItWorks() {
  const { t } = useI18n();

  const steps = t.howItWorks.steps.map((s, i) => ({
    number: String(i + 1).padStart(2, "0"),
    ...s,
  }));

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            {t.howItWorks.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            {t.howItWorks.title}<span className="gradient-text">{t.howItWorks.titleHighlight}</span>
          </h2>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/30 via-brand-500/10 to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 150} direction="left">
                <div className="flex gap-6 items-start group">
                  <div className="w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 group-hover:border-brand-500/40 transition-all duration-500">
                    <span className="text-2xl font-bold gradient-text">
                      {step.number}
                    </span>
                  </div>
                  <div className="glass-card rounded-2xl p-6 flex-1 group-hover:border-brand-500/20 transition-all duration-500">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-dark-300 text-sm mb-3">{step.desc}</p>
                    <span className="inline-block px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
