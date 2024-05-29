const mostViewBooksContainer = document.querySelector(".most-played .container .row")
const trendingBooksContainer = document.querySelector(".trending .container .row")

function fetchBooks(container,view){
    fetch(`http://localhost:3000/books?view_gte=${view}&&_sort=-view`)
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
fetchBooks(mostViewBooksContainer, 600);
fetchBooks(trendingBooksContainer, 600)

function renderBooksData(books,container){
    let listBookMostView = document.createElement("div")
    listBookMostView.classList.add("row");
    listBookMostView.classList.add("most-view_trending")

    listBookMostView.innerHTML = books.map(book => {
        return `<div class="col-lg-3 col-md-6 align-self-stretch mb-30 trending-items col-md-6">
          <div class="item">
            <div class="thumb">
              <a href="bookDetail.html?bookId=${book.id}"><img src="${book.image}" alt=""></a>
            </div>
            <div class="down-content">
              <span class="category">${book.category}</span>
              <a href="bookDetail.html?bookId=${book.id}">${book.title}</a>
            </div>
          </div>
        </div>`
    }).join('');
    container.append(listBookMostView)
}