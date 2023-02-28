$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            if(jsonObj.power!=0){
                $('button.write').hide()
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
    let $logout = $('a.logout')
    $logout.click(()=>{
        $.ajax({
            url: backURL+'logout',
            success: function(){
                location.href=frontURL+'project_html/main.html'
            }
        })
    })
    
    let $content = $('tbody.qna')
    let id = location.search.substring(1).split('=')[1]
    showList(id)
    function showList(currentPage){
		// let el = $('tbody.qna').not($content)
		// el.remove();
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url : backURL +'qna/mylist/'+currentPage,
            data : 'currentPage='+currentPage,
            success: function(jsonObj){
                if(jsonObj.status == 1){
                    let $qna = $('tbody.qna') //원본
                    $qna.show()
                    let $divtb = $('table')
                    let qnas = jsonObj.list
                    console.log(qnas)
                    $(qnas).each(function(index,n){
                        let $copyqna = $qna.clone() //복제본
                        $copyqna.find('td.no').html(n.qnaNo)
                        $copyqna.find('td.ti').html(n.qnaTitle)
                        $copyqna.find('td.co').html(n.qnaContent)
                        $copyqna.find('td.da').html(n.qnaDate)
                        $copyqna.find('td.id').html(n.qnaId)
                        if(n.qnaAns == null){
                            $copyqna.find('td.as').html('답변 대기')
                        }else{
                            $copyqna.find('td.as').html('답변 완료')
                        }
                        //$copyqna.find('td.as').html(n.qnaAns)
                        $divtb.append($copyqna)
                    })
                }
                $content.hide();
            }
        })
    }
    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click','li',(e)=>{
        let currentPage = $(e.target).attr('class')
        console.log($(e.target).html())
        showList(currentPage)
    })
    //-----페이지 클릭이벤트 끝-----

    //----- 공지사항 클릭 이벤트 시작 -----
    $('table').on('click','.qna',(e)=>{
        let $qna = $(e.target).parents('tr')
        let qnaNo = $qna.find('td.no').html()
        location.href = 'qna_content.html?qna_no='+qnaNo
    })
    //----- 공지사항 클릭 이벤트 끝 -----

    //----- 공지사항 작성 이벤트 시작 -----
    $('button.write').click(()=>{
        location.href ='qna_regist.html'
    })
    //----- 공지사항 작성 이벤트 끝 -----
})