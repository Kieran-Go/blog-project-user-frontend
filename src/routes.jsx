import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Post from './components/Post.jsx';

// Define routes for navigation
const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home />},
            { path: 'home', element: <Home />},
            { path: 'login', element: <Login />},
            { path: 'signup', element: <Signup />},
            { path: 'posts/:id', element: <Post />}
        ]
    }
];

export default routes;