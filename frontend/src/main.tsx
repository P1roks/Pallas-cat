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
				<Link to="/search">search test</Link>
				<Link to="/watch/1/578237997">watch test</Link>
			</div>
		},
		{
			//TODO: Make it possible to search, but first need to make that option fully functional in the backend
			path: "search/:platform/:query",
			element: <VidGrid />,
			loader: async({params}) => {
				 //TEMP URL
				 return fetch(`http://127.0.0.1:8000/api/search/${params.platform}/${params.query}`).then(async (res: Response) => {
					if(!res.ok)
						throw new Error(`HTTP err: ${res.status}`)

					let data = await res.json();
					return {videos: data.videos, platform: params.platform}
					})
			},
		},
		{
			//TODO: fetch given id, and use it as props for the Video component
			path: "watch/:platform/:id",
			element: <Video />,
			loader: async({params}) => {
			 //TEMP URL
			 return fetch(`http://127.0.0.1:8000/api/video/${params.platform}/${params.id}`).then(async (res: Response) => {
				if(!res.ok)
					throw new Error(`HTTP err: ${res.status}`)

				let data = await res.json();
				return {source: data.streamUrl}
				})
			},
		}]
	}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
)
