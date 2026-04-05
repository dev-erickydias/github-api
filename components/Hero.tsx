"use client";

import { useState, useEffect } from "react";
import { useI18n } from "../lib/i18n";
import GitAnimation from "./GitAnimation";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function Hero() {
  const { t } = useI18n();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 5000;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-700/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-brand-400/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8 animate-fade-in-down">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {t.hero.badge.replace("{count}", count.toLocaleString())}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {t.hero.title1}{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">{t.hero.title2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <a href="/playground" className="btn-primary text-base inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {t.hero.cta}
              </a>
              <a href="/docs" className="btn-secondary text-base inline-flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                {t.hero.docs}
              </a>
            </div>
          </div>

          {/* 3D Git Animation */}
          <div className="hidden lg:flex items-center justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <GitAnimation />
          </div>
        </div>

        {/* Code block */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="max-w-3xl mx-auto code-block p-1">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-brand-500/10">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-auto text-xs text-dark-400">{t.hero.getRequest}</span>
            </div>
            <div className="p-5 overflow-x-auto">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <span className="text-green-400 font-bold shrink-0">GET</span>
                <span className="text-dark-400 break-all">
                  {API_URL}?<span className="text-brand-400">user</span>=<span className="text-brand-200">USERNAME</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
          {t.hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-dark-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 line-glow" />
    </section>
  );
}
