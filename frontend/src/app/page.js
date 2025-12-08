"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const words = "Transforming Your Train Journey with Real-Time Precision";

  const features = [
    {
      title: "Live Status",
      description: "Track any train in real-time with zero latency updates.",
      link: "/search",
    },
    {
      title: "Route Analysis",
      description: "Visual route maps with delay prediction markers.",
      link: "/search",
    },
    {
      title: "Smart Alerts",
      description: "Get notified via WhatsApp or push notifications instantly.",
      link: "/signup",
    },
    {
      title: "PNR Status",
      description: "Check prediction probability with industry-leading accuracy.",
      link: "/search",
    },
    {
      title: "Platform Locate",
      description: "Crowdsourced platform numbers for every station.",
      link: "/live-station",
    },
    {
      title: "Saved Routes",
      description: "One-tap access to your daily commute details.",
      link: "/saved-routes",
    },
  ];

  return (
    <div >

      <Navbar />

      <div className="relative">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-8 mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white/10 backdrop-blur-md mb-8 hover:bg-white/20 transition">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="text-sm font-medium text-cyan-600">Live Train Tracking V2.0</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground">
            Train Tracking for <br />
            <span className="text-cyan-500">the rest of us.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Seamlessly track trains across India with zero latency.  
            No complex captchas. Just perfect accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link href="/search">
              <Button className="h-14 px-10 text-lg rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)]">
                Start Tracking Now
              </Button>
            </Link>

            <Link href="/live-station">
              <Button variant="ghost" className="h-14 px-10 text-lg rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/20 backdrop-blur-md transition-all">
                Watch Demo →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-20 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Works on <span className="text-cyan-500">everything.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Don’t let legacy systems slow you down. Ontime bridges the gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-500 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
            How it <span className="text-cyan-500">Works</span>
          </h2>

          <div className="relative border-l border-white/20 ml-6 md:ml-12 space-y-16">

            <div className="relative pl-12 md:pl-20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-lg" />

              <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all">
                <span className="text-cyan-500 font-mono text-xl mb-4 block">01</span>
                <h3 className="text-2xl font-bold mb-3">Search Your Train</h3>
                <p className="text-muted-foreground">
                  Enter train number or station code. Our system locks onto real-time GPS instantly.
                </p>
              </div>
            </div>

            <div className="relative pl-12 md:pl-20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-400" />

              <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all">
                <span className="text-cyan-500 font-mono text-xl mb-4 block">02</span>
                <h3 className="text-2xl font-bold mb-3">Get Live Status</h3>
                <p className="text-muted-foreground">
                  View precise location, delay predictions & platform numbers.
                </p>
              </div>
            </div>

            <div className="relative pl-12 md:pl-20">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-400" />

              <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all">
                <span className="text-cyan-500 font-mono text-xl mb-4 block">03</span>
                <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Get WhatsApp alerts for delays or platform changes instantly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-32">
        <div className="max-w-2xl mx-auto p-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-300">
            Ready to travel smarter?
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto my-4 text-lg">
            Join thousands of daily commuters who save time using Ontime.
          </p>

          <Link href="/signup">
            <Button className="mt-6 px-8 py-4 rounded-full bg-cyan-600 text-white text-xl hover:bg-cyan-700 transition-transform hover:-translate-y-1 shadow-xl">
              Get Started →
            </Button>
          </Link>
        </div>

        <BackgroundBeams />
      </div>

    </div>
  );
}
