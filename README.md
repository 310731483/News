# News
小程序-News
1、app.json中不能有注释，否则会报错
2、this.setDatas({})数据绑定
   小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A，而这个动作A的执行，是在onLoad事件执行之后执行的
3、alt+shift+F 代码格式化
4、navigateTo 当页面被卸载或关闭时执行(onUnload方法)
   redirectTo 当页面被隐藏时执行(onHide方法)
5、控制标签/元素的显示与隐藏： wx:if="{{}}"false不显示，true显示
6、小程序中当值需要为false时需要加上两个大括号{{false}}
7、冒泡与非冒泡  (bindtap与catch)
8、<text>包裹在这里面的文字才能被长按选中</text>
9、同步缓存
   wx.setStorageSync(string, string/Object) 设置缓存
   wx.getStorageSync(string) 获取缓存
   wx.removeStorageSync(string) 删除缓存
   wx.clearStorageSync(); 删除全部缓存
10、要跳转的是tabBar中的页面，需要用到专属的跳转方法switchTab({})