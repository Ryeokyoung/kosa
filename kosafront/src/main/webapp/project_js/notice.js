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
    let $pages = $('div.pages>ul')
    let $content = $('tbody.noti')
    function showList(currentPage){
		let el = $('tbody.noti').not($content)
		el.remove();
        $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url : backURL +'notice/list/'+currentPage,
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let $noti = $('tbody.noti') //원본
                $noti.show()
                let $divtb = $('table')
                let notis = jsonObj.pb.list
                $(notis).each(function(index,n){
                    // console.log(n.noti_no)
                    let $copynoti = $noti.clone() //복제본
                    $copynoti.find('td.no').html(n.notiNo)
                    $copynoti.find('td.ti').html(n.notiTitle)
                    $copynoti.find('td.da').html(n.notiDate)
                    $divtb.append($copynoti)
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
            let $copyPages=$('div.pages>ul')
            $copyPages.html(liStr)
        }
        })
    }

     //----- 공지사항 검색 시작 -----
     $('div.searchButton').click(()=>{
        showSearch(1)
     })
     
    function showSearch(currentPage){
        let search = $('input.searchContent').val()
        let el = $('tbody.noti').not($content)
		el.remove();
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL+'notice/search/'+search+'/'+currentPage,
            success: function(jsonObj){
                if(jsonObj.status == 1){
                    let $noti = $('tbody.noti') //원본
                    $noti.show()
                    let $divtb = $('table')
                    let notis = jsonObj.pb.list
                    $(notis).each(function(index,n){
                        let $copynoti = $noti.clone() //복제본
                        $copynoti.find('td.no').html(n.notiNo)
                        $copynoti.find('td.ti').html(n.notiTitle)
                        $copynoti.find('td.da').html(n.notiDate)
                        $divtb.append($copynoti)
                    })
                }
                $content.hide();
                
                //페이지 목록 만들기
                let el2 = $('div.pages>ul').not($pages)
                el2.remove()
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
                let $copyPages=$('div.pages>ul')
                $copyPages.html(liStr)
            }
        })
        return false
    }
    //----- 공지사항 검색 끝 -----
    showList(1)
    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click','li',(e)=>{
        let currentPage = $(e.target).attr('class')
        if($('input.searchContent').val()!=''){
            showSearch(currentPage)
        }else{
            showList(currentPage)
        }
    })
    //-----페이지 클릭이벤트 끝-----

    //----- 공지사항 클릭 이벤트 시작 -----
    $('table').on('click','.noti',(e)=>{
        let $noti = $(e.target).parents('tr')
        let notiNo = $noti.find('td.no').html()
        location.href = 'notice_content.html?notiNo='+notiNo
    })
    //----- 공지사항 클릭 이벤트 끝 -----

    //----- 공지사항 작성 이벤트 시작 -----
    $('button.write').click(()=>{
        location.href ='notice_regist.html'
    })
    //----- 공지사항 작성 이벤트 끝 -----

})