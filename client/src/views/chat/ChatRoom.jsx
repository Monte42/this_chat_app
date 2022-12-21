import axios from "axios"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import MessageBoard from "../../components/chat/MessageBoard"
import PageHeader from "../../components/general/PageHeader"

const PrivateChat = () => {
    const {room} = useParams()
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        if (room.length>0) {
            axios.get(`http://localhost:8000/api/chat/${room}`,{withCredentials:true})
                .then(res => setMsgs(res.data))
                .catch(err => console.log(err))
        }
        },[])

    return (
        <div>
            <PageHeader />
            <div className="container pt-3">
                <h2>Chat Room</h2>
                <MessageBoard msgs={msgs} setMsgs={setMsgs} room={room} />
            </div>
        </div>
    )
}

export default PrivateChat