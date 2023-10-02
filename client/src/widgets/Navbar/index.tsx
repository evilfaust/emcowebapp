import { pages } from "./pages";

export const Navbar: React.FC = () => {
  return (
    <header>
      <nav>
        <h1>Свалкам бой!</h1>
        <ul>
          {pages.map((page) => (
            <NavLink>
              <li key={page.id}>{page.label}</li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};
