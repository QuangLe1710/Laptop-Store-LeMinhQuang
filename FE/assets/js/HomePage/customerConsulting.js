document
  .getElementById("floating-button")
  .addEventListener("click", function () {
    var advisorList = document.getElementById("advisor-list");
    advisorList.classList.toggle("show");
  });

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/user/employee", {
    method: "GET", // Phương thức yêu cầu
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const advisorList = document.getElementById("advisor-list");
      advisorList.innerHTML = "";

      const ch = document.createElement("h3");
      ch.innerHTML = "Xin Chào";
      const p = document.createElement("h6");
      p.innerHTML =
        "Rất vui khi được hỗ trợ bạn <br> Vui lòng liên hệ với các nhân viên theo SĐT dưới đây để được tư vấn miễn phí";
      const hr = document.createElement("hr");
      advisorList.appendChild(ch);
      advisorList.appendChild(p);
      advisorList.appendChild(hr)
      data.forEach((employee) => {
        const advisorDiv = document.createElement("div");
        advisorDiv.classList.add("advisor");

        const nameParts = employee.name.split(" ");
        const initials = nameParts
          .map((part) => part.charAt(0).toUpperCase())
          .join("");
        const iconColor = getRandomColor();

        const iconDiv = document.createElement("div");
        iconDiv.classList.add("advisor-icon");
        iconDiv.textContent = initials;
        iconDiv.style.backgroundColor = iconColor;

        advisorDiv.appendChild(iconDiv);
        const advisorInfo = document.createElement("p");
        advisorInfo.innerHTML = `${employee.name}: <span>Số điện thoại: ${employee.phoneNumber}</span>`;
        advisorDiv.appendChild(advisorInfo);

        advisorList.insertBefore(
          advisorDiv,
          document.getElementById("close-advisor-list")
        );
      });
    })
    .catch((error) => console.error("Có lỗi khi gọi API:", error));
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
