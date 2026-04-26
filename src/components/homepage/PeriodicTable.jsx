import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import elementsData from "../../data/elements.json";

const elements = elementsData.elements;
function getCategoryStyles(category) {
    const map = {
        "Nonmetal": {
            border: "border-sky-400/60 hover:border-sky-300",
            text: "text-sky-300"
        },

        "Noble Gas": {
            border: "border-violet-400/60 hover:border-violet-300",
            text: "text-violet-300"
        },

        "Alkali Metal": {
            border: "border-orange-400/60 hover:border-orange-300",
            text: "text-orange-300"
        },

        "Alkaline Earth Metal": {
            border: "border-yellow-400/60 hover:border-yellow-300",
            text: "text-yellow-300"
        },

        "Transition Metal": {
            border: "border-cyan-400/60 hover:border-cyan-300",
            text: "text-cyan-300"
        },

        "Halogen": {
            border: "border-emerald-400/60 hover:border-emerald-300",
            text: "text-emerald-300"
        },

        "Metalloid": {
            border: "border-pink-400/60 hover:border-pink-300",
            text: "text-pink-300"
        },

        "Post-transition Metal": {
            border: "border-slate-300/60 hover:border-slate-200",
            text: "text-slate-200"
        }
    };

    return (
        map[category] || {
            border: "border-white/40 hover:border-white/70",
            text: "text-white"
        }
    );
}

function ElementCard({ element, isSpecialRow = false }) {
    const styles = getCategoryStyles(element.category);

    return (
        <motion.div
            whileHover={{ y: -3, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`
                group
                min-h-23.75
                rounded-xl
                border
                ${styles.border}
                bg-glass
                backdrop-blur-xl
                p-2.5
                transition-all
                duration-300
                hover:shadow-xl
                hover:shadow-white/5
            `}
            style={
                !isSpecialRow
                    ? {
                        gridColumn: element.group,
                        gridRow: element.period
                    }
                    : undefined
            }
        >
            <Link to={`/element/${element.symbol.toLowerCase()}`}>
                {/* Atomic Number */}
                <div className="text-[11px] font-medium text-text-muted">
                    {element.atomicNumber}
                </div>

                {/* Symbol */}
                <h3
                    className={`mt-1 text-xl font-bold ${styles.text}`}
                >
                    {element.symbol}
                </h3>

                {/* Name */}
                <p className="mt-1 truncate text-xs font-medium text-text-soft">
                    {element.name}
                </p>

                {/* Atomic Mass */}
                <p className="mt-1 text-[11px] text-text-muted">
                    {element.atomicMass}
                </p>
            </Link>
        </motion.div>
    );
}

export default function PeriodicTable() {
    const mainTable = elements.filter(
        (element) =>
            !(
                element.atomicNumber >= 57 &&
                element.atomicNumber <= 71
            ) &&
            !(
                element.atomicNumber >= 89 &&
                element.atomicNumber <= 103
            )
    );

    const lanthanides = elements.filter(
        (element) =>
            element.atomicNumber >= 57 &&
            element.atomicNumber <= 71
    );

    const actinides = elements.filter(
        (element) =>
            element.atomicNumber >= 89 &&
            element.atomicNumber <= 103
    );

    return (
        <section className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-text">
                    Periodic Table
                </h2>

                <p className="mt-2 text-text-soft">
                    Interactive Bohr-style layout with clickable
                    elements and detailed atomic structure
                    visualization
                </p>
            </div>

            {/* Main Periodic Table */}
            <div className="w-full overflow-hidden">
                <div
                    className="grid grid-cols-18 gap-2"
                    style={{
                        gridTemplateColumns:
                            "repeat(18, minmax(58px, 1fr))"
                    }}
                >
                    {mainTable.map((element) => (
                        <ElementCard
                            key={element.atomicNumber}
                            element={element}
                        />
                    ))}
                </div>
            </div>

            {/* Lanthanides */}
            <div className="space-y-4">
                <p className="text-sm font-medium text-text-muted">
                    Lanthanides
                </p>

                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns:
                            "repeat(15, minmax(58px, 1fr))"
                    }}
                >
                    {lanthanides.map((element) => (
                        <ElementCard
                            key={element.atomicNumber}
                            element={element}
                            isSpecialRow
                        />
                    ))}
                </div>
            </div>

            {/* Actinides */}
            <div className="space-y-4">
                <p className="text-sm font-medium text-text-muted">
                    Actinides
                </p>

                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns:
                            "repeat(15, minmax(58px, 1fr))"
                    }}
                >
                    {actinides.map((element) => (
                        <ElementCard
                            key={element.atomicNumber}
                            element={element}
                            isSpecialRow
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}