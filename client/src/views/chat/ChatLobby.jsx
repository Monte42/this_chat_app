
import PageHeader from '../../components/general/PageHeader'
import { Link } from 'react-router-dom'

const ChatLobby = () => {

    return (
        <div>
            <PageHeader />
            <div className='container mt-2'>
                <div className='container bg-light py-3'>
                    <h1>Chat Lobby</h1>
                    <h2>Which room would you like to join?</h2>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/node_js'}>Node.js</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/mongodb'}>MongoDB</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/react'}>React</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/mern'}>MERN</Link>
                        </li>
                        <li className='list-group-item list-group-item-action'>
                            <Link to={'/chat/socket_io'}>Socket.io</Link>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default ChatLobby