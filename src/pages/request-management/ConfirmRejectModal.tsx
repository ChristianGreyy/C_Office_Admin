import React from 'react'

import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { Button } from 'src/common'

interface IConfirmRejectModalProps {
  open: boolean
  isLoading: boolean
  title: string
  content: string
  onClose: () => void
  onReject: () => void
}

const ConfirmRejectModal = (props: IConfirmRejectModalProps) => {
  const { open, isLoading, title, content, onClose, onReject } = props

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="flex items-center justify-between w-[400px]">
        <div>
          <h1 className="m-0 text-[20px]">{title}</h1>
        </div>
        <div className="hover:opacity-75 cursor-pointer">
          <XCloseIcon width={16} height={16} onClick={onClose} />
        </div>
      </div>
      <div className="mt-6">
        <div>
          <p>{content}</p>
        </div>
        <div className="flex items-center mt-5 justify-end">
          <Button
            type="ghost"
            size="large"
            className="submit__btn login-btn mr-2"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            className="submit__btn login-btn"
            loading={isLoading}
            onClick={onReject}
          >
            Confirm
          </Button>
        </div>
      </div>
    </AppModal>
  )
}

export default ConfirmRejectModal
