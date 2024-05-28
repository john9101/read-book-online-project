let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("bookId");
const readBookButton = document.getElementById('read-book')

function fetchAPIBookDetailWithId(id) {
    fetch(`http://localhost:3000/books/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }else {
                throw new Error('Network response was not ok');
            }
        })
        .then(function (book){
            renderBookDetailData(book);
            const pdf = readBookButton.value
            handleReadBookFromPdf(readBookButton, pdf)
        })
}
fetchAPIBookDetailWithId(id)

function renderBookDetailData(book) {
    const bookTitleElement = document.getElementById('book-title')
    const bookDescriptionElement = document.getElementById('book-description')
    const bookImageElement = document.getElementById('book-image')
    const bookViewElement = document.getElementById('book-view')
    const bookAuthorElement = document.getElementById('book-author')
    const bookPublisherElement = document.getElementById('book-publisher')
    const bookPublishYearElement = document.getElementById('book-publish_year')
    const bookLanguageElement = document.getElementById('book-language')
    const bookCategoryElement = document.getElementById('book-category')
    const downloadBookButton = document.getElementById('download-book')
    bookTitleElement.textContent = book.title;
    bookDescriptionElement.textContent = book.description;
    bookImageElement.src = book.image;
    bookViewElement.textContent = book.view;
    bookAuthorElement.append(book.author);
    bookPublisherElement.append(book.publisher);
    bookPublishYearElement.append(book.publish_year);
    bookLanguageElement.append(book.language);
    bookCategoryElement.append(book.category);
    readBookButton.value = book.pdf;
    downloadBookButton.href = book.pdf;

    fetchReviewOfBook(book)
}

function fetchReviewOfBook(book){
    const reviewWrapper = document.querySelector('.tab-content')
    reviewWrapper.innerHTML = book.reviews.map(review => {
        return `<div class="review_item">
            <div class="review_heading"><h4><i class="fa-solid fa-circle-user"></i> ${review.reviewer}</h4><span>• ${review.date}</span></div>
            <p>${review.content}</p>
        </div>`
    }).join('')
}