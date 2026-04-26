import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    Stars,
    Float
} from "@react-three/drei";
import { useMemo, useRef } from "react";

/*
    Advanced Atomic Model
    - Real shell rendering from JSON
    - Dynamic electron orbit animation
    - Proton + neutron nucleus
    - Better realism using protons/neutrons
    - Stable orbit rendering per element
*/

function Nucleus({
    protons = 1,
    neutrons = 0
}) {
    const particles = useMemo(() => {
        const total = protons + neutrons;

        return Array.from({ length: total }, (_, i) => {
            const phi = Math.acos(-1 + (2 * i) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;

            const radius = 0.55;

            return {
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi),
                type: i < protons ? "proton" : "neutron"
            };
        });
    }, [protons, neutrons]);

    return (
        <Float
            speed={2}
            rotationIntensity={0.4}
            floatIntensity={0.6}
        >
            <group>
                {particles.map((particle, index) => (
                    <mesh
                        key={index}
                        position={[
                            particle.x,
                            particle.y,
                            particle.z
                        ]}
                    >
                        <sphereGeometry args={[0.14, 32, 32]} />

                        <meshStandardMaterial
                            color={
                                particle.type === "proton"
                                    ? "#60a5fa"
                                    : "#ffffff"
                            }
                            emissive={
                                particle.type === "proton"
                                    ? "#3b82f6"
                                    : "#94a3b8"
                            }
                            emissiveIntensity={0.4}
                            metalness={0.4}
                            roughness={0.2}
                        />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}

function OrbitRing({ radius }) {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.01, 16, 200]} />

            <meshStandardMaterial
                color="#94a3b8"
                transparent
                opacity={0.18}
            />
        </mesh>
    );
}

function Electron({
    radius,
    speed,
    offset
}) {
    const ref = useRef();

    useFrame((state) => {
        const time =
            state.clock.getElapsedTime() * speed + offset;

        if (ref.current) {
            ref.current.position.x =
                Math.cos(time) * radius;

            ref.current.position.z =
                Math.sin(time) * radius;

            ref.current.position.y =
                Math.sin(time * 0.5) * 0.08;

            ref.current.rotation.y = time;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.11, 32, 32]} />

            <meshStandardMaterial
                color="#93c5fd"
                emissive="#60a5fa"
                emissiveIntensity={1}
                metalness={0.3}
                roughness={0.2}
            />
        </mesh>
    );
}

function ElectronShell({
    radius,
    electrons,
    shellIndex
}) {
    const offsets = useMemo(() => {
        return Array.from(
            { length: electrons },
            (_, i) =>
                (i / electrons) * Math.PI * 2
        );
    }, [electrons]);

    return (
        <group
            rotation={[
                0,
                shellIndex * 0.35,
                shellIndex * 0.15
            ]}
        >
            <OrbitRing radius={radius} />

            {offsets.map((offset, index) => (
                <Electron
                    key={index}
                    radius={radius}
                    speed={0.7 + shellIndex * 0.12}
                    offset={offset}
                />
            ))}
        </group>
    );
}

function AtomScene({
    shells,
    protons,
    neutrons
}) {
    return (
        <>
            {/* Background */}
            <color
                attach="background"
                args={["#050816"]}
            />

            {/* Lighting */}
            <ambientLight intensity={1.1} />

            <pointLight
                position={[8, 8, 8]}
                intensity={2}
                color="#ffffff"
            />

            <pointLight
                position={[-8, -8, -8]}
                intensity={1.3}
                color="#60a5fa"
            />

            <pointLight
                position={[0, 5, -6]}
                intensity={1}
                color="#8b5cf6"
            />

            {/* Background Stars */}
            <Stars
                radius={80}
                depth={50}
                count={2500}
                factor={3}
                saturation={0}
                fade
                speed={0.4}
            />

            {/* Real Nucleus */}
            <Nucleus
                protons={protons}
                neutrons={neutrons}
            />

            {/* Electron Shells */}
            {shells.map((count, index) => (
                <ElectronShell
                    key={index}
                    radius={1.6 + index * 1.05}
                    electrons={count}
                    shellIndex={index}
                />
            ))}

            {/* Controls */}
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

export default function AtomModel({
    element
}) {
    const shells = element?.shells || [1];
    const protons = element?.protons || 1;
    const neutrons = element?.neutrons || 0;

    return (
        <div className="relative h-130 w-full overflow-hidden rounded-4xl border border-glass-border bg-glass backdrop-blur-2xl">

            {/* Label */}
            <div className="absolute left-6 top-6 z-10 rounded-2xl border border-glass-border bg-glass px-4 py-2 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
                    Atomic Model
                </p>

                <p className="mt-1 font-medium text-text">
                    {element?.name || "Element"} Atom
                </p>
            </div>

            {/* Small Meta */}
            <div className="absolute right-6 top-6 z-10 rounded-2xl border border-glass-border bg-glass px-4 py-2 backdrop-blur-xl">
                <p className="text-xs text-text-muted">
                    P: {protons} • N: {neutrons}
                </p>

                <p className="text-xs text-text-muted">
                    Shells: {shells.join(" / ")}
                </p>
            </div>

            {/* Scene */}
            <Canvas
                camera={{
                    position: [0, 4, 8],
                    fov: 50
                }}
            >
                <AtomScene
                    shells={shells}
                    protons={protons}
                    neutrons={neutrons}
                />
            </Canvas>
        </div>
    );
}