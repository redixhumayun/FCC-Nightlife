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

function makeHTTPRequest(value){
    var objectToPass = {};
    objectToPass.text = value;
    objectToPass = JSON.stringify(objectToPass);
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', '/', objectToPass ,function(data){
        console.log(data);
    }));
}