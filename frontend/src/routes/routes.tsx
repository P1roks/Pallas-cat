import { createBrowserRouter, Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import { Bar } from '../components/Bar';
import { vidRoutes } from './vidRoutes';
import { accountRoutes } from './accRoutes';
import {fetchFromApiJson} from '../utils';
import { ThemeWrapper } from '../components/ThemeWrapper';

export const router = createBrowserRouter([
	{
	path:"/",
	element: (<RecoilRoot>
			<RecoilNexus />
			<ThemeWrapper>
				<Bar />
				<Outlet />
			</ThemeWrapper>
		</RecoilRoot>),
		loader: async() => {
			const isLogged = await fetchFromApiJson("check/");
			if(isLogged.fav_vids){
				localStorage.setItem('favVids', JSON.stringify(isLogged.fav_vids));
			}
			
			return {isLogged: isLogged.logged, username: isLogged?.username}
		},
		children: [
				...vidRoutes,
				...accountRoutes,
			]
	}
])
