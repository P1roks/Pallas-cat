import {useLoaderData} from "react-router";
import {VideoPlatform} from "../../types";
import {SmallVid} from "../video/SmallVid";
import {VidGroup} from "../video/VidGroup";

//TODO: make this non VidMain copy and probably add a function that forces rerender of video upon deletion 
export const Account = () => {
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
			fav={true}
		/>

	const bigVids = bigThumbnails.map(mapToVid);
	const smallVids = smallThumbnails.map(mapToVid);

	return (
		<div id="videos">
			<VidGroup titleElem={ <h1>Twoje ulubione filmy i seriale</h1> }>{smallVids}</VidGroup>
			<VidGroup titleElem={ <h1>Twoje ulubione anime</h1> }>{bigVids}</VidGroup>
		</div>
	)
}
