import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Creates a router with routes for the app
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>, // Error message for wrong page
    children: [
      {
        index: true,
        element: <SearchBooks /> // Default route for searching books
      }, {
        path: '/saved',
        element: <SavedBooks /> // Route for viewing saved books
      }
    ]
  }
]);

// Renders the app with the router
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
