define ->
  runCallbacks = (callbacks) ->
    i = undefined
    i = 0
    while i < callbacks.length
      callbacks[i] doc
      i += 1
  callReady = ->
    callbacks = readyCalls
    if isPageLoaded
      
      #Call the DOM ready callbacks
      if callbacks.length
        readyCalls = []
        runCallbacks callbacks
  
  ###
  Sets the page as loaded.
  ###
  pageLoaded = ->
    unless isPageLoaded
      isPageLoaded = true
      clearInterval scrollIntervalId  if scrollIntervalId
      callReady()
  
  #Standards. Hooray! Assumption here that if standards based,
  #it knows about DOMContentLoaded.
  
  #DOMContentLoaded approximation that uses a doScroll, as found by
  #Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
  #but modified by other contributors, including jdalton
  
  #Check if document already complete, and if so, just trigger page load
  #listeners. Latest webkit browsers also use "interactive", and
  #will fire the onDOMContentLoaded before "interactive" but not after
  #entering "interactive" or "complete". More details:
  #http://dev.w3.org/html5/spec/the-end.html#the-end
  #http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
  #Hmm, this is more complicated on further use, see "firing too early"
  #bug: https://github.com/requirejs/domReady/issues/1
  #so removing the || document.readyState === "interactive" test.
  #There is still a window.onload binding that should get fired if
  #DOMContentLoaded is missed.
  
  ###
  START OF PUBLIC API *
  ###
  
  ###
  Registers a callback for DOM ready. If DOM is already ready, the
  callback is called immediately.
  @param {Function} callback
  ###
  domReady = (callback) ->
    if isPageLoaded
      callback doc
    else
      readyCalls.push callback
    domReady
  "use strict"
  isTop = undefined
  testDiv = undefined
  scrollIntervalId = undefined
  isBrowser = typeof window isnt "undefined" and window.document
  isPageLoaded = not isBrowser
  doc = (if isBrowser then document else null)
  readyCalls = []
  if isBrowser
    if document.addEventListener
      document.addEventListener "DOMContentLoaded", pageLoaded, false
      window.addEventListener "load", pageLoaded, false
    else if window.attachEvent
      window.attachEvent "onload", pageLoaded
      testDiv = document.createElement("div")
      try
        isTop = window.frameElement is null
      if testDiv.doScroll and isTop and window.external
        scrollIntervalId = setInterval(->
          try
            testDiv.doScroll()
            pageLoaded()
        , 30)
    pageLoaded()  if document.readyState is "complete"
  domReady.version = "2.0.1"
  
  ###
  Loader Plugin API method
  ###
  domReady.load = (name, req, onLoad, config) ->
    if config.isBuild
      onLoad null
    else
      domReady onLoad

  
  ###
  END OF PUBLIC API *
  ###
  domReady

