import {RouteObject} from "react-router";
import {Link} from "react-router-dom";
import {Video, VideoErr} from "../components/player/Video";
import {VidGrid} from "../components/search/VidGrid";

export const vidRoutes: Array<RouteObject> = [
	{
		path: "/",
		element: <div style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center", 
			flexDirection: "column"
		}}>
			<h1>TODO: insert Random videos here</h1>
			<Link to="/search/2/test">search test</Link>
			<Link to="/watch/1/578237997">watch test</Link>
		</div>,
	},
	{
		path: "search/:platform/:query",
		element: <VidGrid />,
		loader: async({ params }) => {
			//TEMP URL
			return fetch(`http://127.0.0.1:8000/api/search/${params.platform}/${params.query}`)
			.then(async (res: Response) => {
				if(!res.ok)
					throw new Error(`HTTP err: ${res.status}`)

				const data = await res.json();
				return { videos: data.videos, platform: params.platform, query: params.query };
			});
		},
	},
	{
		path: "watch/:platform/:id",
		element: <Video />,
		errorElement: <VideoErr />,
		loader: async({ params }) => {
			//TEMP URL
			return fetch(`http://127.0.0.1:8000/api/video/${params.platform}/${params.id}`).then(async (res: Response) => {
			if(!res.ok)
				throw new Error(`HTTP err: ${res.status}`)

			let data = await res.json();
			return {source: data.streamUrl, embeddable: data.embeddable}
			})
		},
	},
]
