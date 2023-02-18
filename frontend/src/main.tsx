import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Bar} from './Bar'
import './index.scss'
import {Video} from './Video'
import {VidGrid} from './VidGrid'

const router = createBrowserRouter([{
	//TODO: Make it possible to search, but first need to make that option fully functional in the backend
	path: "/",
	element: <VidGrid />
},
{
	//TODO: fetch given id, and use it as props for the Video component
	path: "/watch/:id",
	element: <Video title="Test" source="https://vwaw401.cda.pl/XOjwD6_oDljbXiTa3CD_Bg/1676804262/sdba6eb9a5e5181066bb9321c4c58a5821.mp4" />
}])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<Bar />
		<RouterProvider router={router} />
	</>
)
