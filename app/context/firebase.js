"use client";
import { createContext } from "react";

export const FirebaseContext = createContext(null);
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, doc, getDoc, updateDoc, query, where } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APIID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const firebaseAuth = getAuth(app);


export const FirebaseProvider = (props) => {

    const addAllotment = async (
        userId,
        bed,
        startDate,
        endDate,
        deposit,
        depositMethod) => {
        try {
            const result = await addDoc(collection(firestore, "allotment"), {
                userId,
                bed,
                startDate,
                endDate,
                deposit,
                depositMethod
            });
            return result;
        } catch (error) {
            console.error("Error adding allotment:", error);
            throw error; // Rethrow the error to handle it in the submitHandler
        }

    }

    const addExpences = async (
        ebill,
        wbill,
        tax,
        emi,
        salary,

        maintance,
        laundry,
        miscellaneous,
        remark) => {


        try {
            const result = await addDoc(collection(firestore, "expences"), {
                ebill,
                wbill,
                tax,
                emi,
                salary,

                maintance,
                laundry,
                miscellaneous,
                remark
            })
            return result;
        } catch (error) {
            throw new Error("Expence is not added");
        }

    }

    const viewAllAllotment = async () => {
        try {
            const collectionRef = collection(firestore, "allotment");
            const snapShot = await getDocs(collectionRef);
            const data = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            return data;
        } catch (error) {
            throw new Error("Error in fetching allotments");
        }

    }

    const updateAllotment = async (id, newdata) => {
        console.log(id, "This is updateAllotment id");
        try {
            const docRef = doc(firestore, "allotment", id);
            await updateDoc(docRef, newdata);
            const updatedData = await getDoc(docRef);
            return updatedData.data();
        } catch (error) {
            throw new Error('Error in fetching the document');

        }
    }

    const getAllRentDetails = async () => {
        try {
            const collectionRef = collection(firestore, 'rentDetails');
            const result = await getDocs(collectionRef);
            const dataa = result.docs.map((d) => ({
                id: d.id,
                ...d.data()
            }));
            return dataa;
        } catch (error) {
            console.log(error.message);
            throw new Error("Not getting expences");
        }
    };

    const addBooking = async (
        name,
        age,
        pcontact,
        econtact,
        hno,
        locality,
        city,
        state,
        email,
        dtype,
        dno) => {
        try {

            const data = await addDoc(collection(firestore, "booking"), {
                name,
                age,
                pcontact,
                econtact,
                hno,
                locality,
                city,
                state,
                email,
                dtype,
                dno
            });
            return data;
        } catch (error) {
            throw new Error("Error in booking");
        }
    }

    const getBookingDoc = async (id) => {
        try {
            const docRef = doc(firestore, "booking", id);
            const result = await getDoc(docRef);
            if (result.exists()) {
                return result.data();
            } else {
                throw new Error('Booking doc does not exists');
            }

        } catch (error) {
            throw new Error("Error in get booking doc");
        }
    }

    const getAllotment = async (id) => {

        try {

            const docref = doc(firestore, "allotment", id);
            const result = await getDoc(docref);

            if (result.exists()) {
                return result.data();
            } else {
                throw new Error("Error")
            }
        } catch (error) {
            throw new Error("Error in getting allotment");
        }
    }
    const getAllotmentByQuery = async (id) => {

        try {

            const collectionRef = collection(firestore, "allotment");
            const q = query(collectionRef, where("userId", "==", id));
            const result = await getDocs(q);
            const singleData = result.docs[0].data();
            console.log(singleData, "ikjhjhjb")
            return singleData;
        } catch (error) {
            throw new Error("Error in getting allotment");
        }
    }

    const addRentDetails = async (name,
        sid,
        bed,
        advancedeposit,
        startdate,
        duedate,
        mrate,
        miscellaneous,
        remark,
        bookingAmount) => {
        try {
            const data = await addDoc(collection(firestore, "rentDetails"), {
                name,
                sid,
                bed,
                advancedeposit,
                startdate,
                duedate,
                mrate,
                miscellaneous,
                remark,
                bookingAmount
            })
            return data;
        } catch (error) {
            throw new Error("Error in adding rent details");

        }
    }

    const updateRentModel = async (id, data) => {

        try {
            const docRef = doc(firestore, "rentDetails", id);
            await updateDoc(docRef, data);
            const updatedData = await getDoc(docRef);
            if (updatedData.exists()) {
                return updatedData.data();
            } else {
                throw new Error("Error in updateData");
            }
        } catch (error) {
            throw new Error("Error in updating the rent document");
        }
    }

    const addCloseStudents = async (data) => {
        try {
            const result = await addDoc(collection(firestore, "closedStudents"), { data });
            return result.data();
        } catch (error) {
            throw new Error("Error in adding closed student");
        }
    }

    const getAllotmentById = async (id) => {

        try {
            const docRef = doc(firestore, "allotment", id);
            const result = await getDoc(docRef);

            if (result.exists()) {
                return result.data();
            } else {
                throw new Error("Error hai");
            }
        } catch (error) {
            throw new Error("Error in fetching rentDetails doc");
        }
    }

    const getRentDetailsByQuery = async (id) => {

        try {

            const collectionRef = collection(firestore, "rentDetails");
            const q = query(collectionRef, where("sid", "==", id));
            const result = await getDocs(q);
            const singleData = result.docs[0].data();

            return singleData;
        } catch (error) {
            throw new Error("Error in getting allotment");
        }
    }

    // const getAllClosedStudents = async () => {
    //     try {
    //         const collectionRef = collection(firestore, "closedStudents");
    //         const result = await getDocs(collectionRef);
    //         const dataa = result.docs.map((d) => ({
    //             id: d.id,
    //             ...d.data()
    //         }));
    //         return dataa;

    //     } catch (error) {
    //         throw new Error("Error in getting all close students");

    //     }
    // }
    const UserWithEmailAndPassword = async (email, password) => {
        return await createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const signInUser = async (email, password) => {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const getCurrentLoginUserInfo = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                unsubscribe();
                user ? resolve(user) : reject(new Error("No current login user"));
            }, reject);
        });
    };


    const signoutuser = async () => {
        try {
            await signOut(firebaseAuth);
        } catch (error) {
            throw new Error("Error in signout");
        }
    }
    return (
        <FirebaseContext.Provider
            value={{
                addAllotment,
                UserWithEmailAndPassword,
                addExpences,
                viewAllAllotment,
                updateAllotment,
                getAllRentDetails,
                addBooking,
                addRentDetails,
                getBookingDoc,
                getAllotment,
                getAllotmentByQuery,
                updateRentModel,
                addCloseStudents,
                getAllotmentById,
                signInUser,
                getCurrentLoginUserInfo,
                signoutuser,
                getRentDetailsByQuery

            }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
