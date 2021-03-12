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
  const mode = useColorModeValue("Dark", "Light");
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
      position="sticky"
      boxShadow={scroll.y > 0 ? "sm" : "none"}
    >
      <Container maxW="container.xl">
        <HStack spacing={1} justifyContent="flex-end">
          <IconButton
            as={Link}
            icon={<Icon as={GithubIcon} />}
            href={process.env.REPO_URL}
            variant="ghost"
            isExternal
            aria-label={`Go to ${seo.title} Github page`}
          />
          {session && (
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
                  icon={<Icon as={ModeIcon} />}
                  data-cy="color-mode-btn"
                  onClick={toggleColorMode}
                >
                  {mode} mode
                </MenuItem>
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
        </HStack>
      </Container>
    </Flex>
  );
};

export default AppBar;
