import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { SERVER_URL } from "../constant";
/**
 * 로그인 컴포넌트
 * @param {*} param0 
 * @returns 
 */
export default function Login({ setSnackbarOpen, setSnackbarMessage, onLogin }) {
  // 로그인 다이얼로그 오픈/내림을 결정하는 상태 변수
  const [open, setOpen] = useState(false);
  // 사용자 정보 저장용 상태 변수
  const [loginUser, setLoginUser] = useState({
    id: '',
    password: ''
  });

  // 로그인 다이얼로그 오픈
  const handleOpen = () => {
    setOpen(true);
  };
  
  // 로그인 다이얼로그 내림
  const handleClose = () => {
    setOpen(false);
  };

  // 로그인 처리(Api Server에 요청)
  const handleLogin = () => {
    fetch(SERVER_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 사용자 정보를 json 타입으로 변환해서 body에 넣어서 보냄.
      body: JSON.stringify(loginUser), 
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('일치하는 사용자가 없습니다');
        } else {
          throw new Error(response.status + ' ' + response.statusText);
        }
      })
      .then(data => {
        if (data.id) { // 사용자 정보가 있을경우 즉, 로그인 성공
          setOpen(false);
          onLogin(data); // App component의 onLogin함수 호출
          setSnackbarMessage(`${data.name}님 환영합니다`);
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage(data);
          setSnackbarOpen(true);
        }
      })
      .catch(err => {
        setSnackbarMessage(err.message);
        setSnackbarOpen(true);
        console.error(err);
      });
  };

  return (
    <>
      {/* 로그인 텍스트 */}
      <Button color="inherit" onClick={handleOpen}>Login</Button>
      {/* 로그인 다이얼로그 
        onClose={handleClose} : 대화상자가 닫힐때 호출되는 함수 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            value={loginUser.id}
            onChange={(e) => setLoginUser({ ...loginUser, id: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Password"
            value={loginUser.password}
            onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
            type="password"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}