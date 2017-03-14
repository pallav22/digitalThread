
app.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state("Home", {
        url: '/Home',
        templateUrl : "templates/Home.html",
        controller: "HomeCtrl"
    }) 
    .state("AssetHealthandReliability", {
        url: '/AssetHealthandReliability',
        templateUrl : "templates/AssetHealthandReliability.html",
        controller:"AssetHealthandReliabilityCtrl"
    })
    .state("ParameterAnalysis", {
        url: '/ParameterAnalysis',
        templateUrl : "templates/ParameterAnalysis.html",
        controller:"ParameterAnalysisCtrl"
   
    })
    .state("AssetHealthByDate", {
        url: '/AssetHealthByDate',
        templateUrl : "templates/AssetHealthByDate.html",
        controller:"AssetHealthByDateCtrl"
   
    })
    .state("ParameterAnalysis.DEGT", {
        url: '/DEGT',
        templateUrl : "templates/DEGT.html",
         controller:"DEGTCtrl"
        
    })
    .state("ParameterAnalysis.CoreSpeed", {
        url: '/CoreSpeed',
        templateUrl : "templates/CoreSpeed.html",
        controller:"CoreSpeedCtrl"
    })
    .state("ParameterAnalysis.Altitude", {
        url: '/Altitude',
        templateUrl : "templates/Altitude.html",
        controller:"AltitudeCtrl",
        activetab:"ParameterAnalysis.Altitude"
    })
    .state("ParameterAnalysis.OilPressure", {
        url: '/OilPressure',
        templateUrl : "templates/OilPressure.html",
        controller:"OilPressureCtrl"
    })
    .state("ParameterAnalysis.OilTemperature", {
        url: '/OilTemperature',
        templateUrl : "templates/OilTemperature.html",
        controller:"OilTemperatureCtrl"
    })    
    .state("ParameterAnalysis.FuelFlow", {
        url: '/FuelFlow',
        templateUrl : "templates/FuelFlow.html",
        controller:"FuelFlowCtrl"
    })
    .state("ParameterAnalysis.Mach", {
        url: '/Mach',
        templateUrl : "templates/Mach.html",
        controller:"MachCtrl"
    })
     .state("AssetBenchmarking", {
        url: '/AssetBenchmarking',
        templateUrl : "templates/AssetBenchmarking.html",
        controller:"AssetBenchmarkingCtrl"
    })
    .state("Biblography", {
        url: '/Biblography',
        templateUrl : "templates/Biblography.html",
        controller:"BibliographyCTRL"
    });    
    
  $urlRouterProvider
    .otherwise('Home');
    }
  ]);
