import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import React, { FunctionComponent } from "react";
import {
  FaSignOutAlt as SignOutIcon,
  FaUserCircle as UserIcon,
} from "react-icons/fa";
import { useWindowScroll } from "react-use";

const AppBar: FunctionComponent = () => {
  const bg = useColorModeValue("white", "gray.800");
  const scroll = useWindowScroll();
  const [session] = useSession();

  if (!session) {
    return null;
  }

  return (
    <Flex
      p={2}
      bg={bg}
      top={0}
      as="header"
      zIndex="sticky"
      position="sticky"
      boxShadow={scroll.y > 0 ? "md" : "none"}
    >
      <Container maxW="container.xl">
        <HStack spacing={1} justifyContent="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={UserIcon} />}
              data-cy="account-menu-btn"
              variant="ghost"
              aria-label="Account"
            />
            <MenuList>
              <Box textAlign="center">
                <Text>{session.user.name}</Text>
              </Box>
              <MenuDivider />
              <MenuItem
                icon={<SignOutIcon />}
                data-cy="signout-btn"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Container>
    </Flex>
  );
};

export default AppBar;
