import React from 'react'

export type SetTheme = React.Dispatch<React.SetStateAction<string>>
export type IsTheme = string

export default interface ThemeProps {
  setTheme: SetTheme
  isTheme: IsTheme
}
