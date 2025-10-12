import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Yantra Guide", path: "/yantraguide" },
];

const AppHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary border-b-2 border-accent sticky top-0 left-0 right-0 z-50" role="banner">
      <div className="w-full h-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main Navigation">
          {/* Logo */}
          <Link to="/" className="text-xl lg:text-3xl font-bold text-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" >
            Yantra Computational Toolkit
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path}
                  className={({ isActive }) =>
                    `hover:text-accent transition-colors ${
                      isActive ? "text-accent font-semibold" : "text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button type="button" aria-label="Toggle Menu" onClick={() => setMenuOpen((prev) => !prev)} className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {menuOpen ? <X size={24} className="text-accent" /> : <Menu size={24} className="text-accent" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden  border-t-2 border-accent shadow-sm">
          <ul className="flex flex-col px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path}
                  className={({ isActive }) =>
                    `block hover:text-accent transition-colors ${
                      isActive ? "text-accent font-semibold" : "text-white"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
