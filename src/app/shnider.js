"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const blocksRef = useRef([]);

  const images = [
    "https://j.gifs.com/oQ36KB.gif",
    "https://cdn.mos.cms.futurecdn.net/SvkSNyEqbgYJnkjMCuUjed-320-80.gif",
    "https://i.gifer.com/EgI3.gif",
    "https://i.makeagif.com/media/6-28-2022/RbKIo3.gif",
    "https://getweeklyupdate.com/blog/wp-content/uploads/2018/02/1.jpg",
    "https://www.searchenginejournal.com/wp-content/uploads/2023/08/best-landing-page-examples-64e6080f990bb-sej-1280x720.png",
    "https://www.shutterstock.com/image-vector/modern-website-template-websites-landing-260nw-2084397844.jpg",
    "https://i.ytimg.com/vi/LwTBDVaeils/maxresdefault.jpg",
    "https://koloursync.com/wp-content/uploads/2023/09/4921802_2587858_Cropped-Large-1024x611.webp",
  ];

  const getPosition = (index) => {
    // Randomly place the images in different quadrants of the screen
    const quadrant = index % 4;
    const [xRange, yRange] = [
      [0, window.innerWidth],
      [0, window.innerHeight],
    ];

    const startX =
      quadrant === 1 || quadrant === 3
        ? Math.random() * (xRange[1] / 2)
        : Math.random() * (xRange[1] / 2) + xRange[1] / 2;
    const startY =
      quadrant === 2 || quadrant === 3
        ? Math.random() * (yRange[1] / 2)
        : Math.random() * (yRange[1] / 2) + yRange[1] / 2;

    return { startX, startY };
  };

  useEffect(() => {
    blocksRef.current.forEach((block, index) => {
      const duration = 20 + Math.random() * 10; // Vary the duration of the animation for each image
      const { startX, startY } = getPosition(index);

      gsap.to(block, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration,
        ease: "none",
        repeat: -1,
        yoyo: false,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % window.innerWidth),
          y: gsap.utils.unitize((y) => parseFloat(y) % window.innerHeight),
        },
      });

      // Add opacity animation to overlay
      gsap.to(block.querySelector(".overlay"), {
        opacity: 0,
        duration: duration / 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
      });
    });
  }, []);

  return (
    <div className="relative z-0 top-0 left-0 h-full w-full text-white before:h-[94px] before:w-full min-h-screen flex flex-col justify-between">
      <div
        className="absolute w-screen overflow-hidden h-screen z-[1] bg-black"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {images.map((src, index) => {
          const { startX, startY } = getPosition(index);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "256px",
                height: "256px",
                top: startY,
                left: startX,
              }}
              ref={(el) => (blocksRef.current[index] = el)}
              className="blockimg"
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div
                className="overlay absolute inset-0 bg-black"
                style={{ opacity: 0.8 }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className="text-center mb-5 relative z-10">
        <h1 className="text-[200px] font-light">talk</h1>
      </div>
      <div className="flex justify-between relative z-10">
        <div>
          <h2 className="font-semibold mb-2">Barcelona</h2>
          <p>Gran Via de les Corts, 682</p>
          <p>08010</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Madrid</h2>
          <p>Gran Vía, 68</p>
          <p>28013</p>
        </div>
        <div>
          <p>Instagram</p>
          <p>LinkedIn</p>
          <p>Twitter</p>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Business inquiries</h2>
          <p>hello@hanzo.es</p>
        </div>
      </div>
      <div className="text-gray-500 text-sm mt-8 relative z-10">
        Activate Windows
        <br />
        Go to Settings to activate Windows.
      </div>
    </div>
  );
}
