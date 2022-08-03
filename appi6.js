class Users {
    constructor(fullName, department, level, email) {
      this.fullName = fullName;
      this.department = department;
      this.level = level;
      this.email = email;
    }
  }

  class UI {
    addUserToList(user) {
      const list = document.getElementById('user-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${user.fullName}</td>
        <td>${user.department}</td>
        <td>${user.level}</td>
        <td>${user.email}</td>
        <td>
          <input type="button" style="background-color:blue;color:white;width:5em;padding:1em;" class='edit' onClick="onEdit(this)" value="Edit">
          <input type="button" style="background-color:red;color:white;width:5em;padding:1em;" class='delete' onClick="onDelete(this)" value="Delete">
        </td>
      `;
    
      list.appendChild(row);
    }

    deleteUser(target) {
        if(target.className === 'delete') {
          target.parentElement.parentElement.remove();
        }
      }
    
      clearFields() {
        document.getElementById('fullName').value = '';
        document.getElementById('depertment').value = '';
        document.getElementById('level').value = '';
        document.getElementById('email').value = '';
      }
    }

    // Local Storage Class
  class Store {
    static getUsers() {
      let users;
      if(localStorage.getItem('users') === null) {
        users = [];
      } else {
        users = JSON.parse(localStorage.getItem('users'));
      }

  
      return users;
    }

    static displayUsers() {
        const users = Store.getUsers();
    
        users.forEach(function(user){
          const ui  = new UI;
    
          // Add user to UI
          ui.addUserToList(user);
        });
      }

      static addUsers(user) {
        const users = Store.getUsers();
    
        users.push(user);
    
        localStorage.setItem('users', JSON.stringify(users));
      }
  
      static removeUser(email) {
        const users = Store.getUsers();
    
        users.forEach(function(user, index){
         if(user.email === email) {
          users.splice(index, 1);
         }
        });
    
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    // DOM Load Event
  document.addEventListener('DOMContentLoaded', Store.displayUsers);
  
  // Event Listener for add user
  document.getElementById('user-form').addEventListener('submit', function(e){
    
    // Get form values
    const fullName = document.getElementById('fullName').value,
          department = document.getElementById('department').value,
          level = document.getElementById('level').value,
          email = document.getElementById('email').value
          
          
    
    // Instantiate user
    const user = new Users(fullName, department, level, email);
    
    //email check
    checkEmail(email)
    
    // Instantiate UI
    const ui = new UI();
  
    console.log(ui);
   
    // Validate
    if(fullName === '' || department === '' || level === '' || email === '') {
      e.preventDefault();
      // Error alert
      alert('Please fill in all fields or email taken', 'error');
      target.parentElement.parentElement.remove();

    } else {
      // Add user to list
      ui.addUserToList(user);
  
      // Add to LS
      Store.addUsers(user);
      
      // Clear fields
      ui.clearFields();

      //reset form
      document.getElementById("user-form").reset();

    }

    e.preventDefault();
  });

  // Event Listener for delete
  document.getElementById('user-list').addEventListener('click', function(e){
  
    // Instantiate UI
    const ui = new UI();
  
    // Delete user
    ui.deleteUser(e.target);
  
    // Remove from LS
    Store.removeUser(e.target.parentElement.previousElementSibling.textContent);
  

    e.preventDefault();
  });
  
  // Edit function
  function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("department").value = selectedRow.cells[1].innerHTML;
    document.getElementById("level").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    td.parentElement.parentElement.remove();
}

function checkEmail(email) {
  const usersx = Store.getUsers()

  usersx.forEach(function(user){
   if(user.email === email) {
    alert('email already exsit')
    Store.removeUser(e.target.parentElement.previousElementSibling.textContent);
   }
  })
}
