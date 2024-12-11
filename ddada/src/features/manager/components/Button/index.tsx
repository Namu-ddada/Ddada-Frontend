interface ButtonProps {
  size: 'md' | 'lg'
  type: 'earn' | 'fault' | 'miss'
  text: string
  changeStyle?: boolean
  disabled?: boolean
  onClick?: () => void
}

function Button({
  size,
  text,
  type,
  changeStyle,
  disabled,
  onClick,
}: ButtonProps) {
  const btnSize = {
    md: 'px-4 py-2',
    lg: 'px-6 py-2',
  }

  const btnStyle = {
    earn: `${changeStyle ? ` bg-primary text-white` : `border-primary text-primary`}`,
    miss: `${changeStyle ? ` bg-danger text-white` : `border-danger text-danger `}`,
    fault: `${changeStyle ? ` bg-theme text-white` : `border-theme text-theme`}`,
  }
  return (
    <button
      type="button"
      className={`text-sm border rounded-[62.5rem] ${btnSize[size]} ${btnStyle[type]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
