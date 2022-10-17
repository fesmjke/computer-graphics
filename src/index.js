import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import './index.css';
import App from './App';
import FractalPage from './components/fractals/fractal-page';
import EntryPage from './components/entry/entry-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <EntryPage/>
      },
      {
        path: "/fractals",
        element: <FractalPage/>
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
