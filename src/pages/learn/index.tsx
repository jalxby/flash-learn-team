import { useParams } from 'react-router-dom'

import { LearnDeck, Page } from '@/components'
import { useGetDeckQuery, useLearnCardQuery } from '@/services/decks/decks.api.ts'

export const Learn = () => {
  const { id } = useParams<{ id: string }>()
  const { data: deck } = useGetDeckQuery({ id: id ?? '' })
  const { data: card, refetch } = useLearnCardQuery({ id: id ?? '' })

  return (
    <Page>
      {deck && card && (
        <LearnDeck
          packName={deck.name}
          question={card.question}
          attempts={card.shots}
          answer={card.answer}
          loadNextQuestion={refetch}
          onChange={data => {
            console.log(data)
          }}
          value={'value1'}
        />
      )}
    </Page>
  )
}
