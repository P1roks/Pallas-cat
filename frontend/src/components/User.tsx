import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../scss/user.scss";

export const User = ({name}: {name: string}) => {
	const navigate = useNavigate();
	const logout = useCallback(() => {
		const tryLogout = async() => {
			const status = await fetch("http://127.0.0.1:8000/api/logout/",
				{ credentials: "include" }
			).then(res => res.text())
			.then(txt => JSON.parse(txt).loggedOut as { loggedOut: boolean })

			if(status){
				localStorage.setItem("favVids", "[]")
				navigate("/")
			}
		}
		tryLogout();
	},[])

	return (
		<div id="user-icon">
			<Link to="/account" id="acc-link">
				<FontAwesomeIcon icon={faUser} id="icon" />
				<p>{name}</p>
			</Link>
			<p onClick={logout} id="logout-button">Wyloguj się</p>
		</div>
	)
}
