import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { MouseEvent } from 'react'

export interface ProjectCardProps {
    id: String
    name: String
    budget: String
    category: {id:String, name:String}
    handleRemove: Function
}
export function ProjectCard({id, name, budget, category, handleRemove}:ProjectCardProps) {
    function remove(e: MouseEvent) {
        e.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.name.toLowerCase()]}`}></span> {category.name}
            </p>
            <div className={styles.actions}>
                <Link to={`/project/${id}`}><BsPencil/> Editar</Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}