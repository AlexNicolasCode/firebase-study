import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../services/firebase";

interface User {
    email: string,
    password: string
}

interface UserCredential {
    userCredentials: string | null,
    alert?: string
}

export const useAuth = async ({ email, password }: User): Promise<UserCredential> => {
    const result = await createUserWithEmailAndPassword(auth(), email, password)
        .then((userCredential) => {
            return { userCredentials: userCredential.user }
        })
        .catch((error) => {
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                return { userCredentials: null, error: "email already in use" }
            }

            return { userCredentials: null }
        });

    return result as UserCredential
}