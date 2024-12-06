import { Group, Box, NumberInput, Modal, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { Web3Button } from '@thirdweb-dev/react'
import { parseUnits } from 'ethers/lib/utils'

import socialMediaArtifact from '@/artifacts/SocialMedia.json'
import { useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { notifications } from '@mantine/notifications'

export function TipUser ({ userAddress }) {
  const [opened, { open, close }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      amount: 1
    },
    validate: {
      amount: (value) => value > 0.001
    }
  })

  const { mutateAsync } = useSocialMediaContractWrite('tipUser')

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          form.reset()
        }}
        title='Tip User For Their Contribution'
        centered
        closeOnClickOutside={false}
      >
        <Box maw={300} mx='auto'>

          <NumberInput
            required
            label='Amount'
            min={0.001}
            precision={3}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value))
                ? `${value} MATIC`
                : '0 MATIC'}
            {...form.getInputProps('amount')}
          />

          <Group justify='flex-end' mt='md'>
            <Web3Button
              contractAddress={process.env.NEXT_PUBLIC_SOCIAL_MEDIA_ADDRESS}
              contractAbi={socialMediaArtifact.abi}
              action={async () => {
                const { amount } = form.values

                await mutateAsync({
                  args: [userAddress],
                  overrides: {
                    value: parseUnits(String(amount))
                  }
                })
                notifications.show({
                  title: '🥳Successfully tipped user!',
                  message: '🙏Thank you!'
                })
                close()
              }}
              onError={(e) => {
                notifications.show({
                  title: 'Failed to tip user!☹️',
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
              Tip User
            </Web3Button>
          </Group>
        </Box>
      </Modal>
      <Group>
        <Button onClick={open}>Wanna Tip Me? 😉</Button>
      </Group>
    </>
  )
}
