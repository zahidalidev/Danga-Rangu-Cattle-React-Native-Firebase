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
