import React, { createContext, useContext } from 'react'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import { getRefreshToken, refreshToken } from '../utils/authentication'


type LoginProps = {
  access:string,
  refresh:string
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (authState:boolean) => void;
  isLoading:boolean;
  login: ({access,refresh}:LoginProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
  const context =  useContext(AuthContext)
  if(!context) throw new Error('useAuthContext should be used inside AuthContextProvider')
  return context
}

interface ContextProp {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: ContextProp) => {
  
  const router = useRouter()
  const [isLoading,setIsLoading] = React.useState<boolean>(true)
  const [isAuthenticated,setIsAuthenticated] = React.useState<boolean | null>(null)
  
  const login = React.useCallback(async({access,refresh}: LoginProps) => {
    await SecureStore.setItemAsync('access',access)
    await SecureStore.setItemAsync('refresh',refresh)
    setIsAuthenticated(true)
    router.replace('/(home)/')
  },[isAuthenticated])
  
  const logout = React.useCallback(async() => {
    await SecureStore.deleteItemAsync('refresh')
    await SecureStore.deleteItemAsync('access')
    setIsAuthenticated(false)
    router.replace({pathname:'/authentication'})
  },[isAuthenticated]) 
  
  
  React.useEffect(() => {
    async function checkAuth(){
      const token = await getRefreshToken()
      setIsAuthenticated(token? true: false)
      setIsLoading(false)
    }
    checkAuth()
  },[])
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
      login,
      logout
    }}>
      { children } 
    </AuthContext.Provider>
  )
}