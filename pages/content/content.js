Page({

  data:{
    novel_id: null,
    chapter_id: null,
    content: {}
  },
  onLoad:function(options){
    var that = this;
    that.setData({
      chapter_id: options.chapter_id,
      novel_id: options.novel_id
    })
    wx.request({
      url: 'http://localhost:8930/api/novelContent/getContentById?id='+that.data.novel_id+'&chapterId='+(that.data.chapter_id==null?0:that.data.chapter_id),
      header: {
        'content-type': 'application/json',
        'Token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29kZSI6ImFkbWluIn0.bSqexWHLzwANUQ_nSj14ojV33xD2UReU8-zcDAJxn4Q'
      },
      method: 'POST',//get或者post
      data: { //请求参数，没有参数可以为空 
      },
      success: function (res) {
        that.setData({
          content: res.data.data
        })
        wx.setNavigationBarTitle({
          title: that.data.content.chapter
        })
      }
    })
  },
  beforeChapter: function(e){
    var that = this;
    wx.navigateTo({
      url: '../content/content?novel_id='+that.data.content.novelId+'&chapter_id='+e.currentTarget.dataset.before,
    })
  },
  chapter: function(e){
    var that = this;
    wx.navigateTo({
      url: '../chapter/chapter?novel_id='+that.data.content.novelId,
    })
  },
  nextChapter: function(e){
    var that = this;
    wx.navigateTo({
      url: '../content/content?novel_id='+that.data.content.novelId+'&chapter_id='+e.currentTarget.dataset.next,
    })
  },
  onUnload: function(e){
    var that = this;
    wx.redirectTo({
      url: '../introduction/introduction?novel_id='+that.data.novel_id,
    })
  }
})