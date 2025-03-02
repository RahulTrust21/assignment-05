const navbar = document.getElementById("navbar");
const body = document.body;
const checkedTaskEl = document.getElementById("completed-task");
const taskAssignedEl = document.querySelector(".grid .bg-gray-100 .font-bold");
const activityLogEl = document.getElementById("history");
let checkedTasks = 22;  // Initial checked tasks count
let totalTasks = 6;     // Initial task assigned count

// Toggle Theme Function
function toggleTheme() {
    const colors = [
        'bg-blue-300', 'bg-green-300', 'bg-rose-300', 'bg-gray-300', 'bg-purple-300', 'bg-indigo-300',
        'bg-yellow-300', 'bg-red-300', 'bg-teal-300', 'bg-orange-300', 'bg-pink-300', 'bg-cyan-300',
        'bg-lime-300', 'bg-amber-300', 'bg-fuchsia-300', 'bg-violet-300', 'bg-sky-300', 'bg-emerald-300'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Remove existing background color classes
    colors.forEach(color => body.classList.remove(color));

    // Add the new random color class
    body.classList.add(randomColor);
}



// Format and Display Date
function getFormattedDate() {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${dayName} ${monthName} ${day} ${year}`;
}

document.getElementById("todayDate").innerText = getFormattedDate();

// Handle Task Completion
function completeTask(button) {
    if (button.disabled) return;  // Prevent multiple clicks

    // Update counts
    checkedTasks++;
    totalTasks--;

    // Update DOM elements
    checkedTaskEl.textContent = checkedTasks;
    taskAssignedEl.innerText = totalTasks;

    // Disable button
    button.disabled = true;
    button.classList.remove("bg-indigo-700"); // Remove previous background
    button.classList.add("bg-gray-500", "cursor-not-allowed"); // Add gray background
    button.innerText = "Completed";

    // Inline styles to ensure background color changes
    button.style.backgroundColor = "#6B7280"; // Tailwind's gray-500 color
    button.style.cursor = "not-allowed";

    // Show alert
    alert("Task Completed!");

    // Add to Activity Log
    const taskTitle = button.closest(".bg-gray-100").querySelector("h3").innerText;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const logEntry = document.createElement("div");
    logEntry.className = "p-2 text-sm";
    logEntry.innerText = `You have completed the task ${taskTitle} at ${time}`;
    activityLogEl.appendChild(logEntry);

    // Check if all tasks are completed
    if (totalTasks === 0) {
        alert("All tasks completed!");
    }
}

// Attach Event Listeners to "Completed" Buttons
document.querySelectorAll(".bg-gray-100 button[id]").forEach(button => {
    button.addEventListener("click", () => completeTask(button));
});

// Get the Clear History button
const clearHistoryButton = document.getElementById("clear-history");

// Add event listener to the Clear History button
clearHistoryButton.addEventListener("click", function() {
    // Clear the content inside the Activity Log
    activityLogEl.innerHTML = '';
    
    // Optionally, show a confirmation message that the history has been cleared
    alert("Activity Log Cleared!");
});
