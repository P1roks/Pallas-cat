import { useLoaderData } from "react-router";
import { SmallVid } from "./SmallVid";
import { Platform, Video } from "../../types";

export const VidGrid = () => {
	const { videos, platform, query } = useLoaderData() as any;
	const videosJSON: Video[] = JSON.parse(videos);

	const smallVids = videosJSON?.map((vid, idx) => 
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
			<div id="query-info">
				<p>Serwis: {Platform[platform]}</p>
				<p>Wyszukiwanie: "{query}" (wyników: {videosJSON?.length ?? 0})</p>
			</div>
			<div id="container">
				{smallVids}
			</div>
		</div>
	)
}
