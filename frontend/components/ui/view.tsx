import { ViewProps, View } from 'react-native'
import React from 'react'
import { useThemeContext } from '../../context/theme'


type Props = ViewProps & {
  children: ReactNode;
}

export default function CustomView({ children, style, ...props } : Props) {
  
  const { theme } = useThemeContext()
  const backgroundColor = theme.colors.background
  
  return (
    <View style={{backgroundColor,...style }} {...props} >
      { children }
    </View>
  )
}