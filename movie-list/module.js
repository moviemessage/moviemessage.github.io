(function(angular) {
  'use strict';


  // 因为in_theaters、coming_soon、top250除了when、templateUrl、controller、.jsonp处不同，其他地方都一样，
    // 所以可以把他抽象出来，把when、.jsonp中不同的放到url路由中，和page一样，请求不同访问不同。
  angular.module('moviecat.movie_list',['ngRoute','moviecat.services.http'])

      .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:category/:page?',{
          // templateURL的作用就是以异步请求的方式去一个文件中找模版
          templateUrl:'movie-list/view.html',
          controller:'movie_listController'
        });
      }])

      .controller('movie_listController',[
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
              //和page一样，用$routeParams.拼接出来路由的是什么
            HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category,
//(这端注释只是为了说明搜索框搜索的)搜索框要搜索，上面的地址只在#后面替换成search?q=,而.category可以匹配到search，只要加个q:（已有page的不变，同的category更新，没有的q加进去）
                //故只要像下面一样传个q,console.log($routeParams);可以看到，
                {count:pageSize,start:start,q:$routeParams.q},
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

//官网可以查到$route是URL监视controllers and views,  updateParams更新路由URL
              $scope.go=function(page){
                  if(0<page&&page<$scope.totalPage+1){
                      $route.updateParams({page:page});
                  }
              }
          }
      ])

})(angular)
