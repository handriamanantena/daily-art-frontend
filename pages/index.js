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
          <div>
              <h1 className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[130px] font-inter text-[#1E2B3A] leading-[0.9] z-[100] break-keep">
                  Daily イラスト
              </h1>
              <div className="flex items-center justify-center w-fit">
                  <Link href="/dailyart">
                      <a className={styles.hoverTransition}>
                          <h2 className={styles.description}>An illustration a day &rarr;</h2>
                      </a>
                  </Link>
              </div>
          </div>
      </main>

    </div>
  )
}
