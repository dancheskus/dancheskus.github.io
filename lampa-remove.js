(function () {
  'use strict';

  Lampa.Listener.follow('app', (e) => {
    if (e.type == 'ready') {
      setTimeout(function () {
        console.log('baranka')
        console.log(Lampa)
        $("[data-action=anime]").eq(0).remove();
      }, 10);
    }
  });

})();