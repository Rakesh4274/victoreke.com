import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getProjects } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/EmptyState";

export const metadata: Metadata = {
  title: "Project | Victor Eke",
  metadataBase: new URL("https://victoreke.com/projects"),
  description: "Explore projects built by Victor Eke",
  openGraph: {
    title: "About | Victor Eke",
    url: "https://victoreke.com/projects",
    description: "Explore projects built by Victor Eke",
  },
};

export default async function Project() {
  const projects: ProjectType[] = await getProjects();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <section className="max-w-2xl mb-16">
        <h1 className="text-3xl font-blender font-black tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
          Featured projects
        </h1>
        <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
          I&apos;ve worked on tons of little projects over the years but these
          are the ones that I&apos;m most proud of. Many of them are
          open-source, so if you see something that piques your interest, check
          out the code and contribute if you have ideas on how it can be
          improved.
        </p>
      </section>

      {projects.length > 0 ? (
        <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
          {projects.map((project) => (
            <Link
              href={project.slug ? `/projects/${project.slug}` : ""}
              key={project._id}
              className={`flex items-center gap-x-4 dark:bg-[#1d1d20] bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 p-4 rounded-lg ${
                !project.slug
                  ? "cursor-not-allowed opacity-80"
                  : "cursor-pointer"
              }`}
            >
              <Image
                src={project.logo}
                width={60}
                height={60}
                alt={project.name}
                className="dark:bg-zinc-800 bg-zinc-100 rounded-md p-2"
              />
              <div>
                <h2 className="font-semibold mb-1">{project.name}</h2>
                <div className="text-sm text-zinc-400">
                  {project.slug ? project.tagline : "Coming Soon"}
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <EmptyState value="Projects" />
      )}
    </main>
  );
}
