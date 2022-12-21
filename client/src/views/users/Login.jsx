import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const Login = () => {
    const [user,setUser] = useContext(UserContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/login", {
            email,
            password
        },{withCredentials:true})
        .then(res => {
            setUser(res.data.user)
            navigate('/users')
        })
        .catch(err => {
            setErrors(err.response.data)
        })
}

    return (
        <div className='auth-pages'>
            <h1>This Chat App</h1>
            <div>
                <h3>Log In</h3>
                <form onSubmit={e => submitHandler(e)}>
                    {errors && <p className='error'>{errors.error}</p>}
                    <p>
                        <label className="form-lable"> Email:
                            <input className="form-control" type="text" onChange={e => setEmail(e.target.value)}/>
                        </label>
                    </p>
                    <p>
                        <label className="form-lable"> Password:
                            <input className="form-control" type="password" onChange={e => setPassword(e.target.value)}/>
                        </label>
                    </p>
                    <input type="submit" value="Login" />
                </form>
                <Link to={"/register"}>Not a member?</Link>
            </div>
        </div>
    )
}

export default Login