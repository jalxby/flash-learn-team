import { useState } from 'react'

import type { Meta } from '@storybook/react'
import { v4 } from 'uuid'

import { ItemType, RadioGroup } from '@/components'

const items: ItemType[] = [
  { id: v4(), label: 'label1', value: 'value1' },
  { id: v4(), label: 'label2', value: 'value2' },
  { id: v4(), label: 'label3', value: 'value3' },
  { id: v4(), label: 'label4', value: 'value4' },
  { id: v4(), label: 'label5', value: 'value5' },
]
const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
export const Default: () => JSX.Element = () => {
  const [value, setValue] = useState('value5')

  return (
    <>
      <RadioGroup items={items} onChange={setValue} value={value} />
      {`selected: ${value}`}
    </>
  )
}
