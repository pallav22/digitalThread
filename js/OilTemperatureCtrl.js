app.controller('OilTemperatureCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

	
    
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

    //console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn=874777 &startDate='+startDate+'&endDate='+endDate)
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){



            $scope.ChartData1 = [];
            $scope.paraDataOT = [];
            $scope.paraDataOT = res.data[2];

            angular.forEach($scope.paraDataOT,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
        //    console.log( angular.toJson($scope.ChartData1) );
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
                  year: '%b'                  
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

}])