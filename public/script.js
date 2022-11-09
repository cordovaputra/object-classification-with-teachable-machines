// Notes by Cordova

/*///////////////////////////////////////////////////////////////////////////////
1. IMPORT & SETUP MACHINE LEARNING MODEL
Don't forget to import your exported ML model into the Model folder,
exported from Teachable Machine process
-------------------------------------------------------------------------------*/

let model, webcam, predictionCallback;

export async function setupModel(URL, predictionCB) {
    predictionCallback = predictionCB;
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;
    model = await window.tmImage.load(modelURL, metadataURL);

    webcam = new window.tmImage.Webcam(200, 200, true);
    await webcam.setup();
    await webcam.play();

    document.getElementById('webcam-wrapper').appendChild(webcam.canvas);
    window.requestAnimationFrame(loop);
}
/*-----------------------------------------------------------------------------*/

/*///////////////////////////////////////////////////////////////////////////////
2. CONFIGURE PREDICTION PROCESS
This process sent the prediction data from your webcam to the web canvas 
-------------------------------------------------------------------------------*/

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    predictionCallback(prediction);
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}
/*-----------------------------------------------------------------------------*/

