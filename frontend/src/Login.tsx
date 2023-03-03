import "./login.scss"
import { useFetcher } from "react-router-dom"

//TODO: add onlcick so that is actually works and not just only looks
//TODO: (?) add link to register
export const Login = () => {
	const fetcher = useFetcher();
	return (
		<fetcher.Form action="/login" id="login" method="post" >
			<label htmlFor="email">Email:</label>
			<input type="text" name="email" id="email" required />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password" required />

			<button id="login-button">Zaloguj się</button>
		</fetcher.Form>	
	)
}
