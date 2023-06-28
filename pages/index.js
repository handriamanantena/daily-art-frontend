import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from "react";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Daily Art</title>
        <meta name="description" content="Daily Art" />
        <link rel="icon" href="/icons/pen-to-square-regular.svg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            Simple Art
        </h1>
          <p className={styles.description}>
              A drawing a day
        </p>

        <div className={styles.grid}>
          <Link href="/dailyart">
            <a className={styles.card}>
                <h2>イラスト &rarr;</h2>
                <p>An illustration a day keeps the tears away</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
