import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { VideoLoaderData } from "../../types";
import "../../scss/video.scss";

export const Video = () => {
	const { source, embeddable } = useLoaderData() as VideoLoaderData;
	const title = useRecoilValue(lastWatchedTitle);

	return (
		<div id="player">
			<h1 id="title">{title}</h1>
			{embeddable ? 
				<video src={source} controls></video> :
				<div id="player-holder">
					<iframe src={source}></iframe>  
				</div>
			}
		</div>
	)
}
