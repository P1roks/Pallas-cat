import { redirect, RouteObject } from "react-router";
import { setRecoil } from "recoil-nexus";
import { logRegErr } from "../atoms";
import { Account } from "../components/accounts/Account";
import { Login } from "../components/accounts/Login";
import { Register } from "../components/accounts/Register";

export const accountRoutes: Array<RouteObject> = [
			{
				//TODO: make this non copy-paste of VidMain
				path: "account",
				element: <Account />,
				// errorElement: ,
				loader: async() => {
					return fetch("http://127.0.0.1:8000/api/fav_vids/",{
						credentials: "include"
					})
					.then(async(res:Response) => {
						if (!res.ok)
							throw new Error(`HTTP err: ${res.status}`)

						const data = (await res.json()).map(single => single.fields)

						return {videos: data}
					})
				}
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
					}).then(async res => {
						const json = await res.json()
						if(!res.ok)
							setRecoil(logRegErr,{msg: json.message, color: "red"})
						else
							setRecoil(logRegErr,{msg: json.message, color: "lime"})
					})

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
					}).then(async res => {
						const json = await res.json()
						if(!res.ok)
							setRecoil(logRegErr,{msg: json.message, color: "red"})
						else
							setRecoil(logRegErr,{msg: json.message, color: "lime"})
					})

					return redirect(window.location.href)
				}
			}
]
