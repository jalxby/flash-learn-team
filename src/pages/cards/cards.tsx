import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowLeftIcon, DeleteIcon, EditIcon } from '@/assets'
import {
  Button,
  DeckEditMenu,
  DeleteDialog,
  Grade,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { AddNewCard } from '@/components/ui/modal/add-new-card'
import { EditCard } from '@/components/ui/modal/edit-card'
import { columns } from '@/pages/cards/table-columns.ts'
import { testData } from '@/pages/cards/test-data.ts'
import { useGetDeckQuery } from '@/services/decks/decks.api.ts'
import { Deck } from '@/services/decks/decks.api.types.ts'

type CardsPropsType = {
  userId: string
  img?: string
}

export const Cards: FC<CardsPropsType> = ({ userId, img }) => {
  const [sort, setSort] = useState<Sort>(null)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('10')
  const { id: deckId } = useParams()
  const { data: deck } = useGetDeckQuery({ id: deckId ? deckId : '' })
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  const packName = deck ? deck.name : ''
  const classNames = {
    header: clsx(s.headerPage),
    textField: clsx(s.textField),
    back: clsx(s.back),
  }

  return (
    <Page>
      <Button variant={'link'} onClick={navigateBack}>
        <Typography variant={'body2'} className={classNames.back}>
          <ArrowLeftIcon /> Back to Packs List
        </Typography>
      </Button>

      <div className={classNames.header}>{renderDeckHeading(userId, packName)}</div>

      {img && (
        <div style={{ width: '170px', height: '107px' }}>
          <img src={img} alt="" style={{ width: '170px', height: '107px' }} />
        </div>
      )}

      <TextField inputType={'search'} className={classNames.textField} />

      <CardTable
        rowData={testData}
        sort={sort}
        setSort={setSort}
        userId={userId}
        pageSize={pageSize}
      />

      <Pagination
        currentPage={page}
        totalCount={14}
        pageSize={+pageSize}
        siblingCount={3}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </Page>
  )
}

type CardTablePropsType = {
  rowData: any
  userId: string
  pageSize: string
  sort: Sort
  setSort: (sort: Sort) => void
}
const CardTable: FC<CardTablePropsType> = props => {
  const { rowData, sort, setSort, userId, pageSize } = props
  const classNames = {
    head: clsx(s.tableHead),
    tableRot: clsx(s.tableRoot),
  }

  return (
    <Table.Root className={s.tableRoot}>
      <Table.Head columns={columns} sort={sort} onSort={setSort} className={classNames.head} />
      <Table.Body>{rowData.slice(0, +pageSize).map((el: any) => TableRows(el, userId))}</Table.Body>
    </Table.Root>
  )
}
//todo типизация
const TableRows = (el: any, userId: string) => {
  return (
    <Table.Row key={el.question}>
      <Table.DataCell>{el.question}</Table.DataCell>
      <Table.DataCell>{el.answer}</Table.DataCell>
      <Table.DataCell>{el.updated}</Table.DataCell>
      <Table.DataCell>
        <Grade onClick={id => console.log(id)} grade={5} />
      </Table.DataCell>
      <Table.DataCell style={{ padding: '6px 24px' }}>
        <TableActions item={el} editable={userId === '1'} />
      </Table.DataCell>
    </Table.Row>
  )
}

const renderDeckHeading = (userId: string, packName: string) => {
  const isMyPack = userId === '1'
  const headingText = isMyPack ? 'My pack' : packName
  const editMenu = isMyPack && (
    <DeckEditMenu
      onEdit={() => console.log('onEdit called')}
      onDelete={() => console.log('onDelete called')}
    />
  )
  const addNewCardSection = isMyPack && (
    <AddNewCard onSubmit={data => console.log(data)}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnToPackButton = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={'#'}>
      Learn to Pack
    </Button>
  )

  return (
    <>
      <Typography variant={'large'} style={{ display: 'flex', gap: '16px' }}>
        {headingText}
        {editMenu}
      </Typography>
      {addNewCardSection}
      {learnToPackButton}
    </>
  )
}

type TableActionsProps = {
  editable?: boolean
  item: Deck
}
const TableActions: FC<TableActionsProps> = props => {
  const { item, editable = true } = props

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {editable && (
        <>
          <EditCard question={'question'} answer={'answer'} onSubmit={data => console.log(data)}>
            <button>
              <EditIcon />
            </button>
          </EditCard>
          <DeleteDialog
            buttonTitle={'Delete Card'}
            item={item}
            onClick={id => {
              console.log(id)
            }}
            title={'Delete Card'}
          >
            <button>
              <DeleteIcon />
            </button>
          </DeleteDialog>
        </>
      )}
    </div>
  )
}
