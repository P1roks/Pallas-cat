import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import "../scss/user.scss";
import {useSetRecoilState} from "recoil";
import {logRegErr} from "../atoms";

export const User = ({name}: {name: string}) => {
	const setLogReg = useSetRecoilState(logRegErr);
	const logout = useCallback(() => {
		const tryLogout = async() => {
			const status = await fetch("http://127.0.0.1:8000/api/logout/",
				{ credentials: "include" }
			).then(res => res.text())
			.then(txt => JSON.parse(txt).loggedOut as { loggedOut: boolean })

			if(status){
				setLogReg({msg: "", color: "white"});
				localStorage.setItem("favVids", "[]");
				//This, in contrast to useNavigate causes Bar to rerender 100% of the time
				if(window.location.href.split("/").at(-1) === "account")
					window.location.href = "/";
				else
					window.location.href = window.location.href;
			}
		}
		tryLogout();
	},[])

	return (
		<div className="user-icon">
			<Link to="/account" className="acc-link panel">
				<FontAwesomeIcon icon={faUser} className="icon" color="black" />
				<p>{name}</p>
			</Link>
			<p onClick={logout} className="logout-button panel">Wyloguj się</p>
		</div>
	)
}
