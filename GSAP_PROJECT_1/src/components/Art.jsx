import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Art = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    useGSAP(() => {
        const start = isMobile ? "top 20%" : "top top";

        const maskTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#art",
                start,
                end: "bottom center",
                scrub: 1.5,
                pin: true
            }
        })

        maskTimeline.to('.will-fade', {opacity: 0, stagger: 0.02, ease: "power1.inOut"})
        .to(".masked-img", { scale: 1.3, maskPosition: "center", maskSize: "400%", duration: 1, ease: "power1.inOut"}).to("#masked-content", {opacity: 1, duration: 1, ease: "power1.inOut"})
    })
  return (
    <section id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The Art</h2>
        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((item, i) => {
              return (
                <li key={i} className="flex items-center gap-2">
                  <img src="/images/check.png" alt="check icon" />
                  <p>{item}</p>
                </li>
              );
            })}
          </ul>
          <div className="cocktail-img">
            <img
              src="/images/under-img.jpg"
              alt="cocktail"
              className="abs-checker masked-img size-full object-contain"
            />
          </div>
          <ul className="space-y-4 will-fade">
            {featureLists.map((item, i) => {
              return (
                <li key={i} className="flex items-center gap-2">
                  <img src="/images/check.png" alt="check icon" />
                  <p className="md:w-fit w-60">{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="masked-container flex flex-col items-center justify-center self-center">
            <h2 className="will-fade">
                Sip-Worthy Perfection
            </h2>
            <div id="masked-content">
                <h3>Made with Craft, Poured with passion</h3>
                <p className="">This isn't just a cocktail, it's a masterpiece. Experience the artistry behing every sip.</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Art;
