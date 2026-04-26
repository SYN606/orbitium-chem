import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import elementsData from "../data/elements.json";
import AtomModel from "../components/homepage/AtomModel";

import {
    FaArrowLeft,
    FaAtom,
    FaFlask,
    FaLayerGroup,
    FaHistory,
    FaVial,
    FaShieldAlt,
    FaExpand,
    FaBalanceScale,
    FaRadiation,
} from "react-icons/fa";

const elements = elementsData.elements;

export default function ElementDetails() {
    const { symbol } = useParams();

    const element = useMemo(
        () =>
            elements.find(
                (item) => item.symbol.toLowerCase() === symbol?.toLowerCase()
            ),
        [symbol]
    );

    const compareSuggestion = useMemo(() => {
        if (!element) return null;

        return (
            elements.find(
                (item) =>
                    item.category === element.category &&
                    item.atomicNumber !== element.atomicNumber
            ) || null
        );
    }, [element]);

    if (!element) {
        return (
            <section className="py-24">
                <div className="mx-auto max-w-3xl rounded-4xl border border-glass-border bg-glass p-10 text-center backdrop-blur-2xl">
                    <h1 className="text-4xl font-bold text-text">Element Not Found</h1>

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

    const featuredFact =
        element.didYouKnow ||
        element.summary ||
        "Every element carries unique atomic behavior and scientific importance.";

    const isRadioactive = element.radioactive;

    return (
        <section className="space-y-8">
            <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-2xl border border-glass-border bg-glass px-5 py-3 text-sm font-medium text-text transition-all duration-300 hover:border-white/30"
            >
                <FaArrowLeft />
                Back to Periodic Table
            </Link>

            <div className="grid gap-4 md:grid-cols-4">
                {[
                    ["Atomic Number", `#${element.atomicNumber}`],
                    ["Atomic Mass", element.atomicMass || "—"],
                    ["Standard State", element.standardState || "—"],
                    ["Category", element.category || "—"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-3xl border border-glass-border bg-glass p-5 backdrop-blur-xl"
                    >
                        <p className="text-xs uppercase tracking-[0.14em] text-text-muted">
                            {label}
                        </p>
                        <p className="mt-2 text-xl font-semibold text-text">{value}</p>
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-4xl border border-primary/20 bg-glass p-7 backdrop-blur-2xl"
            >
                <p className="text-sm font-medium text-primary">Did You Know?</p>
                <h2 className="mt-2 text-2xl font-bold text-text">
                    {element.name} ({element.symbol})
                </h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-text-soft">
                    {featuredFact}
                </p>
            </motion.div>

            <div className="grid gap-8 xl:grid-cols-[520px_1fr]">
                <div className="space-y-8">
                    <div className="rounded-4xl border border-glass-border bg-glass p-5 backdrop-blur-2xl">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-text-muted">3D Atomic Structure</p>
                                <h3 className="text-xl font-semibold text-text">
                                    Interactive Atom Viewer
                                </h3>
                            </div>

                            <button className="inline-flex items-center gap-2 rounded-xl border border-glass-border px-4 py-2 text-sm text-text transition hover:border-white/30">
                                <FaExpand />
                                Fullscreen
                            </button>
                        </div>

                        <AtomModel element={element} />
                    </div>

                    <div className="rounded-4xl border border-glass-border bg-glass p-8 backdrop-blur-2xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm text-text-muted">Element Identity</p>
                                <h1 className="mt-2 text-7xl font-bold leading-none text-primary">
                                    {element.symbol}
                                </h1>
                                <h2 className="mt-4 text-3xl font-semibold text-text">
                                    {element.name}
                                </h2>
                                <p className="mt-2 text-lg text-text-soft">{element.category}</p>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-glass-border bg-glass-strong">
                                <FaAtom className="text-xl text-primary" />
                            </div>
                        </div>

                        <p className="mt-6 leading-relaxed text-text-soft">
                            {element.summary || featuredFact}
                        </p>
                    </div>

                    <InfoCard
                        icon={<FaHistory />}
                        title="Discovery Timeline"
                        content={`${element.discoveredBy || "Unknown"} • ${element.yearDiscovered || "—"
                            }`}
                    />

                    <InfoCard
                        icon={<FaShieldAlt />}
                        title="Biological Role / Safety"
                        content={
                            element.biologicalRole ||
                            element.toxicity ||
                            "No safety information available"
                        }
                    />

                    {isRadioactive && (
                        <InfoCard
                            icon={<FaRadiation />}
                            title="Radioactive Element"
                            content="This element is radioactive and may undergo natural decay over time. Future decay visualization can be connected here."
                        />
                    )}
                </div>

                <div className="space-y-8">
                    <div className="rounded-4xl border border-glass-border bg-glass p-8 backdrop-blur-2xl">
                        <div className="flex items-center gap-3">
                            <FaLayerGroup className="text-primary" />
                            <h3 className="text-2xl font-bold text-text">
                                Scientific Properties
                            </h3>
                        </div>

                        <p className="mt-3 text-text-soft">
                            Complete atomic, chemical, and physical properties for {element.name}.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Property label="Group" value={element.group} />
                        <Property label="Period" value={element.period} />
                        <Property label="Block" value={element.block} />
                        <Property label="Series" value={element.series} />
                        <Property label="Phase" value={element.phase} />
                        <Property label="Density" value={element.density} />
                        <Property label="Atomic Radius" value={element.atomicRadius} />
                        <Property
                            label="Electronegativity"
                            value={element.electronegativity}
                        />
                        <Property
                            label="Ionization Energy"
                            value={element.ionizationEnergy}
                        />
                        <Property label="Melting Point" value={element.meltingPoint} />
                        <Property label="Boiling Point" value={element.boilingPoint} />
                        <Property
                            label="Oxidation States"
                            value={element.oxidationStates}
                        />
                        <Property
                            label="Valence Electrons"
                            value={element.valenceElectrons}
                        />
                        <Property
                            label="Electron Configuration"
                            value={element.electronConfiguration}
                            wide
                        />
                    </div>

                    {compareSuggestion && (
                        <div className="rounded-4xl border border-glass-border bg-glass p-6 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                <FaBalanceScale className="text-primary" />
                                <h4 className="font-semibold text-text">Compare Element</h4>
                            </div>

                            <p className="mt-3 text-text-soft">
                                Compare {element.name} with {compareSuggestion.name} from the same
                                category for deeper understanding.
                            </p>
                        </div>
                    )}

                    <ListCard icon={<FaVial />} title="Common Uses" items={element.uses} />
                    <ListCard
                        icon={<FaAtom />}
                        title="Known Isotopes"
                        items={element.isotopes}
                    />
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
            className={`rounded-3xl border border-glass-border bg-glass p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 ${wide ? "sm:col-span-2 lg:col-span-3" : ""
                }`}
        >
            <p className="text-xs uppercase tracking-[0.15em] text-text-muted">
                {label}
            </p>

            <p className="mt-3 text-base font-medium text-text">{value || "—"}</p>
        </div>
    );
}

function InfoCard({ icon, title, content }) {
    return (
        <div className="rounded-[28px] border border-glass-border bg-glass p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="text-primary">{icon}</div>
                <h4 className="font-semibold text-text">{title}</h4>
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
                <div className="text-primary">{icon}</div>
                <h4 className="font-semibold text-text">{title}</h4>
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
                    <p className="text-text-soft">No data available</p>
                )}
            </div>
        </div>
    );
}
    