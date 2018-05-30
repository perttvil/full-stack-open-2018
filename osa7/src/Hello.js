import React from 'react'
import styles from './Hello.css'

const Hello = ({ counter }) => (
    <p className={styles.content}>
        hello webpack {counter} clicks!
    </p>
)

export default Hello