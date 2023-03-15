import { redirect, RouteObject } from "react-router";
import { setRecoil } from "recoil-nexus";
import { logRegErr } from "../atoms";
import { Account } from "../components/accounts/Account";
import { Login } from "../components/accounts/Login";
import { Register } from "../components/accounts/Register";
import {ErrElem} from "../components/ErrElem";
import {fetchFromApiJson} from "../utils";

export const accountRoutes: Array<RouteObject> = [
			{
				//TODO: make this non copy-paste of VidMain
				path: "account",
				element: <Account />,
				errorElement: <ErrElem errMsg="Musisz być zalogowany aby zobaczyć swój panel konta!"  />,
				loader: async() => {
					const videos = await fetchFromApiJson("fav_vids/");
					return {videos};
				}
			},
			{
				path: "login",
				element: <Login />,
				action: async({request}) => {
					const formData = await request.formData()

					return await fetch(`http://127.0.0.1:8000/api/login/`, {
						method: "post",
						credentials: "include",
						body: formData,
					}).then(async res => {
						const json = await res.json()
						if(!res.ok){
							setRecoil(logRegErr,{msg: json.message, color: "red"})
						}
						else{
							setRecoil(logRegErr,{msg: json.message, color: "lime"})
							//Again, this works better and makes favVids not bugged
							window.location.href = window.location.href;
						}
						return null;
					})

				}
			},
			{
				path: "register",
				element: <Register />,
				action: async({request}) => {
					let formData = await request.formData();

					return await fetch(`http://127.0.0.1:8000/api/register/`, {
						method: "post",
						credentials: "include",
						body: formData,
					}).then(async res => {
						const json = await res.json()
						if(!res.ok){
							setRecoil(logRegErr,{msg: json.message, color: "red"});
							return null;
						}
						else{
							setRecoil(logRegErr,{msg: json.message, color: "lime"});
							return redirect(window.location.href);
						}
					})

				}
			}
]
