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
    let $logout = $('a.logout')
    $logout.click(()=>{
        $.ajax({
            url: backURL+'logout',
            success: function(){
                location.href=frontURL+'main.html'
            }
        })
    })
    let $title = $('input[name=title]')
    let $qna = $('textarea[name=qna]')
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

    // -----작성 버튼 클릭 시작 -----
    $('aside>div>.bt').click(()=>{
        alert('title='+$title.val()+'&qna='+$qna.val())
        let qnasend = {}
        qnasend.qnaTitle = $title.val()
        qnasend.qnaContent = $qna.val()
        qnasend.qnaId = id
        console.log(id)
        $.ajax({
            url: backURL+'qna/new',
            method: 'post',
            data: JSON.stringify(qnasend),
            headers: {'Content-Type': 'application/json'},
            success: function(jsonObj){
                alert(jsonObj.msg)
                location.href = 'faq.html'
            },
            error: function(){
                alert("작성 실패"+jsonObj.msg)
            }
        })
    })
    // -----작성 버튼 클릭 끝 -----


})