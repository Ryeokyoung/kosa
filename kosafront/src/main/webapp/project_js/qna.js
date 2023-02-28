$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            if(jsonObj.power!=0){
                $('button.write').hide()
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
    function showList(currentPage){
		// let el = $('tbody.qna').not($content)
		// el.remove();
        $.ajax({
            url : backURL +'qna/list/'+currentPage,
            data : 'currentPage='+currentPage,
            success: function(jsonObj){
                if(jsonObj.status == 1){
                    let $qna = $('tbody.qna') //원본
                    $qna.show()
                    let $divtb = $('table')
                    let qnas = jsonObj.pb.list
                    $(qnas).each(function(index,n){
                        console.log(n.qnaNo,n.qnaTitle,n.qnaDate,n.qnaContent, n.qnaId)
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
                        // $copyqna.find('td.as').html(n.qnaAns)
                        $divtb.append($copyqna)
                    })
                }
                $content.hide();
                
                //페이지 목록 만들기
                let startPage = jsonObj.pb.startPage //페이지목록그룹시작페이지
                let endPage = jsonObj.pb.endPage //페이지목록그룹끝페이지
                let liStr = '';
                if(startPage>1){
                    liStr += '<li class= "'+(startPage-1)+'">PREV'+'&nbsp'+'</li>'
                }
                for(let i=startPage; i<=endPage; i++){
                    liStr += "<li class='"+i+"'>"+i+"</li>"
                }
                let totalPage = jsonObj.pb.totalPage;
                if(totalPage > endPage){
                    liStr += '<li class= "'+(endPage+1)+'">'+'&nbsp'+'NEXT</li>'
                }
                $('div.pages>ul').html(liStr)
            }
        })
    }
    showList(1)
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
        location.href = '../project_html/qna_content.html?qna_no='+qnaNo
    })
    //----- 공지사항 클릭 이벤트 끝 -----

    //----- 공지사항 작성 이벤트 시작 -----
    $('button.write').click(()=>{
        location.href ='qna_regist.html'
    })
    //----- 공지사항 작성 이벤트 끝 -----
})