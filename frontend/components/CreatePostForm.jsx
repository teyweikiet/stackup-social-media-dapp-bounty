import { useForm } from '@mantine/form'
import { Box, Group, Textarea } from '@mantine/core'
import { Web3Button } from '@thirdweb-dev/react'

import socialMediaArtifact from '@/artifacts/SocialMedia.json'
import { useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { notifications } from '@mantine/notifications'

export function CreatePostForm () {
  const form = useForm({
    initialValues: { content: '' },
    validate: (values) => {
      return {
        content: values.content.trim().length <= 0
          ? 'Cannot submit empty post!'
          : null
      }
    }
  })

  const { mutateAsync } = useSocialMediaContractWrite('createPost')

  return (
    <Box
      mx='auto'
      p='md'
    >
      <Textarea
        required
        placeholder='Write your post here...'
        {...form.getInputProps('content')}
      />
      <Group position='right'>
        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SOCIAL_MEDIA_ADDRESS}
          contractAbi={socialMediaArtifact.abi}
          action={async () => {
            await mutateAsync({
              args: [form.values.content]
            })
            form.reset()
          }}
          onError={(e) => {
            notifications.show({
              title: 'Failed to create post!☹️',
              message: e.reason,
              color: 'red'
            })
          }}
          style={{
            marginTop: '1rem',
            alignSelf: 'end'
          }}
          className='button'
        >
          Post
        </Web3Button>
      </Group>
    </Box>
  )
}
