"use client";

import Navbar from "./Navbar";
import Docs from "./Docs";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import type { ReactNode } from "react";
import { useI18n } from "../lib/i18n";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function DocsPageContent() {
  const { t } = useI18n();
  const dp = t.docsPage;

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">{dp.headerBadge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {dp.headerTitle}<span className="gradient-text">{dp.headerTitleHighlight}</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">{dp.headerSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">{dp.quickStart}</h2>
              <p className="text-dark-300 mb-6">
                {dp.quickStartDesc
                  .replace("{get}", "")
                  .replace("{user}", "")
                  .split(/GET|user/)
                  .reduce((acc: (string | ReactNode)[], part, i) => {
                    if (i === 0) return [part];
                    return [...acc, <code key={i} className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-sm">{i === 1 ? "GET" : "user"}</code>, part];
                  }, [])}
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">{dp.step1}</h3>
              <div className="code-block rounded-xl p-5 mb-6">
                <pre className="text-sm">
                  <span className="text-green-400 font-bold">GET</span>{" "}
                  <span className="text-dark-300">{API_URL}?<span className="text-brand-400">user</span>=<span className="text-brand-200">USERNAME</span></span>
                </pre>
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{dp.step2}</h3>
              <p className="text-dark-300 mb-4">{dp.step2Desc}</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {dp.blocks.map((block) => (
                  <div key={block.title} className="bg-dark-950 rounded-xl p-4 border border-brand-500/10">
                    <code className="text-brand-400 text-sm font-bold">{block.title}</code>
                    <p className="text-dark-400 text-xs mt-2 leading-relaxed">{block.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-3">{dp.step3}</h3>
              <p className="text-dark-300 mb-3">{dp.step3Desc}</p>
              <div className="code-block rounded-xl p-5">
                <pre className="text-sm text-dark-300">
{`# Filter by TypeScript, sort by stars, 5 per page
GET ${API_URL}?user=USERNAME&language=TypeScript&sort=stars&per_page=5

# Search repos with "api" in name or description
GET ${API_URL}?user=USERNAME&search=api

# Stats only (no repo list)
GET ${API_URL}?user=USERNAME&stats_only=true`}
                </pre>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Docs />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">{dp.processingTitle}</h2>
              <div className="space-y-6">
                {dp.processingSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold gradient-text">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-dark-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">{dp.faqTitle}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {dp.faqs.map((faq) => (
                <div key={faq.q} className="glass-card rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-dark-300 text-sm leading-relaxed">{faq.a}</p>
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
