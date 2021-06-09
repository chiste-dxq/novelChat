// pages/mine/mine.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    topNavs:{},
    topNavsNovel:{},
  },

  onLoad: function(){
    var that = this;
    wx.request({
      url: 'http://localhost:8930/api/novelCat/queryNovelCat',
      header: {
        'content-type': 'application/json',
        'Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29kZSI6ImFkbWluIn0.bSqexWHLzwANUQ_nSj14ojV33xD2UReU8-zcDAJxn4Q'
      },
      method: 'POST',//get或者post
      data: { //请求参数，没有参数可以为空 
      },
      success: function (res) {
        console.log(res)//接口返回值
        that.setData({
          topNavs: res.data.data
      })
      }
    })
  },

  getNovelListByCat: function(cat){
    var that = this;
    wx.request({
      url: 'http://localhost:8930/api/novel/queryNovel',
      header: {
        'content-type': 'application/json',
        'Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29kZSI6ImFkbWluIn0.bSqexWHLzwANUQ_nSj14ojV33xD2UReU8-zcDAJxn4Q'
      },
      method: 'POST',//get或者post
      data: { //请求参数，没有参数可以为空 
        "catIds":cat
      },
      success: function (res) {
        console.log(res)//接口返回值
        that.setData({
          topNavsNovel: res.data.data
      })
      }
    })
  },
 
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  }
 
})