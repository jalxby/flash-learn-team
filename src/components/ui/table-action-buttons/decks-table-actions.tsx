import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './table-action-buttons.module.scss'

import { DeleteIcon, PlayIcon } from '@/assets'
import { DeleteDialog } from '@/components/ui/modal/delete-dialog/delete-dialog.tsx'
import { useRemoveDeckMutation } from '@/services/decks/decks.api.ts'
import { Deck } from '@/services/decks/decks.api.types.ts'

type Props = {
  isMyDeck: boolean
  item: Deck
}
export const DecksTableActions: FC<Props> = ({ item, isMyDeck }) => {
  const [removeDeck] = useRemoveDeckMutation()
  const { id } = item
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <button onClick={() => navigate(`/cards/${id}`)}>
        <PlayIcon />
      </button>
      {isMyDeck && (
        <>
          <DeleteDialog
            buttonTitle={'Delete Pack'}
            onClick={() => removeDeck({ id })}
            title={'Delete Pack'}
            bodyMessage={`Do you really want to delete "${item.name}" deck?`}
            id={item.id}
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
