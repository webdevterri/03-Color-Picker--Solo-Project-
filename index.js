// https://www.thecolorapi.com/docs#schemes

const btnColor = document.getElementById("btnGetColor");

btnColor.addEventListener("click", function () {
  // variable for seed color
  const colorPick = document.getElementById("colorpicker").value;
  // Get rid of the # in front of hex code!
  const hexcode = colorPick.slice(1);
  // console.log(hexcode);
  // variable for color mode
  const mode = document.getElementById("colormode");
  // console.log(colorPick);
  // console.log(colorPick);
  // console.log(mode.value);
  const endpoint = `/scheme?hex=${hexcode}&mode=${mode.value}&count=5`;
  // console.log(endpoint);
  // place API request here
  // Is format=json neccessary if I convert response to json below?
  fetch(`https://www.thecolorapi.com${endpoint}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        function colorfill() {
          const colorhex = data.colors[i].hex.value;
          const colorName = data.colors[i].name.value;
          // console.log(colorhex);
          // console.log(colorName);
          // // create div with color-block class & add correct color to that div
          const colorBlock = document.getElementById(`color${i}`);
          colorBlock.style.backgroundColor = colorhex;
          // // create div with id of hexcodes0# and give the divs background colors from json data
          const hexcodes = document.getElementById(`hexcode${i}`);
          hexcodes.innerHTML = `${colorhex}`;
          hexcodes.innerHTML += `<br>${colorName}`;
        }

        colorfill();

        const target = document.getElementById(`hexcode${i}`);
        target.addEventListener("click", myFunction);

        // myFunction() is the copy to clipboard functionality
        function myFunction() {
          /* Get the text field */
          const copyText = document.getElementById(`hexcode${i}`);
          // console.log(copyText.innerHTML);
          // console.log(copyText.innerHTML.slice(0, 7));
          const hexonly = copyText.innerHTML.slice(0, 7);
          // console.log(typeof hexonly);

          /* Copy the text inside the text field */
          navigator.clipboard.writeText(`${hexonly}`);

          /* Alert the copied text */
          alert("Copied: " + hexonly);
        }
      }
    });
});

// Note: Change the alert() in line 56 to be a modal instead that disappears after 5 seconds. The alert causes problems after a few uses.
