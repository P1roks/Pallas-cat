import {VidGroupProps} from "../../types";

export const VidGroup = ({titleElem,children}: VidGroupProps) => (
	<div className="vid-group-wrapper">
		{titleElem}
		<div className="vid-wrapper">
			{children}
		</div>
	</div>
)
