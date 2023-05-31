import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Daily Art" />
        <link rel="icon" href="/icons/pen-to-square-regular.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         Simple-Art
        </h1>

        <p className={styles.description}>
          A drawing a day
        </p>

        <div className={styles.grid}>
          <Link href="/dailyart">
            <a className={styles.card}>
                <h2>Daily Art &rarr;</h2>
                <p>Previous Simple-Art available on the marketplace.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
