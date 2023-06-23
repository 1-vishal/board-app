import React, { useEffect, useState } from "react";
//import css from './index.module.scss'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BoardForm from '../board_form/boardForm';
import { getAll, deleteData } from '../../apis/boardFormApi'

function QuotationBoard() {
    const [quotes, setQuotes] = useState([]);
    const [show, setShow] = useState(false);
    const [quoteId, setQuoteId] = useState(0);
    const type = "quotes";

    useEffect(() => {
        getAllQuotes()
    });    

    const modalClose = () => setShow(false);

    const modalShow = () => { 
        setShow(true) 
        setQuoteId(0) 
    }

    const editQuote = (id) => {
        setQuoteId(id)
        setShow(true);
    }
    const getAllQuotes = async() => {
        let result = await getAll(type)
        setQuotes(result)
    }
    return (
        <div className="w-100 m-2 overflow-scroll">
            <Button variant="primary" className='float-end' onClick={modalShow}>
                Add Notice
            </Button>
            <></>
            {quotes.map((quote) => (
                <Card className='mt-2 w-100'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{quote.title}</Card.Title>
                        <Card.Text>{quote.content}
                        </Card.Text>
                        <p>by {quote.author}</p>
                        <div className='d-flex justify-content-between'>
                            <img src='/boardApp/trash.png' alt='deleteData' onClick={async() => await deleteData(quote.id, type)}></img>
                            <Button variant="primary" onClick={() => editQuote(quote.id)}>update</Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
            
            <BoardForm id={quoteId} type={type} show={show} modalClose={modalClose} />

        </div>
    );
}

export default QuotationBoard;