// pages/movies/movies.js
var util = require('../../utils/util.js');
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(event){
      var inTheatersUrl = app.globalData.doubanBase +
        "/v2/movie/in_theaters" + "?start=0&count=3"; // 正在热映
      var comingSoonUrl = app.globalData.doubanBase +
        "/v2/movie/coming_soon" + "?start=0&count=3"; // 即将上映
      var top250Url = app.globalData.doubanBase +
        "/v2/movie/top250" + "?start=0&count=3";  // top250
      this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
      this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
      this.getMovieListData(top250Url, "top250", "豆瓣Top250");
    },

    onMoreTap:function(event){
      var category= event.currentTarget.dataset.category;
      wx.navigateTo({
        url:"more-movie/more-movie?category="+ category
      })
    },

    getMovieListData: function(url, settedKey, categoryTitle){
      var that = this;
      wx.request({
        url: url,
        method: 'GET',
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          that.processDoubanData(res.data, settedKey, categoryTitle)
        },
        fail: function (error) {
          console.log("failed")
        }
      })
    },

    processDoubanData: function (moviesDouban, settedKey, categoryTitle){
      var movies = [];
      for(var idx in moviesDouban.subjects){
        var subject = moviesDouban.subjects[idx];
        var title = subject.title;
        if(title.length >= 6) {
          title = title.substring(0,6) + "...";
        }
        var temp = {
          stars: util.convertToStarsArray(subject.rating.stars), // 星星，10分一颗星
          title: title, // 电影名称
          average: subject.rating.average, // 评分
          coverageUrl: subject.images.large, // 海报封面
          movieId: subject.id //电影ID
        }
        movies.push(temp)
      }
      var readyData = {};
      readyData[settedKey] = {
        categoryTitle: categoryTitle,
        movies: movies
      }
      this.setData(readyData)
    }
  }
})
