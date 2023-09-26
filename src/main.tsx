import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Visits from './pages/Visits/Visits'
import Listing from './pages/Listing/Listing'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Visits',
    element: <Visits/>,
  },
  {
    path: '/Listing',
    element: <Listing/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
