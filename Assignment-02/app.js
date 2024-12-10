fetch("https://www.thesportsdb.com//api/v1/json/3/lookup_all_players.php?id=133604")
    .then((res) => res.json())
    .then((data) => {
        if (data.player) {
            displayData(data.player);
        } else {
            console.error("No players found.");
        }
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });


document.getElementById("search-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = document.getElementById("search-text").value.trim();

    const searchPhrase = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(inputValue)}`;

    fetch(searchPhrase)
        .then((res) => res.json())
        .then((data) => {
            if (data.player) {
                displayData(data.player);
            }
            else {
                document.getElementById("player-list").innerHTML = `<p>No player found named "${inputValue}".</p>`;
            }
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
        });
});


const group = [];
const maxGroupSize = 11;

const displayData = (players) => {
    const container = document.getElementById("player-list");
    const groupContainer = document.getElementById("group-list");
    const totalMemberDisplay = groupContainer.querySelector("h5");

    container.innerHTML = "";

    players.forEach((player) => {
        const div = document.createElement("div");
        div.classList.add("card", "shadow", "rounded", "align-items-center");

        div.innerHTML = `
                <img src="${player.strCutout}" class="card-img-top" alt="Player Image">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
                <h6>Nationality: ${player.strNationality}</h6>
                <h6>Team: ${player.strTeam}</h6>
                <h6>Sport: ${player.strSport}</h6>
                <h6>Date of Birth: ${player.dateBorn}</h6>
                <h6>Jersey Number: ${player.strNumber}</h6>
                <div class="d-flex justify-content-between align-items-center w-50">
                    <a href="https://${player.strFacebook}" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://${player.strTwitter}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
                    <a href="https://${player.strInstagram}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100 mt-1">
                    <button class="btn btn-warning add-to-group">Add to Group</button>
                    <button class="btn btn-info details-button" data-bs-toggle="modal" data-bs-target="#playerModal">Details</button>
                </div>
            `;

        const detailsButton = div.querySelector(".details-button");

        detailsButton.addEventListener("click", () => {
            document.getElementById("playerImage").src = player.strCutout || "default-image.png";
            document.getElementById("playerName").textContent = `Name: ${player.strPlayer}`;
            document.getElementById("playerNationality").textContent = player.strNationality;
            document.getElementById("playerTeam").textContent = player.strTeam;
            document.getElementById("playerSport").textContent = player.strSport;
            document.getElementById("playerDOB").textContent = player.dateBorn;
            document.getElementById("playerBirthLocation").textContent = player.strBirthLocation;
            document.getElementById("playerJersey").textContent = player.strNumber;
            document.getElementById("playerSigning").textContent = player.strSigning;
            document.getElementById("playerWage").textContent = player.strWage;
            document.getElementById("playerKit").textContent = player.strKit;
            document.getElementById("playerEthnicity").textContent = player.strEthnicity;
            document.getElementById("playerGender").textContent = player.strGender;
            document.getElementById("playerSide").textContent = player.strSide;
            document.getElementById("playerPosition").textContent = player.strPosition;
            document.getElementById("playerHeight").textContent = player.strHeight;
            document.getElementById("playerWeight").textContent = player.strWeight;
            document.getElementById("playerStatus").textContent = player.strStatus;
            document.getElementById("playerDescriptionEN").textContent = player.strDescriptionEN;
        });

        container.appendChild(div);

        const addButton = div.querySelector(".add-to-group");

        addButton.addEventListener("click", () => {
            if (group.includes(player)) {
                alert("Player is already in the group!");
            } else if (group.length >= maxGroupSize) {
                alert("Maximum number of members has been added to the group!");
            } else {
                group.push(player);

                addButton.classList.remove("btn-warning");
                addButton.classList.add("btn-danger");
                addButton.textContent = "Already Added";

                updateGroupDisplay();
            }
        });

        container.appendChild(div);
    });


    function updateGroupDisplay() {
        totalMemberDisplay.textContent = `Total Member: ${group.length}`;

        const memberList = groupContainer.querySelector("div") || document.createElement("div");
        memberList.innerHTML = "";

        group.forEach((player) => {
            const div = document.createElement("div");
            div.classList.add("group-card");
            div.innerHTML = `
                <img src="${player.strCutout}" class="card-img-top" alt="Player Image">
                <h5 class="card-title">Name: ${player.strPlayer}</h5>
            `;
            memberList.appendChild(div);
        });

        groupContainer.appendChild(memberList);
    }
};
