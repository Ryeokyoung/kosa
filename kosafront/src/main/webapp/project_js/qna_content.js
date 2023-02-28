$(function(){
    $.ajax({
        xhrFields: {
                withCredentials: true
            },
        url: backURL+'member/session',
        success: function(jsonObj){
            console.log(jsonObj)
            if(jsonObj.power==2){
                $('a.store').show()
            }else{
                $('a.store').hide()
            }
            if(jsonObj.power != 0){
                $('textarea[name=qnaAns]').attr('readonly',true)
                $('button.qna_Ans').hide()
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
                location.href=frontURL+'project_html/main.html'
            }
        })
    })
    
    let queryStr = location.search
    let qnaNo = queryStr.substring(1).split('=')[1]
    // let qnaNo = arr[1]
    // let qna = arr[0]
    // let tes = $('button.qna_post').html()
    // ----- 페이지 로드 시작 -----
    $.ajax({
        url : backURL+'qna/'+qnaNo,
        // data : 
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let qna = jsonObj.Qna //KEY값 
                $('div.title').html(qna.qnaTitle)
                $('div.qna_content').html(qna.qnaContent)
                $('textarea[name=qnaAns]').val(qna.qnaAns)
                
            }else if(jsonObj.status == 0){
                alert(jsonObj.msg)
            }
        }
    })


    //답변등록  
    $('button.qna_Ans').click(()=>{
        $('textarea[name=qnaAns]').val()
        let qna = {}
        qna.qnaAns = $('textarea[name=qnaAns]').val()
        qna.qnaNo = qnaNo
        console.log(qna)
        $.ajax({
            xhrFields: {
                withCredentials: true

                // 크로스 오리진 문제 해결 ajax 
            },
            url: backURL+'qna/modify',
            method: 'put',
            data: JSON.stringify(qna),
            headers: {'Content-Type': 'application/json'},
            success: function(jsonObj){
                if(jsonObj.status == 1){
                    alert('답변 성공!')
                    location.href = 'qna.html'
                }
            },
            error: function(){
                alert("작성 실패"+jsonObj.msg)
            }

            
        })
    })
    // $("button.modify").click(()=>{
    //     location.href = 'qna_modify.html?notiNo='+qnaNo
    // })
    // $('foot>div>.bt').click(()=>{
    //     let qna = {}
    //     qna.qnaTitle = $('input[name=title]').val()
    //     qna.qnaContent = $('textarea[name=qna]').val()
    //     qna.qnaId = id
    //     console.log(qna.qnaTitle, qna.qnaContent)
    //     $.ajax({
    //         url: backURL+'qna/'+qnaNo,
    //         method: 'put',
    //         data: JSON.stringify(qna),
    //         headers: {'Content-Type': 'application/json'},
    //         success: function(jsonObj){
    //             alert(jsonObj.msg)
    //             location.href = 'qna.html'
    //         },
    //         error: function(){
    //             alert("작성 실패"+jsonObj.msg)
    //         }
    //     })
    // })


})

