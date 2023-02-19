import {useEffect, useState} from "react";
import {useLoaderData} from "react-router";
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
	<h1 id="err"> Przepraszamy, ale to video nie jest dostępne! </h1>
)
