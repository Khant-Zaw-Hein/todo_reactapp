import React, { useState } from 'react';
import { TextField, Button, Container, Stack, Box } from '@mui/material';
import { Link } from "react-router-dom";
import { registerUser, registerTest } from '../../api/registerAPI';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { GetUserAccountByUsernameAndPassword } from '../../api/loginAPI';

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [dateOfBirth, setDateOfBirth] = useState('')
    const navigate = useNavigate();

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        console.log(username, firstName, lastName, email, password)
        const responseCode = await registerUser(username, firstName, lastName, email, password);
        try{
            if(responseCode === 201){
            console.log("Registration success");
            const UserAccount = await GetUserAccountByUsernameAndPassword(username, password);
            const { UserAccountId, Username } = UserAccount;
            localStorage.setItem("CurrentUserId", UserAccountId);
            localStorage.setItem("CurrentUsername", Username);
            localStorage.setItem("authenticated", true);
            console.log("localstorage", localStorage);
            navigate("/todo", { replace: true });
            } else {
                localStorage.setItem("authenticated", false);
                console.log("failed to login and redirecting back to registration page");
                navigate("/register", {replace: true});
            }
        }catch (error) {
            console.log("failed to register");
            console.log(responseCode.error)
            throw new Error("An error occurred during register");
        }

    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ minWidth: '30%', maxWidth: '80%', height: '50%' }}>
                    <h2>Register Form</h2>
                    <Box component="form" onSubmit={handleRegisterSubmit}  >
                        <TextField
                            type="text"
                            variant='outlined'
                            color='primary'
                            label="Username"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                label="First Name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='primary'
                                label="Last Name"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                fullWidth
                                required
                            />
                        </Stack>
                        <TextField
                            type="email"
                            variant='outlined'
                            color='primary'
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                        />
                        <TextField
                            type="password"
                            variant='outlined'
                            color='primary'
                            label="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required
                            fullWidth
                            sx={{ mb: 4 }}
                        />
                        {/* <TextField
                    type="date"
                    variant='outlined'
                    color='primary'
                    label="Date of Birth"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                /> */}
                        <Button variant="outlined" color="primary" type="submit">Register</Button>
                    </Box>
                    <small>Already have an account? <Link to="/login">Login Here</Link></small>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default RegisterForm;