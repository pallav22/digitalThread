app.controller('DEGTCtrl',['$rootScope','$scope','$http','$filter','$modal','$state',function($rootScope,$scope,$http,$filter,$modal,$state){

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

    $http.get('https://digitalthread-assetdetails-service.run.aws-usw02-pr.ice.predix.io/digitalThread/getAllParamvalues?esn='+$scope.esnData1+'&startDate='+startDate+'&endDate='+endDate).then(function(res){

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

                var dataDegt=$scope.ChartDatadegt;                
             
         }

 
        $rootScope.drawchart1(dataDegt);                 
        }); 
   
             $rootScope.drawchart1=function(val){

               var chart = new Highcharts.Chart({
              chart: {
                type:'area',
                renderTo:'chart1',
                  zoomType: 'x'
                
              },
                title: {
                  text: 'DEGT',
                  style: {
                        fontSize: '2.2em',
                         fontWeight: 'bold'
                    }
  
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




}])