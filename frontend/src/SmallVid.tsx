import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as outlineStar } from "@fortawesome/free-regular-svg-icons"
import {Link} from "react-router-dom"
import "./scss/smallVid.scss"
import {useState} from "react"
import {useSetRecoilState} from "recoil"
import {lastWatchedTitle} from "./atoms"
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

    const addToFavorite = () => {
    	setFavorite(!favorite)
	//TODO: implement this
    }
	
    return (
            <span className="wrapper">
	    	<FontAwesomeIcon icon={favorite ? filledStar : outlineStar} color="gold" onClick={addToFavorite} className="icon" />
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
