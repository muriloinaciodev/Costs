import { ChangeEvent } from 'react'
import styles from './Select.module.css'

interface SelectProps {
  text: string
  name: string
  options?: Array<{id:number, name:string}>
  handleOnChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  value?: string
}

export function Select({text, name, options=[], handleOnChange, value}:SelectProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select onChange={handleOnChange} name={name} id={name} value={value}>
        <option>Selecione uma opção</option>
        {options.map((op) => (
          <option key={op.id} value={op.id}>{op.name}</option>
        ))}
      </select>
    </div>
  )
}