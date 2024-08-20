import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Slider = () => {
  useEffect(() => {
    const slides = gsap.utils.toArray('.slide');
    const activeSlideImages = gsap.utils.toArray('.active-slide img');

    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(', ');
        return parseFloat(values[14]) || 0;
      }
      return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, index) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: '.container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 22500;
          const currentZ = initialZ + zIncrement;

          let opacity;

          if (currentZ >= -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
          }

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          if (currentZ < 100) {
            gsap.to(activeSlideImages[index], 1.5, {
              opacity: 1,
              ease: 'power3.out',
            });
          } else {
            gsap.to(activeSlideImages[index], 1.5, {
              opacity: 0,
              ease: 'power3.out',
            });
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <nav>
        <div className="links-1">
          <Link href="#">Works</Link>
          <Link href="#">Archive</Link>
        </div>
        <div className="logo">
          <Link href="#">Modavate</Link>
        </div>
        <div className="links-2">
          <Link href="#">Info</Link>
          <Link href="#">Contact</Link>
        </div>
      </nav>

      <div className="container">
        <div className="active-slide">
          {Array.from({ length: 10 }, (_, index) => (
            <Image
              key={index}
              src={`/assets/${index + 1}.jpg`}
              alt={`Slide ${index + 1}`}
              width={800} // Adjust width as needed
              height={600} // Adjust height as needed
            />
          ))}
        </div>

        <div className="slider">
          {Array.from({ length: 10 }, (_, index) => (
            <div className="slide" id={`slide-${index + 1}`} key={index + 1}>
              <div className="slide-copy">
                <p>{`Slide ${index + 1}`}</p>
                <p id="index">{`( ES 2023 09${35 + index + 1} )`}</p>
              </div>
              <div className="slide-img">
                <Image
                  src={`/assets/${index + 1}.jpg`}
                  alt={`Slide ${index + 1}`}
                  width={800} // Adjust width as needed
                  height={600} // Adjust height as needed
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        <p>Watch Showreel</p>
        <p>Launching 2024</p>
      </footer>
    </div>
  );
};

export default Slider;
