import React from 'react'
import styles from './NoteCount.css'

const NoteCount = ({ noteCount }) => (
    <p className={styles.content}>
        {noteCount} notes in server
    </p>
)

export default NoteCount