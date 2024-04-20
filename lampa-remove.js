(function () {
  Lampa.Listener.follow('app', e => {
    if (e.type !== 'ready') return

    removeItemsFromMenu()
    test()
  });
})();

const menuItems = ['anime', 'timetable', 'feed', 'myperson', 'subscribes', 'about']

const removeItemsFromMenu = () => {
  menuItems.forEach(item => {
    $(`[data-action=${item}]`).remove();
  })
}

const test = () => {
  console.log('bublik')
  console.log(Lampa)
}