import { useFetcher } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logRegErr } from "../../atoms";
import "../../scss/login.scss";

//TODO: add onlcick so that is actually works and not just only looks
//TODO: (?) add link to register
export const Login = () => {
	const {msg,color} = useRecoilValue(logRegErr);
	const fetcher = useFetcher();

	return (
		<fetcher.Form action="/login" id="login" method="post" >
			<label htmlFor="email">Email:</label>
			<input type="email" name="email" id="email" required placeholder="jan.kowalski@gmail.com" />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password" required placeholder="4rU3UCj2F0LXAocYTuSKDEA=" />

			<button id="login-button">Zaloguj się</button>

			<p id="error-msg" style={{color: color}}>{msg}</p>
		</fetcher.Form>	
	)
}
