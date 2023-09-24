import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe, {
  width: 640,
});

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const currentTimeKey = 'videoplayer-current-time';

const savedTime = localStorage.getItem(currentTimeKey);

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem(currentTimeKey, seconds);
  }, 1000)
);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
