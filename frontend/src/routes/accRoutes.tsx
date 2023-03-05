import { redirect, RouteObject } from "react-router";
import { setRecoil } from "recoil-nexus";
import { logRegErr } from "../atoms";
import { Account } from "../components/accounts/Account";
import { Login } from "../components/accounts/Login";
import { Register } from "../components/accounts/Register";

export const accountRoutes: Array<RouteObject> = [
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
