import { ChangeEvent, FC, useEffect, useState } from 'react'

import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import s from './decks.module.scss'

import { EditIcon, PlayIcon } from '@/assets'
import DeleteIcon from '@/assets/icons/DeleteIcon.tsx'
import {
  Button,
  CreateDeck,
  Page,
  Pagination,
  Sort,
  Table,
  TextField,
  Typography,
} from '@/components'
import { EditPackModal, Form } from '@/components/ui/modal/edit-pack-modal/edit-pack-modal.tsx'
import { Slider } from '@/components/ui/slider'
import { Tabs } from '@/components/ui/tabs'
import { columns } from '@/pages/decks/columns.ts'
import { useGetMeQuery } from '@/services/auth/auth.api.ts'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/services/decks/decks.api.ts'
import { Deck } from '@/services/decks/decks.api.types.ts'

type PacksProps = {}
export const Decks: FC<PacksProps> = () => {
  const { data: me } = useGetMeQuery()

  const isMyDecks = me?.id ? me?.id : ''
  const [myDecks, setMyDecks] = useState('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<string>('7')
  const [sort, setSort] = useState<Sort>(null)
  const [nameToSearch, setNameToSearch] = useState('')
  const debouncedNameToSearch = useDebounce<string>(nameToSearch, 800)
  const [createDeck] = useCreateDeckMutation()
  const sortDirection = sort ? `${sort?.columnKey}-${sort?.direction}` : undefined
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 100])
  const [debouncedSliderValue, setDebouncedSliderValue] = useState<[number, number]>([0, 100])
  const [updateDeck] = useUpdateDeckMutation()
  const navigate = useNavigate()
  const [selectedDeck, setSelectedDeck] = useState<Deck>({} as Deck)
  const [isOpenEditDeck, setIsOpenEditDeck] = useState<boolean>(false)
  const { data } = useGetDecksQuery({
    name: debouncedNameToSearch,
    authorId: myDecks,
    currentPage: page,
    itemsPerPage: +pageSize,
    orderBy: sortDirection,
    minCardsCount: `${debouncedSliderValue[0]}`,
    maxCardsCount: `${debouncedSliderValue[1]}`,
  })
  const maxCardsCount = data ? data.maxCardsCount : 100
  const totalDecks = data ? data.pagination.totalItems : 0
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameToSearch(e.currentTarget.value)
  }
  const clearFilters = () => {
    setPage(1)
    setMyDecks('')
    setNameToSearch('')
    setSliderValue([0, maxCardsCount])
    setDebouncedSliderValue([0, maxCardsCount])
  }

  const cNames = {
    container: clsx(s.container, 'container'),
    title: clsx(s.pageTitle),
    root: clsx(s.wrapper),
    image: clsx(s.image),
    imageContainer: clsx(s.imageContainer),
  }

  useEffect(() => {
    setSliderValue([0, maxCardsCount])
    setDebouncedSliderValue([0, maxCardsCount])
  }, [data?.maxCardsCount])
  const tableRows = data?.items.map(deck => (
    <Table.Row key={deck.id}>
      <Table.DataCell>
        <div className={cNames.imageContainer}>
          {deck.cover && <img className={cNames.image} src={deck.cover} alt="" />}
          {deck.name}
        </div>
      </Table.DataCell>
      <Table.DataCell>{deck.cardsCount}</Table.DataCell>
      <Table.DataCell>{deck.updated}</Table.DataCell>
      <Table.DataCell>{deck.author.name}</Table.DataCell>
      <Table.DataCell>
        {/*<DecksTableActions item={deck} isMyDeck={deck.author.id === me?.id} />*/}
        <button onClick={() => navigate(`/cards/${deck.id}`)}>
          <PlayIcon />
        </button>
        <button
          onClick={() => {
            setSelectedDeck(deck)
            setIsOpenEditDeck(true)
          }}
        >
          <EditIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
      </Table.DataCell>
    </Table.Row>
  ))

  return (
    <Page>
      <EditPackModal
        trigger={<></>}
        onSubmit={(data: Form) => {
          const form = new FormData()

          debugger
          form.append('name', data.newNamePack)
          form.append('isPrivate', String(data.isPrivate))
          form.append('cover', selectedDeck.cover)
          updateDeck({ id: selectedDeck.id, ...form })
        }}
        isPrivate={selectedDeck.isPrivate}
        packName={selectedDeck.name}
        isOpenEditDeck={isOpenEditDeck}
        setIsOpenEditDeck={setIsOpenEditDeck}
      />
      <div className={cNames.container}>
        <div className={cNames.title}>
          <Typography variant={'large'}>Pack list</Typography>
          <CreateDeck trigger={<Button>Create Deck</Button>} onSubmit={createDeck} />
        </div>

        <div className={cNames.root}>
          <TextField
            onChange={onValueChange}
            title={''}
            inputType={'search'}
            className={s.text_field}
            value={nameToSearch}
          />
          <Tabs
            defaultValue={''}
            tabs={[
              { tabName: 'MY', value: isMyDecks },
              { tabName: 'ALL', value: '' },
            ]}
            label={'Show decks'}
            value={myDecks}
            onValueChange={setMyDecks}
          />
          <Slider
            max={data?.maxCardsCount}
            onValueCommit={setDebouncedSliderValue}
            onChange={setSliderValue}
            label={'Number of cards'}
            className={s.slider}
            value={sliderValue}
            maxValue={sliderValue[1]}
            minValue={0}
          />
          <Button variant={'secondary'} className={s.btn} onClick={clearFilters}>
            <DeleteIcon />
            <Typography variant={'subtitle2'}>Clear Filter</Typography>
          </Button>
        </div>

        <Table.Root>
          <Table.Head sort={sort} onSort={setSort} columns={columns}></Table.Head>
          <Table.Body>{tableRows}</Table.Body>
        </Table.Root>

        <Pagination
          currentPage={page}
          totalCount={totalDecks}
          pageSize={+pageSize}
          siblingCount={3}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </Page>
  )
}
