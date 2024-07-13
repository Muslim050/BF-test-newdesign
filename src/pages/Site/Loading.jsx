import {useEffect, useState, useRef} from "react";
import style from './Loading.module.scss'
import Logo from "@/assets/Site/logo.png";
import { gsap } from 'gsap';


const Loading = () => {
  const [percentage, setPercentage] = useState(0);
  const logoRef = useRef(null);
  const percentageRef = useRef(null);
  useEffect(() => {
    // GSAP animation for the logo
   
    // GSAP animation for the percentage
    gsap.fromTo(
      percentageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, repeat: -1, yoyo: true }
    );

    // Increment the percentage
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 33); // Adjust the interval to match the desired loading duration

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.loading_screen}>
      <div className="logo"> {/* Replace with your logo component or image */}
        <img src={Logo} alt="Brandformance Logo" ref={logoRef}/>
      </div>
      <div className={style.loading_text}>Loading...</div>
      <div className={style.loading_percentage} >{percentage}</div>
    </div>
  );
};

export default Loading;