const screenshotBtn = document.querySelector(".btn");
const screenshotPreview = document.querySelector(".src-preview");
const closeBtn = document.querySelector("#close-btn");


const captureScreen = async () =>{
  try{
    // asking permission to use a media input to read current tab.
    const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab : true});
    const video = document.createElement("video");
    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // passing video width & height as canvas width & height
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play();//playing video so drawn img wont be black or blank
      // drawing an image from captured video stream
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      stream.getVideoTracks()[0].stop(); //terminating the first track of the stream.
      // document.body.appendChild(canvas); //this will add canvas in body at end.

      // passing canvas data url as screenshot preview source;
      screenshotPreview.querySelector("img").src = canvas.toDataURL();
      screenshotPreview.classList.add("show");

    });
    video.srcObject = stream // passing captured stream data as video source object.
    console.log(stream);
  }catch (error){
    alert("Failed to capture screenshot!");
  }
}
closeBtn.addEventListener("click", ()=> screenshotPreview.classList.toggle("show"));
screenshotBtn.addEventListener("click", captureScreen);
