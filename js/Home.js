app.controller('HomeCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

    $('li').click(function() {
    $("li.active").removeClass("active");
    $(this).addClass('active');
    });

}])
