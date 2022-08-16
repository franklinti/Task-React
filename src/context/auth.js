import { useState, createContext, useEffect } from "react";

import { getStorageValue, setStorageValue } from '../storage/storage'
//Firebase Connectionn
import { auth, db } from '../Services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, updateDoc, doc, setDoc, } from 'firebase/firestore';
import { toast } from "react-toastify";
import { storageFirebase } from "../Services/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";


export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loadingFotoPerfil, setLoadingFotoPerfil] = useState(false);
    const [loadingNomePerfil, setloadingNomePerfil] = useState(false);


    useEffect(() => {

        loadUserStorage();

    }, [])
    function loadUserStorage() {
        const userStorage = getStorageValue('taskUser');
        if (userStorage) {
            setUser(userStorage)
            setLoadingAuth(false)
        }
        setLoadingAuth(false)
    }


    async function createNewAccount(data) {
        setLoadingAuth(true);
        createUserWithEmailAndPassword(auth, data.email, data.senha).then((responseAuth) => {
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
        const docRef = doc(dbInstance, user.uid)
        setDoc(docRef, user).then(() => {

            let dadosUsuarioCadastrado = {
                uid: user.uid,
                nome: user.nome,
                email: user.email,
                avatarUrl: user.avatarUrl,
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
            toast.success('Nao foi possivel cadastrar');
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
        signInWithEmailAndPassword(auth, user.email, user.senha).then(async (responseLogin) => {
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
        // setLoadingAuth(false)
        toast.success('Acesso ao  sistema realizado com sucesso!')
    }

    async function editFotoAvatar(data) {

        const storageRef = ref(storageFirebase, `perfilImage/${user.uid}/${data.name}`);

        uploadBytes(storageRef, data).then(async (snapshot) => {
            getDownloadURL(storageRef).then(async (urlFoto) => {
                console.log(urlFoto)
                const dbInstance = collection(db, 'users');
                const dados = doc(dbInstance, user.uid);
                //update firestore
                updateDoc(dados, { avatarUrl: urlFoto }).then(() => {
                    console.log(urlFoto)
                    let dados = {
                        ...user, avatarUrl: urlFoto
                    }
                    setUser(dados);
                    setStorageValue('taskUser', JSON.stringify(dados))
                    toast.success('Foto perfil atualizado!')
                }).catch(error => console.log(error));
            }).catch(error => {
                console.log(error)
                toast.error('Foto perfil não atualizada!')
            })
        }).catch(error => console.log(error))
    }
    async function editNome(data) {

        const dbInstance = collection(db, 'users');
        const dadosFirestore = doc(dbInstance, user.uid);
        updateDoc(dadosFirestore, { nome: data.nome }).then(() => {
            let dados = {
                ...user, nome: data.nome
            }
            setUser(dados);
            setStorageValue('taskUser', JSON.stringify(dados))
            setloadingNomePerfil(false)


        }).catch(error => {
            console.log(error)
            toast.error('Nome não atualizado!');
        });
    }
    /*  useEffect(() => {
         auth.onAuthStateChanged((user) => {
             if (user) {
                 let dadosUsuarioCadastrado = {
                     uid: user.uid,
                     nome: user.nome,
                     email: user.email,
                     avatarUrl: user.avatarUrl,
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
            user,
            signed: !!user,
            signIn,
            loadingAuth,
            signOut,
            editFotoAvatar,
            editNome

        }}>
            {children}
        </AuthContext.Provider>
    )
}
