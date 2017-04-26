(function(angular) {
  'use strict';

  angular.module('moviecat.movie_detail',['ngRoute','moviecat.services.http'])

      .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/detail/:id',{
          templateUrl:'movie-detail/view.html',
          controller:'movie_detailController'
        });
      }])

      .controller('movie_detailController',[
          '$scope',
          '$route',
        '$routeParams',//路由取参数，这里取页码
          'HttpService',
          function($scope,$route,$routeParams,HttpService){
            console.log($routeParams);

            $scope.loading = true;
            $scope.title='loading...';
            $scope.movie=[];

              //和page一样，用$routeParams.拼接出来路由的是什么
            HttpService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,
                {},
                function(data){
                  //console.log(data);
                  $scope.loading = false;
                  $scope.title=data.title;
                  $scope.movie=data;
                  $scope.$apply();// 强制同步数据到界面,不然没有显示
                }
            );
          }
      ])

})(angular)
