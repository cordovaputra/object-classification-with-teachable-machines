// Notes by Cordova

/*///////////////////////////////////////////////////////////////////////////////
1. CREATE BAR UI COMPONENT
This code shows how to visualize bar component through DOM manipulation in JS
-------------------------------------------------------------------------------*/
let labels = [];
let bars = {};
let graphWrapper;

// these are the colors of our bars
let colors = ['#E67701', '#D84C6F', '#794AEF', '#1291D0'];
let lightColors = ['#FFECE2', '#FFE9EC', '#F1F0FF', '#E2F5FF'];

export async function setupBarGraph(URL) {
    const metadataURL = `${URL}metadata.json`;
    const response = await fetch(metadataURL);
    const json = await response.json();
    
    labels = json.labels;
    graphWrapper = document.getElementById('graph-wrapper');
    labels.forEach((label, index) => makeBar(label, index));
}

function makeBar(label, index) {

    // a. Create bar component elements
    let barWrapper = document.createElement('div'); // Wrap all elements into bar component
    let barEl = document.createElement('progress'); // Create bar rectangular component
    let percentEl = document.createElement('span'); // Store ML Prediction Confidence
    let labelEl = document.createElement('span');   // Store Metadata Dynamic Class
    labelEl.innerText = label;

    // b. Integrate all bar component elements
    barWrapper.appendChild(labelEl); //Show Metadata's Dynamic Class Type
    barWrapper.appendChild(barEl);   //Show bar component
    barWrapper.appendChild(percentEl); //Show detection confidence prediction

    let graphWrapper = document.getElementById('graph-wrapper');
    graphWrapper.appendChild(barWrapper);

    // c. Add style to the bar component
    let color = colors[index % colors.length];
    let lightColor = lightColors[index % colors.length];
    barWrapper.style.color = color;
    barWrapper.style.setProperty('--color', color);
    barWrapper.style.setProperty('--color-light', lightColor);

    // d. save references to each element, so we can update them later
    bars[label] = {
        bar: barEl,
        percent: percentEl
    };
}
/*-----------------------------------------------------------------------------*/

/*///////////////////////////////////////////////////////////////////////////////
2. UPDATE PREDICTION DATA IN THE BAR COMPONENT
This code shows how to integrate prediction data and label to the bar component
-------------------------------------------------------------------------------*/

export function updateBarGraph(data) {
    data.forEach(({ className, probability }) => {

        // get the HTML elements that we stored in the makeBar function
        let barElements = bars[className];
        let barElement = barElements.bar;
        let percentElement = barElements.percent;
        
        barElement.value = probability; // set the loader progress inside the bar while detection proccess occurs
        percentElement.innerText = convertToPercent(probability);  // set the prediction confidence percentage on the bar
    });
}
/*-----------------------------------------------------------------------------*/

/*///////////////////////////////////////////////////////////////////////////////
3. CONVERT DECIMAL TO INTEGER
-------------------------------------------------------------------------------*/

function convertToPercent(num) {
    num *= 100;
    num = Math.round(num);
    return `${num}%`;
}
/*-----------------------------------------------------------------------------*/
