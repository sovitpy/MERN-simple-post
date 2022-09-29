import React from 'react'


function BookCard(props) {
    return (
        <div className="card">
            <img src={props.book.img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.book.title}</h5>
                <p className="card-text">{props.book.description}</p>
                <p className="card-text"><small className="text-muted">Status:{props.book.status}</small></p>
                <select className="form-select" aria-label="Default select example" value={props.book.status}>
                    <option value="todo">To Do</option>
                    <option value="inprogress">In progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    )
}

export default function Books(props) {
    return (
        <div className="card-group">
            {
                props.books.map((book, i) => {
                    return <BookCard book={book} key={i}></BookCard>
                })
            }
        </div>
    )
}