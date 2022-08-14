import { useState, createContext, useEffect } from "react";

import { getStorageValue, setStorageValue } from '../storage/storage'
//Firebase Connectionn
import { auth, db } from '../Services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, updateDoc, doc, setDoc, } from 'firebase/firestore';
import { toast } from "react-toastify";


export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);


    useEffect(() => {
        function loadUserStorage() {
            const userStorage = getStorageValue('taskUser');
            if (userStorage) {
                setUser(userStorage)

            }
            setLoadingAuth(false)

        }
        loadUserStorage();

    }, [])


    async function createNewAccount(data) {
        setLoadingAuth(true);
        await createUserWithEmailAndPassword(auth, data.email, data.senha).then((responseAuth) => {
            let user = {
                nome: data.nome,
                uid: responseAuth.user.uid,
                email: responseAuth.user.email,
                isAtive: true,
                avatarUrl: null
            }
            writerUserFirestore(user);
        }).catch((error) => {
            if (error.code === 'auth/weak-password') {
                toast.warning('Senha fraca')
                setLoadingAuth(false)
            } else if (error.code === 'auth/email-already-in-use') {
                toast.warning('email ja existe')
                setLoadingAuth(false)
            }
        })
    }

    async function writerUserFirestore(user) {
        const dbInstance = collection(db, 'users');
        await setDoc(dbInstance, user,user.uid).then((responseUser) => {
            let userId = responseUser.id;
            console.log(userId)
            let dadosUsuarioCadastrado = {
                id: userId,
                uid: user.uid,
                nome: user.nome,
                email: user.email,
                avataUrl: user.avatarUrl,
                isAtive: user.isAtive,
                // token: responseUser.firestore._authCredentials.auth.auth.currentUser.accessToken
            }
            setUser(dadosUsuarioCadastrado)
            setStorageValue('taskUser', JSON.stringify(dadosUsuarioCadastrado))
            setLoadingAuth(false)
            toast.success('Bem vindo', dadosUsuarioCadastrado.nome)
        }).catch((error) => {
            console.log(error)
            setLoadingAuth(false)
            toast.success('Nao foi possivel cadastra');
        })
    }

    async function signOut() {
        auth.signOut();
        localStorage.clear('taskUser');
        setUser(null);
        setLoadingAuth(false);
        toast.success('Obrigado por usar nosso sistema! : )')
    }
    async function signIn(user) {
        setLoadingAuth(true)
        await signInWithEmailAndPassword(auth, user.email, user.senha).then(async (responseLogin) => {
            const uid = responseLogin.user.uid;
            getUserFirestore(uid);
        }).catch((error) => {
            if (error.code === 'auth/user-not-found') {
                setLoadingAuth(false)
                toast.warning('Não encontrado conta cadastrada')

            } else if (error.code === 'auth/wrong-password') {
                setLoadingAuth(false)
                toast.warning('Verifique e-mail ou senha')

            }
            setLoadingAuth(false)
        })
    }

    async function getUserFirestore(uid) {
        const dbInstance = collection(db, 'users');
        const a = await getDocs(dbInstance, uid);
        const userFirestore = a.docs.map(doc => doc.data())

        let userObject = userFirestore.find(userFirestore => userFirestore.uid === uid)
        setUser(userObject)
        setStorageValue('taskUser', JSON.stringify(userObject))
        setLoadingAuth(false)
        toast.success('Acesso ao  sistema realizado com sucesso!')
    }

    async function editProfile(data, id) {
        console.log(data, id)
        /*   const dbInstance = collection(db, 'users');
          const dados = doc(dbInstance, id);
          await updateDoc(dados, { nome: data.nome }); */
    }
    /*  useEffect(() => {
         auth.onAuthStateChanged((user) => {
             if (user) {
                 let dadosUsuarioCadastrado = {
                     uid: user.uid,
                     nome: user.nome,
                     email: user.email,
                     avataUrl: user.avatarUrl,
                     isAtive: user.isAtive,
                     token: user.token
 
                 }
                 setUser()
             }
         })
     }) */
    return (
        <AuthContext.Provider value={{
            createNewAccount,
            signed: !!user,
            signIn,
            loadingAuth,
            signOut,
            user,
            editProfile
        }}>
            {children}
        </AuthContext.Provider>
    )
}
