Page({

  data:{
    chapter_id: null,
    content: {},
    navigationBarTitleText: null
  },

  onLoad:function(options){
    var that = this;
    that.setData({
      chapter_id: options.chapter_id
    })
    wx.request({
      url: 'http://localhost:8930/api/novelContent/getContentById?id='+that.data.chapter_id,
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
          content: res.data.data
        })
        wx.setNavigationBarTitle({
          title: that.data.content.chapter
        })
      }
    })
  }
})