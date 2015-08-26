var Color = function(n, c) {
  var name;
  var color;
  var oldQty = 0;
  var quantity = 0;
  var list = document.getElementById('c1-color-list');
  var chosenList = document.getElementById('c1-chosen-list');
  var item;
  var quantityPanel;
  var qtyDonut;

  var updateQuantity = function(deltaQty){
    oldQty = quantity;
    quantityPanel.value = quantity = (quantity+deltaQty);
    if (quantity === 1 && oldQty === 0) {
      createDonut();

      // Add 'selected indicator (✓)' to the color bar
      var selectedIndicator = document.createElement('img');
      selectedIndicator.src = dir + "modules/c1b291cb852/checked-sign.png";
      selectedIndicator.classList.add('c1-checked-sign');
      item.appendChild(selectedIndicator);
    }

    qtyDonut.textContent = quantity;
    setChosenListTitle();
  };

  var createDonut = function() {
    var chosenItem = document.createElement('li');
    chosenList.appendChild(chosenItem);
    chosenItem.id = name;
    var  item = document.createElement('div');
    chosenItem.appendChild(item);
    item.id = name + '1';
    item.classList.add('c1-donut-div');
    if (color.charAt(0) === '#') {
      item.style.backgroundColor = color;
    } else {
      item.style.backgroundImage = 'url('+ dir+color+')';
      item.style.backgroundSize = 'cover';
    }

    var donut = document.createElement('img');
    donut.src = dir + "modules/c1b291cb852/donat.png";
    donut.classList.add('c1-donut');
    item.appendChild(donut);

    qtyDonut = document.createElement('div');
    item.appendChild(qtyDonut);
    qtyDonut.classList.add('c1-qtyDonut');
    qtyDonut.innerHTML = quantity;
  };

  var inputUpdate = function(evt) {
    var value = evt.target.value;
    var id = evt.target.parentNode.parentNode.id;
    if  (evt.keyCode === 13) {
      alert(parseInt(value, 10));
    }
  };

  var create = function(colorName, colorValue) {
    name = colorName;
    color = colorValue;
    item = document.createElement('li');
    item.id = 'c1-' + name + '1';
    if (color.charAt(0) === '#') {
      item.style.backgroundColor = color;
    } else {
      item.style.backgroundImage = 'url(' + dir + color + ')';
      item.style.backgroundSize = 'cover'; //XXX
    }
    list.appendChild(item);

    quantityPanel = document.createElement('div');
    quantityPanel.classList.add('c1-qty-panel');
    item.appendChild(quantityPanel);

    var incrementButton = document.createElement('div');
    incrementButton.classList.add('c1-button');
    incrementButton.textContent = '+';
    quantityPanel.appendChild(incrementButton);

    var quantityInput = document.createElement('input');
    quantityInput.classList.add('c1-qty');
    quantityInput.addEventListener('keydown', inputUpdate);
    quantityPanel.appendChild(quantityInput);
    quantityPanel.value = quantity;

    var decrementButton = document.createElement('div');
    quantityPanel.appendChild(decrementButton);
    decrementButton.textContent = '-';
    decrementButton.classList.add('c1-button');

    var itemName = document.createElement('p');
    itemName.classList.add('c1-color-name');
    itemName.textContent = name;
    item.appendChild(itemName);

    incrementButton.addEventListener('click', function() {
      updateQuantity(1);
    });
    decrementButton.addEventListener('click', function() {
      if (quantity === 0){
        return;
      } else {
        quantity -= 1;
        qty.value = quantity;
        var amount = document.getElementById(name+'1');
        amount.getElementsByClassName('c1-qtyDonut')[0].innerHTML = quantity;
        //amount.innerHTML = quantity;
        removeFromCart();
        if (quantity === 0) {
          var picked = item.getElementsByClassName('c1-checked-sign')[0];
          item.removeChild(picked);
        }
      }
      setChosenListTitle();
    });

    var removeFromCart = function() {
      if (quantity === 0) {
        chosenList.removeChild(document.getElementById(name));
      }
    };

  };
  var setChosenListTitle = function() {
    var chosenList = document.getElementById('c1-chosen-list');
    if (chosenList.children.length === 0) {
      document.getElementById('c1-chosen-list-title').innerHTML = 'Choose colors';
    } else {
      document.getElementById('c1-chosen-list-title').innerHTML = 'Your colors:';
    }
  };


  var el = document.getElementById('c1-chosen-list');
  var sortable = Sortable.create(el, {
    animation: 150
  });

  setChosenListTitle();

  create(n, c);
};
