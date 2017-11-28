var Home=Vue.component('home',{
    // props:['navData'],
    template:`<div class="home">
        <Nav></Nav>
        <span style="line-height: 100px;text-align: center;display: block;font-size: 20px">Welcome to my webpage</span>
         <div class="homeCon">
             <img src="./img/vue.png" alt="">
        </div>
    </div>`
})
var Nav=Vue.component('Nav',{
    // props:['navData'],
    template:`<div>
                <ul class="nav">
                    <router-link v-for="(item,key) in navData" :to="item.url" :key="key" tag="li" exact>{{item.title}}</router-link>
                    <router-link to="/login" v-if="!islogin" tag="li">登录</router-link>
                    <span v-if="islogin" class="info" @click="show" style="line-height: 44px">
       {{name}}
            <span  class="logout" v-show="isshow" @click="logout" >退出</span>
       </span>
                </ul>
            </div>`,
    data(){
        return {
            navData:[
                {title:'首页',url:'/'},
                {title:'学习文档',url:'/Doc'},
                {title:'支持语言',url:'/Lan'},
                {title:'关于我们',url:'/Abo'},
            ],
            islogin:false,
            name:"",
            isshow:false
        }
    },
    created(){
        this.name=this.get("login","name");
        this.islogin=this.get("login","name");
    },
    methods:{
        show(){
            this.isshow=!this.isshow
        },
        logout(){
            this.del("login");
            router.push("/")
        }
    }
})
var Doc=Vue.component("Doc",{
    props:['navData'],
    template:`<div class="Doc home">
                <Nav :nav-data="navData"></Nav>
                <div style="width:100%;height:100vh;">
                <router-view name="left" class="left"></router-view>
                <router-view name="right" class="right"></router-view>
                </div>
            </div>`,
    beforeRouteEnter(to,from,next){

        next(function(vm){
            if(!vm.get("login","name")){
                router.push("/login");
            }
        })
    }
})
var Left=Vue.component("Left",{
    template:`<div class="Left">
        <ul>
            <h4>一、基础</h4>
            <router-link tag="li" to="#one">开始</router-link>
            <router-link tag="li" to="#two">路由匹配</router-link>
            <router-link tag="li" to="#three">嵌套路由</router-link>
            <router-link tag="li" to="#four">编程式导航</router-link>
            <router-link tag="li" to="#five">命名路由</router-link>
        </ul>
        <ul>
            <h4>二、进阶</h4>
            <router-link tag="li" to="#six">导航守卫</router-link>
            <router-link tag="li" to="#seven">路由元信息</router-link>
            <router-link tag="li" to="#eight">过渡动效</router-link>
            <router-link tag="li" to="#nine">数据获取</router-link>
            <router-link tag="li" to="#ten">滚动行为</router-link>
        </ul>
</div>`,
    watch:{
        $route(){
            var hash=this.$route.hash.slice(1);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ tweeningNumber: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: document.querySelector("#"+hash).offsetTop-44 }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start()
            animate()
        }
    },
    created(){
        var that=this;
        fetch("/cate").then(function (e) {
            return e.json();
        }).then(function(e){
            that.menuData=e;
            console.log(e)
        })
    }
})
var Right=Vue.component('Right',{
    template:`<div>
        <div id="one" style="height:200px;">开始</div>
        <div id="two" style="height:200px;">路由匹配</div>
        <div id="three" style="height:200px;">嵌套路由</div>
        <div id="four" style="height:200px;">编程式导航</div>
        <div id="five" style="height:200px;">命名路由</div>
        <div id="six" style="height:200px;">导航守卫</div>
        <div id="seven" style="height:200px;">路由元信息</div>
        <div id="eight" style="height:200px;">过渡动效</div>
        <div id="nine" style="height:200px;">数据获取</div>
        <div id="ten" style="height:200px;">滚动行为</div>
</div>`
})



var Lan=Vue.component('Lan',{
    props:['navData'],
    template:`<div class="Lan home">
                <Nav :nav-data="navData"></Nav>
                <transition name="list" mode="out-in">
                <router-view></router-view>
                </transition>
               </div>`
})
var List=Vue.component("List",{
    template:`<div class="List" style="position: absolute;top: 44px;left: 0;width:100%;background:rgba(0,0,0,0)">
        <ul class="mui-table-view"  style="background:rgba(0,0,0,0)">
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/1" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        HTML
                        <p class='mui-ellipsis'>HTML（超文本标记语言）：语法结构比较松散；由浏览器解释执行（内容）</p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/2" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        CSS
                        <p class='mui-ellipsis'>Css（层叠样式表）：给html添加样式，修饰网页中的元素（样式）</p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/3" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        JS
                        <p class='mui-ellipsis'>基于对象和事件驱动的松散型（弱）的解释性语言 </p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/4" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        队列
                        <p class='mui-ellipsis'>js是当线程异步机制的，要去模拟多线程，解决回调地域问题，即用到了队列。分为动画队列、fx队列、自定义队列</p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/5" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        选择器
                        <p class='mui-ellipsis'>通过jq可以让我们用js 像操作css的选择器一样，轻松简单的获得元素，支持css3里面的所有选择器，以及它自己特有的选择器
        </p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/6" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        插件机制
                        <p class='mui-ellipsis'>将对象方法封装起来，用于对通过选择器获取的jQuery对象进行操作</p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/7" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        ajax（异步请求，局部刷新）
                        <p class='mui-ellipsis'>ajax的表面意思是异步执行的js和xml，它利用JavaScript的异步机制，无刷新的或者按照需求来加载我们需要的数据，能够提高用户的体验性，能够提高页面的加载速度，来达到桌面端软件的操作模式
        </p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/8" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        mvc（分工合作）
                        <p class='mui-ellipsis'>Model模型：由类实现，处理业务逻辑；View 视图：显示页面，用来呈现数据。Controlle控制器：接收用户请求，并调用某个Model处理，然后跳转某个显示页面
        </p>
                    </div>
               </router-link>
            </li>
            <li class="mui-table-view-cell mui-media">
                <router-link to="/Con/9" tag="a">
                    <img class="mui-media-object mui-pull-left" src="./img/moren.jpg">
                    <div class="mui-media-body">
                        面向对象
                        <p class='mui-ellipsis'>面向对象的三个特性：封装、继承、多态，相较于面向过程更加简单，更有利于编程，减去很多重复的工作
        </p>
                    </div>
               </router-link>
            </li>
        </ul>
    </div>`
})
var Con=Vue.component('Con',{
    template:`<div class="Con">
        <h2 style="text-align: center;line-height: 70px">{{$route.params.id}}</h2>
        <h3 style="text-align: center;line-height: 60px">前端和后台的区别</h3><span style="line-height: 30px">1、前端：以用户为中心，主要是和用户的交互，操作文件少，只是html、css、js三个文件的使用，只为呈现不同的用户视觉感受和基本操作，目标单一，变化不大，呈现的页面也只是静态 的页面<br><br>2、后台：以机器为中心，主要为用户服务，记录用户的状态，后台主要是数据的存储与数据的传递，连接数据库，让机器实现用户的逻辑思想，带来更高的体验性，主要是要求拥有较高的逻辑思维与流程思考能力，也就是需要有全栈的能力。<br><br>3、在一定程度上可以说前端是运行在后台基础上的，有了后台前端才有了意义，有了前端后台才能给用户带来更好的视觉体验与基本操作能力，两者密不可分，缺一不可。<br></span>
    </div>`
})
var Abo=Vue.component('Abo',{
    props:['navData'],
    template:`<div class="Abo home">
                <Nav :nav-data="navData"></Nav>
                <span style="display: block;line-height: 100px;text-align: center;font-size: 24px">About us</span>
                <p style="width:800px;margin: 0 auto;font-size: 18px;line-height: 30px;color: #666">vue即Model-View-ViewModel。 Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。 ViewModel是Vue的核心，它是Vue的一个实例。Vue实例时作用域某个HTML元素上的，这个HTML元素可以是body，也可以是某个id所指代的元素。 DOM Listeners和Data Bindings是实现双向绑定的关键。DOM Listeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；Data Bindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。<br><strong>vue.js的特点</strong><br>简洁：页面由HTML模板+Json数据+Vue实例组成<br> 
数据驱动：自动计算属性和追踪依赖的模板表达式<br> 
组件化：用可复用、解耦的组件来构造页面<br> 
轻量：代码量小，不依赖其他库<br> 
快速：精确有效批量DOM更新<br>
模板友好：可通过npm，bower等多种方式安装，很容易融入<br>
</p>
               </div>`
})
var Login=Vue.component("Login",{
    template:`<div class=" Login home">
<div class="login" style="border: 1px solid #ccc;border-radius: 10px;">
<header class="mui-bar mui-bar-nav" style="width:50%;height:70px;line-height:70px;margin: 0 auto;top: 50px;background: rgba(0,0,0,0);border-radius: 10px;">
     <a class="mui-icon mui-icon-undo" @click="back"></a>
			<h1 class="mui-title" style="line-height: 70px;font-size: 20px">登录</h1>
</header>
<div class="mui-content" style="padding-top: 100px;background: rgba(0,0,0,0)">
			<form id='login-form' class="mui-input-group" style="background: rgba(0,0,0,0)">
				<div class="mui-input-row" style="height:70px;">
					<label style="line-height: 48px">账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" style="line-height: 58px;height:70px;">
				</div>
				<div class="mui-input-row" style="height:70px;">
					<label style="line-height: 48px">密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" style="line-height: 58px;height:70px;">
				</div>
			</form>
		
			<div class="mui-content-padded" style="margin-top: 60px;">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit" style="border: 1px solid #ccc;background: rgba(0,0,0,0);color: #333;border-radius: 10px">登录</button>
			
			</div>
			<div class="mui-content-padded oauth-area">
			</div>
		</div>
		</div>
</div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            var obj={"name":document.querySelector("#name").value}
            this.save("login",obj);
            router.push("/doc")
        }

    }


})
