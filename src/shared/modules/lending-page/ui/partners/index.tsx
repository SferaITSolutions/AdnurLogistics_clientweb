"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";
import { PartnerSlide } from "../../molecules/Partners-slide";
import { TitleText } from "@/shared/components/dump/atoms";
import logoIMG from "@/assets/images/logo/Logo.svg";
import AutoGlass from "@/assets/images/landing-images/Auto-glass.svg";
import BekHomeless from "@/assets/images/landing-images/Bek-homeless.svg";
import Ermak from "@/assets/images/landing-images/Ermak.svg";
import PowerlessGym from "@/assets/images/landing-images/Powerless-gym.svg";
import ShoxHospital from "@/assets/images/landing-images/Shox-hospital.svg";

const partners = [
  { name: "Bek Homes", logo: BekHomeless },
  { name: "Powerless Gym", logo: PowerlessGym },
  { name: "Auto Glass", logo: AutoGlass },
  { name: "Shox Hospital", logo: ShoxHospital },
  { name: "Ermak", logo: Ermak },
];

export const Partners = () => {
  useEffect(() => {
    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      focus: "center",
      arrows: false,
      pagination: false,
      perPage: 4,
      autoScroll: {
        speed: 0.6,
      },
      breakpoints: {
        1024: { perPage: 6 },
        768: { perPage: 4 },
        480: { perPage: 2 },
      },
    });

    splide.mount({ AutoScroll });
  }, []);

  return (
    <>
      <div className="splide !p-0">
        <div className="splide__track">
          <ul className="splide__list">
            {partners.map((partner, index) => (
              <li className="splide__slide" key={index}>
                <PartnerSlide name={partner.name} logo={partner.logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
