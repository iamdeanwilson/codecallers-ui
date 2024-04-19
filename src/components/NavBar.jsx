import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider, IconButton, MenuItem, Menu, Stack  } from '@mui/material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Switch, FormControlLabel, FormGroup, Avatar  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from './AuthProvider';
import LightDark from './LightDark';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const doLogout = () => {
  const logoutAuth = useAuth();
  logoutAuth.logOut();
};

export default function NavBar() {
  
  let user = {};
  let profilePic;
  const [users, setUsers] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem('site')
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(token){
    fetch('http://localhost:8080/user/index', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },})
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
    }
  }, []);
  
  
  for ( let i = 0; i < users.length; i++ ){
    if(users[i].username === localStorage.getItem('username')){
      user = users[i];
    }
  };
  
  
  if (!user.profilePic === '' | user.profilePic === null ){
    profilePic = ""
  } else if (localStorage.getItem('profilePic')){
    profilePic = localStorage.getItem('profilePic')
    console.log(profilePic)
  } else { profilePic = user.profilePic}



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={event => window.location.href = '/'} color="inherit">Home</Button>
          <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Change Theme
          </Typography >
          <div style={{margin : '5px'}}>
            <LightDark />
          </div>
          {!localStorage.getItem('site') && <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Login ➜
          </Typography>}
          {localStorage.getItem('site') && <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {localStorage.getItem('username')}!
          </Typography>}
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {!localStorage.getItem('site') &&  <Avatar alt="Not Signed In" src="" />}
                {localStorage.getItem('site') &&  <Avatar alt={localStorage.getItem('username')} src={profilePic} />}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!localStorage.getItem('site') && <MenuItem onClick={event =>  window.location.href='/create'}>Create Account</MenuItem>}
                {!localStorage.getItem('site') && <MenuItem onClick={event =>  window.location.href='/login'}>Login</MenuItem>}
                {localStorage.getItem('site') && <MenuItem onClick={event => window.location.href=`/myaccount/${localStorage.getItem('username')}`}>My Account</MenuItem>}
                {localStorage.getItem('site') && <MenuItem onClick={event => window.location.href='/logout'}>Logout</MenuItem>}
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Quizzes', 'Leaderboard', 'Contact', 'Invite', 'About'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={event => window.location.href = `/${text}`}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}