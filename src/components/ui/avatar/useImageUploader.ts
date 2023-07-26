import { ChangeEvent, useRef, useState } from 'react'

/**
 * The useImageUploader hook provides functionality for uploading images.
 * @param {string} value - The initial file value.
 *
 */
export const useImageUploader = (value: string) => {
  const maskFile = new File([value], 'mask.png', { type: 'image/png' })
  const [file, setFile] = useState<File>(maskFile)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  /**
   * Opens the file input dialog.
   */
  const openFileInput = () => {
    fileInputRef.current && fileInputRef.current.click()
  }

  /**
   * Handles the change of the selected file.
   * @param {ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0]

    if (photo) {
      if (photo.type === 'image/jpeg' || photo.type === 'image/png') {
        setFile(photo)
      }
    }
  }

  return {
    file,
    fileInputRef,
    handleFileChange,
    openFileInput,
  }
}
