import { useLoaderData } from "react-router";
import { SmallVid } from "./SmallVid";
import { Video } from "../../types";
import {VidGroup} from "./VidGroup";

export const VidMain = () => {
	const {videos} = useLoaderData() as {videos: Video[]};

	const [bigThumbnails,smallThumbnails] = videos.reduce(([bigThumbnails,smallThumbnails] : [Video[],Video[]],vid) => (
		vid.platform! === 2 ? [[...bigThumbnails,vid],smallThumbnails] : [bigThumbnails,[...smallThumbnails,vid]]
	),[[],[]])

	const favVids = JSON.parse(localStorage.getItem("favVids") ?? "[]") as string[]
	const mapToVid = (vid: Video,idx: number) => 
		<SmallVid 
			displayPlatform={true}
			platform={vid.platform!}
			vid={vid}
			key={idx} 
			favVids={favVids}
		/>

	const bigVids = bigThumbnails.map(mapToVid);
	const smallVids = smallThumbnails.map(mapToVid);

	return (
		<div id="videos">
			<VidGroup titleElem={ <h1>Popularne Filmy i Seriale</h1> }>{smallVids}</VidGroup>
			<VidGroup titleElem={ <h1>Popularne Anime</h1> }>{bigVids}</VidGroup>
		</div>
	)
}
