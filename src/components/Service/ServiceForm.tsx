import styles from '../project/ProjectForm.module.css'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from '../form/Input'
import { SubmitButton } from '../form/SubmitButton'

interface ServiceFormProps {
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

export function ServiceForm({handleSubmit, btnText, projectData}:ServiceFormProps) {
  const [ service, setService ] = useState({})

  function submit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()
    projectData?.services.push(service)
    handleSubmit(projectData)
  }
  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    setService({...service, [e.target.name]:e.target.value})
  }
  return (
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type="text" 
        text="Nome do serviço"
        name="name"
        placeholder='Insira o nome do serviço'
        handleOnChange={handleChange}
      />
      <Input 
        type="number" 
        text="Custo do serviço"
        name="cost"
        placeholder='Insira o valor total'
        handleOnChange={handleChange}
      />
      <Input 
        type="text" 
        text="Descrição do serviço"
        name="description"
        placeholder='Descreva o serviço serviço'
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText}/>
    </form>
  )
}