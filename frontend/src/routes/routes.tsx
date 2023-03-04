import {createBrowserRouter, Outlet} from 'react-router-dom'
import {RecoilRoot} from 'recoil'
import RecoilNexus from 'recoil-nexus'
import {Bar} from '../components/Bar'
import {vidRoutes} from './vidRoutes'
import {accountRoutes} from './accRoutes'

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
				...accountRoutes,
			]
	}])
