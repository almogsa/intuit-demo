import {render, screen} from '@testing-library/react';
import Playlist from "./components/Playlist/Playlist";


test('Render playlist and verify adding songs', () => {
  const playlist = ['https://www.youtube.com/watch?v=L5CV53wCWO0'];
  render(<Playlist playlist={playlist}/>)
  const list = screen.getByTestId(/song-list/i);
  expect(list).toBeInTheDocument();
  const listItem = screen.getByTestId(/song-item/i);
  expect(listItem).toBeInTheDocument();
})
