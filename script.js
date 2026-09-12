/* ===================================================
    Theme: The Haunted Mansion
   =================================================== */

function invalidInput(message) {
  alert(message || "Invalid choice! Please enter a valid option.");
}

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
  hasTroch: false,
  hascrowbar: false,
  lives:3,
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
      "❤️ Lives Left:" + gameState.lives + "\n" +
      "🎒Items in Bag: " + getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Inspect the old Grandfather Clock\n" +
      "2. Go to the Library\n" +
      "3. Descend into the Dark Basement \n" +
      "4. Walk to the Front Exit Door\n" +
      "5. Exit Game",
  );

  if (choice === null) return handleNullChoice("hall");

  if (choice === "5") return "quit";
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
  } else if (choice === "4") {
    return "exit";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, 3, 4 or 5.");
    return "hall";
  }
}

// Location 2: Library
function library() {
  let choice = prompt(
    "=== LIBRARY ===\n" +
      "❤️ Lives Left:" + gameState.lives + "\n" +
      "🎒Items in Bag: " + getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Search the glowing bookshelf\n" +
      "2. Inspect the Desk Drawer 🗄️\n" +
      "3. Touch the creepy statue 🗿 (Risky!)\n" +
      "4. Return to the Grand Hall\n" +
      "5. Exit Game",
  );

  if (choice === null) return handleNullChoice("library");
  if (choice === "5") return "quit";
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
      
  } else if(choice==="2") {
      if(!gameState.hasTorch) {
          gameState.hasTorch = true;
          gameState.inventory.push(("Flashlight 🔦");
          alert(
        ">> ITEM FOUND! You pulled a strange book and a Silver Ghost Key dropped out!",
      );
    } else {
      alert"The desk drawer is now empty.");
    }
    return "library";
      
  } else if (choice==="3") {
      gameState.lives - = 1;
      alert("⚠️ TRAP TRIGGERED! Poison gas shot out of the statue! You lost 1 Life ❤️ (Lives left: " + gameState.lives + ")");
        if (gameState.lives <= 0) return "lose";
        return "library";
      
  } else if (choice === "4") {
    return "hall";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, 3, 4 or 5.");
    return "library";
  }
}

// Location 3: Basement (Dangerous Room)
function basement() {
    if (!gameState.hasTorch) {
        gameState.lives -= 1;
        alert("⚠️ IT'S TOO DARK! You tripped down the stairs in the dark and lost 1 Life ❤️ (Lives left: " + gameState.lives + "). Find a Flashlight first!");
        if (gameState.lives <= 0) return "lose";
        return "hall";
    }

    let choice = prompt(
        "=== 🕯️ DARK BASEMENT ===\n" +
        "❤️ Lives Left: " + gameState.lives + "\n" +
        "🎒 Items in Bag: " + getInventoryStatus() + "\n\n" +
        "Your flashlight illuminates damp stone walls.\n" +
        "1. Open the heavy iron chest 🧰\n" +
        "2. Return to Grand Hall\n" +
        "3. Exit Game"
    );

    if (choice === null) return handleNullChoice("basement");
    if (choice === "3") return "quit";
    choice = choice.trim();

    if (choice === "1") {
        if (!gameState.hasCrowbar) {
            gameState.hasCrowbar = true;
            gameState.inventory.push("Iron Crowbar 🔨");
            alert(">> ITEM FOUND! You opened the chest and found an Iron Crowbar!");
        } else {
            alert("The chest is empty.");
        }
        return "basement";
    } else if (choice === "2") {
        return "hall";
    } else {
        invalidInput("Invalid choice! Please select 1, 2, or 3.");
        return "basement";
    }
}
// Location 4: Front Exit Door
function frontExit() {
  let choice = prompt(
    "=== FRONT EXIT DOOR ===\n" +
      "❤️ Lives Left: " + gameState.lives + "\n" +
      "🎒 Items in Bag: " + getInventoryStatus() + "\n\n" +
      "A huge iron door stands before you. It has a keyhole and a digital keypad.\n\n" +
      "Items in Bag: " +
      getInventoryStatus() +
      "\n\n" +
      "What will you do?\n" +
      "1. Use Silver Key, Break Barricade with Crowbar and enter PIN Code\n" +
      "2. Return to Grand Hall\n" +
      "3. Kick the door open violently (Risky!)",
  );

  if (choice === null) return handleNullChoice("exit");
  choice = choice.trim();

 if (choice === "1") {
        if (!gameState.hasCrowbar) {
            alert("❌ FAILED! The door is barricaded with thick wood! You need a Crowbar 🔨 to break it.");
            return "exit";
        }
        if (!gameState.hasKey) {
            alert("❌ FAILED! You still need the Silver Ghost Key 🔑 to turn the lock.");
            return "exit";
        }
        if (!gameState.hasCode) {
            alert("❌ FAILED! You need the PIN Code 📝 for the digital keypad.");
            return "exit";
        }

        let pass = prompt("ENTER 4-DIGIT PIN CODE:");
        if (pass !== null && pass.trim() === "1031") {
            return "win";
        } else {
            gameState.lives -= 1;
            alert("❌ INCORRECT PIN! An electric shock hit you! Lost 1 Life ❤️ (Lives left: " + gameState.lives + ")");
            if (gameState.lives <= 0) return "lose";
            return "exit";
        }
  } else if (choice === "2") {
    return "hall";
  } else if (choice === "3") {
   gameState.lives -= 1;
        alert("💥 OUCH! You smashed your shoulder against the iron door and lost 1 Life ❤️ (Lives left: " + gameState.lives + ")");
        if (gameState.lives <= 0) return "lose";
        return "exit";
  } else {
    invalidInput("Invalid choice! Please select 1, 2, 3, 4or 5.");
    return "exit";
  }
}
//Main Function
function startHauntedEscape() {
  gameState.hasKey = false;
  gameState.hasCode = false;
  gameState.hasTroch = false;
  gameState.hasCrowbar = false;
  gameState.Lives = 3;
  gameState.inventory = [];

  let currentStep = "hall";
  let isPlaying = true;

  while (isPlaying) {
    if (currentStep === "hall") {
      currentStep = grandHall();
    } else if (currentStep === "library") {
      currentStep = library();
    } else if (currentStep === "basement") {
        currentStep = basement();
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
