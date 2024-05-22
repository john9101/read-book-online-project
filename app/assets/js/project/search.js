document.querySelector("#searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.querySelector("#searchInput").value.toLowerCase();
    fetchBooks(query);
});

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("searchKeyword");
    if (query) {
        fetchBooks(query);
    }
});

function fetchBooks(query) {
    const container = document.querySelector(".search-results .container .row");
    fetch('http://localhost:3000/books')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(books => {
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)||
                book.category.toLowerCase().includes(query)||
                book.publisher.toLowerCase().includes(query)
            );
            if (filteredBooks.length > 0) {
                renderBooksData(filteredBooks, container);
            } else {
                container.innerHTML = `<p class="font-weight-bold text-center">Không tìm thấy kết quả tìm kiếm</p>`;
            }
        })
        .catch(error => console.log(error));
}

function renderBooksData(books, container) {
    container.innerHTML = books.map(book => {
        return `<div class="col-lg-3 col-md-6 align-self-stretch mb-30 trending-items col-md-6">
          <div class="item">
            <div class="thumb">
              <a href="productDetail.html?id=${book.id}"><img src="${book.image}" alt=""></a>
              <span class="price"><em>Lượt xem</em>${book.view} <i class="fa-solid fa-eye"></i></span>
            </div>
            <div class="down-content">
              <span class="category">${book.category}</span>
              <a href="productDetail.html?id=${book.id}">${book.title}</a>
            </div>
          </div>
        </div>`;
    }).join('');
}