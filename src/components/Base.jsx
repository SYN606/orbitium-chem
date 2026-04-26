import { Outlet } from "react-router-dom";
import {
    Navbar,
    Footer,
    ParticleNetwork,
    ScrollToTop
} from "./";

export default function Base() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-bg text-text">

            {/* Background Effects */}
            <ParticleNetwork />

            {/* Route Scroll Reset */}
            <ScrollToTop />

            {/* Global Glow Layer */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            </div>

            {/* Layout Wrapper */}
            <div className="relative z-10 flex min-h-screen flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}