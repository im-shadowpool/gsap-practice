import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(CustomEase, SplitText);
  CustomEase.create("hop", ".87,0,.13,1");
  console.log("Hello GSAP 3!");
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  const textContainers = document.querySelectorAll(".menu-col");
  let splitTextByContainer = [];

  textContainers.forEach((container) => {
    const textElements = container.querySelectorAll("a, p");
    let containerSplits = [];
    textElements.forEach((el) => {
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      containerSplits.push(split);
      gsap.set(split.lines, { y: "-110%" });
    });
    splitTextByContainer.push(containerSplits);
  });


  //
  const container = document.querySelector(".container");
  const menuToggleBtn = document.querySelector(".menu-toggle-btn");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuOverlayContainer = document.querySelector(".menu-overlay-content");
  const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
  const copyContainers = document.querySelectorAll(".menu-col");
  const menuToggleLabel = document.querySelector(".menu-toggle-label p");
  const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

  let isMenuOpen = false;
  let isAnimating = false;
  menuToggleBtn.addEventListener("click", () => {
    if (isAnimating) return;

    if (!isMenuOpen) {
      isAnimating = true;
      lenis.stop();
      const tl = gsap.timeline();

      tl.to(menuToggleLabel, { y: "-110%", duration: 1, ease: "hop" }, "<")
        .to(container, { y: "100svh", duration: 1, ease: "hop" }, "<")
        .to(
          menuOverlay,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainer,
          { yPercent: 0, duration: 1, ease: "hop" },
          "<"
        )
        .to(
          menuMediaWrapper,
          { opacity: 1, duration: 0.75, ease: "power2.out", delay: 0.5 },
          "<"
        );

      splitTextByContainer.forEach((containerSplitss) => {
        const copyLinks = containerSplitss.flatMap((split) => split.lines);
        tl.to(
          copyLinks,
          { y: "0%", duration: 2, ease: "hop", stagger: -0.075 },
          -0.15
        );
      });
      hamburgerIcon.classList.add("active");
      tl.call(() => {
        isAnimating = false;
      });
      isMenuOpen = true;
    } else {
      isAnimating = true;
      hamburgerIcon.classList.remove("active");
      const tl = gsap.timeline();

      tl.to(container, { y: "0svh", duration: 1, ease: "hop" })
        .to(
          menuOverlay,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainer,
          { yPercent: -50, duration: 1, ease: "hop" },
          "<"
        )
        .to(menuToggleLabel, { y: "0%", duration: 1, ease: "hop" }, "<")
        .to(copyContainers, { opacity: 0.25, duration: 1, ease: "hop" }, "<");

      tl.call(() => {
        splitTextByContainer.forEach((containerSplitss) => {
          const copyLinks = containerSplitss.flatMap((split) => split.lines);
          gsap.set(copyLinks, { y: "-110%" });
        });
        gsap.set(copyContainers, { opacity: 1 });
        gsap.set(menuMediaWrapper, { opacity: 0 });
        isAnimating = false;
        lenis.start();
      });
      isMenuOpen = false;
    }
  });

// 
const menuImage = document.querySelector('.menu-media-content img');
const menuLinks = document.querySelectorAll('.menu-link a');

// Store original image
const defaultSrc = menuImage.src;

menuLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const newSrc = link.getAttribute('data-img');
    if (!newSrc || menuImage.src.includes(newSrc)) return;

    // Highlight hovered link
    menuLinks.forEach(l => {
      l.style.opacity = l === link ? "1" : "0.3";
    });

    // Fade-out + slight zoom
    gsap.to(menuImage, {
      opacity: 0.2,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        menuImage.src = newSrc;

        // Fade-in with reset scale
        gsap.fromTo(
          menuImage,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut"
          }
        );
      }
    });
  });

  link.addEventListener('mouseleave', () => {
    // Reset opacity for all links
    menuLinks.forEach(l => l.style.opacity = "1");

    // Revert image to original
    gsap.to(menuImage, {
      opacity: 0.2,
      duration: 0.3,
      scale: 1.03,
      onComplete: () => {
        menuImage.src = defaultSrc;
        gsap.to(menuImage, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  });
});


});
