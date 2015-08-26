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
  var selectedIndicator;
  var chosenItem;

  var updateQuantity = function(deltaQty){
    oldQty = quantity;
    quantityPanel.value = quantity = Math.max((quantity+deltaQty), 0);
    if (quantity === 1 && oldQty === 0) {
      createDonut();

      // Add 'selected indicator (✓)' to the color bar
      selectedIndicator = document.createElement('img');
      selectedIndicator.src = dir + "modules/c1b291cb852/checked-sign.png";
      selectedIndicator.classList.add('c1-checked-sign');
      item.appendChild(selectedIndicator);
    } else if (quantity === 0 && chosenItem) {
      chosenList.removeChild(chosenItem);
      chosenItem = null;

      item.removeChild(selectedIndicator);
    }

    qtyDonut.textContent = quantity;
    setChosenListTitle();
  };

  var createDonut = function() {
    chosenItem = document.createElement('li');
    chosenItem.id = name;
    chosenList.appendChild(chosenItem);

    var  item = document.createElement('div');
    item.id = name + '1';
    item.classList.add('c1-donut-div');
    chosenItem.appendChild(item);

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
    qtyDonut.classList.add('c1-qtyDonut');
    qtyDonut.innerHTML = quantity;
    item.appendChild(qtyDonut);
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
      updateQuantity(-1);
    });
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
