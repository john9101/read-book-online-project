//LT Đông
//UC_02 1.2.2 Hệ thống nhận vào nội dung người dùng đã nhập.
//(khi nhập vào thanh tìm kiếm ở trang search.html)
document.querySelector("#searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const query = document.querySelector("#searchInput").value.toLowerCase();
    fetchBooks(query);
});

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("searchKeyword");
    fetchBooks(query);
});

function fetchBooks(query) {
    //UC_02AFa 1a.1 Người dùng nhập từ khóa là các kí tự đặc biệt.
    //UC_02AFa 1a.2 Kiểm tra xem query có chứa ký tự đặc biệt hay không.
    //Nếu không sẽ đến bước 1.3, nếu có:
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharsRegex.test(query)) {
        const container = document.querySelector(".search-results .container .row");
        //UC_02AFa 1a.3 Kết quả sẽ hiển thị “Từ khóa không hợp lệ”, 1a.4 quay lại bước 1.1 để nhập lại từ mới
        container.innerHTML = `<p class="fw-bold text-center">Từ khóa không hợp lệ</p>`;
        return;
    }
    //UC_02AFb 1b.1 Người dùng không nhập gì mà bấm “TÌM KIẾM”.
    //UC_02AFb 1b.2 Kiểm tra xem query có bỏ trống không.
    //Nếu không sẽ đến bước 1.3, nếu có:
    if (query.length === 0) {
        const container = document.querySelector(".search-results .container .row");
        //UC_02AFb 1b.3 Kết quả sẽ hiển thị “Chưa có từ khóa tìm kiếm”, 1a.4 quay lại bước 1.1 để nhập lại từ mới
        container.innerHTML = `<p class="fw-bold text-center">Chưa có từ khóa tìm kiếm</p>`;
        return;
    }

    //UC_02 1.3 Hệ thống gửi yêu cầu lấy sách đến máy chủ bằng fetch().
    const container = document.querySelector(".search-results .container .row");
    //UC_02 Exceptions Lỗi kết nối mạng 1.Không thể kết nối đến máy chủ.
    fetch('http://localhost:3000/books')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        //UC_02 1.4 Máy chủ trả về danh sách các sách
        .then(books => {
            //UC_02 1.5 Lọc ra các sách đúng kết quả với từ khóa tìm kiếm dựa trên tiêu đề, tác giả, nhà phát hành, thể loại.
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)||
                book.category.toLowerCase().includes(query)||
                book.publisher.toLowerCase().includes(query)
            );
            //UC_02 Exceptions Không có kết quả tìm kiếm 1. Hiện "Không tìm thấy kết quả tìm kiếm"
            if (filteredBooks.length > 0) {
                renderBooksData(filteredBooks, container);
            } else {
                container.innerHTML = `<p class="fw-bold text-center">Không tìm thấy kết quả tìm kiếm</p>`;
            }
        })
        //UC_02 Exceptions Lỗi kết nối mạng 2.Hiện lỗi.
        .catch(error => console.log(error));
}

//UC_02 1.6 Sau khi xử lý tìm kiếm xong, kết quả tìm kiếm hiển thị sách trên trang web (search.html),
//bao gồm các liên kết, hình ảnh và thông tin liên quan khác về sách bằng renderBooksData().
function renderBooksData(books, container) {
    container.innerHTML = books.map(book => {
        //show
        return `<div class="col-lg-3 col-md-6 align-self-stretch mb-30 trending-items col-md-6">
          <div class="item">
            <div class="thumb">
            <!--UC_02 1.7 Người dùng có thể nhấp vào một liên kết để xem chi tiết. Chính là thẻ <a>-->
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