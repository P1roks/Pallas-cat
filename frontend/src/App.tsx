import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Bar } from './Bar'
import {FC} from 'react';
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
        {items}
        {items}
        {items}
        {items}
        {items}
        {items}
      </div>
    </>
  )
}

export default App
