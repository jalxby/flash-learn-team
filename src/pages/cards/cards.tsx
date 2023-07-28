import { ChangeEvent, FC, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import s from './cards.module.scss'

import { ArrowLeftIcon } from '@/assets'
import {
  Button,
  DeckEditMenu,
  Grade,
  GradeType,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { AddNewCard } from '@/components/ui/modal/add-new-card'
import { CardsTableActions } from '@/components/ui/table-action-buttons/cards-table-actions.tsx'
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
  const [search, setSearch] = useState<string>('')
  const debouncedNameToSearch = useDebounce<string>(search, 800)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('7')
  const sortDirection = sort ? `${sort?.columnKey}-${sort?.direction}` : undefined

  const { id: deckIdFromParams } = useParams()
  const deckId = deckIdFromParams ?? ''
  const { data: deck } = useGetDeckQuery({ id: deckId })
  const { data: cards } = useGetCardsQuery({
    id: deckId,
    currentPage: page,
    itemsPerPage: +pageSize,
    orderBy: sortDirection,
    answer: debouncedNameToSearch,
  })
  const { data: me } = useGetMeQuery()
  const isMyDeck = me?.id === deck?.userId
  const [createCard] = useCreateCardMutation()
  const [updateGrade] = useUpdateCardGradeMutation()

  const isMyPack = me?.id === deck?.userId

  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }
  const updateGradeHandler = (cardId: string, grade: GradeType) => {
    if (deckId) updateGrade({ id: deckId, grade, cardId: cardId })
  }
  const deckName = deck?.name ?? ''
  const cNames = {
    header: clsx(s.headerPage),
    textField: clsx(s.textField),
    back: clsx(s.back),
    wrapper: clsx(s.wrapper, 'container'),
    image: clsx(s.image),
    menu: clsx(s.menuSection),
  }
  const editMenu = isMyPack && (
    <DeckEditMenu
      onEdit={() => console.log('onEdit called')}
      onDelete={() => console.log('onDelete called')}
    />
  )
  const addNewCardSection = isMyPack && (
    <AddNewCard onSubmit={data => createCard({ id: deckId, ...data })}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnToPackButton = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={'#'}>
      Learn to Pack
    </Button>
  )
  const preparedColumns = isMyDeck ? columns : columns.filter(column => column.key !== 'actions')

  return (
    <Page>
      <div className={cNames.wrapper}>
        <Button variant={'link'} onClick={navigateBack}>
          <Typography variant={'body2'} className={cNames.back}>
            <ArrowLeftIcon /> Back to Packs List
          </Typography>
        </Button>

        <div className={cNames.header}>
          <div className={cNames.menu}>
            <Typography variant={'large'}>{deckName}</Typography>
            {editMenu}
          </div>
          {addNewCardSection}
          {learnToPackButton}
        </div>
        {deck?.cover && <img className={cNames.image} src={deck?.cover} alt="" />}
        <TextField onChange={onValueChange} inputType={'search'} className={cNames.textField} />

        <Table.Root className={s.tableRoot}>
          <Table.Head columns={preparedColumns} sort={sort} onSort={setSort} />
          <Table.Body>
            {cards?.items.map(card => {
              return (
                <Table.Row key={card.id}>
                  <Table.DataCell>{card.question}</Table.DataCell>
                  <Table.DataCell>{card.answer}</Table.DataCell>
                  <Table.DataCell>{card.updated}</Table.DataCell>
                  <Table.DataCell>
                    <Grade
                      onClick={grade => updateGradeHandler(card.id, grade)}
                      grade={card.grade}
                    />
                  </Table.DataCell>
                  {isMyDeck && (
                    <Table.DataCell style={{ padding: '6px 24px' }}>
                      <CardsTableActions item={card} />
                    </Table.DataCell>
                  )}
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>

        <Pagination
          currentPage={cards ? cards.pagination.currentPage : 1}
          totalCount={cards ? cards.pagination.totalItems : 0}
          pageSize={cards ? cards.pagination.itemsPerPage : 0}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Page>
  )
}
