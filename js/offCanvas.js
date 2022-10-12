function openCanvas(){
    $('.offcanvas-btn').toggleClass('offcanvas-btn-open')
    $('.offcanvas-aside').toggleClass('offcanvas-aside-open')
    $('.submit-contact').on('click', onClick)
}

function onClick(){
    const $elMail = $("[name$='userMail']")
    const $elSubject = $("[name$='subject']")
    const $elMassage = $("[name$='message-body']")
    if (!$elMail.val().trim() || !$elSubject.val().trim() || !$elMassage.val().trim()){
        $elMail.val('')
        $elSubject.val('')
        $elMassage.val('')
        return
    } 
    var strUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=131amitaibasi@gmail.com
    &su=${$elSubject.val()}&body=${$elMassage.val()}_from:${$elMail.val()}`
    window.open(strUrl) 
    $elMail.val('')
    $elSubject.val('')
    $elMassage.val('') 
}