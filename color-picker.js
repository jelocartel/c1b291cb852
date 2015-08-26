var Color = (function() {
  var name;
  var oldQty = 0;
  var quantity = 0;
  var list = document.getElementById('c1-color-list');
  var chosenList = document.getElementById('c1-chosen-list');
  var item;
  var quantityPanel;

  var updateQuantity = function(deltaQty){
    oldQty = quantity;
    quantityPanel.value = quantity = (quantity+deltaQty);
    drawInCart();
    var amount = document.getElementById(name + '1');
    amount.getElementsByClassName('c1-qtyDonat')[0].textContent = quantity;
    if (quantity === 1 && oldQty === 0){
      var picked = document.createElement('img');
      picked.src = dir + "modules/c1b291cb852/checked-sign.png";
      item.appendChild(picked);
      picked.classList.add('c1-checked-sign');
    }
    setChosenListTitle();
  };

  var inputUpdate = function(evt) {
    var value = evt.target.value;
    var id = evt.target.parentNode.parentNode.id;
    if  (evt.keyCode === 13) {
      alert(parseInt(value, 10));
    }
  };

  var create = function(colorName, color) {
    name = colorName;
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
        amount.getElementsByClassName('c1-qtyDonat')[0].innerHTML = quantity;
        //amount.innerHTML = quantity;
        removeFromCart();
        if (quantity === 0) {
          var picked = item.getElementsByClassName('c1-checked-sign')[0];
          item.removeChild(picked);
        }
      }
      setChosenListTitle();
    });

    var drawInCart = function() {
      if (quantity === 1) {
        var chosenItem = document.createElement('li');
        chosenList.appendChild(chosenItem);
        chosenItem.id = name;
        var  item = document.createElement('div');
        chosenItem.appendChild(item);
        item.id = name + '1';
        item.classList.add('c1-donat-div');
    	  if (color.charAt(0) === '#') {
    	 	item.style.backgroundColor = color;
    	  } else {
    	  	item.style.backgroundImage = 'url('+ dir+color+')';
    	  	item.style.backgroundSize = 'cover';
    	  }
        // item.style.backgroundColor = color;
        var donat = document.createElement('img');
        item.appendChild(donat);
        donat.src = dir + "modules/c1b291cb852/donat.png";
        donat.classList.add('c1-donat');
        var qtyDonat = document.createElement('div');
        item.appendChild(qtyDonat);
        qtyDonat.classList.add('c1-qtyDonat');
        qtyDonat.innerHTML = quantity;
      }
    };
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

  return create;
})();
