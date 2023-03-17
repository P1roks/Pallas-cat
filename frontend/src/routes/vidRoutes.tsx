import {RouteObject} from "react-router";
import {Link} from "react-router-dom";
import {ErrElem} from "../components/ErrElem";
import {Video} from "../components/player/Video";
import {VidGrid} from "../components/video/VidGrid";
import {VidMain} from "../components/video/VidMain";
import {fetchFromApiJson} from "../utils";

export const vidRoutes: Array<RouteObject> = [
	{
		path: "/debug",
		element: <div style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center", 
			flexDirection: "column"
		}}>
			<h1>DEBUG PATH</h1>
			<Link to="/search/2/test">search test</Link>
			<Link to="/watch/1/578237997">watch test</Link>
		</div>,
	},
	{
		path: "/",
		element: <VidMain />,
		loader: async() => {
			const videos = await fetchFromApiJson("random/");
			return {videos};
		}
	},
	{
		path: "search/:platform/:query",
		element: <VidGrid />,
		errorElement: <ErrElem errMsg="Nic nie znaleziono" />,
		loader: async({ params }) => {
			if(!params.platform || !params.query)
				throw new Error();

			const videos = await fetchFromApiJson("search",params.platform,params.query);
			return { videos: videos, platform: params.platform, query: params.query };
		},
	},
	{
		path: "watch/:platform/:id",
		element: <Video />,
		errorElement: <ErrElem errMsg="Przepraszamy, ale to video nie jest dostępne!"/>,
		loader: async({ params }) => {
			if(!params.platform || !params.id)
				throw new Error();

			const video = await fetchFromApiJson("video",params.platform,params.id)
			return {source: video.streamUrl, embeddable: video.embeddable}
		},
	},
]
