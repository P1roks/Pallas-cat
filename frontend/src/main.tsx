import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Bar} from './Bar'
import './index.scss'
import {Video} from './Video'
import {VidGrid} from './VidGrid'

const router = createBrowserRouter([{
	path: "/",
	element: <VidGrid />
},
{
	path: "/watch/:id",
	element: <Video />
}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<>
		<Bar />
		<RouterProvider router={router} />
	</>
)
