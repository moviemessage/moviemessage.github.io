(function(angular){
   angular.module('moviecat',[
    // 1. 引入NG和ngRoute的包
    // 2. 定义一个模块(注意如果使用路由就必须引入ngRoute模块，其他模块必须依赖这个模块)
       'ngRoute',
       'moviecat.movie_detail',//这里先后控制了加载的顺序，为什么要放到前面，因为不放到前面的错误信息
     // http-service.js:26 GET http://api.douban.com/v2/movie/detail?count=5&start=129090500&q=undefined&callback=jsonp_2097049656773841
       //detail去匹配/:category了，原因是这里有两个路由，一个/:category/:page?，另一个/detail/:id，
       'moviecat.movie_list',
       /*'moviecat.in_theaters',
       'moviecat.coming_soon',
       'moviecat.top250',*/
       'moviecat.directives.auto_active'
   ])

   // 3. 定义路由表（路由规则）
       .config(['$routeProvider',function($routeProvider){
         // $routeProvider 就相当于保安部
         $routeProvider.otherwise({redirectTo:'/in_theaters'});
       }])
//搜索框是公共的，所以在主模块定义这个控制器
       .controller('searchcontroller',['$scope','$route',function($scope,$route){
         $scope.input='';
         $scope.search=function(){
           //官网可以查到$route是URL监视controllers and views,  updateParams更新路由URL（已有page的不变，同的category更新，没有的q加进去）
           //搜索框要搜索，前面HttpService.jsonp中的地址只在#后面替换成search?q=,而.category可以匹配到search，只要加个q:
           //（$route.updateParams一下，已有page的不变，同的category更新，没有的q加进去）
           $route.updateParams({category:'search',q:$scope.input});
//会看到搜索赵本山url是：http://api.douban.com/v2/movie/search?count=5&start=0&q=%E8%B5%B5%E6%9C%AC%E5%B1%B1&callback=jsonp_037416012619375154
                                                                              //  这段代表赵本山的编码         
         }
       }])
})(angular);
