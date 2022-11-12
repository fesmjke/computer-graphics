import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import './index.css';
import App from './App';
import FractalPage from './components/fractals/fractal-page';
import EntryPage from './components/entry/entry-page';
import ColorPage from './components/color-models/color-page';
import TransformationPage from './components/transformation/transformation';
import AboutFractals from "./components/about/fractal/about-fractals";
import AboutColors from './components/about/color-models/about-colors';
import AboutTransformation from './components/about/transformation/about-transformation';

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
      },
      {
        path: "/colors",
        element: <ColorPage/>
      },
      {
        path: "/transformation",
        element: <TransformationPage/>
      },
      {
        path: "/about/fractals",
        element: <AboutFractals/>
      },
      {
        path: "/about/colors",
        element: <AboutColors/>
      },
      {
        path: "/about/transformation",
        element: <AboutTransformation/>
      }
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
  //</React.StrictMode>
);
