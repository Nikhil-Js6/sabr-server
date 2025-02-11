import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AccessPage = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        let userId = localStorage.getItem("userId");

        const setUserId = async () => {
            if (!userId) {
                const count = await countUsers();

                if (count === 0) {
                    userId = `AMG_${randomString()}_315`;
                }
                else if (count === 1) {
                    userId = `Sabr_${randomString()}_315`;
                }
                else {
                    userId = `NewUser_${randomString()}_315`;
                }

                localStorage.setItem("userId", userId);
            }
            checkAccess(userId);
        };

        setUserId();
    }, [navigate]);

    const checkAccess = async (userId) => {
        console.log(`${process.env.REACT_APP_API}`);
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/access`, { userId });
            if (res.status === 403) {
                console.log(res);
                navigate("/error");
            } 
            else {
                console.log(res.data.message);
                navigate("/home");
            }
        } 
        catch (err) {
            console.log(err);
            navigate("/error");
        }
    }

    const countUsers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/count`);
            return res.data.count;
        } 
        catch (err) {
            console.log(err);
            return null;
        }
    }

    const randomString = () => {
        return Math.random().toString(36).substring(2, 18).toUpperCase();
    }

    return (
        <div>{ children }</div>
    );
}

export default AccessPage;
