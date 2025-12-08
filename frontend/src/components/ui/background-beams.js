"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({
    className
}) => {
    return (
        (<div
            className={cn(
                "absolute h-full w-full inset-0 bg-background/95 opacity-40",
                className
            )}
            style={{
                backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 800 800\\' xmlns:v=\\'https://vecta.io/nano\\'%3E%3Cdefs%3E%3Cpattern id=\\'grid-pattern\\' width=\\'50\\' height=\\'50\\' patternUnits=\\'userSpaceOnUse\\'%3E%3Cpath d=\\'M50 0L0 0 0 50\\' fill=\\'none\\' stroke=\\'rgba(255,255,255,0.1)\\' stroke-width=\\'1\\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\\'800\\' height=\\'800\\' fill=\\'url(%23grid-pattern)\\'/%3E%3C/svg%3E')",
                backgroundRepeat: "repeat",
                maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
            }}></div>)
    );
};
