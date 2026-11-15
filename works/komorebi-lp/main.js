// 追従ボタン：FVのボタンが画面から外れたら表示、予約フォームが見えている間は隠す
(function () {
  var sticky = document.getElementById('sticky');
  var fv = document.getElementById('fv');
  var form = document.getElementById('reserve');
  if (!sticky || !('IntersectionObserver' in window)) { if (sticky) sticky.classList.add('show'); return; }
  var fvVisible = true, formVisible = false;
  function update() { sticky.classList.toggle('show', !fvVisible && !formVisible); }
  new IntersectionObserver(function (e) { fvVisible = e[0].isIntersecting; update(); }, { rootMargin: '0px 0px -40% 0px' }).observe(fv);
  new IntersectionObserver(function (e) { formVisible = e[0].isIntersecting; update(); }).observe(form);
})();

// 押しても飛ばないボタン（地図・電話・DM）
document.querySelectorAll('.demo').forEach(function (b) {
  b.addEventListener('click', function () {
    var out = b.closest('section').querySelector('.demo-msg');
    if (out) out.textContent = b.getAttribute('data-msg');
  });
});

// 予約フォーム（制作例：送信しない）
(function () {
  var f = document.getElementById('reserve-form');
  var msg = document.getElementById('form-msg');
  if (!f) return;
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    msg.hidden = false;
    msg.textContent = '制作例のため、ご予約はできません。入力内容は送信されていません。';
    msg.focus();
  });
})();
