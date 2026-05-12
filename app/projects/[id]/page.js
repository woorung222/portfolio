import { notFound } from "next/navigation";
import projects from "../../../data/projects.inventory.json";
import { getConstellation } from "../../../data/constellations";
import ProjectDetailView from "../../../components/ProjectDetailView";

function getProject(id) {
  return projects.find((project) => project.id === id);
}

function toPublicProject(project) {
  const { localSource, nextSteps, ...publicProject } = project;
  return publicProject;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};

  return {
    title: `${project.title} | 정우성 Portfolio`,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const constellation = getConstellation(project.id);
  if (!constellation) notFound();

  return <ProjectDetailView project={toPublicProject(project)} constellation={constellation} />;
}
