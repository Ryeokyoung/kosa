//--수정하기 버튼 클릭 START--
$('div.buttons>button.modify').click(() => {
    let sendData = {}
    sendData.boardNo = $('div.boardNo>span').html().trim()
    sendData.boardTitle = $('div.boarddetail input[name=boardTitle]').val()
    sendData.boardContent = $('div.boarddetail textarea[name=boardContent]').val()
    //    console.log(sendData)
    let formData = new FormData()
    formData.append('boardNo', sendData.boardNo)
    formData.append('boardContent', sendData.boardContent)

    let files = $('input[name=f]').prop('files')
    console.log(files)
    $(files).each((index, value) => {
        formData.append('f', value)
    })

    let fImg = $('input[name=fImg]').prop('files')
    console.log(fImg)
    $(fImg).each((index, value) => {
        formData.append('fImg', value)
    })
    formData.forEach(function (value, name) {
        console.log(name)
        let valueObj = formData.get(name)
        console.log(valueObj)
        console.log('---------------')
    })

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        processData: false, //파일업로드용 설정
        contentType: false, //파일업로드용 설정		
        url: backURL + 'boardmodify',
        method: 'post',
        data: formData,
        success: function () {
            alert('수정성공')
            location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText) //오류내용출력
        }
    })
    return false
})
//--수정하기 버튼 클릭 END--