import React from 'react'
import { Box } from '@chakra-ui/react'

export type WarpperVariant = 'small' | 'regular'

interface WrapperProps {
  variant?: WarpperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      maxW={variant === 'regular' ? '800px' : '400px'}
      w='100%'
      mt={8}
      mx='auto'
    >
      {children}
    </Box>
  )
}
