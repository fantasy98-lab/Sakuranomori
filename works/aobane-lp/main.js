document.documentElement.classList.add("js");
(() => {
  // 追従CTA：FVのボタンが見えなくなったら出し、最後の予約ボタンが見えたら隠す
  const sticky = document.querySelector('.sticky-cta');
  const fvBtn = document.querySelector('#fv .hit');
  const lastBtn = document.querySelector('#reserve .hit');
  const vis = new Map();
  const update = () => {
    const show = !vis.get(fvBtn) && !vis.get(lastBtn) && window.scrollY > 200;
    sticky.classList.toggle('show', show);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { es.forEach(e => vis.set(e.target, e.isIntersecting)); update(); });
    io.observe(fvBtn); io.observe(lastBtn);
    window.addEventListener('scroll', update, { passive: true });

  } else {
    sticky.classList.add('show');
  }

  // 制作例：LINEボタンは移動せず、「制作例のため予約はできません」を数秒だけ表示する
  const toast = document.getElementById('demo-toast');
  let timer;
  const showToast = () => {
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('on'));
    clearTimeout(timer);
    timer = setTimeout(() => {
      toast.classList.remove('on');
      setTimeout(() => { toast.hidden = true; }, 300);
    }, 2600);
  };
  document.querySelectorAll('.line-link').forEach(a => {
    if (a.getAttribute('href') === '#') {
      a.addEventListener('click', e => { e.preventDefault(); showToast(); });
    }
  });
})();
