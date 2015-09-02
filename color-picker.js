var colors = [];

var Color = function(id, n, c, p, q) {
  colors.push({
    name: n,
    color: c,
    extraPrice: p,
    startQuantity: q
  });

  var colorId = id;
  var name;
  var color;
  var extraPrice;
  var startQuantity;
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
  var reqTimeout;

  var updateQuantity = function(deltaQty){
    quantityInput.value = quantity = Math.max((quantity+deltaQty), 0);
    clearTimeout(reqTimeout);

    if (quantity !== 0 && !document.getElementById(name + '1')) {
      if (!document.getElementById(name + '-spinner')) {
        chosenItem = document.createElement('li');
        chosenItem.id = name + '-spinner';
        chosenList.appendChild(chosenItem);

        spinnerContainer = document.createElement('div');
        spinnerContainer.className = 'c1-donut-div active spinner';
        chosenItem.appendChild(spinnerContainer);

        var spinner = document.createElement('img');
        spinner.src = C1.dir + "modules/c1b291cb852/spinner.gif";
        spinner.classList.add('c1-donut');
        spinnerContainer.appendChild(spinner);
      }
    } else {
      var donat = document.getElementById(name);
      var qtyDivUp = donat.getElementsByClassName('c1-qtyDonut')[0];
      qtyDivUp.classList.remove('pulse');
      qtyDivUp.classList.add('qty-update');
      if (!document.getElementById('qty-donut-spinner' + name)) {
        var spin = qtyDivUp.appendChild(document.createElement('img'));
        spin.id = 'qty-donut-spinner' + name;'qty-donut-spinner' + name
        spin.src = C1.dir + "modules/c1b291cb852/spinner.gif";
      }
    }

    reqTimeout = setTimeout(function(){
      $.post( "index.php?rand=" + (+(new Date())), {
        controller: 'cart',
        delete: 1,
        ajax: true,
        id_product: C1.product.id,
        token: token,
        ipa: colorId
      }).done(function( data ) {
        $.post( "index.php?rand=" + (+(new Date())), {
          controller: 'cart',
          add: 1,
          ajax: true,
          qty: quantity,
          id_product: C1.product.id,
          token: token,
          ipa: colorId
        }).done(function( data ) {
          data = JSON.parse(data);
          // not enough products in stock
          if (data.hasError && quantity > 0) {
            ajaxCart.showToaster(data.errors[0], true);
            quantityInput.value = quantity = oldQty;
          } else {
            oldQty = quantity;
            ajaxCart.showToaster();
            if (quantity !== 0 && !document.getElementById(name + '1')) {
              var spinnerToRemove = document.getElementById(name + '-spinner');
              chosenList.removeChild(spinnerToRemove);
              createDonut();
              createSelectedIndicator();

            } else if (quantity === 0 && chosenItem) {
              donutContainer.addEventListener('transitionend', removeDonut);
              donutContainer.classList.remove('active');
            }

            if (qtyDonut) {
              qtyDonut.classList.remove('qty-update');
              qtyDonut.removeChild(qtyDonut.getElementsByTagName('img')[0]);
              qtyDonut.classList.remove('pulse');
              qtyDonut.textContent = quantity;
              setTimeout(function(){
                qtyDonut.classList.add('pulse');
              }, 100);
            }
          }
          ajaxCart.refresh();
        });
      });
    }, 500);
  };

  var createSelectedIndicator = function(){
       // Add 'selected indicator (✓)' to the color bar
    selectedIndicator = document.createElement('img');
    selectedIndicator.src = C1.dir + "modules/c1b291cb852/checked-sign.png";
    selectedIndicator.classList.add('c1-checked-sign');
    colorBar.appendChild(selectedIndicator);
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

  var inputBlur = function(evt){
    inputUpdate(evt, true);
  };

  var inputUpdate = function(evt, force) {
    var value = parseInt(evt.target.value, 10);
    var id = evt.target.parentNode.parentNode.id;
    if  ((evt.keyCode === 13 || force) && quantity !== value) {
      var delta = Number.isNaN(value) ? 0 : value;
      updateQuantity(delta - quantity);
    }
  };

  var create = function(colorName, colorValue, colorPrice, startQuantity) {
    name = colorName;
    color = colorValue;
    extraPrice = colorPrice;
    quantity = startQuantity;
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

    var decrementButton = document.createElement('div');
    quantityPanel.appendChild(decrementButton);
    decrementButton.textContent = '-';
    decrementButton.classList.add('c1-button');

    quantityInput = document.createElement('input');
    quantityInput.classList.add('c1-qty');
    quantityInput.addEventListener('keydown', inputUpdate);
    quantityInput.addEventListener('blur', inputBlur);
    quantityInput.value = startQuantity;
    quantityPanel.appendChild(quantityInput);

    var incrementButton = document.createElement('div');
    incrementButton.classList.add('c1-button');
    incrementButton.textContent = '+';
    quantityPanel.appendChild(incrementButton);

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

    // if items are already in the cart and we're revisiting the page
    // simulate adding to cart without the backend request
    if (startQuantity > 0) {
      createDonut();
      createSelectedIndicator();
    }
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

  create(n, c, p, q);
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
    var priceButtonsParent = priceButtons.parentNode;
    //.removeChild(priceButtons);
    //priceButtons = '';
    priceButtonsParent.innerHTML = '<div style="padding:5px; color: #fff; text-align: center;">Wybierz kolory uzywając panelu kolorów poniżej.</div>';
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
  //refresh();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('scroll', stickList);
};
