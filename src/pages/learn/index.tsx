import { useParams } from 'react-router-dom'

import { GradeType, LearnDeck, Page } from '@/components'
import { useGetCardQuery } from '@/services/cards/cards.api.ts'
import {
  useGetDeckQuery,
  useLearnCardQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'

export const Learn = () => {
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: randomCard, refetch } = useLearnCardQuery({ id: id ?? '' })
  const { data: card } = useGetCardQuery({ id: randomCard?.id ?? '' }, { skip: !randomCard?.id })
  const [updateGrade] = useUpdateCardGradeMutation()

  console.log(card)

  return (
    <Page>
      {deck && randomCard && (
        <LearnDeck
          packName={deck.name}
          question={randomCard.question}
          attempts={randomCard.shots}
          answer={randomCard.answer}
          loadNextQuestion={refetch}
          onChange={data => {
            updateGrade({ id: deck.id, grade: +data as GradeType, cardId: randomCard.id })
          }}
          value={String(card?.grade)}
        />
      )}
    </Page>
  )
}
