(function () {
  Lampa.Listener.follow('app', e => {
    if (e.type !== 'ready') return

    hideItemsFromMenu()
    test()
  });
})();

const hideItemsFromMenu = () => {
  const hiddenMenuItems = JSON.parse(localStorage.getItem('hiddenMenuItems')) || []
  hiddenMenuItems.forEach(item => {
    document.querySelector(`[data-action=${item}]`).style.display = 'none'
  })
}

const pencilIcon = `
  <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="800px" height="800px" viewBox="0 0 528.899 528.899"
    xml:space="preserve">
    <g>
      <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
        c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
        C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
        L27.473,390.597L0.3,512.69z"/>
    </g>
  </svg>
`

const test = () => {
  const newButton = document.querySelector('[data-action=main]').cloneNode(true)
  document.querySelector('[data-action=settings]').insertAdjacentElement('afterend', newButton)
  newButton.querySelector('.menu__text').innerText = 'Edit'
  newButton.querySelector('.menu__ico').innerHTML = pencilIcon

  newButton.addEventListener('mouseover', () => {
    newButton.querySelector('svg').style.fill = '#000'
  })
  newButton.addEventListener('mouseout', () => {
    newButton.querySelector('svg').style.fill = '#fff'
  })

  // when edit button is clicked open modal in the page center with full list of all buttons that has data-action attribute
  newButton.addEventListener('click', () => {
    const modal = document.createElement('div')

    Object.assign(modal.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000'
    })

    const wrapBackground = window.getComputedStyle(document.querySelector('body')).backgroundColor

    const modalContent = document.createElement('div')

    Object.assign(modalContent.style, {
      backgroundColor: wrapBackground,
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      height: '70vh',
      width: '70vw',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, 200px)',
      height: '70vh',
      width: '70vw',
    })

    const closeButton = document.createElement('button')
    closeButton.innerText = 'Close'

    Object.assign(closeButton.style, {
      padding: '10px 20px',
      border: 'none',
      backgroundColor: 'red',
      color: '#fff',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '20px',
      position: 'absolute',
      top: '20px',
      right: '20px',
    })

    closeButton.addEventListener('click', () => {
      modal.remove()
    })

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.remove()
    })

    modalContent.appendChild(closeButton)

    const buttons = Array.from(document.querySelectorAll('[data-action]')).filter(button => button.dataset.action !== 'main' && button.dataset.action !== 'settings'&& button.dataset.action !== 'favorite')

    buttons.forEach(button => {
      const newButton = button.cloneNode(true)

      Object.assign(newButton.style, {
        marginBottom: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      })

      if (document.querySelector(`[data-action=${button.dataset.action}]`).style.display === 'none') {
        newButton.style.opacity = '0.2'
      }

      newButton.addEventListener('mouseover', () => {
        newButton.querySelector('svg').style.fill = '#000'
      })
      newButton.addEventListener('mouseout', () => {
        newButton.querySelector('svg').style.fill = '#fff'
      })

      newButton.addEventListener('click', () => {
        if (document.querySelector(`[data-action=${button.dataset.action}]`).style.display === 'none') {
          document.querySelector(`[data-action=${button.dataset.action}]`).style.display = 'flex'
          newButton.style.opacity = '1'
          const hiddenMenuItems = JSON.parse(localStorage.getItem('hiddenMenuItems')) || []
          localStorage.setItem('hiddenMenuItems', JSON.stringify(hiddenMenuItems.filter(item => item !== button.dataset.action)))
          return
        }
        document.querySelector(`[data-action=${button.dataset.action}]`).style.display = 'none'
        newButton.style.opacity = '0.2'
        console.log({test: button.dataset.action})
        const hiddenMenuItems = JSON.parse(localStorage.getItem('hiddenMenuItems')) || []
        localStorage.setItem('hiddenMenuItems', JSON.stringify([...hiddenMenuItems, button.dataset.action]))
      })

      modalContent.appendChild(newButton)
    })

    modal.appendChild(modalContent)
    document.body.appendChild(modal)
  })
}