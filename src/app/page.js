
"use client"

import styles from './page.module.css'
import useSWR from 'swr';
import Card from './components/card'

export default function Home() {

    const fetcher = (args) => fetch(args).then(response => response.json());
    const {data, error, isLoading} = useSWR("http://localhost:3000/api/inventory", fetcher);

    if (error) return <span>Failed to fetch</span>
    if (isLoading) return <span>Loading...</span>

    return (
      <main className={styles.main}>
        HOli
      </main>
    )
}
