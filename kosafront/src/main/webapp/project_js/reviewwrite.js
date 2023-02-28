$(function () {
    let nick
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
                nick = jsonObj.nick
                $('span.nickname').html(nick+'님 <br>안녕하세요')
            }else if(jsonObj.status==0){
                $('a.logout').hide()
				$('a.mypage').hide()
				$('span.nickname').hide()
            }
        }
    })
    let stNum = location.search.substring(1).split('=')[1]


    //--글자수 제한 
    $('.text_box textarea').keyup(function () {
        var content = $(this).val();

        $('.text_box .count span').html(content.length);
        if (content.length > 200) {
            alert("최대 200자까지 입력 가능합니다.");
            $(this).val(content.substring(0, 200));
            $('.text_box .count span').html(200);
        }
        return false
    });

    //----- 이미지 변경 시작 -----
    let $img = $('img.img')
    $img.hide()
    function setThumbnail(event) {
        var reader = new FileReader();
        reader.onload = function(event) {
          $img.attr('src',event.target.result)
          $('div.fileInput>p#fileName').html($('input[name=chooseFile]').val())
        }
        reader.readAsDataURL(event.target.files[0]);
      }
     $('input[name=chooseFile]').change((event)=>{
        setThumbnail(event)
    })
    $('div.buttonContainer').click(()=>{
        $img.show()
        $('div.fileContainer').hide()
    })
    //----- 이미지 변경 끝 -----
     

    //----- 리뷰 올리기 시작 -----
    $('button.SubmitButton').click(()=>{
        let formData = new FormData()
        let reviewStar = $('input[type=radio]:checked').val()
        let reviewDes = $('textarea.content').val()
        
        formData.append("reviewStar",reviewStar)
        formData.append("reviewDes",reviewDes)
        formData.append("stNum",stNum)
        formData.append("memNick", nick)
        formData.append("chooseFile",$('input[name=chooseFile]').prop("files")[0])
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            processData : false,
            contentType : false,
            url: backURL+'review/write',
            method: 'post',
            data: formData,
            success: function(jsonObj){
                if(jsonObj.status==1){
                    alert("리뷰 등록 성공!")
                    location.href = 'storedetail.html?stNum='+stNum
                }else{
                    alert("리뷰 등록 실패!")
                }
            }
        })
    })
    // ----- 리뷰 올리기 끝 -----
    
    // ----- 취소 버튼 클릭 이벤트 시작 -----
    $('button.CancelButton').click(()=>{
        location.href='storedetail.html?stNum='+stNum
    })
    // ----- 취소 버튼 클릭 이벤트 시작 -----
})


     
  
   






















