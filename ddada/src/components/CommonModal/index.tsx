/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface CommonModalProps {
  handleModalClose: () => void
  children: React.ReactNode
}

export default function CommonModal({
  handleModalClose,
  children,
}: CommonModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center"
      onClick={() => handleModalClose()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
