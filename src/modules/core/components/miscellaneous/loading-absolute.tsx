interface LoadingAbsoluteProps {
  show?: boolean
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
}

export const LoadingAbsolute = ({
  show,
  blurAmount = 'md',
  label = 'Loading...'
}: LoadingAbsoluteProps) => {
  if (!show) return null

  const blurClass = `backdrop-blur-${blurAmount}`

  return (
    <div
      className={`absolute flex items-center justify-center z-50 bg-background/30 ${blurClass} top-0 bottom-0 right-0 left-0`}
      style={{
        position: 'fixed',
        top: -32,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      {/* <Spinner classNames={{ label: 'text-foreground mt-4' }} label={label} /> */}
      <span>{label}</span>
    </div>
  )
}
