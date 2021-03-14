import {
  Box,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/client";
import React, { FunctionComponent } from "react";
import {
  FaCog as SessingsIcon,
  FaSignOutAlt as SignOutIcon,
} from "react-icons/fa";

const AppBar: FunctionComponent = () => {
  const [session] = useSession();

  if (!session) {
    return null;
  }

  return (
    <Container py={2} as="header" display="flex" justifyContent="flex-end">
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
    </Container>
  );
};

export default AppBar;
