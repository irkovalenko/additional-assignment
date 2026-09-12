/* ===================================================
   BONUS ASSIGNMENT: Escape the Evil AI / Ghost
   Theme: The Haunted Mansion Escape
   =================================================== */

function invalidInput(message) {
  alert(message || "Invalid choice! Please enter a valid option.");
}

let replay = confirm("Would you like to play again?");

let tabWasChanged = false;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tabWasChanged = true;
  }
});

function handleNullChoice(returnTo) {
  if (tabWasChanged) {
    tabWasChanged = false;
    alert("👋 Welcome back! Your escape attempt continues... good luck.");
    return returnTo;
  }
  return "quit";
}

let gameState = {
  hasKey: false,
  hasCode: false,
  inventory: [],
};

function getInventoryStatus() {
  if (gameState.inventory.length === 0) {
    return "none 😢";
  }
  return gameState.inventory.join(", ");
}

function grandHall() {
  let choice = prompt(
    "=== GRAND HALL ===\n" +
      "You are standing in a dark hall. Shadows flicker on the walls.\n\n" +
      "Items in Bag: " +
      getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Inspect the old Grandfather Clock\n" +
      "2. Go to the Library\n" +
      "3. Walk to the Front Exit Door\n" +
      "4. Exit Game",
  );

  if (choice === null) return handleNullChoice("hall");

  if (choice === "4") return "quit";
  choice = choice.trim();

  if (choice === "1") {
    if (!gameState.hasCode) {
      gameState.hasCode = true;
      gameState.inventory.push("Secret Note [PIN: 1031]");
      alert(
        "🎉 CLUE FOUND! Inside the clock, you found a paper note with PIN: 1031.",
      );
    } else {
      alert("The clock is ticking continuously. Nothing else inside.");
    }
    return "hall";
  } else if (choice === "2") {
    return "library";
  } else if (choice === "3") {
    return "exit";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, 3, or 4.");
    return "hall";
  }
}

// Location 2: Library
function library() {
  let choice = prompt(
    "=== LIBRARY ===\n" +
      "Dusty bookshelves line the walls. Cold wind blows through the broken window.\n\n" +
      "Items in Bag: " +
      getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Search the glowing bookshelf\n" +
      "2. Return to the Grand Hall\n" +
      "3. Exit Game",
  );

  if (choice === null) return handleNullChoice("library");
  if (choice === "3") return "quit";
  choice = choice.trim();

  if (choice === "1") {
    if (!gameState.hasKey) {
      gameState.hasKey = true;
      gameState.inventory.push("Silver Ghost Key");
      alert(
        ">> ITEM FOUND! You pulled a strange book and a Silver Ghost Key dropped out!",
      );
    } else {
      alert("The bookshelf is dusty and full of ancient books.");
    }
    return "library";
  } else if (choice === "2") {
    return "hall";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, or 3.");
    return "library";
  }
}

// Location 3: Front Exit Door
function frontExit() {
  let choice = prompt(
    "=== FRONT EXIT DOOR ===\n" +
      "A huge iron door stands before you. It has a keyhole and a digital keypad.\n\n" +
      "Items in Bag: " +
      getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Use Silver Key and enter PIN Code\n" +
      "2. Return to Grand Hall\n" +
      "3. Kick the door open violently (Risky!)",
  );

  if (choice === null) return handleNullChoice("exit");
  if (choice === "3") return "quit";
  choice = choice.trim();

  if (choice === "1") {
    if (gameState.hasKey && gameState.hasCode) {
      let pass = prompt("ENTER 4-DIGIT PIN CODE:");
      if (pass !== null && pass.trim() === "1031") {
        return "win";
      } else {
        alert(">> ACCESS DENIED! Incorrect PIN entered.");
        return "exit";
      }
    } else {
      alert(">> LOCKED! You need both the Silver Ghost Key AND the PIN Code.");
      return "exit";
    }
  } else if (choice === "2") {
    return "hall";
  } else if (choice === "3") {
    return "lose";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, or 3.");
    return "exit";
  }
}

function startHauntedEscape() {
  gameState.hasKey = false;
  gameState.hasCode = false;
  gameState.inventory = [];

  let currentStep = "hall";
  let isPlaying = true;

  while (isPlaying) {
    if (currentStep === "hall") {
      currentStep = grandHall();
    } else if (currentStep === "library") {
      currentStep = library();
    } else if (currentStep === "exit") {
      currentStep = frontExit();
    } else if (currentStep === "win") {
      alert(
        "🎉 VICTORY! The iron door unlocks and swings open! You escaped the Haunted Mansion!",
      );
      isPlaying = false;
    } else if (currentStep === "lose") {
      alert(
        "💥 GAME OVER! You kicked the door, triggering a trap! The Evil Ghost captured you forever.👻",
      );
      isPlaying = false;
    } else if (currentStep === "quit") {
      alert("You gave up. The Haunted Mansion remains your home forever...👻");
      isPlaying = false;
    }
  }

  if (!replay && tabWasChanged) {
    tabWasChanged = false;
    alert("👋 Welcome back! Let's ask that again...");
    replay = confirm("Would you like to play again?");
  }

  if (replay) {
    startHauntedEscape();
  } else {
    alert("Thanks for playing!");
  }
}

startHauntedEscape();
