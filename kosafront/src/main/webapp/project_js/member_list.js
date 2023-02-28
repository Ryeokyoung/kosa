$(function(){
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'member/session',
        success: function(jsonObj){
            console.log(jsonObj.power)
            console.log('관리자정보: '+jsonObj.id+'          '+jsonObj.power)
            if(jsonObj.power!=0){
                $('a.memberlist').hide()
                $('a.storeList').hide()
            }
            if(jsonObj.power==2){
                if(jsonObj.power!=0){
                $('a.memberlist').hide()
            }
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
    // -----페이지 불러오기 시작-----
    
    let $content = $('tbody.member') 
    showSelectList(1,-1,-1)
    function showList(currentPage){
        let el = $('tbody.member').not($content)
		el.remove();
        $.ajax({
            xhrFields: {
            withCredentials: true
        },
        url : backURL +'member/list/'+currentPage,
        success: function(jsonObj){
                console.log(jsonObj)
                if(jsonObj.status == 1){
                    let $member = $('tbody.member') //원본
                    $member.show()
                    let $divtb = $('table')
                    let members = jsonObj.pb.list
                    $(members).each(function(index,m){
                        switch (m.memPower) {
                            case 0:
                                power = '관리자';
                                break
                                case 1:
                                    power = '일반사용자';
                                    break
                                    case 2:
                                power = '사업자';
                                break
                            }
                            switch (m.memState) {
                                case 0:
                                    state = '탈퇴회원';
                                    break
                                    case 1:
                                        state = '일반회원';
                                        break
                                        
                                    }
                                    let $copymember = $member.clone() //복제본
                                    $copymember.find('td.no').html(m.memNo)
                                    $copymember.find('td.id').html(m.memId)
                                    $copymember.find('td.name').html(m.memName)
                                    $copymember.find('td.nickname').html(m.memNick)
                                    $copymember.find('td.power').html(power)
                                    $copymember.find('td.state').html(state)
                                    $divtb.append($copymember)
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
    
    
   // console.log('Power:' + memPower + '      State:' + memState)
   
   let $selectType = $('select.selectType')
   $selectType.click(()=>{
       console.log('클릭되었습니다', $selectType.val());
   })
    
    
    
    console.log($selectType)
    $('select.selectType').change((e)=>{
        $select = $(e.target)
        memState = $('select.selectType2').val()
        $selectPowerType = $select.parents('td.power').children('select.selectType').html()
        //$selectStateType = $select.parents('td.state').children('select.stateType').html()
        console.log('Power:' + $selectType)
        switch($selectType.val()){
            case '-1': memPower=-1;
           
            break;
            case '0': memPower=0;
            
            break;
            case '1': memPower=1;
            
            break;
            case '2': memPower=2;
           
            break;
        }
            
        
        
        console.log('Power:' + memPower )
        showSelectList(1,memPower,memState)
    })

    let $selectType2 = $('select.selectType2')
   $selectType2.click(()=>{
       console.log('클릭되었습니다', $selectType2.val());
   })
    
    
    
    console.log($selectType2)
    $('select.selectType2').change((e)=>{
        $select = $(e.target)
        memPower = $('select.selectType').val()
        $selectPowerType = $select.parents('td.power').children('select.selectType2').html()
        //$selectStateType = $select.parents('td.state').children('select.stateType').html()
        console.log('state:' + $selectType2)
    
        
        switch($selectType2.val()){
            case '-1': memState = -1;
           
            break;
            case '0': memState = 0;
           
            break;
            case '1': memState = 1;
          
            break;
        }
        
        console.log('State:' + memState )
        showSelectList(1,memPower,memState)
            
        
    })





    
    //-----페이지 불러오기 끝-----
    function showSelectList(currentPage,memPower,memState){
		let el = $('tbody.member').not($content)
		el.remove();
        $.ajax({
        xhrFields: {
            withCredentials: true
        },
            url : backURL +'member/selectlist/'+currentPage+'/'+memPower+'/'+memState,
            success: function(jsonObj){
                console.log(jsonObj)
                if(jsonObj.status == 1){
                    let $member = $('tbody.member') //원본
                    $member.show()
                    let $divtb = $('table')
                    let members = jsonObj.pb.list
                    $(members).each(function(index,m){
                        switch (m.memPower) {
                            case 0:
                                power = '관리자';
                                break
                            case 1:
                                power = '일반사용자';
                                break
                            case 2:
                                power = '사업자';
                                break
                        }
                        switch (m.memState) {
                            case 0:
                                state = '탈퇴회원';
                                break
                            case 1:
                                state = '일반회원';
                                break
                            
                        }
                        let $copymember = $member.clone() //복제본
                        $copymember.find('td.no').html(m.memNo)
                        $copymember.find('td.id').html(m.memId)
                        $copymember.find('td.name').html(m.memName)
                        $copymember.find('td.nickname').html(m.memNick)
                        $copymember.find('td.power').html(power)
                        $copymember.find('td.state').html(state)
                        $divtb.append($copymember)
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

    //-----태그로 권한,상태 검색 시작-----

    //-----페이지 권한,상태 검색 끝-----


    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click','li',(e)=>{
        let p = $('select.selectType').val()
        let s = $('select.selectType2').val()
        let currentPage = $(e.target).attr('class')
        console.log($(e.target).html())
        showSelectList(currentPage,p,s)
    })
    //-----페이지 클릭이벤트 끝----- 

    //----- 회원목록 클릭 이벤트 시작 -----
    $('table').on('click','.member',(e)=>{
        let $mem = $(e.target).parents('tr')
        let memId = $mem.find('td.id').html()
        location.href = '../project_html/memberpage.html?memId='+memId
    })
    //----- 회원목록 클릭 이벤트 끝 -----
})