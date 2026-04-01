export default function Home() {
  return (
    <div style={{ fontFamily: "monospace", padding: "2rem", maxWidth: "700px" }}>
      <h1>GitHub Repos API</h1>
      <p>Public API to fetch and filter GitHub user repositories.</p>
      <h2>Usage</h2>
      <code>GET /api/github?user=USERNAME</code>
      <h2>Parameters</h2>
      <ul>
        <li><b>user</b> — (required) GitHub username</li>
        <li><b>language</b> — Filter by programming language</li>
        <li><b>topic</b> — Filter by repository topic</li>
        <li><b>search</b> — Search in name or description</li>
        <li><b>sort</b> — updated | created | pushed | name | stars | forks | size</li>
        <li><b>order</b> — desc | asc</li>
        <li><b>page</b> — Page number (default: 1)</li>
        <li><b>per_page</b> — Items per page, max 100 (default: 10)</li>
        <li><b>include_forks</b> — true | false (default: false)</li>
        <li><b>include_archived</b> — true | false (default: false)</li>
        <li><b>stats_only</b> — true | false (default: false)</li>
      </ul>
    </div>
  );
}
