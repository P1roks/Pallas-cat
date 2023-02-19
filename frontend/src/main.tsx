import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Link, Outlet, RouterProvider} from 'react-router-dom'
import {Bar} from './Bar'
import './index.scss'
import {Video} from './Video'
import {VidGrid} from './VidGrid'

const router = createBrowserRouter([{
	path:"/",
	element: (<>
		<Bar />
		<Outlet />
		</>),
	children: [
		{
			path: "/",
			element: <div style={{display: "flex",justifyContent:"center",alignItems:"Center", flexDirection: "column"}}>
				<h1>TODO: insert Random vidoes here</h1>
				<Link to="/search">search</Link>
				<Link to="/watch/1/1">watch</Link>
			</div>
		},
		{
			//TODO: Make it possible to search, but first need to make that option fully functional in the backend
			path: "search",
			element: <VidGrid />,
		},
		{
			//TODO: fetch given id, and use it as props for the Video component
			path: "watch/:platform/:id",
			element: <Video title="t" source="https://vwaw401.cda.pl/XOjwD6_oDljbXiTa3CD_Bg/1676804262/sdba6eb9a5e5181066bb9321c4c58a5821.mp4" />
		}]
	}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
)
