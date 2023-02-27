import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {ReactElement} from 'react'
import './popup.scss'


export const Popup = (props: {children: ReactElement,title: string, onClose: any}) => {
	return (
		<div id="popup">
			<div id="box">
				<FontAwesomeIcon icon={faXmark} color="red" id="close" onClick={props.onClose} />
				<h1 id="title">{props.title}</h1>
				{props.children}
			</div>
		</div>)
}
