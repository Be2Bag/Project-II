import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterForm from './Components/Register/RegisterForm.jsx'
import LoginForm from './Components/Login/LoginForm.jsx'
import PropertyForm from './Components/PropertyForm/PropertyForm.jsx'
import EditListing from './Components/EditListing/EditListing.jsx'
import Admin from './Components/Admin/Admin.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/Register",
    element: <RegisterForm />
  },
  {
    path:"/LoginForm",
    element: <LoginForm />
  },
  {
    path:"/PropertyForm",
    element: <PropertyForm />
  },
  {
    path:"/EditListing",
    element: <EditListing />
  },
  {
    path:"/Admin",
    element: <Admin />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
