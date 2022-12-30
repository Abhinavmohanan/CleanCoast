import { onAuthStateChanged } from 'firebase/auth';
import React ,{useState,createContext, useEffect} from 'react'
import { auth } from '../firebaseConfig';

export const AuthUserContext = createContext();

export const AuthUserProvider = (props) => {
  const [AuthUser,setAuthUser] = useState(null);
   
  useEffect(()=>{
        const authstate = onAuthStateChanged(auth,user=>{
            if(user){
             setAuthUser(user)
            }
            else{
                setAuthUser(null)
            }
        })

        return ()=>{
            authstate()
        }
    },[])

  return (
    <AuthUserContext.Provider value={[AuthUser]}>
      {props.children}
    </AuthUserContext.Provider>
  )
}