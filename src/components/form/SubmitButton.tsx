import styles from './SubmitButton.module.css'

interface SubmitButtonProps {
  text: string
}

export function SubmitButton({text}:SubmitButtonProps) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  )
}