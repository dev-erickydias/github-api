"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const API_URL = "https://api-pearl-nine-29.vercel.app/api/github";

const examples = [
  {
    id: "fetch",
    label: "JavaScript",
    icon: "JS",
    color: "text-yellow-400",
    code: `// Buscar repositorios de um usuario
const response = await fetch(
  "${API_URL}?user=USERNAME"
);
const data = await response.json();

// Acessar dados
console.log(data.stats.total_repos);  // Total de repos
console.log(data.stats.total_stars);  // Total de stars
console.log(data.projects);           // Lista de repos

// Com filtros
const filtered = await fetch(
  "${API_URL}?user=USERNAME&language=TypeScript&sort=stars"
).then(res => res.json());`,
  },
  {
    id: "react",
    label: "React",
    icon: "Re",
    color: "text-cyan-400",
    code: `"use client";
import { useState, useEffect } from "react";

const API = "${API_URL}";

export default function Projects() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(\`\${API}?user=USERNAME&sort=stars\`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{data.stats.total_repos} projetos</h1>
      {data.projects.map(repo => (
        <div key={repo.id}>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <span>{repo.language} | {repo.stats.stars} stars</span>
          {repo.homepage && <a href={repo.homepage}>Demo</a>}
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    id: "python",
    label: "Python",
    icon: "Py",
    color: "text-green-400",
    code: `import requests

API = "${API_URL}"

# Buscar repositorios
response = requests.get(API, params={
    "user": "USERNAME",
    "sort": "stars",
    "per_page": 20,
})
data = response.json()

# Estatisticas
print(f"Total: {data['stats']['total_repos']} repos")
print(f"Stars: {data['stats']['total_stars']}")

# Listar projetos
for repo in data["projects"]:
    print(f"  {repo['name']} - {repo['language']}")

# Apenas stats
stats = requests.get(API, params={
    "user": "USERNAME",
    "stats_only": "true"
}).json()`,
  },
  {
    id: "curl",
    label: "cURL",
    icon: ">_",
    color: "text-brand-400",
    code: `# Busca basica
curl "${API_URL}?user=USERNAME"

# Filtrar por linguagem + ordenar por stars
curl "${API_URL}?user=USERNAME&language=TypeScript&sort=stars"

# Paginacao: pagina 2, 5 por pagina
curl "${API_URL}?user=USERNAME&page=2&per_page=5"

# Apenas estatisticas
curl "${API_URL}?user=USERNAME&stats_only=true"

# Formatado com jq
curl -s "${API_URL}?user=USERNAME" | jq '.projects[] | {name, stars: .stats.stars}'`,
  },
];

export default function Examples() {
  const [activeExample, setActiveExample] = useState("fetch");
  const [copied, setCopied] = useState(false);

  const current = examples.find((e) => e.id === activeExample);

  const copyCode = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="examples" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal className="text-center mb-12">
          <span className="text-brand-400 text-sm font-semibold tracking-wider uppercase">
            Exemplos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Integre em <span className="gradient-text">qualquer stack</span>
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Copie e cole. Funciona com qualquer linguagem ou framework.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            {/* Language tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {examples.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => setActiveExample(ex.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all whitespace-nowrap inline-flex items-center gap-2 ${
                    activeExample === ex.id
                      ? "tab-active border-brand-500/30"
                      : "text-dark-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`font-mono text-xs font-bold ${activeExample === ex.id ? ex.color : ""}`}>
                    {ex.icon}
                  </span>
                  {ex.label}
                </button>
              ))}
            </div>

            {/* Code block */}
            <div className="code-wrapper relative">
              <div className="code-block rounded-xl animate-fade-in">
                <div className="flex items-center justify-between px-5 py-3 border-b border-brand-500/10">
                  <span className="text-xs text-dark-400">{current.label}</span>
                  <button
                    onClick={copyCode}
                    className="copy-btn text-dark-400 hover:text-brand-400 transition-colors text-xs inline-flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-green-400">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Copiado!
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        Copiar
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-5 text-sm overflow-x-auto">
                  <code className="text-dark-200">{current.code}</code>
                </pre>
              </div>
            </div>

            {/* Usage tip */}
            <div className="mt-6 glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium mb-1">Dica</p>
                <p className="text-sm text-dark-300">
                  Substitua <code className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 text-xs">USERNAME</code> pelo
                  username do GitHub desejado. A API e publica e aceita qualquer usuario com repositorios publicos.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
