import { useState, useEffect, FormEvent, ChangeEvent } from 'react'

import { Input } from '../form/Input'
import { Select } from '../form/Select'
import { SubmitButton } from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

interface ProjectFormProps {
  btnText: string
  projectData?: ProjectType
  handleSubmit: Function
}

interface ProjectType {
  id: string
  name: string
  budget: string
  category: {
    id: number
    name: string
  },
  cost: number,
  services: Array<Record<string, any>>
}

export function ProjectForm ({btnText, handleSubmit, projectData={} as ProjectType}:ProjectFormProps) {
  
  const [ categories, setCategories ] = useState([])
  const [ project, setProject ] = useState(projectData)

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method:"GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {setCategories(data)})
      .catch(err => console.log(err))
  }, [])

  const submit = (e:FormEvent) => {
    e.preventDefault()
    handleSubmit(project)
  }

  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    setProject({...project, [e.target.name]:e.target.value})
  }

  function handleCategory(e:ChangeEvent<HTMLSelectElement>) {
    setProject({...project, category:{
      id: Number(e.target.value), 
      name: e.target.options[e.target.selectedIndex].text
    }})
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type='text'
        text="Nome do projeto"
        name='name'
        placeholder='Insira o nome do projeto'
        handleOnChange={handleChange}
        value={project.name||undefined}
      />
      <Input 
        type='number'
        text='Orçamento do projeto'
        name='budget'
        placeholder='Insira o orçamento total'
        handleOnChange={handleChange}
        value={project.budget}
      />
      <div>
        <Select 
          name="category_id" 
          text='Selecione a categoria' 
          options={categories}
          handleOnChange={handleCategory}
          value={project.category && String(project.category.id)}
        />
      </div>
      <SubmitButton
        text={btnText}
      />
    </form>
  )
}