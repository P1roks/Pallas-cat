import { useFetcher } from "react-router-dom";

export const Register = () => {
	const fetcher = useFetcher();

	return (
		<fetcher.Form action="/register" id="register" method="post">
			<label htmlFor="username">Nazwa użytkownika:</label>
			<input type="text" name="username" id="username" required placeholder="xXx_P4RK3R-xXx" />

			<label htmlFor="email">Email:</label>
			<input type="email" name="email" id="email" required placeholder="jan.kowalski@gmail.com" />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password" required placeholder="4rU3UCj2F0LXAocYTuSKDEA=" />

			<label htmlFor="passwordR">Powtórz hasło:</label>
			<input type="password" name="passwordR" id="passwordR" required placeholder="4rU3UCj2F0LXAocYTuSKDEA=" />

			<button id="register-button">Zarejestruj się</button>
			<p id="error-msg"></p>
		</fetcher.Form>	
	)
}
