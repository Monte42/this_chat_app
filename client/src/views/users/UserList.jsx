import axios from 'axios'
import { useState,useContext,useEffect } from 'react'
import { UserContext } from '../../App'
import { Link,useNavigate } from 'react-router-dom'
import PageHeader from '../../components/general/PageHeader'

const Home = () => {
    const [users,setUsers] = useState([])
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    const logOut = () => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
        .then(() => localStorage.removeItem("user"))
        .then(() => navigate("/login"))
        .catch(e=> console.log(e))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/users", {withCredentials: true})
            .then(res => setUsers(res.data))
            .catch(e => console.log(e))
    },[])
    return (
        <div>
            <PageHeader />
            <div className='container'>
                <div style={{display:"flex", gap:"10vw"}}>
                    <h1>All Users</h1>
                    <button onClick={e =>logOut()} className="btn btn-danger">Logout</button>
                </div>
                <table className='table table-dark table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u,i) => {
                                const a = [u._id, user._id].sort()
                                if (user._id !== u._id) {
                                    return (
                                        <tr key={i}>
                                            <td>{u.firstName}</td>
                                            <td>{u.lastName}</td>
                                            <td>
                                                <Link to={`/chat/${a[0]}_${a[1]}`}>Chat</Link> 
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home