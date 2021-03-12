import { Button, Icon } from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import React, { FunctionComponent } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";

const SpotifyAuthButton: FunctionComponent = () => (
  <Button
    data-cy="signin-btn"
    onClick={() => signIn("spotify")}
    leftIcon={<Icon as={SpotifyIcon} />}
    colorScheme="green"
  >
    Sign in with Spotify
  </Button>
);

export default SpotifyAuthButton;
