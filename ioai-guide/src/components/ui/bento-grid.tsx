import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-0 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};


interface BentoGridItemProps {
    className?: string; // For grid item classes
    cardClassName?: string; // For inner card container classes
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isHovered?: boolean;
    link?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
                                                                className,
                                                                cardClassName,
                                                                title,
                                                                description,
                                                                header,
                                                                icon,
                                                                onMouseEnter,
                                                                onMouseLeave,
                                                                isHovered,
                                                                link,
                                                            }) => {
    // Prepare the content
    const content = (
        <>
            {/* Hover Background Animation */}
            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-xl"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                    />
                )}
            </AnimatePresence>
            {/* Card Content */}
            <div
                className={cn(
                    "rounded-xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 transition-colors duration-200",
                    cardClassName
                )}
            >
                <div className="relative z-10">
                    {header}
                    <div>
                        {icon}
                        <h4 className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                            {title}
                        </h4>
                        <p className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

    // Optional: Wrap the item with a Link if a link is provided
    const Wrapper = link ? Link : "div";
    const wrapperProps = link ? { href: link } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className={cn("relative group block p-2 h-full w-full", className)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {content}
        </Wrapper>
    );
};