app.controller('FuelFlowCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

            var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
                   $scope.esnData1=sessionStorage.getItem("SelectedESN");
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
  //  console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn=874777 &startDate='+startDate+'&endDate='+endDate)
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){


            $scope.ChartData1 = [];
            $scope.paraDataFF = [];            
            $scope.paraDataFF = res.data[5];

            angular.forEach($scope.paraDataFF,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
         //   console.log( angular.toJson($scope.ChartData1) );
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
                        fontSize: '2.2em',
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


}])