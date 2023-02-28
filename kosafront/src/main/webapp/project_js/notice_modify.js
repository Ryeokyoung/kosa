$(function(){
    let $title = $('input[name=title]')
    let $noti = $('textarea[name=noti]')
    let id
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
                id=jsonObj.id
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


    let queryStr = location.search
    let notiNo = queryStr.substring(1).split('=')[1]
    let tes = $('button.noti_post').html()
    // ----- 페이지 로드 시작 -----
    $.ajax({
        url : backURL+'notice/'+notiNo,
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let noti = jsonObj.noti
                $('input[name=title]').val(noti.notiTitle)
                $('textarea[name=noti]').val(noti.notiDes)
            }else if(jsonObj.status == 0){
                alert(jsonObj.msg)
            }
        }
    })
    // ----- 페이지 로드 끝 -----



    // -----수정 버튼 클릭 시작 -----
    $('foot>div>.bt').click(()=>{
        let notice = {}
        notice.notiTitle = $('input[name=title]').val()
        notice.notiDes = $('textarea[name=noti]').val()
        notice.notiId = id
        console.log(notice.notiTitle, notice.notiDes)
        $.ajax({
            url: backURL+'notice/'+notiNo,
            method: 'put',
            data: JSON.stringify(notice),
            headers: {'Content-Type': 'application/json'},
            success: function(jsonObj){
                alert(jsonObj.msg)
                location.href = 'notice.html'
            },
            error: function(){
                alert("작성 실패"+jsonObj.msg)
            }
        })
    })
    // -----수정 버튼 클릭 끝 -----


})