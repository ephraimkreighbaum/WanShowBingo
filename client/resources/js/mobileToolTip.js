tippy('a', {
    content: (reference) => reference.getAttribute('title'),
    onShow(instance) {
      if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(pointer: coarse)').matches) {
        instance.setProps({trigger: 'mouseenter'});
      } else {
        instance.setProps({trigger: 'click'});
      }
    },
  });