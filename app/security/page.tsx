import SecurityPageContent from "../../components/SecurityPageContent";

export const metadata = {
  title: "Security - GitReposAPI",
  description:
    "Complete security audit of GitReposAPI. Input validation, rate limit, CORS, token protection and more.",
};

export default function SecurityPage() {
  return <SecurityPageContent />;
}
