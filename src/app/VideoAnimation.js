// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const VideoAnimation = () => {
//   const containerRef = useRef(null);
//   const videoRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const text = textRef.current;
//     const video = videoRef.current;

//     if (!container || !text || !video) return;

//     // Match media for medium screens and up
//     const mediaQuery = window.matchMedia("(min-width: 768px)");

//     const setupAnimation = () => {
//       if (mediaQuery.matches) {
//         // Text animation timeline
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: container,
//             start: "top top",
//             end: "+=100%", // Pin for 100% of the viewport height
//             scrub: true,
//             pin: true,
//             anticipatePin: 1,
//             pinSpacing: true,
//             markers: true,
//           },
//         });

//         // Set initial state for text
//         gsap.set(text, { z: 1000, opacity: 1 });

//         // Animate text translation on z-axis on scroll
//         tl.to(text, {
//           z: 0, // Move the text towards the camera
//           duration: 1,
//           ease: "power2.inOut",
//         })
//           .to(text, {
//             z: 0, // Pass through the middle letter
//             duration: 1,
//             ease: "power2.inOut",
//           })
//           .to(text, {
//             z: -1000, // Move the text past the camera
//             duration: 1,
//             ease: "power2.inOut",
//           });

//         // Play video initially
//         video.play();

//         // ScrollTrigger for video playback control
//         ScrollTrigger.create({
//           trigger: container,
//           start: "top top",
//           end: "bottom top",
//           onEnter: () => video.play(),
//           onEnterBack: () => video.play(),
//           onLeave: () => video.pause(),
//           onLeaveBack: () => video.pause(),
//         });
//       } else {
//         // Kill all ScrollTriggers on small screens
//         ScrollTrigger.getAll().forEach((t) => t.kill());
//         // Reset video and text to default state
//         video.pause();
//         video.currentTime = 0;
//         gsap.set(text, { z: 0, opacity: 1 });
//       }
//     };

//     setupAnimation();

//     // Listen for changes in screen size
//     mediaQuery.addEventListener("change", setupAnimation);

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       mediaQuery.removeEventListener("change", setupAnimation);
//     };
//   }, []);

//   return (
//     <div className="overflow-x-hidden bg-black">
//       <div className="h-screen bg-green-600"></div>

//       <div
//         ref={containerRef}
//         className="h-screen bg-black text-[100px] md:text-[100px] lg:text-[200px] overflow-hidden relative"
//       >
//         <div
//           className="absolute inset-0 flex items-center justify-center bg-black text-white font-bold font-sans select-none"
//           style={{ mixBlendMode: "multiply", perspective: "1000px" }}
//         >
//           <div ref={textRef} style={{ transform: "translateZ(1000px)" }}>ROGFLOW</div>
//         </div>
//         <video
//           ref={videoRef}
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//         >
//           <source src="/Demo.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       <div className="h-screen bg-blue-600"></div>
//     </div>
//   );
// };

// export default VideoAnimation;
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    const video = videoRef.current;

    if (!container || !text || !video) return;

    // Match media for medium screens and up
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const setupAnimation = () => {
      if (mediaQuery.matches) {
        gsap.set(text, { z: 999, y: -8, opacity: 1 });
        video.play();

        // Text animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=100%", // Pin for 100% of the viewport height
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
          },
        });

        // Set initial state for text

        // Animate text translation on z-axis on scroll
        tl.to(text, {
          z: 0,
          duration: 1,
          ease: "power2.inOut",
        });

        // ScrollTrigger for video playback control
      } else {
        video.pause();
        // Kill all ScrollTriggers on small screens
        ScrollTrigger.getAll().forEach((t) => t.kill());
        // Reset video and text to default state
        gsap.set(text, { z: 0, opacity: 1 });
      }
    };

    setupAnimation();

    // Listen for changes in screen size
    mediaQuery.addEventListener("change", setupAnimation);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      mediaQuery.removeEventListener("change", setupAnimation);
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-black">
      <div className="h-screen bg-green-600"></div>

      <div
        ref={containerRef}
        className="h-screen bg-black text-[70px] md:text-[100px] lg:text-[200px] overflow-hidden relative"
      >
        <div
          className="absolute inset-0 flex items-center justify-center bg-black text-white font-bold font-sans select-none"
          style={{ mixBlendMode: "multiply", perspective: "1000px" }}
        >
          <div
            ref={textRef}
            className="flex"
            style={{ transformStyle: "preserve-3d" }}
          >
            {" "}
            ROGFLOW
          </div>
        </div>
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/Demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="h-screen bg-blue-600"></div>
    </div>
  );
};

export default VideoAnimation;
