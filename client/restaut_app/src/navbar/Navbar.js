import React, { Fragment } from 'react'
import { Link , withRouter} from 'react-router-dom'
import 'toastr/build/toastr.min.css'
import { useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { isAuthenticated } from '../user/userToken';
import { useHistory } from 'react-router';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const  Navbar = () => {
   const history = useHistory()
   const count =useSelector(state => state.cart.count)
  //  signout
   const signout = () => {
    fetch("http://localhost:2000/api/auth/signout")
         .then(() => {
            history.push('/signin')
            localStorage.removeItem('JWT_INFO')
            localStorage.removeItem('cart')
         })
  }



  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
      
    return (
        <div>
        <Box sx={{ display:'flex', flexDirection:'row',justifyContent:'flex-start' }} style={{cursor:'pointer'}}>
        <AppBar position="fixed">
        <Toolbar>
           {isAuthenticated() && (
               <Typography   variant="h6" component="div" sx={{flexGrow:0}}>
                <Link to={`${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin': ''}/dashbord`} className="nav-link text-white">
                   Dashbord 
                </Link> 
               </Typography>
           )}
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{cursor:'pointer'}}>
                <Link to="/" className="nav-link text-white">
                  Acceuil
                </Link> 
               </Typography>
              <Typography variant="h6" component="div" sx={{flexGrow:0.1}} style={{cursor:'pointer'}}>
                <Link to="/cart" className="nav-link text-white">
                  Panier  <IconButton aria-label="cart">
                      <StyledBadge badgeContent={count} color="secondary">
                         <ShoppingCartIcon />
                      </StyledBadge>
                        </IconButton>
                </Link> 
            </Typography>
           {!isAuthenticated() && (
             <Fragment>
                <Button color="inherit" style={{cursor:'pointer'}}>
                <Link to="/signin" className="nav-link text-white"> Signin</Link>
                </Button>
                <Button color="inherit" style={{cursor:'pointer'}}>
                <Link to="/signup" className="nav-link text-white"> Signup</Link>
                </Button>
            </Fragment>
           )}
           {isAuthenticated() && (
                <Button onClick={signout} color="inherit" style={{cursor:'pointer'}}>
                  Signout
                </Button>
           )}
        </Toolbar>
      </AppBar>
    </Box>
        </div>
    )
}

export default  withRouter(Navbar)
