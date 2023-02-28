$(function () {
    // $('div.content').click(function(){
    //     alert('div.content')
    // })

    // $('div.reviewwrite').click(function(){
    //     alert('div.reviewwrite')
    // })
    // $('div.container').click(function(){
    //     alert('div.container')
    // })

    // $('form').submit(function(){
    //     alert('form.submit')
    // })
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
         //setThumbnail(event)
         return false
     })
     $('div.buttonContainer').click(()=>{
         $img.show()
         $('div.fileContainer').hide()
     })
     //----- 이미지 변경 끝 -----
     

     // ----- 리뷰 올리기 시작 -----
     $('div.ButtonSC>button.SubmitButton').click(function(){
        // let $form = $('form.file')
        //  let formData = new FormData($form[0])
        let formData = new FormData()
        formData.append('chooseFile', $('input[name=chooseFile]').prop('files')[0])
        //"fImg", fileInput.files[0], "/C:/files/a.png");
         let star = $('input[name=reviewStar]').val()
         let content = $('textarea.content').val()
    
    
         formData.append('reviewStar', star)
         formData.append('reviewDes', content)
         formData.append('stNum', stNum)

         formData.forEach((value, key)=>{
console.log(value)
         })
         //$form.attr('action', 'http://www.google.com')

     /*    $.ajax({
            xhrFields: {
                withCredentials: true
            },
            // url: backURL+'review/write',
            // method: 'post',
            //data : 'reviewStar=' + star + "&reviewDes=" + content + "&stNum=" + stNum ,
            // processData: false, //파일업로드용 설정
            // contentType: false, //파일업로드용 설정
            url: backURL+'review/write',
            // method: 'post',
            data: formData,
           // async: false,


           "method": "POST",
           "timeout": 0,
           "processData": false,
           "mimeType": "multipart/form-data",
           "contentType": false,

            success: function(jsonObj){
                alert('리뷰 등록 성공!' + jsonObj.url)
                // if(jsonObj.status == 1){
                //    alert('리뷰 등록 성공!' + jsonObj.url)
                //  // location.href = jsonObj.url //'http://www.naver.com'//'../project_html/main.html'
                //   location.replace(jsonObj.url)
                   
                   
                // }else{
                //     alert('리뷰 등록 실패!')
                // }
            },

        
            error : function(xhr){
                alert(xhr.responseText)
            }
         })
        // location.href = 'http://www.naver.com'
         return false
  
*/


        var settings = {
            "url": backURL+'review/write',
            "method": "POST",
            "timeout": 0,
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": formData
        };
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        return false

   })

     // ----- 리뷰 올리기 끝 -----

    //  $('form.file').submit(()=>{
    //     alert('form submitted')
    //     return false
    //  })

  
})


function loadFile(input) {
    var file = input.files[0];	//선택된 파일 가져오기

    //미리 만들어 놓은 div에 text(파일 이름) 추가
    var name = document.getElementById('fileName');
    name.textContent = file.name;

  	//새로운 이미지 div 추가
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);   

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지를 숨긴다
    newImage.style.objectFit = "contain";

    //이미지를 image-show div에 추가
    var container = document.getElementById('image-show');
    container.appendChild(newImage);
};


