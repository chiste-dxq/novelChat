Page({

  data:{
    title:null,
    novel_id:null,
    introduction:null,
    auditor:null,
  },

  onLoad: function(options){
    var that = this;
    that.setData({
      novel_id:options.novel_id,
      title:options.title,
      introduction:options.introduction,
      auditor:options.auditor,
    })

    wx.setNavigationBarTitle({
      title: options.title,
    })
  }
})