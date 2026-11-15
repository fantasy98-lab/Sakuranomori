(function () {
  document.documentElement.classList.add('js');

  // 制作例のお知らせ
  var toast = document.querySelector('.toast');
  var timer;
  function notice(msg) {
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('on'); }, 3200);
  }

  document.querySelectorAll('.demo-tel').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      notice('制作例のため電話はかけられません。');
    });
  });
  document.querySelectorAll('.demo-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var msg = b.getAttribute('data-msg');
      var out = b.parentNode.querySelector('.demo-msg');
      if (out) out.textContent = msg;
      notice(msg);
    });
  });

  // 申込フォーム（送信しない）
  var form = document.getElementById('apply-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = form.querySelector('.demo-msg');
    if (!form.querySelector('input[name="date"]:checked')) {
      msg.textContent = '参加する日を選んでください。';
      return;
    }
    msg.textContent = '制作例のため送信できません。入力内容はどこにも送られていません。';
    notice('制作例のため送信できません。');
  });

  // パートを静かに表示（動きを減らす設定では止める）
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var parts = document.querySelectorAll('.part:not(#fv)');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    parts.forEach(function (p) { p.classList.add('reveal'); io.observe(p); });
  }

  // 追従バー：FVを過ぎたら出し、申込フォームでは隠す
  var bar = document.querySelector('.sticky');
  var fv = document.getElementById('fv');
  var apply = document.getElementById('apply');
  function update() {
    var fvBottom = fv.getBoundingClientRect().bottom;
    var ap = apply.getBoundingClientRect();
    var inApply = ap.top < window.innerHeight && ap.bottom > 0;
    bar.classList.toggle('show', fvBottom < 0 && !inApply);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
