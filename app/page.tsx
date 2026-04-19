"use client";

import { useRef, useEffect } from "react";
import { Globe, ArrowRight } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/AboutSection";
import { FeaturedVideoSection } from "./components/FeaturedVideoSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ServicesSection } from "./components/ServicesSection";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationRef = useRef<number | null>(null);
  const isFadingOutRef = useRef<boolean>(false);

  const fadeVideo = (targetOpacity: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity =
        startOpacity + (targetOpacity - startOpacity) * progress;

      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(console.error);
    isFadingOutRef.current = false;
    fadeVideo(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const remainingTime = video.duration - video.currentTime;
    if (
      remainingTime <= 0.55 &&
      !isFadingOutRef.current &&
      video.duration > 0
    ) {
      isFadingOutRef.current = true;
      fadeVideo(0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    setTimeout(() => {
      video.currentTime = 0;
      video.play().catch(console.error);
      isFadingOutRef.current = false;
      fadeVideo(1, 500);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <main className="w-full bg-black min-h-screen text-white overflow-x-hidden">
      {/* SECTION 1 -- HERO */}
      <section className="min-h-screen overflow-hidden relative flex flex-col">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          muted
          autoPlay
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        />

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-serif mb-12">
            Know it then <em className="italic">all</em>.
          </h1>

          <div className="max-w-xl w-full mb-8 flex flex-col items-center gap-6">
            <form
              className="liquid-glass rounded-full w-full pl-6 pr-2 py-2 flex items-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/40 text-base"
                required
              />
              <button
                type="submit"
                className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors shrink-0 flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-white text-sm leading-relaxed px-4 text-center max-w-md">
              Stay updated with the latest news and insights. Subscribe to our
              newsletter today and never miss out on exciting updates.
            </p>

            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-4">
              Read Manifesto
            </button>
          </div>
        </div>

        {/* Social Icons Footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12 mt-auto">
          <a
            href="#"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </section>

      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </main>
  );
}
