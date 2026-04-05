"use client";

import Navbar from "./Navbar";
import Playground from "./Playground";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import { useI18n } from "../lib/i18n";

export default function PlaygroundPageContent() {
  const { t } = useI18n();
  const pp = t.playgroundPage;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">{pp.headerBadge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {pp.headerTitle}<span className="gradient-text">{pp.headerTitleHighlight}</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">{pp.headerSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">{pp.howToUse}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {pp.steps.map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold gradient-text">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-dark-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Playground />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-white mb-6 text-center">{pp.tipsTitle}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {pp.tips.map((tip) => (
                <div key={tip.title} className="glass-card rounded-xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{tip.title}</h3>
                  <p className="text-dark-400 text-xs leading-relaxed">{tip.desc}</p>
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
