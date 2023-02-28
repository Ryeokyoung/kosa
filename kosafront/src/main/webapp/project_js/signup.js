$(function (){
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
    let $id = $('input[name=memId]')
    let $btIdDupChk = $('button.iddupchk')
    $('input[name=submit]').hide()
    //----- 카카오 로그인 부분 시작 -----
    let str = location.search.substring(1)
    let split = str.split('&')
    console.log(split[1], decodeURI(split[1]))
    kakaoId = decodeURI(split[0]).split('=')[1]
    kakaoNickname = decodeURI(split[1]).split('=')[1]
    if((kakaoId != undefined) && (kakaoNickname != undefined)){
        $id.val(kakaoId)
        $btIdDupChk.hide()
        $('input[name=submit]').show()
        $id.attr('readonly', true)
        $('input[name=memNick]').val(kakaoNickname)
        $('input[name=memNick]').attr('readonly',true)
    }
    //----- 카카오 로그인 부분 끝 -----


    //--아이디중복확인버튼 클릭이벤트 START--
    $btIdDupChk.click(()=>{
        let url = backURL+'member/iddupchk'
        let method = 'post'
        let data = 'id='+$id.val()
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url:url,
            method:method,
            data: data,
            success: function(jsonObj){
                if(jsonObj.status == 0){
                    alert("아이디 사용 불가")
                    $('input[name=submit]').hide()
                }else if(jsonObj.status == 1){
                    alert("아이디 사용 가능")
                    $('input[name=submit]').show()
                }
            },
            error: function(xhr){
                alert("error:" + xhr.status)
            }
        })
    })
    //--아이디중복확인버튼 클릭이벤트 END--

    //----- 이미지 변경 시작 -----
    let $img = $('img.img')
    function setThumbnail(event) {
        var reader = new FileReader();
        reader.onload = function(event) {
          $img.attr('src',event.target.result)
        }
        reader.readAsDataURL(event.target.files[0]);
      }

    $('input[name=img]').change((event)=>{
        setThumbnail(event)
    })
    //----- 이미지 변경 끝 -----

    //--가입버튼 클릭이벤트 START--
    $('input[name=submit]').click(()=>{
        //비밀번호 유효성 검사
        let $pwd = $('input[name=memPwd]')
        let $pwd1 = $('input[id=pwd2]')

        if($pwd.val() != $pwd1.val()){
            alert("비밀번호가 서로다름")
            $pwd.focus();
            $pwd.select()
            return false
        }

        let $form = $('form')
        let formData = new FormData($form[0])

        let memPower = $('input[name=memPower]:checked').val()
        let memId = $('input[name=memId]').val()
        let memPwd= $('input[name=memPwd]').val()
        let memName= $('input[name=memName]').val()
        let memPhone= $('input[name=memPhone]').val()
        let memSex= $('input[name=memSex]:checked').val()
        let memNick= $('input[name=memNick]').val()
        let memBirth= $('input[name=memBirth]').val()

        formData.append('memPower',memPower)
        formData.append('memId', memId)
        formData.append('memPwd', memPwd)
        formData.append('memName', memName)
        formData.append('memPhone', memPhone)
        formData.append('memSex', memSex)
        formData.append('memNick', memNick)
        formData.append('memBirth', memBirth)

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            processData : false,
            contentType : false,
            method : 'post',
            url : backURL+'member/new',
            data : formData,
            success : function(jsonObj){
                if(jsonObj.status == 1){
                    alert(jsonObj.msg)
                    location= "main.html"
                }else if(jsonObj.status == 0){
                    alert(jsonObj.msg)
                }
            },
            error : function(xhr){
                alert("가입실패! 공백이 있거나 너무 길게 작성했는지 확인하세요")
            }

        })
    })
    //--가입버튼 클릭이벤트 END--

    //-----취소버튼 클릭 이벤트 시작 -----
    $('input.csbt').click(()=>{
        location.href='main.html'
    })
    //-----취소버튼 클릭 이벤트 끝 -----
})