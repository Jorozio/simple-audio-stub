// use DOM to link to index
const seekBar = document.getElementById("seek-bar");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const button = document.getElementById("play-pause-button");
// using query selector allows you to select elements using any valid CSS selector.
const volume = document.querySelector("#volume-slider");
// adding 3 seperate audio files
const audio = new Audio("audio/Immortal.mp3");
const audio2 = new Audio("audio/partments.mp3");
const audio3 = new Audio("audio/BBTL.mp3");

// seek state
let seeking = false

// list of audio files
let audios = [audio, audio2, audio3];
// current audio index
let currentAudio = 0;



// BUTTONS TO PULL IMAGES

window.onload = function () {
    // select all the images inside the div with the id of images
    let images = document.querySelectorAll('#images img');
    // sets the current image index to 1
    let currentImage = 0;

    // this function handles the "next" button 
    nextImage = () => {
        // hides the current image
        images[currentImage].style.display = 'none';
        // pull next image from current image index
        currentImage++;
        //  if greater than or = to number of images, reset
        if (currentImage >= images.length) {
            currentImage = 0;
        }

        // pauses audio to load the next song
        audio.pause();
        // resets the audio duration and seekbar
        seekBar.value = 0;
        audio.currentTime = 0;
        // show the next image
        images[currentImage].style.display = 'block';
    }
    // this is for the prev buttons
    prevImage = () => {
        images[currentImage].style.display = 'none';
        // pulls previous image from image index
        currentImage--;
        if (currentImage < 0) {
            currentImage = images.length - 1;
        }
        // pauses audio to load the next song
        audio.pause();
        // resets the audio duration and seekbar
        // all of this only works if the audio is the same length,
        seekBar.value = 0;
        audio.currentTime = 0;

        images[currentImage].style.display = 'block';
    }
    // Attach the nextImage() function to the "Next" button's click event
    document.getElementById('next').addEventListener('click', nextImage);
    // Attach the prevImage() function to the "Previous" button's click event
    document.getElementById('prev').addEventListener('click', prevImage);
    // Call the nextImage() function once when the page loads to ensure the correct image is displayed
    nextImage();
}



// play and pause function
button.onclick = (event) => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
audio.onplay = (event) => {
    // change the button icon when audio is played
    button.src = "images/pause.svg";
}
audio.onpause = (event) => {
    // change the button icon when audio is paused
    button.src = "images/play.svg";
}

audio.onloadedmetadata = (event) => {
    currentTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
}
audio.oncanplaythrough = (event) => {
    seekBar.disabled = false;
}
audio.ontimeupdate = (event) => {
    currentTime.innerHTML = formatTime(audio.currentTime)
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime);
    }
}
// seek bar listeners

seekBar.oninput = (event) => {
    seeking = true;
}
seekBar.onchange = (event) => {
    audio.currentTime = seekBar.value
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
}



// volume slider
// adding an event listener for a change in value for the volume slider
volume.addEventListener("change", (e) => {
    //  // The e.currentTarget.value gets the current value of the slider and then converts it into decimal
    audio.volume = e.currentTarget.value / 100;
})
// Updates the volume in real-time
volume.addEventListener("input", (e) => {
    audio.volume = e.currentTarget.value / 100;
})

// timing function 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}