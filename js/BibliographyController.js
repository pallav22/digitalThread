app.controller('BibliographyCTRL',['$rootScope','$scope','$http','$filter','$modal','$state',function($rootScope,$scope,$http,$filter,$modal,$state){

$("#SourceOfDataLink").click(function() {

    $('html,body').animate({
       
        scrollTop: $("#SourceOfData").offset().top},
        'slow');
});
$("#WeibullAnalysisLink").click(function() {
  
    $('html,body').animate({
        
        scrollTop: $("#WeibullAnalysis").offset().top},
        'slow');
});

$("#WishListLink").click(function() {

    $('html,body').animate({
        
        scrollTop: $("#Wishlist").offset().top},
        'slow');
});
$('#Top').on('click', function(){
    $('html,body').animate({scrollTop: $("#Nav").offset().top}, 'slow');
});
$('#Top1').on('click', function(){
    $('html,body').animate({scrollTop: $("#Nav").offset().top}, 'slow');
});
$('#Top2').on('click', function(){
    $('html,body').animate({scrollTop: $("#Nav").offset().top}, 'slow');
});

   $('li').click(function() {
    $("li.active").removeClass("active");
    $(this).addClass('active');
    });

}])