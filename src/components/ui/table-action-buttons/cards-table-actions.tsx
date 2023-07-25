import { FC } from 'react'

import s from './table-action-buttons.module.scss'

import { DeleteIcon, EditIcon } from '@/assets'
import { DeleteDeckDialog } from '@/components/ui/modal/delete-deck/delete-deck-dialog.tsx'
import { EditCard } from '@/components/ui/modal/edit-card'
import { useDeleteCardMutation, useUpdateCardMutation } from '@/services/cards/cards.api.ts'
import { Card } from '@/services/decks/decks.api.types.ts'

type Props = {
  item: Card
}
export const CardsTableActions: FC<Props> = ({ item }) => {
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation()
  const { id, answer, question } = item

  return (
    <div className={s.container}>
      <EditCard question={question} answer={answer} onSubmit={data => updateCard({ id, ...data })}>
        <button>
          <EditIcon />
        </button>
      </EditCard>

      <DeleteDeckDialog
        buttonTitle={'Delete Card'}
        onClick={id => deleteCard({ id })}
        title={'Delete Card'}
        bodyMessage={`Do you really want to delete card?`}
        id={item.id}
      >
        <button>
          <DeleteIcon />
        </button>
      </DeleteDeckDialog>
    </div>
  )
}