"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

const params = [
  { name: "user", type: "string", required: true, default: "-", desc: "Username do GitHub" },
  { name: "topic", type: "string", required: false, default: "-", desc: "Filtrar por topico" },
  { name: "search", type: "string", required: false, default: "-", desc: "Buscar no nome ou descricao" },
  { name: "sort", type: "string", required: false, default: "updated", desc: "updated | created | pushed | name | stars | forks | size" },
  { name: "order", type: "string", required: false, default: "desc", desc: "asc | desc" },
  { name: "page", type: "number", required: false, default: "1", desc: "Numero da pagina" },
  { name: "per_page", type: "number", required: false, default: "10", desc: "Items por pagina (1-100)" },
  { name: "include_forks", type: "boolean", required: false, default: "false", desc: "Incluir forks" },
  { name: "include_archived", type: "boolean", required: false, default: "false", desc: "Incluir arquivados" },
  { name: "stats_only", type: "boolean", required: false, default: "false", desc: "Retornar apenas estatisticas" },
];

const responseFields = [
  { path: "id", type: "number", desc: "ID unico do repositorio" },
  { path: "name", type: "string", desc: "Nome do repositorio" },
  { path: "full_name", type: "string", desc: "Nome completo (usuario/repo)" },
  { path: "description", type: "string|null", desc: "Descricao do repo" },
  { path: "url", type: "string", desc: "URL no GitHub" },
  { path: "homepage", type: "string|null", desc: "URL do site/demo" },
  { path: "topics", type: "string[]", desc: "Tags do repositorio" },
  { path: "stats.stars", type: "number", desc: "Numero de stars" },
  { path: "stats.forks", type: "number", desc: "Numero de forks" },
  { path: "stats.size_kb", type: "number", desc: "Tamanho em KB" },
  { path: "dates.created_at", type: "ISO 8601", desc: "Data de criacao" },
  { path: "dates.updated_at", type: "ISO 8601", desc: "Ultima atualizacao" },
  { path: "dates.days_since_update", type: "number", desc: "Dias desde atualizacao" },
];

const errors = [
  { status: "400", reason: "Parametro user ausente", msg: "Missing required parameter: user" },
  { status: "400", reason: "Username invalido", msg: "Invalid GitHub username format" },
  { status: "400", reason: "Sort invalido", msg: "Invalid sort value..." },
  { status: "404", reason: "Usuario nao encontrado", msg: 'User \"USERNAME\" not found' },
  { status: "429", reason: "Rate limit", msg: "GitHub API rate limit exceeded..." },
  { status: "502", reason: "Erro inesperado", msg: "Failed to fetch GitHub repositories" },
];

export default function Docs() {
  const [activeTab, setActiveTab] = useState("params");

  return (
    <section id="docs" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Documentacao
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Referencia completa da <span className="gradient-text">API</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Tudo que voce precisa saber para integrar a API nos seus projetos.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            {/* Endpoint */}
            <div className="glass-card rounded-2xl p-6 mb-6">
              <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
                Endpoint
              </h3>
              <div className="code-block rounded-xl px-5 py-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold">
                  GET
                </span>
                <code className="text-sm text-dark-200">{API_URL}</code>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: "params", label: "Parametros" },
                { id: "response", label: "Resposta" },
                { id: "errors", label: "Erros" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "tab-active border-brand-500/30"
                      : "text-dark-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Params Table */}
            {activeTab === "params" && (
              <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-500/10">
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Parametro</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Tipo</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Default</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Descricao</th>
                      </tr>
                    </thead>
                    <tbody>
                      {params.map((p) => (
                        <tr key={p.name} className="border-b border-brand-500/5 hover:bg-brand-500/5 transition-colors">
                          <td className="px-6 py-3.5">
                            <code className="text-brand-400">{p.name}</code>
                            {p.required && (
                              <span className="ml-2 text-xs text-red-400">*</span>
                            )}
                          </td>
                          <td className="px-6 py-3.5 text-dark-300">{p.type}</td>
                          <td className="px-6 py-3.5">
                            <code className="text-dark-400 text-xs">{p.default}</code>
                          </td>
                          <td className="px-6 py-3.5 text-dark-300">{p.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Response Fields */}
            {activeTab === "response" && (
              <div className="space-y-6 animate-fade-in">
                <div className="glass-card rounded-2xl p-6">
                  <h4 className="text-white font-semibold mb-4">Estrutura da Resposta</h4>
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
    "topics": [{ "name": "react", "count": 6 }]
  },
  "projects": [...]
}`}</pre>
                  </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-brand-500/10">
                    <h4 className="text-white font-semibold">Campos do Projeto</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-brand-500/10">
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">Campo</th>
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">Tipo</th>
                          <th className="text-left px-6 py-3 text-dark-400 font-medium">Descricao</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responseFields.map((f) => (
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

            {/* Errors Table */}
            {activeTab === "errors" && (
              <div className="glass-card rounded-2xl overflow-hidden animate-fade-in">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-500/10">
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Status</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Situacao</th>
                        <th className="text-left px-6 py-4 text-dark-400 font-medium">Mensagem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errors.map((e) => (
                        <tr key={e.reason} className="border-b border-brand-500/5 hover:bg-brand-500/5 transition-colors">
                          <td className="px-6 py-3.5">
                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                              e.status === "400" ? "bg-yellow-500/10 text-yellow-400" :
                              e.status === "404" ? "bg-orange-500/10 text-orange-400" :
                              e.status === "429" ? "bg-red-500/10 text-red-400" :
                              "bg-red-500/10 text-red-400"
                            }`}>
                              {e.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-dark-300">{e.reason}</td>
                          <td className="px-6 py-3.5">
                            <code className="text-xs text-dark-400">{e.msg}</code>
                          </td>
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
