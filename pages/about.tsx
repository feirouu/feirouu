import type { ReactElement } from "react";
import Head from "next/head";
import Header from "../components/page/header";
import Slogan from "../components/page/slogan";

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
          <h2>Portfolios</h2>
          <ul>
            <li>
              <p>
                <strong>2020</strong>
              </p>
              <ul>
                <li>
                  <p>
                    Remake{" "}
                    <a
                      href="///note.ink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      note.ink
                    </a>
                    .
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <p>
                <strong>2019</strong>
              </p>
              <ul>
                <li>
                  <p>A simple but elegant blogging platform.</p>
                  <p>
                    <a
                      href="///note.ink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      note.ink
                    </a>
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h2>Contact Me</h2>
          <ul>
            <li>
              <a
                href="///note.ink/@Junyu"
                target="_blank"
                rel="noopener noreferrer"
              >
                note.ink
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
