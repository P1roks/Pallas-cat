import {useLoaderData} from "react-router";
import {Link} from "react-router-dom";
import "./video.scss"

export const Video = () => {
	const {source} = useLoaderData() as {source: string};
	// const [state,setState] = useState("");

	return (
		<div id="player">
			<h1 id="title">title</h1>
			<video src={source} controls>
			</video>
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
