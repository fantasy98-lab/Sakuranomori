(function () {
  document.documentElement.classList.add('js');

  // セクションがふわっと現れる
  var parts = document.querySelectorAll('.part');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    parts.forEach(function (p) { io.observe(p); });
  } else {
    parts.forEach(function (p) { p.classList.add('is-in'); });
  }

  // 追従ボタン：FVのボタンを過ぎたら出し、予約欄が見えたら隠す
  var sticky = document.querySelector('.sticky');
  var fv = document.getElementById('fv');
  var reserve = document.getElementById('reserve');
  var ctaPart = document.getElementById('cta');
  function update() {
    var vh = window.innerHeight;
    var pastFv = fv.getBoundingClientRect().bottom < vh * 0.35;
    var rr = reserve.getBoundingClientRect();
    var cr = ctaPart.getBoundingClientRect();
    var nearEnd = rr.top < vh || (cr.top < vh * 0.4 && cr.bottom > 0);
    sticky.classList.toggle('is-on', pastFv && !nearEnd);
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // 押しても飛ばないボタン：制作例の案内を出す
  document.querySelectorAll('.js-demo').forEach(function (btn) {
    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      var box = btn.closest('.form, .shop');
      var msg = box && box.querySelector('.demo-msg');
      if (!msg) return;
      msg.textContent = btn.getAttribute('data-demo');
      msg.hidden = false;
    });
  });
  var form = document.getElementById('reserve-form');
  form.addEventListener('submit', function (ev) { ev.preventDefault(); });
})();
