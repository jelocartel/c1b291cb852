var colors = [];

var Color = function(id, n, c, p) {
  colors.push({
    name: n,
    color: c,
    extraPrice: p
  });

  var colorId = id;
  var name;
  var color;
  var extraPrice;
  var oldQty = 0;
  var quantity = 0;
  var list = document.getElementById('c1-color-list');
  var chosenList = document.getElementById('c1-chosen-list');
  var listTitle = document.getElementById('c1-chosen-list-title');
  var donutContainer;
  var colorBar;
  var quantityPanel;
  var quantityInput;
  var qtyDonut;
  var selectedIndicator;
  var chosenItem;

  var updateQuantity = function(deltaQty){
    oldQty = quantity;
    quantityInput.value = quantity = Math.max((quantity+deltaQty), 0);

    $.post( "index.php?" + (new Date()), {
      controller: 'cart',
      add: 1,
      ajax: true,
      qty: quantity,
      id_product: 9,
      token: token,
      ipa: colorId
    }).done(function( data ) {
      // not enough products in stock should be handled here as well
      console.log( "Data Loaded: " + data );
    }).fail(function(){
      alert('error, try again.');
    });

    if (quantity !== 0 && oldQty === 0) {
      createDonut();

      // Add 'selected indicator (✓)' to the color bar
      selectedIndicator = document.createElement('img');
      selectedIndicator.src = C1.dir + "modules/c1b291cb852/checked-sign.png";
      selectedIndicator.classList.add('c1-checked-sign');
      colorBar.appendChild(selectedIndicator);

    } else if (quantity === 0 && chosenItem) {
      donutContainer.addEventListener('transitionend', removeDonut);
      donutContainer.classList.remove('active');
    }

    if (qtyDonut) {
      qtyDonut.classList.remove('pulse');
      qtyDonut.textContent = quantity;
      setTimeout(function(){
        qtyDonut.classList.add('pulse');
      }, 100);
    }
  };

  var createDonut = function() {
    chosenItem = document.createElement('li');
    chosenItem.id = name;
    chosenList.appendChild(chosenItem);

    donutContainer = document.createElement('div');
    donutContainer.id = name + '1';
    donutContainer.classList.add('c1-donut-div');
    chosenItem.appendChild(donutContainer);

    if (color.charAt(0) === '#') {
      donutContainer.style.backgroundColor = color;
    } else {
      donutContainer.style.backgroundImage = 'url('+ C1.dir+color+')';
      donutContainer.style.backgroundSize = 'cover';
    }

    var donut = document.createElement('img');
    donut.src = C1.dir + "modules/c1b291cb852/donut.png";
    donut.classList.add('c1-donut');
    donutContainer.appendChild(donut);
    donut.title = name;

    donut.addEventListener('mouseover', function(evt) {
      document.getElementById('c1-' + evt.target.parentNode.id).classList.add('donut-hover');
    });
    donut.addEventListener('mouseout', function(evt) {
      document.getElementById('c1-' + evt.target.parentNode.id).classList.remove('donut-hover');
    });

    qtyDonut = document.createElement('div');
    qtyDonut.classList.add('c1-qtyDonut');
    qtyDonut.innerHTML = quantity;
    donutContainer.appendChild(qtyDonut);

    setTimeout(function(){
      donutContainer.classList.add('active');
      setChosenListTitle();
    }, 100);
  };

  var removeDonut = function() {
    chosenItem.removeEventListener('transitionend', removeDonut);
    chosenItem.parentNode.removeChild(chosenItem);
    chosenItem = null;
    colorBar.removeChild(selectedIndicator);
    setChosenListTitle();
  };

  var inputUpdate = function(evt) {
    var value = parseInt(evt.target.value, 10);
    var id = evt.target.parentNode.parentNode.id;
    if  (evt.keyCode === 13) {
      var delta = Number.isNaN(value) ? 0 : value;
      updateQuantity(delta - quantity);
    }
  };

  var create = function(colorName, colorValue, colorPrice) {
    name = colorName;
    color = colorValue;
    extraPrice = colorPrice;
    colorBar = document.createElement('li');
    colorBar.id = 'c1-' + name + '1';
    if (color.charAt(0) === '#') {
      colorBar.style.backgroundColor = color;
    } else {
      colorBar.style.backgroundImage = 'url(' + C1.dir + color + ')';
    }
    list.appendChild(colorBar);

    quantityPanel = document.createElement('div');
    quantityPanel.classList.add('c1-qty-panel');
    colorBar.appendChild(quantityPanel);

    if (extraPrice > 0 || extraPrice < 0) {
      extraPriceDiv = document.createElement('div');
      colorBar.appendChild(extraPriceDiv);
      extraPriceDiv.classList.add('extra-price');
      var totalPrice = (parseFloat(extraPrice) + parseFloat(C1.product.price)).toFixed(2);
      extraPriceDiv.innerHTML = totalPrice;
    }

    var incrementButton = document.createElement('div');
    incrementButton.classList.add('c1-button');
    incrementButton.textContent = '+';
    quantityPanel.appendChild(incrementButton);

    quantityInput = document.createElement('input');
    quantityInput.classList.add('c1-qty');
    quantityInput.addEventListener('keydown', inputUpdate);
    quantityInput.value = quantity;
    quantityPanel.appendChild(quantityInput);

    var decrementButton = document.createElement('div');
    quantityPanel.appendChild(decrementButton);
    decrementButton.textContent = '-';
    decrementButton.classList.add('c1-button');

    var itemName = document.createElement('p');
    itemName.classList.add('c1-color-name');
    itemName.textContent = name;
    colorBar.appendChild(itemName);

    incrementButton.addEventListener('click', function() {
      updateQuantity(1);
    });
    decrementButton.addEventListener('click', function() {
      updateQuantity(-1);
    });
  };

  var setChosenListTitle = function() {
    if (chosenList.children.length === 0) {
      listTitle.textContent = 'Choose colors';
    } else {
      listTitle.textContent = 'Your colors:';
    }
  };

  // Simulate enter input
  var keyboardEvent = document.createEvent("KeyboardEvent");
  var initMethod = (typeof keyboardEvent.initKeyboardEvent !== 'undefined') ?
                    "initKeyboardEvent" : "initKeyEvent";
  keyboardEvent[initMethod](
    "keydown", true, true, window, false, false, false, false, 13, 0
  );

  var removeAll = function(evt) {
    var item = evt.item;
    var colorBar = document.getElementById('c1-' + item.id + '1');
    var colorBarInput = colorBar.getElementsByTagName('input')[0];
    colorBarInput.focus();
    colorBarInput.value = 0;
    colorBar.classList.remove('donut-hover');
    colorBarInput.dispatchEvent(keyboardEvent);
  };

  Sortable.create(document.getElementById('c1-chosen-list'), {
    animation: 150,
    group: "c1",
    onRemove: removeAll
  });

  Sortable.create(document.getElementById('c1-trash-list'), {
    animation: 150,
    group: "c1",
    filter: ".c1-li-title"
  });

  setChosenListTitle();

  create(n, c, p);
};

window.onload = function(){
  var isMobile;
  var colors = [];
  var spectrum = document.getElementById('c1-spectrum');
  var checkMobile = function() {
    spectrum = document.getElementById('c1-spectrum');
    if (screen.width < 481) {
      isMobile = true;
      if (!spectrum) {
        colorSpectrum();
      }
    } else {
      isMobile = false;
      if (spectrum) {
        spectrum.parentNode.removeChild(spectrum);
      }
    }
  };

  var stickList = function() {
    var spectrum = document.getElementById('c1-spectrum');
    var windowTop = window.scrollY;
    var chosenList = document.getElementsByClassName('c1-chosen-colors')[0];
    var stickAnchor = document.getElementsByClassName('c1-main-container')[0];
    var listTop = stickAnchor.offsetTop + 320; // I don't know why 320px but it's working
    if (windowTop > listTop) {
      chosenList.classList.add('sticky');
      if (spectrum) {
        spectrum.classList.remove('c1-offscreen-hidden');
      }
    } else {
      chosenList.classList.remove('sticky');
      if (spectrum) {
        spectrum.classList.add('c1-offscreen-hidden');
      }
    }
  };

  var setTrashIcon = function() {
    var trashListTitle = document.getElementsByClassName('c1-li-title')[0];
    var trashListIcon = document.createElement('img');
    trashListTitle.appendChild(trashListIcon);
    trashListIcon.src = C1.dir + "modules/c1b291cb852/trash.png";
  };

  var removeBuyNowButtons = function(){
    var priceButtons = document.getElementsByClassName('content_prices')[0];
    priceButtons.parentNode.removeChild(priceButtons);
    priceButtons = '';
  };

  // request structure
  // index.php?rand=rand
  // post data:
  // controller: 'cart'
  // add: 1 //?
  // ajax: "true"
  // qty: qty
  // id_product: id
  // token: toke
  // ipa: combination id?

  removeBuyNowButtons();
  setTrashIcon();
  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('scroll', stickList);
};
