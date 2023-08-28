'use client'

import { Inter } from 'next/font/google'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Container, MantineProvider } from '@mantine/core'

import { Mumbai } from '@thirdweb-dev/chains'
import { Navbar } from '@/components/Navbar'
import { Notifications } from '@mantine/notifications'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <title>kit-t's social media</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='description' content="Submission for StackUp's Social Media dapp bounty" />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          activeChain={Mumbai}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              globalStyles: (theme) => ({
                a: {
                  textDecoration: 'none !important',
                  color: 'inherit !important'
                },

                '.button': {
                  background: '#1971c2 !important',
                  color: 'white !important',
                  ':disabled': {
                    background: '#373A40 !important',
                    color: '#B8B8B8 !important'
                  }
                }
              })
            }}
          >
            <Notifications />
            <Container size='65rem' px='s'>
              <Navbar />
              {children}
            </Container>
          </MantineProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
