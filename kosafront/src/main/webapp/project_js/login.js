$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            if(jsonObj.power==2){
                $('a.store').show()
            }else{
                $('a.store').hide()
            }
            if(jsonObj.power!=0){
                $('a.storeList').hide()
                $('a.memberlist').hide()
            }
            if(jsonObj.status==1){
                $('a.login').hide()
                $('a.signup').hide()
                let nick = jsonObj.nick
                $('span.nickname').html(nick+'님 <br>안녕하세요')
            }else if(jsonObj.status==0){
                $('a.logout').hide()
				$('a.mypage').hide()
				$('span.nickname').hide()
            }
        }
    })
    let $box = $('input[type=checkbox]')

    if(localStorage.getItem("id") != null){
        $('input[name=id]').val(localStorage.getItem("id"))
    }

    $('button.login').click(()=>{
        let id = $('input[name=id]').val()
        let pwd = $('input[name=pwd]').val()
        let member = {}
        member.memId = id
        member.memPwd = pwd
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL+'member/'+id,
            method : 'post',
            data: JSON.stringify(member),
            headers: {'Content-Type': 'application/json'},
            success: function(jsonObj){
                if($box.prop('checked')){
                    localStorage.setItem("id",id)
                }else(
                    localStorage.removeItem("id")
                )
                if(jsonObj.status == 1){
                    alert("로그인 성공")
                    location.href='main.html'
                }else if(jsonObj.status == 0){
                    alert(jsonObj.msg)
                }
            }
        })
    })




    $('img.img').click(()=>{
        location.href='kakao2.html'
    })
    $('button.signup').click(()=>{
        location.href='signup.html'
    })
    $('button.find').click(()=>{
        location.href='find.html'
    })
})
