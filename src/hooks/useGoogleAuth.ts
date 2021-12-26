import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../services/firebase";

export const useGoogleAuth = async () => {
  const provider = new GoogleAuthProvider()

  return await signInWithPopup(auth(), provider)
    .then((result) => {
      if (!result.user) {        
          throw new Error('Missing information from Google Account')   
      }
    
      localStorage.setItem('access-token', GoogleAuthProvider.credentialFromResult(result)?.accessToken)
      return { user: result.user }
    })
    .catch((e) => {
      throw new Error(e)
    })  
}