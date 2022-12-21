import { useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/general/PageHeader'
import DeleteButton from '../../components/general/DeleteButton'

const Profile = () => {
    const [user] = useContext(UserContext)

    return (
        <div>
            <PageHeader />
            <div className='container p-3'>
                <h2>Profile</h2>
                <div className='ml-3 my-3 bg-light rounded p-3'>
                    <h4>First Name: {user.firstName}</h4>
                    <h4>Last Name: {user.lastName}</h4>
                    <h4>Email: {user.email}</h4>
                    <h4>Date Joined: {user.createdAt}</h4>
                </div>
                <button className='btn btn-secondary btn'>
                    <Link to={`/users/${user._id}/edit`}>Edit</Link>
                </button>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <DeleteButton id={user._id}/>
            </div>
        </div>
    )
}
export default Profile