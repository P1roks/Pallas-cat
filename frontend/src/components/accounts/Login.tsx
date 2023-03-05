import "../../scss/login.scss"
import { useFetcher } from "react-router-dom"
import {useRecoilValue} from "recoil";
import {logRegErr} from "../../atoms";

//TODO: add onlcick so that is actually works and not just only looks
//TODO: (?) add link to register
export const Login = () => {
	const err = useRecoilValue(logRegErr);
	const fetcher = useFetcher();

	return (
		<fetcher.Form action="/login" id="login" method="post" >
			<label htmlFor="email">Email:</label>
			<input type="email" name="email" id="email" required />

			<label htmlFor="password">Hasło:</label>
			<input type="password" name="password" id="password" required />

			<button id="login-button">Zaloguj się</button>

			<p id="error-msg">{err}</p>
		</fetcher.Form>	
	)
}
