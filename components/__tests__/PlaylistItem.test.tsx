import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { Playlist } from "common/spotify";
import theme from "common/theme";
import PlaylistItem from "components/PlaylistItem";
import React from "react";
import { RecoilRoot } from "recoil";

const Providers: React.FunctionComponent = ({ children }) => (
  <ChakraProvider theme={theme}>
    <RecoilRoot>{children}</RecoilRoot>
  </ChakraProvider>
);

const playlist: Playlist = {
  id: "playlist_1",
  name: "Playlist 1",
  imageUrl: "playlist_1.png",
  spotifyUrl: "playlist/playlist_1",
  numberOfTracks: 32,
};

describe("<PlaylistItem />", () => {
  it("should render as expected", () => {
    render(<PlaylistItem playlist={playlist} />, { wrapper: Providers });

    // screen.debug();

    /**
     * Image assertions
     */
    const image = screen.getByAltText("Playlist 1");

    expect(image).toHaveAttribute("src", "playlist_1.png");

    /**
     * Title assertions
     */
    const title = screen.getByRole("link", { name: "Playlist 1" });

    expect(title).toHaveAttribute("href", "playlist/playlist_1");
    expect(title).toHaveAttribute("rel", "noopener noreferrer");
    expect(title).toHaveAttribute("target", "_blank");
  });
});

export default {};
