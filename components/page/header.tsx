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
          <Link href="/" className="no-style" passHref={true}>
            Junyu Dev
          </Link>
        </strong>
      </section>
      <nav className="terminal-menu">
        <ul>
          {routers.map((route) => (
            <li key={route.uri}>
              <Link
                href={route.uri}
                className={classNames("menu-item", {
                  active: activeNav === route.name,
                })}
                passHref={true}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
