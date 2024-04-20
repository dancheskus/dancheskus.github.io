(function () {
  'use strict';

  Lampa.Listener.follow('app', (e) => {
    if (e.type == 'ready') {
      setTimeout(function () {
        console.log('baranka')
        $("[data-action=anime]").eq(0).remove();
      }, 10);
    }
  });

})();