import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import "./scss/user.scss"
import {Link, useNavigate} from "react-router-dom"
import {useCallback} from "react"

export const User = ({name}: {name: string}) => {
	const navigate = useNavigate()
	const logout = useCallback(() => {
		let tryLogout = async() => {
			let status = await fetch("http://127.0.0.1:8000/api/logout/",{credentials: "include"})
			.then(res => res.text())
			.then(txt => JSON.parse(txt).loggedOut as {loggedOut: boolean})

			status && navigate("/")
		}
		tryLogout()
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
