let queryStr = location.search.substring(1)
let cateNum = parseInt(queryStr.split("=")[1])
console.log('cateNum:' + cateNum + '      type:' + typeof (cateNum))

$(function () {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'member/session',
        success: function (jsonObj) {
            console.log('power:' + jsonObj.power)
            if (jsonObj.power == 2) {
                $('a.store').show()
            } else {
                $('a.store').hide()
            }
            if(jsonObj.power!=0){
                $('a.storeList').hide()
                $('a.memberlist').hide()
            }
            if (jsonObj.status == 1) {
                $('a.login').hide()
                $('a.signup').hide()
                let nick = jsonObj.nick
                $('span.nickname').html(nick + '님 <br>안녕하세요')
            } else if (jsonObj.status == 0) {
                $('a.logout').hide()
                $('a.mypage').hide()
                $('span.nickname').hide()
            }

        }
    })
    //-----가게목록 얻기 시작-----
    showStore(cateNum, 1)
    //-----가게목록 얻기 끝-----
    function showStore(cateNum, currentPage) {
        let el = $('div.store_list').not(':first-child')
        el.remove();
        console.log('page:' + currentPage)
        $.ajax({
            xhrFields: {
                withCredentials: true
            },

            url: backURL + 'store/list/' + cateNum + '/' + currentPage,
            method: 'post',
            success: function (jsonObj) {

                if (jsonObj.status == 1) {

                    let $divStore = $('div.store_list')//원본
                    $divStore.show()
                    let $divStores = $('div.store_lists')
                    let Stores = jsonObj.pb.list

                    $(Stores).each(function (index, st) {
                        console.log('가게번호: '+st.stNum+ '      카테고리: '+
                        st.cateNum+'         조회수: '+ st.stHits+'       가게명: '+  st.stName
                        + '      위치: '+  st.stLoca)
                        let cate;
                        switch (st.cateNum) {
                            case 1: cate = '한식'; break
                            case 2: cate = '중식'; break
                            case 3: cate = '일식'; break
                            case 4: cate = '양식'; break
                            case 5: cate = '분식'; break
                            case 6: cate = '패스트푸드'; break
                            case 7: cate = '야식'; break
                            case 8: cate = '디저트'; break
                        }

                        let $copyDivStore = $divStore.clone() //복제본
                        $copyDivStore.find('div.store_list__tags>span.store_list__num').html(st.stNum)
                        $copyDivStore.find('div.store_list__tags>span.store_list__tag').html(cate)
                        $copyDivStore.find('div.store_list__tags>span.store_list__view').html(st.stHits)
                        $copyDivStore.find('div.store_list__textBox>span.store_list__textBox__name').html(st.stName)
                        $copyDivStore.find('div.store_list__textBox>span.store_list__textBox__sub').html(st.stLoca)
                        //$copyDivStore.find('div.store_list__imgBox>store_list__img').attr('src', '../images/' + st.stNum + '.jpg')
                        $.ajax({
                            xhrFields: {
                                withCredential: true,
                                responseType: 'blob'//이미지 다운로드용 설정
                            },
                            cache: false, //이미지 다운로드용 설정
                            url: backURL+'download/thumb/' + st.stNum,
                            method: 'get',
                            success: function (responseData) {
                                let blobStr = URL.createObjectURL(responseData)
                                $copyDivStore.find('div.store_list__imgBox>img.store_list__img').attr('src', blobStr)
                                console.log(blobStr)
                            }
                        })
                        $divStores.append($copyDivStore)

                    })
                    $divStore.hide() //원본 가리기

                    //페이지 목록 만들기
                    let startPage = jsonObj.pb.startPage //페이지목록그룹시작페이지
                    let endPage = jsonObj.pb.endPage //페이지목록그룹끝페이지
                    let liStr = '';
                    if (startPage > 1) {
                        liStr += '<li class= "' + (startPage - 1) + '">PREV' + '&nbsp' + '</li>'
                    }
                    for (let i = startPage; i <= endPage; i++) {
                        liStr += "<li class='" + i + "'>" + i + "</li>"
                    }
                    let totalPage = jsonObj.pb.totalPage;
                    if (totalPage > endPage) {
                        liStr += '<li class= "' + (endPage + 1) + '">' + '&nbsp' + 'NEXT</li>'
                    }
                    $('div.pages>ul').html(liStr)
                }
            },
            error: function (xhr) {
                alert('오류:' + xhr.status)
            }
        })

    }

    




    
    //-----페이지 클릭이벤트 시작-----
    let $lipage = $('div.pages li')
    $('div.pages>ul').on('click', 'li', (e) => {
        let cp = $(e.target).attr('class')
        console.log('cp:'+$(e.target).html())
        showStore(cateNum,cp)
    })
    //-----페이지 클릭이벤트 종료-----


    //----- 음식점 클릭 이벤트 시작 -----
    $('div').on('click', '.store_list', (e) => {
        let $store_list = $(e.target).parents('div.store_list')
        let stNum = $store_list.find('div.store_list__tags>span.store_list__num').html()
        location.href = '../project_html/storedetail.html?stNum=' + stNum
    })
    //----- 음식점 클릭 이벤트 끝 -----


})