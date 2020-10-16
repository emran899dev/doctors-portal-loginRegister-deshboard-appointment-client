import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig/firebaseConfig';


const Register = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: '',
        error: '',
        
    });

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const [validConfirmPassword, setvalidConfirmPassword] = useState('');


    // User createUserWithEmailAndPassword
    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if(user.confirmPassword !== user.password){
            setvalidConfirmPassword('Password is not matched');
            
        } else {
            if(user.email && user.password){
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    verifyEmail();
                    setUser(newUserInfo);
                })
                .catch(error => {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ...
                });
            }
            
        }
        e.preventDefault();
    }

    // User Email Verify  
    const verifyEmail = () => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            const validEmail = /\S+@\S+\.\S+/;
            isFieldValid = validEmail.test(e.target.value);
        }
        if (e.target.name === 'password') {
            let password = e.target.value;
            const isPasswordValid = password.length > 6;
            const passwordHasNumber = /\d{1}/.test(password);
            isFieldValid = isPasswordValid && passwordHasNumber;

        }
        if (e.target.name === 'confirmPassword') {
            let confirmPassword = e.target.value;
            const isPasswordValid = confirmPassword.length > 6;
            const passwordHasNumber = /\d{1}/.test(confirmPassword);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }

    }
    return (
        <div style={{marginTop: '-130px'}}>
            <div className="col-md-4 m-auto">
                <Card style={{ width: '100%', padding: '4%', marginTop: '150px' }}>
                    <Card.Body>
                        <Card.Title>Create an account</Card.Title>
                        <Form onSubmit={handleSubmit} className="mt-5">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="text" name="firstname" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="First name" required />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control type="text" name="lastname" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="Last name" required />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control type="email" name="email" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="Your E-mail" required />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control type="password" name="password" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="New Password" required />
                            </Form.Group>
                            <Form.Group className="mt-4" controlId="formBasicPassword">
                                <Form.Control type="password" name="confirmPassword" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} placeholder="Confirm New Password" required />
                            </Form.Group>
                            <Button className="mt-4 rounded-0" style={{ width: '100%', backgroundColor: '#F9A51A', color: 'black' }} type="submit">
                                Create an Account
                            </Button>


                            <Form.Text className="text-center mt-3" style={{ fontSize: '17px' }}>
                                Already have account?<Link to="/login" style={{ color: '#F9A51A' }}>Login</Link>
                                
                                <p style={{ color: 'red' }}>{user.error}</p>
                                {
                                    user.success && <p style={{ color: 'green' }}>User Account Created Successfully </p>
                                }
                                {
                                    <p style={{ color: 'red' }}>{validConfirmPassword}</p>
                                }
                            </Form.Text>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
};

export default Register;