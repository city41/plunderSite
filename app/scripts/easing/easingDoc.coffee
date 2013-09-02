define ['plunder', './easingVis', '../domReady'], (Plunder, EasingVis, domReady) ->
  addTocEntry = (tocId, id) ->
    toc = document.getElementById tocId
    li = document.createElement 'li'
    li.innerHTML = "- <a href='##{id}'>#{id}</a>"
    toc.appendChild li

  createContainer = (containerId, key) ->
    width = 500
    div = document.createElement 'div'
    div.style.display = 'inline-block'
    div.style.width = "#{width}px"
    div.style.marginLeft = '5px'
    div.style.marginRight = '5px'
    div.id = key
    h = document.createElement 'h3'
    h.innerHTML = key
    div.appendChild h

    canvas = document.createElement 'canvas'
    canvas.width = width
    canvas.height = 200
    canvas.id = "canvas-#{key}"
    div.appendChild canvas
    document.getElementById(containerId).appendChild div
    return canvas.id

  
  addDemoEntry = (containerId, easingFn) ->
    canvasId = createContainer(containerId, easingFn)
    new EasingVis(canvasId, easingFn).go()


  easingDoc = (tocId, demoContainerId) ->
    domReady ->
      for own key, value of Plunder.Easie
        addTocEntry(tocId, key)
        addDemoEntry(demoContainerId, key)


  return easingDoc



