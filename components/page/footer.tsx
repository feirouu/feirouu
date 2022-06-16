export default function Footer() {
  return (
    <footer className="container">
      <hr />
      <nav>
        <ul>
          <li>
            版权遵循{" "}
            <a
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode"
              rel="noopener noreferrer"
            >
              CC-BY-NC-ND
            </a>
          </li>
        </ul>
      </nav>
      <p>&copy; {new Date().getFullYear()} · Junyu Dev</p>
    </footer>
  );
}
