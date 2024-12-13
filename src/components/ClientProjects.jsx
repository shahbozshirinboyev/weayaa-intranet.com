import React, { useEffect } from 'react'

function ClientProjects({ clientId, setCount, setClientId }) {
    useEffect(() => {
        if (clientId) { console.log(clientId); setClientId("") }
    }, [clientId])
    return (
        <></>
    )
}

export default ClientProjects