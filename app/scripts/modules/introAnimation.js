let introAnimation = ($) => {

  const $cover = $('.cover');
  const $target = $('.cover > .container-fluid > *');

  let tl = new TimelineMax({ delay: 0.5 });
  let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (1 + max - min) + min);
  };

  TweenLite.set($cover, { transformPerspective: 600, perspective: 300, transformStyle: "preserve-3d", autoAlpha: 1 });

  $target.each((index, elm) => {
    tl.from(elm, 1, { z: randomNumber(-300, 200), opacity: 0, rotationY: randomNumber(-20, 20), clearProps: 'all' }, Math.random() * 0.2);
  });

};
module.exports = introAnimation;
