$(function(){
    let id
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            if(jsonObj.power != 0){
                $('a.faqhelp3').hide()
            }else{
                $('a.faqhelp').hide()
                $('a.faqhelp2').hide()
            }
            if(jsonObj.power==2){
                $('a.store').show()
            }else{
                $('a.store').hide()
            }
            if(jsonObj.status==1){
                $('a.login').hide()
                $('a.signup').hide()
                id = jsonObj.id
                let nick = jsonObj.nick
                $('span.nickname').html(nick+'님 <br>안녕하세요')
            }else if(jsonObj.status==0){
                $('a.logout').hide()
				$('a.mypage').hide()
				$('span.nickname').hide()
                $('a.faqhelp').hide()
                $('a.faqhelp2').hide()
            }
        }
    })

    $('a.faqhelp').click(()=>{
        location.href = 'qna_regist.html'
    })
    $('a.faqhelp2').click(()=>{
        location.href = 'qna_mine.html?memId='+id
    })
    $('a.faqhelp3').click(()=>{
        location.href = 'qna.html'
    })
})