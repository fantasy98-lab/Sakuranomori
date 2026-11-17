(() => {
  const toast = document.querySelector('.toast');
  let timer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2800);
  };

  document.querySelectorAll('.demo').forEach((el) =>
    el.addEventListener('click', () => say(el.dataset.msg))
  );

  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    say('制作例のため、申し込みは送信できません。');
  });

  // 追従ボタン：最初の画面を過ぎたら出し、フォームが見えたら隠す
  const float = document.querySelector('.float');
  const fvBtn = document.querySelector('#top .hit');
  const apply = document.getElementById('apply');
  let pastFv = false, atForm = false;
  const update = () => float.classList.toggle('show', pastFv && !atForm);
  new IntersectionObserver(([e]) => { pastFv = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(fvBtn);
  new IntersectionObserver(([e]) => { atForm = e.isIntersecting; update(); }, { rootMargin: '0px 0px -20% 0px' }).observe(apply);
})();
