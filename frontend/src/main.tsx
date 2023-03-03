import './scss/index.scss'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Link, Outlet, redirect, RouterProvider} from 'react-router-dom'
import {Account} from './Account'
import {Bar} from './Bar'
import {Login} from './Login'
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
			let isLogged = await fetch("http://127.0.0.1:8000/api/check/",{credentials: "include"})
			.then(res => res.text()).then(txt => JSON.parse(txt))
			return {isLogged: isLogged.logged}
			// return {isLogged: true}
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
				//TODO
				path: "account",
				element: <Account />
			},
			{
				path: "login",
				element: <Login />,
				action: async({request}) => {
					const formData = await request.formData()

					let status = await fetch(`http://127.0.0.1:8000/api/login/`, {
						method: "post",
						credentials: "include",
						body: formData,
					})
					//TODO: check if the status is actually an error
					let errorMsg = document.getElementById("error-msg")
					console.log(errorMsg)
					if(errorMsg)
						errorMsg.innerHTML = "Błąd"

					return redirect(window.location.href)
				}
			},
			{
				path: "register",
				element: <Register />,
				action: async({request}) => {
					let formData = await request.formData();

					let status = await fetch(`http://127.0.0.1:8000/api/register/`, {
						method: "post",
						credentials: "include",
						body: formData,
					}).then(res => res.text())

					let errorMsg = document.getElementById("error-msg")
					if(errorMsg && errorMsg.innerHTML)
						errorMsg.innerHTML = "Błąd"

					return redirect(window.location.href)
				}
			}]
	}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RouterProvider router={router} />
)
