function filter() {
	let search = document.getElementById("search").value.toLowerCase();
	let listInner = document.getElementsByClassName("detail");
	for (let i = 0; i < listInner.length; i++) {
		store = listInner[i].getElementsByClassName("store2");
		if (store[0].innerHTML.toLowerCase().indexOf(search) != -1) {
			listInner[i].style.display = "inline-block"
		} else {
			listInner[i].style.display = "none"
		}
	}
}







function openNav() {
	document.querySelector(".mySidenav").style.width = '20%';
	document.querySelector('div.center').style.marginLeft = '20%';
}
function closeNav() {
	document.querySelector(".mySidenav").style.width = '0';
	document.querySelector('div.center').style.marginLeft = '0';
}
$(function(){
	$.ajax({
		url: backURL+'session',
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
				$('span.nickname').html(nick+'님 <br>안녕하세요')
			}else if(jsonObj.status==0){
				$('a.logout').hide()
				$('a.mypage').hide()
				$('span.nickname').hide()
			}
		}
	})

	let $content = $('div.detail')
    function showList(){
        $.ajax({
            url : backURL +'search',
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
                }
                $content.remove();
            }
        })
    }
	showList()
	const urlParams = new URL(location.href).searchParams;
	$('input[name=search]').attr('value',urlParams.get('q'));
})