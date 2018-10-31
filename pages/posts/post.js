// pages/posts/post.js
var postsData = require('../../data/posts-data.js')

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      this.setData({
        posts_key: postsData.postList
      })
    },
    onPostTap: function(event) {
      var postId=event.currentTarget.dataset.postid;
      // console.log("onPostTap " + postId);
      wx.navigateTo({
        url: "post-detail/post-detail?id=" + postId
      })
    },

    // onSwiperItemTap: function(event) {
    //   var postId = event.currentTarget.dataset.postid;
    //   // console.log("onPostTap " + postId);
    //   wx.navigateTo({
    //     url: "post-detail/post-detail?id=" + postId
    //   })
    // },

    onSwiperTap: function(event) { //事件冒泡处理方法
    // target 和 currentTarget
    // target指的是当前点击的组件，currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
      var postId = event.target.dataset.postid;
      wx.navigateTo({
        url: "post-detail/post-detail?id=" + postId
      })
    }
  }
})