import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { VideoLoaderData } from "../../types";
import "../../scss/video.scss";

export const Video = () => {
	const { source, embeddable, nextEpisode } = useLoaderData() as VideoLoaderData;
	const title = useRecoilValue(lastWatchedTitle);
	let link: string = "";
	if(nextEpisode){
		let nextNo = Number(window.location.href.split('/').at(-1)) + 1;
		if(isNaN(nextNo)) link = "2";
		else link= `../${nextNo}`
	}

	return (
		<div id="player">
			<h1 id="title">{title}</h1>
			{embeddable ? 
				<video src={source} controls></video> :
				<div id="player-holder">
					<iframe src={source}></iframe>  
				</div>
			}
			{
				nextEpisode && link &&
				<Link id="next-episode" to={`${link}`} relative="path">Następny odcinek</Link>
			}
		</div>
	)
}
