const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 评分星星组件
function convertToStarsArray(stars){
  var array = [];
  for (var i=1; i<=5; i++){
    if (stars>=10){
      array.push(1);
      stars -= 10;
    } else if(stars>=5){
      array.push(0.5);
      stars -= 5;
    } else {
      array.push(0);
    }
  }
  return array;
}

// 获取豆瓣电影数据
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log("failed")
    }
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http
}