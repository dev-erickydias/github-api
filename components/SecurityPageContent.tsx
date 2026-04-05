"use client";

import Navbar from "./Navbar";
import Security from "./Security";
import ScrollReveal from "./ScrollReveal";
import Footer from "./Footer";
import { useI18n } from "../lib/i18n";

export default function SecurityPageContent() {
  const { t } = useI18n();
  const sp = t.securityPage;

  const codeBlocks = [
    `// Validation regex\n/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/\n\n// Accepts: "torvalds", "dev-erickydias", "user123"\n// Rejects: "-invalid", "user@name", "a".repeat(40)\n// Rejects: "../etc/passwd", "<script>", SQL injection`,
    `// Accepted values for sort:\n["updated", "created", "pushed", "name", "stars", "forks", "size"]\n\n// Accepted values for order:\n["asc", "desc"]\n\n// Any other value → 400 Bad Request`,
    `// Response when rate limit is reached:\n{\n  "error": "GitHub API rate limit exceeded. Try again later."\n}\n// Status: 429 Too Many Requests`,
    `// CORS headers applied to ALL responses\n{\n  "Access-Control-Allow-Origin": "*",\n  "Access-Control-Allow-Methods": "GET, OPTIONS",\n  "Access-Control-Allow-Headers": "Content-Type"\n}\n\n// Only GET and OPTIONS are allowed\n// POST, PUT, DELETE → not accepted`,
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-12 relative hero-gradient">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">{sp.headerBadge}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
            {sp.headerTitle}<span className="gradient-text">{sp.headerTitleHighlight}</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl">{sp.headerSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 line-glow" />
      </section>

      <Security />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {sp.auditTitle}<span className="gradient-text">{sp.auditTitleHighlight}</span>
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {sp.sections.map((section, i) => (
                <div key={i} className="glass-card rounded-2xl p-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-green-400"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    {section.title}
                  </h3>
                  <p className="text-dark-300 text-sm mb-4">{section.desc}</p>
                  <div className="code-block rounded-xl p-5">
                    <pre className="text-sm text-dark-300">{codeBlocks[i]}</pre>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-3">{sp.securityIssueTitle}</h2>
              <p className="text-dark-300 text-sm mb-6">{sp.securityIssueDesc}</p>
              <a href="https://www.linkedin.com/in/erickydias" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                {sp.reportLinkedin}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
