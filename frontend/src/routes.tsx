import './scss/index.scss'
import {createBrowserRouter, Link, Outlet, redirect, RouteObject} from 'react-router-dom'
import {Account} from './Account'
import {Bar} from './Bar'
import {Login} from './Login'
import {Register} from './Register'
import {Video, VideoErr} from './Video'
import {VidGrid} from './VidGrid'
import {RecoilRoot} from 'recoil'
import { setRecoil } from 'recoil-nexus'
import {logRegErr} from './atoms'
import RecoilNexus from 'recoil-nexus'


const vidRoutes: Array<RouteObject> = [
			{
				path: "/",
				element: <div style={{display: "flex",justifyContent:"center",alignItems:"Center", flexDirection: "column"}}>
					<h1>TODO: insert Random videos here</h1>
					<Link to="/search/2/test">search test</Link>
					<Link to="/watch/1/578237997">watch test</Link>
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
]

const accountRoutes: Array<RouteObject> = [
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
					setRecoil(logRegErr,"TODO")

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
					setRecoil(logRegErr,"TODO")

					return redirect(window.location.href)
				}
			}
]

export const router = createBrowserRouter([
	{
	path:"/",
	element: (<RecoilRoot>
			<RecoilNexus />
			<Bar />
			<Outlet />
		</RecoilRoot>),
		loader: async() => {
			let isLogged = await fetch("http://127.0.0.1:8000/api/check/",{credentials: "include"})
			.then(res => res.text()).then(txt => JSON.parse(txt))
			return {isLogged: isLogged.logged}
		},
		children: [
				...vidRoutes,
				...accountRoutes
			]
	}])
