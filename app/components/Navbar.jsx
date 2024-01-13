'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FirebaseContext } from '../context/firebase';
import { useRouter } from 'next/navigation';

const MenuItemWithSubmenu = ({ label, isOpen, onClick, children }) => (
  <Box>
    <Text cursor="pointer" onClick={onClick}>
      {label}
    </Text>
    {isOpen && <Box pl="4">{children}</Box>}
  </Box>
);

const Navbar = () => {
  const firebase = useContext(FirebaseContext);
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState('');
  const [openButtons, setOpenButtons] = useState({
    bookBed: false,
    transactions: false,
    residents: false,
    dashboards: false,
    viewReports: false,
  });

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const toggleButtons = (buttonKey) => {
    setOpenButtons((prev) => ({
      ...prev,
      [buttonKey]: !prev[buttonKey],
    }));
  };

  const handleSignout = async () => {
    try {
      await firebase.signOutUser();
      setUser(null);
      window.location.reload();
    } catch (error) {
      throw new Error('Error getting in signout', error);
    }
  };

  useEffect(() => {
    const getLoginInfo = async () => {
      try {
        const result = await firebase.getCurrentLoginUserInfo();
        console.log(result, 'Result in login container');
        setUser(result);
      } catch (error) {
        throw new Error('No login user', error);
      }
    };
    getLoginInfo();
  }, [firebase]);

  return (
    <Box bg={'teal.500'} p="4">
      <HStack as="nav" alignItems="center">
        <IconButton
          icon={<HamburgerIcon />}
          onClick={handleDrawerOpen}
          aria-label="Open Menu"
        />
        <Spacer />
        <HStack spacing="4">
          <Link href="/">Home</Link>
          <Link href="/closure">Closure</Link>
          <Menu>
            <MenuButton as={Button} variant="outline">
              Allotment <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link href="/viewAllotment">View Allotment</Link>
              </MenuItem>
            </MenuList>
          </Menu>
          {user ? (
            <Button onClick={handleSignout}>Logout</Button>
          ) : (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </HStack>
      </HStack>
      <Drawer
        placement="left"
        onClose={handleDrawerClose}
        isOpen={isDrawerOpen}
        mt="10px"
      >
        <DrawerOverlay />
        <DrawerContent bg="teal.500" color="white">
          <DrawerCloseButton />
          <DrawerBody>
            <MenuItemWithSubmenu
              label="Book a Bed"
              isOpen={openButtons.bookBed}
              onClick={() => toggleButtons('bookBed')}
            >
              <Button cursor="pointer">
                <Link href="/hostelite">Book a bed</Link>
              </Button>
            </MenuItemWithSubmenu>

            <MenuItemWithSubmenu
              label="Transactions"
              isOpen={openButtons.transactions}
              onClick={() => toggleButtons('transactions')}
            >
              <Button cursor="pointer">
                <Link href="/expenses">Insert Expenses</Link>
              </Button>
              <Button cursor="pointer">
                <Link href="/showAllpayments">Show All Payments</Link>
              </Button>
            </MenuItemWithSubmenu>

            <MenuItemWithSubmenu
              label="Residents"
              isOpen={openButtons.residents}
              onClick={() => toggleButtons('residents')}
            >
              <Button cursor="pointer">
                <Link href="/livingresidents">Live</Link>
              </Button>
              <Button cursor="pointer">
                <Link href="/nonlivingresidents">Left</Link>
              </Button>
              <Button cursor="pointer">
                <Link href="/leftwithoutpaying">Left Without Paying</Link>
              </Button>
            </MenuItemWithSubmenu>

            <MenuItemWithSubmenu
              label="Dashboards"
              isOpen={openButtons.dashboards}
              onClick={() => toggleButtons('dashboards')}
            >
              <Button cursor="pointer">Today's Dashboard</Button>
              <Button cursor="pointer">Monthly Dashboard</Button>
              <Button cursor="pointer">Yearly Dashboard</Button>
            </MenuItemWithSubmenu>

            <MenuItemWithSubmenu
              label="View Reports"
              isOpen={openButtons.viewReports}
              onClick={() => toggleButtons('viewReports')}
            >
              <Button cursor="pointer">Per Day Report</Button>
              <Button cursor="pointer">Monthly Report</Button>
              <Button cursor="pointer">Yearly Report</Button>
            </MenuItemWithSubmenu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
