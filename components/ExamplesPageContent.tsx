"use client";

import Navbar from "./Navbar";
import Examples from "./Examples";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import { useI18n } from "../lib/i18n";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function ExamplesPageContent() {
  const { t } = useI18n();
  const ep = t.examplesPage;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">{ep.headerBadge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {ep.headerTitle}<span className="gradient-text">{ep.headerTitleHighlight}</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">{ep.headerSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <Examples />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {ep.tutorialTitle}<span className="gradient-text">{ep.tutorialTitleHighlight}</span>
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {ep.tutorialSteps.map((step, i) => (
                <div key={i} className="glass-card rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                      <span className="text-sm font-bold gradient-text">{i + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-dark-300 text-sm mb-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">{ep.whyTitle}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {ep.whyItems.map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-dark-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
