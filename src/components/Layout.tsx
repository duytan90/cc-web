import React from 'react'
import { NavBar } from './NavBar'
import { WarpperVariant, Wrapper } from './Wrapper'

interface LayoutProps {
  variant?: WarpperVariant
}

export const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  )
}
