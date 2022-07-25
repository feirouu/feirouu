import { useRef } from "react";
import classNames from "classnames";
import type { Project } from "../data/projects";

type Props = {
  project: Project;
};

export default function Project({ project }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    if (project.timeline) {
      dialogRef.current?.showModal();
    }
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <article className="terminal terminal-card">
        <h2
          className={classNames("header", {
            clickable: project.timeline !== undefined,
          })}
          onClick={openDialog}
        >
          {project.name.toUpperCase()}
        </h2>
        <p className="body">
          {project.description}
          {project.link && (
            <a
              title={project.link.title}
              href={project.link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看链接
            </a>
          )}
        </p>
      </article>
      <dialog ref={dialogRef} className="dialog terminal" onClick={closeDialog}>
        <h2 style={{ paddingLeft: 70 }}>Timeline</h2>
        <section className="terminal-timeline">
          {project.timeline?.map((tl, index) => (
            <article className="timeline" key={tl.date}>
              <h2>{tl.date}</h2>
              <p>{tl.description}</p>
              {index + 1 !== project.timeline?.length && <hr />}
            </article>
          ))}
        </section>
      </dialog>
    </>
  );
}
