import { useLoaderData } from "react-router";
import { SmallVid } from "./SmallVid";

interface Video {
	link: string,
	title: string,
	cover: string,
}

export const VidGrid = () => {
	const { platform, videos } = useLoaderData() as any;
	const videosJSON: Video[] = JSON.parse(videos);

	const smallVids = videosJSON.map((vid, idx) => 
		<SmallVid 
			platform={platform} 
			img={vid.cover} 
			title={vid.title} 
			href={vid.link} 
			key={idx} 
		/>
	);

	return (
		<div id="videos">
			<span id="container">
				{smallVids}
			</span>
		</div>
	)
}
