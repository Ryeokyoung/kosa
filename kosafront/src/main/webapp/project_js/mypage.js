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
                $('input.myStore').hide()
            }
            if(jsonObj.power!=0){
                $('a.storeList').hide()
                $('a.memberlist').hide()
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
    let $phone = $('input[name=memPhone]')
    let $nick = $('input[name=memNick]')
    let $Bd = $('input[name=memBirth]')
    let $img = $('img.img')
    //----- 정보 받아오기 시작 -----
    function info(memId){
        console.log(memId)
        $.ajax({
           xhrFields: {
               withCredentials: true,
           },
           cache: false,
           url: backURL+'member/mypage/'+memId,
           success: function(jsonObj){
                let m = jsonObj.member
                $id.val(m.memId)
                $phone.val(m.memPhone)
                $name.val(m.memName)
                $nick.val(m.memNick)
                $Bd.val(m.memBirth)
                console.log(m.memSex)
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
           }
       })
    }
    //----- 정보 받아오기 끝 -----
    //----- 정보 받아오기 끝 -----

    //----- 이미지 받아오기 시작 -----
    function getImg(id){
    //     let sampleFileNames = ['C0001.jpg', 'C0002.jpg']//파일이름들
    //     sampleFileNames.forEach((fileName, index) => {
        let imgObj = $('img').eq(index)
        $.ajax({
            xhrFields: {
                withCredential: true,
                responseType: 'blob'//이미지 다운로드용 설정
            },
            cache: false, //이미지 다운로드용 설정
            url: backURL+'download/profile/'+ Id,
            method: 'get',
            success: function (responseData) {
                let blobStr = URL.createObjectURL(responseData)
                imgObj.attr('src', blobStr)
            }
        })
    }

    //----- 이미지 받아오기 끝 -----

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
                    location= "mypage.html"
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
        location.href = 'mystore_list.html?memId='+memId
    })
    //-----내가게목록 이벤트 끝 -----

    //-----취소버튼 클릭 시작 -----
    $('input.cancel').click(()=>{
        location.href='main.html'
    })
    //-----취소버튼 클릭 끝 -----
    
})