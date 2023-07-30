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
  const { data: rawCards } = useGetCardsQuery({
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
  const currentPage = rawCards ? rawCards.pagination.currentPage : 1
  const totalCount = rawCards ? rawCards.pagination.totalItems : 0
  const pSize = rawCards ? rawCards.pagination.itemsPerPage : 0
  const preparedColumns = isMyDeck ? columns : columns.filter(column => column.key !== 'actions')
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
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
  const addCard = isMyPack && (
    <AddNewCard onSubmit={data => createCard({ id: deckId, ...data })}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnDeck = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={'#'}>
      Learn to Pack
    </Button>
  )

  const cards = rawCards?.items.map(card => {
    const updateGradeHandler = (grade: GradeType) => {
      if (deckId) updateGrade({ id: deckId, grade, cardId: card.id })
    }

    return (
      <Table.Row key={card.id}>
        <Table.DataCell>{card.question}</Table.DataCell>
        <Table.DataCell>{card.answer}</Table.DataCell>
        <Table.DataCell>{card.updated}</Table.DataCell>
        <Table.DataCell>
          <Grade onClick={updateGradeHandler} grade={card.grade} />
        </Table.DataCell>
        {isMyDeck && (
          <Table.DataCell>
            <CardsTableActions item={card} />
          </Table.DataCell>
        )}
      </Table.Row>
    )
  })

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
          {addCard}
          {learnDeck}
        </div>
        {deck?.cover && <img className={cNames.image} src={deck?.cover} alt="deck-cover" />}
        <TextField onChange={onValueChange} inputType={'search'} className={cNames.textField} />
        <Table.Root className={s.tableRoot}>
          <Table.Head columns={preparedColumns} sort={sort} onSort={setSort} />
          <Table.Body>{cards}</Table.Body>
        </Table.Root>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pSize}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Page>
  )
}
