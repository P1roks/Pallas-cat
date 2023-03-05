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
				onClick={addToFavorite} 
			/>

			<Link to={`/watch/${platform}/${href}`} 
				className="small-vid" 
				onClick={() => setNewTitle(title)}
				title={title}
			>
				<img src={img} alt="cover" />
				<div className="img-data">
					<span className="length img-info">23:59:59</span>
					<span className="quality img-info">1080p</span>
				</div>
				<span className="text-wrapper">
					<p className="title">{title}</p>
				</span>
			</Link>
        </div>
    )
}
