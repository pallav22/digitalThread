app.controller('CoreSpeedCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){
 
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
            $scope.paraDataCS = [];
            $scope.paraDataCS = res.data[4];

            angular.forEach($scope.paraDataCS,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
         //   console.log( angular.toJson($scope.ChartData1) );
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

}])