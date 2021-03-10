import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import seo from "common/seo";
import { signOut, useSession } from "next-auth/client";
import React, { FunctionComponent } from "react";
import {
  FaGithub as GithubIcon,
  FaMoon as MoonIcon,
  FaSignOutAlt as SignOutIcon,
  FaSun as SunIcon,
  FaUserCircle as UserIcon,
} from "react-icons/fa";
import { useWindowScroll } from "react-use";

const AppBar: FunctionComponent = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const mode = useColorModeValue("dark", "light");
  const ModeIcon = useColorModeValue(MoonIcon, SunIcon);
  const scroll = useWindowScroll();
  const [session] = useSession();

  return (
    <Flex
      p={2}
      bg={bg}
      top={0}
      as="header"
      zIndex="sticky"
      data-cy="appbar"
      position="sticky"
      boxShadow={scroll.y > 0 ? "sm" : "none"}
    >
      <Container maxW="container.xl">
        <HStack justifyContent="flex-end">
          <IconButton
            as={Link}
            icon={<Icon as={GithubIcon} />}
            href={process.env.REPO_URL}
            variant="ghost"
            isExternal
            aria-label={`Go to ${seo.title} Github page`}
          />
          <IconButton
            icon={<Icon as={ModeIcon} />}
            variant="ghost"
            data-cy="color-mode"
            onClick={toggleColorMode}
            aria-label={`Switch to ${mode} mode`}
          />
          {session && (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<Icon as={UserIcon} />}
                data-cy="account"
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
                  data-cy="signout"
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                >
                  Sign out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Container>
    </Flex>
  );
};

export default AppBar;
