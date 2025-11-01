import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';  
import Login from './components/loginCompoents/login.jsx';
import Register from './components/registerComponents/register.jsx';
import Home from './components/homeComponets/home.jsx';
import Notes from './components/homeComponets/notes.jsx';
import Archive from './components/homeComponets/archive.jsx';
import Reminder from './components/homeComponets/reminder.jsx';
import EditLabels from './components/homeComponets/editLabels.jsx';
import Trash from './components/homeComponets/trash.jsx';


const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { 
    path: '/home',
    element: <Home />, 
    children: [
      { index: true, element: <Navigate to="notes" replace /> },
      { path: 'notes', element: <Notes /> },
      { path : 'archive', element: <Archive /> },
      { path : 'reminders', element: <Reminder/>},
      {path : 'editLabels', element: <EditLabels/>},
      {path : 'trash', element: <Trash/>}

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
