// UCS 2. Hệ thống (readBookController.js) xử lý yêu cầu đọc sách từ file pdf của cuốn sách (handleReadBookFromPdf(readBookButton,pdf))
function handleReadBookFromPdf(readBookButton,pdf){
    const userLoggedInJSON = localStorage.getItem("userLoggedInJSON");
    $(document).ready(function(){
        if(userLoggedInJSON){
            if(checkNullPdf(pdf)){
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

// UCS 3. Hệ thống (readBookController.js) tiến hành kiểm tra file pdf của cuốn sách có tồn tại hay không (checNullPdf(pdf))
function checkNullPdf(pdf){
    return pdf !== 'null'
}

// UCS 4. Nếu file pdf tồn tại thì hệ thống (readBookController.js) thiết lập cấu hình hiển thị nội dung của cuốn sách (setupDisplayBookConfig(readBookButton,pdf)) thông qua Real3D Fligboook jQuery plugin (flipbook.min.js)
function setupDisplayBookConfig(readBookButton,pdf){
    $(readBookButton).flipBook({ // UCS 5. Real3D Fligboook jQuery plugin (flipbook.min.js) xử lý hiện thị cuốn sách từ các thiết lập cấu hình hiện thị (flipBook(configDisplay)) của hệ thống (readBookController.js)
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

// UCS 3.1 File pdf không tồn tại
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