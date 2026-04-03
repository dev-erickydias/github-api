"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../lib/i18n";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function Docs() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("params");

  return (
    <section id="docs" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">{t.docs.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            {t.docs.title}<span className="gradient-text">{t.docs.titleHighlight}</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">{t.docs.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">{t.docs.endpoint}</h3>
              <div className="code-block rounded-xl px-5 py-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold">GET</span>
                <code className="text-sm text-dark-200">{API_URL}</code>
              </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {([
                { id: "params", label: t.docs.tabs.params },
                { id: "response", label: t.docs.tabs.response },
                { id: "errors", label: t.docs.tabs.errors },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap ${
                    activeTab === tab.id ? "tab-active border-brand-500/30" : "text-dark-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "params" && (
              <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-500/10">
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.table.param}</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.table.type}</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.table.default}</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.table.desc}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.docs.params.map((p) => (
                        <tr key={p.name} className="border-b border-brand-500/5 hover:bg-brand-500/5 transition-colors">
                          <td className="px-6 py-3.5">
                            <code className="text-brand-400">{p.name}</code>
                            {p.required && <span className="ml-2 text-xs text-red-400">*</span>}
                          </td>
                          <td className="px-6 py-3.5 text-dark-300">{p.type}</td>
                          <td className="px-6 py-3.5"><code className="text-dark-400 text-xs">{p.default}</code></td>
                          <td className="px-6 py-3.5 text-dark-300">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "response" && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4">{t.docs.responseStructure}</h4>
                  <div className="code-block rounded-xl p-5 text-sm">
                    <pre className="text-dark-300">{`{
  "user": "USERNAME",
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_items": 25,
    "total_pages": 3,
    "has_next": true,
    "has_prev": false
  },
  "stats": {
    "total_repos": 25,
    "total_stars": 142,
    "total_forks": 38,
    "languages": [{ "name": "TypeScript", "count": 12 }],
    "topics": [{ "name": "react", "count": 6 }]
  },
  "projects": [...]
}`}</pre>
                  </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-brand-500/10">
                    <h4 className="text-white font-semibold">{t.docs.projectFields}</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-brand-500/10">
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">{t.docs.field}</th>
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">{t.docs.table.type}</th>
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">{t.docs.table.desc}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {t.docs.responseFields.map((f) => (
                          <tr key={f.path} className="border-b border-brand-500/5 hover:bg-brand-500/5 transition-colors">
                            <td className="px-6 py-3"><code className="text-brand-400">{f.path}</code></td>
                            <td className="px-6 py-3 text-dark-400 text-xs">{f.type}</td>
                            <td className="px-6 py-3 text-dark-300">{f.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "errors" && (
              <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-500/10">
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Status</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.situation}</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">{t.docs.message}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.docs.errors.map((e) => (
                        <tr key={e.reason} className="border-b border-brand-500/5 hover:bg-brand-500/5 transition-colors">
                          <td className="px-6 py-3.5">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                              e.status === "400" ? "bg-yellow-500/10 text-yellow-400" :
                              e.status === "404" ? "bg-orange-500/10 text-orange-400" :
                              "bg-red-500/10 text-red-400"
                            }`}>{e.status}</span>
                          </td>
                          <td className="px-6 py-3.5 text-dark-300">{e.reason}</td>
                          <td className="px-6 py-3.5"><code className="text-xs text-dark-400">{e.msg}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
