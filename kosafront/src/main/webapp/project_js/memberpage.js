$(function () {

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: backURL + 'member/session',
        success: function (jsonObj) {
            console.log('관리자정보: ' + jsonObj.id + '          ' + jsonObj.power)
            if (jsonObj.power != 0) {
                $('a.storeList').hide()
                $('a.memberlist').hide()
            }
            if (jsonObj.power == 2) {
                $('a.store').show()
            } else {
                $('a.store').hide()
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
})

$(function () {
    let queryStr = location.search.substring(1)
    let memId = queryStr.split("=")[1]
    console.log('memId:' + memId + '      type:' + typeof (memId))

    let $id = $('input[name=memId]')
    let $name = $('input[name=memName]')
    let $nick = $('input[name=memNick]')
    let $Bd = $('input[name=memBirth]')
    let $img = $('img.img')
    let $power = $('input[name=memPower]')
    let $phone = $('input[name=memPhone]')
    let $state = $('input[name=memState]')

    //----- 정보 받아오기 시작 -----
    function info(memId) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
         
            url: backURL + 'member/memberpage/' + memId,
            success: function (jsonObj) {
                let profile = jsonObj.profile
                let m = jsonObj.member

                switch (m.memPower) {
                    case 0:
                        power = '관리자';
                        break;
                    case 1:
                        power = '일반사용자';
                        break;
                    case 2:
                        power = '사업자';
                        break;

                }

                switch (m.memState) {
                    case 0:
                        state = '탈퇴회원';
                        $('input[class=delete]').hide()
                        break;
                    case 1:
                        state = '활동회원';
                        break;
                }

                console.log(jsonObj)
                $id.val(m.memId)
                $name.val(m.memName)
                $nick.val(m.memNick)
                $Bd.val(m.memBirth)
                if(m.memSex=='m'){
                    $('input.man').prop('checked',true)
                }else if(m.memSex=='f'){
                    $('input.woman').prop('checked',true)
                }
                $.ajax({
                    xhrFields: {
                        withCredential: true,
                        responseType: 'blob'//이미지 다운로드용 설정
                    },
                    cache: false, //이미지 다운로드용 설정
                    url: backURL+'download/profile/' + m.memId,
                    method: 'get',
                    success: function (responseData) {
                        let blobStr = URL.createObjectURL(responseData)
                        $img.attr('src', blobStr)
                    }
                })
                $power.val(power)
                $phone.val(m.memPhone)
                $state.val(state)

                
            }
        })
    }
    info(memId)
    //----- 정보 받아오기 끝 -----


    //-----회원 제명 이벤트 시작 -----

    $('input[class=delete]').click(() => {
        console.log(memId)
        
        if (confirm(memId + '님을 영구 제명시키시겠습니까?')) {
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'put',
                url: backURL + 'member/drop/' + memId,
                success: function (jsonObj) {
                    if (jsonObj.status == 1) {
                        alert("제명 완료!")
                        location.href = 'member_list.html'
                    } else {
                        alert("에러")
                    }
                }
            })
        } else {
        }

    })
    //-----회원 제명 이벤트 끝 -----



})