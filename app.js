const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require("path");
const { get } = require("axios");

const { Firestore } = require("@google-cloud/firestore");
const firestoreDb = new Firestore();

const fs = require("fs");
const util = require("util");
// const { spinnerSvg } = require("./spinnerSvg.js");

let serviceMetadata = {};
const service = process.env.K_SERVICE;
const revision = process.env.K_REVISION;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.send(`<form hx-post="/update" hx-target="this" hx-swap="outerHTML">
                <div>
  <p>
    <label>Name</label>    
    <input class="border-2" type="text" name="name" value="Cloud">
    </p><p>
    <label>Town</label>    
    <input class="border-2" type="text" name="town" value="Nibelheim">
    </p>
  </div>
  <div class="flex items-center mr-[10px] mt-[10px]">
  <button class="btn bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium mr-[10px]">Submit</button>
  <button class="btn bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-center text-sm font-medium mr-[10px]" hx-get="cancel">Cancel</button>  
                <svg id="spinner" alt="Loading..."
                    class="htmx-indicator animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                </div>
  </form>`);
});

app.post("/update", async function (req, res) {
    let name = req.body.name;
    let town = req.body.town;
    const doc = firestoreDb.doc(`demo/${name}`);
    await doc.set({
        name: name,
        town: town
    });

    res.send(`<div hx-target="this" hx-swap="outerHTML" hx-indicator="spinner">
                <p>
                <div><label>Name</label>: ${name}</div>
                </p><p>
                <div><label>Town</label>: ${town}</div>
                </p>
                <button
                    hx-get="/"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium mt-[10px]"
                >
                    Click to update
                </button>
            </div>`);
});

app.get("/cancel", (req, res) => {
    res.send(`<div hx-target="this" hx-swap="outerHTML">
                <p>
                <div><label>Name</label>: Cloud</div>
                </p><p>
                <div><label>Town</label>: Nibelheim</div>
                </p>
                <div>
                <button
                    hx-get="/"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium mt-[10px]"
                >
                    Click to update
                </button>                
                </div>
            </div>`);
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, async () => {
    console.log(`booth demo: listening on port ${port}`);

    //serviceMetadata = helper();
});
