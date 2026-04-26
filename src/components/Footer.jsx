import { FaGithub, FaAtom, FaDiscord } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative mt-auto overflow-hidden border-t border-glass-border bg-bg">

            {/* Soft Glass Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 gap-10 border-b border-glass-border pb-10 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Brand Section */}
                    <div className="text-center sm:text-left">
                        <h3 className="mb-4 text-xl font-bold tracking-wide text-text">
                            Orbitium
                        </h3>

                        <p className="text-sm leading-relaxed text-text-soft sm:text-base">
                            A premium interactive chemistry platform designed to
                            explore the periodic table through immersive 3D atomic
                            visualization and scientific learning experiences.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="flex justify-center">
                        <address className="text-center not-italic">
                            <h4 className="mb-4 text-base font-semibold text-text sm:text-lg">
                                Contact
                            </h4>

                            <p className="mb-2 text-sm text-text sm:text-base">
                                Email:{" "}
                                <a
                                    href="mailto:hello@orbitium.com"
                                    className="underline transition-all duration-300 hover:text-white"
                                >
                                    hello@orbitium.com
                                </a>
                            </p>

                            <p className="text-sm text-text-muted sm:text-base">
                                Interactive Chemistry Lab
                            </p>
                        </address>
                    </div>

                    {/* Social Section */}
                    <div className="flex justify-center">
                        <div className="text-center">
                            <h4 className="mb-4 text-base font-semibold text-text sm:text-lg">
                                Connect
                            </h4>

                            <div className="flex justify-center gap-5">

                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-glass-strong"
                                >
                                    <FaGithub className="text-text-soft" />
                                </a>

                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Atom Explorer"
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-glass-strong"
                                >
                                    <FaAtom className="text-text-soft" />
                                </a>

                                <a
                                    href="https://discord.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Discord"
                                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-glass-border bg-glass transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-glass-strong"
                                >
                                    <FaDiscord className="text-text-soft" />
                                </a>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-6 text-center">
                    <p className="text-sm text-text-muted sm:text-base">
                        &copy; {new Date().getFullYear()} Orbitium. All rights reserved.
                    </p>

                    <p className="mt-2 text-xs text-text-muted sm:text-sm">
                        Designed for the future of chemistry education
                    </p>
                </div>
            </div>
        </footer>
    );
}