"use client";

import { useEffect } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";
import { PartnerSlide } from "../../molecules/Partners-slide";
import { TitleText } from "@/shared/components/dump/atoms";
import logoIMG from "@/assets/images/logo/Logo.svg";

const partners = [
  { name: "Google", logo: logoIMG },
  { name: "Microsoft", logo: logoIMG },
  { name: "Amazon", logo: logoIMG },
  { name: "Netflix", logo: logoIMG },
  { name: "Meta", logo: logoIMG },
  { name: "Apple", logo: logoIMG },
  { name: "Samsung", logo: logoIMG },
];

export const Partners = () => {
  useEffect(() => {
    const splide = new Splide(".splide", {
      type: "loop",
      drag: "free",
      focus: "center",
      arrows: false,
      pagination: false,
      perPage: 3,
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
    <section id="about" className="w-full px-4 md:px-12 py-6 rounded-2xl bg-primary-blue-color overflow-hidden">
      <TitleText title="Bizning hamkorlarimiz" color="white" />
      <div className="splide mt-10">
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
    </section>
  );
};
