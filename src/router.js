var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/books', function (req, res) {
    fs.readFile('./src/files/data.json', 'utf-8', function (err, data) {
        if (err) {
            res.json({status: 'failed', msg: 'no books found'});
        } else {
            res.json({status: 'success', books: JSON.parse(data)});
        }
    })
});

router.post('/book', function(req, res) {
    var title = req.body.title,
        author = req.body.author,
        publisher = req.body.publisher,
        year = req.body.year,
        isbn = req.body.isbn;

    if (!title || !author || !publisher || !year || !isbn) {
        res.status(400).json({status: 'failed', msg: 'title, author, publisher, year and isbn are required.'});
        return;
    }
    
    var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    var data = JSON.parse(dataText);
    var id = 1;
    if (data.length > 0) {
        id = data[data.length-1].id + 1;
    }
    
    var bookData = {
        id: id,
        title: title,
        author: author,
        publisher: publisher,
        year: year,
        isbn: isbn
    }

    data.push(bookData);

    fs.writeFile('./src/files/data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            res.json({status: 'failed', msg: 'The book was not saved.'});
        } else {
            res.json({status: 'success', msg: 'The book is added successfully!'});
        }
    });
});

router.delete('/book', function(req, res) {
    var id = parseInt(req.body.id);

    var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    var data = JSON.parse(dataText);

    data = data.filter(function (book) {
        return book.id !== id;
    });

    fs.writeFile('./src/files/data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) {
            res.json({status: 'failed', msg: 'the book was not deleted'});
        } else {
            res.json({status: 'success', msg: 'the book was deleted'});
        }
    });
});

module.exports = router;
