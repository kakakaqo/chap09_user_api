import {AppBar, Toolbar, Typography} from '@mui/material';
import './App.css';
import UserList from './component/UserList';

export default function App() {
  return (
    <div className="App">
     <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>
          User List
        </Typography>
      </Toolbar>
     </AppBar>
     <UserList />
    </div>
  );
}