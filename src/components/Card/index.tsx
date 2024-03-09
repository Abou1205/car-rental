import { CarType } from "../../types";
import { generateImage } from "../../utils/generateImage";
import { motion } from "framer-motion";

import CustomButton from "../CustomButton";
import DetailModal from "../DetailModal";
import { useState } from "react";

interface ICardProps {
  car: CarType;
}

const Card = ({ car }: ICardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const translate = {
    fwd: "Front Wheel Drive",
    rwd: "Rear Wheel Drive",
    "4wd": "4 Wheel Drive",
    awd: "All Wheel Drive",
  };

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1,
      }}
      className="car-card group"
    >
      {/* car name */}
      <h2 className="car-card__content-title">
        {car.make} {car.model}
      </h2>
      {/* car price */}
      <p className="flex mt-6 text-[32px]">
        <span className="text-[19px] font-semibold">₺</span>
        {Math.round(Math.random() * 2000) + 100}
        <span className="text-[19px] font-semibold self-end">Day</span>
      </p>
      {/* car img */}
      <div className="w-full h-40 my-3 relative">
        <img
          src={generateImage(car)}
          className="w-full h-full object-contain"
        />
      </div>
      {/* footer */}
      <div className="relative flex w-full mt-2">
        {/* icons */}
        <div className="group-hover:hidden flex w-full justify-between">
          <div className="flex-center flex-col">
            <img width={25} src="/steering-wheel.svg" />
            <p>{car.transmission == "a" ? "Automatic" : "Manuel"}</p>
          </div>
          <div className="flex-center flex-col">
            <img width={25} src="/tire.svg" />
            <p>{translate[car.drive]}</p>
          </div>
          <div className="flex-center flex-col">
            <img width={25} src="/gas.svg" />
            <p>{car.fuel_type}</p>
          </div>
        </div>
        {/* button */}
        <div className="group-hover:flex hidden w-full">
          <CustomButton
            title="More"
            designs="w-full py-[16px]"
            rIcon="/right-arrow.svg"
            handleClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {/* modal */}
      <DetailModal car={car} isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
      
    </motion.div>
  );
};

export default Card;
