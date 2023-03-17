import {useLoaderData} from "react-router";
import {Video} from "../../types";
import {SmallVid} from "../video/SmallVid";
import {VidGroup} from "../video/VidGroup";

//TODO: make this non VidMain copy and probably add a function that forces rerender of video upon deletion 
export const Account = () => {
	const {videos} = useLoaderData() as {videos: Video[]};

	const [bigThumbnails,smallThumbnails] = videos.reduce(([bigThumbnails,smallThumbnails] : [Video[],Video[]],vid) => (
		vid.platform! !== 1 ? [[...bigThumbnails,vid],smallThumbnails] : [bigThumbnails,[...smallThumbnails,vid]]
	),[[],[]])

	const mapToVid = (vid: Video,idx: number) => 
		<SmallVid 
			displayPlatform={true}
			platform={vid.platform!} 
			vid={vid}
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
