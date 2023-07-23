import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './table-action-buttons.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets'
import { DeleteDialog } from '@/components/ui/modal/delete-dialog/delete-dialog.tsx'
import { EditPackModal } from '@/components/ui/modal/edit-pack-modal/edit-pack-modal.tsx'
import { useRemoveDeckMutation, useUpdateDeckMutation } from '@/services/decks/decks.api.ts'
import { Deck } from '@/services/decks/decks.api.types.ts'

type Props = {
  isMyDeck: boolean
  item: Deck
}
export const DecksTableActions: FC<Props> = ({ item, isMyDeck }) => {
  const [removeDeck] = useRemoveDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const { name, isPrivate, id, cover } = item
  const navigate = useNavigate()

  return (
    <div className={s.container}>
      <button onClick={() => navigate(`/cards/${id}`)}>
        <PlayIcon />
      </button>
      {isMyDeck && (
        <>
          <EditPackModal
            trigger={
              <button>
                <EditIcon />
              </button>
            }
            onSubmit={data =>
              updateDeck({ id, isPrivate: data.isPrivate, cover, name: data.newNamePack })
            }
            isPrivate={isPrivate}
            packName={name}
          />
          <DeleteDialog
            buttonTitle={'Delete Pack'}
            item={item}
            onClick={() => removeDeck({ id })}
            title={'Delete Pack'}
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
