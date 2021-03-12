import {
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import useRandomise from "common/hooks/use-randomise";
import { Playlist } from "common/spotify";
import Image from "next/image";
import React, { FunctionComponent } from "react";
import { FaRandom as RandomIcon } from "react-icons/fa";

export interface Props {
  playlist: Playlist;
}

const PlaylistItem: FunctionComponent<Props> = ({ playlist }) => {
  const { id, name, imageUrl, spotifyUrl, numberOfTracks } = playlist;
  const { randomise, isLoading } = useRandomise(playlist);
  const subColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <Flex
      data-cy={id}
      alignItems="center"
      sx={{
        img: {
          borderRadius: "md",
        },
      }}
    >
      <Flex position="relative" w={["40px", "50px"]} h={["40px", "50px"]}>
        <Image src={imageUrl} alt={name} layout="fill" />
      </Flex>
      <VStack mx={4} flex={1} spacing={0.5} alignItems="flex-start">
        <Link
          href={spotifyUrl}
          isExternal
          isTruncated
          fontSize={["sm", "md"]}
          fontWeight="600"
        >
          {name}
        </Link>
        <Text fontSize="xs" color={subColor}>
          {numberOfTracks} Songs
        </Text>
      </VStack>
      <IconButton
        data-cy="randomise-btn"
        icon={<Icon as={RandomIcon} />}
        onClick={randomise}
        isLoading={isLoading}
        aria-label="Randomise this playlist"
        borderRadius="full"
      />
    </Flex>
  );
};

export default PlaylistItem;
