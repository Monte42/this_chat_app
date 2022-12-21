import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"

const PageHeader = () => {
    const [user] = useContext(UserContext)

    return (
        <div>
            <div className="navbar navbar-expand-lg">
                <div className="banner container-fluid">
                    <h1>This Chat App</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                <Link className="nav-item" to={"/users"}>All Users</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                <Link className="nav-item" to={"/chat_lobby"}>Chat Lobby</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-link">
                                <Link className="nav-item" to={`/users/${user._id}`}>My Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader