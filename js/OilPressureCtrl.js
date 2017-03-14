app.controller('OilPressureCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

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
 //   console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn=874777 &startDate='+startDate+'&endDate='+endDate)
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){


            $scope.ChartData1 = [];
            $scope.paraDataOP = [];
            $scope.paraDataOP = res.data[6];

            angular.forEach($scope.paraDataOP,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
        //    console.log( angular.toJson($scope.ChartData1) );
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


}])