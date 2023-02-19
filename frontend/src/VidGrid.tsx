import { Bar } from './Bar'
import { Platform, SmallVid } from './SmallVid';

export const VidGrid = () => {
  //TODO: display items based off users search result
  // let items = fetch(...)

  let videos = [<SmallVid href="3" title='test' img="https://i1.sndcdn.com/artworks-W8KXhQeXZrv2YSJO-ctOyHA-t500x500.jpg" platform={1} />,
  <SmallVid href="2" title='test2' img="https://bonito.pl/cache/1/976fb37-heartstopper-volume-_400.webp" platform={2} />]

  return (
      <div id="items">
	      <span id="container">
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
			{videos}
	      </span>
      </div>
  )
}

