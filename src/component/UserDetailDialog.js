import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';

/**
 * 사용자의 상세 정보를 보여주는 컴포넌트
 * - 사용자의 이름을 전달받아서 이름을 보여주고
 * - 그 이름을 클릭하면 다이얼로그가 오픈된다.
 */

export default function UserDetailDialog(props) {

    // 사용자의 상세정보를 보여줄 다이얼로그 오픈/내림 상태 변수
    const [open, setOpen] = useState(false);

    // 다이얼 로그 오픈
    const handleClickOpen = () => {
        setOpen(true);
    };

    // 다이얼 로그 내림
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * 다이얼로그
     * - open={open} : {open}값의 true/false 여부에 따라 열리고/닫히고
     * - onClose={handleClose} : 다이얼로그 닫을때 사용될 함수
     */
    

    return (
        <div>
            <span style={{cursor: 'pointer', textDecoration: 'underline'}} onClick={handleClickOpen}>{props.data.row.name}</span>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Dstails</DialogTitle>
                <DialogContent>
                    <div>
                        <strong>ID:</strong>{props.data.row.id}
                    </div>
                    <div>
                        <strong>Name:</strong>{props.data.row.name}
                    </div>
                    <div>
                        <strong>Age:</strong>{props.data.row.age}
                    </div>
                    <div>
                        <strong>Phone:</strong>{props.data.row.phone}
                    </div>
                    <div>
                        <strong>Address:</strong>{props.data.row.address}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}