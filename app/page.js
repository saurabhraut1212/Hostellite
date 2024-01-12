import { Button, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Container centerContent>
        <Button >
          <Link href="/checkAvailability">
            Check Availability
          </Link>
        </Button>
      </Container>
    </Flex>
  );
}
