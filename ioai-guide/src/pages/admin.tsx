import { useState } from 'react'
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconBolt,
    IconChartBar,
    IconClipboardCopy, IconClock,
    IconFileBroken,
    IconSignature,
    IconFlame,
    IconGraph,
    IconTableColumn, IconTransform,
} from "@tabler/icons-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function Admin() {
    const [searchQuery, setSearchQuery] = useState('')
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


    // Filter records based on search query (static filtering)
    const filteredRecords = items.filter(record =>
        record.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchQuery(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };


    return (
        <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-semibold mb-6">Admin Panel</h2>
            <div className="mb-6 flex-row">
                    <h2 className="mb-10 text-center sm:text-5xl dark:text-white text-black">
                        Find Anything
                    </h2>
                    <PlaceholdersAndVanishInput
                        placeholders={["Machine Learning", "Convolutional Neural Network", "Temporal Convolutional Network", "Transformer Models", "ReLu Layer", "Pytorch Basics"]}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
            </div>

            <div>
                {filteredRecords.length > 0 ? (
                    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                        {filteredRecords.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                className={item.className}
                                icon={item.icon}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                isHovered={hoveredIndex===i}
                            />
                        ))}
                    </BentoGrid>
                ): (
                    <p className="text-gray-500">No records found.</p>
                )}
            </div>
        </div>
    )
}


const Skeleton = () => (
    <div className="mb-5 flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const items = [
    {
        title: "Machine Learning Fundamentals",
        description: "Dive into the basics of machine learning and its real-world applications.",
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Convolutional Neural Networks",
        description: "Learn how CNNs revolutionize image and video processing tasks.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconGraph className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Temporal Convolutional Networks",
        description: "Understand how TCNs enable efficient sequence modeling.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconClock className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Transformer Models Explained",
        description: "Explore the architecture behind state-of-the-art NLP systems.",
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <IconTransform className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Role of ReLU Layers",
        description: "Discover how the ReLU activation function drives deep learning.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconBolt className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Getting Started with PyTorch",
        description: "Learn the fundamentals of PyTorch for building deep learning models.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconFlame className="h-4 w-4 text-neutral-500" />,
    },
];
