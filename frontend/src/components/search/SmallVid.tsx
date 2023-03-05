import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { Platform, SmallVidProps } from "../../types";
import "../../scss/smallVid.scss";

export const SmallVid = ({ title, img, platform, href }: SmallVidProps) => {
    const [favorite, setFavorite] = useState(false);
    const setNewTitle = useSetRecoilState(lastWatchedTitle);

    const addToFavorite = () => {
    	setFavorite(!favorite)
		//TODO: implement this
    }
	
    return (
    	<div className="wrapper">
	    	<FontAwesomeIcon 
				className="icon" 
				icon={favorite ? filledStar : outlineStar} 
				color="gold" 
				onClick={addToFavorite} 
			/>
			<Link to={`/watch/${platform}/${href}`} 
				className="small-vid" 
				onClick={() => setNewTitle(title)}
				title={title}
			>
				<img src={img} alt="cover" />
				<span className="text-wrapper">
					<p className="title">{title}</p>
					<h6 className="platform">({Platform[platform]})</h6>
				</span>
			</Link>
        </div>
    )
}
