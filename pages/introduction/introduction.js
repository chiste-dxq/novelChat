Page({

  data:{
    title:'',
    novel_id:'',
    introduction:'',
    auditor:'',
    chapterNum:'',
    novelStatus:'',
    createTime:'',
    type: '',
  },
  onLoad: function(options){
    var that = this;
    that.setData({
      novel_id: options.novel_id,
      type: options.current
    })
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
          chapterNum:res.data.data.chapterNum,
          novelStatus:res.data.data.novelStatus,
          createTime:res.data.data.createTime
        })
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        })
      }
    })
  },

  openNovel: function(e){
    wx.navigateTo({
      url: '../content/content?novel_id='+e.currentTarget.dataset.id
    })
  },

  intoChapter: function(e){
    wx.navigateTo({
      url: '../chapter/chapter?novel_id='+e.currentTarget.dataset.id
    })
  },

  linkAuditor: function(e){
    e.currentTarget.dataset.auditor;
  },

  onUnload: function(e){
    var that = this;
    wx.navigateTo({
      url: '../index/index?current='+that.data.type,
    })
  }
})