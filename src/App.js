import logo from './logo.svg';
import './App.css';
import Carousel from 'react-elastic-carousel';
// import styles from './App.css'
import { isValidTimestamp } from '@firebase/util';
import MenuSection from './screens/MenuSection';
import { db } from './firebase/config';
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, doc, onSnapshot } from '@firebase/firestore';
import bg from './pictures/POS-background.png';
import { FaCopy } from 'react-icons/fa';
import { DataProvider } from './contexts/DataContext';
import { UserProvider } from './contexts/UserContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { MenuProvider } from './contexts/MenuContext';
import { Route, Router, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import 'react-icons/gr';
import { GrHome, GrHomeRounded } from 'react-icons/gr';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import DashBoard from './comps/DashBoard';
import PrivateRoute from './comps/PrivateRoute';

function Test() {
  const { currentUser } = useAuth()

  return (
    <>
      {currentUser ? <MenuSection/> :
      <Container fluid className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundImage: `url(${bg})`, backgroundSize: '100%'}}>
        {/* <Nav>
          <Nav.Item>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href='/signup'>Sign up</Nav.Link>
          </Nav.Item>
        </Nav> */}

        <Container
        // className='d-flex align-items-center justify-content-center'
          style={{minHeight: '90vh', backgroundColor: 'transparent'}}
        >
          <div className='w-100' style={{maxWidth: '400px'}}>
            <BrowserRouter>
            <AuthProvider>
                <Routes>
                  {/* <PrivateRoute  exact path='/' element={ <DashBoard/> } /> */}
                  <Route path='/signup' element={ <SignUpScreen/> }/>
                  <Route path='/login' element={ <LoginScreen/> }/>
                  <Route exact path='/' element={
                  <PrivateRoute>
                    <DashBoard/>
                    {/* <RunApp/> */}
                  </PrivateRoute>
                  }/>
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </div>
        </Container>
      </Container>
      }
    </>
  )
}

function RunApp() {
  return (
    <div style={{backgroundImage: `url(${bg})`, height: '50%', backgroundSize: '100%'}}>
    <AuthProvider>
      <DataProvider>
        <UserProvider>
          <MenuProvider>
            <PaymentProvider>
              <Test/>
              {/* <MenuSection /> */}
            </PaymentProvider>
          </MenuProvider>
        </UserProvider>
      </DataProvider>
    </AuthProvider>
    </div>
  )
}

function App() {

  return (
    <RunApp />
    // <Test/>
  );
}

export default App;
