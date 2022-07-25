import Link from "next/link";
import classNames from "classnames";

type Props = {
  activeNav?: string;
};

export default function Header({ activeNav }: Props) {
  const routers = [
    { uri: "/", name: "posts", label: "TOC" },
    { uri: "/about", name: "about", label: "About" },
  ];

  return (
    <header className="container terminal-nav">
      <section className="terminal-logo">
        <strong className="logo terminal-prompt">
          <Link href="/" passHref={true}>
            <a className="no-style">Junyu Dev</a>
          </Link>
        </strong>
      </section>
      <nav className="terminal-menu">
        <ul>
          {routers.map((route) => (
            <li key={route.uri}>
              <Link href={route.uri} passHref={true}>
                <a
                  className={classNames("menu-item", {
                    active: activeNav === route.name,
                  })}
                >
                  {route.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
