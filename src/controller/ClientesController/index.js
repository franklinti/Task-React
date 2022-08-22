
//Firebase Connectionn
import { auth, db } from '../../services/firebase';
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, onSnapshot, } from 'firebase/firestore';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export async function writerClientesFirestore(user) {
    const dbInstance = collection(db, 'clientes');
    //const docRef = doc(dbInstance, user.uid) para utilizar o setDoc
    let userCreate = await addDoc(dbInstance, user);
    return userCreate;
}
const initialState = {
    entities: [],
    loading: false,
}
const dbInstance = collection(db, 'clientes');
let allClientes = [];
export const getClientes = createAsyncThunk("getClientes", async (payload, { rejectWithValue, getState, dispatch }) => {
    onSnapshot(dbInstance, (doc) => {
        /*  doc.forEach((clientes) => {
             allClientes.push({
                 id: clientes.id,
             })
             console.log(1, allClientes)
         }) */
        const data = doc.docs.map((doc) => doc.data());
        allClientes = data;
        return allClientes;
    });
    return allClientes;
});

export const clientesSlice = createSlice({
    name: 'clientes',
    initialState: { entities: [], loading: 'idle' },
    reducers: {},
    extraReducers: {
        [getClientes.pending]: (state) => {
            state.loading = true
        },
        [getClientes.fulfilled]: (state, action) => {
            state.entities = action.payload
            state.loading = false

        },
        [getClientes.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload;
        },
    },
})
export default clientesSlice.reducer;