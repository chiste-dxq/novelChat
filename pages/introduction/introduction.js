Page({

  data:{
    title:null,
    novel_id:null,
    introduction:null,
    auditor:null,
  },

  onLoad: function(options){
    var that = this;
    wx.request({
      url: 'http://localhost:8930/api/novel/getNovelDetail?id='+options.novel_id,
      header: {
        'content-type': 'application/json',
        'Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29kZSI6ImFkbWluIn0.bSqexWHLzwANUQ_nSj14ojV33xD2UReU8-zcDAJxn4Q'
      },
      method: 'POST',//get或者post
      data: { //请求参数，没有参数可以为空 
      },
      success: function (res) {
        that.setData({
          title:res.data.data.title,
          introduction:res.data.data.introduction,
          auditor:res.data.data.auditor,
        })
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        })
      }
    })
  },

  linkAuditor: function(e){
    e.currentTarget.dataset.auditor;
  }
})