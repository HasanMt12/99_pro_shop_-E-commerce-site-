import { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from 'firebase/auth'
import app from '../firebase/firebase.config.js'
import axios from 'axios';

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);

//1. user registration //
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

//2. user login //
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth , email , password)
    }
//state observer
	// useEffect(()=>{
	// 	const unsubscribe =onAuthStateChanged(auth,currentUser=>{
	// 		setUser(currentUser)
	// 		//token set and get
	// 		if(currentUser){
	// 		axios.post('https://99-pro-server.vercel.app/jwt',{email:currentUser.email})
	// 		.then(data=>{
	// 			localStorage.setItem('access-token',data.data.token)
	// 		})
	// 		}else{
	// 			localStorage.removeItem('access-token')
	// 		}
	// 		//loading state
	// 		setLoading(false)
	// 	})
	// 	return ()=>{
	// 		return unsubscribe
	// 	}
	// },[])
//3. user State observer //
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            // console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return ()=> unsubscribe();
    } , [])

//4. user log out //
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    
//5. update user's profile //
    const updateUser = (userInfo) =>{
        // return updateProfile(user, userInfo);
         return updateProfile(auth.currentUser, userInfo);
    }

//6.  Google Signin //
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    
const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

// context value 
    const authInfo = {
        signUp,
        signIn,
        user,
        logOut,
        updateUser,
        loading,
        signInWithGoogle,
        updateUserProfile
        
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;