import { BsFillTrashFill } from 'react-icons/bs'
import styles from '../project/ProjectCard.module.css'

interface ServiceCard {
  id: string
  name: string
  cost: string
  description: string
  handleRemove: Function
}

export function ServiceCard({id, name, cost, description, handleRemove}:ServiceCard) {
  function remove() {
    handleRemove(id, cost)
  }
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo total:</span> R${cost}
      </p>
      <p>{description}</p>
      <div className={styles.actions}>
        <button onClick={remove}>
          <BsFillTrashFill/> Excluir
        </button>
      </div>
    </div>
  )
}