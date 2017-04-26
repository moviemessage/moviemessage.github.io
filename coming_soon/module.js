(function(angular) {
  'use strict';


  // 定义一个模块
  angular.module('moviecat.coming_soon',['ngRoute','moviecat.services.http'])

      .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/coming_soon/:page?',{
          templateUrl:'coming_soon/view.html',
          controller:'coming_soonController'
        });
      }])

      .controller('coming_soonController',[
          '$scope',
        '$routeParams',//路由取参数，这里取页码
          'HttpService',
          function($scope,$routeParams,HttpService){
           // console.log($routeParams);
            var pageSize=5;
            $scope.page=parseInt($routeParams.page || 1);
            var start=($scope.page-1)*5;

            $scope.loading = true;
            $scope.title='';
            $scope.movies=[];
            $scope.totalConut=0;
            $scope.totalPage=0;
            HttpService.jsonp('http://api.douban.com/v2/movie/coming_soon',
                {count:pageSize,start:start},
                function(data){
                  console.log(data);
                  $scope.loading = false;
                  $scope.title=data.title;
                  $scope.movies=data.subjects;
                  $scope.totalConut=data.total;
                  $scope.totalPage=Math.ceil(data.total/pageSize);
                  $scope.$apply();// 强制同步数据到界面,不然没有显示
                }
            );

          }
      ])

})(angular);
