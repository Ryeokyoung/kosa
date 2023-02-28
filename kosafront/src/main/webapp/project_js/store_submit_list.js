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
    
    let $content = $('tbody.store')
    
    // ----- 페이지 정보 얻어오기 시작 ----- 
    function showList(status,currentPage){
		let el = $('tbody.store').not($content)
		el.remove();
        $.ajax({
            url : backURL +'store/'+status+'/'+currentPage,
            success: function(jsonObj){
                if(jsonObj.status == 1){
                    let $noti = $('tbody.store')
                    $noti.show()
                    let $divtb = $('table')
                    let notis = jsonObj.pb.list
                    $(notis).each(function(index,n){
                        let status
                        switch (n.stStatus) {
                            case 0:
                                status = '미승인';
                                break
                            case 1:
                                status = '승인';
                                break
                            case 2:
                                status = '삭제';
                                break
                        }
                        console.log(status)
                        let $copynoti = $noti.clone() //복제본
                        $copynoti.find('td.no').html(n.stNum)
                        $copynoti.find('td.ti').html(n.stName)
                        $copynoti.find('td.da').html(n.stDate)
                        $copynoti.find('td.st').html(status)
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
                $('div.pages>ul').html(liStr)
            }
        })
    }
    // ----- 페이지 정보 얻어오기 끝 ----- 

    showList(-1,1)

    // ----- 페이지 변경 시작 -----
    $('select.selectType').change((e)=>{
        $select = $(e.target)
        let s = $select.val()
        showList(s,1)
    })
    // ----- 페이지 변경 시작 -----

    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click','li',(e)=>{
        let s = $('select.selectType').val()
        let currentPage = $(e.target).attr('class')
        showList(s,currentPage)
    })
    //-----페이지 클릭이벤트 끝-----

    //----- 신청된 가게 클릭 이벤트 시작 -----
    $('table').on('click','.store',(e)=>{
        let $store = $(e.target).parents('tr')
        let storeNo = $store.find('td.no').html()
        location.href = 'storedetail.html?stNum='+storeNo
    })
    //----- 신청된 가게 클릭 이벤트 끝 -----
})