'use strict';

/**
 * @ngdoc function
 * @name gofishApp.controller:BuildCtrl
 * @description
 * # BuildCtrl
 * Controller of the gofishApp
 */
angular.module('gofishApp')
  .controller('BuildCtrl', function ($scope) {
	$scope.selected_base = "alpine";

    $scope.custom_base_select = false;

    $scope.default_base_images = ["ubuntu","alpine"];

    $scope.building_step = 0;
    $scope.build_changelog = "Starting Build Process"

    $scope.previous_image_names = [
      "wras-base",
      "api-gateway-base",
      "microservices"
    ];

	$scope.available_go_package_versions = {
     "wras-base" : ["v1","v2"],
	 "api-gateway-base" : ["fdlndlkndfs","3cdksabjsd2","revision3"],
	 "microservices" : ["0.0.0","0.0.1"]
	};

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


	$scope.available_go_package_versions = {
     "github.com/motemen/gore" : ["v1","hotfix-12-10"],
	 "github.com/aws/aws-sdk-go" : ["v1","v2","v3"],
	 "github.com/golang/protobuf/proto" : ["v1"],
	 "github.com/gxed/GoEndian" : ["v2"],
	 "github.com/gxed/eventfd" : ["v1"],
	 "github.com/ipfs/go-log" : ["v1"],
	 "github.com/jbenet/go-reuseport" : ["v1","v2","v3"],
	 "github.com/jbenet/go-reuseport/singlepoll" : ["v1"],
	 "github.com/jbenet/go-sockaddr/net" : ["v1"],
	 "github.com/kr/pretty" : ["v1"],
	 "github.com/kr/text" : ["v1"],
	 "github.com/whyrusleeping/go-logging" : ["v1"],
	 "github.com/smartystreets/assertions" : ["v1"],
	 "github.com/smartystreets/goconvey" : ["v1"],
	 "github.com/Sirupsen/logrus" : ["v1"],
	 "github.com/jtolds/gls" : ["v1"],
	 "github.com/cenkalti/backoff" : ["v1"],
	 "github.com/hailocab/go-hostpool" : ["v1"],
	 "github.com/andrew-d/go-termutil" : ["v1"],
	 "github.com/pkg/profile" : ["v1"],
	 "github.com/pborman/uuid" : ["v1"],
	 "github.com/garyburd/redigo/redis" : ["v1"],
	 "github.com/gorilla/mux" : ["v1"]
	};

    
    $scope.descriptions = {};

	$scope.selected_go_versions = {};

	$scope.selected_go_packages = [];

  	$scope.toggleSelection = function toggleSelection(package_name) {
      var idx = $scope.selected_go_packages.indexOf(package_name);
      if (idx > -1) {
        $scope.selected_go_packages.splice(idx, 1);
      } else {
        $scope.selected_go_packages.push(package_name);
      }
    };

	$scope.getPackageName = function(package_full_name) {
		var uri = package_full_name.substring(package_full_name.indexOf("/")+1)
		var package_name = uri.substring(uri.lastIndexOf("/")+1);
		// console.log(package_name);
		return package_name;
	}

    $scope.setBuildingStep = function(step_number) {
    	$scope.building_step = step_number;
    };

    $scope.setPackageVersion = function(package_name,package_tag) {
    	var available_versions = $scope.getPackageVersions(package_name);

    	if (available_versions == null) {
    		return;
    	}

    	for (var j = 0; j<available_versions.length; j++){
    		if (available_versions[j] == package_tag){
    			$scope.selected_go_versions[package_name] = package_tag;
    			return;
    		}
    	}
    };

    $scope.selectCustomBaseImage = function() {
    	$scope.custom_base_select = true;
    	$scope.selected_base = 'custom';
    };

    $scope.getPackageVersion = function(package_name) {
    	return $scope.selected_go_versions[package_name];
    }

    $scope.getPackageVersions = function(package_name) {
    	return $scope.available_go_package_versions[package_name];
    }

    $scope.getPackageDescription = function(package_name,package_tag) {
    	return $scope.descriptions[package_name + ":" + package_tag];
    }

    $scope.hasMoreMultipleVersions = function(package_name) {
    	if ($scope.available_go_package_versions[package_name].length > 1) {
    		return true;
    	} 

    	return false;
    }

    $scope.changeBaseImage = function(base_image) {
    	var is_custom_image = true;
    	for (var i = 0; i < $scope.default_base_images.length; i++) {
    		if (base_image == $scope.default_base_images[i]) {
    			is_custom_image = false;
    		}
    	}
    	if (!is_custom_image) {
    		$scope.custom_base_select = false;
    	}

    	$scope.selected_base = base_image;
    };

    $scope.bootstrapVersionsAndDescriptions = function(){
    	for (var i = 0; i<$scope.available_go_packages.length; i++){
    		var go_package = $scope.available_go_packages[i];
	    	for (var j = 0; j<$scope.available_go_package_versions[go_package].length; j++){
	    		var version_tag = $scope.available_go_package_versions[go_package][j];
	    		$scope.descriptions[go_package + ":" + version_tag] = "Description for '" + $scope.getPackageName(go_package) + "' on a version tagged as : " + version_tag;
	    		if (j==$scope.available_go_package_versions[go_package].length-1 ) {
	    			$scope.setPackageVersion(go_package,version_tag);
				}
	    	}    		
    	}
    };

    $scope.startBuildProccess = function() {
    	$scope.build_changelog = $scope.build_changelog + "\nUsing Selected Base Image";
    	// sleep(1);

    	$scope.build_changelog = $scope.build_changelog + "\nAdding Custom Packages";
    	// sleep(1);

    	$scope.build_changelog = $scope.build_changelog + "\nPrebaking go packages";
    	// sleep(1);

    	$scope.build_changelog = $scope.build_changelog + "\nTagging image";
    	// sleep(1);

    	$scope.build_changelog = $scope.build_changelog + "\nPushing image";
    	// sleep(1);

		$scope.build_changelog = $scope.build_changelog + "\nComplete";
    }


    // Make sure to bootstrap everything
    $scope.bootstrapVersionsAndDescriptions();

  });
