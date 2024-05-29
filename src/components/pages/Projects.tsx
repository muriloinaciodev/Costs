import { useLocation } from "react-router-dom";
import { Message } from "../layout/Message";
import { Container } from "../layout/Container";
import styles from "./Projects.module.css"
import { LinkButton } from "../layout/LinkButton";
import { ProjectCard } from "../project/ProjectCard";
import { useEffect, useState } from "react";
import { ProjectCardProps } from "../project/ProjectCard";
import { Loading } from "../layout/Loading";

export function Projects() {
    const [ projects, setProjects ] = useState<ProjectCardProps[]>([])
    const [ removeLoading, setRemoveLoading ] = useState(false)
    const [ projectMessage, setProjetMessage ] = useState('')

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type':'application/json'
                }
            })
            .then(resp => resp.json())
            .then(data => {
                setProjects(data)
                setRemoveLoading(true)
            })
        }, 300)
    }, [])
    
    function removeProject(id: string) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id != id))
            setProjetMessage('Projeto removido com sucesso')
        })
        .catch()
    }

    const location = useLocation()
    let msg = ''
    if (location.state){
        msg = location.state?.message
    }
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {msg && <Message msg={msg} type="sucess"/>}
            {projectMessage && <Message msg={projectMessage} type="sucess"/>}
            <Container customClass="start">
                {
                projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                            key={project.id as React.Key}
                            id={project.id}
                            budget={project.budget}
                            category={project.category}
                            handleRemove={removeProject}
                            name={project.name}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}