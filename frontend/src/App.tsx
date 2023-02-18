import { Bar } from './Bar'
import { Item } from './Item';

function App() {
  //TODO: display items based off users search result
  // let items = fetch(...)

  let items = [<Item href="#" title='test' img="https://i1.sndcdn.com/artworks-W8KXhQeXZrv2YSJO-ctOyHA-t500x500.jpg" year={2011} />,
  <Item href="#" title='test2' img="https://bonito.pl/cache/1/976fb37-heartstopper-volume-_400.webp" year={2011} />]

  return (
    <>
      <Bar />
      <div id="items">
	      <span id="container">
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
			{items}
	      </span>
      </div>
    </>
  )
}

export default App
