import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowLeftIcon } from '@/assets'
import {
  Button,
  DeckEditMenu,
  Grade,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { AddNewCard } from '@/components/ui/modal/add-new-card'
import { columns } from '@/pages/cards/table-columns.ts'
import { useGetMeQuery } from '@/services/auth/auth.api.ts'
import {
  useCreateCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'

type Props = {}

export const Cards: FC<Props> = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('10')
  const { id: deckId } = useParams()
  const { data: deck } = useGetDeckQuery({ id: deckId ? deckId : '' })
  const { data: cards } = useGetCardsQuery({ id: deckId ? deckId : '' })
  const { data: me } = useGetMeQuery()
  const [createCard] = useCreateCardMutation()
  const [updateGrade] = useUpdateCardGradeMutation()

  const isMyPack = me?.id === deck?.userId

  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  const packName = deck ? deck.name : ''
  const cNames = {
    header: clsx(s.headerPage),
    textField: clsx(s.textField),
    back: clsx(s.back),
    wrapper: clsx(s.wrapper, 'container'),
  }
  const editMenu = isMyPack && (
    <DeckEditMenu
      onEdit={() => console.log('onEdit called')}
      onDelete={() => console.log('onDelete called')}
    />
  )
  const addNewCardSection = isMyPack && (
    <AddNewCard onSubmit={data => createCard({ id: deckId ? deckId : '', ...data })}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnToPackButton = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={'#'}>
      Learn to Pack
    </Button>
  )
  const headingText = isMyPack ? 'My pack' : packName

  return (
    <Page>
      <div className={cNames.wrapper}>
        <Button variant={'link'} onClick={navigateBack}>
          <Typography variant={'body2'} className={cNames.back}>
            <ArrowLeftIcon /> Back to Packs List
          </Typography>
        </Button>

        <div className={cNames.header}>
          <Typography variant={'large'} style={{ display: 'flex', gap: '16px' }}>
            {headingText}
            {editMenu}
          </Typography>
          {addNewCardSection}
          {learnToPackButton}
        </div>

        {/*{img && (*/}
        {/*  <div style={{ width: '170px', height: '107px' }}>*/}
        {/*    <img src={img} alt="" style={{ width: '170px', height: '107px' }} />*/}
        {/*  </div>*/}
        {/*)}*/}

        <TextField inputType={'search'} className={cNames.textField} />

        <Table.Root className={s.tableRoot}>
          <Table.Head columns={columns} sort={sort} onSort={setSort} />
          <Table.Body>
            {cards?.items.map(card => {
              return (
                <Table.Row key={card.id}>
                  <Table.DataCell>{card.question}</Table.DataCell>
                  <Table.DataCell>{card.answer}</Table.DataCell>
                  <Table.DataCell>{card.updated}</Table.DataCell>
                  <Table.DataCell>
                    <Grade
                      onClick={grade =>
                        updateGrade({ id: deckId ? deckId : '', grade, cardId: card.id })
                      }
                      grade={card.grade}
                    />
                  </Table.DataCell>
                  <Table.DataCell style={{ padding: '6px 24px' }}></Table.DataCell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>

        <Pagination
          currentPage={page}
          totalCount={14}
          pageSize={+pageSize}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Page>
  )
}
