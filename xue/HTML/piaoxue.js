  // 封装sss
            function sss(){
                function snow(left,height,src){ 
                    // 获取元素 对象获取
                    var div = document.createElement("div"); 
                    var img = document.createElement("img"); 

                    // 添加对象
                    div.appendChild(img); 
                    // img添加样式
                    img.className = "imgs"; 
                    // 添加路径（传参）
                    img.src = src; 
                    // 添加移动left(传参)
                    div.style.left=left+"px"; 
                    // 添加高度height(传参)
                    div.style.height=height+"px"; 
                    // div添加样式
                    div.className="div"; 

                    // appendChild() 方法是向节点添加最后一个子节点。
                    document.getElementById("snowzone").appendChild(div); 

                    // removechild 函数可以删除父元素的指定子元素。
                    // 如果此函数删除子节点成功，则返回被删除的节点，否则返回null。
                    // 执行一次
                    setTimeout(function(){ 
                        document.getElementById("snowzone").removeChild(div); 
                    console.log(window.innerHeight); 
                    },5000); 
                } 


                
                // 定时器效果
                setInterval(function(){ 
                    var left = Math.random()*window.innerWidth; 

                    var height = Math.random()*window.innerHeight; 

                    var src = "s"+Math.floor(Math.random()*2+1)+".png";//两张图片分别为"s1.png"、"s2.png" 

                    snow(left,height,src); 

                },500);
            }
            sss();