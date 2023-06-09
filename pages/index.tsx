import styles from "../styles/Home.module.scss";
import Background from "../public/homeBg.jpg";
import Background2 from "../public/homeBg2.jpg";
import Background3 from "../public/homeBg3.jpg";
import { useEffect, useMemo, useState } from "react";
import HomeSolutionsBoxes from "./homeSolutionsBoxes";
import HomeImageBox from "./homeMostSoldItems";
import Link from "next/link";
export default function Home() {
  const [arrayBgs] = useState([Background, Background2, Background3]);
  const [iteration, setIteration] = useState(1);
  const [chosenBg, setChosenBg] = useState(Background);
  useEffect(() => {
    const interval = setInterval(() => {
      setChosenBg(arrayBgs[iteration]);
      if (iteration === arrayBgs.length - 1) {
        setIteration(0);
      } else {
        setIteration(iteration + 1);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [arrayBgs, chosenBg, iteration]);
  const homeStyles = useMemo(() => {
    const background: React.CSSProperties = {
      backgroundImage: 'url("' + chosenBg.src + '")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: "100vh",
    };
    return background;
  }, [chosenBg]);

  return (
    <div>
      <div className={styles.containerHome}>
        <div
          key={homeStyles.backgroundImage}
          className={styles.overlay + " " + styles.fadein}
          style={homeStyles}
        ></div>
        <h1>
          <span>Absolutely. Positively. Perfect</span>
          Shopius
        </h1>
        <Link href={"/items"}>
          <button>Shop now</button>
        </Link>
      </div>
      <HomeSolutionsBoxes />
      <HomeImageBox />
    </div>
  );
}
