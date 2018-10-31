// pages/posts/post-detail/post-detail.js
var postsData = require("../../../data/posts-data.js")
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
    isPlayingMusic: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function(option) {
      var globalData = app.globalData;
      var postId = option.id;
      this.data.currentPostId = postId;
      var postData = postsData.postList[postId];
      this.data.postData = postData;
      this.setData({
        postData: postData
      })
      var postsCollected = wx.getStorageSync('posts_Collected')
      if(postsCollected) {
        var postCollected = postsCollected[postId]
        if(postCollected) {
          this.setData({
            collected: postCollected
          })
        }
  
      } else {
        var postsCollected = {}
        postsCollected[postId] = false;
        wx.setStorageSync('posts_Collected', postsCollected);
      }
      if (app.globalData.g_isPlayingMusic && app.globalData.g_currenMusicPostId
        === postId){
        this.setData({
          isPlayingMusic: true
        })
      }
      this.setMusicMonitor();
    },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () { // 播放中
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currenMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () { // 暂停
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currenMusicPostId = null;
    });
  },

    onCollectionTap: function(event) {  // 收藏
      var postsCollected = wx.getStorageSync('posts_Collected')
      var postCollected = postsCollected[this.data.currentPostId];
      // 取反，收藏变成未收藏，未收藏变成收藏
      postCollected = !postCollected;
      postsCollected[this.data.currentPostId] = postCollected;
      //更新文章是否的缓存值
      wx.setStorageSync('posts_Collected', postsCollected);
      //更新数据绑定变量，从而实现切换图片
      this.setData({
        collected: postCollected
      })

      wx.showToast({
        title: postCollected?"收藏成功":"取消成功",
        duration: 1000,
        icon: "success"
      })
    },

    onShareTap: function(event) {
      var itemList = [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ]
      wx.showActionSheet({
        itemList: itemList,
        itemColor: "#405f80",
        success: function(res){
          // res.cancel 用户是不是点击了取消按钮
          // res.tapIndex 数组元素的序号，从0开始
          wx.showModal({
            title: "用户" + itemList[res.tapIndex],
            // content: "用户是否取消？"
          })
        }
      })
    },
    onMusicTap: function(event) {
      var currentPostId = this.data.currentPostId;
      var postData = postsData.postList[currentPostId];
      var isPlayingMusic = this.data.isPlayingMusic;
      if(isPlayingMusic) {
        wx.pauseBackgroundAudio();
        this.setData({
          isPlayingMusic: false
        })
      } else{
        wx.playBackgroundAudio({
          dataUrl: postData.music.dataUrl,
          title: postData.music.title,
          coverImgUrl: postData.music.coverImgUrl,
        })
        this.setData({
          isPlayingMusic: true
        })
      }

    }
  }
})
