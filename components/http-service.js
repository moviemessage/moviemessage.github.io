(function(angular){
    angular.module('moviecat.services.http',[])
        .service('HttpService',['$window',function($window){
            this.jsonp=function(url,params,fn){
                // 0. 处理回调函数挂载问题(不能覆盖)
                var cbName = 'jsonp_' + (Math.random() * Math.random()).toString().substr(2);

                $window[cbName] = function(data) {
                    //请求数据完毕之后触发回掉函数
                    fn(data);
                    //去执行回掉函数fn，data就是请求到的数据，执行完回掉函数fn后，删除script标签
                    $window.document.body.removeChild(scriptElement);
                };

                // 1. 组合最终请求的url地址
                var querystring = '';
                for (var key in params) {
                    //count=pageSize&start=start
                    querystring += key + '=' + params[key] + '&';
                };

                querystring += 'callback=' + cbName;
                url = url + '?' + querystring;
//最终请求地址的例子：http://api.douban.com/v2/movie/in_theaters?count=5&start=0&q=undefined&callback=jsonp_9509682446277132

                // 2. 创建一个script标签，并将src设置为url地址
                var scriptElement = $window.document.createElement('script');
                scriptElement.src = url;

                // 3. appendChild(执行)
                $window.document.body.appendChild(scriptElement);
            }
        }])
})(angular);
