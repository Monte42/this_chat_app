import React from 'react'

const Message = ({message,style}) => {
    return (
        <div className={style}>
            <h6>{message.from}</h6>
            <p>{message.message}</p>
        </div>
    )
}

export default Message