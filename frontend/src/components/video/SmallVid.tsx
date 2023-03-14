import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { Platform, SmallVidProps } from "../../types";
import "../../scss/smallVid.scss";

export const SmallVid = ({ title, img, platform, href, displayPlatform, fav, favVids }: SmallVidProps) => {
    const [favorite, setFavorite] = useState(fav ? fav : favVids ? favVids.includes(href) : false);
    const setNewTitle = useSetRecoilState(lastWatchedTitle);


    const deleteFavorite = useCallback(() => {
	const del = async() => {
		await fetch(`http://127.0.0.1:8000/api/favorite/${platform}/${href}`,
		{
			credentials: "include",method: "delete",
			headers: {"Content-Type": "application/json"},
		})
	}
	del()
    },[])

    const addFavorite = useCallback(() => {
	const add = async() => {
		await fetch("http://127.0.0.1:8000/api/favorite/",
		{
			credentials: "include",method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({platform,link: href,title,cover: img})
		})
	}
	add()
    },[])
	
    return (
    	<div className="wrapper">
	    	<FontAwesomeIcon 
				className="icon" 
				icon={favorite ? filledStar : outlineStar} 
				onClick={() => {favorite ? deleteFavorite() : addFavorite(); setFavorite(!favorite)} } 
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
					<p className="title">{title} {displayPlatform && `(${Platform[platform]})`}</p>
				</span>
			</Link>
        </div>
    )
}
