// Student Forms

const addStudentForm = document.querySelector("#addStudentForm");

addStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const studentData = new FormData(addStudentForm);
  const reqBody = Object.fromEntries(studentData);
  console.log(reqBody);

  fetch("/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

const updateStudentForm = document.querySelector("#updateStudentForm");

updateStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const studentData = new FormData(updateStudentForm);
  const reqBody = Object.fromEntries(studentData);
  console.log(reqBody);

  fetch("/students", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

const deleteStudentForm = document.querySelector("#deleteStudentForm");

deleteStudentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const studentData = new FormData(deleteStudentForm);
  const reqBody = Object.fromEntries(studentData);
  console.log(reqBody);

  fetch("/students", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

// Teacher Forms

const addTeacherForm = document.querySelector("#addTeacherForm");

addTeacherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const teacherData = new FormData(addTeacherForm);
  const reqBody = Object.fromEntries(teacherData);
  console.log(reqBody);

  fetch("/teachers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

const updateTeacherForm = document.querySelector("#updateTeacherForm");

updateTeacherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const teacherData = new FormData(updateTeacherForm);
  const reqBody = Object.fromEntries(teacherData);
  console.log(reqBody);

  fetch("/teachers", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

const deleteTeacherForm = document.querySelector("#deleteTeacherForm");

deleteTeacherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const teacherData = new FormData(deleteTeacherForm);
  const reqBody = Object.fromEntries(teacherData);
  console.log(reqBody);

  fetch("/teachers", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/admin.html";
  });
});

// if(teachers.subject == teachers.Music){
//   console.log("Hello")
// }