import "./video.scss"

interface VideoProps {
	title: string,
	source: string,
}

export const Video = ({title,source}:VideoProps) => {
	return (
		<div id="player">
			<h1 id="title">{title}</h1>
			<video src={source} controls>
			</video>
		</div>
	)
}
