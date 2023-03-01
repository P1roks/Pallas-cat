import {useFetcher} from "react-router-dom"

export const Register = () => {
	let fetcher = useFetcher()

	return (
		<fetcher.Form action="/register" id="register" method="post">
			<label htmlFor="username">Nazwa użytkownika:</label>
			<input type="text" name="username" id="username" required />

			<label htmlFor="email">Email:</label>
			<input type="email" name="email" id="email" required />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password" required />

			<label htmlFor="passwordR">Powtórz hasło:</label>
			<input type="password" name="passwordR" id="passwordR" required />

			<button id="register-button">Zarejestruj się</button>
		</fetcher.Form>	
)}
