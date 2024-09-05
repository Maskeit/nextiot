import Image from "next/image";
import one from "../../public/images/1.png";
import two from "../../public/images/2.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.imagenes}>
          <Image
            className={styles.image}
            src={one}
            alt="File image"
            width={300}
            height={300}
          />
          <Image
            className={styles.image}
            src={two}
            alt="File image"
            width={300}
            height={300}
          />
        </div>
        <ol className={styles.list}>
          <li className={styles.ctas}>
            Monitor de temperatura y humedad
            <a href="act4" className={styles.link}>
              Ver Proyecto
            </a>
          </li>
          <li className={styles.ctas}>
            Led Toggle
            <a href="act5" className={styles.link}>
              Ver Proyecto
            </a>
          </li>
        </ol>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://docs.particle.io/reference/developer-tools/cli/#particle-token-create"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Particle CLI
        </a>
        <a
          href="https://codeale.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to Codeale.com →
        </a>
      </footer>
    </div>
  );
}
