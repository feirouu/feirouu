import type { ReactElement } from "react";
import Head from "next/head";
import Header from "../components/page/header";
import Slogan from "../components/page/slogan";
import Project from "../components/project";
import { PROJECTS } from "../data/projects";

export default function AboutPage() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Hey there, I'm Junyu Mu. Just another full stack engineer."
        />
        <title>Profile - Junyu Dev</title>
      </Head>
      <main className="container">
        <section>
          <h2>Projects</h2>
          <section
            className="grid grid-3"
            style={{ marginBottom: "calc(var(--global-space) * 2)" }}
          >
            {PROJECTS.map((project, index) => (
              <Project key={index} project={project} />
            ))}
          </section>
        </section>
        <section>
          <h2>Stack</h2>
          <ul>
            <li>Python</li>
            <li>JavaScript</li>
          </ul>
        </section>
        <section>
          <h2>Learning</h2>
          <ul>
            <li>Rust</li>
            <li>Swift</li>
          </ul>
        </section>
        <section>
          <h2>Contact Me</h2>
          <ul>
            <li>
              <a href="mailto:me@junyu.dev" rel="noopener noreferrer">
                me@junyu.dev
              </a>
            </li>
            <li>
              <a
                href="https://github.com/JunyuMu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>{" "}
              /{" "}
              <a
                href="https://unsplash.com/@junyumu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header activeNav="about" />
      <Slogan words="Hey there, I'm Junyu Mu. Just another full stack engineer." />
      {page}
    </>
  );
};
