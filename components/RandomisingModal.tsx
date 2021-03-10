import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import { RandomisingState, randomisingState } from "common/atoms";
import React, { FunctionComponent, useEffect } from "react";
import { FaSpotify as SpotifyIcon } from "react-icons/fa";
import { useRecoilState } from "recoil";

const getStatus = (state: RandomisingState) => {
  if (state.isLoading) return "info";
  if (state.error) return "error";
  return "success";
};

const getTitle = (state: RandomisingState): string => {
  if (state.isLoading) return `Randomising "${state.playlist?.name}"`;
  if (state.error) return "Oops, something went wrong!";
  return `"${state.playlist?.name}" successfully randomised! 🎉`;
};

const getDescription = (state: RandomisingState): string => {
  if (state.isLoading) return "This might take a minute...";
  if (state.error) return "Please try again.";
  return "";
};

const RandomisingModal: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state] = useRecoilState(randomisingState);
  const status = getStatus(state);
  const title = getTitle(state);
  const description = getDescription(state);

  useEffect(() => {
    if (!isOpen && state.isLoading) {
      onOpen();
    }
  }, [state.isLoading, isOpen, onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={!state.isLoading}
    >
      <ModalOverlay />
      <ModalContent mx={4} data-cy="randomising" data-status={status}>
        <ModalBody textAlign="center">
          <Alert
            bg="transparent"
            status={status}
            height="200px"
            variant="subtle"
            textAlign="center"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {title}
            </AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
          </Alert>
          {state.isLoading && <Progress isIndeterminate />}
        </ModalBody>
        <ModalFooter>
          {!state.isLoading && !state.error && (
            <Button
              as={Link}
              mr={2}
              href={state.playlist?.spotifyUrl}
              leftIcon={<Icon as={SpotifyIcon} />}
              isExternal
              colorScheme="green"
              textDecoration="none !important"
            >
              Open with Spotify
            </Button>
          )}
          {!state.isLoading && (
            <Button data-cy="dismiss" onClick={onClose}>
              Dismiss
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RandomisingModal;
