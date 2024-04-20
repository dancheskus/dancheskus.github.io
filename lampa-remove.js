(function () {
  Lampa.Listener.follow('app', (e) => {
    if (e.type !== 'ready') return

    console.log(Lampa)
    $("[data-action=anime]").eq(0).remove();
    $("[data-action=timetable]").eq(0).remove();
    $("[data-action=feed]").eq(0).remove();
    $("[data-action=myperson]").eq(0).remove();
    $("[data-action=subscribes]").eq(0).remove();
    $("[data-action=about]").eq(0).remove();
  });
})();