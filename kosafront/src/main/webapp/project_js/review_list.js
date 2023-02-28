$(function(){
    //기본 js
    let $center = $('.center')
    let $side = $('.mySidenav')
    let $menu = $('span.menu')
    let $close = $('section>a.closebtn')

    $menu.click(()=>{      
        $side.width('20%')
        $center.css('marginLeft','20%')
    })
    $close.click(()=>{
        $side.width(0)
        $center.css('marginLeft',0)
    })


        
        //--게시글 목록보여주기 START--
        function showList(currentPage){
            let $divBoard = $('div.review').not(':first-child') //원본이 아닌 상품        
            $divBoard.remove() 
            $.ajax({
                xhrFields:{
                    withCredentials : true
                },
                url: backURL + 'reviewlist',
                data : 'currentPage=' + currentPage,
                success: function(jsonObj){
                    let $reviewlist = $('div.reviewlist')
                    let $reviewOrigin = $('div.reviewlist>div.review:first-child') //원본
    
                    let list = jsonObj.list
                    $(list).each((index, review)=>{
                        let $reviewCopy = $reviewOrigin.clone() //복제본
    
                        $reviewCopy.find('div.reviewNo').html(review.reviewNo)
                        let depth = '';
                        for(let i=1; i<review.level; i++){
                            depth += '&#10132;'
                        }
                       // $reviewCopy.find('div.reviewTitle').html(depth + review.reviewTitle)
                        $reviewCopy.find('div.memId').html(review.reviewC.id)
                        $reviewCopy.find('div.reviewDate').html(review.reviewDt)
                        $reviewlist.append($reviewCopy)
                    })
    
    
                    //페이지목록만들기
                    let startPage = jsonObj.startPage; //페이지목록그룹에서 시작페이지
                    let endPage = jsonObj.endPage;     //페이지목록그룹에서 끝페이지
                    let liStr ='';
                    if(startPage > 1){
                        liStr += '<li class="'+ (startPage-1) + '">PREV<li>'
                    }
    
                    for(let i=startPage; i<=endPage; i++){
                        liStr += '<li'
                        liStr += ' class="'
                        liStr += i
                        if(i == currentPage){ //현재페이지인 경우에는 
                            liStr += ' none'
                        } 
                        liStr += '">' + i +'</li>'
                    }
    
                    let totalPage = jsonObj.totalPage; //총페이지수
                    if(totalPage > endPage){ //4>3
                        liStr += '<li class="'+ (endPage+1) + '">NEXT<li>'
                    }
                    $('div.pages>ul').html(liStr)
                }
            })    
        }
        //--게시글 목록보여주기 END--
    
        //처음엔 1페이지 보여주기
        showList(1)
    
        //--페이지 클릭이벤트 START--    
        let $liPage = $('div.pages li')
    
        //DOM트리에 생성되지 않은 객체이벤트처리는 on함수처리
        //$liPage.click((e)=>{
        $('div.pages>ul').on('click', 'li:not(.none)', (e)=>{
            
            let currentPage = $(e.target).attr('class') //1, 2, 3, 4
            showList(currentPage)
        })
        //--페이지 클릭이벤트 END-- 
    
        //--게시글제목 클릭이벤트 START--
        //$('div.reviewTitle').click(()=>{
        $('div.reviewlist').on('click', 'div.review div.reviewNo', (e)=>{           
            alert('클릭됨')
            let reviewNo = $(e.target).prev('div.reviewNo').html()
            location.href= frontURL+ 'reviewdetail.html?reviewNo='+reviewNo //backURL + '/reviewdetail?reviewNo='+reviewNo
            return false
        })
        //--게시글제목 클릭이벤트 END--
    
        //--게시글쓰기 버튼 클릭 START--
        $('nav>button.write').click(()=>{
            location.href=frontURL+'reviewwrite.html'
            return false
        })
    
        
        //--게시글쓰기 버튼 클릭 END--
        
    })




