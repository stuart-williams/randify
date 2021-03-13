/* eslint-disable react/jsx-props-no-spreading */
import { Container, ContainerProps, Flex } from "@chakra-ui/react";
import AppBar from "components/AppBar";
import React, { FunctionComponent } from "react";

const Layout: FunctionComponent<ContainerProps> = ({ children, ...props }) => (
  <>
    <AppBar />
    <Container my={4} as="main" {...props}>
      {children}
    </Container>
    <Flex p={4} as="footer">
      <Container />
    </Flex>
  </>
);

export default Layout;
