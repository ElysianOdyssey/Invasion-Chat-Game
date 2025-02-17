let isTwitch = false;
if (typeof Twitch !== "undefined" && Twitch.ext) {
    isTwitch = true;
}

const CHANNEL_NAME = "#elysian_odyssey";
let playerUsername = "Unknown Player";
let twitchLoaded = false;
let twitchRetryCount = 0;

function retryTwitchAPI() {
    if (twitchRetryCount < 3) {
        console.warn("⚠️ Twitch API failed to load. Retrying in 3 seconds...");
        twitchRetryCount++;
        setTimeout(() => {
            let script = document.createElement("script");
            script.src = "https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js";
            script.defer = true;
            script.onerror = retryTwitchAPI;
            document.head.appendChild(script);
        }, 3000);
    } else {
        console.error("❌ Twitch API failed to load after multiple attempts.");
        document.getElementById("status").textContent = "Twitch API Unavailable";
    }
}

function initialize() {
    console.log("📌 Initializing Twitch Panel UI...");
    if (isTwitch && typeof Twitch.ext !== "undefined") {
        console.log("✅ Running inside Twitch.");
        Twitch.ext.onAuthorized((auth) => {
            if (!auth) {
                console.error("❌ Twitch Authorization Failed.");
                document.getElementById("status").textContent = "Authorization Error";
                return;
            }
            console.log("✅ Twitch Extension Authorized:", auth);
            playerUsername = auth.userId ? `User-${auth.userId}` : "Unknown Player";
            document.getElementById("status").textContent = `Welcome, ${playerUsername}!`;
            twitchLoaded = true;
            setTimeout(() => showPage("mission"), 1000); // Ensure UI renders after Twitch auth
        });

        Twitch.ext.onContext((context) => {
            console.log("✅ Twitch Extension Context Loaded:", context);
        });
    } else {
        console.log("🌍 Running in a normal browser.");
        document.getElementById("status").textContent = "Welcome, Explorer!";
        showPage("mission");
    }
}

function showPage(page) {
    let content = document.getElementById("content");
    if (!content) return;
    content.innerHTML = "";
    let title = document.createElement("h2");
    let desc = document.createElement("p");

    switch (page) {
        case "log":
            title.textContent = "Navigation Log";
            desc.textContent = "Tracking missions and outcomes...";
            break;
        case "inventory":
            title.textContent = "Inventory";
            desc.textContent = "Displaying collected items...";
            break;
        case "mission":
            title.textContent = "Mission Control";
            desc.textContent = "Manage your space exploration missions.";
            let buttons = ["!join", "!depart", "!land", "!changecourse", "!explore", "!mine", "!scan", "!return"];
            buttons.forEach(cmd => {
                let btn = document.createElement("button");
                btn.textContent = cmd;
                btn.className = "button";
                btn.onclick = () => console.log(`Command Sent: ${cmd}`);
                content.appendChild(btn);
            });
            break;
        case "ship":
            title.textContent = "Ship Status";
            desc.textContent = "Displaying ship damage, fuel levels, and repairs...";
            break;
        default:
            title.textContent = "Welcome to Odyssey Quest";
            desc.textContent = "Select a menu option above.";
    }
    content.appendChild(title);
    content.appendChild(desc);
}

document.addEventListener("DOMContentLoaded", initialize);
