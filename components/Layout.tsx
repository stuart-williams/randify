/* eslint-disable react/jsx-props-no-spreading */
import { Container, ContainerProps } from "@chakra-ui/react";
import AppBar from "components/AppBar";
import React, { FunctionComponent } from "react";

const Layout: FunctionComponent<ContainerProps> = ({ children, ...props }) => (
  <>
    <AppBar />
    <Container py={2} as="main" {...props}>
      {children}
    </Container>
  </>
);

export default Layout;
