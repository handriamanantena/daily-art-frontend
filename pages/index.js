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
        <canvas id="gradient-canvas" data-transition-in="true"
                style={{clipPath: "polygon(100px 0px, 100% 0px, calc(100% + 225px) 100%, 480px 100%)"}}
                className="fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-[#c3e4ff]" width="932"
                height="600"></canvas>
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
