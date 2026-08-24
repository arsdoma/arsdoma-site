(function () {
  'use strict';

  function initialiseMenu() {
    var button = document.querySelector('.menu-toggle');
    var navigation = document.getElementById('site-nav');

    if (!button || !navigation) return;

    function setMenuOpen(open) {
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      navigation.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    }

    button.addEventListener('click', function (event) {
      event.preventDefault();
      setMenuOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', function (event) {
      var target = event.target;

      while (target && target !== navigation) {
        if (target.tagName === 'A') {
          setMenuOpen(false);
          return;
        }
        target = target.parentNode;
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        button.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980) setMenuOpen(false);
    });

    setMenuOpen(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseMenu);
  } else {
    initialiseMenu();
  }
}());
