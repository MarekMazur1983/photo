/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */

/**

* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);

/*! =======================================================
                      VERSION  9.8.1              
========================================================= */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * bootstrap-slider is released under the MIT License
 * Copyright (c) 2017 Kyle Kemp, Rohit Kalkur, and contributors
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * ========================================================= */

/**
 * Bridget makes jQuery widgets
 * v1.0.1
 * MIT license
 */
var windowIsDefined = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
        var jQuery;
        try {
            jQuery = require("jquery");
        } catch (err) {
            jQuery = null;
        }
        module.exports = factory(jQuery);
    } else if (window) {
        window.Slider = factory(window.jQuery);
    }
})(function ($) {
    // Constants
    var NAMESPACE_MAIN = 'slider';
    var NAMESPACE_ALTERNATE = 'bootstrapSlider';

    // Polyfill console methods
    if (windowIsDefined && !window.console) {
        window.console = {};
    }
    if (windowIsDefined && !window.console.log) {
        window.console.log = function () { };
    }
    if (windowIsDefined && !window.console.warn) {
        window.console.warn = function () { };
    }

    // Reference to Slider constructor
    var Slider;

    (function ($) {

        'use strict';

        // -------------------------- utils -------------------------- //

        var slice = Array.prototype.slice;

        function noop() { }

        // -------------------------- definition -------------------------- //

        function defineBridget($) {

            // bail if no jQuery
            if (!$) {
                return;
            }

            // -------------------------- addOptionMethod -------------------------- //

			/**
    * adds option method -> $().plugin('option', {...})
    * @param {Function} PluginClass - constructor class
    */
            function addOptionMethod(PluginClass) {
                // don't overwrite original option method
                if (PluginClass.prototype.option) {
                    return;
                }

                // option setter
                PluginClass.prototype.option = function (opts) {
                    // bail out if not an object
                    if (!$.isPlainObject(opts)) {
                        return;
                    }
                    this.options = $.extend(true, this.options, opts);
                };
            }

            // -------------------------- plugin bridge -------------------------- //

            // helper function for logging errors
            // $.error breaks jQuery chaining
            var logError = typeof console === 'undefined' ? noop : function (message) {
                console.error(message);
            };

			/**
    * jQuery plugin bridge, access methods like $elem.plugin('method')
    * @param {String} namespace - plugin name
    * @param {Function} PluginClass - constructor class
    */
            function bridge(namespace, PluginClass) {
                // add to jQuery fn namespace
                $.fn[namespace] = function (options) {
                    if (typeof options === 'string') {
                        // call plugin method when first argument is a string
                        // get arguments for method
                        var args = slice.call(arguments, 1);

                        for (var i = 0, len = this.length; i < len; i++) {
                            var elem = this[i];
                            var instance = $.data(elem, namespace);
                            if (!instance) {
                                logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
                                continue;
                            }
                            if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                                logError("no such method '" + options + "' for " + namespace + " instance");
                                continue;
                            }

                            // trigger method with arguments
                            var returnValue = instance[options].apply(instance, args);

                            // break look and return first value if provided
                            if (returnValue !== undefined && returnValue !== instance) {
                                return returnValue;
                            }
                        }
                        // return this if no return value
                        return this;
                    } else {
                        var objects = this.map(function () {
                            var instance = $.data(this, namespace);
                            if (instance) {
                                // apply options & init
                                instance.option(options);
                                instance._init();
                            } else {
                                // initialize new instance
                                instance = new PluginClass(this, options);
                                $.data(this, namespace, instance);
                            }
                            return $(this);
                        });

                        if (!objects || objects.length > 1) {
                            return objects;
                        } else {
                            return objects[0];
                        }
                    }
                };
            }

            // -------------------------- bridget -------------------------- //

			/**
    * converts a Prototypical class into a proper jQuery plugin
    *   the class must have a ._init method
    * @param {String} namespace - plugin name, used in $().pluginName
    * @param {Function} PluginClass - constructor class
    */
            $.bridget = function (namespace, PluginClass) {
                addOptionMethod(PluginClass);
                bridge(namespace, PluginClass);
            };

            return $.bridget;
        }

        // get jquery from browser global
        defineBridget($);
    })($);

	/*************************************************
 			BOOTSTRAP-SLIDER SOURCE CODE
 	**************************************************/

    (function ($) {

        var ErrorMsgs = {
            formatInvalidInputErrorMsg: function formatInvalidInputErrorMsg(input) {
                return "Invalid input value '" + input + "' passed in";
            },
            callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
        };

        var SliderScale = {
            linear: {
                toValue: function toValue(percentage) {
                    var rawValue = percentage / 100 * (this.options.max - this.options.min);
                    var shouldAdjustWithBase = true;
                    if (this.options.ticks_positions.length > 0) {
                        var minv,
                            maxv,
                            minp,
                            maxp = 0;
                        for (var i = 1; i < this.options.ticks_positions.length; i++) {
                            if (percentage <= this.options.ticks_positions[i]) {
                                minv = this.options.ticks[i - 1];
                                minp = this.options.ticks_positions[i - 1];
                                maxv = this.options.ticks[i];
                                maxp = this.options.ticks_positions[i];

                                break;
                            }
                        }
                        var partialPercentage = (percentage - minp) / (maxp - minp);
                        rawValue = minv + partialPercentage * (maxv - minv);
                        shouldAdjustWithBase = false;
                    }

                    var adjustment = shouldAdjustWithBase ? this.options.min : 0;
                    var value = adjustment + Math.round(rawValue / this.options.step) * this.options.step;
                    if (value < this.options.min) {
                        return this.options.min;
                    } else if (value > this.options.max) {
                        return this.options.max;
                    } else {
                        return value;
                    }
                },
                toPercentage: function toPercentage(value) {
                    if (this.options.max === this.options.min) {
                        return 0;
                    }

                    if (this.options.ticks_positions.length > 0) {
                        var minv,
                            maxv,
                            minp,
                            maxp = 0;
                        for (var i = 0; i < this.options.ticks.length; i++) {
                            if (value <= this.options.ticks[i]) {
                                minv = i > 0 ? this.options.ticks[i - 1] : 0;
                                minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
                                maxv = this.options.ticks[i];
                                maxp = this.options.ticks_positions[i];

                                break;
                            }
                        }
                        if (i > 0) {
                            var partialPercentage = (value - minv) / (maxv - minv);
                            return minp + partialPercentage * (maxp - minp);
                        }
                    }

                    return 100 * (value - this.options.min) / (this.options.max - this.options.min);
                }
            },

            logarithmic: {
                /* Based on http://stackoverflow.com/questions/846221/logarithmic-slider */
                toValue: function toValue(percentage) {
                    var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
                    var max = Math.log(this.options.max);
                    var value = Math.exp(min + (max - min) * percentage / 100);
                    if (Math.round(value) === this.options.max) {
                        return this.options.max;
                    }
                    value = this.options.min + Math.round((value - this.options.min) / this.options.step) * this.options.step;
					/* Rounding to the nearest step could exceed the min or
      * max, so clip to those values. */
                    if (value < this.options.min) {
                        return this.options.min;
                    } else if (value > this.options.max) {
                        return this.options.max;
                    } else {
                        return value;
                    }
                },
                toPercentage: function toPercentage(value) {
                    if (this.options.max === this.options.min) {
                        return 0;
                    } else {
                        var max = Math.log(this.options.max);
                        var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
                        var v = value === 0 ? 0 : Math.log(value);
                        return 100 * (v - min) / (max - min);
                    }
                }
            }
        };

		/*************************************************
  						CONSTRUCTOR
  	**************************************************/
        Slider = function Slider(element, options) {
            createNewSlider.call(this, element, options);
            return this;
        };

        function createNewSlider(element, options) {

			/*
   	The internal state object is used to store data about the current 'state' of slider.
   	This includes values such as the `value`, `enabled`, etc...
   */
            this._state = {
                value: null,
                enabled: null,
                offset: null,
                size: null,
                percentage: null,
                inDrag: false,
                over: false
            };

            // The objects used to store the reference to the tick methods if ticks_tooltip is on
            this.ticksCallbackMap = {};
            this.handleCallbackMap = {};

            if (typeof element === "string") {
                this.element = document.querySelector(element);
            } else if (element instanceof HTMLElement) {
                this.element = element;
            }

			/*************************************************
   					Process Options
   	**************************************************/
            options = options ? options : {};
            var optionTypes = Object.keys(this.defaultOptions);

            for (var i = 0; i < optionTypes.length; i++) {
                var optName = optionTypes[i];

                // First check if an option was passed in via the constructor
                var val = options[optName];
                // If no data attrib, then check data atrributes
                val = typeof val !== 'undefined' ? val : getDataAttrib(this.element, optName);
                // Finally, if nothing was specified, use the defaults
                val = val !== null ? val : this.defaultOptions[optName];

                // Set all options on the instance of the Slider
                if (!this.options) {
                    this.options = {};
                }
                this.options[optName] = val;
            }

            // Check options.rtl
            if (this.options.rtl === 'auto') {
                this.options.rtl = window.getComputedStyle(this.element).direction === 'rtl';
            }

			/*
   	Validate `tooltip_position` against 'orientation`
   	- if `tooltip_position` is incompatible with orientation, swith it to a default compatible with specified `orientation`
   		-- default for "vertical" -> "right", "left" if rtl
   		-- default for "horizontal" -> "top"
   */
            if (this.options.orientation === "vertical" && (this.options.tooltip_position === "top" || this.options.tooltip_position === "bottom")) {
                if (this.options.rtl) {
                    this.options.tooltip_position = "left";
                } else {
                    this.options.tooltip_position = "right";
                }
            } else if (this.options.orientation === "horizontal" && (this.options.tooltip_position === "left" || this.options.tooltip_position === "right")) {

                this.options.tooltip_position = "top";
            }

            function getDataAttrib(element, optName) {
                var dataName = "data-slider-" + optName.replace(/_/g, '-');
                var dataValString = element.getAttribute(dataName);

                try {
                    return JSON.parse(dataValString);
                } catch (err) {
                    return dataValString;
                }
            }

			/*************************************************
   					Create Markup
   	**************************************************/

            var origWidth = this.element.style.width;
            var updateSlider = false;
            var parent = this.element.parentNode;
            var sliderTrackSelection;
            var sliderTrackLow, sliderTrackHigh;
            var sliderMinHandle;
            var sliderMaxHandle;

            if (this.sliderElem) {
                updateSlider = true;
            } else {
                /* Create elements needed for slider */
                this.sliderElem = document.createElement("div");
                this.sliderElem.className = "slider";

                /* Create slider track elements */
                var sliderTrack = document.createElement("div");
                sliderTrack.className = "slider-track";

                sliderTrackLow = document.createElement("div");
                sliderTrackLow.className = "slider-track-low";

                sliderTrackSelection = document.createElement("div");
                sliderTrackSelection.className = "slider-selection";

                sliderTrackHigh = document.createElement("div");
                sliderTrackHigh.className = "slider-track-high";

                sliderMinHandle = document.createElement("div");
                sliderMinHandle.className = "slider-handle min-slider-handle";
                sliderMinHandle.setAttribute('role', 'slider');
                sliderMinHandle.setAttribute('aria-valuemin', this.options.min);
                sliderMinHandle.setAttribute('aria-valuemax', this.options.max);

                sliderMaxHandle = document.createElement("div");
                sliderMaxHandle.className = "slider-handle max-slider-handle";
                sliderMaxHandle.setAttribute('role', 'slider');
                sliderMaxHandle.setAttribute('aria-valuemin', this.options.min);
                sliderMaxHandle.setAttribute('aria-valuemax', this.options.max);

                sliderTrack.appendChild(sliderTrackLow);
                sliderTrack.appendChild(sliderTrackSelection);
                sliderTrack.appendChild(sliderTrackHigh);

                /* Create highlight range elements */
                this.rangeHighlightElements = [];
                var rangeHighlightsOpts = this.options.rangeHighlights;
                if (Array.isArray(rangeHighlightsOpts) && rangeHighlightsOpts.length > 0) {
                    for (var j = 0; j < rangeHighlightsOpts.length; j++) {
                        var rangeHighlightElement = document.createElement("div");
                        var customClassString = rangeHighlightsOpts[j].class || "";
                        rangeHighlightElement.className = "slider-rangeHighlight slider-selection " + customClassString;
                        this.rangeHighlightElements.push(rangeHighlightElement);
                        sliderTrack.appendChild(rangeHighlightElement);
                    }
                }

                /* Add aria-labelledby to handle's */
                var isLabelledbyArray = Array.isArray(this.options.labelledby);
                if (isLabelledbyArray && this.options.labelledby[0]) {
                    sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby[0]);
                }
                if (isLabelledbyArray && this.options.labelledby[1]) {
                    sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby[1]);
                }
                if (!isLabelledbyArray && this.options.labelledby) {
                    sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby);
                    sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby);
                }

                /* Create ticks */
                this.ticks = [];
                if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                    this.ticksContainer = document.createElement('div');
                    this.ticksContainer.className = 'slider-tick-container';

                    for (i = 0; i < this.options.ticks.length; i++) {
                        var tick = document.createElement('div');
                        tick.className = 'slider-tick';
                        if (this.options.ticks_tooltip) {
                            var tickListenerReference = this._addTickListener();
                            var enterCallback = tickListenerReference.addMouseEnter(this, tick, i);
                            var leaveCallback = tickListenerReference.addMouseLeave(this, tick);

                            this.ticksCallbackMap[i] = {
                                mouseEnter: enterCallback,
                                mouseLeave: leaveCallback
                            };
                        }
                        this.ticks.push(tick);
                        this.ticksContainer.appendChild(tick);
                    }

                    sliderTrackSelection.className += " tick-slider-selection";
                }

                this.tickLabels = [];
                if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
                    this.tickLabelContainer = document.createElement('div');
                    this.tickLabelContainer.className = 'slider-tick-label-container';

                    for (i = 0; i < this.options.ticks_labels.length; i++) {
                        var label = document.createElement('div');
                        var noTickPositionsSpecified = this.options.ticks_positions.length === 0;
                        var tickLabelsIndex = this.options.reversed && noTickPositionsSpecified ? this.options.ticks_labels.length - (i + 1) : i;
                        label.className = 'slider-tick-label';
                        label.innerHTML = this.options.ticks_labels[tickLabelsIndex];

                        this.tickLabels.push(label);
                        this.tickLabelContainer.appendChild(label);
                    }
                }

                var createAndAppendTooltipSubElements = function createAndAppendTooltipSubElements(tooltipElem) {
                    var arrow = document.createElement("div");
                    arrow.className = "tooltip-arrow";

                    var inner = document.createElement("div");
                    inner.className = "tooltip-inner";

                    tooltipElem.appendChild(arrow);
                    tooltipElem.appendChild(inner);
                };

                /* Create tooltip elements */
                var sliderTooltip = document.createElement("div");
                sliderTooltip.className = "tooltip tooltip-main";
                sliderTooltip.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltip);

                var sliderTooltipMin = document.createElement("div");
                sliderTooltipMin.className = "tooltip tooltip-min";
                sliderTooltipMin.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltipMin);

                var sliderTooltipMax = document.createElement("div");
                sliderTooltipMax.className = "tooltip tooltip-max";
                sliderTooltipMax.setAttribute('role', 'presentation');
                createAndAppendTooltipSubElements(sliderTooltipMax);

                /* Append components to sliderElem */
                this.sliderElem.appendChild(sliderTrack);
                this.sliderElem.appendChild(sliderTooltip);
                this.sliderElem.appendChild(sliderTooltipMin);
                this.sliderElem.appendChild(sliderTooltipMax);

                if (this.tickLabelContainer) {
                    this.sliderElem.appendChild(this.tickLabelContainer);
                }
                if (this.ticksContainer) {
                    this.sliderElem.appendChild(this.ticksContainer);
                }

                this.sliderElem.appendChild(sliderMinHandle);
                this.sliderElem.appendChild(sliderMaxHandle);

                /* Append slider element to parent container, right before the original <input> element */
                parent.insertBefore(this.sliderElem, this.element);

                /* Hide original <input> element */
                this.element.style.display = "none";
            }
            /* If JQuery exists, cache JQ references */
            if ($) {
                this.$element = $(this.element);
                this.$sliderElem = $(this.sliderElem);
            }

			/*************************************************
   						Setup
   	**************************************************/
            this.eventToCallbackMap = {};
            this.sliderElem.id = this.options.id;

            this.touchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;

            this.touchX = 0;
            this.touchY = 0;

            this.tooltip = this.sliderElem.querySelector('.tooltip-main');
            this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');

            this.tooltip_min = this.sliderElem.querySelector('.tooltip-min');
            this.tooltipInner_min = this.tooltip_min.querySelector('.tooltip-inner');

            this.tooltip_max = this.sliderElem.querySelector('.tooltip-max');
            this.tooltipInner_max = this.tooltip_max.querySelector('.tooltip-inner');

            if (SliderScale[this.options.scale]) {
                this.options.scale = SliderScale[this.options.scale];
            }

            if (updateSlider === true) {
                // Reset classes
                this._removeClass(this.sliderElem, 'slider-horizontal');
                this._removeClass(this.sliderElem, 'slider-vertical');
                this._removeClass(this.sliderElem, 'slider-rtl');
                this._removeClass(this.tooltip, 'hide');
                this._removeClass(this.tooltip_min, 'hide');
                this._removeClass(this.tooltip_max, 'hide');

                // Undo existing inline styles for track
                ["left", "right", "top", "width", "height"].forEach(function (prop) {
                    this._removeProperty(this.trackLow, prop);
                    this._removeProperty(this.trackSelection, prop);
                    this._removeProperty(this.trackHigh, prop);
                }, this);

                // Undo inline styles on handles
                [this.handle1, this.handle2].forEach(function (handle) {
                    this._removeProperty(handle, 'left');
                    this._removeProperty(handle, 'right');
                    this._removeProperty(handle, 'top');
                }, this);

                // Undo inline styles and classes on tooltips
                [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (tooltip) {
                    this._removeProperty(tooltip, 'left');
                    this._removeProperty(tooltip, 'right');
                    this._removeProperty(tooltip, 'top');
                    this._removeProperty(tooltip, 'margin-left');
                    this._removeProperty(tooltip, 'margin-right');
                    this._removeProperty(tooltip, 'margin-top');

                    this._removeClass(tooltip, 'right');
                    this._removeClass(tooltip, 'left');
                    this._removeClass(tooltip, 'top');
                }, this);
            }

            if (this.options.orientation === 'vertical') {
                this._addClass(this.sliderElem, 'slider-vertical');
                this.stylePos = 'top';
                this.mousePos = 'pageY';
                this.sizePos = 'offsetHeight';
            } else {
                this._addClass(this.sliderElem, 'slider-horizontal');
                this.sliderElem.style.width = origWidth;
                this.options.orientation = 'horizontal';
                if (this.options.rtl) {
                    this.stylePos = 'right';
                } else {
                    this.stylePos = 'left';
                }
                this.mousePos = 'pageX';
                this.sizePos = 'offsetWidth';
            }
            // specific rtl class
            if (this.options.rtl) {
                this._addClass(this.sliderElem, 'slider-rtl');
            }
            this._setTooltipPosition();
            /* In case ticks are specified, overwrite the min and max bounds */
            if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                this.options.max = Math.max.apply(Math, this.options.ticks);
                this.options.min = Math.min.apply(Math, this.options.ticks);
            }

            if (Array.isArray(this.options.value)) {
                this.options.range = true;
                this._state.value = this.options.value;
            } else if (this.options.range) {
                // User wants a range, but value is not an array
                this._state.value = [this.options.value, this.options.max];
            } else {
                this._state.value = this.options.value;
            }

            this.trackLow = sliderTrackLow || this.trackLow;
            this.trackSelection = sliderTrackSelection || this.trackSelection;
            this.trackHigh = sliderTrackHigh || this.trackHigh;

            if (this.options.selection === 'none') {
                this._addClass(this.trackLow, 'hide');
                this._addClass(this.trackSelection, 'hide');
                this._addClass(this.trackHigh, 'hide');
            } else if (this.options.selection === 'after' || this.options.selection === 'before') {
                this._removeClass(this.trackLow, 'hide');
                this._removeClass(this.trackSelection, 'hide');
                this._removeClass(this.trackHigh, 'hide');
            }

            this.handle1 = sliderMinHandle || this.handle1;
            this.handle2 = sliderMaxHandle || this.handle2;

            if (updateSlider === true) {
                // Reset classes
                this._removeClass(this.handle1, 'round triangle');
                this._removeClass(this.handle2, 'round triangle hide');

                for (i = 0; i < this.ticks.length; i++) {
                    this._removeClass(this.ticks[i], 'round triangle hide');
                }
            }

            var availableHandleModifiers = ['round', 'triangle', 'custom'];
            var isValidHandleType = availableHandleModifiers.indexOf(this.options.handle) !== -1;
            if (isValidHandleType) {
                this._addClass(this.handle1, this.options.handle);
                this._addClass(this.handle2, this.options.handle);

                for (i = 0; i < this.ticks.length; i++) {
                    this._addClass(this.ticks[i], this.options.handle);
                }
            }

            this._state.offset = this._offset(this.sliderElem);
            this._state.size = this.sliderElem[this.sizePos];
            this.setValue(this._state.value);

			/******************************************
   				Bind Event Listeners
   	******************************************/

            // Bind keyboard handlers
            this.handle1Keydown = this._keydown.bind(this, 0);
            this.handle1.addEventListener("keydown", this.handle1Keydown, false);

            this.handle2Keydown = this._keydown.bind(this, 1);
            this.handle2.addEventListener("keydown", this.handle2Keydown, false);

            this.mousedown = this._mousedown.bind(this);
            this.touchstart = this._touchstart.bind(this);
            this.touchmove = this._touchmove.bind(this);

            if (this.touchCapable) {
                // Test for passive event support
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function get() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener("test", null, opts);
                } catch (e) { }
                // Use our detect's results. passive applied if supported, capture will be false either way.
                var eventOptions = supportsPassive ? { passive: true } : false;
                // Bind touch handlers
                this.sliderElem.addEventListener("touchstart", this.touchstart, eventOptions);
                this.sliderElem.addEventListener("touchmove", this.touchmove, eventOptions);
            }
            this.sliderElem.addEventListener("mousedown", this.mousedown, false);

            // Bind window handlers
            this.resize = this._resize.bind(this);
            window.addEventListener("resize", this.resize, false);

            // Bind tooltip-related handlers
            if (this.options.tooltip === 'hide') {
                this._addClass(this.tooltip, 'hide');
                this._addClass(this.tooltip_min, 'hide');
                this._addClass(this.tooltip_max, 'hide');
            } else if (this.options.tooltip === 'always') {
                this._showTooltip();
                this._alwaysShowTooltip = true;
            } else {
                this.showTooltip = this._showTooltip.bind(this);
                this.hideTooltip = this._hideTooltip.bind(this);

                if (this.options.ticks_tooltip) {
                    var callbackHandle = this._addTickListener();
                    //create handle1 listeners and store references in map
                    var mouseEnter = callbackHandle.addMouseEnter(this, this.handle1);
                    var mouseLeave = callbackHandle.addMouseLeave(this, this.handle1);
                    this.handleCallbackMap.handle1 = {
                        mouseEnter: mouseEnter,
                        mouseLeave: mouseLeave
                    };
                    //create handle2 listeners and store references in map
                    mouseEnter = callbackHandle.addMouseEnter(this, this.handle2);
                    mouseLeave = callbackHandle.addMouseLeave(this, this.handle2);
                    this.handleCallbackMap.handle2 = {
                        mouseEnter: mouseEnter,
                        mouseLeave: mouseLeave
                    };
                } else {
                    this.sliderElem.addEventListener("mouseenter", this.showTooltip, false);
                    this.sliderElem.addEventListener("mouseleave", this.hideTooltip, false);
                }

                this.handle1.addEventListener("focus", this.showTooltip, false);
                this.handle1.addEventListener("blur", this.hideTooltip, false);

                this.handle2.addEventListener("focus", this.showTooltip, false);
                this.handle2.addEventListener("blur", this.hideTooltip, false);
            }

            if (this.options.enabled) {
                this.enable();
            } else {
                this.disable();
            }
        }

		/*************************************************
  				INSTANCE PROPERTIES/METHODS
  	- Any methods bound to the prototype are considered
  part of the plugin's `public` interface
  	**************************************************/
        Slider.prototype = {
            _init: function _init() { }, // NOTE: Must exist to support bridget

            constructor: Slider,

            defaultOptions: {
                id: "",
                min: 0,
                max: 10,
                step: 1,
                precision: 0,
                orientation: 'horizontal',
                value: 5,
                range: false,
                selection: 'before',
                tooltip: 'show',
                tooltip_split: false,
                handle: 'round',
                reversed: false,
                rtl: 'auto',
                enabled: true,
                formatter: function formatter(val) {
                    if (Array.isArray(val)) {
                        return val[0] + " : " + val[1];
                    } else {
                        return val;
                    }
                },
                natural_arrow_keys: false,
                ticks: [],
                ticks_positions: [],
                ticks_labels: [],
                ticks_snap_bounds: 0,
                ticks_tooltip: false,
                scale: 'linear',
                focus: false,
                tooltip_position: null,
                labelledby: null,
                rangeHighlights: []
            },

            getElement: function getElement() {
                return this.sliderElem;
            },

            getValue: function getValue() {
                if (this.options.range) {
                    return this._state.value;
                } else {
                    return this._state.value[0];
                }
            },

            setValue: function setValue(val, triggerSlideEvent, triggerChangeEvent) {
                if (!val) {
                    val = 0;
                }
                var oldValue = this.getValue();
                this._state.value = this._validateInputValue(val);
                var applyPrecision = this._applyPrecision.bind(this);

                if (this.options.range) {
                    this._state.value[0] = applyPrecision(this._state.value[0]);
                    this._state.value[1] = applyPrecision(this._state.value[1]);

                    this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0]));
                    this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]));
                } else {
                    this._state.value = applyPrecision(this._state.value);
                    this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))];
                    this._addClass(this.handle2, 'hide');
                    if (this.options.selection === 'after') {
                        this._state.value[1] = this.options.max;
                    } else {
                        this._state.value[1] = this.options.min;
                    }
                }

                if (this.options.max > this.options.min) {
                    this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), this.options.step * 100 / (this.options.max - this.options.min)];
                } else {
                    this._state.percentage = [0, 0, 100];
                }

                this._layout();
                var newValue = this.options.range ? this._state.value : this._state.value[0];

                this._setDataVal(newValue);
                if (triggerSlideEvent === true) {
                    this._trigger('slide', newValue);
                }
                if (oldValue !== newValue && triggerChangeEvent === true) {
                    this._trigger('change', {
                        oldValue: oldValue,
                        newValue: newValue
                    });
                }

                return this;
            },

            destroy: function destroy() {
                // Remove event handlers on slider elements
                this._removeSliderEventHandlers();

                // Remove the slider from the DOM
                this.sliderElem.parentNode.removeChild(this.sliderElem);
                /* Show original <input> element */
                this.element.style.display = "";

                // Clear out custom event bindings
                this._cleanUpEventCallbacksMap();

                // Remove data values
                this.element.removeAttribute("data");

                // Remove JQuery handlers/data
                if ($) {
                    this._unbindJQueryEventHandlers();
                    this.$element.removeData('slider');
                }
            },

            disable: function disable() {
                this._state.enabled = false;
                this.handle1.removeAttribute("tabindex");
                this.handle2.removeAttribute("tabindex");
                this._addClass(this.sliderElem, 'slider-disabled');
                this._trigger('slideDisabled');

                return this;
            },

            enable: function enable() {
                this._state.enabled = true;
                this.handle1.setAttribute("tabindex", 0);
                this.handle2.setAttribute("tabindex", 0);
                this._removeClass(this.sliderElem, 'slider-disabled');
                this._trigger('slideEnabled');

                return this;
            },

            toggle: function toggle() {
                if (this._state.enabled) {
                    this.disable();
                } else {
                    this.enable();
                }
                return this;
            },

            isEnabled: function isEnabled() {
                return this._state.enabled;
            },

            on: function on(evt, callback) {
                this._bindNonQueryEventHandler(evt, callback);
                return this;
            },

            off: function off(evt, callback) {
                if ($) {
                    this.$element.off(evt, callback);
                    this.$sliderElem.off(evt, callback);
                } else {
                    this._unbindNonQueryEventHandler(evt, callback);
                }
            },

            getAttribute: function getAttribute(attribute) {
                if (attribute) {
                    return this.options[attribute];
                } else {
                    return this.options;
                }
            },

            setAttribute: function setAttribute(attribute, value) {
                this.options[attribute] = value;
                return this;
            },

            refresh: function refresh() {
                this._removeSliderEventHandlers();
                createNewSlider.call(this, this.element, this.options);
                if ($) {
                    // Bind new instance of slider to the element
                    $.data(this.element, 'slider', this);
                }
                return this;
            },

            relayout: function relayout() {
                this._resize();
                this._layout();
                return this;
            },

			/******************************+
   				HELPERS
   	- Any method that is not part of the public interface.
   - Place it underneath this comment block and write its signature like so:
   		_fnName : function() {...}
   	********************************/
            _removeSliderEventHandlers: function _removeSliderEventHandlers() {
                // Remove keydown event listeners
                this.handle1.removeEventListener("keydown", this.handle1Keydown, false);
                this.handle2.removeEventListener("keydown", this.handle2Keydown, false);

                //remove the listeners from the ticks and handles if they had their own listeners
                if (this.options.ticks_tooltip) {
                    var ticks = this.ticksContainer.getElementsByClassName('slider-tick');
                    for (var i = 0; i < ticks.length; i++) {
                        ticks[i].removeEventListener('mouseenter', this.ticksCallbackMap[i].mouseEnter, false);
                        ticks[i].removeEventListener('mouseleave', this.ticksCallbackMap[i].mouseLeave, false);
                    }
                    this.handle1.removeEventListener('mouseenter', this.handleCallbackMap.handle1.mouseEnter, false);
                    this.handle2.removeEventListener('mouseenter', this.handleCallbackMap.handle2.mouseEnter, false);
                    this.handle1.removeEventListener('mouseleave', this.handleCallbackMap.handle1.mouseLeave, false);
                    this.handle2.removeEventListener('mouseleave', this.handleCallbackMap.handle2.mouseLeave, false);
                }

                this.handleCallbackMap = null;
                this.ticksCallbackMap = null;

                if (this.showTooltip) {
                    this.handle1.removeEventListener("focus", this.showTooltip, false);
                    this.handle2.removeEventListener("focus", this.showTooltip, false);
                }
                if (this.hideTooltip) {
                    this.handle1.removeEventListener("blur", this.hideTooltip, false);
                    this.handle2.removeEventListener("blur", this.hideTooltip, false);
                }

                // Remove event listeners from sliderElem
                if (this.showTooltip) {
                    this.sliderElem.removeEventListener("mouseenter", this.showTooltip, false);
                }
                if (this.hideTooltip) {
                    this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, false);
                }
                this.sliderElem.removeEventListener("touchstart", this.touchstart, false);
                this.sliderElem.removeEventListener("touchmove", this.touchmove, false);
                this.sliderElem.removeEventListener("mousedown", this.mousedown, false);

                // Remove window event listener
                window.removeEventListener("resize", this.resize, false);
            },
            _bindNonQueryEventHandler: function _bindNonQueryEventHandler(evt, callback) {
                if (this.eventToCallbackMap[evt] === undefined) {
                    this.eventToCallbackMap[evt] = [];
                }
                this.eventToCallbackMap[evt].push(callback);
            },
            _unbindNonQueryEventHandler: function _unbindNonQueryEventHandler(evt, callback) {
                var callbacks = this.eventToCallbackMap[evt];
                if (callbacks !== undefined) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i] === callback) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                }
            },
            _cleanUpEventCallbacksMap: function _cleanUpEventCallbacksMap() {
                var eventNames = Object.keys(this.eventToCallbackMap);
                for (var i = 0; i < eventNames.length; i++) {
                    var eventName = eventNames[i];
                    delete this.eventToCallbackMap[eventName];
                }
            },
            _showTooltip: function _showTooltip() {
                if (this.options.tooltip_split === false) {
                    this._addClass(this.tooltip, 'in');
                    this.tooltip_min.style.display = 'none';
                    this.tooltip_max.style.display = 'none';
                } else {
                    this._addClass(this.tooltip_min, 'in');
                    this._addClass(this.tooltip_max, 'in');
                    this.tooltip.style.display = 'none';
                }
                this._state.over = true;
            },
            _hideTooltip: function _hideTooltip() {
                if (this._state.inDrag === false && this.alwaysShowTooltip !== true) {
                    this._removeClass(this.tooltip, 'in');
                    this._removeClass(this.tooltip_min, 'in');
                    this._removeClass(this.tooltip_max, 'in');
                }
                this._state.over = false;
            },
            _setToolTipOnMouseOver: function _setToolTipOnMouseOver(tempState) {
                var formattedTooltipVal = this.options.formatter(!tempState ? this._state.value[0] : tempState.value[0]);
                var positionPercentages = !tempState ? getPositionPercentages(this._state, this.options.reversed) : getPositionPercentages(tempState, this.options.reversed);
                this._setText(this.tooltipInner, formattedTooltipVal);

                this.tooltip.style[this.stylePos] = positionPercentages[0] + "%";
                if (this.options.orientation === 'vertical') {
                    this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px");
                } else {
                    this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px");
                }

                function getPositionPercentages(state, reversed) {
                    if (reversed) {
                        return [100 - state.percentage[0], this.options.range ? 100 - state.percentage[1] : state.percentage[1]];
                    }
                    return [state.percentage[0], state.percentage[1]];
                }
            },
            _addTickListener: function _addTickListener() {
                return {
                    addMouseEnter: function addMouseEnter(reference, tick, index) {
                        var enter = function enter() {
                            var tempState = reference._state;
                            var idString = index >= 0 ? index : this.attributes['aria-valuenow'].value;
                            var hoverIndex = parseInt(idString, 10);
                            tempState.value[0] = hoverIndex;
                            tempState.percentage[0] = reference.options.ticks_positions[hoverIndex];
                            reference._setToolTipOnMouseOver(tempState);
                            reference._showTooltip();
                        };
                        tick.addEventListener("mouseenter", enter, false);
                        return enter;
                    },
                    addMouseLeave: function addMouseLeave(reference, tick) {
                        var leave = function leave() {
                            reference._hideTooltip();
                        };
                        tick.addEventListener("mouseleave", leave, false);
                        return leave;
                    }
                };
            },
            _layout: function _layout() {
                var positionPercentages;

                if (this.options.reversed) {
                    positionPercentages = [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]];
                } else {
                    positionPercentages = [this._state.percentage[0], this._state.percentage[1]];
                }

                this.handle1.style[this.stylePos] = positionPercentages[0] + "%";
                this.handle1.setAttribute('aria-valuenow', this._state.value[0]);
                if (isNaN(this.options.formatter(this._state.value[0]))) {
                    this.handle1.setAttribute('aria-valuetext', this.options.formatter(this._state.value[0]));
                }

                this.handle2.style[this.stylePos] = positionPercentages[1] + "%";
                this.handle2.setAttribute('aria-valuenow', this._state.value[1]);
                if (isNaN(this.options.formatter(this._state.value[1]))) {
                    this.handle2.setAttribute('aria-valuetext', this.options.formatter(this._state.value[1]));
                }

                /* Position highlight range elements */
                if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
                    for (var _i = 0; _i < this.options.rangeHighlights.length; _i++) {
                        var startPercent = this._toPercentage(this.options.rangeHighlights[_i].start);
                        var endPercent = this._toPercentage(this.options.rangeHighlights[_i].end);

                        if (this.options.reversed) {
                            var sp = 100 - endPercent;
                            endPercent = 100 - startPercent;
                            startPercent = sp;
                        }

                        var currentRange = this._createHighlightRange(startPercent, endPercent);

                        if (currentRange) {
                            if (this.options.orientation === 'vertical') {
                                this.rangeHighlightElements[_i].style.top = currentRange.start + "%";
                                this.rangeHighlightElements[_i].style.height = currentRange.size + "%";
                            } else {
                                if (this.options.rtl) {
                                    this.rangeHighlightElements[_i].style.right = currentRange.start + "%";
                                } else {
                                    this.rangeHighlightElements[_i].style.left = currentRange.start + "%";
                                }
                                this.rangeHighlightElements[_i].style.width = currentRange.size + "%";
                            }
                        } else {
                            this.rangeHighlightElements[_i].style.display = "none";
                        }
                    }
                }

                /* Position ticks and labels */
                if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {

                    var styleSize = this.options.orientation === 'vertical' ? 'height' : 'width';
                    var styleMargin;
                    if (this.options.orientation === 'vertical') {
                        styleMargin = 'marginTop';
                    } else {
                        if (this.options.rtl) {
                            styleMargin = 'marginRight';
                        } else {
                            styleMargin = 'marginLeft';
                        }
                    }
                    var labelSize = this._state.size / (this.options.ticks.length - 1);

                    if (this.tickLabelContainer) {
                        var extraMargin = 0;
                        if (this.options.ticks_positions.length === 0) {
                            if (this.options.orientation !== 'vertical') {
                                this.tickLabelContainer.style[styleMargin] = -labelSize / 2 + "px";
                            }

                            extraMargin = this.tickLabelContainer.offsetHeight;
                        } else {
                            /* Chidren are position absolute, calculate height by finding the max offsetHeight of a child */
                            for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
                                if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
                                    extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
                                }
                            }
                        }
                        if (this.options.orientation === 'horizontal') {
                            this.sliderElem.style.marginBottom = extraMargin + "px";
                        }
                    }
                    for (var i = 0; i < this.options.ticks.length; i++) {

                        var percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);

                        if (this.options.reversed) {
                            percentage = 100 - percentage;
                        }

                        this.ticks[i].style[this.stylePos] = percentage + "%";

                        /* Set class labels to denote whether ticks are in the selection */
                        this._removeClass(this.ticks[i], 'in-selection');
                        if (!this.options.range) {
                            if (this.options.selection === 'after' && percentage >= positionPercentages[0]) {
                                this._addClass(this.ticks[i], 'in-selection');
                            } else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
                                this._addClass(this.ticks[i], 'in-selection');
                            }
                        } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
                            this._addClass(this.ticks[i], 'in-selection');
                        }

                        if (this.tickLabels[i]) {
                            this.tickLabels[i].style[styleSize] = labelSize + "px";

                            if (this.options.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
                                this.tickLabels[i].style.position = 'absolute';
                                this.tickLabels[i].style[this.stylePos] = percentage + "%";
                                this.tickLabels[i].style[styleMargin] = -labelSize / 2 + 'px';
                            } else if (this.options.orientation === 'vertical') {
                                if (this.options.rtl) {
                                    this.tickLabels[i].style['marginRight'] = this.sliderElem.offsetWidth + "px";
                                } else {
                                    this.tickLabels[i].style['marginLeft'] = this.sliderElem.offsetWidth + "px";
                                }
                                this.tickLabelContainer.style[styleMargin] = this.sliderElem.offsetWidth / 2 * -1 + 'px';
                            }
                        }
                    }
                }

                var formattedTooltipVal;

                if (this.options.range) {
                    formattedTooltipVal = this.options.formatter(this._state.value);
                    this._setText(this.tooltipInner, formattedTooltipVal);
                    this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + "%";

                    if (this.options.orientation === 'vertical') {
                        this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px");
                    } else {
                        this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px");
                    }

                    var innerTooltipMinText = this.options.formatter(this._state.value[0]);
                    this._setText(this.tooltipInner_min, innerTooltipMinText);

                    var innerTooltipMaxText = this.options.formatter(this._state.value[1]);
                    this._setText(this.tooltipInner_max, innerTooltipMaxText);

                    this.tooltip_min.style[this.stylePos] = positionPercentages[0] + "%";

                    if (this.options.orientation === 'vertical') {
                        this._css(this.tooltip_min, "margin-" + this.stylePos, -this.tooltip_min.offsetHeight / 2 + "px");
                    } else {
                        this._css(this.tooltip_min, "margin-" + this.stylePos, -this.tooltip_min.offsetWidth / 2 + "px");
                    }

                    this.tooltip_max.style[this.stylePos] = positionPercentages[1] + "%";

                    if (this.options.orientation === 'vertical') {
                        this._css(this.tooltip_max, "margin-" + this.stylePos, -this.tooltip_max.offsetHeight / 2 + "px");
                    } else {
                        this._css(this.tooltip_max, "margin-" + this.stylePos, -this.tooltip_max.offsetWidth / 2 + "px");
                    }
                } else {
                    formattedTooltipVal = this.options.formatter(this._state.value[0]);
                    this._setText(this.tooltipInner, formattedTooltipVal);

                    this.tooltip.style[this.stylePos] = positionPercentages[0] + "%";
                    if (this.options.orientation === 'vertical') {
                        this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetHeight / 2 + "px");
                    } else {
                        this._css(this.tooltip, "margin-" + this.stylePos, -this.tooltip.offsetWidth / 2 + "px");
                    }
                }

                if (this.options.orientation === 'vertical') {
                    this.trackLow.style.top = '0';
                    this.trackLow.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

                    this.trackSelection.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    this.trackSelection.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    this.trackHigh.style.bottom = '0';
                    this.trackHigh.style.height = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
                } else {
                    if (this.stylePos === 'right') {
                        this.trackLow.style.right = '0';
                    } else {
                        this.trackLow.style.left = '0';
                    }
                    this.trackLow.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';

                    if (this.stylePos === 'right') {
                        this.trackSelection.style.right = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    } else {
                        this.trackSelection.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
                    }
                    this.trackSelection.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    if (this.stylePos === 'right') {
                        this.trackHigh.style.left = '0';
                    } else {
                        this.trackHigh.style.right = '0';
                    }
                    this.trackHigh.style.width = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';

                    var offset_min = this.tooltip_min.getBoundingClientRect();
                    var offset_max = this.tooltip_max.getBoundingClientRect();

                    if (this.options.tooltip_position === 'bottom') {
                        if (offset_min.right > offset_max.left) {
                            this._removeClass(this.tooltip_max, 'bottom');
                            this._addClass(this.tooltip_max, 'top');
                            this.tooltip_max.style.top = '';
                            this.tooltip_max.style.bottom = 22 + 'px';
                        } else {
                            this._removeClass(this.tooltip_max, 'top');
                            this._addClass(this.tooltip_max, 'bottom');
                            this.tooltip_max.style.top = this.tooltip_min.style.top;
                            this.tooltip_max.style.bottom = '';
                        }
                    } else {
                        if (offset_min.right > offset_max.left) {
                            this._removeClass(this.tooltip_max, 'top');
                            this._addClass(this.tooltip_max, 'bottom');
                            this.tooltip_max.style.top = 18 + 'px';
                        } else {
                            this._removeClass(this.tooltip_max, 'bottom');
                            this._addClass(this.tooltip_max, 'top');
                            this.tooltip_max.style.top = this.tooltip_min.style.top;
                        }
                    }
                }
            },
            _createHighlightRange: function _createHighlightRange(start, end) {
                if (this._isHighlightRange(start, end)) {
                    if (start > end) {
                        return { 'start': end, 'size': start - end };
                    }
                    return { 'start': start, 'size': end - start };
                }
                return null;
            },
            _isHighlightRange: function _isHighlightRange(start, end) {
                if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
                    return true;
                } else {
                    return false;
                }
            },
            _resize: function _resize(ev) {
                /*jshint unused:false*/
                this._state.offset = this._offset(this.sliderElem);
                this._state.size = this.sliderElem[this.sizePos];
                this._layout();
            },
            _removeProperty: function _removeProperty(element, prop) {
                if (element.style.removeProperty) {
                    element.style.removeProperty(prop);
                } else {
                    element.style.removeAttribute(prop);
                }
            },
            _mousedown: function _mousedown(ev) {
                if (!this._state.enabled) {
                    return false;
                }

                this._state.offset = this._offset(this.sliderElem);
                this._state.size = this.sliderElem[this.sizePos];

                var percentage = this._getPercentage(ev);

                if (this.options.range) {
                    var diff1 = Math.abs(this._state.percentage[0] - percentage);
                    var diff2 = Math.abs(this._state.percentage[1] - percentage);
                    this._state.dragged = diff1 < diff2 ? 0 : 1;
                    this._adjustPercentageForRangeSliders(percentage);
                } else {
                    this._state.dragged = 0;
                }

                this._state.percentage[this._state.dragged] = percentage;
                this._layout();

                if (this.touchCapable) {
                    document.removeEventListener("touchmove", this.mousemove, false);
                    document.removeEventListener("touchend", this.mouseup, false);
                }

                if (this.mousemove) {
                    document.removeEventListener("mousemove", this.mousemove, false);
                }
                if (this.mouseup) {
                    document.removeEventListener("mouseup", this.mouseup, false);
                }

                this.mousemove = this._mousemove.bind(this);
                this.mouseup = this._mouseup.bind(this);

                if (this.touchCapable) {
                    // Touch: Bind touch events:
                    document.addEventListener("touchmove", this.mousemove, false);
                    document.addEventListener("touchend", this.mouseup, false);
                }
                // Bind mouse events:
                document.addEventListener("mousemove", this.mousemove, false);
                document.addEventListener("mouseup", this.mouseup, false);

                this._state.inDrag = true;
                var newValue = this._calculateValue();

                this._trigger('slideStart', newValue);

                this._setDataVal(newValue);
                this.setValue(newValue, false, true);

                ev.returnValue = false;

                if (this.options.focus) {
                    this._triggerFocusOnHandle(this._state.dragged);
                }

                return true;
            },
            _touchstart: function _touchstart(ev) {
                if (ev.changedTouches === undefined) {
                    this._mousedown(ev);
                    return;
                }

                var touch = ev.changedTouches[0];
                this.touchX = touch.pageX;
                this.touchY = touch.pageY;
            },
            _triggerFocusOnHandle: function _triggerFocusOnHandle(handleIdx) {
                if (handleIdx === 0) {
                    this.handle1.focus();
                }
                if (handleIdx === 1) {
                    this.handle2.focus();
                }
            },
            _keydown: function _keydown(handleIdx, ev) {
                if (!this._state.enabled) {
                    return false;
                }

                var dir;
                switch (ev.keyCode) {
                    case 37: // left
                    case 40:
                        // down
                        dir = -1;
                        break;
                    case 39: // right
                    case 38:
                        // up
                        dir = 1;
                        break;
                }
                if (!dir) {
                    return;
                }

                // use natural arrow keys instead of from min to max
                if (this.options.natural_arrow_keys) {
                    var ifVerticalAndNotReversed = this.options.orientation === 'vertical' && !this.options.reversed;
                    var ifHorizontalAndReversed = this.options.orientation === 'horizontal' && this.options.reversed; // @todo control with rtl

                    if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
                        dir = -dir;
                    }
                }

                var val = this._state.value[handleIdx] + dir * this.options.step;
                var percentage = val / this.options.max * 100;
                this._state.keyCtrl = handleIdx;
                if (this.options.range) {
                    this._adjustPercentageForRangeSliders(percentage);
                    var val1 = !this._state.keyCtrl ? val : this._state.value[0];
                    var val2 = this._state.keyCtrl ? val : this._state.value[1];
                    val = [val1, val2];
                }

                this._trigger('slideStart', val);
                this._setDataVal(val);
                this.setValue(val, true, true);

                this._setDataVal(val);
                this._trigger('slideStop', val);
                this._layout();

                this._pauseEvent(ev);
                delete this._state.keyCtrl;

                return false;
            },
            _pauseEvent: function _pauseEvent(ev) {
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                }
                if (ev.preventDefault) {
                    ev.preventDefault();
                }
                ev.cancelBubble = true;
                ev.returnValue = false;
            },
            _mousemove: function _mousemove(ev) {
                if (!this._state.enabled) {
                    return false;
                }

                var percentage = this._getPercentage(ev);
                this._adjustPercentageForRangeSliders(percentage);
                this._state.percentage[this._state.dragged] = percentage;
                this._layout();

                var val = this._calculateValue(true);
                this.setValue(val, true, true);

                return false;
            },
            _touchmove: function _touchmove(ev) {
                if (ev.changedTouches === undefined) {
                    return;
                }

                var touch = ev.changedTouches[0];

                var xDiff = touch.pageX - this.touchX;
                var yDiff = touch.pageY - this.touchY;

                if (!this._state.inDrag) {
                    // Vertical Slider
                    if (this.options.orientation === 'vertical' && xDiff <= 5 && xDiff >= -5 && (yDiff >= 15 || yDiff <= -15)) {
                        this._mousedown(ev);
                    }
                    // Horizontal slider.
                    else if (yDiff <= 5 && yDiff >= -5 && (xDiff >= 15 || xDiff <= -15)) {
                        this._mousedown(ev);
                    }
                }
            },
            _adjustPercentageForRangeSliders: function _adjustPercentageForRangeSliders(percentage) {
                if (this.options.range) {
                    var precision = this._getNumDigitsAfterDecimalPlace(percentage);
                    precision = precision ? precision - 1 : 0;
                    var percentageWithAdjustedPrecision = this._applyToFixedAndParseFloat(percentage, precision);
                    if (this._state.dragged === 0 && this._applyToFixedAndParseFloat(this._state.percentage[1], precision) < percentageWithAdjustedPrecision) {
                        this._state.percentage[0] = this._state.percentage[1];
                        this._state.dragged = 1;
                    } else if (this._state.dragged === 1 && this._applyToFixedAndParseFloat(this._state.percentage[0], precision) > percentageWithAdjustedPrecision) {
                        this._state.percentage[1] = this._state.percentage[0];
                        this._state.dragged = 0;
                    } else if (this._state.keyCtrl === 0 && this._state.value[1] / this.options.max * 100 < percentage) {
                        this._state.percentage[0] = this._state.percentage[1];
                        this._state.keyCtrl = 1;
                        this.handle2.focus();
                    } else if (this._state.keyCtrl === 1 && this._state.value[0] / this.options.max * 100 > percentage) {
                        this._state.percentage[1] = this._state.percentage[0];
                        this._state.keyCtrl = 0;
                        this.handle1.focus();
                    }
                }
            },
            _mouseup: function _mouseup() {
                if (!this._state.enabled) {
                    return false;
                }
                if (this.touchCapable) {
                    // Touch: Unbind touch event handlers:
                    document.removeEventListener("touchmove", this.mousemove, false);
                    document.removeEventListener("touchend", this.mouseup, false);
                }
                // Unbind mouse event handlers:
                document.removeEventListener("mousemove", this.mousemove, false);
                document.removeEventListener("mouseup", this.mouseup, false);

                this._state.inDrag = false;
                if (this._state.over === false) {
                    this._hideTooltip();
                }
                var val = this._calculateValue(true);

                this._layout();
                this._setDataVal(val);
                this._trigger('slideStop', val);

                return false;
            },
            _calculateValue: function _calculateValue(snapToClosestTick) {
                var val;
                if (this.options.range) {
                    val = [this.options.min, this.options.max];
                    if (this._state.percentage[0] !== 0) {
                        val[0] = this._toValue(this._state.percentage[0]);
                        val[0] = this._applyPrecision(val[0]);
                    }
                    if (this._state.percentage[1] !== 100) {
                        val[1] = this._toValue(this._state.percentage[1]);
                        val[1] = this._applyPrecision(val[1]);
                    }
                } else {
                    val = this._toValue(this._state.percentage[0]);
                    val = parseFloat(val);
                    val = this._applyPrecision(val);
                }

                if (snapToClosestTick) {
                    var min = [val, Infinity];
                    for (var i = 0; i < this.options.ticks.length; i++) {
                        var diff = Math.abs(this.options.ticks[i] - val);
                        if (diff <= min[1]) {
                            min = [this.options.ticks[i], diff];
                        }
                    }
                    if (min[1] <= this.options.ticks_snap_bounds) {
                        return min[0];
                    }
                }

                return val;
            },
            _applyPrecision: function _applyPrecision(val) {
                var precision = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                return this._applyToFixedAndParseFloat(val, precision);
            },
            _getNumDigitsAfterDecimalPlace: function _getNumDigitsAfterDecimalPlace(num) {
                var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                if (!match) {
                    return 0;
                }
                return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
            },
            _applyToFixedAndParseFloat: function _applyToFixedAndParseFloat(num, toFixedInput) {
                var truncatedNum = num.toFixed(toFixedInput);
                return parseFloat(truncatedNum);
            },
			/*
   	Credits to Mike Samuel for the following method!
   	Source: http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
   */
            _getPercentage: function _getPercentage(ev) {
                if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
                    ev = ev.touches[0];
                }

                var eventPosition = ev[this.mousePos];
                var sliderOffset = this._state.offset[this.stylePos];
                var distanceToSlide = eventPosition - sliderOffset;
                if (this.stylePos === 'right') {
                    distanceToSlide = -distanceToSlide;
                }
                // Calculate what percent of the length the slider handle has slid
                var percentage = distanceToSlide / this._state.size * 100;
                percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
                if (this.options.reversed) {
                    percentage = 100 - percentage;
                }

                // Make sure the percent is within the bounds of the slider.
                // 0% corresponds to the 'min' value of the slide
                // 100% corresponds to the 'max' value of the slide
                return Math.max(0, Math.min(100, percentage));
            },
            _validateInputValue: function _validateInputValue(val) {
                if (!isNaN(+val)) {
                    return +val;
                } else if (Array.isArray(val)) {
                    this._validateArray(val);
                    return val;
                } else {
                    throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(val));
                }
            },
            _validateArray: function _validateArray(val) {
                for (var i = 0; i < val.length; i++) {
                    var input = val[i];
                    if (typeof input !== 'number') {
                        throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(input));
                    }
                }
            },
            _setDataVal: function _setDataVal(val) {
                this.element.setAttribute('data-value', val);
                this.element.setAttribute('value', val);
                this.element.value = val;
            },
            _trigger: function _trigger(evt, val) {
                val = val || val === 0 ? val : undefined;

                var callbackFnArray = this.eventToCallbackMap[evt];
                if (callbackFnArray && callbackFnArray.length) {
                    for (var i = 0; i < callbackFnArray.length; i++) {
                        var callbackFn = callbackFnArray[i];
                        callbackFn(val);
                    }
                }

                /* If JQuery exists, trigger JQuery events */
                if ($) {
                    this._triggerJQueryEvent(evt, val);
                }
            },
            _triggerJQueryEvent: function _triggerJQueryEvent(evt, val) {
                var eventData = {
                    type: evt,
                    value: val
                };
                this.$element.trigger(eventData);
                this.$sliderElem.trigger(eventData);
            },
            _unbindJQueryEventHandlers: function _unbindJQueryEventHandlers() {
                this.$element.off();
                this.$sliderElem.off();
            },
            _setText: function _setText(element, text) {
                if (typeof element.textContent !== "undefined") {
                    element.textContent = text;
                } else if (typeof element.innerText !== "undefined") {
                    element.innerText = text;
                }
            },
            _removeClass: function _removeClass(element, classString) {
                var classes = classString.split(" ");
                var newClasses = element.className;

                for (var i = 0; i < classes.length; i++) {
                    var classTag = classes[i];
                    var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
                    newClasses = newClasses.replace(regex, " ");
                }

                element.className = newClasses.trim();
            },
            _addClass: function _addClass(element, classString) {
                var classes = classString.split(" ");
                var newClasses = element.className;

                for (var i = 0; i < classes.length; i++) {
                    var classTag = classes[i];
                    var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
                    var ifClassExists = regex.test(newClasses);

                    if (!ifClassExists) {
                        newClasses += " " + classTag;
                    }
                }

                element.className = newClasses.trim();
            },
            _offsetLeft: function _offsetLeft(obj) {
                return obj.getBoundingClientRect().left;
            },
            _offsetRight: function _offsetRight(obj) {
                return obj.getBoundingClientRect().right;
            },
            _offsetTop: function _offsetTop(obj) {
                var offsetTop = obj.offsetTop;
                while ((obj = obj.offsetParent) && !isNaN(obj.offsetTop)) {
                    offsetTop += obj.offsetTop;
                    if (obj.tagName !== 'BODY') {
                        offsetTop -= obj.scrollTop;
                    }
                }
                return offsetTop;
            },
            _offset: function _offset(obj) {
                return {
                    left: this._offsetLeft(obj),
                    right: this._offsetRight(obj),
                    top: this._offsetTop(obj)
                };
            },
            _css: function _css(elementRef, styleName, value) {
                if ($) {
                    $.style(elementRef, styleName, value);
                } else {
                    var style = styleName.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (all, letter) {
                        return letter.toUpperCase();
                    });
                    elementRef.style[style] = value;
                }
            },
            _toValue: function _toValue(percentage) {
                return this.options.scale.toValue.apply(this, [percentage]);
            },
            _toPercentage: function _toPercentage(value) {
                return this.options.scale.toPercentage.apply(this, [value]);
            },
            _setTooltipPosition: function _setTooltipPosition() {
                var tooltips = [this.tooltip, this.tooltip_min, this.tooltip_max];
                if (this.options.orientation === 'vertical') {
                    var tooltipPos;
                    if (this.options.tooltip_position) {
                        tooltipPos = this.options.tooltip_position;
                    } else {
                        if (this.options.rtl) {
                            tooltipPos = 'left';
                        } else {
                            tooltipPos = 'right';
                        }
                    }
                    var oppositeSide = tooltipPos === 'left' ? 'right' : 'left';
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, tooltipPos);
                        tooltip.style[oppositeSide] = '100%';
                    }.bind(this));
                } else if (this.options.tooltip_position === 'bottom') {
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, 'bottom');
                        tooltip.style.top = 22 + 'px';
                    }.bind(this));
                } else {
                    tooltips.forEach(function (tooltip) {
                        this._addClass(tooltip, 'top');
                        tooltip.style.top = -this.tooltip.outerHeight - 14 + 'px';
                    }.bind(this));
                }
            }
        };

		/*********************************
  		Attach to global namespace
  	*********************************/
        if ($ && $.fn) {
            var autoRegisterNamespace = void 0;

            if (!$.fn.slider) {
                $.bridget(NAMESPACE_MAIN, Slider);
                autoRegisterNamespace = NAMESPACE_MAIN;
            } else {
                if (windowIsDefined) {
                    window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.");
                }
                autoRegisterNamespace = NAMESPACE_ALTERNATE;
            }
            $.bridget(NAMESPACE_ALTERNATE, Slider);

            // Auto-Register data-provide="slider" Elements
            $(function () {
                $("input[data-provide=slider]")[autoRegisterNamespace]();
            });
        }
    })($);

    return Slider;
});