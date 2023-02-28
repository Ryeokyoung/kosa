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

    // searchbt 클릭시 검색
    $('input.searchbt').click(() => {
        let $search = $('input[name=search]')
        location.href ='store_searchlist.html?search='+$search.val()
        
    })

    //돋보기 버튼 눌렀을때 searchbt 클릭이벤트 되게 하는 코드
    $('form>i').click(() => {
        $('input.searchbt').trigger('click')
    })


    //----- 조회수 높은 가게 시작 ------
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'store/most',
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let $storeLists = $('div.popular1>div.store_lists')
                let $storeList = $storeLists.find('div.store_list')
                let list = jsonObj.list
                list.forEach(store => {
                    let cate;
                        switch (store.cateNum) {
                            case 1: cate = '한식'; break
                            case 2: cate = '중식'; break
                            case 3: cate = '일식'; break
                            case 4: cate = '양식'; break
                            case 5: cate = '분식'; break
                            case 6: cate = '패스트푸드'; break
                            case 7: cate = '야식'; break
                            case 8: cate = '디저트'; break
                        }
                    let $copy = $storeList.clone()
                    $copy.find('div.store_list__tags>div.store_list__tag').html(cate)
                    $copy.find('div.store_list__tag2').html(store.stNum)
                    $copy.find('div.store_list__view').html(store.stHits)
                    $copy.find('div.store_list__textBox__name').html(store.stName)
                    $copy.find('div.store_list__textBox__sub').html(store.stLoca)
                    $.ajax({
                        xhrFields: {
                            withCredential: true,
                            responseType: 'blob'
                        },
                        cache: false,
                        url: backURL+'download/thumb/'+ store.stNum,
                        method: 'get',
                        success: function (responseData) {
                            let blobStr = URL.createObjectURL(responseData)
                            $copy.find('img').attr('src', blobStr)
                        }
                    })
                    $storeLists.append($copy)
                });
                $('div.store_list__tag2').hide()
                $storeList.hide()
            }
        }
    })
    //----- 조회수 높은 가게 끝 -----

    //----- 최근 등록된 가게 시작 ------
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL+'store/current',
        success: function(jsonObj){
            if(jsonObj.status == 1){
                let $storeLists = $('div.popular2>div.store_lists')
                let $storeList = $storeLists.find('div.store_list')
                let list = jsonObj.list
                list.forEach(store => {
                    let cate;
                        switch (store.cateNum) {
                            case 1: cate = '한식'; break
                            case 2: cate = '중식'; break
                            case 3: cate = '일식'; break
                            case 4: cate = '양식'; break
                            case 5: cate = '분식'; break
                            case 6: cate = '패스트푸드'; break
                            case 7: cate = '야식'; break
                            case 8: cate = '디저트'; break
                        }
                    let $copy = $storeList.clone()
                    $copy.find('div.store_list__tags>div.store_list__tag').html(cate)
                    $copy.find('div.store_list__tag2').html(store.stNum)
                    $copy.find('div.store_list__view').html(store.stHits)
                    $copy.find('div.store_list__textBox__name').html(store.stName)
                    $copy.find('div.store_list__textBox__sub').html(store.stLoca)
                    $.ajax({
                        xhrFields: {
                            withCredential: true,
                            responseType: 'blob'
                        },
                        cache: false,
                        url: backURL+'download/thumb/'+ store.stNum,
                        method: 'get',
                        success: function (responseData) {
                            let blobStr = URL.createObjectURL(responseData)
                            $copy.find('img').attr('src', blobStr)
                        }
                    })
                    $storeLists.append($copy)
                });
                $storeList.hide()
            }
        }
    })
    //----- 최근 등록된 가게 끝 -----

    //----- 가게 클릭 이벤트 시작 -----
    $('div.popular1').on('click','div.store_list',(e)=>{
        let $store = $(e.target).parents('div.store_list')
        let store = $store.find('div.store_list__tag2').html()
        location.href='storedetail.html?stNum='+store
    })

    $('div.popular2').on('click','div.store_list',(e)=>{
        let $store = $(e.target).parents('div.store_list')
        let store = $store.find('div.store_list__tag2').html()
        location.href='storedetail.html?stNum='+store
    })
})