import * as React from 'react'

const IconBaseLineDot = (props: { className?: string }) => {
  return (
    <svg className={'icon ' + props.className} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
         viewBox="0 0 24 24">
      <path fill="none" d="M24 24H0V0h24v24z"/>
      <circle fill="#5b95ea" cx="12" cy="12" r="8"/>
    </svg>
  )
}

export default IconBaseLineDot
