import Button from '@restart/ui/esm/Button'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
function DashBoard() {
    const { logout } = useAuth()
    const [error, setError] = useState()

    const navigation = useNavigate()

    const handleLogout = async () => {
        try {
            console.log('Log out');
            await logout()
            navigation('/signup')
        } catch {
            setError('Error in logging out')
        }
    }


    return (
        <div>
            <div className='w-100 text-center mt-2' style={{backgroundColor: 'blue'}}>
                <Button variant='link' onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </div>
    )
}

export default DashBoard
