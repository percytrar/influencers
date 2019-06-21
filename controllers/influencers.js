const axios = require('axios');

const ITEMS_PER_PAGE = 20;

exports.getInfluencers = (req,res)=>{
    console.log('Inside Influencer!');
    console.log(req.query);
    let page = +req.query.page || 1;    
    axios.get('http://demo4469839.mockable.io/influencers')
    .then((influencerData)=>{
        const influencers = influencerData.data.data.allInfluencers;
        const allInfluencers = influencers.length;
        
        let lastPage = Math.ceil(allInfluencers / ITEMS_PER_PAGE);
        if(req.query.page == "First")
            page = 1;
        else if(req.query.page == "Last")
            page = lastPage;
        const reqInfluencers = influencers.slice((page-1)*ITEMS_PER_PAGE,page*ITEMS_PER_PAGE);        
        res.send({
            influencers:reqInfluencers,
            totalInfluencers:allInfluencers,
            currentPage:page,
            hasNextPage:ITEMS_PER_PAGE*page < allInfluencers,
            hasPreviousPage:page>1,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:lastPage,
        });
    })    
    .catch((err)=>{
        console.log(err);
    })
}