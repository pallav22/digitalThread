app.controller('ParameterAnalysisCtrl',['$rootScope','$scope','$http','$filter','$modal','$state',function($rootScope,$scope,$http,$filter,$modal,$state){

       $scope.startFlag=true;
       $scope.selecteddata="";
       $scope.endFlag=true; 
       $rootScope.chartonLoad=false; 
       $scope.display1="Hide"; 
       $scope.class1 = "active";
       $scope.dummy='false'; 
       $scope.display2="Show";  
       $scope.selecteddata1 = "DEGT"; 
       $scope.airlinerData1=sessionStorage.getItem("SelectedAL");
       $scope.aircraftData1=sessionStorage.getItem("SelectedAC");
       $scope.esnData1=sessionStorage.getItem("SelectedESN");

       $scope.airlinerData2=sessionStorage.getItem("SelectedAL1");
       $scope.aircraftData2=sessionStorage.getItem("SelectedAC1");
       if($scope.startFlag == true) {        
         $rootScope.startDate = "01-Jan-2016";
         sessionStorage.setItem("startDate",$rootScope.startDate); 
       } 
       if($scope.endFlag == true){
         var endDat = new Date();
         $rootScope.endDate =   $filter("date")(new Date(endDat),"dd-MMM-yyyy");  
         sessionStorage.setItem("endDate",$rootScope.endDate);         
       }
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


        $('li').click(function() {
        $("li.active").removeClass("active");
        $(this).addClass('active');
        });

   $(".dropdown-menu li").click( function() {
    $scope.selecteddata1 = '';
        $scope.selecteddata = $(this).text();
        $scope.display1="Show";

        $scope.display2="Hide";
        $scope.$apply();
   });


   $scope.ChangeESN=function(val){
    
    $scope.esnData1=val; 
 sessionStorage.setItem("SelectedESN",$scope.esnData1);
            if($scope.selecteddata==='DEGT' || $scope.class1==='active'){
               $scope.defaultChartD();              
               $scope.defaultChatM();              
              $scope.DEGTChartRefresh();
            }
            else if($scope.selecteddata==='Altitude' || $scope.class2==='active'){
              $scope.ALTChartRefresh();
            }
            else if($scope.selecteddata==='Core Speed' || $scope.class3==='active'){
              $scope.CSChartRefresh();
            }
            else if($scope.selecteddata==='Oil Pressure' || $scope.class4==='active'){
            $scope.OPChartRefresh();
            }
            else if($scope.selecteddata==='Oil Temperature' || $scope.class5==='active'){
               $scope.OTChartRefresh();
            }
            else if($scope.selecteddata==='Fuel Flow' || $scope.class6==='active'){
              $scope.FFChartRefresh();
            }
            else if($scope.selecteddata==='Mach' || $scope.class7==='active'){
              $scope.MACHChartRefresh();  
            } 
            else{
               $scope.defaultChartD();
               $scope.defaultChatM();

            }   
   }

//Airliner Dropdown
  $scope.ChangeAircraft=function(val){
   
    $scope.aircraftData2=val;    
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/airlinesList?modelID='+$scope.aircraftData2).then(function(response){ 
              $scope.airlinerData = response.data;
              });
   
   }

//ESN Dropdown
    $scope.ChangeAirliner=function(val){
   
    $scope.airlinerData2=val;
     $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/esnList?customerID='+$scope.airlinerData2).then(function(response){ 
              $scope.esnData = response.data;
              });
   }
    $(function() {
        $('.ui.dropdown').dropdown();
    });
            var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate"); 

         //Chart1 DEGT
$scope.DEGTChartRefresh = function(){

            var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate"); 
            $rootScope.chartId='chart1';
      $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+' &startDate='+startDate+'&endDate='+endDate).then(function(res){
            $scope.ChartData1 = [];
            $scope.paraDataDEGT = [];
            $scope.paraDataDEGT = res.data[0];

            angular.forEach($scope.paraDataDEGT,function(value,key){
            $scope.ChartData1.push(value);
            });

         var seriesData=$scope.ChartData1;
         $scope.ChartDatadegt = [];
         var degtDateYear =[];
         var degtDateDay=[];
         var degtDateMonth=[];
        var degtDateHour=[];
        var degtDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             degtDateYear=$filter('date')(new Date(seriesData[i].degteventDate),"yy");
                degtDateMonth=$filter('date')(new Date(seriesData[i].degteventDate),"M");
                
                degtDateMonth=degtDateMonth-1;
                degtDateDay=$filter('date')(new Date(seriesData[i].degteventDate),"d");             
                if(degtDateYear.length==1){
                   degtDateYear='200'+degtDateYear;
                }
                
                else{
                    degtDateYear='20'+degtDateYear;
                }
                degtDateHour=0;
                degtDateMin=0;

                $scope.ChartDatadegt.push({'x':Date.UTC(degtDateYear,degtDateMonth,degtDateDay,degtDateHour,degtDateMin),
                  'y':Number($scope.ChartData1[i].degtParameterValue),'Date':degtDateDay,'Year':degtDateYear,'Month':monthNames[degtDateMonth]});
                
                $scope.ChartDatadegt = $filter('orderBy')($scope.ChartDatadegt,'x');

                $scope.dataDegt=$scope.ChartDatadegt; 
         }
        $scope.drawchart1($scope.dataDegt);                 
        }); 
  } 
             $scope.drawchart1=function(val){
               var chart = new Highcharts.Chart({
                chart: {
                type:'area',
                renderTo:'chart1',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'DEGT',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                 
              },
              title: {
                text: 'Date'
             
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
              
                    }
                    },
            credits: {
            enabled: false
            },

            

          plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>DEGT </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'DEGT',
            data: val
        }]
                 });
            }

  


//Chart2 Altitude
$scope.ALTChartRefresh = function(){
//  debugger
              var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
            $rootScope.chartId='chart2';
 //   console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn=874777 &startDate='+startDate+'&endDate='+endDate)
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){

         // $state.go($state.ParameterAnalysis.Altitude, {}, {reload: true});
            $scope.ChartData1 = [];
            $scope.paraDataAlt = [];
            $scope.paraDataAlt = res.data[1];

            angular.forEach($scope.paraDataAlt,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
            //console.log( angular.toJson($scope.ChartData1) );
        var seriesData=$scope.ChartData1;
       
        $scope.ChartDataAlt = [];
        var altDateYear =[];
        var altDateDay=[];
        var altDate=[];        
        var altDateMonth=[];
        var altDateHour=[];
        var altDateMin=[];        
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            for(var i=0;i<seriesData.length;i++){

                altDateDay=$filter('date')(new Date(seriesData[i].alteventDate),"d");              
                altDateMonth=$filter('date')(new Date(seriesData[i].alteventDate),"M");
                altDateYear=$filter('date')(new Date(seriesData[i].alteventDate),"yy");                
                altDateMonth=altDateMonth-1;

              
                if(altDateYear.length==1){
                   altDateYear='200'+altDateYear;
                }
                
                else{
                    altDateYear='20'+altDateYear;
                }
//                altDateDay=01;

                altDateHour=0;
                altDatedeMin=0;

                $scope.ChartDataAlt.push({'x':Date.UTC(altDateYear,altDateMonth,altDateDay,altDateHour,altDateMin),
                  'y':Number($scope.ChartData1[i].altParameterValue),'Date':altDateDay,'Year':altDateYear,'Month':monthNames[altDateMonth]});
                
                $scope.ChartDataAlt = $filter('orderBy')($scope.ChartDataAlt,'x');

              //  console.log($scope.ChartDataAlt);
                $scope.dataAlt=$scope.ChartDataAlt;
                // debugger          

            } 
        
        $scope.drawchart2($scope.dataAlt);  
                       
        }); 
 }  


             $scope.drawchart2=function(val){
              

              

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart2',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Altitude',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',

                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                  
              },
              title: {
                text: 'Date'
               
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
            
                    }
                    },
            credits: {
            enabled: false
            },

            

        plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>Altitude </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Altitude',
            data: val
        }]
                 });

          // $scope.chartId=chart.renderTo.id;
           //   console.log($scope.chartId)
           // debugger

            }

            


//Chart3 Core Speed
$scope.CSChartRefresh = function(){
              var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
            $rootScope.chartId='chart3';            
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){

            $scope.ChartData1 = [];
            $scope.paraDataCS = [];
            $scope.paraDataCS = res.data[4];

            angular.forEach($scope.paraDataCS,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
          //  console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData1;
       
         $scope.ChartDataCS = [];
         var CSDateYear =[];
         var CSDateDay=[];
         var CSDateMonth=[];
        var CSDateHour=[];
        var CSDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             CSDateYear=$filter('date')(new Date(seriesData[i].coreSpeedeventDate),"yy");
                CSDateMonth=$filter('date')(new Date(seriesData[i].coreSpeedeventDate),"M");
                
                CSDateMonth=CSDateMonth-1;
                CSDateDay=$filter('date')(new Date(seriesData[i].coreSpeedeventDate),"d");             
                if(CSDateYear.length==1){
                   CSDateYear='200'+CSDateYear;
                }
                
                else{
                    CSDateYear='20'+CSDateYear;
                }
                // CSDateDay=01;

                CSDateHour=0;
                CSDateMin=0;

                $scope.ChartDataCS.push({'x':Date.UTC(CSDateYear,CSDateMonth,CSDateDay,CSDateHour,CSDateMin),
                  'y':Number($scope.ChartData1[i].coreSpeedparameterValue),'Date':CSDateDay,'Year':CSDateYear,'Month':monthNames[CSDateMonth]});
                
                $scope.ChartDataCS = $filter('orderBy')($scope.ChartDataCS,'x');

          //      console.log($scope.ChartDataCS);
                var dataCS=$scope.ChartDataCS;                

         }

 
        $scope.drawchart3(dataCS);                 
        }); 
}   


             $scope.drawchart3=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart3',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Core Speed',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',

                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                 
              },
              title: {
                text: 'Date'
              
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
             
                    }
                    },
            credits: {
            enabled: false
            },

            

            plotOptions: {
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
              tooltip: {
            
      formatter: function () {
   
            return '<b>Core Speed </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Core Speed',
            data: val
        }]
                 });
            }

//Chart4 Oil Pressure
$scope.OPChartRefresh = function(){
              var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
            $rootScope.chartId='chart4';            
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){


            $scope.ChartData1 = [];
            $scope.paraDataOP = [];
            $scope.paraDataOP = res.data[6];

            angular.forEach($scope.paraDataOP,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
           // console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData1;
       
         $scope.ChartDataOP = [];
         var OPDateYear =[];
         var OPDateDay=[];
         var OPDateMonth=[];
        var OPDateHour=[];
        var OPDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             OPDateYear=$filter('date')(new Date(seriesData[i].oilPressureeventDate),"yy");
                OPDateMonth=$filter('date')(new Date(seriesData[i].oilPressureeventDate),"M");
                
                OPDateMonth=OPDateMonth-1;
                OPDateDay=$filter('date')(new Date(seriesData[i].oilPressureeventDate),"d");             
                if(OPDateYear.length==1){
                   OPDateYear='200'+OPDateYear;
                }
                
                else{
                    OPDateYear='20'+OPDateYear;
                }
                // OPDateDay=01;

                OPDateHour=0;
                OPDateMin=0;

                $scope.ChartDataOP.push({'x':Date.UTC(OPDateYear,OPDateMonth,OPDateDay,OPDateHour,OPDateMin),
                  'y':Number($scope.ChartData1[i].oilPressureparameterValue),'Date':OPDateDay,'Year':OPDateYear,'Month':monthNames[OPDateMonth]});
                
                $scope.ChartDataOP = $filter('orderBy')($scope.ChartDataOP,'x');

              //  console.log($scope.ChartDataOP);
                var dataOP=$scope.ChartDataOP;                

         }
        $scope.drawchart4(dataOP);                 
        }); 
}  


             $scope.drawchart4=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart4',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Oil Pressure',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime', 
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                  
              },
              title: {
                text: 'Date'
              
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
            
                    }
                    },
            credits: {
            enabled: false
            },

            

            plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>Oil Pressure </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Oil Pressure',
            data: val
        }]
                 });
            } 

//Chart5 Oil temperature
$scope.OTChartRefresh = function(){
              var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
                        $rootScope.chartId='chart5';
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){



            $scope.ChartData1 = [];
            $scope.paraDataOT = [];
            $scope.paraDataOT = res.data[2];

            angular.forEach($scope.paraDataOT,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
           // console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData1;
       
         $scope.ChartDataOT = [];
         var OTDateYear =[];
         var OTDateDay=[];
         var OTDateMonth=[];
        var OTDateHour=[];
        var OTDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             OTDateYear=$filter('date')(new Date(seriesData[i].oilTempeventDate),"yy");
                OTDateMonth=$filter('date')(new Date(seriesData[i].oilTempeventDate),"M");
                
                OTDateMonth=OTDateMonth-1;
                OTDateDay=$filter('date')(new Date(seriesData[i].oilTempeventDate),"d");             
                if(OTDateYear.length==1){
                   OTDateYear='200'+OTDateYear;
                }
                
                else{
                    OTDateYear='20'+OTDateYear;
                }
                // OTDateDay=01;

                OTDateHour=0;
                OTDateMin=0;

                $scope.ChartDataOT.push({'x':Date.UTC(OTDateYear,OTDateMonth,OTDateDay,OTDateHour,OTDateMin),
                  'y':Number($scope.ChartData1[i].oilTempParameterValue),'Date':OTDateDay,'Year':OTDateYear,'Month':monthNames[OTDateMonth]});
                
                $scope.ChartDataOT = $filter('orderBy')($scope.ChartDataOT,'x');

              //  console.log($scope.ChartDataOT);
                var dataOT=$scope.ChartDataOT;                

         }
 
        $scope.drawchart5(dataOT);                 
        }); 
}   


             $scope.drawchart5=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart5',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Oil Temperature',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime', 
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                  
              },
              title: {
                text: 'Date'
               
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
                
                    }
                    },
            credits: {
            enabled: false
            },

            

          plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>Oil Temperature </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Oil Temperature',
            data: val
        }]
                 });
            } 

//chat6 FuelFlow
$scope.FFChartRefresh = function(){
              var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
            $rootScope.chartId='chart6';            
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+' &startDate='+startDate+'&endDate='+endDate).then(function(res){


            $scope.ChartData1 = [];
            $scope.paraDataFF = [];            
            $scope.paraDataFF = res.data[5];

            angular.forEach($scope.paraDataFF,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
          //  console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData1;
       
         $scope.ChartDataFF = [];
         var FFDateYear =[];
         var FFDateDay=[];
         var FFDateMonth=[];
        var FFDateHour=[];
        var FFDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             FFDateYear=$filter('date')(new Date(seriesData[i].fuelFloweventDate),"yy");
                FFDateMonth=$filter('date')(new Date(seriesData[i].fuelFloweventDate),"M");
                
                FFDateMonth=FFDateMonth-1;
                FFDateDay=$filter('date')(new Date(seriesData[i].fuelFloweventDate),"d");             
                if(FFDateYear.length==1){
                   FFDateYear='200'+FFDateYear;
                }
                
                else{
                    FFDateYear='20'+FFDateYear;
                }
                // FFDateDay=01;

                FFDateHour=0;
                FFDateMin=0;

                $scope.ChartDataFF.push({'x':Date.UTC(FFDateYear,FFDateMonth,FFDateDay,FFDateHour,FFDateMin),
                  'y':Number($scope.ChartData1[i].fuelFlowparameterValue),'Date':FFDateDay,'Year':FFDateYear,'Month':monthNames[FFDateMonth]});
                
                $scope.ChartDataFF = $filter('orderBy')($scope.ChartDataFF,'x');

            //    console.log($scope.ChartDataFF);
                var dataFF=$scope.ChartDataFF;                

         }

 
        $scope.drawchart6(dataFF);                 
        }); 
}   


             $scope.drawchart6=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart6',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Fuel Flow',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',

                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                 
              },
              title: {
                text: 'Date'
         
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
             
                    }
                    },
            credits: {
            enabled: false
            },

            

            plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>Fuel Flow </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Fuel Flow',
            data: val
        }]
                 });
            }

//Chart7 Mach
$scope.MACHChartRefresh = function(){
            var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
            $rootScope.chartId='chart7';            
      $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+' &startDate='+startDate+'&endDate='+endDate).then(function(res){


            $scope.ChartData1 = [];
            $scope.paraDataMach = [];
            $scope.paraDataMach = res.data[3];

            angular.forEach($scope.paraDataMach,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
 //           console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData1;
       
         $scope.ChartDataMach = [];
         var MachDateYear =[];
         var MachDateDay=[];
         var MachDateMonth=[];
         var MachDateHour=[];
         var MachDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             MachDateYear=$filter('date')(new Date(seriesData[i].macheventDate),"yy");
                MachDateMonth=$filter('date')(new Date(seriesData[i].macheventDate),"M");
                
                MachDateMonth=MachDateMonth-1;
                MachDateDay=$filter('date')(new Date(seriesData[i].macheventDate),"d");             
                if(MachDateYear.length==1){
                   MachDateYear='200'+MachDateYear;
                }
                
                else{
                    MachDateYear='20'+MachDateYear;
                }
                // MachDateDay=01;

                MachDateHour=0;
                MachDateMin=0;

                $scope.ChartDataMach.push({'x':Date.UTC(MachDateYear,MachDateMonth,MachDateDay,MachDateHour,MachDateMin),
                  'y':Number($scope.ChartData1[i].machParameterValue),'Date':MachDateDay,'Year':MachDateYear,'Month':monthNames[MachDateMonth]});
                
                $scope.ChartDataMach = $filter('orderBy')($scope.ChartDataMach,'x');

//                console.log($scope.ChartDataMach);
                var dataMach=$scope.ChartDataMach;                

         }
        $scope.drawchart7(dataMach);                 
        }); 
 }  


             $scope.drawchart7=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart7',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'Mach',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime', 
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%b. %y'                  
              },
              title: {
                text: 'Date'
             
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
              
                    }
                    },
            credits: {
            enabled: false
            },

            

        plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>Mach </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'Mach',
            data: val
        }]
                 });
            }  


        $('#datetimepicker1').datetimepicker();      

        $('#datetimepicker1').on('changeDate', function(ev){
            $scope.startFlag=false;
            var dateVal=ev.localDate;
            // $scope.selecteddata1 = '';
            $rootScope.startDate=$filter('date')(dateVal,'dd-MMM-yyyy');
            sessionStorage.setItem("startDate",$rootScope.startDate);  
            if($scope.selecteddata==='DEGT' || $scope.class1==='active'){
                $scope.defaultChartD();              
              $scope.defaultChatM();                
              $scope.DEGTChartRefresh();
            }
            else if($scope.selecteddata==='Altitude' || $scope.class2==='active'){
              $scope.ALTChartRefresh();
            }
            else if($scope.selecteddata==='Core Speed' || $scope.class3==='active'){
              debugger
              $scope.CSChartRefresh();
            }
            else if($scope.selecteddata==='Oil Pressure' || $scope.class4==='active'){
            $scope.OPChartRefresh();
            }
            else if($scope.selecteddata==='Oil Temperature' || $scope.class5==='active'){
               $scope.OTChartRefresh();
            }
            else if($scope.selecteddata==='Fuel Flow' || $scope.class6==='active'){
              $scope.FFChartRefresh();
            }
            else if($scope.selecteddata==='Mach' || $scope.class7==='active'){
              $scope.MACHChartRefresh();  
            } 
            else{
               $scope.defaultChartD();
               $scope.defaultChatM();

            }        

        });   

        $('#datetimepicker2').datetimepicker();
       
        $('#datetimepicker2').datetimepicker('setDate', new Date());

        $('#datetimepicker2').on('changeDate', function(ev){
         // $scope.selecteddata1 = '';  
            var dateVal=ev.localDate;
            $rootScope.endDate=$filter('date')(dateVal,'dd-MMM-yyyy');
            $scope.endFlag=false;
            sessionStorage.setItem("endDate",$rootScope.endDate);
            if($scope.selecteddata==='DEGT' || $scope.class1==='active'){
               $scope.defaultChartD();              
               $scope.defaultChatM();              
              $scope.DEGTChartRefresh();
            }
            else if($scope.selecteddata==='Altitude' || $scope.class2==='active'){

              $scope.ALTChartRefresh();
            }
            else if($scope.selecteddata==='Core Speed' || $scope.class3==='active'){
              debugger
              $scope.CSChartRefresh();
            }
            else if($scope.selecteddata==='Oil Pressure' || $scope.class4==='active'){
            $scope.OPChartRefresh();
            }
            else if($scope.selecteddata==='Oil Temperature' || $scope.class5==='active'){
               $scope.OTChartRefresh();
            }
            else if($scope.selecteddata==='Fuel Flow' || $scope.class6==='active'){
              $scope.FFChartRefresh();
            }
            else if($scope.selecteddata==='Mach' || $scope.class7==='active'){
              $scope.MACHChartRefresh();  
            } 
            else{
               $scope.defaultChartD();
               $scope.defaultChatM();

            }   
            //console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate)          
        });

//Function to get called when deselecting a filter
  $scope.remove=function(){
          $scope.display1="Hide";

          $rootScope.chartId='chart1';
         var startDate=sessionStorage.getItem("startDate");
         var endDate=sessionStorage.getItem("endDate"); 
         $scope.esnData1=sessionStorage.getItem("SelectedESN");
         $scope.DEGTChartRefresh();
         $scope.drawchart1($scope.dataDegt); 
  } 

//Active used for current tab
  $scope.tabClick1= function()
  {
     $scope.class1= "active"; 
     $scope.class2= "inactive"; 
     $scope.class3= "inactive"; 
     $scope.class4= "inactive"; 
     $scope.class5= "inactive"; 
     $scope.class6= "inactive"; 
     $scope.class7= "inactive";     
  }
  $scope.tabClick2= function()
  {
     $scope.class1= "inactive"; 
     $scope.class2= "active"; 
     $scope.class3= "inactive"; 
     $scope.class4= "inactive"; 
     $scope.class5= "inactive"; 
     $scope.class6= "inactive"; 
     $scope.class7= "inactive";      
  }
  $scope.tabClick3= function()
  {
    debugger
     $scope.class1= "inactive"; 
     $scope.class2= "inactive"; 
     $scope.class3= "active"; 
     $scope.class4= "inactive"; 
     $scope.class5= "inactive"; 
     $scope.class6= "inactive"; 
     $scope.class7= "inactive";      
  }
  $scope.tabClick4= function()
  {
     $scope.class1= "inactive"; 
     $scope.class2= "inactive"; 
     $scope.class3= "inactive"; 
     $scope.class4= "active"; 
     $scope.class5= "inactive"; 
     $scope.class6= "inactive"; 
     $scope.class7= "inactive";      
  }
  $scope.tabClick5= function()
  {
     $scope.class1= "inactive"; 
     $scope.class2= "inactive"; 
     $scope.class3= "inactive"; 
     $scope.class4= "inactive"; 
     $scope.class5= "active"; 
     $scope.class6= "inactive"; 
     $scope.class7= "inactive";      
  }
  $scope.tabClick6= function()
  {
     $scope.class1= "inactive"; 
     $scope.class2= "inactive"; 
     $scope.class3= "inactive"; 
     $scope.class4= "inactive"; 
     $scope.class5= "inactive"; 
     $scope.class6= "active"; 
     $scope.class7= "inactive";      
  }
  $scope.tabClick7= function()
  {
     $scope.class1= "inactive"; 
     $scope.class2= "inactive"; 
     $scope.class3= "inactive"; 
     $scope.class4= "inactive"; 
     $scope.class5= "inactive"; 
     $scope.class6= "inactive"; 
     $scope.class7= "active";      
  }


       startDate=sessionStorage.getItem("startDate");
       endDate=sessionStorage.getItem("endDate"); 
       $scope.esnData1=sessionStorage.getItem("SelectedESN");
//Dummy Chart used for default loading once the page the loaded - Desktop
                $scope.dummychart=function(val){
        //debugger
               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart8',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'DEGT',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%Y'                 
              },
              title: {
                text: 'Date'
               
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
                
                    }
                    },
            credits: {
            enabled: false
            },

            

            plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>DEGT </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'DEGT',
            data: val
        }]
                 });
            } 

  $scope.defaultChartD = function() {
         startDate=sessionStorage.getItem("startDate");
         endDate=sessionStorage.getItem("endDate"); 
         $scope.esnData1=sessionStorage.getItem("SelectedESN");
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){
    
            $scope.ChartData8 = [];
            $scope.paraDataDEGT = [];
            $scope.paraDataDEGT = res.data[0];

            angular.forEach($scope.paraDataDEGT,function(value,key){

            $scope.ChartData8.push(value);
   //         debugger

            });
         //   console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData8;
       
         $scope.ChartDatadegt = [];
         var degtDateYear =[];
         var degtDateDay=[];
         var degtDateMonth=[];
        var degtDateHour=[];
        var degtDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             degtDateYear=$filter('date')(new Date(seriesData[i].degteventDate),"yy");
                degtDateMonth=$filter('date')(new Date(seriesData[i].degteventDate),"M");
                
                degtDateMonth=degtDateMonth-1;
                degtDateDay=$filter('date')(new Date(seriesData[i].degteventDate),"d");             
                if(degtDateYear.length==1){
                   degtDateYear='200'+degtDateYear;
                }
                
                else{
                    degtDateYear='20'+degtDateYear;
                }
                // degtDateDay=01;

                degtDateHour=0;
                degtDateMin=0;

                $scope.ChartDatadegt.push({'x':Date.UTC(degtDateYear,degtDateMonth,degtDateDay,degtDateHour,degtDateMin),
                  'y':Number($scope.ChartData8[i].degtParameterValue),'Date':degtDateDay,'Year':degtDateYear,'Month':monthNames[degtDateMonth]});
                
                $scope.ChartDatadegt = $filter('orderBy')($scope.ChartDatadegt,'x');

             // 
                var dataDegt=$scope.ChartDatadegt; 
            
                // $scope.val1=$scope.ChartDatadegt;
         }
          // console.log($scope.ChartDatadegt);

 
        $scope.dummychart(dataDegt);                 
        }); 
  }   
  $scope.defaultChartD();


//Dummy Chart used for default loading once the page the loaded - Mobile Screen
  $scope.dummychart1=function(val){
             //         debugger
               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart9',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'DEGT',
                  style: {
                        fontSize: '2.2rem',
                         fontWeight: 'bold'
                    }
                // x: 25
              },
             
                 xAxis: {
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: '%b. %y ',
                  year: '%Y'                 
              },
              title: {
                text: 'Date'
           
              }
                      },
              yAxis: {
                title: {
                  text: 'Counts'
                
                    }
                    },
            credits: {
            enabled: false
            },

            

            plotOptions: {
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
              tooltip: {
            
     formatter: function () {
   
            return '<b>DEGT </b><br>'+'<b>Date </b>:'+this.point.Date+','+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
        },

     },     annotationsOptions: {
            enabledButtons: false
            },
                series: [{
            name: 'DEGT',
            data: val
        }]
                 });
    } 

$scope.defaultChatM = function() {
         startDate=sessionStorage.getItem("startDate");
         endDate=sessionStorage.getItem("endDate"); 
         $scope.esnData1=sessionStorage.getItem("SelectedESN");
         $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){

            $scope.ChartData8 = [];
            $scope.paraDataDEGT = [];
            $scope.paraDataDEGT = res.data[0];

            angular.forEach($scope.paraDataDEGT,function(value,key){

            $scope.ChartData8.push(value);
   //         debugger

            });
         //   console.log( angular.toJson($scope.ChartData1) );
         var seriesData=$scope.ChartData8;
       
         $scope.ChartDatadegt = [];
         var degtDateYear =[];
         var degtDateDay=[];
         var degtDateMonth=[];
        var degtDateHour=[];
        var degtDateMin=[];         
         var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         for(var i=0;i<seriesData.length;i++){
             degtDateYear=$filter('date')(new Date(seriesData[i].degteventDate),"yy");
                degtDateMonth=$filter('date')(new Date(seriesData[i].degteventDate),"M");
                
                degtDateMonth=degtDateMonth-1;
                degtDateDay=$filter('date')(new Date(seriesData[i].degteventDate),"d");             
                if(degtDateYear.length==1){
                   degtDateYear='200'+degtDateYear;
                }
                
                else{
                    degtDateYear='20'+degtDateYear;
                }
                // degtDateDay=01;

                degtDateHour=0;
                degtDateMin=0;

                $scope.ChartDatadegt.push({'x':Date.UTC(degtDateYear,degtDateMonth,degtDateDay,degtDateHour,degtDateMin),
                  'y':Number($scope.ChartData8[i].degtParameterValue),'Date':degtDateDay,'Year':degtDateYear,'Month':monthNames[degtDateMonth]});
                
                $scope.ChartDatadegt = $filter('orderBy')($scope.ChartDatadegt,'x');

             //   console.log($scope.ChartDatadegt);
                var dataDegt=$scope.ChartDatadegt;                
                // $scope.val1=$scope.ChartDatadegt;
         }

 
        $scope.dummychart1(dataDegt);                 
        }); 
   }
  
  $scope.defaultChatM();      
               

}])