import { Meta, StoryObj } from '@storybook/react'

import InputFileWithForm, {
  InputFile,
} from '@/components/ui/controlled/file-input-preview/input.file.tsx'

const meta = {
  title: 'InputFile',
  component: InputFileWithForm,
  tags: ['autodocs'],
} satisfies Meta<typeof InputFile>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {},
}
