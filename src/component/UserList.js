import { useEffect, useState } from "react"
import { SERVER_URL } from "../constant";
import { DataGrid } from "@mui/x-data-grid";
import { Snackbar } from "@mui/material";
import AddUser from "./AddUser";
import EditUser from './EditUser';

export default function UserList(){

    // 사용자 리스트 상태
    const [userList, setUserArray] = useState([]);
    // 삭제 알림창 표시 상태
    const [open, setOpen] = useState(false);

    // 조회해 온 데이터를 mui DataGrid 에서 컬럼별로 편집해서 
    // 출력해주도록 각 컬럼을 정의함.
    const columns = [
        {field: 'id', headerName: 'Id', width: 300},
        {field: 'name', headerName: 'Name', width: 300},
        {field: 'age', headerName: 'Age', width: 300},
        {field: 'phone', headerName: 'Phone', width: 250},
        {field: 'address', headerName: 'Address', width: 250},
        {
            field: 'edit', 
            headerName: 'Edit', 
            sortable: false,
            filterable: false
            ,
            renderCell: row => <EditUser data={row} updateUser={updateUser} />
        },
        {
          field: 'delete', 
          headerName: 'Operation', 
          sortable: false,
          filterable: false,
          renderCell: row => 
            <button onClick={() => onDelClick(row.id)}>
                Delete
            </button>
        }
    ];

    // 화면 로딩시 사용자 조회
    useEffect(()=> {
        fetchUserList(); // 사용자 조회 메소드 호출
    }, []);

    // 사용자 조회 
    const fetchUserList = ()=>{
        fetch(SERVER_URL + 'list')
        .then(response => response.json())
        .then(data => setUserArray(data))
        .catch(err => console.error(err))
    }

    // 사용자 삭제 이벤트 핸들러
    const onDelClick = (id)=>{
        if(window.confirm('정말로 삭제하시겠습니까?')){
            fetch(SERVER_URL + `remove/${id}`, {method: 'DELETE'})
            .then(response=> {
                if(response.ok){
                    fetchUserList();    // 삭제후 다시 조회
                    console.log('삭제됨');
                    setOpen(true);      // 삭제 알림 팝업 띄움
                }else{
                    alert('삭제 처리에 오류가 있습니다.');
                }
            })
            .catch(err=>console.error(err))
        }
    }

    // 사용자 등록 함수
    const addUser = (user) => {
        fetch(SERVER_URL  +  'register',
            { method: 'POST', headers: {
            'Content-Type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                fetchUserList();
            }else {
                alert('사용자 등록 작업에 오류가 있습니다.');
            }
        })
        .catch(err => console.error(err))
    }

    // 사용자 정보 수정
    const updateUser = (user) => {
        fetch(SERVER_URL  +  'modify',
            { 
            method: 'PUT', 
            headers: {
            'Content-Type':  'application/json',
            },
        body: JSON.stringify(user)
        })
        .then(response => {
            if (response.ok) {
                fetchUserList();
            }else {
                alert('사용자 정보 변경중 오류가 발생했습니다.');
            }
        })
        .catch(err => console.error(err))
    }


    return (
        <>
            {/* 사용자등록 컴포넌트  */}
            <AddUser addUser={addUser} />
            <div style={{height:500, width:'100%'}}>
                {/* <table>
                    <tbody>
                        {
                            userList.map((user, index) => 
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                </tr>)
                        }
                    </tbody>
                </table> */}

                <DataGrid rows={userList} columns={columns} 
                                getRowid={row => row.id}  style={{marginTop: '5px'}}/>
                <Snackbar open={open} autoHideDuration={5000} 
                        onClose={()=>setOpen(false)} 
                        message="User Deleted"/>
            </div>
        </>


    )
}