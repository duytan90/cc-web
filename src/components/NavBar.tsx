import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface NavBarProps {
  variant?: "small" | "regular";
}

export const NavBar: React.FC<NavBarProps> = ({
  children,
  variant = "regular"
}) => {
  return (
    <Flex p={4}>
      <Box ml={"auto"}>
        <NextLink href="/login">
          <Link p={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link p={2}>Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
