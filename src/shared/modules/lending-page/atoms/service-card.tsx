import { TitleText } from "@/shared/components/dump/atoms";
import React from "react";
import { servicesConstants } from "@/shared/constants";
import servisecardImg from '@/assets/images/landing-images/servisecard.png';

export const ServiceCard = () => {
  const cardClasses = `flex flex-col gap-4 p-8 pb-20 shadow-xl rounded-4xl bg-[#F8F8F8] text-black`;
  return (
    <>
      {servicesConstants.map((service) => {
        const isSpecial = service.id === 4;
        return (
          <div style={{ backgroundImage: '@/assets/images/landing-images/servisecard.png' }} className={cardClasses} key={service.id}>
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <div className="flex flex-col gap-2">
              <p
                className="text-xl"
              >
                {service.description}
              </p>
            </div>
          </div>
        );
      })}
      <div style={{
        backgroundImage: `url(${servisecardImg.src})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className={cardClasses}>
        <h1 className="text-4xl font-bold text-white">{'04'}</h1>
        <div className="flex flex-col gap-2">
          <p
            className="text-xl text-white"
          >
            {'Yuk bojxona rasmiylashtiruvi'}
          </p>
        </div>
      </div>
    </>
  );
};
