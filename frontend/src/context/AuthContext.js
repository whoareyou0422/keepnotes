import { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
export default AuthContext


export const AuthProvider = ({children}) => {
    let history = useNavigate()

    let [authToken, setAuthToken] = useState(() =>
        localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem("authToken")):null
        )
        
    let [user, setUser] = useState(()=>    
        localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem("authToken")):null
    )

    let [loading, setLoading] = useState(true)

    let loginUser = async (e)=>{
        e.preventDefault();
        let response = await fetch("http://localhost:8000/api/token/",{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            history('/')
        }else{
            alert("Invalid Information, please try again with correct data")
        }
    }

    let logoutUser = async()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        history('/login')
    }

    let updateToken = async()=>{
        if (!authToken) return 
        let response = await fetch("http://localhost:8000/api/token/refresh/",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authToken?.refresh})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        }else{
            logoutUser()
        }
        if(loading){
            setLoading(false)
        }

    }

    useEffect(()=>{
        const min = 1000 * 60 * 28
        if(loading){
            updateToken()
        }
        let interval = setInterval(()=>{
            if(authToken){
                updateToken()
            }
        }, min)
        return ()=>clearInterval(interval)
    }, [authToken, loading])

    let registerUser = async (e) =>{
        e.preventDefault();
        let response = await fetch("http://localhost:8000/api/register/", {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': e.target.email.value,
                'username': e.target.username.value,
                'password': e.target.password.value,
                'password2': e.target.password2.value
            })
        })
        if(response.status === 201){
            history('/login')
        }else{
            alert("invalid information")
        }

    }

    let contextData = {
        user:user,
        loginUser: loginUser,
        authToken:authToken,
        logoutUser:logoutUser,
        registerUser:registerUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}