app.controller('AssetBenchmarkingCtrl',['$rootScope','$scope','$http','$filter','$modal','$state','$anchorScroll','$location',function($rootScope,$scope,$http,$filter,$modal,$state,$anchorScroll,$location){
 
       $scope.esnData1=sessionStorage.getItem("SelectedESN");
       $scope.display2='Hide';
    //Contact Details
    $http.get('json/contactDetails.json').then(function(response){
        $scope.contactDetails = response.data;
      });
    //Engine Details
    $http.get('json/engineDetails.json').then(function(response){
        $scope.engineDetails = response.data;
      });
    //ContactbasePointDetails
    $http.get('json/CBPDetails.json').then(function(response){
        $scope.cbpDetails = response.data;
      });
    //OperatingParameterDetails
    $http.get('json/opDetails.json').then(function(response){
        $scope.opDetails = response.data;
      });
    //SVDetails
    $http.get('json/svDetails.json').then(function(response){
        $scope.svDetails = response.data;
      });
    //Key Parameter Details
    $http.get('json/kpDetails.json').then(function(response){
        $scope.kpDetails = response.data;
      });
    //Previous Summary Details
    $http.get('json/psDetails.json').then(function(response){
        $scope.psDetails = response.data;
      });                                
 
    $scope.aircraftData1=sessionStorage.getItem("SelectedAC");
    $scope.airlinerData1=sessionStorage.getItem("SelectedAL");
    $scope.airlinerData2=sessionStorage.getItem("SelectedAL1");
    $scope.aircraftData2=sessionStorage.getItem("SelectedAC1");
 
    //Aircraft
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/aircraftModel').then(function(response){      
          $scope.aircraftData = response.data;
          });
    //Airliner
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/airlinesList?modelID='+$scope.aircraftData2).then(function(response){
          $scope.airlinerData = response.data;
          });
    //ESN
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/esnList?customerID='+$scope.airlinerData2).then(function(response){
          $scope.esnData = response.data;
          });            
 
 
                $http.get('https://digitalthread-assetbenchmarking-service.run.aws-usw02-pr.ice.predix.io/Benchmark/benchmarkdetails?esn='+$scope.esnData1).then(function(response){
                $scope.cDetail1 = [];
                $scope.eDetail1 = [];
        $scope.Asset1 = response.data;
        // console.log($scope.Asset1.ccpdList[1].serialNumber);
        $scope.cDetail1 = [$scope.Asset1.model,$scope.Asset1.contractstartdate,$scope.Asset1.contractenddate,$scope.Asset1.operatingregion,$scope.Asset1.engineposition,$scope.Asset1.inservicesince,$scope.Asset1.tenureofcontract,$scope.Asset1.drs];
                $scope.eDetail1 = [$scope.Asset1.engineposition,$scope.Asset1.svcount,$scope.Asset1.svdate,$scope.Asset1.sisterengine,$scope.Asset1.tailnumber,$scope.Asset1.oldtailnumber,$scope.Asset1.idct];
        $scope.cbpDetail1 = [$scope.Asset1.utilization,$scope.Asset1.fl,$scope.Asset1.derate,$scope.Asset1.temperature];
                                    $scope.opDetail1 = [$scope.Asset1.csn,$scope.Asset1.tsn,$scope.Asset1.cslv,$scope.Asset1.tslv];
        $scope.svDetail1 = [$scope.Asset1.svprice,$scope.Asset1.svcost,$scope.Asset1.svtype,$scope.Asset1.svreason];
        $scope.psDetail1 = [$scope.Asset1.lastwaterwash_psd,$scope.Asset1.lasteventdate_psd,$scope.Asset1.svreason_psd,$scope.Asset1.svtype_psd,$scope.Asset1.price_psd,$scope.Asset1.cost_psd];
        $scope.kpDetail1 = [{"min":$scope.Asset1.degt_min,"avg":$scope.Asset1.degt_avg,"max":$scope.Asset1.degt_max},
{"min":$scope.Asset1.altitude_min,"avg":$scope.Asset1.altitude_avg,"max":$scope.Asset1.altitude_max},
{"min":$scope.Asset1.oiltemp_min,"avg":$scope.Asset1.oiltemp_avg,"max":$scope.Asset1.oiltemp_max},
{"min":$scope.Asset1.mach_min,"avg":$scope.Asset1.mach_avg,"max":$scope.Asset1.mach_max},
{"min":$scope.Asset1.corespeed_min,"avg":$scope.Asset1.corespeed_avg,"max":$scope.Asset1.corespeed_max},
{"min":$scope.Asset1.fuelflow_min,"avg":$scope.Asset1.fuelflow_avg,"max":$scope.Asset1.fuelflow_max},
{"min":$scope.Asset1.oilpressure_min,"avg":$scope.Asset1.oilpressure_avg,"max":$scope.Asset1.oilpressure_max}];
        $scope.kpDetail1Min = ['Min',$scope.Asset1.degt_min,$scope.Asset1.altitude_min,$scope.Asset1.oiltemp_min,$scope.Asset1.mach_min,$scope.Asset1.corespeed_min,$scope.Asset1.fuelflow_min,$scope.Asset1.oilpressure_min];
        $scope.kpDetail1Avg = ['Avg',$scope.Asset1.degt_avg,$scope.Asset1.altitude_avg,$scope.Asset1.oiltemp_avg,$scope.Asset1.mach_avg,$scope.Asset1.corespeed_avg,$scope.Asset1.fuelflow_avg,$scope.Asset1.oilpressure_avg];
        $scope.kpDetail1Max = ['Max',$scope.Asset1.degt_max,$scope.Asset1.altitude_max,$scope.Asset1.oiltemp_max,$scope.Asset1.mach_max,$scope.Asset1.corespeed_max,$scope.Asset1.fuelflow_max,$scope.Asset1.oilpressure_max];
 
                                //console.log(angular.toJson($scope.kpDetail1));            
      });
 
 
//Airliner Dropdown
  $scope.ChangeAircraftA2=function(val,val1){
 
//     sessionStorage.setItem("SelectedAC",val1);
//     sessionStorage.setItem("SelectedAC1",val); 
    $scope.MidValue=val;
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/airlinesList?modelID='+$scope.MidValue).then(function(response){
      $scope.airlinerDataA2 = response.data;
      });
  
   }
 
 
 
//ESN Dropdown
    $scope.ChangeAirlinerA2=function(val,val1){
 
    // sessionStorage.setItem("SelectedAL",val1);
    // sessionStorage.setItem("SelectedAL1",val);
    $scope.CidValue=val;
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/esnList?customerID='+$scope.CidValue).then(function(response){
      $scope.esnDataA2 = response.data;
      console.log($scope.esnDataA2);
      });
   
   }
 
//Asset1 Table
   $scope.ChangeESNA1=function(val){
      $scope.esnDataA1=val;   
      sessionStorage.setItem("SelectedESN",$scope.esnDataA1);
      $http.get('https://digitalthread-assetbenchmarking-service.run.aws-usw02-pr.ice.predix.io/Benchmark/benchmarkdetails?esn='+$scope.esnDataA1).then(function(response){
        //console.log(response.data);
            $scope.cDetail1 = [];
            $scope.eDetail1 = [];
            $scope.cbpDetail1 = [];
            $scope.opDetail1 = [];
            $scope.svDetail1 = [];
            $scope.Asset1 = response.data;
            $scope.cDetail1 = [$scope.Asset1.model,$scope.Asset1.contractstartdate,$scope.Asset1.contractenddate,$scope.Asset1.operatingregion,$scope.Asset1.engineposition,$scope.Asset1.inservicesince,$scope.Asset1.tenureofcontract,$scope.Asset1.drs];
            $scope.eDetail1 = [$scope.Asset1.engineposition,$scope.Asset1.svcount,$scope.Asset1.svdate,$scope.Asset1.sisterengine,$scope.Asset1.tailnumber,$scope.Asset1.oldtailnumber,$scope.Asset1.idct];
            $scope.cbpDetail1 = [$scope.Asset1.utilization,$scope.Asset1.fl,$scope.Asset1.derate,$scope.Asset1.temperature];
            $scope.opDetail1 = [$scope.Asset1.csn,$scope.Asset1.tsn,$scope.Asset1.cslv,$scope.Asset1.tslv];
            $scope.svDetail1 = [$scope.Asset1.svprice,$scope.Asset1.svcost,$scope.Asset1.svtype,$scope.Asset1.svreason];
            $scope.psDetail1 = [$scope.Asset1.lastwaterwash_psd,$scope.Asset1.lasteventdate_psd,$scope.Asset1.svreason_psd,$scope.Asset1.svtype_psd,$scope.Asset1.price_psd,$scope.Asset1.cost_psd];
            $scope.kpDetail1 = [{"min":Min,"avg":Avg,"max":Max},{"min":$scope.Asset1.degt_min,"avg":$scope.Asset1.degt_avg,"max":$scope.Asset1.degt_max},
{"min":$scope.Asset1.altitude_min,"avg":$scope.Asset1.altitude_avg,"max":$scope.Asset1.altitude_max},
{"min":$scope.Asset1.oiltemp_min,"avg":$scope.Asset1.oiltemp_avg,"max":$scope.Asset1.oiltemp_max},
{"min":$scope.Asset1.mach_min,"avg":$scope.Asset1.mach_avg,"max":$scope.Asset1.mach_max},
{"min":$scope.Asset1.corespeed_min,"avg":$scope.Asset1.corespeed_avg,"max":$scope.Asset1.corespeed_max},
{"min":$scope.Asset1.fuelflow_min,"avg":$scope.Asset1.fuelflow_avg,"max":$scope.Asset1.fuelflow_max},
{"min":$scope.Asset1.oilpressure_min,"avg":$scope.Asset1.oilpressure_avg,"max":$scope.Asset1.oilpressure_max}];
        //console.log(angular.toJson($scope.eDetail1));        
            $scope.kpDetail1Min = ['Min',$scope.Asset1.degt_min,$scope.Asset1.altitude_min,$scope.Asset1.oiltemp_min,$scope.Asset1.mach_min,$scope.Asset1.corespeed_min,$scope.Asset1.fuelflow_min,$scope.Asset1.oilpressure_min];
            $scope.kpDetail1Avg = ['Avg',$scope.Asset1.degt_avg,$scope.Asset1.altitude_avg,$scope.Asset1.oiltemp_avg,$scope.Asset1.mach_avg,$scope.Asset1.corespeed_avg,$scope.Asset1.fuelflow_avg,$scope.Asset1.oilpressure_avg];
            $scope.kpDetail1Max = ['Max',$scope.Asset1.degt_max,$scope.Asset1.altitude_max,$scope.Asset1.oiltemp_max,$scope.Asset1.mach_max,$scope.Asset1.corespeed_max,$scope.Asset1.fuelflow_max,$scope.Asset1.oilpressure_max];
          });   
    }
 
 
//Airliner Dropdown
  $scope.ChangeAircraftA1=function(val){
  
    $scope.aircraftData2=val;   
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/airlinesList?modelID='+$scope.aircraftData2).then(function(response){
              $scope.airlinerData = response.data;
              });
  
   }
 
//ESN Dropdown
    $scope.ChangeAirlinerA1=function(val){
  
    $scope.airlinerData2=val;
     $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/esnList?customerID='+$scope.airlinerData2).then(function(response){
              $scope.esnData = response.data;
              });
   
   }  
 
   $scope.ChangeESNA2=function(val){
    $scope.display2='show';
    //$scope.esnData3=906290;
    debugger
   //   sessionStorage.setItem("SelectedESN",$scope.esnData3);   
                                $http.get('https://digitalthread-assetbenchmarking-service.run.aws-usw02-pr.ice.predix.io/Benchmark/benchmarkdetails?esn='+val).then(function(response){
                                 
      //debugger
      console.log(response.data);
                                                $scope.cDetail2 = [];
                                                $scope.eDetail2 = [];
            $scope.cbpDetail2 = [];
            $scope.opDetail2 = [];
            $scope.svDetail2 = [];
                                        $scope.Asset2 = response.data;
            $scope.cDetail2 = [$scope.Asset2.model,$scope.Asset2.contractstartdate,$scope.Asset2.contractenddate,$scope.Asset2.operatingregion,$scope.Asset2.engineposition,$scope.Asset2.inservicesince,$scope.Asset2.tenureofcontract,$scope.Asset2.drs];
            $scope.eDetail2 = [$scope.Asset2.engineposition,$scope.Asset2.svcount,$scope.Asset2.svdate,$scope.Asset2.sisterengine,$scope.Asset2.tailnumber,$scope.Asset2.oldtailnumber,$scope.Asset2.idct];
            $scope.cbpDetail2 = [$scope.Asset2.utilization,$scope.Asset2.fl,$scope.Asset2.derate,$scope.Asset2.temperature];
            $scope.opDetail2 = [$scope.Asset2.csn,$scope.Asset2.tsn,$scope.Asset2.cslv,$scope.Asset2.tslv];
            $scope.svDetail2 = [$scope.Asset2.svprice,$scope.Asset2.svcost,$scope.Asset2.svtype,$scope.Asset2.svreason];
            $scope.psDetail2 = [$scope.Asset2.lastwaterwash_psd,$scope.Asset2.lasteventdate_psd,$scope.Asset2.svreason_psd,$scope.Asset2.svtype_psd,$scope.Asset2.price_psd,$scope.Asset2.cost_psd];
            $scope.kpDetail2 = [{"min":$scope.Asset2.degt_min,"avg":$scope.Asset2.degt_avg,"max":$scope.Asset2.degt_max},
{"min":$scope.Asset2.altitude_min,"avg":$scope.Asset2.altitude_avg,"max":$scope.Asset2.altitude_max},
{"min":$scope.Asset2.oiltemp_min,"avg":$scope.Asset2.oiltemp_avg,"max":$scope.Asset2.oiltemp_max},
{"min":$scope.Asset2.mach_min,"avg":$scope.Asset2.mach_avg,"max":$scope.Asset2.mach_max},
{"min":$scope.Asset2.corespeed_min,"avg":$scope.Asset2.corespeed_avg,"max":$scope.Asset2.corespeed_max},
{"min":$scope.Asset2.fuelflow_min,"avg":$scope.Asset2.fuelflow_avg,"max":$scope.Asset2.fuelflow_max},
{"min":$scope.Asset2.oilpressure_min,"avg":$scope.Asset2.oilpressure_avg,"max":$scope.Asset2.oilpressure_max}];
            $scope.kpDetail2Min = ['Min',$scope.Asset2.degt_min,$scope.Asset2.altitude_min,$scope.Asset2.oiltemp_min,$scope.Asset2.mach_min,$scope.Asset2.corespeed_min,$scope.Asset2.fuelflow_min,$scope.Asset2.oilpressure_min];
        $scope.kpDetail2Avg = ['Avg',$scope.Asset2.degt_avg,$scope.Asset2.altitude_avg,$scope.Asset2.oiltemp_avg,$scope.Asset2.mach_avg,$scope.Asset2.corespeed_avg,$scope.Asset2.fuelflow_avg,$scope.Asset2.oilpressure_avg];
        $scope.kpDetail2Max = ['Max',$scope.Asset2.degt_max,$scope.Asset2.altitude_max,$scope.Asset2.oiltemp_max,$scope.Asset2.mach_max,$scope.Asset2.corespeed_max,$scope.Asset2.fuelflow_max,$scope.Asset2.oilpressure_max];
                                      });
   }
  // $scope.ChangeESNA2();
 
/*var selectIds = $('#collapse1,#collapse2,#collapse3,#collapse4,#collapse5,#collapse6,#collapse7,#collapse8');
$(function ($) {
    selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
        $(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    })
}); */ 


$('.closeall').click(function(){
$('.openall').show();
  $('.panel-collapse.in')
    .collapse('hide');
     $('.closeall').hide();
});
$('.openall').click(function(){
 $('.closeall').show();
  $('.panel-collapse:not(".in")')
    .collapse('show');
      $('.openall').hide();
});

var selectIds = $('#collapse1,#collapse2,#collapse3,#collapse4,#collapse5,#collapse6,#collapse7,#collapse8');
$(function ($) {

    selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
        $(this).prev().find('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
    })
}); 
 
$(function() {
        $('.ui.dropdown').dropdown();
});
 
$("#Aircraft1").change( function() {
        $("#Airliner1").removeAttr("disabled");
});
 
$("#Aircraft1").change( function() {
       $("#ESN1").removeAttr("disabled");
});
 
// $(function() {
//   $('.table-responsive').responsiveTable({options});
// });
 
 
}]);