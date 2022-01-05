import Mock from 'mockjs'
const Random = require('mockjs').Random;
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    for (let i = 0; i < 20; i++) {
      var arr = []
      arr.push((this.pick(phonePrefixs) + Mock.mock(/\d{8}/)))
    }
    return arr//Number()
  },
})
const data = Mock.mock({
  "dataUser|10-20": [
    {
      "id|+1": 0,
      "rink|1": ['白银', '黄金', '青铜', '钻石', '王者'],
      "sort|1-20": 1,
      'adduser': '@cname',
      "addtime": "@date(yyyy-MM-dd HH:mm:ss)",
      "upuser": '@cname',
      "update": "@date(yyyy-MM-dd HH:mm:ss)"
    }
  ],
  "dataRole|10-15": [
    {
      "id|+1": 0,
      'name': '@cname',
      "rink|1": ['白银', '黄金', '青铜', '钻石', '王者'],
      "img": Random.dataImage('100x100'),
      "sex|1": ['男', '女', '保密'],
      'phone': /^13\d{9}$/,
      "state": "@boolean",
      "type|1": ['马甲', 'PC', 'WAP', '安卓', '苹果'],
      "source|1": true,
      "time": "@date(yyyy-MM-dd HH:mm:ss)",
      "newTime": "@date(yyyy-MM-dd HH:mm:ss)",
      'number|0-255': 1,
      "loginState|1": ['登入', '登出'],
      "birthdate": '@date(yyyy-MM-dd)',
      "desc": '@cparagraph',
      "autograph": Random.ctitle(),
    }
  ]
})

// --------------------------------user页面的方法------------------------------------

// 搜索
Mock.mock('/api/search/user', 'post', (options) => {
  let rank = JSON.parse(options.body)
  let arr = []
  data.dataUser.map(el => {
    if (el.rink == rank.input) { arr.push(el) }
    return arr
  })
  return {
    status: 200,
    message: '搜索成功',
    dataUser: arr
  }
})
// 修改
Mock.mock('/api/updata/user', 'post', (options) => {
  let body = JSON.parse(options.body)
  console.log(body);
  data.dataUser.map(el => {
    if (el.id == body.id) {
      el.rink = body.rink
      el.sort = body.sort
    }
    return el
  })
  return {
    status: 200,
    message: '搜索成功',
    dataUser: data.dataUser
  }
})
// 删除
Mock.mock('/api/delete/user', 'post', (options) => {
  let body = JSON.parse(options.body)
  const index = data.dataUser.findIndex(item => item.id === body.id)
  data.dataUser.splice(index, 1)
  return {
    status: 200,
    message: '删除成功',
    dataUser: data.dataUser
  }
})

// 添加
Mock.mock('/api/add/user', 'post', (options) => {
  let body = JSON.parse(options.body)
  data.dataUser.push(Mock.mock({
    "id": data.dataRole.length,
    "rink": body.rink,
    "sort": body.sort,
    'adduser|': '@cname',
    "addtime": "@date(yyyy-MM-dd HH:mm:ss)",
    "upuser|": '@cname',
    "update": "@date(yyyy-MM-dd HH:mm:ss)"
  }))

  return {
    status: 200,
    message: '添加成功',
    dataUser: data.dataUser
  }
})


// 含有分页的数据列表,有需要接受的参数要使用正则匹配
// /api/get/news?pagenum=1&pagesize=10
Mock.mock(/\/api\/get\/user/, 'get', (options) => {
  // 获取传递的参数pageindex
  const pagenum = getQuery(options.url, 'pagenum')
  // 获取传递的参数pagesize
  const pagesize = getQuery(options.url, 'pagesize')
  // 截取数据的起始位置
  const start = (pagenum - 1) * pagesize
  // 截取数据的终点位置
  const end = pagenum * pagesize
  // 计算总页数
  const totalPage = Math.ceil(data.dataUser.length / pagesize)
  // 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
  const dataUser = pagenum > totalPage ? [] : data.dataUser.slice(start, end)

  return {
    status: 200,
    message: '获取新闻列表成功',
    dataUser: dataUser,
    total: data.dataUser.length
  }
})
// --------------------------------user页面的方法 - End -----------------------------------


// --------------------------------role页面的方法 - Start -----------------------------------

// 搜索
Mock.mock('/api/search/role', 'post', (options) => {
  let obj = JSON.parse(options.body)
  let arr = []
  data.dataRole.map(el => {
    if (el.phone == obj.phone) { arr.push(el) }
    return arr
  })
  return {
    status: 200,
    message: '搜索成功',
    dataRole: arr
  }
})

// 添加
Mock.mock('/api/add/role', 'post', (options) => {
  let body = JSON.parse(options.body)
  data.dataRole.push(Mock.mock({
    "id": data.dataUser.length,
    'name': body.name,
    "rink|1": ['白银', '黄金', '青铜', '钻石', '王者'],
    "img": body.img?body.img:Random.dataImage('100x100'),
    "sex": body.sex,
    'phone': body.phone,
    "state": body.state,
    "type": body.type,
    "source": body.source?'注册会员':'马甲会员',
    "time": "@now",
    "newTime": "",
    'number|0-255': 1,
    "loginState|1": ['登入', '登出'],
    "birthdate": body.birthdate,
    "desc": body.desc,
    "autograph": body.autograph,
  }))

  return {
    status: 200,
    message: '添加成功',
    dataRole: data.dataRole
  }
})

// 删除
Mock.mock('/api/delete/role', 'post', (options) => {
  let body = JSON.parse(options.body)
  const index = data.dataRole.findIndex(item => item.id === body.id)
  data.dataRole.splice(index, 1)
  return {
    status: 200,
    message: '删除成功',
    dataRole: data.dataRole
  }
})

// 修改
Mock.mock('/api/updata/role', 'post', (options) => {
  let body = JSON.parse(options.body)
  console.log(body);
  data.dataUser.map(el => {
    if (el.id == body.id) {
      el = body
    }
    return el
  })
  return {
    status: 200,
    message: '修改成功',
    dataUser: data.dataUser
  }
})

Mock.mock(/\/api\/get\/role/, 'get', (options) => {
  // 获取传递的参数pageindex
  const pagenum = getQuery(options.url, 'pagenum')
  // 获取传递的参数pagesize
  const pagesize = getQuery(options.url, 'pagesize')
  // 截取数据的起始位置
  const start = (pagenum - 1) * pagesize
  // 截取数据的终点位置
  const end = pagenum * pagesize
  // 计算总页数
  const totalPage = Math.ceil(data.dataRole.length / pagesize)
  // 数据的起始位置：(pageindex-1)*pagesize  数据的结束位置：pageindex*pagesize
  const dataRole = pagenum > totalPage ? [] : data.dataRole.slice(start, end)

  return {
    status: 200,
    message: '获取新闻列表成功',
    dataRole: dataRole,
    total: data.dataRole.length
  }
})

const getQuery = (url, name) => {
  const index = url.indexOf('?')
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split('&')
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split('=')
      if (itemArr[0] === name) {
        return itemArr[1]
      }
    }
  }
  return null
}
// 指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 400，表示 400 毫秒 后才会返回响应内容
Mock.setup({
  timeout: 400,
})