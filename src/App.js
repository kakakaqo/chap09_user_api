import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Snackbar } from '@mui/material';
import UserList from './component/UserList';
import Login from './component/Login';

export default function App() {
  // 처리 결과 메시지를 보여주고 내리는 역할을 하는 상태
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // 메시지 내용 변경 상태
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // 로그인한 사용자 정보 저장용 상태변수
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  // Login 컴포넌트에서 로그인에 성공한 후 호출됨.
  const handleLogin = (user) => {
    alert('handleLogin');
    console.log('handleLogin', user);
    setLoggedInUser(user); // 로그인한 사용자 정보 세팅(변경)
    setSnackbarMessage(`${user.name}님 환영합니다`);
    setSnackbarOpen(true);
  };
  // 로그아웃 함수
  const handleLogout = () => {
    setLoggedInUser(null);
    setSnackbarMessage("로그아웃 되었습니다.");
    setSnackbarOpen(true);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User List
          </Typography>
          {loggedInUser ? (
            <>
              <Typography variant="h6" style={{ marginRight: '10px' }}>
                {loggedInUser.name}님
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Login
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              onLogin={handleLogin}
            />
          )}
        </Toolbar>
      </AppBar>
      <UserList />
      {/* 메시지를 띄워주는 역할 open={true}되면 떠오름 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}