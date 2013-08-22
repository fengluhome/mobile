/// <reference path="../lib/jquery.js" />

window.indents = [];  //单据
Array.prototype.Contains = function (variable) {
    return this.toString().indexOf(variable) > -1;
}
window.oneFunction = function (fn) {/// <summary>执行一次执行函数</summary>
    var one = true;
    return function () {
        if (one) {
            fn();
        }
        one = false;

    }

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
    one: true,
    indent: null,
    refresh: function () {
        document.getElementById("inputUsername").value = this.indent.name;
        document.getElementById("inputRestaurant").value = this.indent.restaurant;
        document.getElementById("inputFoods").value = this.indent.food;
    },

    init: function () {
        this.indent = {
            name: "",             //用户名
            restaurant: "", //餐厅
            food: "",
            price: ""
        }
        this.refresh();
        if (this.one) {
            $("#btnUsername").click(function () { /// <summary>选择人</summary>
                userPage.ToHtml(users);
            });
            $("#btnRestaurant").click(function () { /// <summary>选择餐厅</summary>
                restaurantPage.ToHtml(restaurants);
            });
            $("#btnFoods").click(function () {
                var restaurantText = document.getElementById("inputRestaurant").value;
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
                    return true;
                } else {
                    return false;
                }

            });
            this.one = false;
        }

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
    foods: [],
    ToHtml: function (obj) {
        var str = "";
        for (var i = 0; i < obj.length; i++) {
            this.foods["" + obj[i].name + ""] = obj[i];
            str += " <li><a id='" + obj[i].name + "' onclick='foodsPage.click(this)' href='#reservePage'>" + obj[i].name + "</a><span class='ui-li-count price'>&yen;" + obj[i].price + "</span></li>";
        }
        $("#foodList").html(str).listview('refresh');
    },
    click: function (dom) {
        var food = this.foods["" + dom.id + ""];
        reservePage.indent.food = food.name;
        reservePage.indent.price = food.price;
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
            var prieceRed = parseFloat(indents[i].price) > 12 ? "style='color:red;'" : "";
            str += "<li><h3><a href='#'>" + indents[i].name + "</a></h3><p>" + indents[i].restaurant + "&nbsp;&nbsp;&nbsp;" + indents[i].food + "</p><p class='ui-li-aside' " + prieceRed + "><strong>&yen;" + indents[i].price + "</strong></p></li>";
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


