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
    let $logout = $('a.logout')
    $logout.click(()=>{
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL+'member/logout',
            success: function(){
                location.href=frontURL+'project_html/main.html'
            }
        })
    })

    // ----- 아이디찾기 시작 ----- //
    $('input.id').click(()=>{
        if($('input[name=data]').val() == ''){
            alert('이름을 입력하세요')
            return false
        }else if($('input[name=phone]').val() == ''){
            alert('전화번호를 입력하세요')
            return false
        }else{
            let name = $('input[name=data]').val()
            let phone = $('input[name=phone]').val()
            let info = {}
            info.memName = name
            info.memPhone = phone
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method : 'post',
                url : backURL+'member/findid',
                data : JSON.stringify(info),
                headers: {'Content-Type': 'application/json'},
                success: function(jsonObj){
                    if(jsonObj.status == 1){
                        alert("아이디는 "+jsonObj.memId + "입니다.")
                    }else{
                        alert("아이디 찾기 실패!")
                    }
                }
            })
        }
    })
    // ----- 아이디찾기 끝 ----- //

    // ----- 비밀번호찾기 시작 ----- //
    $('input.pwd').click(()=>{
        if($('input[name=data2]').val() == ''){
            alert('아이디를 입력하세요')
            return false
        }else if($('input[name=phone2]').val() == ''){
            alert('전화번호를 입력하세요')
            return false
        }else{
            let name = $('input[name=data2]').val()
            let phone = $('input[name=phone2]').val()
            let info = {}
            info.memId = name
            info.memPhone = phone
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method : 'post',
                url : backURL+'member/findpwd',
                data : JSON.stringify(info),
                headers: {'Content-Type': 'application/json'},
                success: function(jsonObj){
                    if(jsonObj.status == 1){
                        alert("비밀번호는 "+jsonObj.memPwd + "입니다.")
                    }else{
                        alert("비밀번호 찾기 실패!")
                    }
                }
            })
        }
    })
    // ----- 비밀번호찾기 끝 ----- //
})
// function mysubmit(index){
//     //아이디 찾기
//     if(index == 1){
//         //이름을 입력하지 않았다면
//         if($('#name').val()==""){
//             alert("이름을 입력하세요.");
//         //전화번호를 입력하지 않았다면
//         }else if($('#phone1').val()==""){
//             alert("전화번호를 입력하세요.");
//         }
//         //서버로 폼 데이터 보내기
//         $('#id_form').submit();
//     //비번 찾기
//     }else if(index ==2){
//         if($('#id').val()==""){
//             alert("아이디를 입력하세요.");
//         }else if($('#phone2').val()==""){
//             alert("전화번호를 입력하세요.");
//         }
//         $('#pwd_form').submit(); 
//     }
// }
