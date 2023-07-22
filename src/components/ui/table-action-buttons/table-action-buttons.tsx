import { FC } from 'react'

import s from './table-action-buttons.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets'
import { AddNewPackModal } from '@/components/ui/modal/add-new-pack-modal'
import { DeleteDialog } from '@/components/ui/modal/delete-dialog/delete-dialog.tsx'
import { DecksItem } from '@/services/decks/decks.api.types.ts'

type TableActionsProps = {
  editable?: boolean
  item: DecksItem
}
export const TableActions: FC<TableActionsProps> = ({ item, editable = true }) => {
  return (
    <div className={s.container}>
      <AddNewPackModal
        trigger={
          <button>
            <PlayIcon />
          </button>
        }
        onSubmit={() => {}}
      />
      {editable && (
        <>
          <AddNewPackModal
            trigger={
              <button>
                <EditIcon />
              </button>
            }
            onSubmit={() => {}}
          />
          <DeleteDialog
            buttonTitle={'Delete Pack'}
            item={item}
            onClick={id => {
              console.log(id)
            }}
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
