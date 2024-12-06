'use client'

import Link from 'next/link'

import Image from 'next/image'
import {
  Group,
  Burger,
  Title,
  Drawer,
  Center,
  Text,
  Avatar
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './Navbar.module.css'
import { ConnectNetwork } from './ConnectNetwork'
import favicon from '../app/favicon.ico'
import { useAddress } from '@thirdweb-dev/react'

export function Navbar () {
  const currentUserAddress = useAddress()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <>
      <header className={classes.header}>
        <Group justify='space-between' sx={{ height: '100%' }}>
          <Group>
            <Link href='/'>
              <Group>
                <Image
                  src={favicon}
                  alt='logo'
                  width={30}
                  height={30}
                />
                <Title
                  size='h3'
                >
                  kit-t's social media
                </Title>
              </Group>
            </Link>
          </Group>
          <Group display={{ base: 'none', sm: 'flex' }}>
            <ConnectNetwork />
            {
                currentUserAddress && (
                  <Link href={`/profile/${currentUserAddress}`}>
                    <Avatar radius='md'>
                      <Text
                        style={{
                          fontSize: '0.6rem'
                        }}
                      >
                        {currentUserAddress && `${currentUserAddress.substring(0, 3)}...${currentUserAddress.substring(currentUserAddress.length - 2)}`}
                      </Text>
                    </Avatar>
                  </Link>
                )
              }
          </Group>

          <Group display={{ sm: 'none' }}>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
            />
          </Group>
        </Group>
      </header>
      <Drawer
        display={{ sm: 'none' }}
        opened={drawerOpened}
        onClose={closeDrawer}
        zIndex={1000000}
        position='right'
      >
        <Center m='sm'>
          {
              currentUserAddress && (
                <Link href={`/profile/${currentUserAddress}`}>
                  <Avatar radius='md'>
                    <Text
                      style={{
                        fontSize: '0.6rem'
                      }}
                    >
                      {currentUserAddress && `${currentUserAddress.substring(0, 3)}...${currentUserAddress.substring(currentUserAddress.length - 2)}`}
                    </Text>
                  </Avatar>
                </Link>
              )
            }
        </Center>
        <Center m='sm'>
          <ConnectNetwork />
        </Center>
      </Drawer>
    </>
  )
}
