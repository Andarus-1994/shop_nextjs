import styles from "../styles/Footer.module.scss";
import Background from "../public/footerBg.jpg";
export default function Footer() {
  const styleFooter = {
    background: {
      backgroundImage: 'url("' + Background.src + '")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    } as React.CSSProperties,
  };
  return (
    <div className={styles.footer} style={styleFooter.background}>
      <div className={styles.overlay}></div>
      <section>
        <p>Start shopping today with US. Be swift. Be steady.</p>
        <button>Subscribe for more</button>
      </section>
    </div>
  );
}
