// 追従CTA：FVのボタンが画面から外れたら表示、申込フォームが見えている間は隠す
(function () {
  var sticky = document.getElementById('sticky');
  var fv = document.getElementById('fv');
  var form = document.getElementById('apply');
  if (!sticky || !('IntersectionObserver' in window)) { if (sticky) sticky.classList.add('show'); return; }
  var fvVisible = true, formVisible = false;
  function update() { sticky.classList.toggle('show', !fvVisible && !formVisible); }
  new IntersectionObserver(function (e) { fvVisible = e[0].isIntersecting; update(); }, { rootMargin: '0px 0px -40% 0px' }).observe(fv);
  new IntersectionObserver(function (e) { formVisible = e[0].isIntersecting; update(); }).observe(form);
})();

// 申込フォーム（ポートフォリオ用の制作例：送信しない）
(function () {
  var f = document.getElementById('apply-form');
  if (!f) return;
  var agree = document.getElementById('agree');
  var msg = document.getElementById('form-msg');
  f.addEventListener('submit', function (ev) {
    ev.preventDefault();
    msg.hidden = false;
    msg.textContent = agree.checked
      ? '制作例のため、お申し込みはできません。入力内容は送信されていません。'
      : '制作例のため、お申し込みはできません。（実際のページでは、定期購入の条件の確認にチェックを入れてから申し込みます）';
    msg.focus();
  });
})();
