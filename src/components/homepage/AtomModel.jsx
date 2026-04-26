import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Stars,
    Float,
    Html,
} from "@react-three/drei";
import { useMemo, useRef } from "react";

const shellLabels = ["K", "L", "M", "N", "O", "P", "Q"];

const categoryColors = {
    "Noble Gas": "#a78bfa",
    "Nonmetal": "#38bdf8",
    "Alkali Metal": "#fb923c",
    "Alkaline Earth Metal": "#facc15",
    "Transition Metal": "#06b6d4",
    Halogen: "#34d399",
    Actinide: "#22c55e",
    Lanthanide: "#d946ef",
    default: "#60a5fa",
};

function Nucleus({ protons = 1, neutrons = 0, glowColor }) {
    const particles = useMemo(() => {
        const total = Math.max(protons + neutrons, 1);

        return Array.from({ length: total }, (_, i) => {
            const phi = Math.acos(-1 + (2 * i) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;
            const radius = 0.52;

            return {
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi),
                type: i < protons ? "proton" : "neutron",
            };
        });
    }, [protons, neutrons]);

    return (
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.55}>
            <group>
                {particles.map((particle, index) => (
                    <mesh key={index} position={[particle.x, particle.y, particle.z]}>
                        <sphereGeometry args={[0.14, 32, 32]} />
                        <meshStandardMaterial
                            color={particle.type === "proton" ? glowColor : "#ffffff"}
                            emissive={particle.type === "proton" ? glowColor : "#94a3b8"}
                            emissiveIntensity={0.7}
                            metalness={0.4}
                            roughness={0.2}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

function OrbitRing({ radius, label, electrons }) {
    return (
        <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.01, 16, 200]} />
                <meshStandardMaterial
                    color="#94a3b8"
                    transparent
                    opacity={0.18}
                />
            </mesh>

            <Html position={[radius, 0.2, 0]} center>
                <div className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-[10px] whitespace-nowrap text-white backdrop-blur-md">
                    {label} Shell • {electrons}e⁻
                </div>
            </Html>
        </group>
    );
}

function Electron({ radius, speed, offset, glowColor }) {
    const ref = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime * speed + offset;

        if (ref.current) {
            ref.current.position.x = Math.cos(time) * radius;
            ref.current.position.z = Math.sin(time) * radius;
            ref.current.position.y = Math.sin(time * 0.5) * 0.08;
            ref.current.rotation.y = time;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.11, 32, 32]} />
            <meshStandardMaterial
                color={glowColor}
                emissive={glowColor}
                emissiveIntensity={1}
                metalness={0.3}
                roughness={0.2}
            />
        </mesh>
    );
}

function ElectronShell({ radius, electrons, shellIndex, glowColor }) {
    const offsets = useMemo(
        () =>
            Array.from(
                { length: electrons },
                (_, i) => (i / Math.max(electrons, 1)) * Math.PI * 2
            ),
        [electrons]
    );

    return (
        <group rotation={[0, shellIndex * 0.35, shellIndex * 0.15]}>
            <OrbitRing
                radius={radius}
                label={shellLabels[shellIndex] || `Shell ${shellIndex + 1}`}
                electrons={electrons}
            />

            {offsets.map((offset, index) => (
                <Electron
                    key={index}
                    radius={radius}
                    speed={0.7 + shellIndex * 0.12}
                    offset={offset}
                    glowColor={glowColor}
                />
            ))}
        </group>
    );
}

function AtomScene({ shells, protons, neutrons, glowColor }) {
    return (
        <>
            <color attach="background" args={["#050816"]} />

            <ambientLight intensity={1.1} />
            <pointLight position={[8, 8, 8]} intensity={2} color="#ffffff" />
            <pointLight position={[-8, -8, -8]} intensity={1.3} color={glowColor} />
            <pointLight position={[0, 5, -6]} intensity={1} color={glowColor} />

            <Stars
                radius={80}
                depth={50}
                count={2500}
                factor={3}
                saturation={0}
                fade
                speed={0.4}
            />

            <Nucleus
                protons={protons}
                neutrons={neutrons}
                glowColor={glowColor}
            />

            {shells.map((count, index) => (
                <ElectronShell
                    key={index}
                    radius={1.6 + index * 1.05}
                    electrons={count}
                    shellIndex={index}
                    glowColor={glowColor}
                />
            ))}

            <OrbitControls
                enableZoom
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
                minDistance={4}
                maxDistance={14}
            />
        </>
    );
}

export default function AtomModel({ element }) {
    const shells = element?.shells || [1];
    const protons = element?.protons || 1;
    const electrons = element?.electrons || protons;
    const neutrons = element?.neutrons || 0;
    const glowColor =
        categoryColors[element?.category] || categoryColors.default;

    return (
        <div className="relative h-130 w-full overflow-hidden rounded-4xl border border-glass-border bg-glass backdrop-blur-2xl">
            <div className="absolute left-6 top-6 z-10 rounded-2xl border border-glass-border bg-glass px-4 py-2 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                    Atomic Model
                </p>
                <p className="mt-1 font-medium text-text">
                    {element?.name || "Element"} Atom
                </p>
            </div>

            <div className="absolute right-6 top-6 z-10 rounded-2xl border border-glass-border bg-glass px-4 py-2 backdrop-blur-xl">
                <p className="text-xs text-text-muted">
                    P: {protons} • E: {electrons} • N: {neutrons}
                </p>
                <p className="text-xs text-text-muted">
                    Shells: {shells.join(" / ")}
                </p>
            </div>

            <Canvas camera={{ position: [0, 4, 8], fov: 50 }}>
                <AtomScene
                    shells={shells}
                    protons={protons}
                    neutrons={neutrons}
                    glowColor={glowColor}
                />
            </Canvas>
        </div>
    );
}
