Page({
  data: {
    chapters:{},
    novel_id:null
  },
  onLoad: function(options){
    var that = this;
    that.setData({
      novel_id:options.novel_id
    })
    wx.request({
      url: 'http://localhost:8930/api/novelContent/queryChapter?id='+that.data.novel_id,
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
          chapters: res.data.data
        })

        wx.setNavigationBarTitle({
          title: that.data.chapters.title
        })
      }
    })
  },
  chapterClick: function(e){
    var that = this;
    wx.navigateTo({
      url: '../content/content?chapter_id='+e.currentTarget.dataset.id+'&novel_id='+that.data.novel_id,
    })
  }
})