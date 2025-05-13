document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("toolModal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-btn");

  // Open modal and load content
  document.querySelectorAll(".tool-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const file = link.getAttribute("data-file");

      // Fetch content from the external file
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to load content");
          }
          return response.text();
        })
        .then(content => {
          modalBody.innerHTML = content;
          modal.style.display = "flex";
        })
        .catch(error => {
          modalBody.innerHTML = `<p>Error loading content: ${error.message}</p>`;
          modal.style.display = "flex";
        });
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalBody.innerHTML = ""; // Clear content
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", event => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalBody.innerHTML = ""; // Clear content
    }
  });
});