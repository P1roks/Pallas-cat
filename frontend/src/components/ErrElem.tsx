import {Link} from "react-router-dom";
import "../scss/error.scss"

export const ErrElem = ({errMsg}: {errMsg?: string}) => {
	return (
		<div id="err">
			<img src="/notFound.svg" alt="Error picture"/>
			<span>
				<h1>{errMsg ?? "Wystąpił nieoczekiwany błąd"}</h1>
				<h1></h1>
				<Link to="/"> Powrót na stronę główną </Link>
			</span>
		</div>
	)
}
