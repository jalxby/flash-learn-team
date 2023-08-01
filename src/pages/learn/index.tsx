import { useParams } from 'react-router-dom'

import { GradeType, LearnDeck, Page } from '@/components'
import {
  useGetDeckQuery,
  useLearnCardQuery,
  useUpdateCardGradeMutation,
} from '@/services/decks/decks.api.ts'

export const Learn = () => {
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: randomCard } = useLearnCardQuery({ id: id ?? '' })
  const [updateGrade] = useUpdateCardGradeMutation()

  return (
    <Page>
      {deck && randomCard && (
        <LearnDeck
          packName={deck.name}
          question={randomCard.question}
          attempts={randomCard.shots}
          answer={randomCard.answer}
          loadNextQuestion={data => {
            updateGrade({ id: deck.id, grade: +data as GradeType, cardId: randomCard.id })
          }}
        />
      )}
    </Page>
  )
}
