import { useParams, Link } from "react-router-dom";
import elementsData from "../data/elements.json";
import AtomModel from "../components/homepage/AtomModel";

import {
    FaArrowLeft,
    FaAtom,
    FaFlask,
    FaLayerGroup,
    FaHistory,
    FaVial,
    FaShieldAlt
} from "react-icons/fa";

const elements = elementsData.elements;

export default function ElementDetails() {
    const { symbol } = useParams();

    const element = elements.find(
        (item) =>
            item.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (!element) {
        return (
            <section className="py-24">
                <div className="mx-auto max-w-3xl rounded-4xl border border-glass-border bg-glass p-10 text-center backdrop-blur-2xl">
                    <h1 className="text-4xl font-bold text-text">
                        Element Not Found
                    </h1>

                    <p className="mt-4 text-text-soft">
                        The requested element could not be found in the periodic table.
                    </p>

                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-glass-border bg-glass px-6 py-4 font-medium text-text transition-all duration-300 hover:border-white/30"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-10">
            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-2xl border border-glass-border bg-glass px-5 py-3 text-sm font-medium text-text transition-all duration-300 hover:border-white/30"
            >
                <FaArrowLeft />
                Back to Periodic Table
            </Link>

            {/* Main Layout */}
            <div className="grid gap-8 xl:grid-cols-[500px_1fr]">

                {/* LEFT SIDE */}
                <div className="space-y-8">

                    {/* 3D Atomic Model */}
                    <AtomModel element={element} />

                    {/* Element Main Card */}
                    <div className="rounded-4xl border border-glass-border bg-glass p-8 backdrop-blur-2xl">

                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-text-muted">
                                    Atomic Number
                                </p>

                                <h2 className="mt-1 text-3xl font-bold text-text">
                                    #{element.atomicNumber}
                                </h2>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-glass-border bg-glass-strong">
                                <FaAtom className="text-xl text-primary" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <h1 className="text-8xl font-bold leading-none text-primary">
                                {element.symbol}
                            </h1>

                            <h2 className="mt-4 text-3xl font-semibold text-text">
                                {element.name}
                            </h2>

                            <p className="mt-3 text-lg text-text-soft">
                                {element.category}
                            </p>

                            <p className="mt-5 leading-relaxed text-text-soft">
                                {element.summary || element.didYouKnow || element.fact}
                            </p>
                        </div>

                        <div className="mt-8 rounded-3xl border border-glass-border bg-glass-strong p-5">
                            <p className="text-sm text-text-muted">
                                Atomic Mass
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-text">
                                {element.atomicMass}
                            </p>
                        </div>
                    </div>

                    {/* Scientific Fact */}
                    <InfoCard
                        icon={<FaFlask />}
                        title="Scientific Insight"
                        content={element.didYouKnow || element.fact}
                    />

                    {/* Discovery */}
                    <InfoCard
                        icon={<FaHistory />}
                        title="Discovery & History"
                        content={`${element.discoveredBy || "Unknown"} • ${element.yearDiscovered || "—"}`}
                    />

                    {/* Safety */}
                    <InfoCard
                        icon={<FaShieldAlt />}
                        title="Biological Role / Safety"
                        content={element.biologicalRole || element.toxicity || "No data available"}
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-8">

                    {/* Header */}
                    <div className="rounded-4xl border border-glass-border bg-glass p-8 backdrop-blur-2xl">
                        <div className="flex items-center gap-3">
                            <FaLayerGroup className="text-primary" />

                            <h3 className="text-2xl font-bold text-text">
                                Scientific Properties
                            </h3>
                        </div>

                        <p className="mt-3 text-text-soft">
                            Complete atomic, chemical, and physical properties
                            for {element.name}.
                        </p>
                    </div>

                    {/* Main Properties */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Property label="Atomic Number" value={element.atomicNumber} />
                        <Property label="Atomic Mass" value={element.atomicMass} />
                        <Property label="Group" value={element.group} />
                        <Property label="Period" value={element.period} />
                        <Property label="Block" value={element.block} />
                        <Property label="Series" value={element.series} />
                        <Property label="Phase" value={element.phase} />
                        <Property label="Density" value={element.density} />
                        <Property label="Standard State" value={element.standardState} />
                        <Property label="Atomic Radius" value={element.atomicRadius} />
                        <Property label="Electronegativity" value={element.electronegativity} />
                        <Property label="Ionization Energy" value={element.ionizationEnergy} />
                        <Property label="Melting Point" value={element.meltingPoint} />
                        <Property label="Boiling Point" value={element.boilingPoint} />
                        <Property label="Oxidation States" value={element.oxidationStates} />
                        <Property label="Valence Electrons" value={element.valenceElectrons} />
                        <Property
                            label="Electron Configuration"
                            value={element.electronConfiguration}
                            wide
                        />
                    </div>

                    {/* Uses */}
                    <ListCard
                        icon={<FaVial />}
                        title="Common Uses"
                        items={element.uses}
                    />

                    {/* Isotopes */}
                    <ListCard
                        icon={<FaAtom />}
                        title="Known Isotopes"
                        items={element.isotopes}
                    />

                    {/* Common Compounds */}
                    <ListCard
                        icon={<FaFlask />}
                        title="Common Compounds"
                        items={element.commonCompounds}
                    />
                </div>
            </div>
        </section>
    );
}

function Property({ label, value, wide = false }) {
    return (
        <div
            className={`
                rounded-3xl
                border
                border-glass-border
                bg-glass
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/20
                ${wide ? "sm:col-span-2 lg:col-span-3" : ""}
            `}
        >
            <p className="text-xs uppercase tracking-[0.15em] text-text-muted">
                {label}
            </p>

            <p className="mt-3 text-base font-medium text-text">
                {value || "—"}
            </p>
        </div>
    );
}

function InfoCard({ icon, title, content }) {
    return (
        <div className="rounded-[28px] border border-glass-border bg-glass p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="text-primary">
                    {icon}
                </div>

                <h4 className="font-semibold text-text">
                    {title}
                </h4>
            </div>

            <p className="mt-4 leading-relaxed text-text-soft">
                {content || "No information available"}
            </p>
        </div>
    );
}

function ListCard({ icon, title, items = [] }) {
    return (
        <div className="rounded-[28px] border border-glass-border bg-glass p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="text-primary">
                    {icon}
                </div>

                <h4 className="font-semibold text-text">
                    {title}
                </h4>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                {items?.length ? (
                    items.map((item, index) => (
                        <span
                            key={index}
                            className="rounded-2xl border border-glass-border bg-glass-strong px-4 py-2 text-sm text-text"
                        >
                            {item}
                        </span>
                    ))
                ) : (
                    <p className="text-text-soft">
                        No data available
                    </p>
                )}
            </div>
        </div>
    );
}