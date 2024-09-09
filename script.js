(() => {
  // State variables
  let toDoListArray = [];

  // UI variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input[type='text']");
  const dueDateInput = form.querySelector(".form__input[type='date']");
  const ul = document.querySelector(".toDoList");

  // Confetti setup
  const confettiCanvas = document.getElementById('confettiCanvas');
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];

  // Event listener for form submission
  form.addEventListener('submit', e => {
      e.preventDefault();
      let itemId = String(Date.now());
      let toDoItem = input.value;
      let dueDate = dueDateInput.value;
      addItemToDOM(itemId, toDoItem, dueDate);
      addItemToArray(itemId, toDoItem, dueDate);
      input.value = '';
      dueDateInput.value = '';
  });

  // Functions
  function addItemToDOM(itemId, toDoItem, dueDate) {
      const li = document.createElement('li');
      li.setAttribute("data-id", itemId);

      const text = document.createTextNode(`${toDoItem} (Due: ${dueDate})`);
      li.appendChild(text);

      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Completed';
      completeBtn.className = 'complete-btn';
      completeBtn.onclick = function() {
          li.classList.add('completed');
          triggerConfetti();
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = function() {
          removeItemFromDOM(itemId);
          removeItemFromArray(itemId);
      };

      li.appendChild(completeBtn);
      li.appendChild(deleteBtn);

      ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem, dueDate) {
      toDoListArray.push({ itemId, toDoItem, dueDate });
      console.log(toDoListArray);
  }

  function removeItemFromDOM(id) {
      const li = document.querySelector(`[data-id="${id}"]`);
      ul.removeChild(li);
  }

  function removeItemFromArray(id) {
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
  }

  // Confetti logic
  function triggerConfetti() {
      confettiParticles = [];
      for (let i = 0; i < 100; i++) {
          confettiParticles.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              speedX: (Math.random() - 0.5) * 3,
              speedY: Math.random() * 3 + 1,
              color: `hsl(${Math.random() * 360}, 100%, 50%)`
          });
      }
      animateConfetti();
  }

  function animateConfetti() {
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confettiParticles.forEach((particle, index) => {
          confettiCtx.fillStyle = particle.color;
          confettiCtx.beginPath();
          confettiCtx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
          confettiCtx.fill();
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.y > window.innerHeight) {
              confettiParticles.splice(index, 1);
          }
      });

      if (confettiParticles.length > 0) {
          requestAnimationFrame(animateConfetti);
      }
  }

  window.addEventListener('resize', () => {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
  });

  // Initialize canvas size
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
})();
