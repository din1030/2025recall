"use strict";

// var cStamp = '<img class="vote-stamp position-relative" src="../img/vote-cursor.png">';
var vStamp = '<img class="stamp position-absolute" src="./img/vote-cursor.png">';
var valid = false,
    agree = null,
    correct = false;
$(document).ready(function () {
  var isMo = isMobile();

  if (!isMo) {
    $('.vote-section').mouseenter(function (e) {
      $('.vote-stamp').show();
    }); // 離開投票區隱藏選舉章

    $('.vote-section').mouseleave(function (e) {
      $('.vote-stamp').hide();
    }); // 選舉章隨滑鼠移動

    $('.vote-section').mousemove(function (e) {
      $('.vote-stamp').show();
      $('.vote-stamp').offset({
        left: e.pageX - 25,
        top: e.pageY - 25
      });
    });
  }

  $('.vote-section').on('vclick', function (e) {
    var sLeft = e.pageX - 25,
        sTop = e.pageY - 25;
    $(vStamp).appendTo($(this)).offset({
      left: sLeft,
      top: sTop
    });
    var validArea = $(this).find('.valid');
    var leftColumn = $(this).find('.left-col').eq(0);
    var leftColRight = $(leftColumn).offset().left + $(leftColumn).outerWidth();

    if (sLeft > leftColRight - 7 && sLeft <= leftColRight) {
      // 中間無法辨認地帶
      $('.validation').text('無效票').addClass('text-danger').removeClass('text-success');
      var invalid = '<div class="text-danger text-left">您的選票將被視為無效票，請您務必閱讀<a target="_blank" href="assets/recall.pdf">中選會公告之規定</a>。</div>';
      $('.result-hint').html(invalid).removeClass('alert alert-success').addClass('alert alert-danger');
      $('.btn-reset').removeAttr('disabled');
      return;
    } else {
      $.each(validArea, function (index, area) {
        var p = $(area).offset(),
            pLeft = p.left,
            pTop = p.top,
            pRight = p.left + $(area).outerWidth(),
            pBottom = p.top + $(area).outerHeight();

        if (sTop < pBottom && sLeft < pRight && sTop > pTop - 28 && sLeft > pLeft - 28) {
          var newAgree = $(area).hasClass('agree');
          valid = agree === null || agree === newAgree;

          if (valid) {
            agree = newAgree;
            correct = $(area).hasClass('correct');
          } else {
            agree = -1;
            correct = false;
          }

          return false;
        }
      });

      if (valid) {
        if (agree) {
          $('.validation').text('有效同意票').removeClass('text-danger').addClass('text-primary');
        } else {
          $('.validation').text('有效不同意票').removeClass('text-danger').addClass('text-primary');
        }

        if (correct) {
          var thankyou = '<h4 class="text-success">太好了!</h4><div class="text-success text-left">謝謝你支持罷免，期待我們一起迎接嶄新的國會。</div>';
          $('.result-hint').html(thankyou).removeClass('alert alert-danger').addClass('alert alert-success');
        } else {
          var id = $('body').attr('id');
          var opps = '<h4 class="text-danger">Opps!</h4>';
          opps += '<div class="text-danger text-left">你真的要跟親中賣台傅崐萁們還有失控又雙標的國蔥站在一起嗎？</div>';
          $('.result-hint').html(opps).removeClass('alert alert-success').addClass('alert alert-danger');
        }

        $('.btn-reset').removeAttr('disabled');
      } else {
        $('.validation').text('無效票').addClass('text-danger').removeClass('text-success');
        var invalid = '<div class="text-danger text-left">您的選票將被視為無效票，請您務必閱讀<a target="_blank" href="assets/recall.pdf">中選會公告之規定</a>。</div>';
        $('.result-hint').html(invalid).removeClass('alert alert-success').addClass('alert alert-danger');
        $('.btn-reset').removeAttr('disabled');
      }
    }
  });
  $('.btn-reset').click(function (e) {
    valid = false;
    agree = null;
    correct = false;
    $('img.stamp').remove();
    $('.btn-reset').attr('disabled', '');
    $('.validation').text('（尚未投票）').removeClass('text-primary text-danger');
    $('.result-hint').empty().removeClass('text-success text-danger alert alert-danger alert-success');
  });
  console.warn(logText1);
  console.warn(logText2);
  console.warn(logText3);
  console.warn(logText4);
  console.warn(logText5);
});

function isMobile() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}