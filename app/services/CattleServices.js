import firebase from "firebase"
import "firebase/firestore"
import uuid from "uuid";

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();

const cattleRef = firestore.collection('cattle')

export const PostCattle = async (body, uri) => {
    let imgUri = await uploadImage(uri)

    let body2 = { ...body };
    body2.imgUri = imgUri;
    await cattleRef.add(body2);
    return true;
}

export const getCattleRef = () => {
    return cattleRef;
}

export const getCattleById = async (userId) => {
    const snapshot = await cattleRef.where('userId', '==', userId).get();
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

export const getCattleByFarm = async (userId, farmId) => {
    const snapshot = await cattleRef.where('userId', '==', userId).where("farmId", "==", farmId).get();
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

export const removeCattle = async (id) => {
    try {
        await cattleRef.doc(id).delete();
        return true;
    } catch (error) {
        return false;
    }
};


const uploadImage = async (uri) => {
    try {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase.storage().ref().child(uuid.v4());
        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();
        return await snapshot.ref.getDownloadURL()
    } catch (error) {
        console.log("upload image error: ", error)
    }
}