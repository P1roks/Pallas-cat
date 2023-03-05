import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { lastWatchedTitle } from "../../atoms";
import "../../scss/video.scss";

interface LoaderData {
	source: string,
	embeddable: boolean,
}

export const Video = () => {
	const { source, embeddable } = useLoaderData() as LoaderData;
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

export const VideoErr = () => (
	<div id="err">
		<img src="/notFound.svg" alt="Error picture"/>
		<span>
			<h1> Przepraszamy, ale to video nie jest dostępne! </h1>
			<Link to="/"> Powrót na stronę główną </Link>
		</span>
	</div>
)