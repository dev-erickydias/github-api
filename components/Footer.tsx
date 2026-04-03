"use client";

import { useI18n } from "../lib/i18n";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-brand-500/10 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">
              Git<span className="gradient-text">Repos</span>API
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-dark-400">
            <a href="/docs" className="hover:text-white transition-colors">{t.footer.docs}</a>
            <a href="/playground" className="hover:text-white transition-colors">{t.footer.playground}</a>
            <a href="/examples" className="hover:text-white transition-colors">{t.footer.examples}</a>
            <a href="https://github.com/dev-erickydias/github-api" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.footer.github}</a>
            <a href="https://www.linkedin.com/in/erickydias" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t.footer.linkedin}
            </a>
          </div>

          <div className="text-sm text-dark-400 text-center md:text-right">
            <p>
              &copy; {currentYear}{" "}
              <a href="https://github.com/dev-erickydias" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 transition-colors">
                Erick Dias
              </a>
              . {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
