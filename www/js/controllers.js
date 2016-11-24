angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicPopup, $http, $ionicModal, $timeout) {

    $scope.loginData = {};

    $http.get("lang.json").success(function(response){
        $scope.lang = response;
        $scope.currentLang = $scope.lang.kh;
    });

    $scope.changeLanguage = function(){
        if($scope.currentLang == $scope.lang.kh){
            $scope.currentLang = $scope.lang.en;
        }else{
            $scope.currentLang = $scope.lang.kh;
        }
    }

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        backdropClickToClose: false,
        hardwareBackButtonClose: false
    }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
    });

    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.doLogin = function() {
        $http({
            method: 'POST',
            url: 'http://10.0.9.13:8181/awlaravel/public/acl/auth/login/mobile?username='+$scope.loginData.username+'&password='+$scope.loginData.password
        }).then(function successCallback(response) {
            if(response.data.status != "success"){
                var alertPopup = $ionicPopup.alert({
                    title: $scope.currentLang.sub_title,
                    template: $scope.currentLang.login_err
                });
            }else{
                $scope.loginData.token = response.data._token;
                $timeout(function() {
                    $scope.closeLogin();
                }, 1000);
            }
        }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                title: $scope.currentLang.sub_title,
                template: $scope.currentLang.connection_error
            });
        });
    };
})

.controller('SearchCtrl', function($scope, $state, $ionicPopup, $cordovaBarcodeScanner, $ionicModal) {
        $scope.data = [];
        $scope.scanQRCode = function () {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                if(imageData.text.trim()!=""){
                    $scope.send(imageData.text.trim());
                }
            }, function(error) {
                console.log("An error happened -> " + error);
            });
        }
        $scope.search = function(){
            var text = document.getElementById('txtSearch').value;
            if(text.trim() == ""){
                var alertPopup = $ionicPopup.alert({
                    title: $scope.currentLang.sub_title,
                    template: $scope.currentLang.text_required,
                });
            }else{
                $scope.send(text);
            }
        }

        $scope.send = function(text){
            text = text.toUpperCase();
            var doc = text.trim().substr(0,2);
            // var cod = text.trim().substr(2,text.length);
            if(doc == "SC"){
                $state.go('app.scanCTN',{vid:text}, {reload: true});
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: $scope.currentLang.sub_title,
                    template: $scope.currentLang.invalid_code,
                });
            }
        }

        $scope.logout = function(){
            $scope.loginData = {};
            $scope.login();
        }
    })

.controller('ScanCtnCtrl', function($scope, $state, $ionicPopup, $stateParams, $http) {
    $scope.data = [];
    if(typeof $scope.loginData.token === 'undefined'){
        $state.go('app.search',{},{reload:true});
    }else{
        var vd = $stateParams.vid;
        var IDE_CUO_COD = vd.substring(2,7);
        var IDE_REF_YER = vd.substring(7,11);
        var SCN_SER_NBR = vd.substring(11,vd.length);
        $http({
            method: 'POST',
            data:{
                ide_cuo_cod: IDE_CUO_COD,
                ide_ref_yer: IDE_REF_YER,
                scn_ser_nbr: SCN_SER_NBR,
                _token: $scope.loginData.token
            },
            url: 'http://10.0.9.13:8181/awlaravel/public/api/inspection/scanCTN/'+$scope.loginData.token
        }).then(function successCallback(response) {
            if(response.data){
                $scope.data = response.data;
                document.getElementById('spinner').style.display = "none";
                document.getElementById('info').style.display = "block";
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: $scope.currentLang.sub_title,
                    template: $scope.currentLang.not_found
                });
                $state.go('app.search',{},{reload:true});
            }
        }, function errorCallback(response) {
            console.log('response');
            document.getElementById('spinner').style.display = "none";
            document.getElementById('info').style.display = "block";
            var alertPopup = $ionicPopup.alert({
                title: $scope.currentLang.sub_title,
                template: $scope.currentLang.connection_error
            });
            $state.go('app.search',{},{reload:true});
        });
    }
})

.controller('ScanCtnCtrl', function($scope, $state, $ionicPopup, $stateParams, $http) {
    $scope.data = [];
    if(typeof $scope.loginData.token === 'undefined'){
        $state.go('app.search',{},{reload:true});
    }else{
        var vd = $stateParams.vid;
        var IDE_CUO_COD = vd.substring(2,7);
        var IDE_REF_YER = vd.substring(7,11);
        var SCN_SER_NBR = vd.substring(11,vd.length);
        $http({
            method: 'POST',
            data:{
                ide_cuo_cod: IDE_CUO_COD,
                ide_ref_yer: IDE_REF_YER,
                scn_ser_nbr: SCN_SER_NBR,
                _token: $scope.loginData.token
            },
            url: 'http://10.0.9.13:8181/awlaravel/public/api/inspection/scanCTN/'+$scope.loginData.token
        }).then(function successCallback(response) {
            if(response.data){
                $scope.data = response.data;
                document.getElementById('spinner').style.display = "none";
                document.getElementById('info').style.display = "block";
            }else{
                var alertPopup = $ionicPopup.alert({
                    title: $scope.currentLang.sub_title,
                    template: $scope.currentLang.not_found
                });
                $state.go('app.search',{},{reload:true});
            }
        }, function errorCallback(response) {
            console.log('response');
            document.getElementById('spinner').style.display = "none";
            document.getElementById('info').style.display = "block";
            var alertPopup = $ionicPopup.alert({
                title: $scope.currentLang.sub_title,
                template: $scope.currentLang.connection_error
            });
            $state.go('app.search',{},{reload:true});
        });
    }
})

.controller('CtnDetailCtrl', function($scope, $state, $stateParams) {
    $scope.data = [];
    if(typeof $scope.loginData.token === 'undefined'){
        $state.go('app.search',{},{reload:true});
    }else{
        $scope.data.idt = $stateParams.item.split("~")[0];
        $scope.data.typ = $stateParams.item.split("~")[1];
        $scope.data.scan_pic_nbr = $stateParams.item.split("~")[2];
        if($stateParams.item.split("~")[3] == "Doubt") {
            $scope.data.ctn_sta = "សង្ស័យ";
            $scope.data.ctn_dbt_prt = $stateParams.item.split("~")[4];
            $scope.data.status = true;
        } else if($stateParams.item.split("~")[3] == "NotDoubt") {
            $scope.data.ctn_sta = "គ្មានសង្ស័យ";
        } else if($stateParams.item.split("~")[3] == "NILL") {
            $scope.data.ctn_sta = "nul";
        }
    }
})