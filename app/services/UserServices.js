import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const userRef = firestore.collection('user')

export const loginUser = async (email, password) => {
    const snapshot = await userRef.where('email', '==', email).where('password', '==', password).get();
    if (snapshot.empty) {
        return false;
    }

    let res = {}
    snapshot.forEach(doc => {
        res = doc.data()
        res.id = doc.id
    });

    return res
}

export const getAllUsers = async () => {
    const snapshot = await userRef.where('role', '==', "user").get();
    if (snapshot.empty) {
        return false;
    }

    let res = []
    snapshot.forEach(doc => {
        let tempRes = doc.data()
        tempRes.docId = doc.id
        res.push(tempRes)
    });

    return res;
}

export const getUserRef = () => {
    return userRef;
}

export const removeUser = async (id) => {
    try {
        await userRef.doc(id).delete();
        return true;
    } catch (error) {
        return false;
    }
};


export const AddUser = async (body) => {
    const snapshot = await userRef.where('email', '==', body.email).get();
    if (!snapshot.empty) {
        return false;
    }

    await userRef.add(body);
    return true;
}
