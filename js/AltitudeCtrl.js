app.controller('AltitudeCtrl',['$rootScope','$scope','$http','$filter','$modal','$state',function($rootScope,$scope,$http,$filter,$modal,$state){

	
            var startDate=sessionStorage.getItem("startDate");
            var endDate=sessionStorage.getItem("endDate");
       $scope.esnData1=sessionStorage.getItem("SelectedESN");
         // $rootScope.class2='active';       
  //  console.log('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn=874777 &startDate='+startDate+'&endDate='+endDate)
    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){

         // $state.go($state.ParameterAnalysis.Altitude, {}, {reload: true});
            $scope.ChartData1 = [];
            $scope.paraDataAlt = [];
            $scope.paraDataAlt = res.data[1];

            angular.forEach($scope.paraDataAlt,function(value,key){

            $scope.ChartData1.push(value);
   //         debugger

            });
         //   console.log( angular.toJson($scope.ChartData1) );
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
                altDateMin=0;

                $scope.ChartDataAlt.push({'x':Date.UTC(altDateYear,altDateMonth,altDateDay,altDateHour,altDateMin),
                  'y':Number($scope.ChartData1[i].altParameterValue),'Date':altDateDay,'Year':altDateYear,'Month':monthNames[altDateMonth]});
                
                $scope.ChartDataAlt = $filter('orderBy')($scope.ChartDataAlt,'x');

              //  console.log($scope.ChartDataAlt);
                var dataAlt=$scope.ChartDataAlt;
                // debugger          

            } 
 
        $scope.drawchart2(dataAlt);                 
        }); 
   


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
                        fontSize: '1.85em',
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
            }

}])