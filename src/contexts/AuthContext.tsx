import React, { createContext, ReactNode, useState, useEffect } from "react";
import { auth, firebase, firestore } from "../services/firebase";
import * as GoogleAuthentication from "expo-google-app-auth";

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle: () => void;
  signOut: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  uid: string;
}

export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {

    const createNewUser = (uid: string) => {
      const usersRef = firestore.collection('users')

      usersRef.doc(uid).set({
        userId: uid
      })
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      
      if (user) {
        setUser({uid: user.uid});

        const userDocRef = firestore.collection('users').doc(user.uid)

        userDocRef.get().then((userDoc) => {
          if(userDoc.exists) {
            return
          } else {
            createNewUser(user.uid)
          }
        })

      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    auth.signOut().then(() => {
      setUser(undefined)
    }).catch((err) => {
      throw new Error(err)
    })
  }

  const signInWithGoogle = async () =>
    GoogleAuthentication.logInAsync({
      androidClientId:
        "281405466411-k0j0dpeha0mc8bro8u182bhmjlqta76j.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    })
      .then((logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          return auth.signInWithCredential(credential);
        }
        return Promise.reject();
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
