import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const farmRef = firestore.collection('farm')

export const AddFarm = async (body) => {
    const snapshot = await farmRef.where('farmName', '==', body.farmName).get();
    if (!snapshot.empty) {
        return false;
    }

    await farmRef.add(body);
    return true;
}

export const getFarmRef = () => {
    return farmRef;
}

export const getFarmById = async (userId) => {
    const snapshot = await farmRef.where('userId', '==', userId).get();
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

export const getAllFarms = async () => {
    const snapshot = await farmRef.get();
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

export const removeFarm = async (id) => {
    try {
        await farmRef.doc(id).delete();
        return true;
    } catch (error) {
        return false;
    }
};
