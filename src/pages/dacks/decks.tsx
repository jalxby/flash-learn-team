import { FC, useState } from 'react'

import { clsx } from 'clsx'

import s from './decks.module.scss'

import { AddNewPackModal, Button, Pagination, Sort, Table, Typography } from '@/components'
import { FilterPanel } from '@/components/ui/filter-panel'
import { TableActions } from '@/components/ui/table-action-buttons'
import { columns } from '@/pages/dacks/columns.ts'
import { useGetDecksQuery } from '@/services/decks'

type PacksProps = {}
export const Decks: FC<PacksProps> = () => {
  const { data } = useGetDecksQuery()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('7')
  const [sort, setSort] = useState<Sort>(null)

  const cNames = {
    container: clsx(s.container, 'container'),
    title: clsx(s.pageTitle),
  }

  const tableRows = data?.items.map(row => (
    <Table.Row key={row.id}>
      <Table.DataCell>{row.name}</Table.DataCell>
      <Table.DataCell>{row.cardsCount}</Table.DataCell>
      <Table.DataCell>{row.updated}</Table.DataCell>
      <Table.DataCell>{row.author.name}</Table.DataCell>
      <Table.DataCell>
        <TableActions editable={true} item={row} />
      </Table.DataCell>
    </Table.Row>
  ))

  return (
    <>
      <div className={cNames.container}>
        <div className={cNames.title}>
          <Typography variant={'large'}>Pack list</Typography>
          <AddNewPackModal
            trigger={<Button>Add New Pack</Button>}
            onSubmit={data => {
              console.log(data)
            }}
          />
        </div>

        <FilterPanel />

        <Table.Root>
          <Table.Head sort={sort} onSort={setSort} columns={columns}></Table.Head>
          <Table.Body>{tableRows}</Table.Body>
        </Table.Root>

        <Pagination
          currentPage={page}
          totalCount={400}
          pageSize={+pageSize}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </>
  )
}
