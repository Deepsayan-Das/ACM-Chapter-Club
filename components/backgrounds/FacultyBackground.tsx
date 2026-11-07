"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const academicIcons = ["🎓", "📚", "🏛️", "📜", "💡", "📖", "✨", "🔬"];

export default function FacultyBackground() {
    const [floatingIcons, setFloatingIcons] = useState<{ id: number; icon: string; x: number; y: number; delay: number }[]>([]);

    useEffect(() => {
        const icons = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            icon: academicIcons[Math.floor(Math.random() * academicIcons.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3,
        }));
        setFloatingIcons(icons);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-indigo-50/40 to-blue-50/60" />

            {/* Floating academic icons */}
            {floatingIcons.map((item) => (
                <motion.div
                    key={item.id}
                    className="absolute text-3xl"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        opacity: 0.25,
                    }}
                    animate={{
                        y: [0, -18, 0],
                        rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 2,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut",
                    }}
                >
                    {item.icon}
                </motion.div>
            ))}

            {/* Subtle ambient lighting */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-indigo-500/5"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

