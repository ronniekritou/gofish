var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.selected_base = "alpine";

    $scope.custom_base_select = false;

    $scope.default_base_images = ["ubuntu","alpine"];

    $scope.building_step = 0;

    $scope.available_go_packages = [ 
     "github.com/motemen/gore",
	 "github.com/aws/aws-sdk-go",
	 "github.com/golang/protobuf/proto",
	 "github.com/gxed/GoEndian",
	 "github.com/gxed/eventfd",
	 "github.com/ipfs/go-log",
	 "github.com/jbenet/go-reuseport",
	 "github.com/jbenet/go-reuseport/singlepoll",
	 "github.com/jbenet/go-sockaddr/net",
	 "github.com/kr/pretty",
	 "github.com/kr/text",
	 "github.com/whyrusleeping/go-logging",
	 "github.com/smartystreets/assertions",
	 "github.com/smartystreets/goconvey",
	 "github.com/Sirupsen/logrus",
	 "github.com/jtolds/gls",
	 "github.com/cenkalti/backoff",
	 "github.com/hailocab/go-hostpool",
	 "github.com/andrew-d/go-termutil",
	 "github.com/pkg/profile",
	 "github.com/pborman/uuid",
	 "github.com/garyburd/redigo/redis",
	 "github.com/gorilla/mux"
	];

    $scope.setBuildingStep = function(step_number) {
    	$scope.building_step = step_number;
    };

    $scope.selectCustomBaseImage = function() {
    	$scope.custom_base_select = true;
    	$scope.selected_base = 'custom';
    };

    $scope.changeBaseImage = function(base_image) {
    	var is_custom_image = true;
    	for (var i = 0; i < $scope.default_base_images.length; i++) {
    		if (base_image == $scope.default_base_images[i]) {
    			is_custom_image = false;
    		}
    	}
    	// Cleanup our custom_base_select
    	if (!is_custom_image) {
    		$scope.custom_base_select = false;
    	}

    	$scope.selected_base = base_image;
    	// $scope.$apply();
    };
});