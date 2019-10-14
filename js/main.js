if ( !window.requestAnimationFrame ) {
 
    window.requestAnimationFrame = ( function() {
 
        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
 
            window.setTimeout( callback, 1000 / 60 );
 
        };
 
    } )();
 
}

function request_permission(){
    alert("debug. In request_permission()");
	
	
    if (
        DeviceMotionEvent &&
        DeviceMotionEvent.requestPermission &&
        typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
        DeviceMotionEvent.requestPermission();
    }
    if (
        DeviceOrientationEvent &&
        DeviceOrientationEvent.requestPermission &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
        DeviceOrientationEvent.requestPermission();
    }
}



function onClick() {
    // feature detect
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
  }


var ball;
var w;
var h;

function init()
{
    request_permission();
	
    ball = document.getElementById("ball");
	 w = window.innerWidth;
     h = window.innerHeight;
	
	ball.style.left = (w/2)-50+"px";
	ball.style.top = (h/2)-50+"px";
	ball.velocity = {x:0,y:0}
	ball.position = {x:0,y:0}
    
    if (window.DeviceOrientationEvent) {
		
		window.addEventListener("deviceorientation", function(event) 
		{
			ball.velocity.y = Math.round(event.beta);
			ball.velocity.x = Math.round(event.gamma);
        }
                               )
    }
    else {
  	alert("Sorry, your browser doesn't support Device Orientation. 2");
	} ;
    
    update();
}

function update()
{
        ball.position.x += ball.velocity.x;
        ball.position.y += ball.velocity.y;
        
        if(ball.position.x > (w-100) && ball.velocity.x > 0)
			{
			   ball.position.x = w-100;
			}
			
			if(ball.position.x < 0 && ball.velocity.x < 0)
			{
				ball.position.x = 0;
			}
			
			if(ball.position.y > (h-100) && ball.velocity.y > 0)
			{
			   ball.position.y = h-100;
			}
			
			if(ball.position.y < 0 && ball.velocity.y < 0)
			{
			   ball.position.y = 0;
			}
    
    ball.style.top = ball.position.y + "px"
        ball.style.left = ball.position.x + "px"
    
    requestAnimationFrame( update );//KEEP ANIMATING
}
