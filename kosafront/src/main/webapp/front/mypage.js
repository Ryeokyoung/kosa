function openNav() {
    document.querySelector(".mySidenav").style.width = '20%';
    document.querySelector('div.center').style.marginLeft = '20%';

}
function closeNav() {
    document.querySelector(".mySidenav").style.width = '0';
    document.querySelector('div.center').style.marginLeft = '0';
}
$(function(){
    let memId
    let memPower
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
            if(jsonObj.status==1){
                $('a.login').hide()
                $('a.signup').hide()
                let nick = jsonObj.nick
                memId = jsonObj.id
                memPower = jsonObj.power
                info(memId)
                $('span.nickname').html(nick+'님 <br>안녕하세요')
            }else if(jsonObj.status==0){
                $('a.logout').hide()
				$('a.mypage').hide()
				$('span.nickname').hide()
            }
        }
    })
    
    
    let $id = $('input[name=memId]')
    let $name = $('input[name=memName]')
    let $nick = $('input[name=memNick]')
    let $Bd = $('input[name=memBirth]')
    let $img = $('img.img')

    //----- 정보 받아오기 시작 -----
    function info(memId){
        $.ajax({
           xhrFields: {
               withCredentials: true
           },
           method: 'post',
           url: backURL+'member/mypage/'+memId,
           success: function(jsonObj){
                let profile = jsonObj.profile
                let m = jsonObj.member
                $id.val(m.memId)
                $name.val(m.memName)
                $nick.val(m.memNick)
                $Bd.val(m.memBirth)
                $img.attr('src','/files/'+profile)
           }
       })
    }
    //----- 정보 받아오기 끝 -----

    //----- 이미지 변경 시작 -----
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






    //--수정버튼 클릭이벤트 START--
    $('input[name=submit]').click(()=>{
        //비밀번호 유효성 검사
        let $pwd = $('input[name=memPwd]')
        let $pwd1 = $('input[id=pwd2]')

        if($pwd.val() != $pwd1.val()){
            alert("비밀번호가 서로다름")
            $pwd.focus()
            $pwd.select()
            return false
        }

        let $form = $('form')
        let formData = new FormData($form[0])

        let memId = $('input[name=memId]').val()
        let memPwd= $('input[name=memPwd]').val()
        let memName= $('input[name=memName]').val()
        let memPhone= $('input[name=memPhone]').val()
        let memSex= $('input[name=memSex]').val()
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
            url : backURL+'member/modify',
            method : 'post',
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
                alert("error :" + xhr.status)
            }

        })
        return false;
    })
    //--수정버튼 클릭이벤트 END--

    //-----회원 탈퇴 이벤트 시작 -----

    $('input[class=delete]').click(()=>{
        console.log(memId)
        if(confirm('진짜 탈퇴할거에요?')){
			$.ajax({
                xhrFields: {
                    withCredentials: true
                },
                method: 'put',
                url : backURL+'member/'+memId,
                success: function(jsonObj){
                    if(jsonObj.status == 1){
                        alert("회원 탈퇴!")
                        location.href='main.html'
                    }else{
                        alert("에러")
                    }
                }
            })
		}else{
		}

    })
    //-----회원 탈퇴 이벤트 끝 -----

    //-----내가게목록 이벤트 시작 -----

    $('input[class=myStore]').click((e)=>{
        location.href = '../project_html/mystore_list.html?memId='+memId
    })
    //-----내가게목록 이벤트 끝 -----

    
})