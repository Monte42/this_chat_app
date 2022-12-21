import {useState,useContext} from 'react'
import { UserContext } from '../../App'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'


const Register = () => {
    const [user,setUser] = useContext(UserContext)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/register", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        },{withCredentials:true})
            .then(res => {
                setUser(res.data.user)
                navigate('/users')
            })
            .catch(err => {
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className='auth-pages'>
            <h1>This Chat App</h1>
            <div>
                <h3>Register</h3>
                <form onSubmit={e => submitHandler(e)} className="mb-3">
                    <p>
                        <label className="form-lable"> First Name:
                            <input className="form-control" type="text" onChange={e => setFirstName(e.target.value)}/>
                        </label>
                    </p>
                    {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
                    <p>
                        <label className="form-lable"> Last Name:
                            <input className="form-control" type="text" onChange={e => setLastName(e.target.value)}/>
                        </label>
                    </p>
                    {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
                    <p>
                        <label className="form-lable"> Email:
                            <input className="form-control" type="text" onChange={e => setEmail(e.target.value)}/>
                        </label>
                    </p>
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <p>
                        <label className="form-lable"> Password:
                            <input className="form-control" type="password" onChange={e => setPassword(e.target.value)}/>
                        </label>
                    </p>
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                    <p>
                        <label className="form-lable"> Confirm Password:
                            <input className="form-control" type="password" onChange={e => setConfirmPassword(e.target.value)}/>
                        </label>
                    </p>
                    {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}
                    <input type="submit" value="Sign Up" />
                </form>
            
                <Link to={"/login"}>Already a member?</Link>
            </div>
        </div>
    )
}

export default Register