var Color = function(n, c) {
  var name;
  var color;
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
  var isMobile;

  var checkMobile = function() {
    if (screen.width < 481) {
      isMobile = true;
    } else {
      isMobile = false;
    }
    console.log(isMobile);
  }

  var updateQuantity = function(deltaQty){
    // console.log('uc', quantity, deltaQty);
    oldQty = quantity;
    quantityInput.value = quantity = Math.max((quantity+deltaQty), 0);

    if (quantity !== 0 && oldQty === 0) {
      createDonut();

      // Add 'selected indicator (✓)' to the color bar
      selectedIndicator = document.createElement('img');
      selectedIndicator.src = dir + "modules/c1b291cb852/checked-sign.png";
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
      donutContainer.style.backgroundImage = 'url('+ dir+color+')';
      donutContainer.style.backgroundSize = 'cover';
    }

    var donut = document.createElement('img');
    donut.src = dir + "modules/c1b291cb852/donut.png";
    donut.classList.add('c1-donut');
    donutContainer.appendChild(donut);

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

  var removeDonut = function(){
    chosenItem.removeEventListener('transitionend', removeDonut);
    chosenList.removeChild(chosenItem);
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

  var create = function(colorName, colorValue) {
    name = colorName;
    color = colorValue;
    colorBar = document.createElement('li');
    colorBar.id = 'c1-' + name + '1';
    if (color.charAt(0) === '#') {
      colorBar.style.backgroundColor = color;
    } else {
      colorBar.style.backgroundImage = 'url(' + dir + color + ')';
    }
    list.appendChild(colorBar);

    quantityPanel = document.createElement('div');
    quantityPanel.classList.add('c1-qty-panel');
    colorBar.appendChild(quantityPanel);

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
  var keyboardEvent = document.createEvent("KeyboardEvent");
  var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

  keyboardEvent[initMethod](
                     "keydown", // event type : keydown, keyup, keypress
                      true, // bubbles
                      true, // cancelable
                      window, // viewArg: should be window
                      false, // ctrlKeyArg
                      false, // altKeyArg
                      false, // shiftKeyArg
                      false, // metaKeyArg
                      13, // keyCodeArg : unsigned long the virtual key code, else 0
                      0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
  );

  var removeAll = function(evt) {
    var item = evt.item; // <-- to jest dom node donuta
    // ALL THE CODE THAT SELECTS INPUT & UPDATS IT"S VALUE SHOULD GO HERE
    console.log(item.id);
    var colorBar = document.getElementById('c1-' + item.id + '1');
    colorBar.getElementsByTagName('input')[0].value = 0;
    var checkedSign = colorBar.getElementsByTagName('img')[0];
    colorBar.removeChild(checkedSign);
    var trashList = document.getElementById('c1-trash-list');
    trashList.removeChild(item);
    colorBar.classList.remove('donut-hover');
    colorBar.getElementsByTagName('input')[0].focus();
    colorBar.getElementsByTagName('input')[0].dispatchEvent(keyboardEvent);
  }

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
  checkMobile();
  window.addEventListener('resize', checkMobile);

  create(n, c);
};

var stickList = function() {
  var windowTop = window.scrollY;
  var chosenList = document.getElementsByClassName('c1-chosen-colors')[0];
  var stickAnchor = document.getElementsByClassName('c1-main-container')[0];
  var listTop = stickAnchor.offsetTop + 320; // I don't know why 320px but it's working
  if (windowTop > listTop) {
    chosenList.classList.add('sticky');
  } else {
    chosenList.classList.remove('sticky');
  }
}

window.addEventListener('scroll', stickList);
