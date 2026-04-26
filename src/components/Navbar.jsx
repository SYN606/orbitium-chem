import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaAtom } from "react-icons/fa";

export default function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" }
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "unset";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="sticky top-0 z-50 border-b border-glass-border bg-bg/70 backdrop-blur-2xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="group flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass backdrop-blur-xl">
                            <FaAtom className="text-lg text-text transition-transform duration-700 group-hover:rotate-180" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold tracking-wide text-text sm:text-2xl">
                                Orbitium
                            </h1>

                            <p className="text-[10px] uppercase tracking-[0.25em] text-text-muted sm:text-xs">
                                Interactive Chemistry Lab
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden items-center gap-8 md:flex">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${isActive(link.path)
                                            ? "text-text"
                                            : "text-text-muted hover:text-text"
                                        }`}
                                >
                                    {link.name}

                                    <span
                                        className={`absolute -bottom-2 left-0 h-[1.5px] bg-white transition-all duration-300 ${isActive(link.path)
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="z-50 text-text transition-colors duration-300 hover:text-white md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <FaTimes size={22} />
                        ) : (
                            <FaBars size={22} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    onClick={closeMenu}
                />

                {/* Drawer */}
                <div
                    className={`absolute right-0 top-0 h-full w-[320px] border-l border-glass-border bg-surface/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ${isMenuOpen
                            ? "translate-x-0"
                            : "translate-x-full"
                        }`}
                >
                    <div className="flex h-full flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-glass-border p-6">
                            <div>
                                <h2 className="text-xl font-bold text-text">
                                    Orbitium
                                </h2>

                                <p className="text-xs text-text-muted">
                                    Explore atoms in 3D
                                </p>
                            </div>

                            <button
                                onClick={closeMenu}
                                className="text-text-muted transition-colors duration-300 hover:text-text"
                            >
                                <FaTimes size={22} />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <nav className="flex-1 p-6">
                            <ul className="space-y-6">
                                {links.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            onClick={closeMenu}
                                            className={`block text-base font-medium transition-colors duration-300 ${isActive(link.path)
                                                    ? "text-text"
                                                    : "text-text-soft hover:text-text"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Footer */}
                        <div className="border-t border-glass-border p-6">
                            <p className="text-center text-sm text-text-muted">
                                Orbitium
                            </p>

                            <p className="mt-1 text-center text-xs text-text-muted">
                                Premium 3D Periodic Table Experience
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}