import {  createContext, useEffect, useState } from "react";
import {sendEmailVerification, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import  app from "../firebase/firebase.config.js";
import { toast } from "react-hot-toast";
import axios from "axios";
export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    //create a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signIn/login with email and password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //signIn/login with Google
    const signInWithGoogle = () =>{
        setLoading(true);
            return signInWithPopup(auth, googleProvider);
        }
    
    //password reset, when user forget their password
    const resetPass = (email) => {
        toast.loading('Please Wait!',{
            style: {
              color: '#00cbfe',
            },})
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
             toast.dismiss()
            toast.success('password reset mail send!please Check your email', {  style: { color: '#00cbfe', },
                iconTheme: {
                primary: '#df81a5',
                secondary: '#FFFAEE',
                },
            },{duration:3000});
        })
        .catch((error) => {
            toast.dismiss()
            toast.error(error.message,
           " please enter a valid email ",
            {duration:4000})
            // ..
        });
    }

    //user logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    //verify email after signUp
    const verifyEmail = () => {
            toast.loading('Please Wait!',{
            style: {
              color: '#00cbfe',
            },})
            sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.dismiss()
             toast.success('Please check your email and reset your password', {
            style: {
              color: '#00cbfe',
            },
                iconTheme: {
                primary: '#df81a5',
                secondary: '#FFFAEE',
                },
            },
            {duration:3000}); 
             })
            }

    // auth observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);
             setLoading(false)
            // get and set token
            if(currentUser){
                axios.post('https://99-pro-shop-server.vercel.app/jwt', {email: currentUser.email})
                .then(data =>{
                    // console.log(data.data.token)
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
            }

            
        });
        return () => {
            return unsubscribe();
        }
    }, [])
     

    const authInfo = {
        user,
        loading,
        createUser,
        verifyEmail,
        signIn,
        resetPass,
        signInWithGoogle,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;