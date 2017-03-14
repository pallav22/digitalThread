app.controller('MachCtrl',['$rootScope','$scope','$http','$filter','$modal',function($rootScope,$scope,$http,$filter,$modal){

    
    
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

}])