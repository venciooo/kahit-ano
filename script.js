const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// PROFILE DROPDOWN
const profile = document.querySelector("nav .profile");
const imgProfile = profile.querySelector("img");
const dropdownProfile = profile.querySelector(".profile-link");

imgProfile.addEventListener("click", function () {
  dropdownProfile.classList.toggle("show");
});

//
let appointments = [];
let editIndex = null;

function handleAppointment() {
  const selectedDate = document.getElementById("datepicker").value;
  const patientName = document.getElementById("patientName").value;

  if (selectedDate && patientName) {
    appointments.push({
      date: selectedDate,
      name: patientName,
    });
    displayAppointments();
  } else {
    alert("Please select a date and enter patient name.");
  }
}

function displayAppointments() {
  const appointmentDetails = document.getElementById("appointmentDetails");
  appointmentDetails.innerHTML = "";

  appointments.forEach((appointment, index) => {
    const appointmentItem = document.createElement("div");
    appointmentItem.classList.add("appointment-item");
    appointmentItem.innerHTML = `
		<span>${appointment.date} - ${appointment.name}</span>
		<div>
		  <button class="editBtn">Edit</button>
		  <button class="deleteBtn">Delete</button>
		</div>
	  `;

    const editBtn = appointmentItem.querySelector(".editBtn");
    editBtn.addEventListener("click", () => editAppointment(index));

    const deleteBtn = appointmentItem.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => deleteAppointment(index));

    appointmentDetails.appendChild(appointmentItem);
  });
}

function editAppointment(index) {
  const appointment = appointments[index];
  const editDatepicker = document.getElementById("editDatepicker");
  const editPatientName = document.getElementById("editPatientName");
  const editForm = document.getElementById("editForm");

  editDatepicker.value = appointment.date;
  editPatientName.value = appointment.name;

  editIndex = index;

  // Show the edit form
  editForm.style.display = "block";
}

function updateAppointment() {
  const editDatepicker = document.getElementById("editDatepicker");
  const editPatientName = document.getElementById("editPatientName");
  const editForm = document.getElementById("editForm");

  if (editDatepicker.value && editPatientName.value) {
    appointments[editIndex] = {
      date: editDatepicker.value,
      name: editPatientName.value,
    };
    displayAppointments();
  } else {
    alert("Please select a date and enter patient name.");
  }

  editIndex = null;

  // Hide the edit form
  editForm.style.display = "none";
}

function cancelEditing() {
  const editForm = document.getElementById("editForm");

  // Hide the edit form
  editForm.style.display = "none";
}

function deleteAppointment(index) {
  appointments.splice(index, 1);
  displayAppointments();
}

flatpickr("#datepicker", {
  dateFormat: "Y-m-d",
});

flatpickr("#editDatepicker", {
  dateFormat: "Y-m-d",
});
``;
