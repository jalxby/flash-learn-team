import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfo } from '@/components'

const meta = {
  title: 'Profile/Personal Information',
  component: PersonalInfo,
  tags: ['autodocs'],
  args: {
    userEmail: 'bababa@gmail.com',
    userName: 'User',
    onLogout: () => console.log('logout'),
  },
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
