import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Link, Outlet, redirect, RouterProvider, useLocation, useNavigate} from 'react-router-dom'
import {Bar} from './Bar'
import './index.scss'
import {Login} from './Login'
import {Popup} from './Popup'
import {Register} from './Register'
import {Video, VideoErr} from './Video'
import {VidGrid} from './VidGrid'

async function logout(){
	fetch("http://127.0.0.1:8000/api/logout/")
}

const router = createBrowserRouter([
	{
	path:"/",
	element: (<>
		<Bar />
		<Outlet />
		</>),
		loader: async() => {
			let isLogged = await fetch("http://127.0.0.1:8000/api/check/").then(res => res.text()).then(txt => JSON.parse(txt))
			console.log(isLogged)
			return {isLogged: isLogged.logged}
			return {isLogged: false}
		},
		children: [
			{
				path: "/",
				element: <div style={{display: "flex",justifyContent:"center",alignItems:"Center", flexDirection: "column"}}>
					<h1>TODO: insert Random vidoes here</h1>
					<Link to="/search">search test</Link>
					<Link to="/watch/1/578237997">watch test</Link>
					<button onClick={logout}>logout</button>
				</div>,
			},
			{
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
				path: "watch/:platform/:id",
				element: <Video />,
				errorElement: <VideoErr />,
				loader: async({params}) => {
				 //TEMP URL
				 return fetch(`http://127.0.0.1:8000/api/video/${params.platform}/${params.id}`).then(async (res: Response) => {
					if(!res.ok)
						throw new Error(`HTTP err: ${res.status}`)

					let data = await res.json();
					return {source: data.streamUrl, embeddable: data.embeddable}
					})
				},
			},
			{
				path: "login",
				element: <Login />,
				action: async({request}) => {
					const formData = await request.formData()

					let status = await fetch(`http://127.0.0.1:8000/api/login/`, {
						method: "post",
						body: formData,
					}).then(res => res.text())
					console.log(status)

					return redirect("/")
				}
			},
			{
				path: "register",
				element: <Register />,
				action: async({request}) => {
					let formData = await request.formData();

					let status = await fetch(`http://127.0.0.1:8000/api/register/`, {
						method: "post",
						body: formData,
					}).then(res => res.text())
					console.log(status)

					return null
				}
			}]
	}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
)
