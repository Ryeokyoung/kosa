
$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            console.log(jsonObj.power)
            if(jsonObj.power!=0){
                $('a.storeList').hide()
                $('a.memberlist').hide()
            }
            if(jsonObj.power==2){
                if(jsonObj.power!=0){
                $('a.memberlist').hide()
            }
                $('a.store').show()
                $('a.mystore').show()
            }else{
                $('a.store').hide()
                $('a.mystore').hide()
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
    let $content = $('tbody.store') 
    function showList(memId){
		let el = $('tbody.store').not($content)
		el.remove();
        $.ajax({
        xhrFields: {
            withCredentials: true
        },
            url : backURL +'store/mylist/'+memId,
            success: function(jsonObj){
                console.log(jsonObj)
                if(jsonObj.status == 1){
                    let $store = $('tbody.store') //원본
                    $store.show()
                    let $divtb = $('table')
                    let stores = jsonObj.list
                    $(stores).each(function(index,st){
                        
                        switch (st.stStatus) {
                            case 0:
                                ststatus = '미승인';
                                break
                            case 1:
                                ststatus = '승인';
                                break
                            case 2:
                                ststatus = '삭제';
                                break
                            
                        }
                        let $copystore = $store.clone() //복제본
                        $copystore.find('td.num').html(st.stNum)
                        $copystore.find('td.name').html(st.stName)
                        $copystore.find('td.loca').html(st.stLoca)
                        $copystore.find('td.res_no').html(st.stResNo)
                        $copystore.find('td.ststatus').html(ststatus)
                        $divtb.append($copystore)
                    })
                }
                $content.hide();
            }
        })
    }
    let queryStr = location.search.substring(1)
    let memId = queryStr.split("=")[1]
    console.log('memId:'+memId)
    showList(memId)
    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click','li',(e)=>{
        let currentPage = $(e.target).attr('class')
        console.log($(e.target).html())
        showList(currentPage)
    })
    //-----페이지 클릭이벤트 끝-----

    //----- 음식점 클릭 이벤트 시작 -----
    $('table').on('click','.store',(e)=>{
        let $store = $(e.target).parents('tr')
        let stNum = $store.find('td.num').html()
        location.href = '../project_html/storedetail.html?stNum='+stNum
    })
    //----- 음식점 클릭 이벤트 끝 -----
})