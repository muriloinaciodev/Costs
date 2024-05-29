import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Home } from './components/pages/Home'
import { Company } from './components/pages/Company'
import { Contact } from './components/pages/Contact'
import { NewProject } from './components/pages/NewProject'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Projects } from './components/pages/Projects.tsx'
import { Project } from './components/pages/Project.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/projects",
      element: <Projects />
    },
    {
      path: "/company",
      element: <Company />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/newproject",
      element: <NewProject />
    },
    {
      path: "/project/:id",
      element: <Project />
    },
  ]},
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
