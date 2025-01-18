import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Home() {
    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    IOAI Guide
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 text-center pb-5">
                    A collection of <FlipWords words={["curated", "premium", "high-quality", "advanced", "free"]}/> resources to take you from NOAI to IOAI.
                </div>
                <HoverBorderGradient
                    containerClassName="rounded-md"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                    duration={0.5}

                >
                    <a href="/admin">Let's Go</a>
                </HoverBorderGradient>
            </motion.div>
        </AuroraBackground>
    );
}