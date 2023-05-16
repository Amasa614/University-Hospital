
 //Appointy integration

    if (typeof(window.Appointy) === 'undefined') {
        window.Appointy = {};
    }
    window.Appointy.config = {
        business: 'Jeffery',
        defaultTab: 'Schedule',
        extraParameter: '',
        buttonImg: '',
        modal: {
            height: '100%',
            width: '100%'
        },
        buttonAlign: "Right", /* You may set 'Left' or 'Right', default value is 'Right'*/
        buttonPosition: "40", /*You may set 'Top', 'Bottom' or any number from 0 to 100, default value is '40'*/
    };
    jQuery(document).ready(function() {
        jQuery("#bookAppointy").click(function(){
            jQuery("#app-widget-btn").click();
            return false;
        });
    });

   
<script type="text/javascript" src="https://cdn.appointy.com/web/blob-web/js/appointy-widget.js"></script>

// Animated counter 

function animate(obj, initVal, lastVal, duration) {
    let startTime = null;
  
    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();
  
    //pass the current timestamp to the step function
    const step = (currentTime ) => {
  
      //if the start time is null, assign the current time to startTime
      if (!startTime) {
        startTime = currentTime ;
      }
  
      //calculate the value to be used in calculating the number to be displayed
      const progress = Math.min((currentTime - startTime)/ duration, 1);
  
      //calculate what to be displayed using the value gotten above
      obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);
  
      //checking to make sure the counter does not exceed the last value (lastVal)
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(window.requestAnimationFrame(step));
      }
    };
    //start animating
    window.requestAnimationFrame(step);
  }
  
  function reloadCounters() {
    const text1 = document.getElementById('0101');
    const text2 = document.getElementById('0102');
    const text3 = document.getElementById('0103');
    animate(text1, 0, 511, 7000);
    animate(text2, 0, 232, 7000);
    animate(text3, 0, 89, 7000);
  }
  
  function load() {
    // Initialize the counters
    animate(document.getElementById('0101'), 0, 511, 7000);
    animate(document.getElementById('0102'), 0, 232, 7000);
    animate(document.getElementById('0103'), 0, 89, 7000);
    
    // Set the interval to reload the counters every 10 seconds
    setInterval(reloadCounters, 10000);
  }
  