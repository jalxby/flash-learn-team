import { Meta, StoryObj } from '@storybook/react'

import { DeleteIcon } from '@/assets'
import { DeleteDialog } from '@/components/ui/modal/delete-dialog/delete-dialog.tsx'

const meta = {
  title: 'Modals/Delete Dialog',
  component: DeleteDialog,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: /(?:\b|')(item|trigger|onClick)(?:\b|')/g,
    },
  },
} satisfies Meta<typeof DeleteDialog>
const item = {
  id: 'cljyp4jjv0008p6mg6sc0lkks',
  userId: 'af9721b3-1995-4f2a-b48a-f0bc4d39395f',
  name: 'Deck2',
  isPrivate: false,
  shots: 0,
  cover: null,
  rating: 0,
  isDeleted: null,
  isBlocked: null,
  created: '2023-07-11T19:39:22.748Z',
  updated: '2023-07-21T14:38:20.824Z',
  cardsCount: 9,
  author: {
    id: 'af9721b3-1995-4f2a-b48a-f0bc4d39395f',
    name: 'andres-2',
  },
}

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    title: 'Delete Pack',
    buttonTitle: 'Delete Pack',
    item: item,
    children: <DeleteIcon />,
    onClick: id => {
      console.log(id)
    },
  },
}
