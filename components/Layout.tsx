import { Container, Flex } from "@chakra-ui/react";
import AppBar from "components/AppBar";
import React, { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => (
  <>
    <AppBar />
    <Container my={4}>{children}</Container>
    <Flex p={4} as="footer">
      <Container />
    </Flex>
  </>
);

export default Layout;
