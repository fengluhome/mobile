/// <reference path="../lib/jquery.js" />
var foods = {
    "KFC": [
        {
            "name": "田园脆鸡堡",
            "price": 10.00
        },
        {
            "name": "黄金咖喱猪扒饭",
            "price": 23.50
        },
        {
            "name": "意式肉酱肉丸饭",
            "price": 16.00
        },
        {
            "name": "老北京鸡肉卷",
            "price": 14.00
        },
        {
            "name": "劲脆鸡腿堡",
            "price": 15.00
        }
    ],
    "7-11": [
        {
            "name": "全素",
            "price": 9.00
        },
        {
            "name": "半素半荤",
            "price": 11.50
        },
        {
            "name": "全荤",
            "price": 13.00
        }
    ],
    "成都小吃": [
        {
            "name": "西红柿鸡蛋盖饭",
            "price": 10.00
        },
        {
            "name": "木须肉盖饭",
            "price": 10.00
        },
        {
            "name": "尖椒肉丝盖饭",
            "price": 12.00
        },
        {
            "name": "京酱肉丝盖饭",
            "price": 12.00
        },
        {
            "name": "地三鲜盖饭",
            "price": 9.00
        }
    ]

}

var users = [
    {
        "name": "赵大"
    },
    {
        "name": "钱二"
    },
    {
        "name": "张三"
    },
    {
        "name": "李四"
    },
    {
        "name": "王五"
    },
    {
        "name": "刘六"
    }
]
var restaurants = [
    {
        "name": "KFC"
    },
    {
        "name": "7-11"
    },
    {
        "name": "成都小吃"
    }
]
window.indents = [];  //单据
Array.prototype.Contains = function (variable) {
    return this.toString().indexOf(variable) > -1;
}
/// <summary>首页</summary>
window.indexPage = {
    init: function () {

        $("#btnIndents").click(function () {
            indentsPage.toHtml();
        });
        $("#btnReserve").click(function () {

            reservePage.init();
        });
    }

}
/// <summary>订餐页面</summary>
window.reservePage = {
    add: function (obj) {
        indents.push(obj);
    },
    indent: null,
    refresh: function () {
        $("#inputUsername").val(this.indent.name);
        $("#inputRestaurant").val(this.indent.restaurant);
        $("#inputFoods").val(this.indent.food);
    },

    init: function () {
        this.indent = {
            name: "",             //用户名
            restaurant: "", //餐厅
            food: "",
            price: ""
        }
        this.refresh();
        $("#btnUsername").click(function () { /// <summary>选择人</summary>
            userPage.ToHtml(users);
        });
        $("#btnRestaurant").click(function () { /// <summary>选择餐厅</summary>
            restaurantPage.ToHtml(restaurants);
        });
        $("#btnFoods").click(function () {
            var restaurantText = $("#inputRestaurant").val();
            if (restaurantText === "") return false;
            foodsPage.ToHtml(foods[restaurantText]);
        });
        $("#reservePageOK").click(function () {  /// <summary>确认套餐</summary>
            var usernameText = reservePage.indent.name;
            restaurantText = reservePage.indent.restaurant;
            foodText = reservePage.indent.food,
            price = reservePage.indent.price;
            if (usernameText !== "" && restaurantText !== "" && foodText !== "" && price !== "") {
                reservePage.add(reservePage.indent);
                alert("订餐成功");
            } else {

                return false;
            }

        });

    }

}

/// <summary>用户列表页面</summary>
window.userPage = {
    ToHtml: function (obj) {
        var str = "   ";
        for (var i = 0; i < obj.length; i++) {
            obj.id = i;
            str += " <li><a onclick='userPage.click(this)' href='#reservePage'>" + obj[i].name + "</a></li>";
        }
        $("#userpageList").html(str).listview('refresh');
    },
    click: function (dom) {
        reservePage.indent.name = dom.innerText;
        reservePage.refresh();
        return true;
    }
};

/// <summary>选择餐厅页面</summary>
window.restaurantPage = {
    ToHtml: function (obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            obj.id = i;
            str += " <li><a onclick='restaurantPage.click(this)' href='#reservePage'>" + obj[i].name + "</a></li>";
        }
        $("#restaurantList").html(str).listview('refresh');
    },
    click: function (dom) {
        reservePage.indent.restaurant = dom.innerText;
        reservePage.refresh();


        return true;
    }
}

/// <summary>选择套餐页面</summary>
window.foodsPage = {
    ToHtml: function (obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            obj.id = i;
            str += " <li><a onclick='foodsPage.click(this)' href='#reservePage'>" + obj[i].name + "</a><span class='ui-li-count price'>&yen;" + obj[i].price + "</span></li>";
        }
        $("#foodList").html(str).listview('refresh');
    },
    click: function (dom) {
        reservePage.indent.food = dom.innerText;
        reservePage.indent.price = dom.nextSibling.innerText;
        reservePage.refresh();
        return true;
    }
}

/// <summary>订单查询页面</summary>
window.indentsPage = {
    useArr: function () {/// <summary>返回订餐的用户数组</summary>
        var nameArr = [];
        for (var i = 0; i < indents.length; i++) {
            if (!nameArr.Contains(indents[i].name)) {
                nameArr.push(indents[i].name);
            }
        }
        return nameArr;
    },
    toHtml: function () {
        var _useArr = this.useArr(), totalmoney = 0;

        var str = " <li data-role='list-divider'>" + _useArr.length + "人已定</li>";
        for (var i = 0; i < indents.length; i++) {
            str += "<li><h3><a href='#'>" + indents[i].name + "</a></h3><p>" + indents[i].restaurant + "&nbsp;&nbsp;&nbsp;" + indents[i].food + "</p><p class='ui-li-aside'><strong>" + indents[i].price + "</strong></p></li>";
            totalmoney += parseFloat(indents[i].price);
        }
        str += " <li data-role='list-divider'>" + (users.length - _useArr.length) + "人未定</li>";
        for (var i = 0; i < users.length; i++) {
            if (!_useArr.Contains(users[i].name)) {
                str += " <li><a href='#'>" + users[i].name + "</a></li>";
            }
        }

        $("#indentsList").html(str).listview('refresh');
        $("#identsfooter").html(_useArr.length + "人已定" + (users.length - _useArr.length) + "人已定,总共" + totalmoney + "元");

    }


}





$(function () {
    indexPage.init();


});


