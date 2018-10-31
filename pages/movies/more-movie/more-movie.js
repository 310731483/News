// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    movies: {},
    requestUrl: "",
    totalCount: 1,
    isEmpty: true, //movies有数据时为true
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面初试话 options为页面跳转所带来的参数
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch(category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase +
        "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
        "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase +
        "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  // 上滑加载更多onScrollLower在130400版本中失效
  onReachBottom: function(event){
    var nextUrl = this.data.requestUrl +
    "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading(); // 开启Loading
  },

  onPullDownRefresh:function(event){
    console.log("this.data.requestUrl", this.data.requestUrl)
    var refreshUrl = this.data.requestUrl + "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true; 
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading(); // 开启Loading
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
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
    var totalMovies = {};
    // 如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies); // 第一次的数据加上后面加载的数据
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading(); // 关闭Loading
    wx.stopPullDownRefresh();
  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
})