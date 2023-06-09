import {
	Route,
	Router,
	RouterProvider,
	Switch,
	createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import Detail from './routes/Detail';

const router = createBrowserRouter(
	[
		{ path: '/', element: <Home /> },
		{ path: '/movie/:id', element: <Detail /> },
	],
	{ basename: '/movie-web-service' }
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
