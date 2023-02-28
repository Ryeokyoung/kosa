$(function () {
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

    //url값 받아오기
    // $.urlParam = function(name){
    //     var results = new RegExp('[\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    //     return results[1] || 0;
    // }
    // let $searchVal  =$.urlParam('search')

    // console.log($.urlParam('search'))
    let test = location.search.substring(1)
    let search = decodeURI(test.split('=')[1])
    $('input.searchContent').val(search)
    let $content = $('div.store_lists')

    function showStore(currentPage){
        let el = $('div.store_lists').not($content)
        el.remove();

        let searchlist ={}
        searchlist.currentPage = currentPage
        searchlist.search = search

        
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            method : "post",
            url : backURL +'store/storelist/' +currentPage,
            data : searchlist,
            success: function (jsonObj) {
                let $storeList = $('div.store_list')//원본
                
                $storeList.show()
                let $divsl = $('div.store_lists')
                let stol = jsonObj.list
                $(stol).each(function(index,n){
                    let cate;
                        switch (n.cateNum) {
                            case 1: cate = '한식'; break
                            case 2: cate = '중식'; break
                            case 3: cate = '일식'; break
                            case 4: cate = '양식'; break
                            case 5: cate = '분식'; break
                            case 6: cate = '패스트푸드'; break
                            case 7: cate = '야식'; break
                            case 8: cate = '디저트'; break
                        }
                    let $copynoti = $storeList.clone()
                    $copynoti.find('div.store_list__tag').html(cate)
                    $copynoti.find('div.store_list__tag2').html(n.stNum)
                    $copynoti.find('div.store_list__view').html(n.stHits)
                    //$copynoti.find('img').attr('src', 'C:/files'+) //이미지처리 어케하지
                    $.ajax({
                        xhrFields: {
                            withCredential: true,
                            responseType: 'blob'//이미지 다운로드용 설정
                        },
                        cache: false, //이미지 다운로드용 설정
                        url: backURL+'download/thumb/'+ n.stNum,
                        method: 'get',
                        success: function (responseData) {
                            let blobStr = URL.createObjectURL(responseData)
                            $copynoti.find('img').attr('src', blobStr)
                        }
                    })
                    $copynoti.find('div.store_list__textBox__name').html(n.stName)
                    $copynoti.find('div.store_list__textBox__sub').html(n.stLoca)
                    $divsl.append($copynoti)
                })

                $storeList.hide();
                
                //페이지 목록 만들기
                let startPage = jsonObj.startPage //페이지목록그룹시작페이지
                let endPage = jsonObj.endPage //페이지목록그룹끝페이지
                let liStr = '';
                if(startPage>1){
                    liStr += '<li class= "'+(startPage-1)+'">PREV'+'&nbsp'+'</li>'
                }
                for(let i=startPage; i<=endPage; i++){
                    liStr += "<li class='"+i+"'>"+i+"</li>"
                }
                let totalPage = jsonObj.totalPage;
                if(totalPage > endPage){
                    liStr += '<li class= "'+(endPage+1)+'">'+'&nbsp'+'NEXT</li>'
                }
                $('div.pages>ul').html(liStr)
            }
        })

    }
    showStore(1)


    $('div.store_lists').on('click','div.store_list',(e)=>{
        let storeNo = $(e.target).parent().parent().children('.store_list__tags').children('.store_list__tag2').html()
       
        location.href = 'storedetail.html?stNum='+storeNo
    })

    $('input.searchbt').click(() => {
        let $search = $('input[name=search]')
        location.href ='store_searchlist.html?search='+$search.val()  
    })
})
