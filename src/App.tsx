import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { Link } from 'react-router-dom';
import PrivateRoutes from './_components/PrivateRoutes';
import Nav from './_components/Nav';
import LandingPage from './_components/home/LandingPage';


function App() {

  return (
		<div className='app-container bg-light'>
			<Nav />
			<div className='container pt-4 pb-4'>
				<LandingPage />
				<PrivateRoutes>
				<Link to='/dashboard'>Dashboard</Link>
				</PrivateRoutes>

			</div>
		</div>
	);
}

export default App
