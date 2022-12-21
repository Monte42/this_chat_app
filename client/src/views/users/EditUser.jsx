import { useEffect,useState } from "react"
import { useNavigate,useParams,Link } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../../App"


const EditUser = () => {
    const [user, setUser] = useContext(UserContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [errors,setErrors] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`,{withCredentials: true})
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
            })
    },[])

    const submitHandler = (e) => {
        e.preventDefault()
        const updatedUser = {
            _id: id,
            firstName,
            lastName,
            email,
            password: user.password,
            createdAt: user.createdAt
        }
        axios.put(`http://localhost:8000/api/users/${id}`, updatedUser, {withCredentials: true})
            .then(()=>{
                setUser(updatedUser)
                navigate('/users')
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }
    return (
        <div className="auth-pages">
            <h1>EditUser</h1>
            <div>
                <form onSubmit={e=>submitHandler(e)}>
                    <p>
                        <label className="form-lable">First Name:
                            <input className="form-control" type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} />
                        </label>
                    </p>
                    {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                    <p>
                        <label className="form-lable">Last Name:
                            <input className="form-control" type="text" value={lastName} onChange={e=>setLastName(e.target.value)} />
                        </label>
                    </p>
                    {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                    <p>
                        <label className="form-lable">Email:
                            <input className="form-control" type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                        </label>
                    </p>
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <input type="submit" value="Update" />
                </form>
                
                <Link to={"/users"}>Cancel Changes</Link>
            </div>
        </div>
    )
}

export default EditUser