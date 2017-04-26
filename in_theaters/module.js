(function(angular) {
  'use strict';


  // 定义一个模块
  angular.module('moviecat.in_theaters',['ngRoute','moviecat.services.http'])

      .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/in_theaters/:page?',{
          // templateURL的作用就是以异步请求的方式去一个文件中找模版
          templateUrl:'in_theaters/view.html',
          //控制器in_theatersController会作用到上面templateUrl
          controller:'in_theatersController'
        });
      }])

      .controller('in_theatersController',[
          '$scope',
          '$route',
        '$routeParams',//路由取参数，这里取页码
          'HttpService',
          function($scope,$route,$routeParams,HttpService){
            console.log($routeParams);
            var pageSize=5;
            $scope.page=parseInt($routeParams.page || 1);
            var start=($scope.page-1)*5;

            $scope.loading = true;
            $scope.title='';
            $scope.movies=[];
            $scope.totalConut=0;
            $scope.totalPage=0;
            HttpService.jsonp('http://api.douban.com/v2/movie/in_theaters',
                {count:pageSize,start:start},
                function(data){
                 // console.log(data);//data就是请求到的数据
                  $scope.loading = false;
                  $scope.title=data.title;
                  $scope.movies=data.subjects;
                  $scope.totalCount=data.total;
                  $scope.totalPage=Math.ceil(data.total/pageSize);
                  $scope.$apply();// 强制同步数据到界面,不然没有显示,只有在异步操作时需要调用$apply,告诉ng数据模型发生了变化，需要同步
                }
            );


              $scope.go=function(page){
                  if(0<page&&page<$scope.totalPage+1){
                      $route.updateParams({page:page});
                  }
              }
          }
      ])

})(angular)
