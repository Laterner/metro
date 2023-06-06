import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Menu from './menu.svg'
import Menu2 from './menu2.svg'
import { grey } from '@mui/material/colors';
import UsersList from './UsersList';
import RequestsList from './RequestsList';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [currentPage, setCurrentPage] = React.useState(< UsersList />)
  const [currentPageName, setCurrentPageName] = React.useState('Список пользователей')

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '0',
                ...(open && { display: 'none' }),
              }}
            >
                <img src={Menu}/>
            </IconButton> */}
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {currentPageName}
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            Панель управления
            {/* <IconButton onClick={toggleDrawer}>
            <img src={Menu2} />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItem sx={{
              cursor: 'pointer'
            }}
            onClick={() => {
              setCurrentPage(<UsersList />)
              setCurrentPageName('Список пользователей')
            }}>
                Список пользователей
              </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem sx={{
              cursor: 'pointer'
            }}
            onClick={() => {
              setCurrentPage(<RequestsList />)
              setCurrentPageName('Список заявок')
            }}>
              Список заявок
              </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: '#f5f5f5',
            flexGrow: 1,
            height: '100vh',
            width:`calc(100vw - ${drawerWidth}px)`,
            overflow: '0 auto',
          }}
        >
          <Toolbar />
          <Container sx={{ m: 'auto', p:0 }}>
            {currentPage}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}