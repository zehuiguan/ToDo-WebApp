/**
 * 基础工具合集
 *
 * @file util.js
 * @author Zach Kwan(zehuiguan@163.com)
 *
 */
define(function() {

    /**
     * 判断是否数组
     * @param  {any}  arr 输入的任意类型
     * @return {Boolean}     返回一个bool值
     */
    var isArray = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    }

    /**
     * 判断是否为函数
     * @param  {any} fn 输入的任意类型
     * @return {Boolean}     返回一个bool值
     */
    var isFunction = function (fn) {
        return typeof fn === "function";
    }

    /**
     * 深度克隆
     *
     * 复制复制一个目标对象，返回一个完整拷贝
     * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
     *  
     * @param  {[Object]} src 目标对象
     * @return {[Object]}     复制对象
     */
    var cloneObject = function (src) {
        var result;
        if (Object.prototype.toString.call(src) === "[object Array]" ) {
            result = [];
        } else if (src instanceof Date) {
            return new Date(src.getTime());
        } else if (typeof src === "function" || src instanceof RegExp) {
            return;
        } else {
            result = {};
        }

        for (var i in src) {
            if (src.hasOwnProperty(i)) {
                if (typeof src[i] === "object") {
                    result[i] = arguments.callee(src[i]);
                } else {
                    result[i] = src[i];
                }
            }
        }
        return result;
    }

    /**
     * 数组去重
     *
     * 只考虑数组中元素为数字或字符串，返回一个去重后的数组
     * 
     * @param  {[Array]} arr 目标数组
     * @return {[Array]}     去重后的数组
     */
    var uniqArray = function (arr) {
        var newArr = [];
        for (var i in arr) {
            if(newArr.indexOf(arr[i]) == -1) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    /**
     * 简单 trim
     * @param  {String} str 目标字符串
     * @return {String}     去除头尾空白字符的字符串
     */
    var simpleTrim = function (str) {
        for (var i = 0, n = str.length; i < n; i++) {
            if (str.charAt(i) != " " && str.charAt(i) != "\t") {
                break;
            }
        }

        for (var j = str.length; j > 0; j++) {
            if (str.charAt(i) != " " && str.charAt(i) != "\t") {
                break;
            }
        }
        return str.slice(i, j+1);
    }

    /**
     * trim
     *
     * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
     *
     * @param  {String} str 目标字符串
     * @return {String}     去空白后的字符串
     */
    var trim = function (str) { 
        return str.replace(/(^\s+)|(\s+$)/g,"");
    }

    /**
     * each
     *
     * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
     *
     * @param  {Array}   arr 数组
     * @param  {Function} fn  要执行的方法
     */
    var each = function(arr, fn) {
        for (var i in arr) {
            fn(arr[i], i);
        }
    };

    /**
     * 获取一个对象里面第一层元素的数量，返回一个整数
     *
     * @param  {Object} obj 目标对象
     * @return {Number}     第一层元素数量
     */
    var getObjectLength = function(obj) {
        return Object.keys(obj).length;
    };

    /**
     * 判断是否为邮箱地址
     * @param  {String}  emailStr 邮箱地址
     * @return {Boolean}          返回一个bool值
     */
    var isEmail = function (emailStr) {
        var pattern = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
        return pattern.test(emailStr);
    }

    /**
     * 判断是否为手机号
     * @param  {String}  phone 手机号字符串
     * @return {Boolean}       返回一个bool值
     */
    var isMobilePhone = function (phone) {
        var pattern = /^(\+\d{1,4})?\d{7,11}$/;
        return pattern.test(phone);
    }

    /**
     * 为element增加一个样式名为newClassName的新样式
     *
     * @param {Element} element      Dom 元素
     * @param {String} newClassName 样式类名称
     */
    var addClass = function (element, newClassName) {
        var oldClassName = element.className;
        if (oldClassName.indexOf(newClassName) == -1) {
            element.className = oldClassName === ""? newClassName : oldClassName + " " + newClassName;
        };
    }

    /**
     * 移除element中的样式oldClassName
     * @param  {Element} element      Dom 元素
     * @param  {String} oldClassName 旧的样式类名
     */
    var removeClass = function (element, oldClassName) {
        var originClassName = element.className;
        var pattern = new RegExp("\\b" + oldClassName + "\\b");
        element.className = trim(originClassName.replace(pattern, ''));
    }

    /**
     * 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
     * @param  {Element}  element     Dom 元素
     * @param  {Element}  siblingNode Dom 元素
     * @return {Boolean}             是否为同一级元素
     */
    var isSiblingNode = function (element, siblingNode) {
        return element.parentNode === siblingNode.parentNode;
    }

    /**
     * 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
     *
     * @param  {Element} element Dom 元素
     * @return {Object}         位置对象
     */
    var getPosition = function (element) {
        var scrollTop = document.documentElement.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft;
        var pos = {};

        if (element.getBoundingClientRect) {
            if (typeof arguments.callee.offset != "number") {
                var temp = document.createElement("div");
                temp.style.cssText = "position:absolute;left:0;top:0;";
                document.body.appendChild(temp);
                arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }

            var rect = element.getBoundingClientRect();
            var offset = arguments.callee.offset;

            pos.x = rect.left + offset;
            pos.y = rect.top + offset;

        } else {

            var actualLeft = getElementLeft(element);
            var actualTop = getElementTop(element);

            pos.x = actualLeft - scrollLeft;
            pos.y = actualTop - scrollTop;
        }
        return pos;
    }

    // 实现一个简单的JQuery
    //思路：
    //1、判断分组处理器
    //2、处理层级处理器
    //3、各种元素的处理
    /**
     * 简单 Query
     * @param  {String} selector 选择器名称
     * @return {Element}          Dom 元素
     */    
    var $ = function (selector) {
        if (!selector) {
            return null;
        }

        if (selector == document) {
            return document;
        }

        selector = selector.trim();

        if (selector.indexOf(" ") !== -1) { //若存在空格
            var selectorArr = selector.split(/\s+/); //拆成数组

            var rootScope = myQuery(selectorArr[0]); //第一次的查找范围
            var i = null;
            var j = null;
            var result = [];
            //循环选择器中的每一个元素
            for (i = 1; i < selectorArr.length; i++) {
                for (j = 0; j < rootScope.length; j++) {
                    result.push(myQuery(selectorArr[i], rootScope[j]));
                }
                // rootScope = result;
                // 目前这个方法还有bug
            }
            return result[0][0];
        } else { //只有一个，直接查询
            return myQuery(selector, document)[0];
        }
    }

    /**
     * 针对一个内容查找结果 success
     * @param  {String} selector 选择器内容
     * @param  {Element} root    根节点元素
     * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
     */
    var myQuery = function (selector, root) {
        var signal = selector[0]; //
        var allChildren = null;
        var content = selector.substr(1);
        var currAttr = null;
        var result = [];
        root = root || document; //若没有给root，赋值document
        switch (signal) {
            case "#":
                result.push(document.getElementById(content));
                break;
            case ".":
                allChildren = root.getElementsByTagName("*");
                // var pattern0 = new RegExp("\\b" + content + "\\b");
                for (i = 0; i < allChildren.length; i++) {
                    currAttr = allChildren[i].getAttribute("class");
                    if (currAttr !== null) {
                        var currAttrsArr = currAttr.split(/\s+/);
                        // console.log(currAttr);
                        for (j = 0; j < currAttrsArr.length; j++) {
                            if (content === currAttrsArr[j]) {
                                result.push(allChildren[i]);
                                // console.log(result);
                            }
                        }
                    }
                }
                break;
            case "[": //属性选择
                if (content.search("=") == -1) { //只有属性，没有值
                    allChildren = root.getElementsByTagName("*");
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                            result.push(allChildren[i]);
                        }
                    }
                } else { //既有属性，又有值
                    allChildren = root.getElementsByTagName("*");
                    var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                    var cut = selector.match(pattern); //分离后的结果，为数组
                    var key = cut[1]; //键
                    var value = cut[2]; //值
                    for (i = 0; i < allChildren.length; i++) {
                        if (allChildren[i].getAttribute(key) == value) {
                            result.push(allChildren[i]);
                        }
                    }
                }
                break;
            default: //tag
                result = root.getElementsByTagName(selector);
                break;
        }
        return result;
    }

    /////////
    //事件处理 
    /////////

    /**
     * 添加事件
     * @param {Element} element  Dom 元素
     * @param {String} event    事件名称
     * @param {Function} listener 执行的函数
     */
    var addEvent = function (element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        } else {
            element["on" + event] = listener;
        }
    }

    /**
     * 移除事件
     * @param  {Element} element  Dom 元素
     * @param  {String} event    事件名称
     * @param  {Function} listener 事件
     */
    var removeEvent = function (element, event, listener) {
        console.log("removeEvent");

        if (element.removeEventListener) {
            element.removeEventListener(event, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        } else {
            element["on" + event] = null;
        }
    }

    /**
     * 添加点击事件
     * @param {Element} element  Dom 元素
     * @param {Function} listener 事件
     */
    var addClickEvent = function (element, listener) {
        addEvent(element, "click", listener);
        console.log("addClickEvent");    
    }

    /**
     * 添加 Enter 事件
     * @param {Element} element  Dom 元素
     * @param {Function} listener 事件
     */
    var addEnterEvent = function (element, listener) {      
        addEvent(element, "keyup", function(event) {
            if (event.keyCode == 13) {
                listener();
            }
        });    
    }

    /**
     * 事件代理
     * @param  {Element} element   Dom 元素
     * @param  {String} tag       标签名
     * @param  {String} eventName 事件名称
     * @param  {Function} listener  事件
     */
    var delegateEvent = function (element, tag, eventName, listener) {
        addEvent(element, eventName, function(event){
            event = event || window.event;
            var target = event.target || event.srcElement;

            //针对task0005.js修改bug，避免父元素与“子元素”是同一个元素。
            if (target.tagName.toLowerCase() === tag && (element !== target)) {
                listener.call(target, event);
            }
        });
    }
    // 估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：

    // $.on = function(selector, event, listener) {
    //     addEvent($(selector), event, listener);
    // };
    // $.click = function(selector, listener) {
    //     addClickEvent($(selector), listener);
    // };
    // $.un = function(selector, event, listener) {
    //     removeEvent($(selector), event, listener);
    // };
    // $.delegate= function(selector, tag, event, listener) {
    //     delegateEvent($(selector), tag, event, listener);
    // };

    /**
     * 是否是 IE
     * @return {string} 返回-1或者版本号
     */
    var isIE = function () {
        //rendering engines
        var engine = {
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,

            //complete version
            ver: null
        };

        //browsers
        var browser = {

            //browsers
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,

            //specific version
            ver: null
        };

        //detect rendering engines/browsers
        var ua = navigator.userAgent;
        if (window.opera) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            engine.ver = RegExp["$1"];
            engine.webkit = parseFloat(engine.ver);

            //figure out if it's Chrome or Safari
            if (/Chrome\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Version\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.safari = parseFloat(browser.ver);
            } else {
                //approximate version
                var safariVersion = 1;
                if (engine.webkit < 100) {
                    safariVersion = 1;
                } else if (engine.webkit < 312) {
                    safariVersion = 1.2;
                } else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }

                browser.safari = browser.ver = safariVersion;
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            engine.ver = browser.ver = RegExp["$1"];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            engine.ver = RegExp["$1"];
            engine.gecko = parseFloat(engine.ver);

            //determine if it's Firefox
            if (/Firefox\/(\S+)/.test(ua)) {
                browser.ver = RegExp["$1"];
                browser.firefox = parseFloat(browser.ver);
            }
        } else if ((/MSIE ([^;]+)/.test(ua)) || (/rv:([\d.]+)/).test(ua)) {
            engine.ver = browser.ver = RegExp["$1"];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }

        if (engine.engine.ie) {
            return client.engine.ver;
        } 
    }

    /**
     * 设置 cookie
     * @param {String} cookieName  名称
     * @param {String} cookieValue 值
     * @param {Number} expiredays  过期时间
     */
    var setCookie = function (cookieName, cookieValue, expiredays) {
        var exdate = new Date();

        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays === null) ? "" : ";expires=" + exdate.toGmtString());
    }

    /**
     * 获取 cookie
     * @param  {String} cookieName 名称
     * @return {Object}            cookie 对象
     */
    var getCookie = function (cookieName) {
        var c_start, c_end;

        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(cookieName + "=");
            if (c_start != -1) {
                c_start = c_start + cookieName.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    /**
     * 封装 Ajax
     * @param  {String} url     地址
     * @param  {Object} options 选项对象
     * @return {[type]}         [description]
     */
    var ajax = function (url, options) {
        var xhr = null;
        //创建ajax对象
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        if (!options.type) {
            options.type = "GET";
        }
        options.type = options.type.toUpperCase();

        var random = Math.random();

        if (typeof options.data == 'object') {
            var str = '';
            for (var key in options.data) {
                str += key + '=' + options.data[key] + '&';
            }
            options.data = str.replace(/&$/, '');
        }

        if(options.type == 'GET') {
            if(options.data){
                xhr.open('GET', url + '?' + options.data, true);
            } else {
                xhr.open('GET', url + '?t=' + random, true);
            }
            xhr.send();
        } else if (options.type == 'POST') {
            xhr.open('POST', url, true);
            // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(options.data);
        }
        // 处理返回数据
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                options.onsuccess(responseText, xhr);
            }
            else if (xhr.readyState == 4 && xhr.status == 404) {
                options.onfail();
            }
        };

    }

    // // 使用示例：
    // ajax(
    //     'http://localhost:8080/server/ajaxtest', 
    //     {
    //         data: {
    //             name: 'simon',
    //             password: '123456'
    //         },
            // onsuccess: function (responseText, xhr) {
            //     console.log(responseText);
            // }
    //     }
    // );
    // 

    /**
     * 转码 XSS 防护
     * @param  {String} str 用户输入的字符串
     * @return {String}     转码后的字符串
     */
    var changeCode = function(str) {
        str = str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2f;");
        return str;
    };

    return {
        isArray: isArray,
        isFunction: isFunction,
        cloneObject: cloneObject,
        uniqArray: uniqArray,
        simpleTrim: simpleTrim,
        trim: trim,
        each: each,
        getObjectLength: getObjectLength,
        isEmail: isEmail,
        isMobilePhone: isMobilePhone,
        addClass: addClass,
        removeClass: removeClass,
        isSiblingNode: isSiblingNode,
        getPosition: getPosition,
        $: $,
        myQuery: myQuery,
        addEvent: addEvent,
        removeEvent: removeEvent,
        addClickEvent: addClickEvent,
        addEnterEvent: addEnterEvent,
        delegateEvent: delegateEvent,
        isIE: isIE,
        setCookie: setCookie,
        getCookie: getCookie,
        ajax: ajax,
        changeCode: changeCode
    };
});