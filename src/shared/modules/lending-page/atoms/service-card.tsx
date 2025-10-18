import { TitleText } from "@/shared/components/dump/atoms";
import React from "react";
import { servicesConstants } from "@/shared/constants";

export const ServiceCard = () => {
  return (
    <>
      {servicesConstants.map((service) => {
        const isSpecial = service.id === 4;
        const cardClasses = `flex flex-col gap-4 p-8 shadow-lg rounded-2xl shadow-md ${
          isSpecial ? "bg-primary-blue-color text-white" : "bg-white text-black"
        }`;
        return (
          <div className={cardClasses} key={service.id}>
            <h1 className="text-4xl font-bold">{service.title}</h1>
            <div className="flex flex-col gap-2">
              <p
                className={`text-lg  ${
                  isSpecial ? "text-white" : "text-secondary-black-color"
                }`}
              >
                {service.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
