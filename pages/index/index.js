var app = getApp();
Page({
  data:{
    winHeight:"",//窗口高度
    currentIndex:0, //预设当前项的值
    scrollLeft:0, //tab标题的滚动条位置
    topNavs:[]
  },
  // 滚动切换标签样式
  switchTab: function(e){
    this.setData({
      currentIndex:e.detail.current
    });
    this.checkCor(e);
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e){
    var cur=e.target.dataset.current;
    if(this.data.currentIndex==cur){return false;}
    else{
      this.setData({
        currentIndex:cur
      })
    }
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.title,
    })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor:function(e){
    var that = this;
    if (that.data.currentIndex>4){
      that.setData({
        scrollLeft: 300
      })
    }else{
      that.setData({
        scrollLeft:0
      })
    }
  },
  intoNovel: function (e){ 
    wx.navigateTo({ 
      url: '../introduction/introduction?novel_id='+e.currentTarget.dataset.id+'&current='+this.data.currentIndex, 
    }) 
  },
  onLoad: function(options) { 
    var that = this;
    // 高度自适应
    wx.getSystemInfo({ 
      success: function(res) { 
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750/clientWidth;
        var calc = clientHeight*rpxR-180;
        that.setData( { 
          winHeight: calc,
          currentIndex: options.current
        }); 
      }
    });
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
        that.setData({
          topNavs: res.data.data
        })
        wx.setNavigationBarTitle({
          title: res.data.data[0].catName,
        })
      }
    })
  },
  footerTap:app.footerTap
})
