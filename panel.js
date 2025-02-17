document.addEventListener("DOMContentLoaded", function () {
    console.log("📌 PCG-Style Panel Loaded");
    showPage("missions"); // Default page
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
        case "missions":
            title.textContent = "Available Missions";
            desc.textContent = "Select a mission to embark on!";
            showButtons(content, ["!start", "!cancel", "!complete"]);
            break;
        case "pokemon":
            title.textContent = "Your Pokémon";
            desc.textContent = "View and manage your Pokémon!";
            content.appendChild(createScrollableSection());
            break;
        case "inventory":
            title.textContent = "Trainer Inventory";
            desc.textContent = "View items you've collected!";
            content.appendChild(createScrollableSection());
            break;
        case "store":
            title.textContent = "PokéMart";
            desc.textContent = "Purchase new items and upgrades!";
            content.appendChild(createScrollableSection());
            break;
        default:
            title.textContent = "Welcome to Pokémon Community Game";
            desc.textContent = "Select a menu option above.";
            showButtons(content, ["!start", "!catch", "!battle"]);
    }
    content.appendChild(title);
    content.appendChild(desc);
}

function showButtons(content, commands) {
    commands.forEach(cmd => {
        let btn = document.createElement("button");
        btn.textContent = cmd;
        btn.className = "button";
        btn.onclick = () => console.log(`✅ Button Clicked: ${cmd}`);
        content.appendChild(btn);
    });
}

function createScrollableSection() {
    let div = document.createElement("div");
    div.className = "scrollable";
    div.innerHTML = "<p>Loading data...</p>";
    return div;
}
