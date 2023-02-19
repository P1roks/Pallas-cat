import {useEffect, useState} from "react";
import {useLoaderData} from "react-router";
import "./video.scss"

interface VideoProps {
	title: string,
	source: string,
}

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

