(function(angular){
    angular.module('moviecat.directives.auto_active',[])
    //页面左边三个列表，即其3个li点击时都需要加active，所以就抽象了这个公共的directive
        .directive('autoActive',['$location',function($location){
            return{
                 // 当这个指令作用于某个元素过后触发一次
                link:function(scope,element,attributes){
                    //var url=$location.url();
                    scope.$location=$location;
                    scope.$watch('$location.url()',function(now,old){
                        var alink=element.children().attr('href').substr(1);
                        // console.log(alink);
                        //当页面请求的地址和当前的a链接的地址一样的时候，就加上active
                        if(now.startsWith(alink)){
                            console.log(attributes);
                            // 干掉兄弟节点上active
                            element.parent().children().removeClass(attributes.autoActive);
                             // 给当前元素加上active样式
                            element.addClass('active');
                        }
                    });
                }
            }
        }])
})(angular)
