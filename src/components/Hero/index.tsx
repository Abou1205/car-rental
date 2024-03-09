import CustomButton from "../CustomButton";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x max-h-[920px]">
        <h1 className="hero__title">Feel The Freedom, Start Your Journey</h1>
        <p className="hero__subtitle">
          Are you ready for an unforgettable journey with gold standard service?
          By crowning your car rental experience with Golden Options, you can
          make every moment special.
        </p>
        <CustomButton title="Discover the cars" designs="mt-10" />
      </div>

      <div className="flex justify-center">
        <motion.img
          initial={{
            scale: 0.7,
            translateX: 130,
            translateY: 50
          }}
          animate={{
            translateX: 0,
            scale: 1,
            translateY: 0
          }}
          transition={{
            duration: 1
          }}
          className="object-contain"
          src="/hero.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
