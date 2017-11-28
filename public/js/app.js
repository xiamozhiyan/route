Vue.use(save);
new Vue({
    el:'#root',
    router:router,
    data:{
        navData:[]
    },
    /*created(){
        var that=this;
        fetch("/fetch").then(function (e) {
            console.log(e)
            return e.json();
        }).then(function(e){
            var arr=e.map(function(a){
                var obj={};
                obj.title=a.cname;
                obj.url=a.url;
                return obj;
            })
            that.navData=arr;
        })
    }*/
})