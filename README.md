# waimai-Demo
仿饿了么外卖个人项目。这是一个前后端分离的项目. 前端实现功能逻辑, 商品展现, 还有一些小验证。 后端实现提供数据, 登录验证, 管理数据等功能。  
mintshop-server这个服务端代码是拉别人的。本人在此基础上对服务端代码进行了数据更换, 和增加数据接口函数, 改造更新数据接口函数.

## 启动项目之前, 先进行依赖安装。
mintshop-server -----> npm install --save  
vue_demo -----> npm install --save  

## 启动
假设你已经开启了mongodb(前提), 先在mintshop-server这个服务器项目里的根目录下(/mintshop-server) 运行npm start.  
然后再在vue_demo这个客户端项目的根目录下(/vue_demo) 运行npm run server.  

跑起来会出现本地服务器的站点. 如localhost:8080.  
进行访问。  

## 样品图库
### 1. 首页图片
![首页图片](../README_IMG/首页.png  "首页")
首页搜索
![首页图片](../README_IMG/搜索.png  "首页搜索") 

### 2. 发现页图片
![发现商铺图片](../README_IMG/发现.png  "发现")

### 3. 订单页图片
未登录时:
![未登录](../README_IMG/未登录订单页面.png  "订单")
已登录:
![已登录](../README_IMG/登录了的订单页面.png  "订单")

### 4. 个人页面图片
未登录时:
![未登录](../README_IMG/未登录的个人页面.png  "个人")
已登录:
![已登录](../README_IMG/登录了的个人页面.png  "个人")

### 5. 登录界面图片
![短信登录](../README_IMG/短信登录页面.png  "登录")
![密码登录](../README_IMG/密码登录页面.png  "登录")

### 6. 商铺界面图片
订餐:
![订餐](../README_IMG/商铺点餐.png  "商铺")

评价:
![评价](../README_IMG/商铺评论.png  "商铺")

商家:
![商家信息](..README_IMG/商铺商家信息.png  "商铺")
