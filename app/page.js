import projects from "../data/projects.inventory.json";
import PortfolioConstellation from "../components/PortfolioConstellation";

export default function Home() {
  const sortedProjects = [...projects].sort(
    (a, b) => a.displayPriority - b.displayPriority
  );

  return <PortfolioConstellation projects={sortedProjects} />;
}
