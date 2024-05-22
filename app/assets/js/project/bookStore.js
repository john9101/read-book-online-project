function fetchBooks(){
    const container = document.querySelector(".trending .container .row.trending-box")
    fetch('http://localhost:3000/books')
        .then(response => {
            if (response.ok){
                return response.json();
            }else {
                throw new Error('Network response was not ok');
            }
        })
        .then(books => renderBooksData(books,container))
        .catch(error => console.log(error));
}
fetchBooks();

function renderBooksData(books,container){
    container.innerHTML = books.map(book => {
        return `<div class="col-lg-3 col-md-6 align-self-stretch mb-30 trending-items col-md-6">
          <div class="item">
            <div class="thumb">
              <a href="bookDetail.html?id=${book.id}"><img src="${book.image}" alt=""></a>
              <span class="price"><em>Lượt xem</em>${book.view} <i class="fa-solid fa-eye"></i></span>
            </div>
            <div class="down-content">
              <span class="category">${book.category}</span>
              <a href="bookDetail.html?id=${book.id}">${book.title}</a>
            </div>
          </div>
        </div>`
    }).join('');
}