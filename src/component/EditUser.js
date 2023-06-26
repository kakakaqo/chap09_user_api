import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

/**
 * 사용자 수정폼
 * @param {*} props 
 * @returns 
 */
export default function EditUser(props){

    // 다이얼로그 오픈/내림 상태변수
    // 다이얼로그 오픈 상태로 true값이 세팅되면 오픈
    // false값이 세팅되면 내림
    const [open, setOpen] = useState(false);
    // 사용자 정보 저장용 상태변수
    const [user, setUser] = useState({
        id: '',
        name: '',
        age: '', 
        phone: '',  
        address: ''
      });

  // 수정 버튼 클릭시 부모에게서 받은 값으로 사용자 상태 값 채우고
  // 다이얼로그 오픈
  const clickDialongOpen = () => {
    console.log('props.data.row.id', props.data.row.id);
    console.log('props.data.row.name', props.data.row.name);

    setUser({
      id: props.data.row.id,
      name: props.data.row.name,
      age: props.data.row.age,    // 사용자 정보 상태 변경
      phone: props.data.row.phone,
      address: props.data.row.address
    })      
    setOpen(true); // 다이얼로그 오픈
  }
    
  // 수정 다이얼로그 내림
  const close = () => {
      setOpen(false); 
  };

    // 사용자 정보 입력값 변경시 매번 호출되면서
    // 사용자 상태의 정보 갱신
    const userOnChange = (event)=>{
        setUser({...user, [event.target.name]: event.target.value});
    }

    // 사용자 업데이트(저장)하고 다이얼로그 내림
    const save = () => {
      // 부모에게서 전달받은 사용자수정 함수 호출(추가될 사용자, 아이디)
      props.updateUser(user); // 사용자 등록
      close(); // 팝업창 내림
  }  

    return(
        <div>
          {/* EditUser 컴포넌트에서 보여지는 것은 버튼 하나 */}
          <button onClick={clickDialongOpen}>Edit User</button>
          {/* 다이얼로그는 보이지 않다가 버튼 클릭시 보여짐(오픈) 
            다이얼로그가 띄면서 사용자 정보 상태가 갖고 있는 
            값들이 입력 칸에 세팅되어서 보임 */}
          <Dialog open={open} onClose={close}>
            <DialogTitle>Edit User</DialogTitle>
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