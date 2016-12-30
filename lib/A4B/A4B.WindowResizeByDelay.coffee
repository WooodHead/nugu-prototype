class WindowResizeEventByDelay
    constructor: ( callback, @delay = 200 ) ->
        # setDelay
        @timer = null

        # set event resize
        window.addEventListener 'resize', ( event )=>
            if @timer isnt null then window.clearTimeout @timer
            @timer = window.setTimeout callback, @delay