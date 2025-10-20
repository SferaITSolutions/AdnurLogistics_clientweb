import React from 'react'

export default function SecondaryTitles({text, color}: {text: string, color: string}) {
  return <div className={color ? `text-${color}-500` : 'text-BLACK'}>{text}</div>;
}
