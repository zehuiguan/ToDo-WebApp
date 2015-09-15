
# ToDo-WebApp

在任务三中，做了一个 PC 端的 ToDo 应用。任务四是将它优化，以适应移动端设备。

## ToDo WebApp Version

* [任务四要求](https://github.com/baidu-ife/ife/tree/master/task/task0004)
* [源代码](https://github.com/zehuiguan/ToDo-WebApp)
* [在线 demo](http://zehuiguan.github.io/demo/ToDo-WebApp/dist)
* 手机查看 ↓ 二维码 ↓
    
    ![todoWebApp](http://7xj3al.com1.z0.glb.clouddn.com/1442323184.png)
* [我的博客 日落后的群岚](http://zehuiguan.github.io)

## Details

* **数据存储**

    以 JSON 模拟数据表的形式存储于 LocalStorage 中

         使用数据库的思想，构建3张表。
         catalogText 分类
         childCatalogText 子分类
         taskText 任务
         
         分类表 catalog
         ----------------------
         id* | name | child(FK)
         ----------------------
         
         子分类表 childCatalog
         --------------------------------
         id* | father(FK) | name | child(FK)
         --------------------------------
         
         任务表 task
         ----------------------------------------------
         id* | father(FK) | finish | name | date | content
         ----------------------------------------------

* **使用 `LESS` 重构了 CSS 代码**
    
    使用分块、继承等方式，使得代码更加清晰明了。

* **响应式布局**
    
    针对手机端细节做了很多调整，更符合手机上的视觉交互习惯。

* **加入页面切换效果**
    
    使用 `translate3d()`，纯 CSS3 切换动画效果。

* **处理了 XSS 防护**
    
    对可能造成破坏的字符进行转码。

* **模块化**
    
    使用 requireJS 模块化 JavaScript 代码。重构 JavaScript 代码。

* **前端工程化**
    
    使用 grunt，自动编译 LESS，压缩 HTML、CSS 和 JavaScript 代码。并且配置了自动流程。
