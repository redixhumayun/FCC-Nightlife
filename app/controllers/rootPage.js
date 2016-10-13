(function(){
    $(document).ready(function(){
        //var retrieved_data = sessionStorage.getItem('data');
        
        // if(retrieved_data !== null){
        //     $('.search-list').append(retrieved_data);
        //     sessionStorage.removeItem('data');
        // }
        
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
        
        //this is for the form to submit when enter is pressed
        $('.form-control').keyup(function(e){
           if(e.keyCode == 13){
               console.log($(this).val());
               makeHTTPRequest($(this).val());
           } 
        });
        
        //this is when the going to button is clicked
        $('.search-list').on('click', '.btn-default', function(){
           var dataToPass = {};
           dataToPass.button = $(this).attr('id');
           dataToPass = JSON.stringify(dataToPass);
           console.log(dataToPass);
          ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', '/going-to', dataToPass, function(data){
              if(data == 'User is not authenticated'){
                  console.log('inside this if statement');
                  window.open('/auth/facebook', '_self');
              }
          }));
        });
        
    });
})();

//image sizes of the yelp images are 100x100px
function makeHTTPRequest(value){
    var objectToPass = {};
    objectToPass.text = value;
    objectToPass = JSON.stringify(objectToPass);
    //make the ajax request to root route and then to yelp to get back search results
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', '/', objectToPass, function(data){
        data = JSON.parse(data);
        populateList(data.businesses);
        
    }));
}

//using this function to dynamically create a list for the user
function populateList(data){
    var stored_html; //using this variable to store all data for next refresh when user authenticates
    
    for(var i = 0; i < data.length; i++){
        var html = '<li class="list_item"><a href="'+data[i].url+'"class="image"><img src="'+data[i].image_url+'"/></a>';
        html += '<div class="content-container"><p class="bar-title">'+data[i].name+'</p>';
        
        //this is to reduce the length of the snippet 
        html += '<p>'+data[i].snippet_text.substring(0,120)+'</p>'; //reducing the length of the snippet here
        html += '<img src="'+data[i].rating_img_url+'"/></div>';
        html += '<div class="btn btn-group"><button type="button" class="btn btn-default btn-going" id="'+data[i].id+'"><span>Going</span></button></div></li>';
        $('.search-list').append(html);
        stored_html += html;
    }
    sessionStorage.setItem('data', stored_html); //setting the session storage item here
}
