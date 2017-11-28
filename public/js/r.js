const router = new VueRouter({
    routes:[
        {path:"/",component:Home},
        {path:"/Doc",
         component:Doc,
        children:[
            {path:'',components:{
                "left":Left,
                "right":Right
            }},
        ]},
        {path:"/Lan",
         component:Lan,
         children: [
             {path:'',component:List},
             {path:'/Con/:id',component:Con}
             ]},
        {path:"/Abo",component:Abo},
        {path:"/login",component:Login},
        {path:'*',redirect:'/'}

    ]
})