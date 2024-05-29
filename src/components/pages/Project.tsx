import { v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Loading } from '../layout/Loading'
import { Container } from '../layout/Container'
import { ProjectForm } from '../project/ProjectForm'
import { Message } from '../layout/Message'
import { ServiceForm } from '../Service/ServiceForm'
import { ServiceCard } from '../Service/ServiceCard'

interface ProjectType {
  id: string
  name: string
  budget: string
  category: {
    id: number
    name: string
  },
  cost: number,
  services: Array<Service>
}

interface Service {
  id: string
  name: string
  cost: string
  description: string
}

export function Project() {
  const {id} = useParams()

  const [ project, setProject ] = useState({} as ProjectType)
  const [ services, setServices ] = useState([] as Service[])
  const [ showProjectForm, setShowProjectForm ] = useState(false)
  const [ showServiceForm, setShowServiceForm ] = useState(false)

  const [ message, setMessage ] = useState('')
  const [ type, setType ] = useState('')

  useEffect(() => {
    console.log(message)
  }, [message])

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`,
        {
          method: "GET",
          headers: {"Content-type":"application/json"}
        }
      ).then((resp) => resp.json())
      .then((data) => {
        setProject(data)
        setServices(data.services)
      })
      .catch((err) => console.log(err))
    }, 300)
        
  }, [id])

  function toggleProjectForm () {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm () {
    setShowServiceForm(!showServiceForm)
  }

  function createService(project:ProjectType){
    setMessage('')
    const lastService = project.services[project.services.length-1]
    lastService.id = uuidv4()
    const lastServiceCost = lastService.cost
    const newCost = project.cost + parseFloat(lastServiceCost)

    setTimeout(() => {
      if (newCost > parseFloat(project.budget)){
        setMessage('Orçamento ultrapassado! Verifique o valor do serviço!')
        setType('error')
        setShowServiceForm(false)
        project.services.pop()
        return false
      }
      project.cost = newCost
  
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(project)
      })
      .then(resp => resp.json())
      .then(() => {
        setShowServiceForm(false)
      })
      .catch(err => console.log(err))
    }, 1)
  }

  function editPost(project:ProjectType) {
    setMessage('')
    if (parseFloat(project.budget) < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(project)
    })
    .then(resp => resp.json())
    .then(data => {
      setProject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado!')
      setType('sucess')
    })
  }
  function removeService(id:string, cost:string){
    const servicesUpdated = project.services.filter(
      (service) => (service.id != id)
    )
    const projectUpdated = project
    projectUpdated.services = servicesUpdated
    projectUpdated.cost = projectUpdated.cost-parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {"Content-type":"application/json"},
      body: JSON.stringify(projectUpdated)
    })
    .then(resp => resp.json())
    .then(() => {
      setProject(projectUpdated)
      setServices(servicesUpdated)
      setMessage('Serviço removido com sucesso')
      setType('success')
    })
    .catch(err => console.log(err))
  }

return (
  <>
    {project.name ? (
      <div className={styles.project_details}>
        <Container customClass='column'>
          {message && <Message msg={message} type={type}/>}
          <div className={styles.datails_container}>
            <h1>Projeto: {project.name}</h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? "Editar projeto" : "Fechar"}
            </button>
            {
              !showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ):(
                <div className={styles.project_info}>
                  <ProjectForm 
                    handleSubmit={editPost} 
                    btnText='Concluir Edição' 
                    projectData={project}/>
                </div>
              )
            }
          </div>
          <div className={styles.service_form_container}>
            <h2>Adicione um serviço: </h2>
            <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? "Adicionar serviço" : "Fechar"}
            </button>
            <div className={styles.project_info}>
              {showServiceForm && (
                <ServiceForm 
                  handleSubmit={createService}
                  btnText='Adicionar Serviço'
                  projectData={project}
                />
              )}
            </div>
          </div>
          <h2>Serviços</h2>
          <Container customClass='start'>
            {services.length > 0 && (
              services.map((service) => (
                <ServiceCard 
                  id={service.id}
                  name={service.name}
                  cost={service.cost}
                  description={service.description}
                  key={service.id}
                  handleRemove={removeService}
                />
              ))
            )}
            {services.length === 0 && (
              <p>Não há serviços cadastrados</p>
            )}
          </Container>
        </Container>
      </div>
    ) : (
      <Loading/>
    )}
  </>
)}
