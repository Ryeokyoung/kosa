$(function(){
    let queryStr = location.search
    let arr = queryStr.substring(1).split('=')
    let cate = arr[1]
    let $content = $('div.detail')
    $.ajax({
        url: backURL+'catelist',
        data : 'cate='+cate,
        success: function(jsonObj){
            if(jsonObj.status == 1){
                $contents=$('div.content') //원본
                $content.show()
                let storeList = jsonObj.storeList
                $(storeList).each(function(index,s){
                    let $copyst = $content.clone() //복제본
                    $copyst.find('a.store2').html(s.st_name)
                    $contents.append($copyst)
                })
                $content.remove()
            }
        }
	})
    $.ajax({
        url: backURL+'session',
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
    let $logout = $('a.logout')
    $logout.click(()=>{
        $.ajax({
            url: backURL+'logout',
            success: function(){
                location.href=frontURL+'project_html/main.html'
            }
        })
    })
    
})