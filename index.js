const initialPremierLeagueTeams = [
  {
    name: "Arsenal",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Aston Villa",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Brighton & Hove Albion",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Burnley",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Chelsea",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Crystal Palace",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Everton",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Fulham",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Leeds United",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Leicester City",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Liverpool",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Manchester City",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Manchester United",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Newcastle United",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Sheffield United",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Southampton",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Tottenham Hotspur",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "West Bromwich Albion",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "West Ham United",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
  {
    name: "Wolverhampton Wanderers",
    position: 0,
    points: 0,
    goalsScored: 0,
    gamesPlayed: 0,
    goalsConceded: 0,
    goalDifference: 0,
  },
];

if (!localStorage.getItem("premierLeagueTeams"))
  localStorage.setItem(
    "premierLeagueTeams",
    JSON.stringify(initialPremierLeagueTeams)
  );

const premierLeagueTeams = JSON.parse(
  localStorage.getItem("premierLeagueTeams")
);

// Render options for team select
const firstTeamSelect = document.getElementById("firstTeamSelect");
const secondTeamSelect = document.getElementById("secondTeamSelect");

premierLeagueTeams.forEach(team => {
  const firstTeamOption = document.createElement("option");
  const secondTeamOption = document.createElement("option");

  firstTeamOption.setAttribute("value", team.name);
  firstTeamOption.textContent = team.name;

  secondTeamOption.setAttribute("value", team.name);
  secondTeamOption.textContent = team.name;

  firstTeamSelect.append(firstTeamOption);
  secondTeamSelect.append(secondTeamOption);
});

// Render the premier league table
const renderTable = () => {
  sortTeams();

  let teams = premierLeagueTeams;

  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  for (let i = 0; i < teams.length; i++) {
    const tr = document.createElement("tr");

    teams[i].position = i + 1;

    const relegated = getRelegatedTeams().find(
      team => team.position === teams[i].position
    );

    const ucl = getChampionsLeagueTeams().find(
      team => team.position === teams[i].position
    );

    const eur = getEuropaLeagueTeams().find(
      team => team.position === teams[i].position
    );

    if (relegated) tr.style.background = "#f1000026";
    if (ucl) tr.style.background = "#0080005e";
    if (eur) tr.style.background = "#0000ff4f";

    tr.innerHTML = `
          <td>${teams[i].position}</td>
          <th>${teams[i].name}</th>
          <td>${teams[i].gamesPlayed}</td>
          <td>${teams[i].goalsScored}</td>
          <td>${teams[i].goalsConceded}</td>
          <td>${teams[i].goalDifference}</td>
          <th>${teams[i].points}</th>
          `;
    tableBody.appendChild(tr);
  }
};

// Play matches between teams
const playMatch = (game, scores) => {
  const firstTeam = premierLeagueTeams.find(
    team => team.name.toLowerCase() === game[0].toLowerCase()
  );
  const secondTeam = premierLeagueTeams.find(
    team => team.name.toLowerCase() === game[1].toLowerCase()
  );

  if (!firstTeam) return alert("Invalid First Team");
  if (!secondTeam) return alert("Invalid Second Team");
  if (firstTeam === secondTeam)
    return alert("A team can't play against itself");

  firstTeam.gamesPlayed++;
  secondTeam.gamesPlayed++;

  if (scores[0] > scores[1]) {
    firstTeam.goalsConceded += scores[1];
    firstTeam.goalsScored += scores[0];
    firstTeam.goalDifference = firstTeam.goalsScored - firstTeam.goalsConceded;
    firstTeam.points += 3;

    secondTeam.goalsConceded += scores[0];
    secondTeam.goalsScored += scores[1];
    secondTeam.goalDifference =
      secondTeam.goalsScored - secondTeam.goalsConceded;

    localStorage.setItem(
      "premierLeagueTeams",
      JSON.stringify(premierLeagueTeams)
    );
  } else if (scores[0] < scores[1]) {
    secondTeam.goalsConceded += scores[0];
    secondTeam.goalsScored += scores[1];
    secondTeam.goalDifference =
      secondTeam.goalsScored - secondTeam.goalsConceded;
    secondTeam.points += 3;

    firstTeam.goalsConceded += scores[1];
    firstTeam.goalsScored += scores[0];
    firstTeam.goalDifference = firstTeam.goalsScored - firstTeam.goalsConceded;

    localStorage.setItem(
      "premierLeagueTeams",
      JSON.stringify(premierLeagueTeams)
    );
  } else {
    firstTeam.points++;
    firstTeam.goalsScored += scores[0];
    firstTeam.goalsConceded += scores[0];
    firstTeam.goalDifference = firstTeam.goalsScored - firstTeam.goalsConceded;

    secondTeam.points++;
    secondTeam.goalsScored += scores[0];
    secondTeam.goalsConceded += scores[0];
    secondTeam.goalDifference =
      secondTeam.goalsScored - secondTeam.goalsConceded;

    localStorage.setItem(
      "premierLeagueTeams",
      JSON.stringify(premierLeagueTeams)
    );
  }
};

// Sort teams by points, then by goal difference, then alphabetically
const sortTeams = () => {
  premierLeagueTeams.sort((a, b) => {
    const alphabetical = () => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };

    return (
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      alphabetical()
    );
  });
};

const getChampionsLeagueTeams = () =>
  premierLeagueTeams.filter(team => team.position <= 4);

const getEuropaLeagueTeams = () =>
  premierLeagueTeams.filter(team => team.position >= 5 && team.position <= 6);

const getRelegatedTeams = () =>
  premierLeagueTeams.filter(
    team =>
      team.position >= premierLeagueTeams.length - 2 &&
      team.position <= premierLeagueTeams.length
  );

// Play Match Button Listener
document.getElementById("playMatch").addEventListener("click", () => {
  let firstTeam = document.getElementById("firstTeamSelect").value;
  let secondTeam = document.getElementById("secondTeamSelect").value;
  let firstTeamScore = Number(document.getElementById("firstTeamScore").value);
  let secondTeamScore = Number(
    document.getElementById("secondTeamScore").value
  );

  playMatch([firstTeam, secondTeam], [firstTeamScore, secondTeamScore]);

  renderTable();

  document.getElementById("firstTeamSelect").value = "Select Team 1";
  document.getElementById("secondTeamSelect").value = "Select Team 2";
  document.getElementById("firstTeamScore").value = 0;
  document.getElementById("secondTeamScore").value = 0;

  // Close modal
  const modal = document.getElementById("exampleModal");
  var jQueryObj = Object.keys(modal).filter(
    key =>
      key.toString().indexOf("jQuery") !== -1 &&
      modal[key].hasOwnProperty("bs.modal")
  );
  modal[jQueryObj]["bs.modal"].hide();
});

// Reset Table Button Listener
document.getElementById("resetTable").addEventListener("click", () => {
  const confirmReset = confirm(
    "Are you sure you want to reset the table? Action cannot be reversed!"
  );

  if (confirmReset) {
    localStorage.setItem(
      "premierLeagueTeams",
      JSON.stringify(initialPremierLeagueTeams)
    );

    location.reload();
  }
});

renderTable();
