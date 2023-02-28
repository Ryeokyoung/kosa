$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            if(jsonObj.power!=0){
                $('button.delete').hide()
                $('button.modify').hide()
                $('a.storeList').hide()
                $('a.memberlist').hide()
            }
            if(jsonObj.power==2){
                $('a.store').show()
            }else{
                $('a.store').hide()
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
    let queryStr = location.search
    let notiNo = queryStr.substring(1).split('=')[1]
    let tes = $('button.noti_post').html()
    // ----- 페이지 로드 시작 -----
    $.ajax({
        url : backURL+'notice/'+notiNo,
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let noti = jsonObj.noti
                $('nav').html(noti.notiTitle)
                $('div.noti_content').html(noti.notiDes)
            }else if(jsonObj.status == 0){
                alert(jsonObj.msg)
            }
        }
    })
    // ----- 페이지 로드 끝 -----

    // ----- 다음 글 버튼 클릭 시작 -----
    $("button.noti_post").click(()=>{
        $.ajax({
            url : backURL+'notice/next/'+notiNo,
            success: function(jsonObj){
                if(jsonObj.status == 1){
					notiNo = jsonObj.nextNo
                    location.href = 'notice_content.html?notiNo='+notiNo
                }else if(jsonObj.status == 0){
                    alert(jsonObj.msg)
                }
            }
        })
    })
    // ----- 다음 글 버튼 클릭 끝 -----
	
	// ----- 이전 글 버튼 클릭 시작 -----
	$("button.noti_pre").click(()=>{
        $.ajax({
            url : backURL+'notice/pre/'+notiNo,
            success: function(jsonObj){
                if(jsonObj.status == 1){
					notiNo = jsonObj.preNo
                    location.href = 'notice_content.html?notiNo='+notiNo
                }else if(jsonObj.status == 0){
                    alert(jsonObj.msg)
                }
            }
        })
    })
	// ----- 이전 글 버튼 클릭 끝 -----

    // ----- 삭제 버튼 클릭 시작 -----
    $("button.delete").click(()=>{
        $.ajax({
            url: backURL+'notice/'+notiNo,
            method: 'delete',
            success: function(jsonObj){
                if(jsonObj.status==1){
                    alert(jsonObj.msg)
                    location.href = 'notice.html'
                }else{
                    alert(jsonObj.msg)
                }
            }
        })
    })
    // ----- 삭제 버튼 클릭 끝 -----

    // ----- 수정 버튼 클릭 시작 -----
    $("button.modify").click(()=>{
        location.href = 'notice_modify.html?notiNo='+notiNo
    })
    // ----- 수정 버튼 클릭 끝 -----
})

