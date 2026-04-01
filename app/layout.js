export const metadata = {
  title: "GitHub API",
  description: "Public API to fetch and filter GitHub user repositories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
