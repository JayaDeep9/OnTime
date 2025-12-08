"use client";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children
}) => {
    return (
        (<div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}>
            {children}
        </div>)
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon
}) => {
    return (
        (<div
            className={cn(
                "row-span-1 rounded-3xl group/bento hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-300 shadow-none p-6 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-cyan-500/30 backdrop-blur-[20px] justify-between flex flex-col space-y-4 hover:scale-[1.02]",
                className
            )}>
            {header}
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div
                    className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div
                    className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>)
    );
};
