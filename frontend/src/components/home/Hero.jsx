import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Hero() {
  const textAnimationRef = useRef(null);
  const careerTextRef = useRef(null);

  useEffect(() => {
    const typingAnimation = gsap.timeline({ repeat: -1 });
    typingAnimation
      .to(textAnimationRef.current, {
        text: "HackMate",
        duration: 2,
        ease: "power1.inOut",
      })
      .to(textAnimationRef.current, { text: "", duration: 2 });

    gsap.to(careerTextRef.current, {
      color: ["#22c55e", "#3b82f6", "#9333ea", "#eab308"],
      duration: 3,
      repeat: -1,
      ease: "none",
    });

    return () => {
      typingAnimation.kill();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-white">
      <div className="relative text-center" style={{ paddingTop: "80px" }}>
        <div style={{ transform: "translateY(-100px)" }}>
          <h1 className="text-5xl font-bold tracking-wide text-gray-800">
            <span className="font-light">Redefining</span>{" "}
            <span ref={careerTextRef} className="text-6xl font-bold highlight">
              CAREER
            </span>
          </h1>
          <h1 className="text-5xl font-bold tracking-wide text-gray-800">
            opportunities <span className="font-light">for</span> developers{" "}
            <span className="font-light">with</span>
          </h1>
          <div
            className="text-green-500 underline highlight text-5xl font-bold h-[1.5em] mt-2"
            style={{ lineHeight: "1.1em" }}
          >
            <span ref={textAnimationRef}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
