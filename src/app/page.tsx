import NextLink from "next/link";
import { Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import { FaArrowUpRightFromSquare, FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <Flex
        as="main"
        className="min-h-screen"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
            className="min-h-screen relative"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w={["95%", "95%", "90%", "85%", "80%", "1280px"]}
        >
            <Heading
                as="h1"
                fontSize={["4xl", "5xl", "7xl"]}
            >
              Math Sandbox
            </Heading>
            <Text
              fontSize={["2xl", "2xl", "3xl"]}
            >
              Making math interactive
            </Text>
            <Flex mt={4} gap={2} flexDirection={["column", "row"]}>
              <Button
                as={NextLink}
                href="/play"
                colorScheme="purple"
                rightIcon={<FaArrowRight />}
              >
                Enter Sandbox
              </Button>
              <Button
                colorScheme="purple"
                variant="outline"
                rightIcon={<FaArrowUpRightFromSquare />}
              >
                See GitHub
              </Button>
            </Flex>
        </Flex>
      </Flex>
    </>
  );
}
