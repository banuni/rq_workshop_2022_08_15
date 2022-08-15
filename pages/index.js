import { MenuComponent } from "../MenuComponent";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <MenuComponent cook="Nuni"/>
      </main>
    </div>
  );
}
