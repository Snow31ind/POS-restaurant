// import React from 'react'
// import { Route } from 'react-router'
// import { Navigate } from 'react-router-dom'
// import { useAuth } from '../contexts/AuthContext'
// function PrivateRoute({element: Element, ...rest}) {
//     const { currentUser } = useAuth() 

//     return (
//         <Route
//             {...rest}
//             element = { props => {
//                 currentUser ? <Element {...props}/> : <Navigate to='/login'/>
//             }}
//         />
//     )
// }

// export default PrivateRoute

import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({children}) {
    const { currentUser } = useAuth()
    return currentUser ? children : <Navigate to='/login'/>
}

export default PrivateRoute

