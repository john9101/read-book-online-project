// Hàm handleReadBookFromPdf(readBookButton,pdf) dùng để xữ lý đọc sách từ file pdf
function handleReadBookFromPdf(readBookButton,pdf){
    const userLoggedInJSON = localStorage.getItem("userLoggedInJSON");
    $(document).ready(function(){
        if(userLoggedInJSON){
            if(checkExistPdf(pdf)){
                setupDisplayBookConfig(readBookButton,pdf)
            }else {
                $(readBookButton).click(function (){
                    displayPopupNotFoundContentBook()
                })
            }
        }else{
            $(readBookButton).click(function (){
                location.href = '/read-book-online-project/app/pages/login.html'
            })
        }
    })
}

// Hàm checkExistPdf(pdf) dùng để kiểm tra file pdf của cuốn sách có tồn tại không
function checkExistPdf(pdf){
    return pdf !== 'null'
}

// Hàm setupDisplayBookConfig(readBookButton,pdf) dùng để thiết lập cấu hình hiễn thị cuốn sách tích hợp cùng Read3D Flipbook JQuery Plugin
function setupDisplayBookConfig(readBookButton,pdf){
    $(readBookButton).flipBook({
        pdfUrl: pdf,
        lightBox: true,
        layout:3,
        currentPage:{vAlign:"bottom", hAlign:"left"},
        btnPrint : {
            hideOnMobile:true
        },
        btnColor:'#0071f8',
        sideBtnColor:'#0071f8',
        sideBtnSize:60,
        sideBtnBackground:"rgba(0,0,0,0.7)",
        sideBtnRadius:60,
        btnSound:{vAlign:"top", hAlign:"left"},
        btnAutoplay:{vAlign:"top", hAlign:"left"},
    })
}

// Hàm throwNotFoundContentBook() dùng để xứ lý hiển thị pop-up "Không tìm thấy nội dung cuốn sách"
function displayPopupNotFoundContentBook(){
    const modalPopup = $('.modal-popup')
    modalPopup.css('display', 'flex');
    modalPopup.html(`<div class="popup-contain">
        <div class="popup-content"><i class="fa-solid fa-triangle-exclamation"></i> Rất tiếc, không tìm thấy nội dung của cuốn sách</div>
        <button class="popup-closed">ĐÓNG</button>
    </div>`)

    const popupClosed = $('.popup-closed')
    popupClosed.on('click', function(){
        modalPopup.css('display', 'none')
    })
}