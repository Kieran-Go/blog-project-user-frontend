import App from './components/App.jsx';
import Home from './components/Home.jsx';

// Define routes for navigation
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home />},
            { path: 'home', element: <Home />},
        ]
    }
];

export default routes;