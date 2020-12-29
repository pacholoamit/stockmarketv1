import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()


  function signup(email, password) {
    return (
      auth.createUserWithEmailAndPassword(email, password)
        .then(credentials => {
          db.collection('users').doc(credentials.user.email).set({
            credits: 100000
          })
        })
    )
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

    })
    return unsubscribe
  }, [setCurrentUser])


  const value = { currentUser, signup, login, logout, resetPassword, db }

  return (

    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>


  )
}
