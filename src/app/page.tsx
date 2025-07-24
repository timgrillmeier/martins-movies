import Image from "next/image";
import styles from "./page.module.css";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string; page: string }>; }) {
  const { query = '', page = '1'} = await searchParams
  const paginationIndex = parseInt(page) // 1 it not provided
  const paginationCount = 6 // assuming 6 per page for now

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Martin's Movies</h1>
        <p>Params test</p>
        <p>Query: "{query}"</p>
        <p>Page: "{paginationIndex}"</p>
      </main>
    </div>
  );
}
