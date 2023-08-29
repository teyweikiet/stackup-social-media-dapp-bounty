'use client'

import { PostsByUser } from '@/components/PostsByUser'
import { TipUser } from '@/components/TipUser'
import { useSocialMediaContractRead } from '@/hooks/useSocialMediaContract'
import { Container, Text, Avatar, Skeleton, Stack, Grid, Group } from '@mantine/core'
import { useAddress } from '@thirdweb-dev/react'
import { formatEther } from 'ethers/lib/utils'
import { usePathname } from 'next/navigation'

export default function Profile () {
  const pathname = usePathname()
  const address = pathname.substring(9)
  const currentUserAddress = useAddress()

  const { data, isLoading } = useSocialMediaContractRead('users', [address])

  const followerCount = typeof data?.followerCount !== 'undefined' && Number(data.followerCount)
  const followingCount = typeof data?.followingCount !== 'undefined' && Number(data.followingCount)
  const postCount = typeof data?.postCount !== 'undefined' && Number(data.postCount)
  const tipsReceived = typeof data?.tipsReceived !== 'undefined' && Number(formatEther(data.tipsReceived))

  const isOwnProfile = address === currentUserAddress

  return (
    <main>
      <Container size={600}>
        <Stack
          align='center'
        >
          <Avatar
            size='xl'
            radius='md'
            my='sm'
          >
            <Text size='sm'>
              {address && `${address.substring(0, 4)}...${address.substring(address.length - 4)}`}
            </Text>
          </Avatar>

          <Text
            size='sm'
            fw={900}
          >
            {address}
          </Text>

          <Group align='center'>
            <Group
              fw={900}
            >
              {
                isOwnProfile
                  ? (
                    <>
                      <Text>
                        {'Earnings: '}
                      </Text>
                      <Skeleton
                        visible={isLoading}
                        w='3rem'
                        ta='center'
                        mx='auto'
                      >
                        <Text>
                          {parseFloat(tipsReceived).toFixed(3)}
                        </Text>
                      </Skeleton>
                      <Text ta='center'>
                        MATIC{tipsReceived > 1 ? 's' : ''}
                      </Text>
                    </>
                    )
                  : (
                    <TipUser
                      userAddress={address}
                    />
                    )
              }
            </Group>
          </Group>

        </Stack>

        <Grid
          my='lg'
          fw={900}
        >
          <Grid.Col
            span={4}
          >
            <Skeleton
              visible={isLoading}
              w='1rem'
              h='1rem'
              mb='sm'
              ta='center'
              mx='auto'
            >
              {postCount}
            </Skeleton>
            <Text ta='center'>Post{postCount > 1 ? 's' : ''}</Text>
          </Grid.Col>

          <Grid.Col
            span={4}
          >
            <Skeleton
              visible={isLoading}
              w='1rem'
              h='1rem'
              mb='sm'
              ta='center'
              mx='auto'
            >
              {followerCount}
            </Skeleton>
            <Text ta='center'>Follower{followerCount > 1 ? 's' : ''}</Text>
          </Grid.Col>

          <Grid.Col
            span={4}
          >
            <Skeleton
              visible={isLoading}
              w='1rem'
              h='1rem'
              mb='sm'
              ta='center'
              mx='auto'
            >
              {followingCount}
            </Skeleton>
            <Text ta='center'>Following</Text>
          </Grid.Col>
        </Grid>

        <PostsByUser
          address={address}
        />
      </Container>
    </main>
  )
}
