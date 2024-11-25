import firebaseApp from './firebaseApp.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const auth = getAuth(firebaseApp);

export function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
export function checkUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}