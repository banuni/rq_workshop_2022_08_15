import { QueryClient, QueryClientProvider } from "react-query";
import { MenuComponent } from "../MenuComponent";
import styles from "../styles/Home.module.css";

const client = new QueryClient();
export default function Home() {
  return (
    <QueryClientProvider client={client}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MenuComponent cook="Nuni" />
        </main>
      </div>
    </QueryClientProvider>
  );
}
