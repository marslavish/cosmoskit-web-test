/* eslint-disable no-useless-escape */
export default `import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Center,
  useColorModeValue,
  Icon,
  useBreakpointValue,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowRightFill, RiArrowDownFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { assets } from "chain-registry";

interface fromTokenType {
  name: string;
  address: string;
  availableBalance: string;
}

interface toTokenType {
  name: string;
  address: string;
}

const DepositSimple = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [fromToken, setFromToken] = useState<fromTokenType>({
    name: "",
    address: "",
    availableBalance: "",
  });
  const [toToken, setToToken] = useState<toTokenType>({
    name: "",
    address: "",
  });
  const [inputValue, setInputValue] = useState<string>("");

  const icon = useBreakpointValue({
    base: RiArrowDownFill,
    md: RiArrowRightFill,
  });

  useEffect(() => {
    const getShuffledArr = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
      }
      return arr;
    };
    const defaultArray = [
      ..."abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
      ..."abcdefghijklmnopqrstuvwxyz".split(""),
      ..."0123456789".split(""),
    ];
    const getRandomLetter = (name: string) => {
      let randomLetter = getShuffledArr(defaultArray)
        .toString()
        .replace(",", "")
        .slice(0, 32);
      return name.replace(/[\-[\s[\.]/g, "") + randomLetter;
    };
    const assetList = assets
      .map(({ assets }) => assets.values())
      .map((iterator) => {
        for (const value of iterator) {
          return {
            name: value.name,
            imgSrc: value.logo_URIs?.png || value.logo_URIs?.jpeg,
            address: getRandomLetter(value.name).replace(/,/gm, ""),
          };
        }
      });
    const getFromToken = getShuffledArr([...assetList])[0];
    const getToToken = getShuffledArr([...assetList]).filter(
      ({ name }) => !(getFromToken.name === name)
    )[0];

    setFromToken({
      name: getFromToken.name,
      address: getFromToken.address,
      availableBalance: 0.01,
    });
    setToToken({
      name: getToToken.name,
      address: getToToken.address,
    });
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent maxW={{ md: "2xl" }} borderRadius="2xl" p={6} mx={2}>
        <ModalHeader fontSize="2xl" fontWeight="bold" p={0} mb={6}>
          Deposit IBC Asset
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          IBC Transfer
        </Text>
        <Grid
          templateColumns={{ base: "1fr", md: "1fr auto 1fr" }}
          justifyContent="center"
          alignItems="center"
          mb={6}
        >
          <GridItem
            border="1px solid"
            borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
            borderRadius="2xl"
            p={4}
          >
            <Text fontWeight="semibold" mr={4}>
              From
            </Text>
            <Text
              maxW={64}
              height="1.5em"
              fontWeight="semibold"
              color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
              whiteSpace="break-spaces"
              overflow="hidden"
              title={fromToken.address}
              _before={{
                content: "attr(title)",
                width: "50%",
                float: "right",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                direction: "rtl",
              }}
            >
              {fromToken.address}
            </Text>
          </GridItem>
          <GridItem
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <Icon
              as={icon}
              color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
            />
          </GridItem>
          <GridItem
            border="1px solid"
            borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
            borderRadius="2xl"
            p={4}
          >
            <Text fontWeight="semibold" mr={4}>
              To
            </Text>
            <Text
              maxW={64}
              height="1.5em"
              fontWeight="semibold"
              color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
              whiteSpace="break-spaces"
              overflow="hidden"
              title={toToken.address}
              _before={{
                content: "attr(title)",
                width: "50%",
                float: "right",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                direction: "rtl",
              }}
            >
              {toToken.address}
            </Text>
          </GridItem>
        </Grid>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Amount To Deposit
        </Text>
        <Box
          borderRadius="2xl"
          border="1px solid"
          borderColor="orange.300"
          px={4}
          py={6}
          mb={12}
        >
          <Text fontWeight="semibold" mr={4} mb={3}>
            Available balance:&ensp;
            <Text
              as="span"
              color={useColorModeValue("primary.500", "primary.300")}
            >
              {fromToken.availableBalance}&ensp;{fromToken.name}
            </Text>
          </Text>
          <NumberInput
            size="lg"
            display="flex"
            alignItems="center"
            defaultValue={15}
            value={inputValue}
            bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.50")}
            min={0}
            max={parseFloat(fromToken.availableBalance)}
            onChange={(value) => setInputValue(value)}
          >
            <NumberInputField fontWeight="semibold" letterSpacing="wide" />
            <Button
              position="absolute"
              zIndex={5}
              right={4}
              colorScheme="primary"
              size="xs"
              ml={2}
              _focus={{ outline: "none" }}
              onClick={() => setInputValue(fromToken.availableBalance)}
            >
              MAX
            </Button>
          </NumberInput>
        </Box>
        <Button
          h={14}
          colorScheme="primary"
          leftIcon={<IoWallet />}
          w="full"
          isDisabled={inputValue === "0" || inputValue === "" ? true : false}
        >
          Connect Wallet
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="relative" w="full" h="800px" mx="auto">
      <Center py={20}>
        <Button onClick={onOpen}>Open Modal</Button>
      </Center>
      <DepositSimple isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
`;
