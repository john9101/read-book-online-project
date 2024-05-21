let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

function fetchBookDetail() {
    const container = document.querySelector(".single-product .container");
    fetch(`http://localhost:3000/books/${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }else {
                throw new Error('Network response was not ok');
            }
        })
        .then(book => renderBookDetailData(book,container))
}
fetchBookDetail()

function renderBookDetailData(book, container) {
    container.innerHTML = `<div class="row">
        <div class="col-lg-6">
            <div class="left-image">
                <img src="${book.image}" alt=""/>
            </div>
        </div>
        <div class="col-lg-6 align-self-center">
            <h4>${book.title}</h4>
            <span class="price"><em>Lượt xem</em>${book.view} <i class="fa-solid fa-eye"></i></span>
            <p>${book.description}</p>
            <form id="qty" action="#">
                <button type="submit" id="read-book"><i class="fa-brands fa-readme"></i> ĐỌC SÁCH</button>
            </form>
            <ul>
                <li><span>Tác giả:</span> ${book.author}</li>
                <li><span>Nhà sản xuất:</span> ${book.publisher}</li>
                <li><span>Năm sản xuất:</span> ${book.publish_year}</li>
                <li><span>Ngôn ngữ:</span> ${book.language}</li>
                <li><span>Thể loại:</span> ${book.category}</li>
            </ul>
        </div>
        <div class="col-lg-12">
            <div class="sep"></div>
        </div>
    </div>`
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