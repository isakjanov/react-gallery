import * as React from 'react'

const IconArrowLeft = (props: { className?: string }) => {
  return (
    <svg className={'icon ' + props.className}
         xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="#ffffff" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
      <path fill="none" d="M0 0h24v24H0z"/>
    </svg>
  )
}

export default IconArrowLeft
