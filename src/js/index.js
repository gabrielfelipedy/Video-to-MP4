const socket = io();

//#region DOM Elements
const submitVideoBtn = document.getElementById('submitVideoBtn');
const uploadAndConversionStatus = document.getElementById('uploadAndConversionStatus');
const formVideoFile = document.getElementById('formVideoFile');
const videoUploadForm = document.getElementById('videoUploadForm');
const fileName = document.getElementById('file-name');
const fileNameDiv = document.getElementById('file-name-div');

const selectFile = document.getElementById('select-file');
//#endregion

//#region Functions
const uploadVideo = async () => {
    let formData = new FormData(videoUploadForm);
    const options = {
        method: 'POST',
        body: formData
    };

    const data = await fetch('/convertVideo', options);
    //console.log(data);
    if (data.status == 200) {
        window.location.replace(data.url);
    } else {
        console.log(await data.text());
    }
    // // The content-disposition header gets set by the express.js res.download() function. It is the filename.
    // let fileName = data.headers.get('Content-Disposition');
    // // Split from the header to just get the name wrapped in quotes
    // fileName = fileName.split('=')[1];
    // // Get just the name outside of quotes
    // fileName = fileName.split('"')[1];
    // const videoBlob = await data;
    // const videoFile = new File([videoBlob], fileName, { type: 'video/mp4'});

    // // Create an ObjUrl and a link to use to perform an automatic download of the video.
    // let objUrl = window.URL.createObjectURL(videoFile);
    // let link = document.createElement('a');
    // link.href = objUrl;
    // link.download = videoFile.name;
    // link.click();

}
//#endregion

//#region Socket.io messages
socket.on('uploadAndConversionStatus', (serverData) => {
    uploadAndConversionStatus.innerText = `${uploadAndConversionStatus.innerText}\n${serverData.msg}`
    uploadAndConversionStatus.scrollTop = uploadAndConversionStatus.scrollHeight;
})
//#endregion

//#region Event Listener
videoUploadForm.addEventListener('submit', function(e) {
    submitVideoBtn.disabled = true;
})

formVideoFile.addEventListener('input', function(event) {
    if (this.value.length > 0)
    {
        submitVideoBtn.classList.remove('d-none')
        fileNameDiv.classList.remove('d-none')
        selectFile.classList.add('d-none')

        fileName.textContent = ''

        for(let i = 0; i < event.target.files.length; i++)
        {
            //alert(event.target.files[i].name)
            const li = document.createElement('li')
            li.innerHTML = event.target.files[i].name

            fileName.appendChild(li)
        }
        //fileName.textContent = event.target.files[0].name
    } else {
        submitVideoBtn.classList.contains('d-none') ? 0 : submitVideoBtn.classList.add('d-none')
        fileNameDiv.classList.contains('d-none') ? 0 : fileNameDiv.classList.add('d-none')
    }

    //alert("Funciona")
})

submitVideoBtn.addEventListener('click', function(e) {
    e.preventDefault();

    uploadVideo();
})
//#endregion