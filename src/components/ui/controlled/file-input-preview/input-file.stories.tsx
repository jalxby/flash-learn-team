import { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components'
import { ControlledFileInput } from '@/components/ui/controlled/file-input-preview/controlled-file-input.tsx'

const meta = {
  title: 'ControlledFileInput',
  component: ControlledFileInput,
  tags: ['autodocs'],
} satisfies Meta<typeof ControlledFileInput>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    name: 'cover',
    withPreview: true,
    children: onClick => (
      <Button type={'button'} variant={'secondary'} onClick={onClick}>
        Change cover
      </Button>
    ),
  },
}
