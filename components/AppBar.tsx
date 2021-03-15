import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Img,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import logoSrc from "public/images/icon-white.svg";
import React, { FunctionComponent } from "react";
import {
  FaSignOutAlt as SignOutIcon,
  FaUserCircle as SessingsIcon,
} from "react-icons/fa";

const AppBar: FunctionComponent = () => {
  const [session] = useSession();

  return (
    <Container as="header" display="flex" alignItems="center">
      <Flex flex={1} height="54px" alignItems="center">
        <Img src={logoSrc} alt="Randify" boxSize="32px" />
        <Text ml={2} fontWeight="bold">
          Randify
        </Text>
      </Flex>
      {session && (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<Icon as={SessingsIcon} />}
            data-cy="settings-menu-btn"
            variant="ghost"
            aria-label="Settings"
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
      )}
    </Container>
  );
};

export default AppBar;
