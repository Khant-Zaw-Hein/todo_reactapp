import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Avatar from '@mui/material/Avatar';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Login } from '../../api/loginAPI';
import { GetUserAccountByUsernameAndPassword } from '../../api/loginAPI';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

// --begin-- LoginPage
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseCode = await Login(username, password);
      if (responseCode === 200) {
        console.log("Login success");

        const UserAccount = await GetUserAccountByUsernameAndPassword(username, password);
        const { UserAccountId, Username } = UserAccount;
        localStorage.setItem("CurrentUserId", UserAccountId);
        localStorage.setItem("CurrentUsername", Username);
        localStorage.setItem("authenticated", true);
        // redirect to home page + access to protected routes
        console.log("localstorage", localStorage);
        navigate("/todo", { replace: true });

        // console.log("UserAccount: ", UserAccountId, Username);
        // console.log("localStorage: ", localStorage.getItem("CurrentUsername"));
      } else {
        localStorage.setItem("authenticated", false);
        console.log("failed to login and redirecting back to login page");
        navigate("/login");
      }
    } catch (error) {
      console.log("failed to login");
      throw new Error("An error occurred during login");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '12rem' }}>
        <CssBaseline />
        <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUsername}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


