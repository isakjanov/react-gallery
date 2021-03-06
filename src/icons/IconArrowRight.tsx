import * as React from 'react'

const IconArrowRight = (props: { className?: string }) => {
  return (
    <svg className={'icon ' + props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
         viewBox="0 0 24 24">
      <path fill="#ffffff" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
      <path fill="none" d="M0 0h24v24H0z"/>
    </svg>
  )
}

export default IconArrowRight
