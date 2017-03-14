app.controller('AssetHealthByDateCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

     $scope.Title="";
     $scope.selecteddata1="Filter";
     $scope.selecteddata="";
     $scope.display1="Hide";
     $scope.display2="Hide";
     $scope.display3="Hide";
     $scope.display4="Hide";
     $scope.display7="Hide";
     $scope.ParameterSelected="";
     $scope.ParameterSelectedkey="";
     $scope.AlertData=[];
     $scope.ParameterKey=0;
     $scope.position="Nowhere";
     $scope.UTCofCurrentDate=[];
     $scope.ParameterSelected="";
     $scope.max=500;
     $scope.min=100;
     $scope.x="";
     $scope.y="";
     $scope.startDate="";
     $scope.endDate="";
     $scope.ValueTag="";
     $scope.QuickLinksdisplay="Hide";
     $scope.EventSelected="";
         $scope.ChartData = [];
    $scope.AlertData=[];
    $scope.FirstAlertPoint=[];
      $scope.FullSv=[];
    $scope.FirstFullSvPoint=[];
      $scope.QTSV=[];
    $scope.FirstQTSVPoint=[];
      $scope.TailChange=[];
    $scope.FirstTailChangePoint=[];
      $scope.Warranty=[];
    $scope.FirstWarrantyPoint=[];
      $scope.WaterWash=[];
    $scope.FirstWaterWashPoint=[];
      $scope.Event=[];
    $scope.FirstEventPoint=[];
      $scope.ThrustRatingChange=[];
    $scope.FirstThrustRatingChangePoint=[];
      $scope.LLP=[];
    $scope.FirstLLPPoint=[];
      $scope.CMR=[];
    $scope.FirstCMRPoint=[];
      $scope.ForecastedSV=[];
    $scope.FirstForecastedSVPoint=[];
    $scope.url="";
      $scope.esn=0;
    
    $scope.FutureData=[];
    $scope.FirstPoint=[];
    $scope.FuturePoints=[];
    $scope.FirstFuturePoint=[];
    $scope.PlotLine=[];
    

    $('li').click(function() {
    $("li.active").removeClass("active");
    $(this).addClass('active');
    });

       $scope.airlinerData1=sessionStorage.getItem("SelectedAL");
       $scope.aircraftData1=sessionStorage.getItem("SelectedAC");
       $scope.esnData1=sessionStorage.getItem("SelectedESN");

     $scope.currentDate=new Date();
     var year=$filter('date')(new Date($scope.currentDate),"yyyy");  
     var month=$filter('date')(new Date($scope.currentDate),"M"); 
     var day=$filter('date')(new Date($scope.currentDate),"d"); 
     $scope.UTCofCurrentDate.push(Date.UTC(year,month,1,1,1));
     

        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            chart: {
            style: {
            fontFamily: 'geInspira',
            fontWeight:'bold'
           
            }
         }
        });

    $("#parameterRowIcon").hide();
    $("#parameterRowLabel").hide(); 
    $('#GetTableDataforParameter').hide();



$scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
} 

  
$("#Aircraft").change( function() {
        $("#Airliner").removeAttr("disabled");
});

$("#Aircraft").change( function() {
        $("#ESN").removeAttr("disabled");
});

$("#ESN").change( function() {
        $("#Parameter").removeAttr("disabled");
});

$(function() {
        $('.ui.dropdown').dropdown();
});


$(".dropdown-menu li").click( function() {
        $scope.selecteddata = $(this).text();
        $scope.display1="Show";
        $scope.display2="Hide";
        $scope.display3="Show";
        if($scope.selecteddata==="Alert"){
          $scope.url="images/alert-icon.png";
        }if($scope.selecteddata==="Full SV"){
          $scope.url="images/full-icon.png";
        }if($scope.selecteddata==="QTSV"){
          $scope.url="images/qtsv-icon.png";
        }if($scope.selecteddata==="Tail Change"){
          $scope.url="images/tail-change-icon.png";
        }if($scope.selecteddata==="Warranty"){
          $scope.url="images/warranty-icon.png";
        }if($scope.selecteddata==="Water Wash"){
          $scope.url="images/waterwash-icon.png";
        }if($scope.selecteddata==="Event"){
          $scope.url="images/event-icon.png";
        }if($scope.selecteddata==="Thrust Rating Change"){
          $scope.url="images/thrust-icon.png";
        }if($scope.selecteddata==="LLP"){
          $scope.url="images/llp-icon.png";
        }if($scope.selecteddata==="CMR Predicted SV"){
          $scope.url="images/cmr-icon.png";
        }else if($scope.selecteddata==="Forecasted SV"){
          $scope.url="images/forecastedsv-icon.png";
        }
        $scope.$apply();
});

 $('#ParameterDropdown').change(function() {

    $scope.ParameterKey=sessionStorage.getItem("SelectedParameterKey");
    $("#parameterRowIcon").show();
    $("#parameterRowLabel").show(); 
    $('#GetTableDataforParameter').show();
    if($scope.ParameterKey==0)
    {
    $('#GetTableDataforParameter').hide();
    $("#parameterRowIcon").hide();
    $("#parameterRowLabel").hide();
    }
   

    });

//Function to get called when deselecting a filter
$scope.remove=function(){
        $scope.position="AtTimeSeries";
        $scope.display1="Hide";
        $scope.display3="Hide";
        $scope.display2="Show";
        $scope.display4="Show";
        $scope.esn=sessionStorage.getItem("SelectedESN");
        $scope.PlotESN();   
}

$('#datetimepicker1').datetimepicker(); 
  $('#datetimepicker1').datetimepicker('setDate', new Date());

$('#datetimepicker2').datetimepicker();     
 $('#datetimepicker2').datetimepicker('setDate', new Date());

     $('#datetimepicker1').on('changeDate', function(ev){
            var dateVal=ev.localDate;
            $scope.startDate=$filter('date')(dateVal,'dd-MMM-yy'); 
            console.log($scope.startDate);
        }); 
     $('#datetimepicker2').on('changeDate', function(ev){
            var dateVal=ev.localDate;
            $scope.endDate=$filter('date')(dateVal,'dd-MMM-yy');  
            console.log($scope.endDate);
        });

//Aircraft Dropdown
$http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/aircraftModel').then(function(response){
        $scope.aircraftData = response.data;
});

$http.get('json/parameter.json').then(function(response){
        $scope.parameterData = response.data;

});


//Airliner Dropdown
  $scope.ChangeAircraft=function(val,val1){

     sessionStorage.setItem("SelectedAC",val1); 
     sessionStorage.setItem("SelectedAC1",val);  

    $scope.MidValue=val;
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/airlinesList?modelID='+$scope.MidValue).then(function(response){ 
      $scope.airlinerData = response.data;
      });
   
   }

//ESN Dropdown
    $scope.ChangeAirliner=function(val,val1){

    sessionStorage.setItem("SelectedAL",val1);
    sessionStorage.setItem("SelectedAL1",val); 

   
    $scope.CidValue=val;
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/esnList?customerID='+$scope.CidValue).then(function(response){ 
      $scope.esnData = response.data;
      });
    
   }

//Parameter Dropdown
$scope.ChangeParameter=function(val1,val2){
    $scope.display7="Show";
    sessionStorage.setItem("SelectedParameterKey",val1);
    sessionStorage.setItem("SelectedParameter",val2);

    $scope.ParameterKey=sessionStorage.getItem("SelectedParameterKey");
    $("#parameterRowIcon").show();
    $("#parameterRowLabel").show(); 
    $('#GetTableDataforParameter').show();
    if($scope.ParameterKey==0)
    {
    $('#GetTableDataforParameter').hide();
    $("#parameterRowIcon").hide();
    $("#parameterRowLabel").hide();
    }


   if($scope.ParameterSelectedkey !== val1 && val1 !== '0'){
    $scope.ParameterSelectedkey=val1;
    $scope.ParameterSelected=val2;
    $scope.ESNSelected=sessionStorage.getItem("SelectedESN");

    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getParamvalues?esn='+$scope.ESNSelected+'&paramCode='+$scope.ParameterSelectedkey).then(function(response){ 

    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
 
     $scope.DataforParameterChart = [];

     $scope.x = Object.keys(response.data[0])[1];
     $scope.y = Object.keys(response.data[0])[0];

     if($scope.y=="degtParameterValue"){
        $scope.ValueTag="DEGT";
     }
     else if($scope.y=="altParameterValue"){
        $scope.ValueTag="Altitude";
     }
     else if($scope.y=="oilTempParameterValue"){
        $scope.ValueTag="Oil Temperature";
     }
     else if($scope.y=="machParameterValue"){
        $scope.ValueTag="Mach";
     }
     else if($scope.y=="coreSpeedparameterValue"){
        $scope.ValueTag="Core Speed";
     }
     else if($scope.y=="fuelFlowparameterValue"){
        $scope.ValueTag="Fuel Flow";
     }
     if($scope.y=="oilPressureparameterValue"){
        $scope.ValueTag="Oil Pressure";
     }
  
    for(var i=0;i<response.data.length;i++){
    
        repairDateYear=$filter('date')(new Date(response.data[i][$scope.x]),"yyyy");   
        repairDateMonth=$filter('date')(new Date(response.data[i][$scope.x]),"M");
        
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date(response.data[i][$scope.x]),"d");
     
        repairDateHour=0;
        repairDateMin=0;
        $scope.DataforParameterChart.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':parseFloat(response.data[i][$scope.y]),'Date':response.data[i][$scope.x]});
      
        $scope.DataforParameterChart = $filter('orderBy')($scope.DataforParameterChart,'x');
        
    }   
      

        //For on Load
        if($scope.position=="AtTimeSeries"){
        $scope.chart1.series[13].update({
            data:$scope.DataforParameterChart,
            type:'area'
        }) ;
    }
        //For individual Event
        if($scope.position=="AtEventChart"){
         $scope.chart2.series[2].update({
            data:$scope.DataforParameterChart,
            type:'area'
        }) ;
     }


         
      });
   }
    else if (val1 ==='0'){
       $scope.display7='Hide';
        $scope.ParameterSelectedkey=val1;
        $scope.DataforParameterChart=null;

        //For On Load
        if($scope.position=="AtTimeSeries"){
         $scope.chart1.series[13].update({
            data:$scope.DataforParameterChart,
            type:'area'
        }) ;
     }
         //For Individual Event
         if($scope.position=="AtEventChart"){
          $scope.chart2.series[2].update({
            data:$scope.DataforParameterChart,
            type:'area'
        }) ;
      }
    
    
         
    }
   }

//Popup Functionality
$scope.showDetails = function(eventID,eventName)
  {
    
    if(eventName == 'Alert') {
      //debugger
     // console.log('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/alertParamDetails?eventID='+eventID)
     $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/alertParamDetails?eventID='+eventID).then(function(response){
          $rootScope.Details = response.data[0];
         // debugger 
      var arr1 = ['SelectedPesn','SelectedPcsn','SelectedPtsn','SelectedPclsv','SelectedPtslsv','SelectedPalertDate','SelectedPalertDesc','SelectedPdegt','SelectedPaltitude','SelectedPoilTemp','SelectedPmach','SelectedPcoreSpeed','SelectedPfuelFlow','SelectedPoilPressure'];
 
      var arr2 = [$rootScope.Details.esn,$rootScope.Details.cumulativeCSN,$rootScope.Details.cumulativeTSN,$rootScope.Details.clsv,$rootScope.Details.tslsv,$rootScope.Details.alertDate,$rootScope.Details.alertDesc,$rootScope.Details.degt,$rootScope.Details.altitude,$rootScope.Details.oilTemp,$rootScope.Details.mach,$rootScope.Details.coreSpeed,$rootScope.Details.fuelFlow,$rootScope.Details.oilPressure];              
          for(var i=0;i<arr1.length;i++)
          {
            sessionStorage.setItem(arr1[i],arr2[i]);
          }   
      });
    }
    else if(eventName == 'TailChange' || eventName == 'Tail Change') {
      //debugger
      //console.log('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/alertParamDetails?eventID='+eventID)
     $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/tailChangeDetails?eventID='+eventID).then(function(response){
          $rootScope.Details = response.data[0];
      var arr3 = ['SelectedPeid','SelectePesn','SelectedPcsn','SelectedPtsn','SelectedPcslsv','SelectedPtslsv','SelectedPfromTail','SelectedPtoTail','SelectedPalertMonth','SelectedPalertDesc','SelectedPdegt','SelectedPaltitude','SelectedPoilTemp','SelectedPmach','SelectedPcoreSpeed','SelectedPfuelFlow','SelectedPoilPressure'];
 
      var arr4 = [$rootScope.Details.eventid,$rootScope.Details.esn,$rootScope.Details.csn_cummulative,$rootScope.Details.tsn_cummulative,$rootScope.Details.cslsv,$rootScope.Details.tslsv,$rootScope.Details.fromTail,$rootScope.Details.toTail,$rootScope.Details.alertMonth,$rootScope.Details.alterDesc,$rootScope.Details.degt,$rootScope.Details.altitude,$rootScope.Details.oilTemp,$rootScope.Details.mach,$rootScope.Details.coreSpeed,$rootScope.Details.fuelFlow,$rootScope.Details.oilPressure];      
          for(var i=0;i<arr3.length;i++)
          {
            sessionStorage.setItem(arr3[i],arr4[i]);
          }
      });
    }
    else if(eventName == 'WaterWash' || eventName == 'Water Wash') {
      //debugger
      //console.log('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/alertParamDetails?eventID='+eventID)
     $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/waterWashDetails?eventID='+eventID).then(function(response){
          $rootScope.Details = response.data[0];
      var arr5 = ['SelectedPeid','SelectedPcsn','SelectedPtsn','SelectedPcslsv','SelectedPtslsv','SelectePcslww','SelectePtslww','SelectedPdegt_lastww','SelectedPaltitude_lastww','SelectedPoiltemp_lastww','SelectedPmach_lastww','SelectedPcorespeed_lastww','SelectedPfuelflow_lastww','SelectedPoilpressure_lastww','SelectedPdegt_currentww','SelectedPaltitude_currentww','SelectedPoilTemp_currentww','SelectedPmach_currentww','SelectedPcoreSpeed_currentww','SelectedPfuelFlow_currentww','SelectedPoilPressure_currentww'];
 
      var arr6 = [$rootScope.Details.eventid,$rootScope.Details.csn_cummulative,$rootScope.Details.tsn_cummulative,$rootScope.Details.cslsv,$rootScope.Details.tslsv,$rootScope.Details.cslww,$rootScope.Details.tslww,$rootScope.Details.degt_lastww,$rootScope.Details.altitude_lastww,$rootScope.Details.oiltemp_lastww,$rootScope.Details.mach_lastww,$rootScope.Details.corespeed_lastww,$rootScope.Details.fuelflow_lastww,$rootScope.Details.oilpressure_lastww,$rootScope.Details.degt_currentww,$rootScope.Details.altitude_currentww,$rootScope.Details.oiltemp_currentww,$rootScope.Details.mach_currentww,$rootScope.Details.corespeed_currentww,$rootScope.Details.fuelflow_currentww,$rootScope.Details.oilpressure_currentww];       
          for(var i=0;i<arr5.length;i++)
          {
            sessionStorage.setItem(arr5[i],arr6[i]);
          }
      });
    }  
    else if(eventName == 'Event') {
 
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/eventDetails?eventID='+eventID).then(function(response){
          $rootScope.Details = response.data[0];
          var arr7 =['SeleventId','Selcsn_cummulative','Seltsn_cummulative','Selcslsv','Seltslsv','Selmonth','Selevent_CnrType','Selevent_CnrDesc','Selmonth_Year','SelalertDescription','Seldegt_current','Selaltitude_current','Seloiltemp_current','Selmach_current','Selcorespeed_current','Selfuelflow_current','Seloilpressure_current','Seldegt_1MonOld','Selaltitude_1MonOld','Seloiltemp_1MonOld','Selmach_1MonOld','Selcorespeed_1MonOld','Selfuelflow_1MonOld','Seloilpressure_1MonOld','Seldegt_2MonOld','Selaltitude_2MonOld','Seloiltemp_2MonOld','Selmach_2MonOld','Selcorespeed_2MonOld','Selfuelflow_2MonOld','Seloilpressure_2MonOld','Seldegt_3MonOld','Selaltitude_3MonOld','Seloiltemp_3MonOld','Selmach_3MonOld','Selcorespeed_3MonOld','Selfuelflow_3MonOld','Seloilpressure_3MonOld'];
 
          var arr8 = [$rootScope.Details.eventId,$rootScope.Details.csn_cummulative,$rootScope.Details.tsn_cummulative,$rootScope.Details.cslsv,$rootScope.Details.tslsv,$rootScope.Details.month,$rootScope.Details.event_CnrType,$rootScope.Details.event_CnrDesc,$rootScope.Details.month_Year,$rootScope.Details.alertDescription,$rootScope.Details.degt_current,$rootScope.Details.altitude_current,$rootScope.Details.oiltemp_current,$rootScope.Details.mach_current,$rootScope.Details.corespeed_current,$rootScope.Details.fuelflow_current,$rootScope.Details.oilpressure_current,$rootScope.Details.degt_1MonOld,$rootScope.Details.altitude_1MonOld,$rootScope.Details.oiltemp_1MonOld,$rootScope.Details.mach_1MonOld,$rootScope.Details.corespeed_1MonOld,$rootScope.Details.fuelflow_1MonOld,$rootScope.Details.oilpressure_1MonOld,$rootScope.Details.degt_2MonOld,$rootScope.Details.altitude_2MonOld,$rootScope.Details.oiltemp_2MonOld,$rootScope.Details.mach_2MonOld,$rootScope.Details.corespeed_2MonOld,$rootScope.Details.fuelflow_2MonOld,$rootScope.Details.oilpressure_2MonOld,$rootScope.Details.degt_3MonOld,$rootScope.Details.altitude_3MonOld,$rootScope.Details.oiltemp_3MonOld,$rootScope.Details.mach_3MonOld,$rootScope.Details.corespeed_3MonOld,$rootScope.Details.fuelflow_3MonOld,$rootScope.Details.oilpressure_3MonOld];
           for(var i=0;i<arr7.length;i++)
          {
            sessionStorage.setItem(arr7[i],arr8[i]);
          }
        
      });   
    }
    else if (eventName == 'ForecastedSV' || eventName == 'Forecasted SV') {
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/forecastedSVDetails?eventID='+eventID).then(function(response){
        $rootScope.Details = response.data[0];
        var arr9 = ['SeleventId', 'SelsvType', 'Sellogic'];
        var arr10 = [$rootScope.Details.eventId, $rootScope.Details.svType, $rootScope.Details.logic];
          for(var i=0;i<arr9.length;i++)
          {
            sessionStorage.setItem(arr9[i],arr10[i]);
          }
      });
    }
    else if (eventName == 'CMR') {
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/cmrPredictedSVDetails?eventID='+eventID).then(function(response){
        $rootScope.Details = response.data[0];       
        var arr11 = ['SeleventId', 'SelsvType', 'Sellogic'];
        var arr12 = [$rootScope.Details.eventId, $rootScope.Details.svType, $rootScope.Details.logic];
          for(var i=0;i<arr11.length;i++)
          {
            sessionStorage.setItem(arr11[i],arr12[i]);
          }
      });
    }
    else if(eventName == 'ThrustRatingChange' || eventName == 'Thrust Rating Change') {
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/thrustDetails?eventID='+eventID).then(function(response){
        $rootScope.Details = response.data[0];      
        var arr13 = ['SeleventId', 'SelthrustRatingPrior', 'SelthrustRatingCurrent'];
        var arr14 = [$rootScope.Details.eventId, $rootScope.Details.thrustRatingPrior, $rootScope.Details.thrustRatingCurrent];
          for(var i=0;i<arr13.length;i++)
          {
            sessionStorage.setItem(arr13[i],arr14[i]);
          }
      });     
    }
    else if(eventName == 'LLP') {
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/LLPDetails?eventID='+eventID).then(function(response){
        $rootScope.Details = response.data; 
        var arr15 = ['SeleventId1', 'SelserialNumber1', 'SelpartNomenclature1', 'Selpart_iin1', 'SelcycleLimit1', 'Selcurrent_csn1', 'SelcyclesLeft1','SeleventId2', 'SelserialNumber2', 'SelpartNomenclature2', 'Selpart_iin2', 'SelcycleLimit2', 'Selcurrent_csn2', 'SelcyclesLeft2','SeleventId3', 'SelserialNumber3', 'SelpartNomenclature3', 'Selpart_iin3', 'SelcycleLimit3', 'Selcurrent_csn3', 'SelcyclesLeft3','SeleventId4', 'SelserialNumber4', 'SelpartNomenclature4', 'Selpart_iin4', 'SelcycleLimit4', 'Selcurrent_csn4', 'SelcyclesLeft4','SeleventId5', 'SelserialNumber5', 'SelpartNomenclature5', 'Selpart_iin5', 'SelcycleLimit5', 'Selcurrent_csn5', 'SelcyclesLeft5','SeleventId6', 'SelserialNumber6', 'SelpartNomenclature6', 'Selpart_iin6', 'SelcycleLimit6', 'Selcurrent_csn6', 'SelcyclesLeft6','SeleventId7', 'SelserialNumber7', 'SelpartNomenclature7', 'Selpart_iin7', 'SelcycleLimit7', 'Selcurrent_csn7', 'SelcyclesLeft7','SeleventId8', 'SelserialNumber8', 'SelpartNomenclature8', 'Selpart_iin8', 'SelcycleLimit8', 'Selcurrent_csn8', 'SelcyclesLeft8','SeleventId9', 'SelserialNumber9', 'SelpartNomenclature9', 'Selpart_iin9', 'SelcycleLimit9', 'Selcurrent_csn9', 'SelcyclesLeft9','SeleventId10', 'SelserialNumber10', 'SelpartNomenclature10', 'Selpart_iin10', 'SelcycleLimit10', 'Selcurrent_csn10', 'SelcyclesLeft10','SeleventId11', 'SelserialNumber11', 'SelpartNomenclature11', 'Selpart_iin11', 'SelcycleLimit11', 'Selcurrent_csn11', 'SelcyclesLeft11','SeleventId12', 'SelserialNumber12', 'SelpartNomenclature12', 'Selpart_iin12', 'SelcycleLimit12', 'Selcurrent_csn12', 'SelcyclesLeft12','SeleventId13', 'SelserialNumber13', 'SelpartNomenclature13', 'Selpart_iin13', 'SelcycleLimit13', 'Selcurrent_csn13', 'SelcyclesLeft13','SeleventId14', 'SelserialNumber14', 'SelpartNomenclature14', 'Selpart_iin14', 'SelcycleLimit14', 'Selcurrent_csn14', 'SelcyclesLeft14','SeleventId15', 'SelserialNumber15', 'SelpartNomenclature15', 'Selpart_iin15', 'SelcycleLimit15', 'Selcurrent_csn15', 'SelcyclesLeft15','SeleventId16', 'SelserialNumber16', 'SelpartNomenclature16', 'Selpart_iin16', 'SelcycleLimit16', 'Selcurrent_csn16', 'SelcyclesLeft16','SeleventId17', 'SelserialNumber17', 'SelpartNomenclature17', 'Selpart_iin17', 'SelcycleLimit17', 'Selcurrent_csn17', 'SelcyclesLeft17','SeleventId18', 'SelserialNumber18', 'SelpartNomenclature18', 'Selpart_iin18', 'SelcycleLimit18', 'Selcurrent_csn18', 'SelcyclesLeft18','SeleventId19', 'SelserialNumber19', 'SelpartNomenclature19', 'Selpart_iin19', 'SelcycleLimit19', 'Selcurrent_csn19', 'SelcyclesLeft19','SeleventId20', 'SelserialNumber20', 'SelpartNomenclature20', 'Selpart_iin20', 'SelcycleLimit20', 'Selcurrent_csn20', 'SelcyclesLeft20', 'SeleventId21', 'SelserialNumber21', 'SelpartNomenclature21', 'Selpart_iin21', 'SelcycleLimit21', 'Selcurrent_csn21', 'SelcyclesLeft21','SeleventId22', 'SelserialNumber22', 'SelpartNomenclature22', 'Selpart_iin22', 'SelcycleLimit22', 'Selcurrent_csn22', 'SelcyclesLeft22','SeleventId23', 'SelserialNumber23', 'SelpartNomenclature23', 'Selpart_iin23', 'SelcycleLimit23', 'Selcurrent_csn23', 'SelcyclesLeft23','SeleventId24', 'SelserialNumber24', 'SelpartNomenclature24', 'Selpart_iin24', 'SelcycleLimit24', 'Selcurrent_csn24', 'SelcyclesLeft24','SeleventId25', 'SelserialNumber25', 'SelpartNomenclature25', 'Selpart_iin25', 'SelcycleLimit25', 'Selcurrent_csn25', 'SelcyclesLeft25','SeleventId26', 'SelserialNumber26', 'SelpartNomenclature26', 'Selpart_iin26', 'SelcycleLimit26', 'Selcurrent_csn26', 'SelcyclesLeft26','SeleventId27', 'SelserialNumber27', 'SelpartNomenclature27', 'Selpart_iin27', 'SelcycleLimit27', 'Selcurrent_csn27', 'SelcyclesLeft27','SeleventId28', 'SelserialNumber28', 'SelpartNomenclature28', 'Selpart_iin28', 'SelcycleLimit28', 'Selcurrent_csn28', 'SelcyclesLeft28','SeleventId29', 'SelserialNumber29', 'SelpartNomenclature29', 'Selpart_iin29', 'SelcycleLimit29', 'Selcurrent_csn29', 'SelcyclesLeft29','SeleventId30', 'SelserialNumber30', 'SelpartNomenclature30', 'Selpart_iin30', 'SelcycleLimit30', 'Selcurrent_csn30', 'SelcyclesLeft30','SeleventId31', 'SelserialNumber31', 'SelpartNomenclature31', 'Selpart_iin31', 'SelcycleLimit31', 'Selcurrent_csn31', 'SelcyclesLeft31'];  
        var arr16 = [$rootScope.Details[0].eventId, $rootScope.Details[0].serialNumber, $rootScope.Details[0].partNomenclature, $rootScope.Details[0].part_iin,$rootScope.Details[0].cycleLimit, $rootScope.Details[0].current_csn, $rootScope.Details[0].cyclesLeft,$rootScope.Details[1].eventId, $rootScope.Details[1].serialNumber, $rootScope.Details[1].partNomenclature, $rootScope.Details[1].part_iin, $rootScope.Details[1].cycleLimit, $rootScope.Details[1].current_csn, $rootScope.Details[1].cyclesLeft,$rootScope.Details[2].eventId, $rootScope.Details[2].serialNumber, $rootScope.Details[2].partNomenclature, $rootScope.Details[2].part_iin, $rootScope.Details[2].cycleLimit, $rootScope.Details[2].current_csn, $rootScope.Details[2].cyclesLeft,$rootScope.Details[3].eventId, $rootScope.Details[3].serialNumber, $rootScope.Details[3].partNomenclature, $rootScope.Details[3].part_iin, $rootScope.Details[3].cycleLimit, $rootScope.Details[3].current_csn, $rootScope.Details[3].cyclesLeft,$rootScope.Details[4].eventId, $rootScope.Details[4].serialNumber, $rootScope.Details[4].partNomenclature, $rootScope.Details[4].part_iin, $rootScope.Details[4].cycleLimit, $rootScope.Details[4].current_csn, $rootScope.Details[4].cyclesLeft,$rootScope.Details[5].eventId, $rootScope.Details[5].serialNumber, $rootScope.Details[5].partNomenclature, $rootScope.Details[5].part_iin, $rootScope.Details[5].cycleLimit, $rootScope.Details[5].current_csn, $rootScope.Details[5].cyclesLeft,$rootScope.Details[6].eventId, $rootScope.Details[6].serialNumber, $rootScope.Details[6].partNomenclature, $rootScope.Details[6].part_iin, $rootScope.Details[6].cycleLimit, $rootScope.Details[6].current_csn, $rootScope.Details[6].cyclesLeft,$rootScope.Details[7].eventId, $rootScope.Details[7].serialNumber, $rootScope.Details[7].partNomenclature, $rootScope.Details[7].part_iin, $rootScope.Details[7].cycleLimit, $rootScope.Details[7].current_csn, $rootScope.Details[7].cyclesLeft,$rootScope.Details[8].eventId, $rootScope.Details[8].serialNumber, $rootScope.Details[8].partNomenclature, $rootScope.Details[8].part_iin, $rootScope.Details[8].cycleLimit, $rootScope.Details[8].current_csn, $rootScope.Details[8].cyclesLeft,$rootScope.Details[9].eventId, $rootScope.Details[9].serialNumber, $rootScope.Details[9].partNomenclature, $rootScope.Details[9].part_iin, $rootScope.Details[9].cycleLimit, $rootScope.Details[9].current_csn, $rootScope.Details[9].cyclesLeft,$rootScope.Details[10].eventId, $rootScope.Details[10].serialNumber, $rootScope.Details[10].partNomenclature, $rootScope.Details[10].part_iin, $rootScope.Details[10].cycleLimit, $rootScope.Details[10].current_csn, $rootScope.Details[10].cyclesLeft,$rootScope.Details[11].eventId, $rootScope.Details[11].serialNumber, $rootScope.Details[11].partNomenclature, $rootScope.Details[11].part_iin, $rootScope.Details[11].cycleLimit, $rootScope.Details[11].current_csn, $rootScope.Details[11].cyclesLeft,$rootScope.Details[12].eventId, $rootScope.Details[12].serialNumber, $rootScope.Details[12].partNomenclature, $rootScope.Details[12].part_iin, $rootScope.Details[12].cycleLimit, $rootScope.Details[12].current_csn, $rootScope.Details[12].cyclesLeft,$rootScope.Details[13].eventId, $rootScope.Details[13].serialNumber, $rootScope.Details[13].partNomenclature, $rootScope.Details[13].part_iin, $rootScope.Details[13].cycleLimit, $rootScope.Details[13].current_csn, $rootScope.Details[13].cyclesLeft,$rootScope.Details[14].eventId, $rootScope.Details[14].serialNumber, $rootScope.Details[14].partNomenclature, $rootScope.Details[14].part_iin, $rootScope.Details[14].cycleLimit, $rootScope.Details[14].current_csn, $rootScope.Details[14].cyclesLeft,$rootScope.Details[15].eventId, $rootScope.Details[15].serialNumber, $rootScope.Details[15].partNomenclature, $rootScope.Details[15].part_iin, $rootScope.Details[15].cycleLimit, $rootScope.Details[15].current_csn, $rootScope.Details[15].cyclesLeft,$rootScope.Details[16].eventId, $rootScope.Details[16].serialNumber, $rootScope.Details[16].partNomenclature, $rootScope.Details[16].part_iin, $rootScope.Details[16].cycleLimit, $rootScope.Details[16].current_csn, $rootScope.Details[16].cyclesLeft,$rootScope.Details[17].eventId, $rootScope.Details[17].serialNumber, $rootScope.Details[17].partNomenclature, $rootScope.Details[17].part_iin, $rootScope.Details[17].cycleLimit, $rootScope.Details[17].current_csn, $rootScope.Details[17].cyclesLeft,$rootScope.Details[18].eventId, $rootScope.Details[18].serialNumber, $rootScope.Details[18].partNomenclature, $rootScope.Details[18].part_iin, $rootScope.Details[18].cycleLimit, $rootScope.Details[18].current_csn, $rootScope.Details[18].cyclesLeft, $rootScope.Details[19].eventId, $rootScope.Details[19].serialNumber, $rootScope.Details[19].partNomenclature, $rootScope.Details[19].part_iin, $rootScope.Details[19].cycleLimit, $rootScope.Details[19].current_csn, $rootScope.Details[19].cyclesLeft, $rootScope.Details[20].eventId, $rootScope.Details[20].serialNumber, $rootScope.Details[20].partNomenclature, $rootScope.Details[20].part_iin, $rootScope.Details[20].cycleLimit, $rootScope.Details[20].current_csn, $rootScope.Details[20].cyclesLeft, $rootScope.Details[21].eventId, $rootScope.Details[21].serialNumber, $rootScope.Details[21].partNomenclature, $rootScope.Details[21].part_iin, $rootScope.Details[21].cycleLimit, $rootScope.Details[21].current_csn, $rootScope.Details[21].cyclesLeft, $rootScope.Details[22].eventId, $rootScope.Details[22].serialNumber, $rootScope.Details[22].partNomenclature, $rootScope.Details[22].part_iin, $rootScope.Details[22].cycleLimit, $rootScope.Details[22].current_csn, $rootScope.Details[22].cyclesLeft,$rootScope.Details[23].eventId, $rootScope.Details[23].serialNumber, $rootScope.Details[23].partNomenclature, $rootScope.Details[23].part_iin, $rootScope.Details[23].cycleLimit, $rootScope.Details[23].current_csn, $rootScope.Details[23].cyclesLeft, $rootScope.Details[24].eventId, $rootScope.Details[24].serialNumber, $rootScope.Details[24].partNomenclature, $rootScope.Details[24].part_iin, $rootScope.Details[24].cycleLimit, $rootScope.Details[24].current_csn, $rootScope.Details[24].cyclesLeft, $rootScope.Details[25].eventId, $rootScope.Details[25].serialNumber, $rootScope.Details[25].partNomenclature, $rootScope.Details[25].part_iin, $rootScope.Details[25].cycleLimit, $rootScope.Details[25].current_csn, $rootScope.Details[25].cyclesLeft, $rootScope.Details[26].eventId, $rootScope.Details[26].serialNumber, $rootScope.Details[26].partNomenclature, $rootScope.Details[26].part_iin, $rootScope.Details[26].cycleLimit, $rootScope.Details[26].current_csn, $rootScope.Details[26].cyclesLeft,$rootScope.Details[27].eventId, $rootScope.Details[27].serialNumber, $rootScope.Details[27].partNomenclature, $rootScope.Details[27].part_iin, $rootScope.Details[27].cycleLimit, $rootScope.Details[27].current_csn, $rootScope.Details[27].cyclesLeft, $rootScope.Details[28].eventId, $rootScope.Details[28].serialNumber, $rootScope.Details[28].partNomenclature, $rootScope.Details[28].part_iin, $rootScope.Details[28].cycleLimit, $rootScope.Details[28].current_csn, $rootScope.Details[28].cyclesLeft, $rootScope.Details[29].eventId, $rootScope.Details[29].serialNumber, $rootScope.Details[29].partNomenclature, $rootScope.Details[29].part_iin, $rootScope.Details[29].cycleLimit, $rootScope.Details[29].current_csn, $rootScope.Details[29].cyclesLeft, $rootScope.Details[30].eventId, $rootScope.Details[30].serialNumber, $rootScope.Details[30].partNomenclature, $rootScope.Details[30].part_iin, $rootScope.Details[30].cycleLimit, $rootScope.Details[30].current_csn, $rootScope.Details[30].cyclesLeft];
        $rootScope.count = Object.keys(response.data);        
        for(var i=0;i<arr15.length;i++)
        {
            sessionStorage.setItem(arr15[i],arr16[i]);
        }
      });
    }
    else if(eventName == 'Warranty') {
      $http.get('https://digitalthread-paramdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/warrantyDetails?eventID='+eventID).then(function(response){
        $rootScope.Details = response.data; 
        $rootScope.cnt = Object.keys(response.data);         
        var arr17 = ['Selcsn_cummulative1','Seltsn_cummulative1','Selcslsv1','Seltslsv1','Selmonth1','SeltotalWarrantyAmount1','SelserialNumber1','Seloh_shop1','Selclaim_wo1','SelpartNumber1','SelpartKeyword1','Selpart_csn1','Selpart_tsn1','Selamount1','SelwarrantyType1','SelcostBucket1','Selcsn_cummulative2','Seltsn_cummulative2','Selcslsv2','Seltslsv2','Selmonth2','SeltotalWarrantyAmount2','SelserialNumber2','Seloh_shop2','Selclaim_wo2','SelpartNumber2','SelpartKeyword2','Selpart_csn2','Selpart_tsn2','Selamount2','SelwarrantyType2','SelcostBucket2','Selcsn_cummulative3','Seltsn_cummulative3','Selcslsv3','Seltslsv3','Selmonth3','SeltotalWarrantyAmount3','SelserialNumber3','Seloh_shop3','Selclaim_wo3','SelpartNumber3','SelpartKeyword3','Selpart_csn3','Selpart_tsn3','Selamount3','SelwarrantyType3','SelcostBucket3','Selcsn_cummulative4','Seltsn_cummulative4','Selcslsv4','Seltslsv4','Selmonth4','SeltotalWarrantyAmount4','SelserialNumber4','Seloh_shop4','Selclaim_wo4','SelpartNumber4','SelpartKeyword4','Selpart_csn4','Selpart_tsn4','Selamount4','SelwarrantyType4','SelcostBucket4','Selcsn_cummulative5','Seltsn_cummulative5','Selcslsv5','Seltslsv5','Selmonth5','SeltotalWarrantyAmount5','SelserialNumber5','Seloh_shop5','Selclaim_wo5','SelpartNumber5','SelpartKeyword5','Selpart_csn5','Selpart_tsn5','Selamount5','SelwarrantyType5','SelcostBucket5','Selcsn_cummulative6','Seltsn_cummulative6','Selcslsv6','Seltslsv6','Selmonth6','SeltotalWarrantyAmount6','SelserialNumber6','Seloh_shop6','Selclaim_wo6','SelpartNumber6','SelpartKeyword6','Selpart_csn6','Selpart_tsn6','Selamount6','SelwarrantyType6','SelcostBucket6','Selcsn_cummulative7','Seltsn_cummulative7','Selcslsv7','Seltslsv7','Selmonth7','SeltotalWarrantyAmount7','SelserialNumber7','Seloh_shop7','Selclaim_wo7','SelpartNumber7','SelpartKeyword7','Selpart_csn7','Selpart_tsn7','Selamount7','SelwarrantyType7','SelcostBucket7','Selcsn_cummulative8','Seltsn_cummulative8','Selcslsv8','Seltslsv8','Selmonth8','SeltotalWarrantyAmount8','SelserialNumber8','Seloh_shop8','Selclaim_wo8','SelpartNumber8','SelpartKeyword8','Selpart_csn8','Selpart_tsn8','Selamount8','SelwarrantyType8','SelcostBucket8','Selcsn_cummulative9','Seltsn_cummulative9','Selcslsv9','Seltslsv9','Selmonth9','SeltotalWarrantyAmount9','SelserialNumber9','Seloh_shop9','Selclaim_wo9','SelpartNumber9','SelpartKeyword9','Selpart_csn9','Selpart_tsn9','Selamount9','SelwarrantyType9','SelcostBucket9','Selcsn_cummulative10','Seltsn_cummulative10','Selcslsv10','Seltslsv10','Selmonth10','SeltotalWarrantyAmount10','SelserialNumber10','Seloh_shop10','Selclaim_wo10','SelpartNumber10','SelpartKeyword10','Selpart_csn10','Selpart_tsn10','Selamount10','SelwarrantyType10','SelcostBucket10'];
        var arr18 = [];
        if($rootScope.cnt.length >= 6) {
          arr18 = [$rootScope.Details[0].csn_cummulative,$rootScope.Details[0].tsn_cummulative,$rootScope.Details[0].cslsv,$rootScope.Details[0].tslsv,$rootScope.Details[0].month,$rootScope.Details[0].totalWarrantyAmount,$rootScope.Details[0].serialNumber,$rootScope.Details[0].oh_shop,$rootScope.Details[0].claim_wo,$rootScope.Details[0].partNumber,$rootScope.Details[0].partKeyword,$rootScope.Details[0].part_csn,$rootScope.Details[0].part_tsn,$rootScope.Details[0].amount,$rootScope.Details[0].warrantyType,$rootScope.Details[0].costBucket,$rootScope.Details[1].csn_cummulative,$rootScope.Details[1].tsn_cummulative,$rootScope.Details[1].cslsv,$rootScope.Details[1].tslsv,$rootScope.Details[1].month,$rootScope.Details[1].totalWarrantyAmount,$rootScope.Details[1].serialNumber,$rootScope.Details[1].oh_shop,$rootScope.Details[1].claim_wo,$rootScope.Details[1].partNumber,$rootScope.Details[1].partKeyword,$rootScope.Details[1].part_csn,$rootScope.Details[1].part_tsn,$rootScope.Details[1].amount,$rootScope.Details[1].warrantyType,$rootScope.Details[1].costBucket,$rootScope.Details[2].csn_cummulative,$rootScope.Details[2].tsn_cummulative,$rootScope.Details[2].cslsv,$rootScope.Details[2].tslsv,$rootScope.Details[2].month,$rootScope.Details[2].totalWarrantyAmount,$rootScope.Details[2].serialNumber,$rootScope.Details[2].oh_shop,$rootScope.Details[2].claim_wo,$rootScope.Details[2].partNumber,$rootScope.Details[2].partKeyword,$rootScope.Details[2].part_csn,$rootScope.Details[2].part_tsn,$rootScope.Details[2].amount,$rootScope.Details[2].warrantyType,$rootScope.Details[2].costBucket,$rootScope.Details[3].csn_cummulative,$rootScope.Details[3].tsn_cummulative,$rootScope.Details[3].cslsv,$rootScope.Details[3].tslsv,$rootScope.Details[3].month,$rootScope.Details[3].totalWarrantyAmount,$rootScope.Details[3].serialNumber,$rootScope.Details[3].oh_shop,$rootScope.Details[3].claim_wo,$rootScope.Details[3].partNumber,$rootScope.Details[3].partKeyword,$rootScope.Details[3].part_csn,$rootScope.Details[3].part_tsn,$rootScope.Details[3].amount,$rootScope.Details[3].warrantyType,$rootScope.Details[3].costBucket,$rootScope.Details[4].csn_cummulative,$rootScope.Details[4].tsn_cummulative,$rootScope.Details[4].cslsv,$rootScope.Details[4].tslsv,$rootScope.Details[4].month,$rootScope.Details[4].totalWarrantyAmount,$rootScope.Details[4].serialNumber,$rootScope.Details[4].oh_shop,$rootScope.Details[4].claim_wo,$rootScope.Details[4].partNumber,$rootScope.Details[4].partKeyword,$rootScope.Details[4].part_csn,$rootScope.Details[4].part_tsn,$rootScope.Details[4].amount,$rootScope.Details[4].warrantyType,$rootScope.Details[4].costBucket,$rootScope.Details[5].csn_cummulative,$rootScope.Details[5].tsn_cummulative,$rootScope.Details[5].cslsv,$rootScope.Details[5].tslsv,$rootScope.Details[5].month,$rootScope.Details[5].totalWarrantyAmount,$rootScope.Details[5].serialNumber,$rootScope.Details[5].oh_shop,$rootScope.Details[5].claim_wo,$rootScope.Details[5].partNumber,$rootScope.Details[5].partKeyword,$rootScope.Details[5].part_csn,$rootScope.Details[5].part_tsn,$rootScope.Details[5].amount,$rootScope.Details[5].warrantyType,$rootScope.Details[5].costBucket,$rootScope.Details[6].csn_cummulative,$rootScope.Details[6].tsn_cummulative,$rootScope.Details[6].cslsv,$rootScope.Details[6].tslsv,$rootScope.Details[6].month,$rootScope.Details[6].totalWarrantyAmount,$rootScope.Details[6].serialNumber,$rootScope.Details[6].oh_shop,$rootScope.Details[6].claim_wo,$rootScope.Details[6].partNumber,$rootScope.Details[6].partKeyword,$rootScope.Details[6].part_csn,$rootScope.Details[6].part_tsn,$rootScope.Details[6].amount,$rootScope.Details[6].warrantyType,$rootScope.Details[6].costBucket,$rootScope.Details[7].csn_cummulative,$rootScope.Details[7].tsn_cummulative,$rootScope.Details[7].cslsv,$rootScope.Details[7].tslsv,$rootScope.Details[7].month,$rootScope.Details[7].totalWarrantyAmount,$rootScope.Details[7].serialNumber,$rootScope.Details[7].oh_shop,$rootScope.Details[7].claim_wo,$rootScope.Details[7].partNumber,$rootScope.Details[7].partKeyword,$rootScope.Details[7].part_csn,$rootScope.Details[7].part_tsn,$rootScope.Details[7].amount,$rootScope.Details[7].warrantyType,$rootScope.Details[7].costBucket,$rootScope.Details[8].csn_cummulative,$rootScope.Details[8].tsn_cummulative,$rootScope.Details[8].cslsv,$rootScope.Details[8].tslsv,$rootScope.Details[8].month,$rootScope.Details[8].totalWarrantyAmount,$rootScope.Details[8].serialNumber,$rootScope.Details[8].oh_shop,$rootScope.Details[8].claim_wo,$rootScope.Details[8].partNumber,$rootScope.Details[8].partKeyword,$rootScope.Details[8].part_csn,$rootScope.Details[8].part_tsn,$rootScope.Details[8].amount,$rootScope.Details[8].warrantyType,$rootScope.Details[8].costBucket,$rootScope.Details[9].csn_cummulative,$rootScope.Details[9].tsn_cummulative,$rootScope.Details[9].cslsv,$rootScope.Details[9].tslsv,$rootScope.Details[9].month,$rootScope.Details[9].totalWarrantyAmount,$rootScope.Details[9].serialNumber,$rootScope.Details[9].oh_shop,$rootScope.Details[9].claim_wo,$rootScope.Details[9].partNumber,$rootScope.Details[9].partKeyword,$rootScope.Details[9].part_csn,$rootScope.Details[9].part_tsn,$rootScope.Details[9].amount,$rootScope.Details[9].warrantyType,$rootScope.Details[9].costBucket]; 
        }
        else if($rootScope.cnt.length == 2){
          arr18 = [$rootScope.Details[0].csn_cummulative,$rootScope.Details[0].tsn_cummulative,$rootScope.Details[0].cslsv,$rootScope.Details[0].tslsv,$rootScope.Details[0].month,$rootScope.Details[0].totalWarrantyAmount,$rootScope.Details[0].serialNumber,$rootScope.Details[0].oh_shop,$rootScope.Details[0].claim_wo,$rootScope.Details[0].partNumber,$rootScope.Details[0].partKeyword,$rootScope.Details[0].part_csn,$rootScope.Details[0].part_tsn,$rootScope.Details[0].amount,$rootScope.Details[0].warrantyType,$rootScope.Details[0].costBucket,$rootScope.Details[1].csn_cummulative,$rootScope.Details[1].tsn_cummulative,$rootScope.Details[1].cslsv,$rootScope.Details[1].tslsv,$rootScope.Details[1].month,$rootScope.Details[1].totalWarrantyAmount,$rootScope.Details[1].serialNumber,$rootScope.Details[1].oh_shop,$rootScope.Details[1].claim_wo,$rootScope.Details[1].partNumber,$rootScope.Details[1].partKeyword,$rootScope.Details[1].part_csn,$rootScope.Details[1].part_tsn,$rootScope.Details[1].amount,$rootScope.Details[1].warrantyType,$rootScope.Details[1].costBucket];
        }
        else if($rootScope.cnt.length == 3){ 
          arr18 = [$rootScope.Details[0].csn_cummulative,$rootScope.Details[0].tsn_cummulative,$rootScope.Details[0].cslsv,$rootScope.Details[0].tslsv,$rootScope.Details[0].month,$rootScope.Details[0].totalWarrantyAmount,$rootScope.Details[0].serialNumber,$rootScope.Details[0].oh_shop,$rootScope.Details[0].claim_wo,$rootScope.Details[0].partNumber,$rootScope.Details[0].partKeyword,$rootScope.Details[0].part_csn,$rootScope.Details[0].part_tsn,$rootScope.Details[0].amount,$rootScope.Details[0].warrantyType,$rootScope.Details[0].costBucket,$rootScope.Details[1].csn_cummulative,$rootScope.Details[1].tsn_cummulative,$rootScope.Details[1].cslsv,$rootScope.Details[1].tslsv,$rootScope.Details[1].month,$rootScope.Details[1].totalWarrantyAmount,$rootScope.Details[1].serialNumber,$rootScope.Details[1].oh_shop,$rootScope.Details[1].claim_wo,$rootScope.Details[1].partNumber,$rootScope.Details[1].partKeyword,$rootScope.Details[1].part_csn,$rootScope.Details[1].part_tsn,$rootScope.Details[1].amount,$rootScope.Details[1].warrantyType,$rootScope.Details[1].costBucket,$rootScope.Details[2].csn_cummulative,$rootScope.Details[2].tsn_cummulative,$rootScope.Details[2].cslsv,$rootScope.Details[2].tslsv,$rootScope.Details[2].month,$rootScope.Details[2].totalWarrantyAmount,$rootScope.Details[2].serialNumber,$rootScope.Details[2].oh_shop,$rootScope.Details[2].claim_wo,$rootScope.Details[2].partNumber,$rootScope.Details[2].partKeyword,$rootScope.Details[2].part_csn,$rootScope.Details[2].part_tsn,$rootScope.Details[2].amount,$rootScope.Details[2].warrantyType,$rootScope.Details[2].costBucket];      
        }
        else if($rootScope.cnt.length == 4){ 
          arr18 = [$rootScope.Details[0].csn_cummulative,$rootScope.Details[0].tsn_cummulative,$rootScope.Details[0].cslsv,$rootScope.Details[0].tslsv,$rootScope.Details[0].month,$rootScope.Details[0].totalWarrantyAmount,$rootScope.Details[0].serialNumber,$rootScope.Details[0].oh_shop,$rootScope.Details[0].claim_wo,$rootScope.Details[0].partNumber,$rootScope.Details[0].partKeyword,$rootScope.Details[0].part_csn,$rootScope.Details[0].part_tsn,$rootScope.Details[0].amount,$rootScope.Details[0].warrantyType,$rootScope.Details[0].costBucket,$rootScope.Details[1].csn_cummulative,$rootScope.Details[1].tsn_cummulative,$rootScope.Details[1].cslsv,$rootScope.Details[1].tslsv,$rootScope.Details[1].month,$rootScope.Details[1].totalWarrantyAmount,$rootScope.Details[1].serialNumber,$rootScope.Details[1].oh_shop,$rootScope.Details[1].claim_wo,$rootScope.Details[1].partNumber,$rootScope.Details[1].partKeyword,$rootScope.Details[1].part_csn,$rootScope.Details[1].part_tsn,$rootScope.Details[1].amount,$rootScope.Details[1].warrantyType,$rootScope.Details[1].costBucket,$rootScope.Details[2].csn_cummulative,$rootScope.Details[2].tsn_cummulative,$rootScope.Details[2].cslsv,$rootScope.Details[2].tslsv,$rootScope.Details[2].month,$rootScope.Details[2].totalWarrantyAmount,$rootScope.Details[2].serialNumber,$rootScope.Details[2].oh_shop,$rootScope.Details[2].claim_wo,$rootScope.Details[2].partNumber,$rootScope.Details[2].partKeyword,$rootScope.Details[2].part_csn,$rootScope.Details[2].part_tsn,$rootScope.Details[2].amount,$rootScope.Details[2].warrantyType,$rootScope.Details[2].costBucket,$rootScope.Details[3].csn_cummulative,$rootScope.Details[3].tsn_cummulative,$rootScope.Details[3].cslsv,$rootScope.Details[3].tslsv,$rootScope.Details[3].month,$rootScope.Details[3].totalWarrantyAmount,$rootScope.Details[3].serialNumber,$rootScope.Details[3].oh_shop,$rootScope.Details[3].claim_wo,$rootScope.Details[3].partNumber,$rootScope.Details[3].partKeyword,$rootScope.Details[3].part_csn,$rootScope.Details[3].part_tsn,$rootScope.Details[3].amount,$rootScope.Details[3].warrantyType,$rootScope.Details[3].costBucket];
        }
        else if($rootScope.cnt.length == 5){ 
          arr18 = [$rootScope.Details[0].csn_cummulative,$rootScope.Details[0].tsn_cummulative,$rootScope.Details[0].cslsv,$rootScope.Details[0].tslsv,$rootScope.Details[0].month,$rootScope.Details[0].totalWarrantyAmount,$rootScope.Details[0].serialNumber,$rootScope.Details[0].oh_shop,$rootScope.Details[0].claim_wo,$rootScope.Details[0].partNumber,$rootScope.Details[0].partKeyword,$rootScope.Details[0].part_csn,$rootScope.Details[0].part_tsn,$rootScope.Details[0].amount,$rootScope.Details[0].warrantyType,$rootScope.Details[0].costBucket,$rootScope.Details[1].csn_cummulative,$rootScope.Details[1].tsn_cummulative,$rootScope.Details[1].cslsv,$rootScope.Details[1].tslsv,$rootScope.Details[1].month,$rootScope.Details[1].totalWarrantyAmount,$rootScope.Details[1].serialNumber,$rootScope.Details[1].oh_shop,$rootScope.Details[1].claim_wo,$rootScope.Details[1].partNumber,$rootScope.Details[1].partKeyword,$rootScope.Details[1].part_csn,$rootScope.Details[1].part_tsn,$rootScope.Details[1].amount,$rootScope.Details[1].warrantyType,$rootScope.Details[1].costBucket,$rootScope.Details[2].csn_cummulative,$rootScope.Details[2].tsn_cummulative,$rootScope.Details[2].cslsv,$rootScope.Details[2].tslsv,$rootScope.Details[2].month,$rootScope.Details[2].totalWarrantyAmount,$rootScope.Details[2].serialNumber,$rootScope.Details[2].oh_shop,$rootScope.Details[2].claim_wo,$rootScope.Details[2].partNumber,$rootScope.Details[2].partKeyword,$rootScope.Details[2].part_csn,$rootScope.Details[2].part_tsn,$rootScope.Details[2].amount,$rootScope.Details[2].warrantyType,$rootScope.Details[2].costBucket,$rootScope.Details[3].csn_cummulative,$rootScope.Details[3].tsn_cummulative,$rootScope.Details[3].cslsv,$rootScope.Details[3].tslsv,$rootScope.Details[3].month,$rootScope.Details[3].totalWarrantyAmount,$rootScope.Details[3].serialNumber,$rootScope.Details[3].oh_shop,$rootScope.Details[3].claim_wo,$rootScope.Details[3].partNumber,$rootScope.Details[3].partKeyword,$rootScope.Details[3].part_csn,$rootScope.Details[3].part_tsn,$rootScope.Details[3].amount,$rootScope.Details[3].warrantyType,$rootScope.Details[3].costBucket,$rootScope.Details[4].csn_cummulative,$rootScope.Details[4].tsn_cummulative,$rootScope.Details[4].cslsv,$rootScope.Details[4].tslsv,$rootScope.Details[4].month,$rootScope.Details[4].totalWarrantyAmount,$rootScope.Details[4].serialNumber,$rootScope.Details[4].oh_shop,$rootScope.Details[4].claim_wo,$rootScope.Details[4].partNumber,$rootScope.Details[4].partKeyword,$rootScope.Details[4].part_csn,$rootScope.Details[4].part_tsn,$rootScope.Details[4].amount,$rootScope.Details[4].warrantyType,$rootScope.Details[4].costBucket];
        }                

        var arrlen = ($rootScope.cnt.length) * 16;      
        //console.log(arrlen)
       // debugger
        for(var i=0;i<arr18.length;i++)
        {
            sessionStorage.setItem(arr17[i],arr18[i]);
        }        

      });
    }

  }   

//Capture value of ESN for Refresh
$scope.CaptureESN=function(val){
     $scope.QuickLinksdisplay="Show";
     sessionStorage.setItem("SelectedESN",val); 
     $scope.divClone = $("#ParameterDropdown").clone(); 
}

//ESN Dropdown and the Respective Chart
   $scope.PlotESN=function(val){

   $scope.display3="Hide";
 

    $scope.position="AtTimeSeries";
  
    if(val==undefined){
        val=sessionStorage.getItem("SelectedESN");
    }
    $scope.esn=val;
    $scope.display2="Show";
    $scope.display4="Show";
    if($scope.esn!==null){
           
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/csnandEngineDetails?esn='+$scope.esn).then(function(response){ 
 
    $scope.summaryData = response.data; 
    $scope.DataforChart=response.data[0]; 
    $scope.ChartData = [];
    $scope.AlertData=[];    
      $scope.FullSv=[];   
      $scope.QTSV=[];    
      $scope.TailChange=[];  
      $scope.Warranty=[]; 
      $scope.WaterWash=[];
      $scope.Event=[];  
      $scope.ThrustRatingChange=[];    
      $scope.LLP=[];   
      $scope.CMR=[]; 
      $scope.ForecastedSV=[];  
    $rootScope.count = [];
    $scope.FutureData=[];
    $scope.FuturePoints=[];
    $scope.PlotLine=[];
    $rootScope.cnt = [];




    //Plot CSN
    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


 
 
    for(var i=0;i<response.data[0].length;i++){
   
        repairDateYear=$filter('date')(new Date(response.data[0][i].eventDate),"yyyy");  
        repairDateMonth=$filter('date')(new Date(response.data[0][i].eventDate),"M");
       
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date(response.data[0][i].eventDate),"d");
     
        if(repairDateDay.length==1){
           repairDateYear='200'+repairDateDay;
        }
       
        else{
            repairDateYear='20'+repairDateDay;
        }
        repairDateDay=01;
 
        repairDateHour=0;
        repairDateMin=0;
        $scope.ChartData.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':response.data[0][i].csn,'eventTitle': response.data[0][i].eventTitle,'event':response.data[0][i].event,'eventID':response.data[0][i].eventID});
     
        $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');
    }
 
 
//Plot Alert
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Alert"){
            $scope.AlertData.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.AlertData.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

 
//Plot Full SV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Full SV"){
            $scope.FullSv.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
 
        }
        else{
            $scope.FullSv.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

    //Plot QTSV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="QT SV"){
            $scope.QTSV.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
     
        }
        else{
            $scope.QTSV.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

 
    //Plot Tail Change
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Tail Change"){
            $scope.TailChange.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.TailChange.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

    //Plot Warranty
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Warranty"){
            $scope.Warranty.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.Warranty.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

    //Plot Water Wash
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Water Wash"){
            $scope.WaterWash.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.WaterWash.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

    //Plot Event
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Event"){
            $scope.Event.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.Event.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

 
    //Plot Thrust Rating Capacity
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Thrust Rating Change"){
            $scope.ThrustRatingChange.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.ThrustRatingChange.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

 
    //Plot LLP
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="LLP"){
            $scope.LLP.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.LLP.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

 
    //Plot CMR
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="CMR Predicted SV"){
            $scope.CMR.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.CMR.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

 
    //Plot Forecasted SV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Forecasted SV"){
            $scope.ForecastedSV.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.ForecastedSV.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }
 

 
 
//Plot Future
     for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].x>$scope.UTCofCurrentDate){
            $scope.FutureData.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].y,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.FutureData.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


//PlotLine
for(var i=0;i<$scope.FutureData.length;i++){
    if($scope.FutureData[i].y != null){
        $scope.FuturePoints.push($scope.FutureData[i].x);
    }
}

    $scope.PlotLine=$scope.FuturePoints[0];


               $scope.chart1 = new Highcharts.Chart({
            tooltip: { enabled: false },
              chart: {
                type:'area',
                renderTo:'chart2',
                  zoomType: 'x'

              },
                title: {
                  text: 'Lifecycle',
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },

             navigator: {
                enabled: true
            },
              rangeSelector: {
            selected: 1
          },
        scrollbar: {
            enabled: true
        },          

                 xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
                  
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              },
              //PlotLine after current month
              plotLines: [{

                                        color: 'green',
                                            width: 2,
                                            value: $scope.PlotLine,
                                            dashStyle: 'longdashdot',
                                            label: {
                                                text: 'Future',
                                                color: 'blue',
                                               fontFamily: 'geInspira'
                                            }
                       

                    }]
                      },
              yAxis: [{
                title: {
                  text: 'CSN'
                    }
                },{
                  title: {
                    text: 'Parameter',
                   
                },
                opposite: true
            }
                
                    ],
            credits: {
            enabled: false
            },

            

        plotOptions: {
           series: {
            turboThreshold:5000,                       
              cursor: 'pointer',
              // point: {                   
                        events: {
                            click: function (e) {
                              debugger
                                var eID = e.point.eventID;
                                var ename = e.point.series.name;
                                $rootScope.flag = 0;
                                $scope.showDetails(eID,ename);     
                                setTimeout(function(){ $scope.waitTime(); }, 3000);                         
                                $scope.waitTime = function(){                              
                                    if(ename == 'Alert')   {
 
                                       hs.htmlExpand(null, {
 
                                        headingText: e.point.series.name,
                                        maincontentText: '<b>ESN :</b>' + sessionStorage.getItem('SelectedPesn') + '<br/> '+'<b>CSN :</b>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' + '<b>TSN :</b>' +sessionStorage.getItem('SelectedPtsn') + '<br/>' +
                                            '<b>CLSV :</b>' +sessionStorage.getItem('SelectedPclsv') + '<br/> ' +'<b>TSLSV :</b>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>AlertDate :</b>' +sessionStorage.getItem('SelectedPalertDate') + '<br/> ' +
                                            '<b>AlertDesc :</b>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</b>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                            '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</B>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                            '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                        width: 200
                                       });
                                    }
                                    else if(ename == 'TailChange')   {                     
 
                                      hs.htmlExpand(null, {
 
  
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>ESN :</B>' + sessionStorage.getItem('SelectePesn') + '<br/> '+'<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>FromTail :</B>' +sessionStorage.getItem('SelectedPfromTail') + '<br/> ' +'<b>ToTail :</B>' +sessionStorage.getItem('SelectedPtoTail') + '<br/> ' +
                                              '<b>AlertMonth :</B>' +sessionStorage.getItem('SelectedPalertMonth') + '<br/> ' + '<b>AlertDesc :</B>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</B>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                              '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</b>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                              '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                          width: 200
                                       });
                                    } 
                                    else if(ename == 'WaterWash')   {                                                                                                       
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>CSLWW :</B>' +sessionStorage.getItem('SelectePcslww') + '<br/> ' +'<b>TSLWW :</B>' +sessionStorage.getItem('SelectePtslww') + '<br/> ' +
                                              '<b>DEGT Last :</B>' +sessionStorage.getItem('SelectedPdegt_lastww') + '<br/> ' + '<b>Altitude Last :</B>' +sessionStorage.getItem('SelectedPaltitude_lastww') + '<br/> ' + '<b>oilTemperature Last:</B>' +sessionStorage.getItem('SelectedPoiltemp_lastww') + '<br/> ' +'<b>Mach Last:</b>' +sessionStorage.getItem('SelectedPmach_lastww') + '<br/> ' +'<b>CoreSpeed Last:</B>' +sessionStorage.getItem('SelectedPcorespeed_lastww') + '<br/> ' +
                                              '<b>Fuel Flow Last :</B>' +sessionStorage.getItem('SelectedPfuelflow_lastww') + '<br/> ' +'<b>oilPressure Last :</B>' +sessionStorage.getItem('SelectedPoilpressure_lastww') + '<br/> ' +'<b>DEGT Current:</B>' +sessionStorage.getItem('SelectedPdegt_currentww') + '<br/> ' +'<b>Altitude Current:</B>' +sessionStorage.getItem('SelectedPaltitude_currentww') + '<br/> ' +
                                              '<b>oilTemperature Current:</B>' +sessionStorage.getItem('SelectedPoilTemp_currentww') + '<br/> ' +'<b>Mach Current:</b>' +sessionStorage.getItem('SelectedPmach_currentww') + '<br/> ' +'<b>CoreSpeed Current:</B>' +sessionStorage.getItem('SelectedPcoreSpeed_currentww') + '<br/> ' +
                                              '<b>Fuel Flow Current:</B>' +sessionStorage.getItem('SelectedPfuelFlow_currentww') + '<br/> ' +'<b>oilPressure Current:</B>' +sessionStorage.getItem('SelectedPoilPressure_currentww') + '',
                                          width: 280
                                       });
                                    }
                                    else if(ename == 'Event')   {                                                                                                      
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('Selcsn_cummulative') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv') + '<br/> ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth') + '<br/> ' +'<b>CNR Type :</B>' +sessionStorage.getItem('Selevent_CnrType') + '<br/> ' +
                                              '<b>CNR Desc :</B>' +sessionStorage.getItem('Selevent_CnrDesc') + '<br/> ' + '<b>Month_year :</B>' +sessionStorage.getItem('Selmonth_Year') + '<br/> ' + '<b>Alert Description:</B>' +sessionStorage.getItem('SelalertDescription') + '<br/> ' +'<b>DEGT Current:</b>' +sessionStorage.getItem('Seldegt_current') + '<br/> ' +'<b>Altitude Current:</b>' +sessionStorage.getItem('Selaltitude_current') + '<br/> '+'<b>Oil Temperature Current:</B>' +sessionStorage.getItem('Seloiltemp_current') + '<br/> ' +
                                              '<b>Mach Current :</B>' +sessionStorage.getItem('Selmach_current') + '<br/> ' +'<b>CoreSpeed Current :</B>' +sessionStorage.getItem('Selcorespeed_current') + '<br/> ' +'<b>FuelFlow Current :</B>' +sessionStorage.getItem('Selfuelflow_current') + '<br/> ' +'<b>Oil pressure Current :</B>' +sessionStorage.getItem('Seloilpressure_current') + '<br/> ' +
                                              '<b>DEGT 1MonOld:</B>' +sessionStorage.getItem('Seldegt_1MonOld') + '<br/> ' +'<b>Altitude 1MonOld:</b>' +sessionStorage.getItem('Selaltitude_1MonOld') + '<br/> ' +'<b>Mach 1MonOld:</B>' +sessionStorage.getItem('Selmach_1MonOld') + '<br/> ' +
                                              '<b>CoreSpeed 1MonOld :</B>' +sessionStorage.getItem('Selcorespeed_1MonOld') + '<br/> ' +'<b>FuelFlow 1MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') + '<br/> ' +'<b>OilPressure 1MonOld:</B>' +sessionStorage.getItem('Seloilpressure_1MonOld') +'<br/> ' +'<b>DEGT 2MonOld:</B>' +sessionStorage.getItem('Seldegt_2MonOld') +'<br/> ' +'<b>Altitude 2MonOld:</B>' +sessionStorage.getItem('Selaltitude_2MonOld') +'<br/> ' +
                                              '<b>OilTemperature 2MonOld:</B>' +sessionStorage.getItem('Seloiltemp_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') +'<br/> ' +'<b>Mach 2MonOld:</B>' +sessionStorage.getItem('Selmach_2MonOld') +'<br/> ' +'<b>CoreSpeed 2MonOld:</B>' +sessionStorage.getItem('Selcorespeed_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_2MonOld') +'<br/> ' +
                                              '<b>OilPressure 2MonOld:</B>' +sessionStorage.getItem('Seloilpressure_2MonOld') +'<br/> ' +'<b>DEGT 3MonOld:</B>' +sessionStorage.getItem('Seldegt_3MonOld') +'<br/> ' +'<b>Altitude 3MonOld:</B>' +sessionStorage.getItem('Selaltitude_3MonOld') +'<br/> ' +'<b>OilTemperature 3MonOld:</B>' +sessionStorage.getItem('Seloiltemp_3MonOld') +'<br/> ' +'<b>Mach 3MonOld:</B>' +sessionStorage.getItem('Selmach_3MonOld') +'<br/> ' +
                                              '<b>CoreSpeed 3MonOld:</B>' +sessionStorage.getItem('Selcorespeed_3MonOld') +'<br/> ' +'<b>FuelFlow 3MonOld:</B>' +sessionStorage.getItem('Selfuelflow_3MonOld') +'<br/> ' +'<b>OilPressure 3MonOld:</B>' +sessionStorage.getItem('Seloilpressure_3MonOld') +'',
                                          width: 300
                                       });
                                    }                                                                                                       
                                    else if(ename == 'ForecastedSV') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });
                                    }
                                    else if(ename == 'CMR') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });                                  
                                    }
                                    else if(ename == 'ThrustRatingChange') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>ThrustRatingPrior :</B>' +sessionStorage.getItem('SelthrustRatingPrior') + '<br/> ' +'<b>ThrustRatingCurrent :</B>' +sessionStorage.getItem('SelthrustRatingCurrent') + '',
                                          width: 200
                                       });                                     
                                    }
                                    else if(ename == 'LLP'){
                                      console.log($rootScope.count.length)
                                      if($rootScope.count.length>18) {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber19') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin19') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn19') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft19') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber20') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin20') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn20') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft20') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber21') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin21') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn21') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft21') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber22') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin22') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn22') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft22') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber23') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin23') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn23') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft23') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber24') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin24') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn24') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft24') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber25') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin25') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn25') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft25') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber26') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin26') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn26') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft26') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber27') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin27') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn27') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft27') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber28') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin28') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn28') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft28') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber29') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin29') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn29') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft29') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber30') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin30') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn30') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft30') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber31') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin31') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn31') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft31') +'<br><br> ' +'',
                                          width: 600 
                                        });
                                      } 
                                      else {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                           maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'',
                                          width: 600                                                                                 
                                          });
                                      }                                       
                                    }
                                    else if(ename == 'Warranty'){
                                      console.log($rootScope.cnt.length)                                      
                                      if($rootScope.cnt.length>6) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative7') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth7') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount7') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn7') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount7') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket7') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative8') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth8') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount8') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket8') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative9') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth9') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount9') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn9') +'&nbsp;&nbsp;&nbsp;' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount9') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket9') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative10') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth10') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount10') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket10')+'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length<=2) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==3) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==4) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==5) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.series.name,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'',
                                          width: 600
                                        });
                                      }                                      
                                      else if($rootScope.cnt.length==6) {                                      
                                          hs.htmlExpand(null, {
                                            headingText: e.point.series.name,
                                            maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'',
                                            width: 600
                                          });
                                      }                                                                                                                                                        
                                    }                                                                                                                                                                                           
                                }
                            }
 
                        }
                  },
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        },
                         spline: {
                        marker: {
                            enabled: true
                        }
                    }
                    },
                  exporting: {
                    enabled: false
                    },
                     legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
             //          tooltip: {
                
                    
             // formatter: function () {
           
             //        return null; //'<b>'+this.y+'</b>';
             //    },
             // },     
             annotationsOptions: {
                    enabledButtons: false
                    },
                        series: [{
                    name: 'CSN',
                    data: $scope.ChartData,

                },{
                    type:'scatter',
                    name:'Alert',
                    data:$scope.AlertData,
                    marker: {
                    symbol:'url(../images/alert-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'FullSV',
                    data:$scope.FullSv,
                    marker: {
                    symbol:'url(../images/full-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'QTSV',
                    data:$scope.QTSV,
                    marker: {
                    symbol:'url(../images/qtsv-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'TailChange',
                    data:$scope.TailChange,
                    marker: {
                    symbol:'url(../images/tail-change-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'Warranty',
                    data:$scope.Warranty,
                    marker: {
                    symbol:'url(../images/warranty-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'WaterWash',
                    data:$scope.WaterWash,
                    marker: {
                    symbol:'url(../images/waterwash-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'Event',
                    data:$scope.Event,
                    marker: {
                    symbol:'url(../images/event-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'ThrustRatingChange',
                    data:$scope.ThrustRatingChange,
                    marker: {
                    symbol:'url(../images/thrust-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'LLP',
                    data:$scope.LLP,
                    marker: {
                    symbol:'url(../images/llp-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'CMR',
                    data:$scope.CMR,
                    marker: {
                    symbol:'url(../images/cmr-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'ForecastedSV',
                    data:$scope.ForecastedSV,
                    marker: {
                    symbol:'url(../images/forecastedsv-icon.png)'
                }
            }
            ,{
                    type:'area',
                    name:'Future',
                    data:$scope.FutureData,
                      fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#BFBFBF'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                              
            },{
                    
                    name:'Parameter Selected',
                    data:[],
                    yAxis:1,
                        fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#FA9B4E'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                
            }
                ]
                         });   
              });
            }
         

           }


$scope.PlotESN($scope.esnData1);
$scope.CaptureESN($scope.esnData1);


//Plot Chart individually for Parameter
$scope.PlotParameter=function(){
    
              var chart = new Highcharts.Chart({
              tooltip: { enabled: false },                
              chart: {
                type:'area',
                renderTo:'chart4',
                  zoomType: 'x'

              },
                title: {
                  text: '',
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
              scrollbar: {
                enabled: true
              },
             navigator: {
                enabled: true
            },
            rangeSelector: {
              selected: 1
            },

             xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
                  
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              },
            
                      },
              yAxis: [{
                title: {
                  text: $scope.ValueTag
                    }
                }
                
                    ],
            credits: {
            enabled: false
            },

            

        plotOptions: {
            series: {
            turboThreshold:5000           
                    },
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        },
                         spline: {
                        marker: {
                            enabled: true
                        }
                    }
                    },
                  exporting: {
                    enabled: false
                    },
                     legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
             //          tooltip: {
                
                    
             // formatter: function () {
           
             //        return '<b>'+this.y+'</b>';
             //    },
             // },    
              annotationsOptions: {
                    enabledButtons: false
                    },
                        series: [{
                    
                    name:'Parameter Selected',
                    data:$scope.DataforParameterChart,
                  
               
                
            }
                ]
                         });
}

//Plot Chart for Event
$scope.PlotEvent=function(val){
    $scope.selecteddata1 = "";
    sessionStorage.setItem("SelectedEvent",val); 
   $scope.EventSelected=sessionStorage.getItem('SelectedEvent',val);
   $(function() {
        $('.ui.dropdown').dropdown();
    });
   $scope.display2="Hide";
   $scope.display3="Show";
  
   $scope.EventData=[]; 
   $scope.position="AtEventChart";

    angular.forEach($scope.DataforChart,function(value,key){
        if(value.eventTitle=="Alert" && val=='0'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
     
        }
        if(value.eventTitle=="Full SV" && val=='1'){
          $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
         
        }
        if(value.eventTitle=="QT SV" && val=='2'){
           $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
        if(value.eventTitle=="Tail Change" && val=='3'){
       $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
         
        }
        if(value.eventTitle=="Warranty" && val=='4'){
           $scope.Title=value.eventTitle;
            $scope.EventData.push(value);

        }
        if(value.eventTitle=="Water Wash" && val=='5'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Event" && val=='6'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
        if(value.eventTitle=="Thrust Rating Change" && val=='7'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
   
        }
        if(value.eventTitle=="LLP" && val=='8'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
      
        }
        if(value.eventTitle=="CMR Predicted SV" && val=='9'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
      
        }
        if(value.eventTitle=="Forecasted SV" && val=='10'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
       
    })
    
     if(val=='11'){
       $scope.display2="Show";
       $scope.display3="Hide";
          $scope.Title="Future";
            angular.forEach($scope.ChartData,function(value,key){
              if(value.x>$scope.UTCofCurrentDate){
               
            $scope.EventData.push(value);
          }
            })

        }

    $scope.ChartDataCSN = [];
    $scope.ChartDataEvent = [];
    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for(var i=0;i<$scope.EventData.length;i++){
    
        repairDateYear=$filter('date')(new Date($scope.EventData[i].eventDate),"yyyy");   
        repairDateMonth=$filter('date')(new Date($scope.EventData[i].eventDate),"M");
        
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date($scope.EventData[i].eventDate),"d");
      
        if(repairDateDay.length==1){
           repairDateYear='200'+repairDateDay;
        }
        
        else{
            repairDateYear='20'+repairDateDay;
        }
        repairDateDay=01;

        repairDateHour=0;
        repairDateMin=0;
        if(val!=11){
        $scope.ChartDataCSN.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].csn,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
        $scope.ChartDataEvent.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
      }
      else{
            $scope.ChartDataCSN.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].y,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
            $scope.ChartDataEvent.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
      }
      
        $scope.ChartDataCSN = $filter('orderBy')($scope.ChartDataCSN,'x');
        $scope.ChartDataEvent = $filter('orderBy')($scope.ChartDataEvent,'x');

    }


               $scope.chart2 = new Highcharts.Chart({
                tooltip: { enabled: false },
              chart: {
                
                renderTo:'chart2',
                    zoomType: 'x',
          
              },
                title: {
                  text:    $scope.Title,
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
                scrollbar: {
            enabled: true
        },
         navigator: {
            enabled: true
        },
          rangeSelector: {
        selected: 1
      },

                 xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
        
                  ordinal:true,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              }
                      },
              yAxis: [{
                title: {
                  text: 'Value'
                    }
                
                    },{ 
                  title: {
                    text: 'Parameter',
                   
                },
                opposite: true
            }],
            credits: {
            enabled: false
            },

            

    plotOptions: {
    series: {
        
            turboThreshold:5000,
              cursor: 'pointer',
              // point: {                   
                        events: {
                            click: function (e) {
                              debugger
                                var eID = e.point.eventID;
                                var ename = e.point.eventTitle;
                                $rootScope.flag = 0;
                                $scope.showDetails(eID,ename);     
                                setTimeout(function(){ $scope.waitTime(); }, 3000);                         
                                $scope.waitTime = function(){                              
                                    if(ename == 'Alert')   {
 
                                       hs.htmlExpand(null, {
 
                                        headingText: e.point.eventTitle,
                                        maincontentText: '<b>ESN :</b>' + sessionStorage.getItem('SelectedPesn') + '<br/> '+'<b>CSN :</b>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' + '<b>TSN :</b>' +sessionStorage.getItem('SelectedPtsn') + '<br/>' +
                                            '<b>CLSV :</b>' +sessionStorage.getItem('SelectedPclsv') + '<br/> ' +'<b>TSLSV :</b>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>AlertDate :</b>' +sessionStorage.getItem('SelectedPalertDate') + '<br/> ' +
                                            '<b>AlertDesc :</b>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</b>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                            '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</B>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                            '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                        width: 200
                                       });
                                    }
                                    else if(ename == 'Tail Change')   {                     
 
                                      hs.htmlExpand(null, {
 
  
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>ESN :</B>' + sessionStorage.getItem('SelectePesn') + '<br/> '+'<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>FromTail :</B>' +sessionStorage.getItem('SelectedPfromTail') + '<br/> ' +'<b>ToTail :</B>' +sessionStorage.getItem('SelectedPtoTail') + '<br/> ' +
                                              '<b>AlertMonth :</B>' +sessionStorage.getItem('SelectedPalertMonth') + '<br/> ' + '<b>AlertDesc :</B>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</B>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                              '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</b>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                              '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                          width: 200
                                       });
                                    } 
                                    else if(ename == 'Water Wash')   {                                                                                                       
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>CSLWW :</B>' +sessionStorage.getItem('SelectePcslww') + '<br/> ' +'<b>TSLWW :</B>' +sessionStorage.getItem('SelectePtslww') + '<br/> ' +
                                              '<b>DEGT Last :</B>' +sessionStorage.getItem('SelectedPdegt_lastww') + '<br/> ' + '<b>Altitude Last :</B>' +sessionStorage.getItem('SelectedPaltitude_lastww') + '<br/> ' + '<b>oilTemperature Last:</B>' +sessionStorage.getItem('SelectedPoiltemp_lastww') + '<br/> ' +'<b>Mach Last:</b>' +sessionStorage.getItem('SelectedPmach_lastww') + '<br/> ' +'<b>CoreSpeed Last:</B>' +sessionStorage.getItem('SelectedPcorespeed_lastww') + '<br/> ' +
                                              '<b>Fuel Flow Last :</B>' +sessionStorage.getItem('SelectedPfuelflow_lastww') + '<br/> ' +'<b>oilPressure Last :</B>' +sessionStorage.getItem('SelectedPoilpressure_lastww') + '<br/> ' +'<b>DEGT Current:</B>' +sessionStorage.getItem('SelectedPdegt_currentww') + '<br/> ' +'<b>Altitude Current:</B>' +sessionStorage.getItem('SelectedPaltitude_currentww') + '<br/> ' +
                                              '<b>oilTemperature Current:</B>' +sessionStorage.getItem('SelectedPoilTemp_currentww') + '<br/> ' +'<b>Mach Current:</b>' +sessionStorage.getItem('SelectedPmach_currentww') + '<br/> ' +'<b>CoreSpeed Current:</B>' +sessionStorage.getItem('SelectedPcoreSpeed_currentww') + '<br/> ' +
                                              '<b>Fuel Flow Current:</B>' +sessionStorage.getItem('SelectedPfuelFlow_currentww') + '<br/> ' +'<b>oilPressure Current:</B>' +sessionStorage.getItem('SelectedPoilPressure_currentww') + '',
                                          width: 280
                                       });
                                    }
                                    else if(ename == 'Event')   {                                                                                                      
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('Selcsn_cummulative') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv') + '<br/> ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth') + '<br/> ' +'<b>CNR Type :</B>' +sessionStorage.getItem('Selevent_CnrType') + '<br/> ' +
                                              '<b>CNR Desc :</B>' +sessionStorage.getItem('Selevent_CnrDesc') + '<br/> ' + '<b>Month_year :</B>' +sessionStorage.getItem('Selmonth_Year') + '<br/> ' + '<b>Alert Description:</B>' +sessionStorage.getItem('SelalertDescription') + '<br/> ' +'<b>DEGT Current:</b>' +sessionStorage.getItem('Seldegt_current') + '<br/> ' +'<b>Altitude Current:</b>' +sessionStorage.getItem('Selaltitude_current') + '<br/> '+'<b>Oil Temperature Current:</B>' +sessionStorage.getItem('Seloiltemp_current') + '<br/> ' +
                                              '<b>Mach Current :</B>' +sessionStorage.getItem('Selmach_current') + '<br/> ' +'<b>CoreSpeed Current :</B>' +sessionStorage.getItem('Selcorespeed_current') + '<br/> ' +'<b>FuelFlow Current :</B>' +sessionStorage.getItem('Selfuelflow_current') + '<br/> ' +'<b>Oil pressure Current :</B>' +sessionStorage.getItem('Seloilpressure_current') + '<br/> ' +
                                              '<b>DEGT 1MonOld:</B>' +sessionStorage.getItem('Seldegt_1MonOld') + '<br/> ' +'<b>Altitude 1MonOld:</b>' +sessionStorage.getItem('Selaltitude_1MonOld') + '<br/> ' +'<b>Mach 1MonOld:</B>' +sessionStorage.getItem('Selmach_1MonOld') + '<br/> ' +
                                              '<b>CoreSpeed 1MonOld :</B>' +sessionStorage.getItem('Selcorespeed_1MonOld') + '<br/> ' +'<b>FuelFlow 1MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') + '<br/> ' +'<b>OilPressure 1MonOld:</B>' +sessionStorage.getItem('Seloilpressure_1MonOld') +'<br/> ' +'<b>DEGT 2MonOld:</B>' +sessionStorage.getItem('Seldegt_2MonOld') +'<br/> ' +'<b>Altitude 2MonOld:</B>' +sessionStorage.getItem('Selaltitude_2MonOld') +'<br/> ' +
                                              '<b>OilTemperature 2MonOld:</B>' +sessionStorage.getItem('Seloiltemp_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') +'<br/> ' +'<b>Mach 2MonOld:</B>' +sessionStorage.getItem('Selmach_2MonOld') +'<br/> ' +'<b>CoreSpeed 2MonOld:</B>' +sessionStorage.getItem('Selcorespeed_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_2MonOld') +'<br/> ' +
                                              '<b>OilPressure 2MonOld:</B>' +sessionStorage.getItem('Seloilpressure_2MonOld') +'<br/> ' +'<b>DEGT 3MonOld:</B>' +sessionStorage.getItem('Seldegt_3MonOld') +'<br/> ' +'<b>Altitude 3MonOld:</B>' +sessionStorage.getItem('Selaltitude_3MonOld') +'<br/> ' +'<b>OilTemperature 3MonOld:</B>' +sessionStorage.getItem('Seloiltemp_3MonOld') +'<br/> ' +'<b>Mach 3MonOld:</B>' +sessionStorage.getItem('Selmach_3MonOld') +'<br/> ' +
                                              '<b>CoreSpeed 3MonOld:</B>' +sessionStorage.getItem('Selcorespeed_3MonOld') +'<br/> ' +'<b>FuelFlow 3MonOld:</B>' +sessionStorage.getItem('Selfuelflow_3MonOld') +'<br/> ' +'<b>OilPressure 3MonOld:</B>' +sessionStorage.getItem('Seloilpressure_3MonOld') +'',
                                          width: 300
                                       });
                                    }                                                                                                       
                                    else if(ename == 'Forecasted SV') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });
                                    }
                                    else if(ename == 'CMR') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });                                  
                                    }
                                    else if(ename == 'Thrust Rating Change') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>ThrustRatingPrior :</B>' +sessionStorage.getItem('SelthrustRatingPrior') + '<br/> ' +'<b>ThrustRatingCurrent :</B>' +sessionStorage.getItem('SelthrustRatingCurrent') + '',
                                          width: 200
                                       });                                     
                                    }
                                    else if(ename == 'LLP'){
                                    //  console.log($rootScope.count.length)
                                      if($rootScope.count.length>18) {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber19') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin19') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn19') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft19') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber20') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin20') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn20') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft20') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber21') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin21') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn21') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft21') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber22') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin22') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn22') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft22') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber23') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin23') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn23') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft23') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber24') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin24') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn24') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft24') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber25') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin25') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn25') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft25') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber26') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin26') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn26') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft26') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber27') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin27') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn27') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft27') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber28') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin28') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn28') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft28') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber29') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin29') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn29') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft29') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber30') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin30') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn30') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft30') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber31') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin31') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn31') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft31') +'<br><br> ' +'',
                                          width: 600 
                                        });
                                      } 
                                      else {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                           maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'',
                                          width: 600                                                                                 
                                          });
                                      }                                       
                                    }
                                    else if(ename == 'Warranty'){
                                      console.log($rootScope.cnt.length)                                      
                                      if($rootScope.cnt.length>6) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative7') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth7') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount7') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn7') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount7') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket7') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative8') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth8') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount8') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket8') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative9') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth9') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount9') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn9') +'&nbsp;&nbsp;&nbsp;' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount9') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket9') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative10') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth10') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount10') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket10')+'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length<=2) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==3) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==4) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==5) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'',
                                          width: 600
                                        });
                                      }                                      
                                      else if($rootScope.cnt.length==6) {                                      
                                          hs.htmlExpand(null, {
                                            headingText: e.point.eventTitle,
                                            maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'',
                                            width: 600
                                          });
                                      }                                                                                                                                                        
                                    }                                                                                                                                                                                           
                                }
                            }
 
                        }                                
                    
            },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                 spline: {
                marker: {
                    enabled: true
                }
            }
            },
          exporting: {
            enabled: false
            },
             legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth:1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
     //          tooltip: {
        
            
     // formatter: function () {
   
     //        return '<b>'+this.y+'</b>';
     //                },
     // },    
      annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            type:'area',
            name: 'CSN',
            data: $scope.ChartDataCSN,
            marker:{
              symbol: val==11 ? 'url(../images/circle-icon.png)' : 'url(../images/transparent-icon.png)'
            }
        },
        {
            type:'scatter',
            name: 'Events',
            data: $scope.ChartDataEvent,
            marker: {
                symbol: val==0 ? 'url(../images/alert-icon.png)' : val==1 ? 'url(../images/full-icon.png)' : val==2 ? 'url(../images/qtsv-icon.png)' : val==3 ? 'url(../images/tail-change-icon.png)' : val==4 ? 'url(../images/warranty-icon.png)' : val==5 ? 'url(../images/waterwash-icon.png)' : val==6 ? 'url(../images/event-icon.png)' : val==7 ? 'url(../images/thrust-icon.png)' : val==8 ? 'url(../images/llp-icon.png)' :val==9 ? 'url(../images/cmr-icon.png)' : val==10 ? 'url(../images/forecastedsv-icon.png)' :  'url(../images/transparent-icon.png)'
             }
            
        },{
                    
                    name:'Parameter Selected',
                    data:[],
                    yAxis:1,
                        fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#FA9B4E'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                
            }

        ]
                 });
}

//Plot Chart for Events in FullScreen
$scope.PlotEvent1=function(val){
    $scope.selecteddata1 = "";
    sessionStorage.setItem("SelectedEvent",val); 
   $scope.EventSelected=sessionStorage.getItem('SelectedEvent',val);
   $(function() {
        $('.ui.dropdown').dropdown();
    });
   $scope.display2="Hide";
   $scope.display3="Show";
  
   $scope.EventData=[];
   $scope.position="AtEventChart";

    angular.forEach($scope.DataforChart,function(value,key){
        if(value.eventTitle=="Alert" && val=='0'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
     
        }
        if(value.eventTitle=="Full SV" && val=='1'){
          $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
         
        }
        if(value.eventTitle=="QT SV" && val=='2'){
           $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
        if(value.eventTitle=="Tail Change" && val=='3'){
       $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
         
        }
        if(value.eventTitle=="Warranty" && val=='4'){
           $scope.Title=value.eventTitle;
            $scope.EventData.push(value);

        }
        if(value.eventTitle=="Water Wash" && val=='5'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Event" && val=='6'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
        if(value.eventTitle=="Thrust Rating Change" && val=='7'){
            $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
   
        }
        if(value.eventTitle=="LLP" && val=='8'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
      
        }
        if(value.eventTitle=="CMR Predicted SV" && val=='9'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
      
        }
        if(value.eventTitle=="Forecasted SV" && val=='10'){
             $scope.Title=value.eventTitle;
            $scope.EventData.push(value);
       
        }
       
    })
    
     if(val=='11'){
       $scope.display2="Show";
       $scope.display3="Hide";
          $scope.Title="Future";
            angular.forEach($scope.ChartData,function(value,key){
              if(value.x>$scope.UTCofCurrentDate){
               
            $scope.EventData.push(value);
          }
            })

        }

    $scope.ChartDataCSN = [];
    $scope.ChartDataEvent = [];
    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for(var i=0;i<$scope.EventData.length;i++){
    
        repairDateYear=$filter('date')(new Date($scope.EventData[i].eventDate),"yyyy");   
        repairDateMonth=$filter('date')(new Date($scope.EventData[i].eventDate),"M");
        
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date($scope.EventData[i].eventDate),"d");
      
        if(repairDateDay.length==1){
           repairDateYear='200'+repairDateDay;
        }
        
        else{
            repairDateYear='20'+repairDateDay;
        }
        repairDateDay=01;

        repairDateHour=0;
        repairDateMin=0;
        if(val!=11){
        $scope.ChartDataCSN.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].csn,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
        $scope.ChartDataEvent.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
      }
      else{
            $scope.ChartDataCSN.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].y,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
            $scope.ChartDataEvent.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth],'eventID': $scope.EventData[i].eventID,'eventTitle': $scope.EventData[i].eventTitle});
      }
      
        $scope.ChartDataCSN = $filter('orderBy')($scope.ChartDataCSN,'x');
        $scope.ChartDataEvent = $filter('orderBy')($scope.ChartDataEvent,'x');

    }

               $scope.chart2 = new Highcharts.Chart({
                tooltip: { enabled: false },
              chart: {
                
                renderTo:'chart3',
                    zoomType: 'x',
          
              },
                title: {
                  text:    $scope.Title,
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
                scrollbar: {
            enabled: true
        },
         navigator: {
            enabled: true
        },
          rangeSelector: {
        selected: 1
      },

                 xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
        
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              }
                      },
              yAxis: [{
                title: {
                  text: 'Value'
                    }
                
                    },{ 
                  title: {
                    text: 'Parameter',
                   
                },
                opposite: true
            }],
            credits: {
            enabled: false
            },

            

    plotOptions: {
    series: {
        
            turboThreshold:5000,
              cursor: 'pointer',
              // point: {                   
                        events: {
                            click: function (e) {
                              debugger
                                var eID = e.point.eventID;
                                var ename = e.point.eventTitle;
                                $rootScope.flag = 0;
                                $scope.showDetails(eID,ename);     
                                setTimeout(function(){ $scope.waitTime(); }, 3000);                         
                                $scope.waitTime = function(){                              
                                    if(ename == 'Alert')   {
 
                                       hs.htmlExpand(null, {
 
                                        headingText: e.point.eventTitle,
                                        maincontentText: '<b>ESN :</b>' + sessionStorage.getItem('SelectedPesn') + '<br/> '+'<b>CSN :</b>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' + '<b>TSN :</b>' +sessionStorage.getItem('SelectedPtsn') + '<br/>' +
                                            '<b>CLSV :</b>' +sessionStorage.getItem('SelectedPclsv') + '<br/> ' +'<b>TSLSV :</b>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>AlertDate :</b>' +sessionStorage.getItem('SelectedPalertDate') + '<br/> ' +
                                            '<b>AlertDesc :</b>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</b>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                            '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</B>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                            '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                        width: 200
                                       });
                                    }
                                    else if(ename == 'Tail Change')   {                     
 
                                      hs.htmlExpand(null, {
 
  
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>ESN :</B>' + sessionStorage.getItem('SelectePesn') + '<br/> '+'<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>FromTail :</B>' +sessionStorage.getItem('SelectedPfromTail') + '<br/> ' +'<b>ToTail :</B>' +sessionStorage.getItem('SelectedPtoTail') + '<br/> ' +
                                              '<b>AlertMonth :</B>' +sessionStorage.getItem('SelectedPalertMonth') + '<br/> ' + '<b>AlertDesc :</B>' +sessionStorage.getItem('SelectedPalertDesc') + '<br/> ' + '<b>DEGT :</B>' +sessionStorage.getItem('SelectedPdegt') + '<br/> ' +'<b>Altitude :</B>' +sessionStorage.getItem('SelectedPaltitude') + '<br/> ' +
                                              '<b>oilTemperature :</B>' +sessionStorage.getItem('SelectedPoilTemp') + '<br/> ' +'<b>Mach :</b>' +sessionStorage.getItem('SelectedPmach') + '<br/> ' +'<b>CoreSpeed :</B>' +sessionStorage.getItem('SelectedPcoreSpeed') + '<br/> ' +
                                              '<b>Fuel Flow :</B>' +sessionStorage.getItem('SelectedPfuelFlow') + '<br/> ' +'<b>oilPressure :</B>' +sessionStorage.getItem('SelectedPoilPressure') + '',
                                          width: 200
                                       });
                                    } 
                                    else if(ename == 'Water Wash')   {                                                                                                       
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('SelectedPcsn') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('SelectedPtsn') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('SelectedPcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('SelectedPtslsv') + '<br/> ' +'<b>CSLWW :</B>' +sessionStorage.getItem('SelectePcslww') + '<br/> ' +'<b>TSLWW :</B>' +sessionStorage.getItem('SelectePtslww') + '<br/> ' +
                                              '<b>DEGT Last :</B>' +sessionStorage.getItem('SelectedPdegt_lastww') + '<br/> ' + '<b>Altitude Last :</B>' +sessionStorage.getItem('SelectedPaltitude_lastww') + '<br/> ' + '<b>oilTemperature Last:</B>' +sessionStorage.getItem('SelectedPoiltemp_lastww') + '<br/> ' +'<b>Mach Last:</b>' +sessionStorage.getItem('SelectedPmach_lastww') + '<br/> ' +'<b>CoreSpeed Last:</B>' +sessionStorage.getItem('SelectedPcorespeed_lastww') + '<br/> ' +
                                              '<b>Fuel Flow Last :</B>' +sessionStorage.getItem('SelectedPfuelflow_lastww') + '<br/> ' +'<b>oilPressure Last :</B>' +sessionStorage.getItem('SelectedPoilpressure_lastww') + '<br/> ' +'<b>DEGT Current:</B>' +sessionStorage.getItem('SelectedPdegt_currentww') + '<br/> ' +'<b>Altitude Current:</B>' +sessionStorage.getItem('SelectedPaltitude_currentww') + '<br/> ' +
                                              '<b>oilTemperature Current:</B>' +sessionStorage.getItem('SelectedPoilTemp_currentww') + '<br/> ' +'<b>Mach Current:</b>' +sessionStorage.getItem('SelectedPmach_currentww') + '<br/> ' +'<b>CoreSpeed Current:</B>' +sessionStorage.getItem('SelectedPcoreSpeed_currentww') + '<br/> ' +
                                              '<b>Fuel Flow Current:</B>' +sessionStorage.getItem('SelectedPfuelFlow_currentww') + '<br/> ' +'<b>oilPressure Current:</B>' +sessionStorage.getItem('SelectedPoilPressure_currentww') + '',
                                          width: 280
                                       });
                                    }
                                    else if(ename == 'Event')   {                                                                                                      
 
                                      hs.htmlExpand(null, {
 
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</B>' +sessionStorage.getItem('Selcsn_cummulative') + '<br/> ' +'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative') + '<br/> ' +
                                              '<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv') + '<br/> ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv') + '<br/> ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth') + '<br/> ' +'<b>CNR Type :</B>' +sessionStorage.getItem('Selevent_CnrType') + '<br/> ' +
                                              '<b>CNR Desc :</B>' +sessionStorage.getItem('Selevent_CnrDesc') + '<br/> ' + '<b>Month_year :</B>' +sessionStorage.getItem('Selmonth_Year') + '<br/> ' + '<b>Alert Description:</B>' +sessionStorage.getItem('SelalertDescription') + '<br/> ' +'<b>DEGT Current:</b>' +sessionStorage.getItem('Seldegt_current') + '<br/> ' +'<b>Altitude Current:</b>' +sessionStorage.getItem('Selaltitude_current') + '<br/> '+'<b>Oil Temperature Current:</B>' +sessionStorage.getItem('Seloiltemp_current') + '<br/> ' +
                                              '<b>Mach Current :</B>' +sessionStorage.getItem('Selmach_current') + '<br/> ' +'<b>CoreSpeed Current :</B>' +sessionStorage.getItem('Selcorespeed_current') + '<br/> ' +'<b>FuelFlow Current :</B>' +sessionStorage.getItem('Selfuelflow_current') + '<br/> ' +'<b>Oil pressure Current :</B>' +sessionStorage.getItem('Seloilpressure_current') + '<br/> ' +
                                              '<b>DEGT 1MonOld:</B>' +sessionStorage.getItem('Seldegt_1MonOld') + '<br/> ' +'<b>Altitude 1MonOld:</b>' +sessionStorage.getItem('Selaltitude_1MonOld') + '<br/> ' +'<b>Mach 1MonOld:</B>' +sessionStorage.getItem('Selmach_1MonOld') + '<br/> ' +
                                              '<b>CoreSpeed 1MonOld :</B>' +sessionStorage.getItem('Selcorespeed_1MonOld') + '<br/> ' +'<b>FuelFlow 1MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') + '<br/> ' +'<b>OilPressure 1MonOld:</B>' +sessionStorage.getItem('Seloilpressure_1MonOld') +'<br/> ' +'<b>DEGT 2MonOld:</B>' +sessionStorage.getItem('Seldegt_2MonOld') +'<br/> ' +'<b>Altitude 2MonOld:</B>' +sessionStorage.getItem('Selaltitude_2MonOld') +'<br/> ' +
                                              '<b>OilTemperature 2MonOld:</B>' +sessionStorage.getItem('Seloiltemp_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_1MonOld') +'<br/> ' +'<b>Mach 2MonOld:</B>' +sessionStorage.getItem('Selmach_2MonOld') +'<br/> ' +'<b>CoreSpeed 2MonOld:</B>' +sessionStorage.getItem('Selcorespeed_2MonOld') +'<br/> ' +'<b>FuelFlow 2MonOld:</B>' +sessionStorage.getItem('Selfuelflow_2MonOld') +'<br/> ' +
                                              '<b>OilPressure 2MonOld:</B>' +sessionStorage.getItem('Seloilpressure_2MonOld') +'<br/> ' +'<b>DEGT 3MonOld:</B>' +sessionStorage.getItem('Seldegt_3MonOld') +'<br/> ' +'<b>Altitude 3MonOld:</B>' +sessionStorage.getItem('Selaltitude_3MonOld') +'<br/> ' +'<b>OilTemperature 3MonOld:</B>' +sessionStorage.getItem('Seloiltemp_3MonOld') +'<br/> ' +'<b>Mach 3MonOld:</B>' +sessionStorage.getItem('Selmach_3MonOld') +'<br/> ' +
                                              '<b>CoreSpeed 3MonOld:</B>' +sessionStorage.getItem('Selcorespeed_3MonOld') +'<br/> ' +'<b>FuelFlow 3MonOld:</B>' +sessionStorage.getItem('Selfuelflow_3MonOld') +'<br/> ' +'<b>OilPressure 3MonOld:</B>' +sessionStorage.getItem('Seloilpressure_3MonOld') +'',
                                          width: 300
                                       });
                                    }                                                                                                       
                                    else if(ename == 'Forecasted SV') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });
                                    }
                                    else if(ename == 'CMR') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SelsvType :</B>' +sessionStorage.getItem('SelsvType') + '<br/> ' +'<b>Sellogic :</B>' +sessionStorage.getItem('Sellogic') + '',
                                          width: 200
                                       });                                  
                                    }
                                    else if(ename == 'Thrust Rating Change') {
                                       hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>ThrustRatingPrior :</B>' +sessionStorage.getItem('SelthrustRatingPrior') + '<br/> ' +'<b>ThrustRatingCurrent :</B>' +sessionStorage.getItem('SelthrustRatingCurrent') + '',
                                          width: 200
                                       });                                     
                                    }
                                    else if(ename == 'LLP'){
                                    //  console.log($rootScope.count.length)
                                      if($rootScope.count.length>18) {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber19') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin19') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit19') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn19') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft19') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber20') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin20') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit20') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn20') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft20') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber21') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin21') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit21') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn21') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft21') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber22') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin22') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit22') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn22') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft22') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber23') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin23') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit23') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn23') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft23') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber24') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin24') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit24') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn24') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft24') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber25') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin25') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit25') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn25') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft25') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber26') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin26') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit26') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn26') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft26') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber27') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin27') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit27') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn27') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft27') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber28') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin28') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit28') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn28') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft28') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber29') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin29') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit29') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn29') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft29') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber30') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin30') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit30') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn30') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft30') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber31') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin31') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit31') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn31') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft31') +'<br><br> ' +'',
                                          width: 600 
                                        });
                                      } 
                                      else {
                                          hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                           maincontentText: '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn1') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft1') +'<br><br> ' + 
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft2') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft3') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft4') +'<br><br> '+
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft5') +'<br><br> ' +
                                          '<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft6') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft7') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft8') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft9') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft10') +'<br><br> ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber11') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin11') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit11') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn11') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft11') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber12') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin12') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit12') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn12') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft12') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber13') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin13') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit13') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn13') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft13') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber14') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin14') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit14') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn14') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft14') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber15') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin15') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit15') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn15') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft15') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber16') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin16') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit16') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn16') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft16') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber17') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin17') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit17') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn17') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft17') +'<br><br> '+'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber18') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNomenclature :</B>' +sessionStorage.getItem('SelpartNomenclature18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Part_iin :</B>' +sessionStorage.getItem('Selpart_iin18') + '&nbsp;&nbsp;&nbsp; ' +'<b>CycleLimit :</B>' +sessionStorage.getItem('SelcycleLimit18') + '&nbsp;&nbsp;&nbsp; ' +'<b>Current_csn :</B>' +sessionStorage.getItem('Selcurrent_csn18') + '&nbsp;&nbsp;&nbsp; ' +'<b>cyclesLeft :</B>' +sessionStorage.getItem('SelcyclesLeft18') +'',
                                          width: 600                                                                                 
                                          });
                                      }                                       
                                    }
                                    else if(ename == 'Warranty'){
                                      console.log($rootScope.cnt.length)                                      
                                      if($rootScope.cnt.length>6) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative7') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth7') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount7') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop7') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn7') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn7') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount7') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType7') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket7') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative8') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth8') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount8') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop8') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn8') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount8') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType8') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket8') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative9') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth9') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount9') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop9') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn9') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn9') +'&nbsp;&nbsp;&nbsp;' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount9') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType9') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket9') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative10') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth10') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount10') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop10') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn10') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount10') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType10') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket10')+'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length<=2) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==3) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==4) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'',
                                          width: 600
                                        });
                                      }
                                      else if($rootScope.cnt.length==5) {                                      
                                        hs.htmlExpand(null, {
                                          headingText: e.point.eventTitle,
                                          maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'',
                                          width: 600
                                        });
                                      }                                      
                                      else if($rootScope.cnt.length==6) {                                      
                                          hs.htmlExpand(null, {
                                            headingText: e.point.eventTitle,
                                            maincontentText: '<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative1') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative1') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv1') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth1') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount1') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop1') + '&nbsp;&nbsp;&nbsp; '+'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn1') + '&nbsp;&nbsp;&nbsp; '+'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount1') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType1') + '&nbsp;&nbsp;&nbsp; '+'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket1') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative2') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth2') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount2') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>'+ '&nbsp;&nbsp;&nbsp; '  +sessionStorage.getItem('SelserialNumber2') +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop2') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn2') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount2') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType2') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket2') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative3') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth3') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount3') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop3') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn3') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn3') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount3') +'&nbsp;&nbsp;&nbsp;' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType3') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket3') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative4') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth4') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount4') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop4') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn4') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount4') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType4') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket4') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative5') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth5') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount5') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop5') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn5') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount5') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType5') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket5') +'<br><br> ' +'<b>CSN :</b>' + sessionStorage.getItem('Selcsn_cummulative6') + '&nbsp;&nbsp;&nbsp; '+'<b>TSN :</B>' +sessionStorage.getItem('Seltsn_cummulative6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CSLSV :</B>' +sessionStorage.getItem('Selcslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>TSLSV :</B>' +sessionStorage.getItem('Seltslsv6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Month :</B>' +sessionStorage.getItem('Selmonth6') + '&nbsp;&nbsp;&nbsp; ' +'<b>WarrantyAmount :</B>' +sessionStorage.getItem('SeltotalWarrantyAmount6') + '&nbsp;&nbsp;&nbsp; ' +'<b>SerialNumber :</B>' +sessionStorage.getItem('SelserialNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Oh_Shop :</B>' +sessionStorage.getItem('Seloh_shop6') + '&nbsp;&nbsp;&nbsp; ' +'<b>Claim_Wo :</B>' +sessionStorage.getItem('Selclaim_wo6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartNumber :</B>' +sessionStorage.getItem('SelpartNumber6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartKeyword :</B>' +sessionStorage.getItem('SelpartKeyword6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartCSN :</B>' +sessionStorage.getItem('Selpart_csn6') + '&nbsp;&nbsp;&nbsp; ' +'<b>PartTsn :</B>' +sessionStorage.getItem('Selpart_tsn6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Amount :</B>' +sessionStorage.getItem('Selamount6') +'&nbsp;&nbsp;&nbsp; ' +'<b>Warranty :</B>' +sessionStorage.getItem('SelwarrantyType6') + '&nbsp;&nbsp;&nbsp; ' +'<b>CostBucket :</B>' +sessionStorage.getItem('SelcostBucket6') +'',
                                            width: 600
                                          });
                                      }                                                                                                                                                        
                                    }                                                                                                                                                                                           
                                }
                            }
 
                        }                                
                    
            },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                 spline: {
                marker: {
                    enabled: true
                }
            }
            },
          exporting: {
            enabled: false
            },
             legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth:1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
      annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            type:'area',
            name: 'CSN',
            data: $scope.ChartDataCSN,
            marker:{
              symbol: val==11 ? 'url(../images/circle-icon.png)' : 'url(../images/transparent-icon.png)'
            }
        },
        {
            type:'scatter',
            name: 'Events',
            data: $scope.ChartDataEvent,
            marker: {
                symbol: val==0 ? 'url(../images/alert-icon.png)' : val==1 ? 'url(../images/full-icon.png)' : val==2 ? 'url(../images/qtsv-icon.png)' : val==3 ? 'url(../images/tail-change-icon.png)' : val==4 ? 'url(../images/warranty-icon.png)' : val==5 ? 'url(../images/waterwash-icon.png)' : val==6 ? 'url(../images/event-icon.png)' : val==7 ? 'url(../images/thrust-icon.png)' : val==8 ? 'url(../images/llp-icon.png)' :val==9 ? 'url(../images/cmr-icon.png)' : val==10 ? 'url(../images/forecastedsv-icon.png)' :  'url(../images/transparent-icon.png)'
             }
            
        },{
                    
                    name:'Parameter Selected',
                    data:[],
                    yAxis:1,
                        fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#FA9B4E'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                
            }

        ]
                 });

}
//Chart for Fullscreen
$scope.PlotTimeSeriesforFullScreen=function(){
  if($scope.position=="AtTimeSeries"){
    $scope.position="AtTimeSeries"; 
    
    $scope.display2="Show";
    $scope.display4="Show";
    if($scope.esn!==null){
           
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/csnandEngineDetails?esn='+$scope.esn).then(function(response){ 
 
    $scope.summaryData = response.data; 
    $scope.DataforChart=response.data[0]; 
    $scope.ChartData = [];
    $scope.AlertData=[];
      $scope.FullSv=[];
      $scope.QTSV=[];
      $scope.TailChange=[];
      $scope.Warranty=[];
      $scope.WaterWash=[];
      $scope.Event=[];
      $scope.ThrustRatingChange=[];
      $scope.LLP=[];
      $scope.CMR=[];
      $scope.ForecastedSV=[];

    $scope.FutureData=[];
    $scope.FuturePoints=[];
    $scope.PlotLine=[];
    
    //Plot CSN
    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for(var i=0;i<response.data[0].length;i++){
    
        repairDateYear=$filter('date')(new Date(response.data[0][i].eventDate),"yyyy");   
        repairDateMonth=$filter('date')(new Date(response.data[0][i].eventDate),"M");
        
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date(response.data[0][i].eventDate),"d");
      
        if(repairDateDay.length==1){
           repairDateYear='200'+repairDateDay;
        }
        
        else{
            repairDateYear='20'+repairDateDay;
        }
        repairDateDay=01;

        repairDateHour=0;
        repairDateMin=0;
        $scope.ChartData.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':response.data[0][i].csn,'eventTitle': response.data[0][i].eventTitle,'event':response.data[0][i].event,'eventID':response.data[0][i].eventID});
      
        $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');

    }


  //Plot Alert
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Alert"){
            $scope.AlertData.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.AlertData.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

 
  //Plot Full SV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Full SV"){
            $scope.FullSv.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});

        }
        else{
            $scope.FullSv.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

    //Plot QTSV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="QT SV"){
            $scope.QTSV.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
      
        }
        else{
            $scope.QTSV.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot Tail Change
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Tail Change"){
            $scope.TailChange.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.TailChange.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot Warranty
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Warranty"){
            $scope.Warranty.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.Warranty.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }

    //Plot Water Wash
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Water Wash"){
            $scope.WaterWash.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.WaterWash.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot Event
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Event"){
            $scope.Event.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.Event.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot Thrust Rating Capacity
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Thrust Rating Change"){
            $scope.ThrustRatingChange.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.ThrustRatingChange.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot LLP
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="LLP"){
            $scope.LLP.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.LLP.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


    //Plot CMR
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="CMR Predicted SV"){
            $scope.CMR.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.CMR.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }



    //Plot Forecasted SV
    for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].eventTitle=="Forecasted SV"){
            $scope.ForecastedSV.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].event,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.ForecastedSV.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


  //Plot Future
     for(var i=0;i<$scope.ChartData.length;i++){
        if($scope.ChartData[i].x>$scope.UTCofCurrentDate){
            $scope.FutureData.push({'x':$scope.ChartData[i].x,'y':$scope.ChartData[i].y,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
        else{
            $scope.FutureData.push({'x':$scope.ChartData[i].x,'y':null,'eventTitle':$scope.ChartData[i].eventTitle,'eventID':$scope.ChartData[i].eventID});
        }
    }


  //PlotLine
  for(var i=0;i<$scope.FutureData.length;i++){
      if($scope.FutureData[i].y != null){
          $scope.FuturePoints.push($scope.FutureData[i].x);
      }
  }

    $scope.PlotLine=$scope.FuturePoints[0];


               $scope.chart1 = new Highcharts.Chart({
                 tooltip: { enabled: false }, 
              chart: {
                type:'area',
                renderTo:'chart3',
                  zoomType: 'x'

              },
                title: {
                  text: 'Lifecycle',
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
                    scrollbar: {
                enabled: true
            },
             navigator: {
                enabled: true
            },
              rangeSelector: {
            selected: 1
          },

                 xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
                  
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              },
              //PlotLine after current month
              plotLines: [{

                                        color: 'green',
                                            width: 2,
                                            value: $scope.PlotLine,
                                            dashStyle: 'longdashdot',
                                            label: {
                                                text: 'Future',
                                                color: 'blue',
                                                /*verticalAlign: 'middle',
                                                textAlign: 'center',*/
                                               fontFamily: 'geInspira'
                                            }
                       

                    }]
                      },
              yAxis: [{
                title: {
                  text: 'CSN'
                    }
                },{ // Secondary yAxis
            /*    tickInterval:20, */
               /* min: $scope.min,
                max: $scope.max,*/
                  title: {
                    text: 'Parameter',
                   
                },
                opposite: true
            }
                
                    ],
            credits: {
            enabled: false
            },

            

        plotOptions: {
            series: {
            turboThreshold:5000                   
                    },
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        },
                         spline: {
                        marker: {
                            enabled: true
                        }
                    }
                    },
                  exporting: {
                    enabled: false
                    },
                     legend: {
                    enabled: false,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                }, 
             annotationsOptions: {
                    enabledButtons: false
                    },
                        series: [{
                    name: 'CSN',
                    data: $scope.ChartData,

                },{
                    type:'scatter',
                    name:'Alert',
                    data:$scope.AlertData,
                    marker: {
                    symbol:'url(../images/alert-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'FullSV',
                    data:$scope.FullSv,
                    marker: {
                    symbol:'url(../images/full-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'QTSV',
                    data:$scope.QTSV,
                    marker: {
                    symbol:'url(../images/qtsv-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'TailChange',
                    data:$scope.TailChange,
                    marker: {
                    symbol:'url(../images/tail-change-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'Warranty',
                    data:$scope.Warranty,
                    marker: {
                    symbol:'url(../images/warranty-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'WaterWash',
                    data:$scope.WaterWash,
                    marker: {
                    symbol:'url(../images/waterwash-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'Event',
                    data:$scope.Event,
                    marker: {
                    symbol:'url(../images/event-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'ThrustRatingChange',
                    data:$scope.ThrustRatingChange,
                    marker: {
                    symbol:'url(../images/thrust-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'LLP',
                    data:$scope.LLP,
                    marker: {
                    symbol:'url(../images/llp-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'CMR',
                    data:$scope.CMR,
                    marker: {
                    symbol:'url(../images/cmr-icon.png)'
                }
            },{
                    type:'scatter',
                    name:'ForecastedSV',
                    data:$scope.ForecastedSV,
                    marker: {
                    symbol:'url(../images/forecastedsv-icon.png)'
                }
            }
            ,{
                    type:'area',
                    name:'Future',
                    data:$scope.FutureData,
                      fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#BFBFBF'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                              
            },{
                    
                    name:'Parameter Selected',
                    data:[],
                    yAxis:1,
                        fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#FA9B4E'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                
            }
                ]
                         });
                      
              });

            }
            
        
            
}

if($scope.position=="AtEventChart"){
 $scope.EventData=[];
   
    angular.forEach($scope.DataforChart,function(value,key){
        if(value.eventTitle=="Alert" && $scope.EventSelected=='0'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Full SV" && $scope.EventSelected=='1'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
         
        }
        if(value.eventTitle=="QT SV" && $scope.EventSelected=='2'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
          
        }
        if(value.eventTitle=="Tail Change" && $scope.EventSelected=='3'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
       
        }
        if(value.eventTitle=="Warranty" && $scope.EventSelected=='4'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Water Wash" && $scope.EventSelected=='5'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Event" && $scope.EventSelected=='6'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Thrust Rating Change" && $scope.EventSelected=='7'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
           
        }
        if(value.eventTitle=="LLP" && $scope.EventSelected=='8'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="CMR Predicted SV" && $scope.EventSelected=='9'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
        
        }
        if(value.eventTitle=="Forecasted SV" && $scope.EventSelected=='10'){
            $scope.position="AtEventChart";
            $scope.EventData.push(value);
      
        }
       
    })

if($scope.EventSelected=='11'){
       $scope.display2="Show";
       $scope.display3="Hide";
            angular.forEach($scope.ChartData,function(value,key){
              if(value.x>$scope.UTCofCurrentDate){
               
            $scope.EventData.push(value);
          }
            })
        }

    $scope.ChartDataCSN = [];
    $scope.ChartDataEvent = [];
    var repairDateYear =[];
    var repairDateDay=[];
    var repairDateMonth=[];
    var repairDateHour=[];
    var repairDateMin=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for(var i=0;i<$scope.EventData.length;i++){
    
        repairDateYear=$filter('date')(new Date($scope.EventData[i].eventDate),"yyyy");   
        repairDateMonth=$filter('date')(new Date($scope.EventData[i].eventDate),"M");
        
        repairDateMonth=repairDateMonth-1;
        repairDateDay=$filter('date')(new Date($scope.EventData[i].eventDate),"d");
      
        if(repairDateDay.length==1){
           repairDateYear='200'+repairDateDay;
        }
        
        else{
            repairDateYear='20'+repairDateDay;
        }
        repairDateDay=01;

        repairDateHour=0;
        repairDateMin=0;
        if($scope.EventSelected!=11){
        $scope.ChartDataCSN.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].csn,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth]});
        $scope.ChartDataEvent.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
          'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth]});
      }
      else{
            $scope.ChartDataCSN.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].y,'z':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth]});
            $scope.ChartDataEvent.push({'x':$scope.EventData[i].x,'y':$scope.EventData[i].event,'Year':repairDateYear,'Month':monthNames[repairDateMonth]});
      }
      
        $scope.ChartDataCSN = $filter('orderBy')($scope.ChartDataCSN,'x');
        $scope.ChartDataEvent = $filter('orderBy')($scope.ChartDataEvent,'x');

    }

              $scope.chart2 = new Highcharts.Chart({
              tooltip: { enabled: false }, 
              chart: {
                
                renderTo:'chart3',
                    zoomType: 'x',
          
              },
                title: {
                  text: $scope.Title,
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
                scrollbar: {
            enabled: true
        },
         navigator: {
            enabled: true
        },
          rangeSelector: {
        selected: 1
      },

                 xAxis: {
                  tickInterval: 30 * 24 * 3600 * 1000,
        
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: ' %b. %y',
                  year: '%b. %y'
              },
              title: {
                text: 'Date'
              }
                      },
              yAxis: [{
                title: {
                  text: 'Value'
                    }
                
                    },{ 
                  title: {
                    text: 'Parameter',
                   
                },
                opposite: true
            }],
            credits: {
            enabled: false
            },

            

  plotOptions: {
    series: {
        
            turboThreshold:5000
                    
                    
            },
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                 spline: {
                marker: {
                    enabled: true
                }
            }
            },
          exporting: {
            enabled: false
            },
             legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth:1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            type:'area',
            name: 'CSN',
            data: $scope.ChartDataCSN,
              marker:{
              symbol: $scope.EventSelected==11 ? 'url(../images/circle-icon.png)' : 'url(../images/transparent-icon.png)'
            }
        },
        {
            type:'scatter',
            name: 'Events',
            data: $scope.ChartDataEvent,
          marker: {
                symbol: $scope.EventSelected==0 ? 'url(../images/alert-icon.png)' : $scope.EventSelected==1 ? 'url(../images/full-icon.png)' : $scope.EventSelected==2 ? 'url(../images/qtsv-icon.png)' : $scope.EventSelected==3 ? 'url(../images/tail-change-icon.png)' : $scope.EventSelected==4 ? 'url(../images/warranty-icon.png)' : $scope.EventSelected==5 ? 'url(../images/waterwash-icon.png)' : $scope.EventSelected==6 ? 'url(../images/event-icon.png)' : $scope.EventSelected==7 ? 'url(../images/thrust-icon.png)' : $scope.EventSelected==8 ? 'url(../images/llp-icon.png)' :$scope.EventSelected==9 ? 'url(../images/cmr-icon.png)' : $scope.EventSelected==10 ? 'url(../images/forecastedsv-icon.png)' :  'url(../images/transparent-icon.png)'
             }
            
        },{
                    
                    name:'Parameter Selected',
                    data:[],
                    yAxis:1,
                        fillColor: {
                    linearGradient: {
                      x1: 0,
                      x2: 0,
                      y1: 0,
                      y2: 1
                    },
                    stops: [
                      [0, '#FA9B4E'],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
                
            }

        ]
                 });
}

}
    $scope.ALSelected=sessionStorage.getItem("SelectedAL");
    $scope.ACSelected=sessionStorage.getItem("SelectedAC"); 

}])