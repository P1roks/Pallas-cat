import { useLoaderData } from "react-router";
import { SmallVid } from "./SmallVid";
import { VideoPlatform } from "../../types";
import {VidGroup} from "./VidGroup";

export const VidMain = () => {
	const {videos} = useLoaderData() as {videos: VideoPlatform[]};

	const [bigThumbnails,smallThumbnails] = videos.reduce(([bigThumbnails,smallThumbnails] : [VideoPlatform[],VideoPlatform[]],vid) => (
		vid.platform! !== 1 ? [[...bigThumbnails,vid],smallThumbnails] : [bigThumbnails,[...smallThumbnails,vid]]
	),[[],[]])

	const mapToVid = (vid: VideoPlatform,idx: number) => 
		<SmallVid 
			displayPlatform={true}
			platform={vid.platform} 
			img={vid.cover} 
			title={vid.title} 
			href={vid.link} 
			key={idx} 
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
