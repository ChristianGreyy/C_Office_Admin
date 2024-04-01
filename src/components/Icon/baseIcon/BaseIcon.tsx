import { MAIN_THEME_DATA } from '@configs'
import { ICon } from '@interfaces'

const HeartIcon = (props: ICon) => {
  const { onClick, width = 20, height = 20, className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 18.318"
      role="img"
      onClick={onClick}
      className={className}
      {...props}
    >
      <g
        style={{
          fill: 'none',
          strokeMiterlimit: 10,
        }}
      >
        <path
          d="M582.71 148.659a5.972 5.972 0 0 0-8.246-.182 5.977 5.977 0 0 0-8.247 8.649l8.008 8.007a.336.336 0 0 0 .476 0l8.008-8.007a5.988 5.988 0 0 0 .001-8.467Z"
          style={{
            stroke: 'none',
          }}
          transform="translate(-564.464 -146.915)"
        />
        <path
          d="M570.426 148.315a4.521 4.521 0 0 0-3.219 1.335 4.555 4.555 0 0 0-1.343 3.243 4.56 4.56 0 0 0 1.343 3.244l7.257 7.255 7.256-7.255a4.558 4.558 0 0 0 1.344-3.244 4.556 4.556 0 0 0-1.344-3.244 4.52 4.52 0 0 0-3.218-1.334 4.595 4.595 0 0 0-3.096 1.199l-.942.855-.941-.855a4.596 4.596 0 0 0-3.097-1.199m0-1.4c1.446 0 2.894.523 4.038 1.563a5.993 5.993 0 0 1 4.038-1.563c1.523 0 3.044.58 4.208 1.744a5.988 5.988 0 0 1 0 8.468l-8.008 8.007a.33.33 0 0 1-.238.099.331.331 0 0 1-.238-.099l-8.009-8.007a5.988 5.988 0 0 1 0-8.468 5.927 5.927 0 0 1 4.209-1.744Z"
          style={{
            fill: '#040505',
            stroke: 'none',
          }}
          transform="translate(-564.464 -146.915)"
        />
      </g>
    </svg>
  )
}

const CartIcon = (props: ICon) => {
  const { onClick, width = 20, height = 20, className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 19"
      role="img"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path
        d="M19.411 3.115H5.155L4.461 0H.719a.742.742 0 0 0 0 1.484h2.6l2.128 9.565a1.888 1.888 0 0 0 .394 3.718h1.948a2.056 2.056 0 1 0 .052 0h7.139a2.055 2.055 0 1 0 .051 0h2.336a.742.742 0 0 0 0-1.484H5.838a.4.4 0 0 1 0-.8h11.886a.594.594 0 0 0 .576-.48l1.687-8.159a.6.6 0 0 0-.576-.729ZM8.43 16.882a.617.617 0 1 1-.616-.635.627.627 0 0 1 .616.635Zm7.19 0a.617.617 0 1 1-.616-.635.626.626 0 0 1 .616.635Zm1.418-5.88H6.907l-1.4-6.405h12.859Z"
        fill="#040505"
      />
    </svg>
  )
}

const UserIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
    strokeWidth = 1.5,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path
        d="M12.16 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.99 9.54 2 12 2a4.435 4.435 0 0 1 .16 8.87Zm-5 3.69c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ChevronDownIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size,
    className,
    color = '#000',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      onClick={onClick}
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const XCloseIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size,
    className,
    color = '#000',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      onClick={onClick}
      className={className}
      {...props}
    >
      <path d="M2 30 30 2m0 28L2 2" />
    </svg>
  )
}

const MenuUnfoldOutlined = (props: ICon) => {
  const {
    onClick,
    width = 18,
    height = 18,
    className,
    color = '#f1f5f9',
  } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="64 64 896 896"
      data-icon="menu-unfold"
      fill={color}
      aria-hidden="true"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1 298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>
  )
}

const MenuFoldOutlined = (props: ICon) => {
  const {
    onClick,
    width = 18,
    height = 18,
    className,
    color = '#f1f5f9',
  } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="64 64 896 896"
      data-icon="menu-fold"
      fill={color}
      aria-hidden="true"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9 271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z" />
    </svg>
  )
}

const UserHeaderIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#f1f5f9',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      viewBox="-32 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
      />
    </svg>
  )
}

const LogoutIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#f1f5f9',
  } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
      className={className}
      {...props}
    >
      <rect x={1} y={5} width={22} height={14} rx={7} ry={7} />
      <circle cx={16} cy={12} r={3} />
    </svg>
  )
}

const SearchIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#8E96AF',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.875 18.75a7.875 7.875 0 1 0 0-15.75 7.875 7.875 0 0 0 0 15.75Zm5.569-2.306L21 21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ViewIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 -32 576 576"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
    </svg>
  )
}

const PhoneIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth={2}
        d="M6.375 2C5 2 3 3.5 2.5 4.5c-.715 1.43-.597 1.99-.125 3.5.625 2 2.457 5.545 5 8 3.625 3.5 7 5 8.5 5.5s3.125 0 4.125-1 2-2 .875-3.5c-.797-1.063-1.959-2.292-3.375-3-1.288-.644-2.056-.41-2.5.5-.246.503-.322 1.466-.5 2-.225.674-1.125.5-2.125 0C11.418 16.021 9 14 7 11c-1.24-1.859.742-1.87 2-2.5 1-.5 1.31-1.65.5-3C8 3 7.5 2 6.375 2Z"
      />
    </svg>
  )
}

const MailIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth={2}
        d="M1 4h22v16H1V4Zm0 1 11 8.5L23 5"
      />
    </svg>
  )
}

const SpentIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
    </svg>
  )
}

const UsedPointIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M28 4a16 16 0 0 1 6.584 30.586 16 16 0 1 1-21.172-21.172A16.005 16.005 0 0 1 28 4Zm-6 14h-4v2a5 5 0 0 0-.328 9.99L18 30h4l.18.016a1 1 0 0 1 0 1.968L22 32h-8v4h4v2h4v-2a5 5 0 0 0 .328-9.99L22 26h-4l-.18-.016a1 1 0 0 1 0-1.968L18 24h8v-4h-4v-2Zm6-10a11.97 11.97 0 0 0-8.968 4.026 16 16 0 0 1 16.94 16.942A12 12 0 0 0 28 8Z"
        fill={color}
      />
    </svg>
  )
}

const PointIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5V9h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z" />
    </svg>
  )
}

const RebatePointIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g data-name="27. Return">
        <path d="M16 0A16 16 0 0 0 4.08 26.66a13 13 0 0 0 1 1.06c.22.21.45.42.69.62s.59.46.88.66H6a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-2 0v.47c-.3-.21-.61-.43-.93-.68s-.39-.34-.57-.52-.63-.61-.93-.94A14 14 0 1 1 16 30a13.57 13.57 0 0 1-2.8-.28 1 1 0 1 0-.4 2A16 16 0 1 0 16 0Z" />
        <path d="M26 16a10 10 0 1 0-10 10 10 10 0 0 0 10-10ZM8 16a8 8 0 1 1 8 8 8 8 0 0 1-8-8Z" />
        <path d="M17 21v-.18A3 3 0 0 0 16 15a1 1 0 0 1 0-2h2a1 1 0 0 0 0-2h-1a1 1 0 0 0-2 0v.18A3 3 0 0 0 16 17a1 1 0 0 1 0 2h-2a1 1 0 0 0 0 2h1a1 1 0 0 0 2 0Z" />
      </g>
    </svg>
  )
}

const PercentMathIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.64 122.88"
      {...props}
    >
      <path d="m28.02 53.79 16.29-.21a60.483 60.483 0 0 1 16.77 14.26c12.54-20.79 26.94-37.82 42.77-52.02h12.41C94.12 40.42 76.05 66.75 61.6 94.64c-7.72-16.57-18.53-30.51-33.58-40.85zm91.09-12.92-9.79 3.75c.45 1.26.87 2.59 1.24 4.08a51.23 51.23 0 0 1 1.54 15.25 50.9 50.9 0 0 1-3.01 14.97c-1.72 4.73-4.15 9.2-7.24 13.23-2.99 3.9-6.61 7.41-10.82 10.35h-.01a57.54 57.54 0 0 1-4.74 2.99c-1.63.91-3.28 1.74-4.96 2.48-3.75 1.65-7.56 2.84-11.38 3.56-3.9.74-7.81 1.01-11.68.82l-1.26-.07-2.75 10.28 1.88.14c4.93.38 9.93.13 14.92-.74 4.88-.86 9.75-2.32 14.51-4.43a67.598 67.598 0 0 0 11.45-6.48 59.582 59.582 0 0 0 21.94-28.59c2.1-5.78 3.33-11.86 3.62-18.04.3-6.1-.31-12.28-1.87-18.35-.43-1.76-.98-3.46-1.59-5.2zm-94.86 69.5c3.59 2.8 7.44 5.15 11.46 7.02l1.69.79 2.75-10.25-1.15-.58a49.19 49.19 0 0 1-8.37-5.28c-2.6-2.02-5.03-4.34-7.25-6.93l-.85-.98-9.17 5.29 1.18 1.43c2.92 3.57 6.18 6.73 9.71 9.49zM.57 69.53c.62 4.47 1.75 8.88 3.39 13.15l.66 1.72 9.17-5.29-.44-1.23a50.03 50.03 0 0 1-2.4-9.72c-.47-3.29-.59-6.63-.38-9.96l.08-1.29L.41 54.15l-.17 1.86c-.41 4.5-.3 9.03.33 13.52zm7.81-38.56c-.91 1.55-1.75 3.11-2.5 4.7l-.82 1.7 10.25 2.75.58-1.13c.58-1.13 1.19-2.23 1.84-3.29a46.83 46.83 0 0 1 2.09-3.17c1.21-1.71 2.52-3.36 3.9-4.93 1.37-1.56 2.81-3.03 4.3-4.38l.93-.86-5.31-9.21-1.44 1.25a67.858 67.858 0 0 0-5.74 5.65 72.564 72.564 0 0 0-5.15 6.41 60.702 60.702 0 0 0-2.93 4.51zM50.44.78c-3.51.59-6.91 1.51-10.17 2.74l-1.74.65 5.3 9.18 1.22-.43A44.47 44.47 0 0 1 52.77 11c2.6-.41 5.26-.58 7.98-.52 1.21.03 2.49.11 3.79.26a44.781 44.781 0 0 1 7.54 1.51c1.24.37 2.5.8 3.79 1.3h.01c1.35.52 2.78.45 4.01-.09a5.196 5.196 0 0 0 2.77-2.9c.52-1.35.45-2.78-.09-4.01a5.196 5.196 0 0 0-2.9-2.77c-1.53-.59-3.08-1.12-4.66-1.59-1.58-.46-3.12-.85-4.65-1.15a54.3 54.3 0 0 0-4.61-.72C64.2.15 62.62.04 61 0c-3.6-.06-7.13.2-10.56.78z" />
    </svg>
  )
}

const VisitIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 502.664 502.664"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M235.704 0v77.008h31.234V0h-31.234zM89.476 73.449c12.036 12.036 42.494 42.494 54.509 54.488 7.765-7.744 14.345-14.345 22.132-22.045-12.036-12.058-42.494-42.516-54.531-54.553a10973.677 10973.677 0 0 1-22.11 22.11zm247.093 32.42c7.744 7.701 14.345 14.301 22.11 22.045a63616.944 63616.944 0 0 1 54.488-54.488c-7.744-7.722-14.366-14.28-22.11-22.088a127288.703 127288.703 0 0 1-54.488 54.531zm50.95 91.655v31.299h77.051v-31.299h-77.051zm-349.403 0c0 11.023-.022 20.298-.022 31.256 16.998.022 60.075.022 77.072.065v-31.299c-16.997-.022-60.074-.022-77.05-.022zM320.11 324.748H182.618c-24.548 0-44.695 22.585-44.695 50.195v127.721h226.903V374.943c-.021-27.61-20.125-50.195-44.716-50.195zm-68.832-22.153c43.055 0 77.763-34.729 77.763-77.612 0-42.926-34.707-77.676-77.763-77.676-42.818 0-77.525 34.707-77.525 77.676.021 42.861 34.685 77.612 77.525 77.612z" />
    </svg>
  )
}

const LastVisitIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" fillOpacity={0.01} d="M0 0h48v48H0z" />
      <path
        d="M5.818 6.727V14h7.273"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 24c0 11.046 8.954 20 20 20v0c11.046 0 20-8.954 20-20S35.046 4 24 4c-7.402 0-13.865 4.021-17.323 9.998"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m24.005 12-.001 12.009 8.48 8.48"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const InfoIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#f6a624',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 18h6m-5 4h4m1.09-8c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  )
}

const NextIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#12313d',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m5.94 13.28 4.347-4.347a1.324 1.324 0 0 0 0-1.866L5.94 2.72"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      />
    </svg>
  )
}

const PrevIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#12313d',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.875 15.438 5.937 9.5l5.938-5.938"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ProfileIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = 'white',
    strokeWidth = 2,
  } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx={12} cy={7} r={4} />
    </svg>
  )
}

const GeneralIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = 'white',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496.188 496.188"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M182.239 82.03h131.724c13.961 0 25.268-11.322 25.268-25.271 0-13.96-11.307-25.282-25.268-25.282H182.239c-13.96 0-25.282 11.322-25.282 25.282 0 13.949 11.322 25.271 25.282 25.271zM470.9 414.158H339.166c-13.944 0-25.282 11.322-25.282 25.266 0 13.965 11.338 25.287 25.282 25.287H470.9c13.978 0 25.287-11.322 25.287-25.287.001-13.943-11.308-25.266-25.287-25.266zm-313.877 0H25.282C11.338 414.158 0 425.481 0 439.424c0 13.965 11.338 25.287 25.282 25.287h131.74c13.964 0 25.282-11.322 25.282-25.287.001-13.943-11.318-25.266-25.281-25.266zm-36.56-143.464h255.243c4.558 0 8.281 3.722 8.281 8.28V338.9h-44.821c-13.944 0-25.282 11.303-25.282 25.283 0 13.949 11.338 25.266 25.282 25.266H470.9c13.978 0 25.287-11.316 25.287-25.266 0-13.98-11.309-25.283-25.287-25.283h-44.785v-59.926c0-27.799-22.611-50.409-50.409-50.409H269.143v-71.278h44.82c13.961 0 25.268-11.307 25.268-25.287 0-13.945-11.307-25.268-25.268-25.268H182.239c-13.96 0-25.282 11.322-25.282 25.268 0 13.98 11.322 25.287 25.282 25.287h44.776v71.278H120.463c-27.779 0-50.404 22.61-50.404 50.409V338.9H25.282C11.338 338.9 0 350.203 0 364.184c0 13.949 11.338 25.266 25.282 25.266h131.74c13.964 0 25.282-11.316 25.282-25.266 0-13.98-11.318-25.283-25.282-25.283h-44.835v-59.926c.001-4.559 3.717-8.281 8.276-8.281z" />
    </svg>
  )
}

const PrivacyIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = 'white',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M448 192.002h-21.333v-21.335C426.667 76.41 350.257 0 256 0S85.333 76.41 85.333 170.667v21.335H64c-11.782 0-21.333 9.551-21.333 21.333V448c0 35.355 28.645 64 64 64h298.667c35.355 0 64-28.645 64-64V213.335c-.001-11.782-9.552-21.333-21.334-21.333zm-320-21.335c0-70.693 57.307-128 128-128s128 57.307 128 128V192H128v-21.333zm298.667 64.002v127.998H85.333V234.669h341.334zm-21.334 234.664H106.667c-11.791 0-21.333-9.542-21.333-21.333v-42.665h341.333V448c0 11.791-9.542 21.333-21.334 21.333z" />
      <path d="M170.667 341.333c11.782 0 21.333-9.551 21.333-21.333v-42.667c0-11.782-9.551-21.333-21.333-21.333-11.782 0-21.333 9.551-21.333 21.333V320c-.001 11.782 9.551 21.333 21.333 21.333zm85.333 0c11.782 0 21.333-9.551 21.333-21.333v-42.667c0-11.782-9.551-21.333-21.333-21.333-11.782 0-21.333 9.551-21.333 21.333V320c0 11.782 9.551 21.333 21.333 21.333zm85.333 0c11.782 0 21.333-9.551 21.333-21.333v-42.667c0-11.782-9.551-21.333-21.333-21.333-11.782 0-21.333 9.551-21.333 21.333V320c0 11.782 9.551 21.333 21.333 21.333z" />
    </svg>
  )
}

const PolicyIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = 'white',
    strokeWidth = 1.5,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        d="M4.998 7V1H19.5L23 4.5V23h-6m1-22v5h5M4 15h10v8H4v-8Zm2 0v-2a3 3 0 0 1 6 0v2m-4 4h2"
      />
    </svg>
  )
}

const LinkIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        data-name="link-Filled"
        d="m20.545 10.467-1.839 1.84a1 1 0 0 1-1.414-1.414l1.839-1.84a2.965 2.965 0 0 0 0-4.186 3.027 3.027 0 0 0-4.184 0l-3.36 3.36a2.046 2.046 0 0 0-.267.316 2.943 2.943 0 0 0 .268 3.87 1 1 0 0 1-1.415 1.414 4.915 4.915 0 0 1-.5-6.42 3.792 3.792 0 0 1 .5-.594l3.36-3.36a4.959 4.959 0 0 1 7.013 7.014Zm-8.132-.294a1 1 0 0 0 0 1.414 2.928 2.928 0 0 1 .688 3.1 2.827 2.827 0 0 1-.688 1.088l-3.36 3.36a3.027 3.027 0 0 1-4.184 0 2.965 2.965 0 0 1 0-4.186l1.839-1.84a1 1 0 1 0-1.414-1.414l-1.839 1.84a4.959 4.959 0 1 0 7.013 7.014l3.359-3.359a4.813 4.813 0 0 0 1.163-1.849 4.963 4.963 0 0 0-1.163-5.166 1 1 0 0 0-1.414-.002Z"
      />
    </svg>
  )
}

const HideIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = MAIN_THEME_DATA.mainColor,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      viewBox="0 -64 640 640"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" />
    </svg>
  )
}

const UploadIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#fff',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        d="M1 17v6h22v-6M12 2v17M5 9l7-7 7 7"
      />
    </svg>
  )
}

const UpIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#a3a3a3',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 15H18L12 9L6 15Z" fill={color} />
    </svg>
  )
}

const DownIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 24,
    className,
    color = '#a3a3a3',
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18 9H6L12 15L18 9Z" fill={color} />
    </svg>
  )
}

const TotalMembersIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 32,
    className,
    color = '#a3a3a3',
  } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="924 578 200 200"
      fill={color}
      xmlSpace="preserve"
      {...props}
    >
      <path d="M984.585 638.942c0 13.999-9.609 25.348-21.462 25.348-11.852 0-21.459-11.349-21.459-25.348 0-13.998 9.607-25.346 21.459-25.346 11.853 0 21.462 11.348 21.462 25.346z" />
      <path d="M987.585 683.641a14.088 14.088 0 0 1 5.041-1.855c-3.606-5.088-6.161-10.546-7.637-17.078-.404-2.387-3.672-2.667-6.102-.687-4.546 3.706-9.849 6.186-15.765 6.186-6.03 0-11.577-2.399-16.024-6.414a4.314 4.314 0 0 0-5.143-.479c-8.443 5.158-14.834 13.344-17.622 23.067a8.65 8.65 0 0 0 8.317 11.031h38.668a69.3 69.3 0 0 1 16.267-13.771zm75.831-44.699c0 13.999 9.608 25.348 21.461 25.348 11.854 0 21.46-11.349 21.46-25.348 0-13.998-9.606-25.346-21.46-25.346-11.853 0-21.461 11.348-21.461 25.346z" />
      <path d="M1060.415 683.641a14.095 14.095 0 0 0-5.041-1.855c3.606-5.088 6.161-10.546 7.637-17.078.405-2.387 3.673-2.667 6.103-.687 4.546 3.706 9.848 6.186 15.764 6.186 6.029 0 11.577-2.399 16.025-6.414a4.313 4.313 0 0 1 5.142-.479c8.444 5.158 14.836 13.344 17.622 23.067a8.656 8.656 0 0 1-1.41 7.588 8.659 8.659 0 0 1-6.905 3.443h-38.67a69.28 69.28 0 0 0-16.267-13.771zm22.06 41.81c-4.198-14.654-13.72-27.045-26.326-34.992a6.637 6.637 0 0 0-7.921.631c-6.766 5.959-15.138 9.506-24.228 9.506-9.269 0-17.791-3.686-24.626-9.855a6.624 6.624 0 0 0-7.902-.734c-12.977 7.924-22.799 20.504-27.082 35.445a13.296 13.296 0 0 0 12.781 16.953h92.523a13.291 13.291 0 0 0 12.781-16.954z" />
      <path d="M1056.981 652.547c0 21.513-14.766 38.955-32.981 38.955-18.214 0-32.979-17.442-32.979-38.955 0-21.515 14.765-38.951 32.979-38.951 18.216 0 32.981 17.437 32.981 38.951z" />
    </svg>
  )
}

const TotalSpentIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 32,
    className,
    color = '#a3a3a3',
  } = props
  return (
    <svg
      viewBox="0 0 24 24"
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 10c3.976 0 8-1.374 8-4s-4.024-4-8-4-8 1.374-8 4 4.024 4 8 4z" />
      <path d="M4 10c0 2.626 4.024 4 8 4s8-1.374 8-4V8c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
      <path d="M4 14c0 2.626 4.024 4 8 4s8-1.374 8-4v-2c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
      <path d="M4 18c0 2.626 4.024 4 8 4s8-1.374 8-4v-2c0 2.626-4.024 4-8 4s-8-1.374-8-4v2z" />
    </svg>
  )
}

const PlusIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 32,
    className,
    color = '#a3a3a3',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 5v14m-7-7h14" />
    </svg>
  )
}

const LockIcon = (props: ICon) => {
  const {
    onClick,
    width = 24,
    height = 24,
    size = 32,
    className,
    color = '#f1f5f9',
    strokeWidth = 2,
  } = props
  return (
    <svg
      width={size || width}
      height={size || height}
      onClick={onClick}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect height="11" width="18" rx="2" ry="2" x="3" y="11" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  )
}

export {
  HeartIcon,
  CartIcon,
  UserIcon,
  ChevronDownIcon,
  XCloseIcon,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserHeaderIcon,
  SearchIcon,
  LogoutIcon,
  ViewIcon,
  PhoneIcon,
  MailIcon,
  SpentIcon,
  PointIcon,
  UsedPointIcon,
  RebatePointIcon,
  PercentMathIcon,
  VisitIcon,
  LastVisitIcon,
  InfoIcon,
  PrevIcon,
  NextIcon,
  ProfileIcon,
  GeneralIcon,
  PrivacyIcon,
  PolicyIcon,
  LinkIcon,
  HideIcon,
  UploadIcon,
  DownIcon,
  UpIcon,
  TotalMembersIcon,
  TotalSpentIcon,
  PlusIcon,
  LockIcon,
}
