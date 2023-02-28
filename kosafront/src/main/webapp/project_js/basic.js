let backURL = 'http://192.168.2.22:9999/kosaproject/'
let frontURL='http://192.168.2.22:5500/kosafront/src/main/webapp/'
let id
function openNav() {
    document.querySelector(".mySidenav").style.width = '20%'
    document.querySelector('div.center').style.marginLeft = '20%'
}
function closeNav() {
    document.querySelector(".mySidenav").style.width = '0'
    document.querySelector('div.center').style.marginLeft = '0'
}

$(function(){
    let $logout = $('a.logout')
    $logout.click(()=>{
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: backURL+'member/logout',
            success: function(){
                location.href='main.html'
            }
        })
    })

    // ----- 로고 클릭 이벤트 시작 -----
    $('header>img').click(()=>{
        location.href = 'main.html'
    })
    $('header>span.title').click(()=>{
        location.href = 'main.html'
    })
    // ----- 로고 클릭 이벤트 끝 -----
})