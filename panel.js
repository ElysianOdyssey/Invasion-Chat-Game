document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 Odyssey Quest Panel Loaded");
    showPage("mission"); // Default page
});

function showPage(page) {
    let content = document.getElementById("content");
    if (!content) {
        console.error("❌ Content container not found.");
        return;
    }

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
            showButtons(content);
            break;
        case "ship":
            title.textContent = "Ship Status";
            desc.textContent = "Displaying ship damage, fuel levels, and repairs...";
            break;
        default:
            title.textContent = "Welcome to Odyssey Quest";
            desc.textContent = "Select a menu option above.";
            showButtons(content);
    }
    content.appendChild(title);
    content.appendChild(desc);
}

function showButtons(content) {
    let buttons = ["!join", "!depart", "!land", "!changecourse", "!explore", "!mine", "!scan", "!return"];
    buttons.forEach(cmd => {
        let btn = document.createElement("button");
        btn.textContent = cmd;
        btn.className = "button";
        btn.onclick = () => console.log(`✅ Button Clicked: ${cmd}`);
        content.appendChild(btn);
    });
}
