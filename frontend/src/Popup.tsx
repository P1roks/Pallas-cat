import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {ReactElement} from 'react'
import './popup.scss'
import {useNavigate} from "react-router"


export const Popup = (props: {children: ReactElement,title: string}) => {
	//TODO: actual popup and not just subdomain
	const navigate = useNavigate();
	function disablePopup(){
		navigate("/")
	}

	return (
		<div id="popup">
			<div id="box">
				<FontAwesomeIcon icon={faXmark} color="red" id="close" onClick={disablePopup} />
				<h1 id="title">{props.title}</h1>
				{props.children}
			</div>
		</div>)
}
