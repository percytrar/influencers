const DEFAULT_PIC = './assets/unknown.png';

showInfluencer = (pageNo)=>{
    pageNo = pageNo || 1;
    $('#influencers').empty();
    $.get('/influencers',{page: pageNo},(data)=>{
        // console.log(data);
        data.influencers.map((influencer)=>{
            let src = influencer.picture;
            let followers = influencer.stats.followerCount;
            let likesRatio = influencer.stats.engagement.avgLikesRatio;
            let commentsRatio = influencer.stats.engagement.avgCommentsRatio;
            let interests = influencer.stats.interests.toString();
            $('#influencers')
            .append(
                $('<div>')
                .append(
                    $('<h1>')
                    .text(influencer.username)
                    .addClass('card-header'),
                    $('<div>')
                    .append(
                        $(`<img src=${src} onerror="this.onerror=null;this.src='${DEFAULT_PIC}';"
                        style='width:200px;height:200px'>`)
                        .addClass('rounded float-left col-lg-3'),
                        $(`<h3><em style="color:#DC3545">Followers:</em> <strong>${followers || 'N.A.'}</strong></h3>`)
                        .addClass('col-lg-3 text-right font pt-2 text-muted'),
                        $(`<h4><em style="color:#DC3545">Likes Ratio:</em> <strong>${likesRatio || 'N.A.'}</strong></h4>`)
                        .addClass('col-lg-2 text-right font pt-2  text-muted'),
                        $(`<h4><em style="color:#DC3545">Comments Ratio:</em> <strong>${commentsRatio || 'N.A.'}</strong></h4>`)
                        .addClass('col-lg-2 text-right font pt-2 text-muted'),
                        $(`<h4><em style="color:#DC3545">Interests:</em> <strong>${interests || 'N.A.'}</strong></h4>`)
                        .addClass('col-lg-2 text-right font pt-2 text-muted')
                    )
                    .addClass('row col-lg p-5')
                )
                .addClass('card m-5 text-center rounded')
                .hover(function(){
                    $(this).addClass('shadow');
                },
                function(){
                    $(this).removeClass('shadow');
                })
            );
        });        
        $('#currentPage').text(data.currentPage);
        if(data.hasPreviousPage){
            $('#previousPage').parent().removeClass('disabled');
            $('#previousPage').text(data.previousPage);
        }else{
            $('#previousPage').parent().addClass('disabled');
            $('#previousPage').text('...');
        }
        if(data.hasNextPage){
            $('#nextPage').parent().removeClass('disabled');
            $('#nextPage').text(data.nextPage);
        }else{
            $('#nextPage').parent().addClass('disabled');
            $('#nextPage').text('...');
        }        
    });    
}

$('.page-link').click((e)=>{
    // $(this).toggleClass('active');
    pageNo = $(e.target).text();    
    showInfluencer(pageNo);
});

showInfluencer();