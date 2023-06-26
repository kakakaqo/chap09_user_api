import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

/**
 * 사용자 등록폼
 * @param {*} props 
 * @returns 
 */
export default function AddUser(props){

    // 다이얼로그 오픈 상태
    const [open, setOpen] = useState(false);
    // 사용자 등록 상태
    const [user, setUser] = useState({
        id: '',
        name: '',
        age: '', 
        phone: '',  
        address: ''
      });

    // 입력 다이얼로그 띄움
    const handleClickOpen = () => {
        setOpen(true); // 상태 변경시켜서 다이얼로그 오픈
    };
    
    // 입력 다이얼로그 내림
    const close = () => {
        setOpen(false); // 상태 변경시켜서 다이얼로그 내림
    };

    // 사용자 저장 그리고 다이얼로그 내림
    const save = () => {
        // 부모에게서 전달받은 사용자등록 함수 호출(추가될 사용자)
        props.addUser(user); // 사용자 등록
        close(); // 팝업창 내림
    }   

    // 사용자 정보 입력값 변경시 매번 호출되면서
    // 사용자 상태의 정보 갱신
    const userOnChange = (event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }

    return(
        <div>
          <Button variant='contained' onClick={handleClickOpen} style={{marginTop: '5px'}}>
            New User
          </Button>
          <Dialog open={open} onClose={close}>
            <DialogTitle>New User</DialogTitle>
            <DialogContent>
              <input placeholder="Id" name="id" 
                value={user.id} onChange={userOnChange}/><br/> 
              <input placeholder="Name" name="name" 
                value={user.name} onChange={userOnChange}/><br/>
              <input placeholder="Age" name="age" 
                value={user.age} onChange={userOnChange}/><br/>
              <input placeholder="Phone" name="phone" 
                 value={user.phone} onChange={userOnChange}/><br/>
              <input placeholder="Address" name="address" 
                 value={user.address} onChange={userOnChange}/><br/>
            </DialogContent>
            <DialogActions>
               <button onClick={close}>취소</button>
               <button onClick={save}>저장</button>
            </DialogActions>
          </Dialog>            
        </div>
      ); 
}