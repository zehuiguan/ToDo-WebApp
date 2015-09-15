/**
 * Created by zehuiguan on 15/6/10.
 */

//localStorage + JSON 存储任务数据
//catalog：任务目录; childCatalog:子目录； task：任务

define(['util'], function(_) {
    var catalog;
    var childCatalog;
    var task;
    var listArr = [];
    var oldHash = '#type';
    location.hash = oldHash;
    
    var init = function() {

        var catalogText = '['
            + '{'
            +     '"id": 0,'
            +     '"name": "默认分类",'
            +     '"child": [0]'
            + '}'
        + ']';

        var childCatalogText = '['
            + '{'
            +     '"id": 0,'
            +     '"name": "默认子分类",'
            +     '"child": [0],'
            +     '"father": 0'
            + '}'    
        + ']';

        var taskText = '[{'
            + '"id": 0,'
            + '"name": "使用说明",'
            + '"father": 0,'
            + '"finish": false,'
            + '"date": "2015-07-01",'
            + '"content": "本应用为离线应用，数据存储在本地硬盘' + '\\n\\n' + '在左侧边缘向右滑动可返回上一页' + '\\n\\n' + '左侧为分类列表' + '\\n' + '中间为当前分类下的任务列表' + '\\n' + '右侧为任务详情' + '\\n\\n' + '可以添加删除分类，添加任务，修改任务（标题、时间），以及给任务标记是否完成等功能。' + '\\n\\n' + 'by Zach Kwan' + '\\n' + 'http://zehuiguan.github.io"'
        +'}]';

        if (!localStorage.getItem('catalog')) {  
            localStorage.catalog = catalogText;
            localStorage.childCatalog = childCatalogText;
            localStorage.task = taskText;
        }
        catalog = JSON.parse(localStorage.catalog);
        childCatalog = JSON.parse(localStorage.childCatalog);
        task = JSON.parse(localStorage.task);
        generateType();
        _addClick();   
    }

    var _addClick = function() {

        _.delegateEvent(_.$(".type-wrap"), "h2", "click", typeClick);
        _.delegateEvent(_.$(".type-wrap"), "h3", "click", typeClick);
        _.delegateEvent(_.$(".type-wrap"), "h4", "click", typeClick);
        _.delegateEvent(_.$(".type-wrap"), "span", "click", sTypeClick);
        _.delegateEvent(_.$(".type-wrap"), "i", "click", iTypeClick);

        _.addClickEvent(_.$(".type .add"), newType);
        _.addClickEvent(_.$(".list .add"), newTask);
        _.addClickEvent(_.$(".task-finish"), finishTask);
        _.addClickEvent(_.$(".task-edit"), editTask);

        _.delegateEvent(_.$(".list-wrap"), "li", "click", listClick);
        _.delegateEvent(_.$(".list-wrap"), "h6", "click", hListClick);
        _.delegateEvent(_.$(".list-wrap"), "span", "click", sListClick);
        _.addClickEvent(_.$(".btn4"), cancelAdd);
        _.delegateEvent(_.$(".list-wrap"), "i", "click", del);  
    };
    // 生成任务分类列表
    var generateType = function () {
        _.addClass(_.$("#type-all"), "choose");
        getCatalogNum();  
        var typeHtml = '';
        for (var i = 0; i < catalog.length; i++) {
            typeHtml += ''
                + '<li>'
                +    '<h3>'
                +        '<i class="icon-folder-open"></i>'
                +        '<span>' + catalog[i].name + '</span>' + '&nbsp;&nbsp;(' + catalog[i].num + ')';
            if (catalog[i].name == '默认分类') {
                typeHtml += ''  
                +       '<i class="icon-cancel type-delete hide"></i>';                
            } else {
                typeHtml += ''  
                +       '<i class="icon-cancel type-delete"></i>';                  
            };
            typeHtml += ''                     
                +    '</h3>'                    
                +    '<ul class="item">';

            for (var j = 0 ; j < catalog[i].child.length; j++) {
                var childNode = getObjByAttr(childCatalog, 'id', catalog[i].child[j]);
                typeHtml += ''
                +        '<li>'
                +            '<h4>'
                +                '<i class="icon-doc"></i>'
                +                '<span>' + childNode.name +'</span>&nbsp;&nbsp;(' + childNode.child.length + ')';
            if (childNode.name == '默认子分类') {
                typeHtml += ''  
                +                '<i class="icon-cancel type-delete hide"></i>';                
            } else {
                typeHtml += ''  
                +                '<i class="icon-cancel type-delete"></i>';        
            };
            typeHtml += '' 
                +            '</h4>'
                +        '</li>'
            }
            typeHtml += '' 
                +    '</ul>'
                + '</li>';       
        };
        _.$(".item-wrap").innerHTML = typeHtml;
    }

    // 任务列表数据处理
    var listHandler = function () {
        var element = _.$(".type .choose");  
        var elementTag = element.tagName.toLowerCase();
        var name = element.getElementsByTagName('span')[0].innerHTML;
        listArr = [];
        switch (elementTag) {
            case "h2":
                for (var i = 0; i < task.length; i++) {
                    listArr.push(task[i].id);
                };
                menuHandler();
                break;
            case "h3":
                var catalogObj = getObjByAttr(catalog, 'name', name);     
                for (var i = 0; i < catalogObj.child.length; i++) {
                    var childObj = getObjByAttr(childCatalog, 'id', catalogObj.child[i]);  
                    for (var j = 0; j < childObj.child.length; j++) {
                        listArr.push(childObj.child[j]);
                    }
                }
                menuHandler();
                break;
            case "h4":
                var childObj = getObjByAttr(childCatalog, 'name', name);     
                for (var j = 0; j < childObj.child.length; j++) {
                    listArr.push(childObj.child[j]);
                }
                menuHandler();                      
                break;
        }
    }

    // 生成任务列表
    var generateList = function (listArr) {
        var chosen = _.$(".list-wrap .choose");

        var date = [];
        var listObj;
        for (var i = 0; i < listArr.length; i++) {
            listObj = getObjByAttr(task, "id", listArr[i]);
            date.push(listObj.date);
        };
        date = _.uniqArray(date);
        date = sortDate(date);

        var listHtml = '';
        for (var i = 0; i < date.length; i++) {
            listHtml += ''
                + '<li>'
                +     '<h5>' + date[i] + '</h5>'
                +     '<ul class="item">';

            for (var j = 0; j < listArr.length; j++) {
                listObj = getObjByAttr(task, "id", listArr[j]);

                if (listObj.date === date[i]) {         
                    listHtml += ''
                +        '<li id="listItem">';
                    if (listObj.finish === true) {
                        listHtml += ''
                +             '<h6 class="list-finish">'; 
                    }
                    else if (listObj.finish === false) {
                        listHtml += ''
                +             '<h6>';
                    }
                    listHtml += ''
                +                 '<span>' + listObj.name + '</span>'
                +                 '<i class="icon-cancel list-delete"></i>'
                +             '</h6>'            
                +         '</li>';      
                }
            }
            listHtml += ''
                +     '</ul>'
                + '</li>';
        };
        _.$('.list-wrap').innerHTML = listHtml;
        if (_.$('.list-wrap').hasChildNodes()){
            if (_.$(".list-wrap").getElementsByTagName('li')[0].hasChildNodes()) {
                _.$('.list-wrap').getElementsByTagName('li')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[0].className = "choose"; 
            }
        }     
    }

    // 生成任务详细描述部分
    var generateTask = function () {
        var element = _.$(".list-wrap .choose");
        var taskHtml = '';
        var taskObj = [];
        var info = _.$(".task").getElementsByTagName("span");

        if (_.$(".list-wrap").hasChildNodes()) {
            var name = element.getElementsByTagName('span')[0].innerHTML;
            taskObj = getObjByAttr(task, 'name', name);
            info[0].innerHTML = taskObj.name;
            info[1].innerHTML = taskObj.date;
            _.$("#content-edit").value = taskObj.content;
            _.$(".task-status").style.display = "block";
            _.$("#content-edit").style.display = "block";  

        } else {
            info[0].innerHTML = "";
            info[1].innerHTML = "";
            _.$("#content-edit").value = "";
            _.$(".task-status").style.display = "none";
        }
    }


    // 新建分类
    // 新分类弹窗，编辑新分类
    var newType = function () {
        _.$('.box').style.display = 'block';
        _.$('.overlay').style.display = 'block';
        _.$('.box-name').innerHTML = '新增分类';
        var newTypeHtml = ''
            + '<p>'
            +     '新分类名称:'
            +     '<input type="text" class="new-type" placeholder="在此输入新分类的名称">'
            + '</p>'
            + '<p>'
            +     '新分类父节点:'
            +     '<select class="type-select">'
            +         '<option value="-1">无</option>';

        var itemWrap = _.$('.item-wrap');
        var itemName = itemWrap.getElementsByTagName('h3');
        for (var i = 0; i < itemName.length; i++) {
            newTypeHtml += ''
            +         '<option value="'+ i +'">' + itemName[i].getElementsByTagName('span')[0].innerHTML + '</option>'
        }

        newTypeHtml += ''
            +     '</select>'
            + '</p>'
            + '<p class="error"></p>'
            + '<button class="mybutton btn1">确定</button>'       
            + '<button class="mybutton btn2">取消</button>';

        _.$('.box-main').innerHTML = newTypeHtml;

        _.addClickEvent(_.$(".btn1"), typeAdd);
        _.addClickEvent(_.$(".btn2"), closeBox);
    }
    // 新分类添加
    var typeAdd = function () {
        var name = _.$(".new-type").value;
        var fatherName = _.$(".type-select").value;
        name = _.trim(name);

        _.$('.error').innerHTML = '';
        if (name.length === 0) {              
            _.$('.error').innerHTML = '分类名称不能为空';
            return;
        }
        else if (name.length >= 10) {
            _.$('.error').innerHTML = '分类名称不能多于10个字符';
            return;
        }
        else if (getObjByAttr(catalog, 'name', name) && fatherName === '-1') {
            _.$('.error').innerHTML = '检测到相同名称的分类已存在';
            return;
        }
        else if (getObjByAttr(childCatalog, 'name', name)  && getObjByAttr(childCatalog, 'name', name).father === catalog[_.$('.type-select').value].id) {
            _.$('.error').innerHTML = '检测到相同名称的子分类已存在';
            return;
        }

        if (fatherName === '-1') {             
            var newCatalog = {
                "id": catalog[catalog.length - 1].id + 1,
                "name": name,
                "child": [],
                "num": 0
            };
            catalog.push(newCatalog);
            save();
        }
        else {                                
            var newChild = {
                "id": childCatalog[childCatalog.length - 1].id + 1,
                "name": name,
                "child": [],
                "father": catalog[_.$('.type-select').value].id
            };
            var father = getObjByAttr(catalog, 'id', newChild.father)   
            father.child.push(newChild.id);                       
            childCatalog.push(newChild);
            save();
        }
        generateType();  
        closeBox();
    }
    // 弹窗关闭按钮
    var closeBox = function () {
        _.$('.box').style.display = 'none';
        _.$('.overlay').style.display = 'none';
    }

    // 新建任务
    // 添加新任务
    var newTask = function () {
        _.removeEvent(_.$(".list .add"), newTask);
        _.$(".task-title input").value = '';
        _.$(".task-date input").value = '';
        _.$(".task-content textarea").value = '';

        _.addClickEvent(_.$(".task-content .btn3"), taskAdd);

        _.$(".task-title span").style.display = "none";
        _.$(".task-date span").style.display = "none";    
        _.$(".task-title input").style.display = "inline";
        _.$(".task-date input").style.display = "inline";    
        _.$(".task-content textarea").readOnly = false;
        _.addClass(_.$("#content-edit"), "content-edit-border");
        _.$(".task-content .btn3").style.display = "block";
        _.$(".task-content .btn4").style.display = "block";
        _.$(".task-content .task-error").style.visibility = "visible";
        _.$(".task-status").style.display = "none";

        window.location.href = "#task";
    }

    // 进入编辑模式，编辑新任务
    var taskAdd = function () {
        console.log("in");
        var taskName = _.$(".task-title input").value;
        var taskDate = _.$(".task-date input").value;
        var taskContent = _.$(".task-content textarea").value;
        var dateSplit = taskDate.split("-");

        _.$('.task-error').innerHTML = '';

        if (taskName.length === 0) {
            _.$(".task-error").innerHTML = "任务标题不能为空";
            return;
        } else if (taskDate.length === 0) {
            _.$(".task-error").innerHTML = "任务日期不能为空";
            return;
        } else if (!taskDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            _.$('.task-error').innerHTML = '任务日期格式错误';
            return;
        } else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
            _.$('.task-error').innerHTML = '日期错误';
            return;
        } else if (getObjByAttr(task, 'name', taskName)) {
            _.$('.task-error').innerHTML = '存在相同名称的任务';
            return;
        } else if (taskContent.length === 0) {
            _.$('.task-error').innerHTML = '任务内容不能为空';
            return;     
        }

        var fatherID;
        var typeChoose = _.$(".type-wrap .choose");
        var typeTag = typeChoose.tagName.toLowerCase();
        var flag = 0;

        switch (typeTag) {
            case "h2":
                fatherID = 0;
                flag = 1;
                break;
            case "h3":
                var typeName = typeChoose.getElementsByTagName("span")[0].innerHTML;
                var typeObj = getObjByAttr(catalog, "name", typeName);
                if (typeObj.child.length > 0) {
                    fatherID = typeObj.child[0];
                } else {
                    var newChild = {
                        "id": childCatalog[childCatalog.length - 1].id + 1,
                        "name": "子分类",
                        "child": [],
                        "father": typeObj.id
                    };
                    typeObj.child.push(newChild.id);                      
                    childCatalog.push(newChild);
                    fatherID = newChild.id;
                }
                break;
            case "h4":
                var childName = typeChoose.getElementsByTagName('span')[0].innerHTML;
                fatherID = getObjByAttr(childCatalog, "name", childName).id;
                break;
        }
        var newTask = {
            "id": (task.length - 1) >= 0 ? (task[task.length - 1].id + 1) : 0,
            "name": taskName,
            "father": fatherID,
            "finish": false,
            "date": taskDate,
            "content": taskContent
        };

        task.push(newTask);
        var fatherObj = getObjByAttr(childCatalog, 'id', newTask.father);
        fatherObj.child.push(newTask.id);    

        save();
        listHandler();   

        (function() {
            var other = _.$(".list-wrap").getElementsByTagName('*');
            for (var i = 0; i < other.length; i++) {
                if (other[i].className === "choose") {
                    other[i].className = "";    
                    break;      
                }
            };
            var ele = _.$(".list-wrap").getElementsByTagName('h6');
            var len = ele.length;
            for (var j = 0; j < len; j++) {
                if (taskName === ele[j].getElementsByTagName('span')[0].innerHTML) {
                    ele[j].className = "choose";
                }
            }

            
        }());

        generateTask(); 
        generateType();
        cancelAdd();
        _.removeEvent(_.$(".task-content .btn3"), "click", taskAdd);
    }

    // 退出编辑模式，放弃添加新任务
    var cancelAdd = function () {

        if (_.$("#content-edit").value == '') {
            location.hash = '#list';
        }

        _.$(".task-title input").style.display = "none";
        _.$(".task-date input").style.display = "none";        
        _.$(".task-content .btn3").style.display = "none";
        _.$(".task-content .btn4").style.display = "none";
        _.$(".task-title span").style.display = "inline";
        _.$(".task-date span").style.display = "inline";    
        _.$("#content-edit").readOnly = true;  
        _.removeClass(_.$("#content-edit"), "content-edit-border");
        _.$(".task-content .task-error").style.visibility = "hidden";
        _.$(".task-status").style.display = "block";
        _.$('.task-error').innerHTML = '';
        _.addClickEvent(".list .add", newTask);                                 
    }

    // 修改已有的任务
    var editTask = function () {
        var taskName = _.$(".task-title span").innerHTML;
        var taskDate = _.$(".task-date span").innerHTML;
        var taskContent = _.$("#content-edit").value;
        var taskObj = getObjByAttr(task, "name", taskName);

        _.removeEvent(_.$(".list .add"), newTask);

        editSaveTemp = function (){
            editSave(taskObj);
        }
        _.addClickEvent(_.$(".task-content .btn3"), editSaveTemp);

        _.$(".task-title span").style.display = "none";
        _.$(".task-date span").style.display = "none";    
        _.$("#content-edit").readOnly = false;  
        _.addClass(_.$("#content-edit"), "content-edit-border");
        _.$(".task-title input").style.display = "inline";
        _.$(".task-date input").style.display = "inline";    
        _.$(".task-content .task-error").style.visibility = "visible";
        _.$(".task-content .btn3").style.display = "block";
        _.$(".task-content .btn4").style.display = "block"; 
        _.$(".task-status").style.display = "none";

        _.$(".task-title input").value = taskName;
        _.$(".task-date input").value = taskDate;
        _.$(".task-content textarea").value = taskContent;
    }   

    // 保存修改
    var editSave = function (taskObj) {
        _.removeEvent(_.$(".list .add"), newTask);
        var taskName = _.$(".task-title input").value;
        var taskDate = _.$(".task-date input").value;
        var taskContent = _.$(".task-content textarea").value;
        var dateSplit = taskDate.split("-");
        console.log(taskDate);
        _.$('.task-error').innerHTML = '';

        if (taskName.length === 0) {
            _.$(".task-error").innerHTML = "任务标题不能为空";
            return;
        } else if (taskDate.length === 0) {
            _.$(".task-error").innerHTML = "任务日期不能为空";
            return;
        } else if (!taskDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
            _.$('.task-error').innerHTML = '任务日期格式错误';
            return;
        } else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] > 31) {
            _.$('.task-error').innerHTML = '日期错误';
            return;
        } else if (getObjByAttr(task, 'name', name)) {
            _.$('.task-error').innerHTML = '检测到相同名称的任务已存在';
            return;
        } else if (taskContent.length === 0) {
            _.$('.task-error').innerHTML = '任务内容不能为空';
            return;     
        }
        taskObj.name = taskName;
        taskObj.date = taskDate;
        taskObj.content = taskContent;

        save();
        listHandler();
        generateTask();
        cancelAdd();
        _.removeEvent(".task-content .btn3", "click", editSaveTemp);
    }

    // 保存数据
    var save = function () {
        localStorage.catalog = JSON.stringify(catalog);
        localStorage.childCatalog = JSON.stringify(childCatalog);
        localStorage.task = JSON.stringify(task);
    }

    // 点击删除按钮
    var del = function () {
        window.event ? window.event.cancelBubble = true : event.stopPropagation();  
        if (!confirm("删除操作不可逆，确认删除？")) {
            return;
        };

        var tag = this.parentNode.tagName.toLowerCase();
        var index;
        var name = this.parentNode.getElementsByTagName("span")[0].innerHTML;

        switch(tag) {
            case "h3":
                index = getIndexByAttr(catalog, "name", name);
                for (var i = 0; i < catalog[index].child.length; i++) {
                    var childIndex = getIndexByAttr(childCatalog, "id", catalog[index].child[i]);

                    for (var j = 0; j < childCatalog[childIndex].child.length; j++) {
                        var taskIndex = getIndexByAttr(task, "id", childCatalog[childIndex].child[j]);
                        task.splice(taskIndex, 1);
                    }
                    childCatalog.splice(childIndex, 1);
                };          
                catalog.splice(index, 1);
                break;

            case "h4":
                index = getIndexByAttr(childCatalog, "name", name);
                var fatherObj = getObjByAttr(catalog, "id", childCatalog[index].father);

                fatherObj.child.splice(fatherObj.child.indexOf(childCatalog[index].id), 1);

                for (var i = 0; i < childCatalog[index].child.length; i++) {       
                    var taskIndex = getIndexByAttr(task, "id", childCatalog[index].child[i])
                    task.splice(taskIndex, 1);
                }
                childCatalog.splice(index, 1);
                break;

            case "h6":
                index = getIndexByAttr(task, "name", name);
                var fatherObj = getObjByAttr(childCatalog, "id", task[index].father);

                fatherObj.child.splice(fatherObj.child.indexOf(task[index].id), 1);
                task.splice(index, 1);
                break;
        }

        save();
        listHandler();  
        generateType();
    }
    // 根据某对象的某属性得到某对象
    var getObjByAttr = function (obj, attr, value) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][attr] === value) {
                return obj[i];
            }
        }
    }

    // 根据某对象的某属性得到某对象
    var getIndexByAttr = function (obj, attr, value) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][attr] === value) {
                return i;
            }
        }
    }

    // 对任务时间进行排序
    var sortDate = function (date) {
        return date.sort(function (a, b) {
            return a.replace(/-/g, '') - b.replace(/-/g, '');
        });
    }

    // 刷新分类对象的num属性
    var getCatalogNum = function () {
        var sum;
        for (var i = 0; i < catalog.length; i++) {
            sum = 0;
            for (var j = 0; j < catalog[i].child.length; j++) {
                var childNum = getObjByAttr(childCatalog, 'id', catalog[i].child[j]).child.length;
                sum += childNum;
            }
            catalog[i].num = sum;
        };
    }

    // 设置任务为已完成状态
    var finishTask = function () {
        var taskName = _.$(".task-title span").innerHTML;
        var taskObj = getObjByAttr(task, "name", taskName);

        if (taskObj.finish) {
            alert('任务已经完成');
            return;
        } else {
            if(!confirm("确定设置为已完成状态？")) {
                return;
            }
            alert("成功设置！");
            taskObj.finish = true;
            save();
            generateType();
            listHandler();
        }
    }
    // 特效
    // 任务分类列表点击效果
    var typeClick = function () {
        if(this.getElementsByTagName('span')[0].innerHTML == '分类列表') {
            return;
        }
        var other = _.$(".type").getElementsByTagName('*');
        for (var i = 0; i < other.length; i++) {
            if (other[i].className === "choose") {
                other[i].className = "";    
                break;      
            }
        };
        this.className = "choose";
        listHandler();
        window.location.href = "#list";
    }

    var sTypeClick = function() {
        this.parentNode.click();
    }
    var iTypeClick = function() {
        if(this.className.indexOf("icon-cancel") == -1) {
            this.parentNode.click();    
        } else {
            del.call(this);
        }
    };
    var listClick = function () {  
        var other = _.$(".list-wrap").getElementsByTagName('*');
        for (var i = 0; i < other.length; i++) {
            if (other[i].className === "choose") {
                other[i].className = "";    
                break;      
            }
        };
        this.className = "choose";
        generateTask();
        window.location.href = "#task";
    }

    var hListClick = function() {
        this.parentNode.click();
    }
    var sListClick = function() {
        this.parentNode.parentNode.click();
    }

    // 筛选菜单点击效果
    _.delegateEvent(_.$(".list-menu"), "li", "click", menuHandler);
    function menuHandler(event) {
        var other = _.$(".list-menu").getElementsByTagName('*');
        var bool;
        var newListArr = [];

        if (!event) {
            if (_.$(".list-menu .choose").innerHTML === "未完成") {
                bool = false;
            } else if (_.$(".list-menu .choose").innerHTML === "已完成") {
                bool = true;
            } else {
                generateList(listArr);
                return;
            }
        } else {
            var e = event || window.event;
            var target = e.target || e.srcElement;
            for (var i = 0; i < other.length; i++) {
                if (other[i].className === "choose") {
                    other[i].className = "";
                    break;
                }
            };
            target.className = "choose";
            if (target.innerHTML === "未完成") {
                bool = false;
            } else if (target.innerHTML === "已完成") {
                bool = true;
            } else {
                generateList(listArr);
                return;
            }
        }
       for (var j = 0; j < listArr.length; j++) {
            for (var k = 0; k <task.length; k++) {
                if (listArr[j] === task[k].id) {
                    if (task[k].finish === bool) {
                        newListArr.push(task[k].id);                        
                    }
                }               
            }
        }
        generateList(newListArr);      
    }

    //返回上一级手势  
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width; 
    var width5 = width / 5;
    var l_flag = 0, t_flag = 0;


    // //list
    // var listHammer = new Hammer(_.$("#list"));
    // listHammer.on("panstart", function(e) {
        // console.log("panstart", width5, e.center.x);
        // if(e.center.x < width5) {
        //     l_flag = 1;
        // }
    // });
    // listHammer.on("panright", function(e) {
        // if (l_flag == 1) {
        //     location.hash = 'type';
        //     console.log(e);
        //     l_flag = 0;
        // };
    // });

    // //task 
    // var taskHammer = new Hammer(_.$("#task"));
    // taskHammer.on("panstart", function(e) {
    //     console.log("panstart", width5, e.center.x);
    //     if(e.center.x < width5) {
    //         t_flag = 1;
    //     }
    // });
    // taskHammer.on("panright", function(e) {
    //     if (t_flag == 1) {
    //         location.hash = 'list';
    //         console.log(e);
    //         t_flag = 0;
    //     };
    // });

    requirejs(["hammer"], function(Hammer) {
        Hammer(_.$("#list")).on("panstart", function(e) {
            console.log("panstart", width5, e.center.x);
            if(e.center.x < width5) {
                l_flag = 1;
            }
        });
    });    

    requirejs(["hammer"], function(Hammer) {
        Hammer(_.$("#list")).on("panright", function(e) {
            if (l_flag == 1) {
                location.hash = 'type';
                console.log(e);
                l_flag = 0;
            };
        });
    });

    requirejs(["hammer"], function(Hammer) {
        Hammer(_.$("#task")).on("panstart", function(e) {
            console.log("panstart", width5, e.center.x);
            if(e.center.x < width5) {
                t_flag = 1;
            }
        });
    });    

    requirejs(["hammer"], function(Hammer) {
        Hammer(_.$("#task")).on("panright", function(e) {
            if (t_flag == 1) {
                location.hash = 'list';
                console.log(e);
                t_flag = 0;
            };
        });
    });


    window.onhashchange = function () {
        var newHash = location.hash;
        var oldEle = _.$('.' + oldHash.substr(1));
        var newEle = _.$('.' + newHash.substr(1));

        if ((oldHash == '#type' && newHash == '#list') || (oldHash == '#list' && newHash == '#task') ) {
            _.removeClass(newEle, "hide");
            _.addClass(oldEle, "slide out");
            _.addClass(newEle, "slide in");

            setTimeout(function () {
                _.removeClass(oldEle, "slide out");
                _.removeClass(newEle, "slide in");
                _.addClass(oldEle, "hide");
            }, 225);
        }
        else if ((oldHash == '#task' && newHash == '#list') || (oldHash == '#list' && newHash == '#type')) {
            _.removeClass(newEle, "hide");
            _.addClass(oldEle, "slide reverse out");
            _.addClass(newEle, "slide reverse in");
            if(oldHash == '#task' && newHash == '#list') {
                cancelAdd();  
            }
            setTimeout(function () {
                _.removeClass(oldEle, "slide reverse out");
                _.removeClass(newEle, "slide reverse in");            
                _.addClass(oldEle, "hide");
            }, 225);

        }
        oldHash = newHash;
    }   

    return {
        init: init,
        _addClick: _addClick
    } 
});

