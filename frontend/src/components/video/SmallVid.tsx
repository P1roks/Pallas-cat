import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { Platform, SmallVidProps } from "../../types";
import "../../scss/smallVid.scss";

export const SmallVid = ({ vid, platform, displayPlatform, fav, favVids }: SmallVidProps) => {
	const [favorite, setFavorite] = useState(fav ? fav : favVids ? favVids.includes(vid.link) : false);
    const setNewTitle = useSetRecoilState(lastWatchedTitle);

	const setTitle = (title: string): void => {
		localStorage.setItem('lastTitle',title);
		setNewTitle(title);
	}

    const deleteFavorite = useCallback(() => {
	const del = async() => {
		await fetch(`http://127.0.0.1:8000/api/favorite/${platform}/${vid.link}`,
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
			body: JSON.stringify({
				platform,
				...vid
			})
		})
	}
	add()
    },[])

	const spanTime = vid?.time ? <span className="time img-info">{vid.time}</span> : null;
	const spanQuality = vid?.quality ? <span className="quality img-info">{vid.quality}</span> : null;
	
    return (
    	<div className="wrapper">
	    	<FontAwesomeIcon 
				className="icon" 
				icon={favorite ? filledStar : outlineStar} 
				onClick={() => {favorite ? deleteFavorite() : addFavorite(); setFavorite(!favorite)} } 
			/>

			<Link to={`/watch/${platform}/${vid.link}`} 
				className="small-vid" 
				onClick={() => setTitle(vid.title)}
				title={vid.title}
			>
				<img src={vid.cover} alt="cover" />
				<div className="img-data">
					{spanTime}
					{spanQuality}
				</div>
				<span className="text-wrapper">
					<p className="title">{vid.title} {displayPlatform && `(${Platform[platform]})`}</p>
				</span>
			</Link>
        </div>
    )
}
