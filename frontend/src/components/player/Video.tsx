import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import { VideoLoaderData } from "../../types";
import "../../scss/video.scss";

export const Video = () => {
	const { source, embeddable, isNextEpisode } = useLoaderData() as VideoLoaderData;
	const title = useRecoilValue(lastWatchedTitle);

	let linkNext: string = "", linkPrev: string = "";
	if(isNextEpisode) {
		let curr = Number(window.location.href.split('/').at(-1));
		if(isNaN(curr)) {
			linkPrev = "1";
			linkNext = "2";
		} else {
			linkPrev = `../${Math.max(1, curr - 1)}`
			linkNext = `../${curr + 1}`
		}
	}

	return (
		<div id="player">
			<div id="title">
				<div className="buttons">
					{
						isNextEpisode && linkPrev &&
						<Link className="episode-button" to={`${linkPrev}`} relative="path">{'<<'} Poprzedni odcinek</Link>
					}
					{
						isNextEpisode && linkNext &&
						<Link className="episode-button" to={`${linkNext}`} relative="path">Następny odcinek {'>>'}</Link>
					}
				</div>
				<h1>{title}</h1>
			</div>
			{embeddable ? 
				<video src={source} controls></video> :
				<div id="player-holder">
					<iframe src={source}></iframe>  
				</div>
			}

		</div>
	)
}
