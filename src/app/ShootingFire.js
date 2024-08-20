import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./globals.css";

const ShootingFire = () => {
  const galleryRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const blocks = galleryRef.current.querySelectorAll(".blockk");
    const totalDuration = 25; // Increased total duration for slower animation
    const stagger = totalDuration / blocks.length; // Time between each animation start

    blocks.forEach((block, index) => {
      const delay = index * stagger;

      gsap.set(block, {
        x: 0,
        y: 0,
        z: -100,
        opacity: 0,
      });

      gsap.set(block.querySelector(".overlay"), {
        opacity: 1,
      });

      const tl = gsap.timeline({
        repeat: -1,
        delay: delay,
        onRepeat: () => {
          gsap.set(block, {
            x: 0,
            y: 0,
            z: -100,
            opacity: 0,
          });
        },
      });

      // Fade in the image in the first 4 seconds
      tl.to(block, {
        opacity: 1,
        duration: 4,
        ease: "power1.out",
      });

      // Main animation
      tl.to(
        block,
        {
          x: () => gsap.utils.random(-70, 70), // Reduced horizontal movement range
          y: 20, // Reduced vertical movement
          z: 900, // Reduced depth
          duration: totalDuration - 4, // Subtract the 4 seconds used for fade-in
          ease: "power1.out",
        },
        "-=4"
      ); // Start this animation 4 seconds before the previous one ends

      tl.fromTo(
        block.querySelector(".overlay"),
        { background: "#000" },
        {
          background: "#00000085",
          duration: totalDuration / 2,
          ease: "power1.out",
        },
        0
      );

      tl.to(
        block.querySelector(".overlay"),
        {
          background: "#00000085",
          duration: totalDuration / 2,
          ease: "power1.in",
        },
        totalDuration / 2
      );
    });

    // Speed up animation for 1 second and then return to normal speed
    const speedUpAnimation = () => {
      const timeline = gsap.globalTimeline;
      timeline.timeScale(4); // Speed up by a factor of 4
      setTimeout(() => {
        timeline.timeScale(1); // Return to normal speed
      }, 1000);
    };

    speedUpAnimation(); // Call the function to trigger the speed up effect

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = ((clientX - innerWidth / 2) / innerWidth) * 10; // Reduced mouse effect
      const y = ((clientY - innerHeight / 2) / innerHeight) * 5; // Reduced mouse effect

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (galleryRef.current) {
      gsap.to(galleryRef.current.querySelectorAll(".blockk"), {
        x: (index, target) => gsap.getProperty(target, "x") - mousePosition.x,
        y: (index, target) => gsap.getProperty(target, "y") - mousePosition.y,
        duration: 1.0,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, [mousePosition]);

  const blockStyles = [
    { top: "55%", left: "15%" },
    { top: "50%", left: "25%" },
    { top: "15%", left: "35%" },
    { top: "60%", left: "55%" },
    { top: "15%", left: "15%" },
    { top: "40%", left: "65%" },
    { top: "20%", left: "25%" },
    { top: "65%", left: "30%" },
    { top: "50%", left: "60%" },
    { top: "30%", left: "20%" },
  ];

  const imageUrl =
    "https://images.unsplash.com/photo-1556819785-c18826446a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";

  return (
    <div className="relative  w-screen h-screen">
      <div
        className="gallery"
        ref={galleryRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {blockStyles.map((blockk, index) => (
          <div
            style={{
              top: blockk.top,
              left: blockk.left,
              position: "absolute",
              width: "200px", // Reduced width
              height: "150px", // Reduced height
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
              perspective: 1000,
              zIndex: -index++,
            }}
            key={index}
            className="blockk"
          >
            <div className="relative w-[150px] h-[150px]">
              {" "}
              {/* Reduced size */}
              <div
                className="overlay"
                style={{
                  width: "200px", // Reduced width
                  height: "150px", // Reduced height
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                  backgroundColor: "rgba(0, 0, 0, 1)",
                }}
              />
              <img
                style={{
                  width: "200px", // Reduced width
                  height: "150px", // Reduced height
                  objectFit: "cover",
                }}
                src={imageUrl}
                alt={`Animated Block ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "100px",
          fontWeight: "bold",
          textAlign: "center",
          zIndex: 1000,
          width:"100%",
          color: "white",
        }}
      >
        Let&#39; Take
      </div>

      {/* Flex Row Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
          padding: "0 20px",
          position: "absolute",
          bottom: "10%",
          zIndex: 1000,
          color: "white",

        }}
      >
        {/* Column 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Title 1</div>
          <div style={{ fontSize: "16px" }}>Subtitle 1</div>
          <div style={{ fontSize: "16px" }}>Subtitle 2</div>
          <div style={{ fontSize: "16px" }}>Subtitle 3</div>
        </div>

        {/* Column 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Title 2</div>
          <div style={{ fontSize: "16px" }}>Subtitle 1</div>
          <div style={{ fontSize: "16px" }}>Subtitle 2</div>
          <div style={{ fontSize: "16px" }}>Subtitle 3</div>
        </div>

        {/* Column 3 */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Title 3</div>
          <div style={{ fontSize: "16px" }}>Subtitle 1</div>
          <div style={{ fontSize: "16px" }}>Subtitle 2</div>
          <div style={{ fontSize: "16px" }}>Subtitle 3</div>
        </div>
      </div>
    </div>
  );
};

export default ShootingFire;
