$(document).ready(function () {
    $.ajax({
        url: "http://localhost:1234/api/books",
        type: "get",
        success: function(response) {
            if (response.status === 'success') {
                var tbody = $('#book-table tbody')[0];
                for (var i = 0; i < response.books.length; ++i) {
                    var book = response.books[i];
                    var row = tbody.insertRow();
                    
                    var cell = row.insertCell();
                    cell.textContent = book.id;

                    cell = row.insertCell();
                    cell.textContent = book.title;
                    
                    cell = row.insertCell();
                    cell.textContent = book.author;
                    
                    cell = row.insertCell();
                    cell.textContent = book.publisher;
                    
                    cell = row.insertCell();
                    cell.textContent = book.year;
                    
                    cell = row.insertCell();
                    cell.textContent = book.isbn;
                    
                    cell = row.insertCell();
                    cell.innerHTML = '<button class="delete-button" data-book-id="' + book.id + '">Delete</button>';
                }
            }

            $('#book-table').tablesorter();

            $('.delete-button').on('click', function () {
                $.ajax({
                    url: "http://localhost:1234/api/book",
                    data: {
                        id: $(this).data().bookId,
                    },
                    type: "delete",
                    success: function (response) {
                        console.log(response);
                        location = location;
                    },
                    error: function (xhr) {
                        console.log('error: ' + xhr);
                        location = location;
                    }
                });
            });
        },
        error: function(xhr) {
            console.log('error: ' + xhr);
        }
    });
});
