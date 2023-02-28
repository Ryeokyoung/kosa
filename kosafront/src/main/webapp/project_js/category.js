$(function () {
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'member/session',
        success: function (jsonObj) {
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


    //----- 카테고리 클릭 이벤트 시작 -----
    $('div.detail').click((e) => {
        $div = $(e.target)
        cateNum = $div.parents('div.detail').children('div.cate').html()
        switch (cateNum) {
            case '한식':
                cateNum = 1;
                break
            case '중식':
                cateNum = 2;
                break
            case '일식':
                cateNum = 3;
                break
            case '양식':
                cateNum = 4;
                break
            case '분식':
                cateNum = 5;
                break
            case '패스트푸드':
                cateNum = 6;
                break
            case '야식':
                cateNum = 7;
                break
            case '디저트':
                cateNum = 8;
                break

        }
        location.href = '../project_html/store_catelist.html?cateNum=' + cateNum
    })
})
