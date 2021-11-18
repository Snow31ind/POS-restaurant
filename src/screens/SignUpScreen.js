import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { InputGroup } from 'react-bootstrap'
import { MdEmail, MdOutlineEmail } from 'react-icons/md'
import { AiOutlineLock } from 'react-icons/ai'
export default function SignUpScreen() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { signup } = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            console.log(emailRef.current.value, passwordConfirmRef.current.value);
            await signup(emailRef.current.value, passwordRef.current.value)
            navigation('/')
        } catch (e) {
            setError('Failed to create an account')
        }

        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center mb-4'>Sign Up</Card.Title>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-2' id='email'>
                            <Form.Label>Your email</Form.Label>
                            <InputGroup >
                                <InputGroup.Text style={{borderWidth: '0 0px 3px 0px', borderRadius: 0, backgroundColor: 'white'}}>
                                    <MdOutlineEmail size={24}/>
                                </InputGroup.Text>
                                <Form.Control style={{borderWidth: '0 0px 3px 0px', borderRadius: 0}} type='email' ref={emailRef} required/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mt-2' id='password'>
                            <Form.Label>Your password</Form.Label>
                            <InputGroup >
                                <InputGroup.Text style={{borderWidth: '0 0px 3px 0px', borderRadius: 0, backgroundColor: 'white'}}>
                                    <AiOutlineLock size={24} />
                                </InputGroup.Text>
                                <Form.Control style={{borderWidth: '0 0px 3px 0px', borderRadius: 0}} type='password' ref={passwordRef} required/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mt-2'id='password-confirm'>
                            <Form.Label>Password confirm</Form.Label>
                            <InputGroup >
                                <InputGroup.Text style={{borderWidth: '0 0px 3px 0px', borderRadius: 0, backgroundColor: 'white'}}>
                                    <AiOutlineLock size={24} />
                                </InputGroup.Text>
                                <Form.Control style={{borderWidth: '0 0px 3px 0px', borderRadius: 0}} type='password' ref={passwordConfirmRef} required/>
                            </InputGroup>
                        </Form.Group>

                        <Button disabled={loading} className='w-100 mt-2' type='submit'>Sign Up</Button>
                    </Form>

                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Log in</Link>
            </div>
        </>
    )
}

