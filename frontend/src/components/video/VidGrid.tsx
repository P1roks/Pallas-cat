import { useLoaderData } from "react-router";
import { SmallVid } from "./SmallVid";
import { Platform, Video } from "../../types";
import { VidGroup } from "./VidGroup";

export const VidGrid = () => {
	const { videos, platform, query } = useLoaderData() as {videos: Video[], platform: number,query: string};

	const favVids = JSON.parse(localStorage.getItem("favVids") ?? "[]") as string[]
	const smallVids = videos.map((vid, idx) => 
		<SmallVid 
			displayPlatform={false}
			platform={platform}
			img={vid.cover} 
			title={vid.title} 
			href={vid.link} 
			key={idx} 
			favVids={favVids}
		/>
	);

	return (
		<div id="videos">
			<VidGroup titleElem={
				<div id="query-info">
					<p>Serwis: {Platform[platform]}</p>
					<p>Wyszukiwanie: "{query}" (wyników: {videos?.length ?? 0})</p>
				</div>
			}>{smallVids}</VidGroup>
		</div>
	)
}
