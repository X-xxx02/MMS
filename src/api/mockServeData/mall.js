//mock模拟user数据返回给前端
import Mock from "mockjs";

//get请求从config.url 获取参数，post请求从config.body中获取参数
function param2Obj(url) {
  const search = url.split("?")[1]; //拿到请求中的查询参数
  if (!search) {
    return {};
  }
  //将查询参数解析为一个js对象，方便使用
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}
const brandMap = {
  0: "苹果",
  1: "vivo",
  2: "oppo",
  3: "魅族",
  4: "三星",
  5: "小米",
};
let List = [];
const count = 200;

//模拟数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(), //唯一id
      "money|3500-8970": 1, //价格
      date: Mock.Random.date(), //日期
      brand: brandMap[Mock.Random.integer(0, 5)], //品牌
      count: Mock.Random.integer(300, 500), //库存
    })
  );
}

export default {
  /**
   * 获取列表要带参数 name ,page, limit;name可以不填，不填的话返回的就是原始的列表
   * page,limit有默认值
   * @param name,page,limit
   * @return {{code:number, count:number, data: *[]}}
   */

  getMallList: (config) => {
    console.log(config, "拿到的config");
    const { name, page = 1, limit = 20 } = param2Obj(config.url);
    console.log("name:" + name, "page:" + page, "分页大小limit:" + limit);
    //如果name不为空，就根据name过滤出符合要求的用户保存在mockList中
    const mockList = List.filter((mall) => {
      if (name && mall.brand.indexOf(name) === -1) return false;
      return true;
    });

    //20条记录分一页，即保留索引在[(page-1)*limit,page*limit)区间的元素
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    );
    return {
      code: 20000,
      count: mockList.length,
      list: pageList,
    };
  },

  /**
   * 增加商品
   * @param name , addr , age , birth , sex
   * @return {{code:number , data:{message:string}}}
   */

  creatMall: (config) => {
    //将post请求携带的数据解析
    const { brand, money, date, count } = JSON.parse(config.body);
    console.log(JSON.parse(config.body), "拿到的form");
    //格式化日期
    const dateOnly = new Date(date).toISOString().split("T")[0];
    //将商品数据添加到List头部
    List.unshift({
      id: Mock.Random.guid(),
      brand: brand,
      money: money,
      date: dateOnly,
      count: count,
    });
    return {
      code: 20000,
      data: {
        message: "添加成功！",
      },
    };
  },

  /**
   * 删除商品
   * @param id
   * @return {*}
   */
  deleteMall: (config) => {
    const { id } = JSON.parse(config.body);
    if (!id) {
      return {
        code: -999,
        message: "参数不正确！",
      };
    } else {
      List = List.filter((u) => u.id !== id); //将对应id的用户过滤掉
    }
    return {
      code: 20000,
      message: "删除成功！",
    };
  },

  /**
   * 批量删除
   * @param config
   * @return {{code:number,data:{message:string}}}
   */
  batchremove: (config) => {
    let { ids } = param2Obj(config.url);
    ids = ids.split(",");
    List = List.filter((u) => !ids.includes(u.id));
    return {
      code: 20000,
      data: {
        message: "批量删除成功！",
      },
    };
  },

  /**
   * 修改商品
   * @param id,name,addr,age,birth,sex
   * @return {{code:number,data:{message:string}}}
   */
  updateMall: (config) => {
    const { id, brand, money, date, count } = JSON.parse(config.body);
    console.log(config, "前台传递过来的");
    List.some((m) => {
      //通过用户的id号找到用户，then修改其信息
      if (m.id === id) {
        m.brand = brand;
        m.money = money;
        m.date = date;
        m.count = count;
        return true;
      }
    });
    return {
      code: 20000,
      data: {
        message: "编辑成功！",
      },
    };
  },
};
