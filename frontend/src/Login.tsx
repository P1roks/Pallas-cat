import "./login.scss"
import { useFetcher } from "react-router-dom"

//TODO: add onlcick so that is actually works and not just only looks
//TODO: (?) add link to register
export const Login = () => {
	const fetcher = useFetcher();
	return (
		<fetcher.Form action="/login" id="login" method="post" >
			<label htmlFor="username">Email:</label>
			<input type="email" name="username" id="username" />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password"/>

			<button id="login-button">Zaloguj się</button>
		</fetcher.Form>	
	)
}
