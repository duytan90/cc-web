import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {
  variant?: "small" | "regular";
}

const userInfo = () => {
  const [{ fetching: queryMeFetching, data }] = useMeQuery({
    pause: isServer() // Stop send un-nessessary request to server
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  if (data?.me) {
    return (
      <Flex>
        <Box>{data.me.username}</Box>
        <Button
          onClick={() => logout()}
          variant="link"
          isLoading={logoutFetching}
          ml={5}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex>
      <NextLink href="/login">
        <Link p={2}>Login</Link>
      </NextLink>
      <NextLink href="/register">
        <Link p={2}>Register</Link>
      </NextLink>
    </Flex>
  );
};

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Flex p={4} bg="transparent">
      <Box ml={"auto"}>{userInfo()}</Box>
    </Flex>
  );
};
