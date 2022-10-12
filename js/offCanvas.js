function openCanvas(){
    $('.offcanvas-btn').toggleClass('offcanvas-btn-open')
    $('.offcanvas-aside').toggleClass('offcanvas-aside-open')
    $('.submit-contact').on('click', onClick)
}

function onClick(){
    const $elMail = $("[name$='userMail']").val()
    const $elSubject = $("[name$='subject']").val()
    const $elMassage = $("[name$='message-body']").val()
    var strUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=131amitaibasi@gmail.com&su=${$elSubject}&body=${$elMassage}_from:${$elMail}`
    window.open(strUrl) 
}