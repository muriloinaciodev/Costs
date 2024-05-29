import { ChangeEvent } from 'react'
import styles from './Input.module.css'

interface InputProps {
  type: string
  text: string
  name: string
  placeholder: string
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export function Input({type, text, name, placeholder, handleOnChange, value}:InputProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input 
        id={name}
        name={name}
        type={type} 
        placeholder={placeholder} 
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
}