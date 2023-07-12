import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import s from './table.module.scss'

import { Checkbox, Grade, Sort, Table } from '@/components'
import { TableActions } from '@/components/ui/table-action-buttons'

const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
    editable: false,
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
    editable: true,
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
    editable: false,
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
    editable: true,
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
    editable: false,
  },
]

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'createdBy',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'actions',
    title: '',
    sortable: false,
  },
]
const meta = {
  title: 'Components/Table',
  component: Table.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Table.Root>

const Container = () => {
  const [sort, setSort] = useState<Sort>(null)

  return (
    <>
      <Table.Head columns={columns} sort={sort} onSort={setSort} />

      <Table.Body>
        {data.map(row => {
          return (
            <Table.Row key={row.title}>
              <Table.DataCell>{row.title}</Table.DataCell>
              <Table.DataCell>{row.cardsCount}</Table.DataCell>
              <Table.DataCell>{row.updated}</Table.DataCell>
              <Table.DataCell>{row.createdBy}</Table.DataCell>
              <Table.DataCell>
                <TableActions editable={row.editable} />
              </Table.DataCell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </>
  )
}

export default meta
type Story = StoryObj<typeof meta>
export const DefaultWithSort: Story = {
  args: {
    children: <Container />,
  },
  parameters: {
    controls: {
      exclude: /(?:\b|')(children)(?:\b|')/g,
    },
  },
}

export const Head_Cell: Story = {
  args: {
    children: <Table.HeadCell key={'name'} title={'Name'} />,
  },
}

export const Data_Cell: Story = {
  args: {
    children: <Table.DataCell>{'Name'}</Table.DataCell>,
  },
}
export const Data_Cell_WithReactNode: Story = {
  args: {
    children: <Table.DataCell className={s.row}>{<Checkbox label={'Name'} />}</Table.DataCell>,
  },
}

export const Data_Cell_With_Grade: Story = {
  args: {
    children: (
      <Table.DataCell className={s.row}>
        <Grade
          grade={3}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log()
          }}
        />
      </Table.DataCell>
    ),
  },
}

export const Data_Cell_With_Actions: Story = {
  args: {
    children: (
      <Table.DataCell className={s.row}>
        <TableActions />
      </Table.DataCell>
    ),
  },
}
