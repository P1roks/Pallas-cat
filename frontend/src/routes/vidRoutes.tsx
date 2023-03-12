import {RouteObject} from "react-router";
import {Link} from "react-router-dom";
import {ErrElem} from "../components/ErrElem";
import {Video} from "../components/player/Video";
import {VidGrid} from "../components/video/VidGrid";
import {VidMain} from "../components/video/VidMain";

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
			return fetch("http://127.0.0.1:8000/api/random/")
			.then(async(res:Response) => {
				if (!res.ok)
					throw new Error(`HTTP err: ${res.status}`)

				const data = (await res.json()).map(single => single.fields)

				return {videos: data}
			})
		}
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
				const videos = JSON.parse(data.videos)
				console.log(videos)
				return { videos: videos, platform: params.platform, query: params.query };
			});
		},
	},
	{
		path: "watch/:platform/:id",
		element: <Video />,
		errorElement: <ErrElem errMsg="Przepraszamy, ale to video nie jest dostępne!"/>,
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
