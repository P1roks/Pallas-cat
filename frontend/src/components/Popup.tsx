import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PopupProps } from "../types";
import '../scss/popup.scss';

export const Popup = (props: PopupProps) => {
	return (
		<div id="popup">
			<div id="box">
				<FontAwesomeIcon 
					id="close" 
					icon={faXmark} 
					color="red" 
					onClick={props.onClose} 
				/>
				<h1 id="title">{props.title}</h1>
				{props.children}
			</div>
		</div>
	)
}