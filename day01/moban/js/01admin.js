$(() => {
  //  一进来  UL 进行隐藏
  $("ul").css("display", "none");
  // 设置高度
  let iHeight = $(window).outerHeight() - 50;
  $('.main_C').height(iHeight);

  // 手风琴效果  
  $('.content_left').on('click', 'h2', function () {
    $(this).next().slideToggle();
  });
  // 滑过当前LI变色
  $('.content_left').on('mouseover', 'li', function () {
    $(this).css("background","#195")
  });
  $('.content_left').on('mouseleave ', 'li', function () {
    $(this).css("background","")
  });
  
  //  点击切换网页
  $('.content_left').on('click', 'li', function () {
    // console.log(this);
    let path = $(this).data("path");
    $('.target').attr('src', path);

  });

})