'use client'

import 'normalize.css/normalize.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

import { Inter } from 'next/font/google'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Container, MantineProvider, ColorSchemeScript } from '@mantine/core'

import { Mumbai } from '@thirdweb-dev/chains'
import { Navbar } from '@/components/Navbar'
import { Notifications } from '@mantine/notifications'
import { ScrollToTop } from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <title>kit-t's social media</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='description' content="Submission for StackUp's Social Media dapp bounty" />
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          activeChain={Mumbai}
        >
          <MantineProvider
            defaultColorScheme='dark'
          >
            <Notifications />
            <Container size='65rem' px='s'>
              <Navbar />
              {children}
            </Container>
            <ScrollToTop />
          </MantineProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
