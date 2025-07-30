const temperature = 50;  
const wind = 20;
const conditions = "Partly Cloudy";

function calculateWindChill(T, V) {
    return 35.74 + (0.6215*T) - (35.75*(Math.pow(V, 0.16))) + (0.4275*T)*(Math.pow(V, 0.16));
}

document.getElementById("temp").innerHTML = temperature + "&deg;C";
document.getElementById("condition").innerHTML = conditions;
document.getElementById("wind").innerHTML = wind + " km/h";

document.getElementById("chill").innerHTML = "N/A";


document.getElementById("chill-button").addEventListener("click", () => {
   
    let chill = "N/A";
    document.getElementById("chill").innerHTML = chill;

    
    if (temperature <= 50 && wind > 3) {
        chill = calculateWindChill(temperature, wind);
       
        const stringChill = String(chill.toFixed(2));
       
        document.getElementById("chill").innerHTML = String(chill.toFixed(2)) + "&deg;C";
    } else {
        chill = "N/A"
        document.getElementById("chill").innerHTML = chill;
    }
})