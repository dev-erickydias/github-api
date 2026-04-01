"use client";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-brand-500/10 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
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

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <a
              href="https://github.com/dev-erickydias/github-api"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Docs
            </a>
            <a href="#playground" className="hover:text-white transition-colors">
              Playground
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-dark-400 text-center md:text-right">
            <p>
              &copy; {currentYear}{" "}
              <a
                href="https://github.com/dev-erickydias"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors"
              >
                Erick Dias
              </a>
              . Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
