import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons"
import {Link} from "react-router-dom"
import "../../scss/smallVid.scss"
import {useCallback, useState} from "react"
import {useSetRecoilState} from "recoil"
import {lastWatchedTitle} from "../../atoms"
//TODO: add platform to props
interface VidProps {
    title: string,
    img: string,
    href: string,
    platform: Platform,
}

export enum Platform {
	CDA = 1,
	OgladajAnime,
	hdbest,
}

export const SmallVid = ({title,img,platform,href}: VidProps) => {
    const [favorite,setFavorite] = useState(false)
    const setNewTitle = useSetRecoilState(lastWatchedTitle)

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

    const changeFavorite = () => {
    	//del
	if(favorite){
		deleteFavorite()
	}
	//add
	else{
		addFavorite()
	}

    	setFavorite(!favorite)
    }
	
    return (
            <span className="wrapper">
	    	<FontAwesomeIcon icon={favorite ? filledStar : outlineStar} color="gold" onClick={changeFavorite} className="icon" />
		<Link to={`/watch/${platform}/${href}`} className="small-vid" onClick={() => setNewTitle(title)}>
			<img src={img} alt="Cover art" />
			<span className="text-wrapper">
			    <p className="title">{title}</p>
			    <h6 className="platform">({Platform[platform]})</h6>
			</span>
		</Link>
            </span>
    )
}
