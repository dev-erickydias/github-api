<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000?style=for-the-badge&logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/CORS-Enabled-blue?style=for-the-badge" alt="CORS" />
  <img src="https://img.shields.io/badge/License-Free-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">
  <br />
  GitReposAPI
  <br />
</h1>

<h4 align="center">
  API publica para buscar, filtrar e ordenar repositorios publicos de qualquer usuario do GitHub com uma unica chamada.
</h4>

<p align="center">
  <a href="https://api-pearl-nine-29.vercel.app">Site</a> &nbsp;&bull;&nbsp;
  <a href="https://api-pearl-nine-29.vercel.app/docs">Docs</a> &nbsp;&bull;&nbsp;
  <a href="https://api-pearl-nine-29.vercel.app/playground">Playground</a> &nbsp;&bull;&nbsp;
  <a href="https://api-pearl-nine-29.vercel.app/examples">Exemplos</a> &nbsp;&bull;&nbsp;
  <a href="https://www.linkedin.com/in/erickydias">LinkedIn</a>
</p>

<br />

<p align="center">
  <code>https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME</code>
</p>

<br />

---

## O que e a GitReposAPI?

A GitReposAPI e uma **API REST publica e gratuita** que funciona como uma camada inteligente sobre a API do GitHub. Em vez de lidar com paginacao, formatacao e filtragem manualmente, voce faz uma unica chamada e recebe dados limpos, organizados e prontos para usar.

**Ideal para:**

- Secoes de projetos em portfolios pessoais
- Dashboards com estatisticas de GitHub
- Curriculos dinamicos que atualizam sozinhos
- Qualquer aplicacao que precise listar repos de um usuario

**Por que usar em vez da API do GitHub direto?**

| | API do GitHub | GitReposAPI |
|---|---|---|
| Paginacao | Voce implementa | Automatica |
| Filtragem | Voce implementa | Por query param |
| Ordenacao | Limitada | 7 opcoes + direcao |
| Estatisticas | Nao tem | Agregadas automaticamente |
| Formato | Dados brutos (50+ campos) | Limpo e organizado (campos uteis) |
| CORS | Nao habilitado | Habilitado para qualquer dominio |

---

## Inicio Rapido

### 1. Faca uma requisicao GET

```bash
curl "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME"
```

> Substitua `USERNAME` por qualquer username valido do GitHub.

### 2. Receba JSON organizado

```json
{
  "user": "USERNAME",
  "pagination": { "page": 1, "total_items": 25, "has_next": true },
  "stats": { "total_repos": 25, "total_stars": 142 },
  "projects": [
    {
      "name": "meu-projeto",
      "description": "Descricao do repo",
      "language": "TypeScript",
      "url": "https://github.com/USERNAME/meu-projeto",
      "homepage": "https://meusite.com",
      "stats": { "stars": 15, "forks": 3 }
    }
  ]
}
```

### 3. Use no seu projeto

```javascript
const res = await fetch(
  "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME&sort=stars"
);
const data = await res.json();

data.projects.forEach(repo => {
  console.log(`${repo.name} - ${repo.stats.stars} stars`);
});
```

**Pronto.** Sem autenticacao, sem cadastro, sem configuracao.

---

## Endpoint

```
GET https://api-pearl-nine-29.vercel.app/api/github
```

---

## Parametros

Todos via query string (`?chave=valor&chave2=valor2`):

| Parametro | Tipo | Obrigatorio | Default | Descricao |
|:---|:---|:---:|:---|:---|
| `user` | `string` | **Sim** | - | Username do GitHub |
| `language` | `string` | Nao | - | Filtra por linguagem (ex: `TypeScript`, `Python`) |
| `topic` | `string` | Nao | - | Filtra por topico/tag do repositorio |
| `search` | `string` | Nao | - | Busca no nome ou descricao (max 100 chars) |
| `sort` | `string` | Nao | `updated` | Campo de ordenacao (veja abaixo) |
| `order` | `string` | Nao | `desc` | Direcao: `asc` ou `desc` |
| `page` | `number` | Nao | `1` | Numero da pagina |
| `per_page` | `number` | Nao | `10` | Itens por pagina (min: 1, max: 100) |
| `include_forks` | `boolean` | Nao | `false` | Incluir repos que sao forks |
| `include_archived` | `boolean` | Nao | `false` | Incluir repos arquivados |
| `stats_only` | `boolean` | Nao | `false` | Retorna apenas estatisticas |

### Opcoes de `sort`

| Valor | Ordena por |
|:---|:---|
| `updated` | Data da ultima atualizacao **(padrao)** |
| `created` | Data de criacao |
| `pushed` | Data do ultimo push |
| `name` | Nome (alfabetico) |
| `stars` | Numero de stars |
| `forks` | Numero de forks |
| `size` | Tamanho do repositorio |

> Todos os filtros sao **case-insensitive**: `typescript`, `TypeScript` e `TYPESCRIPT` funcionam igual.

---

## Exemplos de Uso

### Busca basica

```
GET /api/github?user=torvalds
```

### Filtrar por linguagem + ordenar por stars

```
GET /api/github?user=torvalds&language=C&sort=stars&order=desc
```

### Buscar por texto no nome/descricao

```
GET /api/github?user=vercel&search=next
```

### Paginacao (pagina 2, 5 itens)

```
GET /api/github?user=facebook&page=2&per_page=5
```

### Somente estatisticas (resposta leve)

```
GET /api/github?user=torvalds&stats_only=true
```

**Resposta:**

```json
{
  "user": "torvalds",
  "stats": {
    "total_repos": 7,
    "total_stars": 209847,
    "total_forks": 55231,
    "languages": [
      { "name": "C", "count": 3 },
      { "name": "Shell", "count": 1 }
    ],
    "topics": []
  }
}
```

### Incluir forks e arquivados

```
GET /api/github?user=USERNAME&include_forks=true&include_archived=true
```

### Combinando tudo

```
GET /api/github?user=USERNAME&language=TypeScript&sort=stars&order=desc&per_page=5&page=1
```

> Repos TypeScript, ordenados por stars (desc), 5 por pagina, primeira pagina.

---

## Estrutura da Resposta

### Resposta completa

```json
{
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
  "projects": [
    {
      "id": 123456789,
      "name": "meu-projeto",
      "full_name": "USERNAME/meu-projeto",
      "description": "Descricao do repositorio",
      "url": "https://github.com/USERNAME/meu-projeto",
      "clone_url": "https://github.com/USERNAME/meu-projeto.git",
      "homepage": "https://meusite.com",
      "language": "TypeScript",
      "topics": ["react", "nextjs"],
      "default_branch": "main",
      "visibility": "public",
      "is_fork": false,
      "is_archived": false,
      "is_template": false,
      "license": { "key": "mit", "name": "MIT License" },
      "stats": {
        "stars": 15,
        "forks": 3,
        "watchers": 15,
        "open_issues": 2,
        "size_kb": 1024
      },
      "dates": {
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2026-03-28T14:20:00Z",
        "pushed_at": "2026-03-28T14:20:00Z",
        "days_since_update": 4
      },
      "has": {
        "pages": true,
        "wiki": true,
        "issues": true,
        "projects": true,
        "discussions": false
      }
    }
  ]
}
```

### Campos de cada projeto

<details>
<summary><strong>Informacoes basicas</strong></summary>

| Campo | Tipo | Descricao |
|:---|:---|:---|
| `id` | `number` | ID unico no GitHub |
| `name` | `string` | Nome do repositorio |
| `full_name` | `string` | Nome completo (`usuario/repo`) |
| `description` | `string\|null` | Descricao |
| `url` | `string` | URL do repo no GitHub |
| `clone_url` | `string` | URL para clonar |
| `homepage` | `string\|null` | URL do site/demo |
| `language` | `string\|null` | Linguagem principal |
| `topics` | `string[]` | Tags/topicos |
| `default_branch` | `string` | Branch principal |
| `visibility` | `string` | Visibilidade |
| `is_fork` | `boolean` | Se e fork |
| `is_archived` | `boolean` | Se esta arquivado |
| `is_template` | `boolean` | Se e template |
| `license` | `object\|null` | Licenca (`key` e `name`) |

</details>

<details>
<summary><strong>Estatisticas (stats)</strong></summary>

| Campo | Tipo | Descricao |
|:---|:---|:---|
| `stats.stars` | `number` | Stars |
| `stats.forks` | `number` | Forks |
| `stats.watchers` | `number` | Watchers |
| `stats.open_issues` | `number` | Issues abertas |
| `stats.size_kb` | `number` | Tamanho em KB |

</details>

<details>
<summary><strong>Datas (dates)</strong></summary>

| Campo | Tipo | Descricao |
|:---|:---|:---|
| `dates.created_at` | `ISO 8601` | Criacao |
| `dates.updated_at` | `ISO 8601` | Ultima atualizacao |
| `dates.pushed_at` | `ISO 8601` | Ultimo push |
| `dates.days_since_update` | `number` | Dias desde atualizacao |

</details>

<details>
<summary><strong>Features (has)</strong></summary>

| Campo | Tipo | Descricao |
|:---|:---|:---|
| `has.pages` | `boolean` | GitHub Pages ativo |
| `has.wiki` | `boolean` | Wiki habilitada |
| `has.issues` | `boolean` | Issues habilitadas |
| `has.projects` | `boolean` | Projects habilitados |
| `has.discussions` | `boolean` | Discussions habilitadas |

</details>

---

## Erros

A API sempre retorna JSON com mensagens claras:

| Status | Quando acontece | Exemplo de resposta |
|:---:|:---|:---|
| `400` | Faltou o `user` | `{ "error": "Missing required parameter: user", "usage": "...", "params": {...} }` |
| `400` | Username invalido | `{ "error": "Invalid GitHub username format" }` |
| `400` | Sort invalido | `{ "error": "Invalid sort value. Must be one of: ..." }` |
| `400` | Order invalido | `{ "error": "Invalid order value. Must be 'asc' or 'desc'" }` |
| `404` | Usuario nao existe | `{ "error": "User \"USERNAME\" not found" }` |
| `429` | Rate limit estourado | `{ "error": "GitHub API rate limit exceeded. Try again later." }` |
| `502` | Erro inesperado | `{ "error": "Failed to fetch GitHub repositories" }` |

---

## Exemplos de Integracao

<details>
<summary><strong>JavaScript / Fetch</strong></summary>

```javascript
const API = "https://api-pearl-nine-29.vercel.app/api/github";

// Busca basica
const data = await fetch(`${API}?user=USERNAME`).then(r => r.json());
console.log(data.stats);
console.log(data.projects);

// Com filtros
const filtered = await fetch(
  `${API}?user=USERNAME&language=TypeScript&sort=stars`
).then(r => r.json());

// Paginacao
const page2 = await fetch(
  `${API}?user=USERNAME&page=2&per_page=5`
).then(r => r.json());

console.log(page2.pagination.has_next); // true/false
```

</details>

<details>
<summary><strong>React / Next.js</strong></summary>

```jsx
"use client";
import { useState, useEffect } from "react";

const API = "https://api-pearl-nine-29.vercel.app/api/github";

export default function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}?user=USERNAME&sort=stars&per_page=6`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!data) return <p>Erro ao carregar</p>;

  return (
    <section>
      {/* Stats */}
      <div>
        <span>{data.stats.total_repos} repos</span>
        <span>{data.stats.total_stars} stars</span>
      </div>

      {/* Projects */}
      {data.projects.map(repo => (
        <div key={repo.id}>
          <h3>
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h3>
          <p>{repo.description || "Sem descricao"}</p>
          <span>{repo.language}</span>
          <span>{repo.stats.stars} stars</span>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
              Demo
            </a>
          )}
        </div>
      ))}
    </section>
  );
}
```

</details>

<details>
<summary><strong>Python</strong></summary>

```python
import requests

API = "https://api-pearl-nine-29.vercel.app/api/github"

# Buscar repos
data = requests.get(API, params={
    "user": "USERNAME",
    "sort": "stars",
    "per_page": 20,
}).json()

# Stats
print(f"Total: {data['stats']['total_repos']} repos")
print(f"Stars: {data['stats']['total_stars']}")

# Projetos
for repo in data["projects"]:
    print(f"  {repo['name']} ({repo['language']}) - {repo['stats']['stars']} stars")

# Apenas stats
stats = requests.get(API, params={
    "user": "USERNAME",
    "stats_only": "true"
}).json()
```

</details>

<details>
<summary><strong>cURL</strong></summary>

```bash
# Busca basica
curl "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME"

# Com filtros
curl "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME&language=TypeScript&sort=stars"

# Apenas stats
curl "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME&stats_only=true"

# Formatado com jq
curl -s "https://api-pearl-nine-29.vercel.app/api/github?user=USERNAME" | jq '.projects[] | {name, stars: .stats.stars}'
```

</details>

---

## Como Funciona Internamente

```
Seu App                    GitReposAPI (Vercel)              GitHub API
   |                             |                              |
   |  GET ?user=USERNAME         |                              |
   |---------------------------->|                              |
   |                             |  Valida inputs               |
   |                             |  (regex, sort, order)        |
   |                             |                              |
   |                             |  GET /users/USERNAME/repos   |
   |                             |----------------------------->|
   |                             |  (paginacao automatica,      |
   |                             |   ate 10 paginas x 100)      |
   |                             |<-----------------------------|
   |                             |                              |
   |                             |  Filtra (language, topic,    |
   |                             |  search, forks, archived)    |
   |                             |                              |
   |                             |  Calcula stats               |
   |                             |  Ordena (sort + order)       |
   |                             |  Pagina (page + per_page)    |
   |                             |                              |
   |  JSON formatado + CORS      |                              |
   |<----------------------------|                              |
```

---

## Rodando Localmente

### Pre-requisitos

- [Node.js](https://nodejs.org/) 18+
- (Opcional) [GitHub Token](https://github.com/settings/tokens) para rate limit de 5k/h

### Passo a passo

```bash
# 1. Clone o repositorio
git clone https://github.com/dev-erickydias/github-api.git
cd github-api

# 2. Instale as dependencias
npm install

# 3. Configure o token (opcional mas recomendado)
cp .env.example .env.local
# Edite .env.local e cole seu GitHub Token

# 4. Rode o servidor
npm run dev

# 5. Acesse
# http://localhost:3000/api/github?user=USERNAME
```

### Gerando um GitHub Token

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em **Generate new token** > **Fine-grained token**
3. De um nome (ex: `github-api-local`)
4. Para repos publicos, **nenhum scope e necessario**
5. Clique em **Generate token** e copie
6. Cole no `.env.local`: `GITHUB_TOKEN=seu_token_aqui`

| | Sem token | Com token |
|---|---|---|
| Rate limit | 60 req/hora | **5.000 req/hora** |

---

## Deploy na Vercel

### Via Dashboard (mais facil)

1. Faca um **fork** deste repositorio
2. Acesse [vercel.com](https://vercel.com) > **Add New Project**
3. Importe o fork
4. Em **Environment Variables**, adicione:
   - Name: `GITHUB_TOKEN`
   - Value: `seu_token_github`
5. Clique em **Deploy**

### Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
echo "seu_token" | vercel env add GITHUB_TOKEN production
```

> Cada push no repositorio faz redeploy automatico.

---

## Seguranca

| Check | Status | Descricao |
|:---|:---:|:---|
| Validacao de username | :white_check_mark: | Regex rigorosa, max 39 chars |
| URL encoding | :white_check_mark: | `encodeURIComponent` em todos os params |
| Validacao de sort/order | :white_check_mark: | Whitelist de valores permitidos |
| Limite de busca | :white_check_mark: | Campo search limitado a 100 chars |
| Anti-loop | :white_check_mark: | Max 10 paginas internas (1.000 repos) |
| Rate limit handling | :white_check_mark: | 403 do GitHub retornado como 429 |
| Validacao de resposta | :white_check_mark: | Verifica `Array.isArray` antes de processar |
| CORS controlado | :white_check_mark: | Apenas GET e OPTIONS permitidos |
| Token protegido | :white_check_mark: | Apenas em env vars, nunca exposto |
| Sem dados sensiveis | :white_check_mark: | Apenas dados publicos retornados |

> Auditoria completa: [api-pearl-nine-29.vercel.app/security](https://api-pearl-nine-29.vercel.app/security)

---

## Limites

| Recurso | Limite |
|:---|:---|
| Rate limit sem token | 60 req/hora |
| Rate limit com token | 5.000 req/hora |
| Max repos por usuario | 1.000 (10 pag x 100) |
| Max itens por pagina | 100 |
| Max chars no search | 100 |
| Cache | 1 hora |

---

## Tecnologias

<p>
  <img src="https://img.shields.io/badge/Next.js_14-000?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel" alt="Vercel" />
  <img src="https://img.shields.io/badge/GitHub_API_v3-181717?style=flat-square&logo=github" alt="GitHub API" />
</p>

---

## Links

| | URL |
|---|---|
| Site | [api-pearl-nine-29.vercel.app](https://api-pearl-nine-29.vercel.app) |
| Docs | [/docs](https://api-pearl-nine-29.vercel.app/docs) |
| Playground | [/playground](https://api-pearl-nine-29.vercel.app/playground) |
| Exemplos | [/examples](https://api-pearl-nine-29.vercel.app/examples) |
| Repositorio | [github.com/dev-erickydias/github-api](https://github.com/dev-erickydias/github-api) |
| LinkedIn | [linkedin.com/in/erickydias](https://www.linkedin.com/in/erickydias) |

---

<p align="center">
  Feito por <a href="https://github.com/dev-erickydias"><strong>Erick Dias</strong></a>
  <br />
  <sub>&copy; 2026 Erick Dias. Todos os direitos reservados.</sub>
</p>
