(function(angular) {
  'use strict';


  // 定义一个模块
  angular.module('moviecat.top250',['ngRoute','moviecat.services.http'])

      .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/top250/:page?',{
          templateUrl:'top250/view.html',
          controller:'top250Controller'
        });
      }])

      .controller('top250Controller',[
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
            HttpService.jsonp('http://api.douban.com/v2/movie/top250',
                {count:pageSize,start:start},
                function(data){
                  console.log(data);
                  $scope.loading = false;
                  $scope.title=data.title;
                  $scope.movies=data.subjects;
                  $scope.totalCount=data.total;
                  $scope.totalPage=Math.ceil(data.total/pageSize);
                  $scope.$apply();// 强制同步数据到界面,不然没有显示
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
