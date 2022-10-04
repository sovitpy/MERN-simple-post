import React, { useState } from 'react'


function BookCard(props) {
    const [book, setBook] = useState(() => props.book);
    const handleBookStatusUpdate = (e) => {
        const value = e.target.value;
        setBook({
            ...book,
            'status': value
        });
        console.log(`updated book startus:${value}`);
    }

    const handleBookUpdate = () => {
        console.log('updating book:', book);
        fetch(`http://localhost:3001/books/${props.book._id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(`Book Updated:`, data)
                props.updateBooks();
            });
    }

    const handleBookDelete = () => {
        console.log('...requested to update book');
        fetch(`http://localhost:3001/books/${props.book._id}`, { method: 'DELETE' })
            .then(() => {
                console.log(props);
                console.log(`Book Deleted:${props.book._id}, Name:${props.book.title}`)
                props.updateBooks();
            });
    }

    return (
        <div className="col-sm-4">
            <div className="card">
                <img src={book.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.description}</p>
                    <p className="card-text"><small className="text-muted">Status:{book.status}</small></p>
                    <div className="input-group">
                        <select className="form-select" aria-label="Default select example" name="status" value={book.status} onChange={(e) => handleBookStatusUpdate(e)}>
                            <option value="todo">To Do</option>
                            <option value="inprogress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-outline-danger" type="button" onClick={handleBookDelete}>Delete</button>
                            <button className="btn btn-outline-primary" type="button" onClick={handleBookUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Books(props) {
    return (
        <div className="card-group">
            {
                props.books.map((book, i) => {
                    return <BookCard book={book} key={i} updateBooks={props.updateBooks}></BookCard>
                })
            }
        </div>
    )
}