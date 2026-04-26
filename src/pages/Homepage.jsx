import { Link } from "react-router-dom";
import { FaSearch, FaFlask, FaAtom, FaStar } from "react-icons/fa";
import PeriodicTable from "../components/homepage/PeriodicTable";

export default function Home() {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-4xl border border-glass-border bg-glass px-6 py-16 backdrop-blur-2xl sm:px-10 lg:px-16">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
                </div>

                <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-sm text-primary">
                            <FaStar className="h-4 w-4" />
                            Interactive 3D Chemistry Experience
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-text sm:text-6xl">
                            Explore the
                            <span className="block text-primary">
                                Periodic Table
                            </span>
                            in 3D
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-soft sm:text-lg">
                            Click any element to visualize atomic structure,
                            orbiting electrons, nucleus, electron configuration,
                            and complete scientific properties in an immersive
                            premium learning experience.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                to="/elements"
                                className="rounded-2xl bg-primary px-6 py-4 text-center font-semibold text-bg transition-all duration-300 hover:scale-[1.02]"
                            >
                                Explore Elements
                            </Link>

                            <Link
                                to="/compare"
                                className="rounded-2xl border border-glass-border bg-glass px-6 py-4 text-center font-semibold text-text transition-all duration-300 hover:border-primary/50"
                            >
                                Compare Elements
                            </Link>
                        </div>
                    </div>

                    {/* Right Feature Cards */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                icon: FaAtom,
                                title: "3D Atomic Models"
                            },
                            {
                                icon: FaFlask,
                                title: "Scientific Properties"
                            },
                            {
                                icon: FaSearch,
                                title: "Smart Search System"
                            },
                            {
                                icon: FaStar,
                                title: "Premium Learning UI"
                            }
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="rounded-3xl border border-glass-border bg-glass p-6 backdrop-blur-xl"
                                >
                                    <Icon className="mb-4 h-8 w-8 text-primary" />

                                    <h3 className="font-semibold text-text">
                                        {item.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Real Periodic Table */}
            <PeriodicTable />
        </div>
    );
}
