"use client";

import { useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

export default function Playground() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("updated");
  const [perPage, setPerPage] = useState("5");
  const [statsOnly, setStatsOnly] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (username) params.set("user", username);
    if (language) params.set("language", language);
    if (sort !== "updated") params.set("sort", sort);
    if (perPage !== "10") params.set("per_page", perPage);
    if (statsOnly) params.set("stats_only", "true");
    return `${API_URL}?${params.toString()}`;
  }, [username, language, sort, perPage, statsOnly]);

  const handleFetch = async () => {
    if (!username.trim()) {
      setError("Digite um username do GitHub");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(buildUrl());
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Erro ${res.status}`);
      } else {
        setResult(data);
      }
    } catch {
      setError("Erro de conexao. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(buildUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-bool">$1</span>')
      .replace(/: (null)/g, ': <span class="json-null">$1</span>');
  };

  return (
    <section id="playground" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Playground
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Teste a API <span className="gradient-text">ao vivo</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Digite qualquer username do GitHub e veja o resultado em tempo real.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Controls */}
            <div className="glass-card rounded-2xl p-6 mb-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wider">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder="ex: torvalds"
                    className="w-full bg-dark-950 border border-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wider">
                    Linguagem
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="ex: TypeScript"
                    className="w-full bg-dark-950 border border-brand-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wider">
                    Ordenar por
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full bg-dark-950 border border-brand-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    <option value="updated">Atualizacao</option>
                    <option value="created">Criacao</option>
                    <option value="stars">Stars</option>
                    <option value="forks">Forks</option>
                    <option value="name">Nome</option>
                    <option value="size">Tamanho</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-dark-400 mb-2 uppercase tracking-wider">
                    Por pagina
                  </label>
                  <select
                    value={perPage}
                    onChange={(e) => setPerPage(e.target.value)}
                    className="w-full bg-dark-950 border border-brand-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
                  >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={statsOnly}
                      onChange={(e) => setStatsOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 rounded-full bg-dark-700 peer-checked:bg-brand-500 transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                  </div>
                  <span className="text-sm text-dark-300 group-hover:text-white transition-colors">
                    Somente estatisticas
                  </span>
                </label>

                <div className="flex-1" />

                <button
                  onClick={handleFetch}
                  disabled={loading}
                  className="btn-primary !py-3 !px-8 text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white rounded-full loading-dot" />
                      <span className="w-2 h-2 bg-white rounded-full loading-dot" />
                      <span className="w-2 h-2 bg-white rounded-full loading-dot" />
                    </div>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Executar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* URL Preview */}
            <div className="code-block rounded-xl px-5 py-3 mb-4 flex items-center gap-3">
              <span className="text-green-400 font-bold text-sm shrink-0">GET</span>
              <code className="text-sm text-dark-300 overflow-x-auto flex-1 whitespace-nowrap">
                {buildUrl()}
              </code>
              <button
                onClick={copyUrl}
                className="shrink-0 text-dark-400 hover:text-brand-400 transition-colors"
                title="Copiar URL"
              >
                {copied ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>

            {/* Result */}
            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-4 text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            {result && (
              <div className="code-block rounded-xl animate-fade-in-up">
                <div className="flex items-center justify-between px-5 py-3 border-b border-brand-500/10">
                  <span className="text-xs text-dark-400">Resposta JSON</span>
                  <span className="text-xs text-green-400">200 OK</span>
                </div>
                <pre
                  className="p-5 text-sm overflow-x-auto max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: formatJson(result) }}
                />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
