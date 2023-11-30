import { Meta } from '@storybook/react'

import { Cards } from '@/pages/cards/cards.tsx'

const meta = {
  title: 'Pages/Cards',
  component: Cards,
  decorators: [
    Story => (
      <div
        style={{
          margin: '3em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Cards>

export default meta

export const Cards_ = {}
