import styles from './Message.module.css'
import { useState, useEffect } from 'react'

interface MessageProps {
    type?: string,
    msg: string
}

export function Message ({msg, type=''}:MessageProps) {
    const [ visible, setVisible ] = useState(false)
   
    useEffect(() => {
        if(!msg) {
            setVisible(false)
        }
        setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${type == 'sucess' && styles.sucess} ${type == 'error' && styles.error}`}>
                    {msg}
                </div>
            )}
        </>
    )
}