import React, { useState, useEffect } from 'react';
///import css from './index.module.scss'
import { Button, Card } from 'react-bootstrap';
import BoardForm from '../board_form/boardForm';
import { getAll, deleteData } from '../../apis/boardFormApi'

function NoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [show, setShow] = useState(false);
    const [noticeId, setNoticeId] = useState(0);
    const type = "notices";
    useEffect(() => {
        getAllNotices()
    },[]);    

    const modalClose = () => setShow(false);

    const modalShow = () => { 
        setShow(true) 
        setNoticeId(0) 
    }

    const editNotice = (id) => {
        setNoticeId(id)
        setShow(true);
    }
    const getAllNotices = async() => {
        let result = await getAll(type)
        setNotices(result)
    }
    return (
        <div className="w-100 m-2 overflow-scroll">
            <Button variant="primary" className='float-end' onClick={modalShow}>
                Add Notice
            </Button>
            <></>
            {notices.map((notice) => (
                <Card className='mt-2 w-100'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{notice.title}</Card.Title>
                        <Card.Text>{notice.content}
                        </Card.Text>
                        <p>by {notice.author}</p>
                        <div className='d-flex justify-content-between'>
                            <img src='/board-app/trash.png' alt='delete' onClick={async() => await deleteData(notice.id, type)}></img>
                            <Button variant="primary" onClick={() => editNotice(notice.id)}>update</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            
            <BoardForm id={noticeId} type={type} show={show} modalClose={modalClose} />

        </div>
    );
}

export default NoticeBoard;