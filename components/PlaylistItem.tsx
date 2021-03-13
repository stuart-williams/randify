import { Flex, Icon, IconButton, Link } from "@chakra-ui/react";
import useRandomise from "common/hooks/use-randomise";
import { Playlist } from "common/spotify";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { FaRandom as RandomIcon } from "react-icons/fa";

export interface Props {
  playlist: Playlist;
}

const PlaylistItem: FunctionComponent<Props> = ({ playlist }) => {
  const { id, name, imageUrl, spotifyUrl } = playlist;
  const { randomise, isLoading } = useRandomise(playlist);

  return (
    <Flex data-cy={id} alignItems="center">
      <Image src={imageUrl} alt={name} width="50px" height="50px" />
      <Link
        mx={4}
        flex={1}
        href={spotifyUrl}
        fontSize="md"
        isExternal
        fontWeight="600"
        isTruncated
      >
        {name}
      </Link>
      <IconButton
        icon={<Icon as={RandomIcon} />}
        onClick={randomise}
        data-cy="randomise-btn"
        isLoading={isLoading}
        aria-label="Randomise this playlist"
        borderRadius="full"
      />
    </Flex>
  );
};

export default PlaylistItem;
