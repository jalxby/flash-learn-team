import { ChangeEvent, FC, useState } from 'react'

import { clsx } from 'clsx'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import s from './cards.module.scss'

import { useAppDispatch } from '@/app/hooks.ts'
import { ArrowLeftIcon, EditIcon } from '@/assets'
import DeleteIcon from '@/assets/icons/DeleteIcon.tsx'
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
import { AddNewCard, CardForm } from '@/components/ui/modal/add-new-card'
import { EditCardModal } from '@/components/ui/modal/edit-card'
import { columns } from '@/pages/cards/table-columns.ts'
import { useGetMeQuery } from '@/services/auth/auth.api.ts'
import {
  selectCardNameToSearch,
  selectCardsOrderBy,
  selectCardsPage,
  selectCardsPageSize,
  selectCardsSort,
} from '@/services/cards/cards.params.selectors.ts'
import { cardsActions } from '@/services/cards/cards.params.slice.ts'
import {
  useCreateCardMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'
import { Card } from '@/services/decks/decks.api.types.ts'

type Props = {}
export const Cards: FC<Props> = () => {
  const dispatch = useAppDispatch()

  const search = useSelector(selectCardNameToSearch)
  const setSearch = (name: string) => {
    dispatch(cardsActions.setNameToSearch({ name }))
  }
  const page = useSelector(selectCardsPage)
  const setPage = (page: number) => {
    dispatch(cardsActions.setPage({ page }))
  }
  const pageSize = useSelector(selectCardsPageSize)
  const setPageSize = (pageSize: string) => {
    dispatch(cardsActions.setPageSize({ pageSize }))
  }
  const debouncedNameToSearch = useDebounce<string>(search, 800)
  const sort = useSelector(selectCardsSort)
  const orderBy = useSelector(selectCardsOrderBy)
  const sortHandler = (sort: Sort) => {
    dispatch(cardsActions.setSort({ sort }))
    dispatch(
      cardsActions.setOrderBy({ orderBy: sort ? `${sort?.columnKey}-${sort?.direction}` : '' })
    )
  }
  const { id: deckIdFromParams } = useParams()
  const deckId = deckIdFromParams ?? ''
  const { data: deck } = useGetDeckQuery({ id: deckId })
  const { data: rawCards } = useGetCardsQuery({
    id: deckId,
    currentPage: page,
    itemsPerPage: +pageSize,
    answer: debouncedNameToSearch,
    orderBy,
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
  const [isOpenEditCard, setIsOpenEditCard] = useState<boolean>(false)
  const [selectedCard, setSelectedCard] = useState<Card>({} as Card)
  const [isOpenDeleteCard, setIsOpenDeleteCard] = useState<boolean>(false)

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
  const onSubmit = (data: CardForm) => {
    const form = new FormData()

    form.append('question', String(data.question))
    form.append('answer', String(data.answer))
    form.append('questionImg', data.questionImg)
    form.append('answerImg', data.answerImg)
    createCard({ id: deckId, formData: form })
  }
  const editMenu = isMyPack && (
    <DeckEditMenu
      onEdit={() => console.log('onEdit called')}
      onDelete={() => console.log('onDelete called')}
    />
  )
  const addCard = isMyPack && (
    <AddNewCard onSubmit={onSubmit}>
      <Button variant={'primary'}>Add New Card</Button>
    </AddNewCard>
  )
  const learnDeck = !isMyPack && (
    <Button variant={'primary'} as={'a'} href={`/learn/${deck?.id}`}>
      Learn to Deck
    </Button>
  )

  const cards = rawCards?.items.map(card => {
    const updateGradeHandler = (grade: GradeType) => {
      if (deckId) updateGrade({ id: deckId, grade, cardId: card.id })
    }
    const onClickEditHandler = () => {
      setSelectedCard(card)
      setIsOpenEditCard(true)
    }

    const onClickDeleteHandler = () => {
      setSelectedCard(card)
      setIsOpenDeleteCard(true)
    }

    return (
      <Table.Row key={card.id}>
        <Table.DataCell>{card.question}</Table.DataCell>
        <Table.DataCell>{card.answer}</Table.DataCell>
        <Table.DataCell>{new Date(card.updated).toLocaleString('en-Gb')}</Table.DataCell>
        <Table.DataCell>
          <Grade onClick={updateGradeHandler} grade={card.grade} />
        </Table.DataCell>
        {isMyDeck && (
          <>
            <button onClick={onClickEditHandler}>
              <EditIcon />
            </button>
            <button onClick={onClickDeleteHandler}>
              <DeleteIcon />
            </button>
          </>
        )}
      </Table.Row>
    )
  })

  return (
    <Page>
      <EditCardModal
        question={selectedCard.question}
        answer={selectedCard.answer}
        onSubmit={({ question, answer, questionImg, answerImg }) => {
          const form = new FormData()

          form.append('question', question)
          form.append('answer', answer)
          form.append('questionImg', questionImg)
          form.append('answerImg', answerImg)
        }}
        isOpen={isOpenEditCard}
        setIsOpen={setIsOpenEditCard}
      ></EditCardModal>
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
        <TextField
          onChange={onValueChange}
          placeholder={'Input search'}
          inputType={'search'}
          className={cNames.textField}
        />
        <Table.Root className={s.tableRoot}>
          <Table.Head columns={preparedColumns} sort={sort} onSort={sortHandler} />
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
