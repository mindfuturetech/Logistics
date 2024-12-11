import React,{createContext, useContext, useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = createContext(null);


export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return Cookies.get('isAuthenticated') === 'true';
    });
    const [isLoading, setIsLoading] = useState(true);

    const setAuth = (value) => {
        setIsAuthenticated(value);
        if (value) {
            Cookies.set('isAuthenticated', 'true', { 
                secure: false, 
                sameSite: 'lax', 
                expires: 10 })// 10 days;
                console.log(Cookies.get('isAuthenticated'));
            }
        else {
            Cookies.remove('isAuthenticated');
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/logistics/check-auth', {
                    withCredentials: true
                    });
                if (response.status === 200) {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                setAuth(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);


return(
        <AuthContext.Provider value = {{isAuthenticated,setIsAuthenticated:setAuth, isLoading, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth =()=>{
    const context = useContext(AuthContext);;
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}