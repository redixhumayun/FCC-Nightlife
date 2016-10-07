(function(){
    $(document).ready(function(){
        
        //this brings out the input box for when the user clicks on the search icon
        $('.glyphicon-search').on('click', function(){
           $('.input-group').removeClass('hidden');
           $('.glyphicon-search').css('visibility', 'hidden');
           $('.glyphicon-remove').removeClass('hidden');
        });
        //this hides the input box when the user clicks the x 
        $('.glyphicon-remove').on('click', function(){
           $('.glyphicon-search').css('visibility', 'visible');
           $('.input-group').addClass('hidden');
           $('.glyphicon-remove').addClass('hidden');
        });
        
        $('.form-control').keyup(function(e){
           if(e.keyCode == 13){
               console.log($(this).val());
               makeHTTPRequest($(this).val());
           } 
        });
        
        
    });
})();
//image sizes of the yelp images are 100x100px
function makeHTTPRequest(value){
    var objectToPass = {};
    objectToPass.text = value;
    objectToPass = JSON.stringify(objectToPass);
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', '/', objectToPass, function(data){
        data = JSON.parse(data);
        console.log(typeof data);
        console.log(data);
        populateList(data);
    }));
}

function populateList(data){
    for(var i = 0; i < data.length; i++){
        var html = '<li class="list_item"><a href="'+data[i].url+'"class="image"><img src="'+data[i].image_url+'"/></a>';
        html += '<div class="content-container"><p class="bar-title">'+data[i].name+'</p>';
        checkLengthOfSnippet(data[i].snippet_text, function(response){
            html += '<p>'+response+'</p>';
            html += '<img src="'+data[i].rating_img_url+'"/></div></li>'
            $('.search-list').append(html);
        });
        
    }
}

function checkLengthOfSnippet(text, callback){
    if(text.length > 150){
        text = text.substring(0,120)+'...';
        callback(text);
    }
}