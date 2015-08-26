<link href="{$base_dir}modules/c1b291cb852/color-picker2.css" rel="stylesheet">
<script src="{$base_dir}modules/c1b291cb852/Sortable.min.js"></script>
<div class='c1-main-container'>
  <div class='c1-available-colors'>
    <ul id='c1-color-list'>
    </ul>
  </div>
  <div class='c1-chosen-colors'>
    <h4>Your Cans:</h4>
    <ul id='c1-chosen-list'>
    </ul>
  </div>
  <br style='clear: both'>
</div>
<script>

var dir = '{$base_dir}';
{literal}

var inputUpdate = function(evt){
  var value = evt.target.value;
  var id = evt.target.parentNode.parentNode.id;
  console.log(value, id);
};

var Color = function(name, color) {
  var list = document.getElementById('c1-color-list');
  var item = document.createElement('li');
  list.appendChild(item);
  if (color.charAt(0) === '#') {
 	item.style.backgroundColor = color;
  } else {
  	item.style.backgroundImage = 'url('+ dir+color+')';
  	item.style.backgroundSize = 'cover';
  }
  item.id = 'c1-' + name + '1';

  var quantity = 0;

  var quantityPanel = document.createElement('div');
  item.appendChild(quantityPanel);
  quantityPanel.classList.add('c1-qty-panel')

  var incrementButton = document.createElement('div');
  quantityPanel.appendChild(incrementButton);
  incrementButton.classList.add('c1-button');
  incrementButton.innerHTML = '+';
  var qty = document.createElement('input');
  quantityPanel.appendChild(qty);
  qty.classList.add('c1-qty');
  qty.addEventListener('blur', inputUpdate);
  var decrementButton = document.createElement('div');
  quantityPanel.appendChild(decrementButton);
  decrementButton.classList.add('c1-button');
  decrementButton.innerHTML = '-';

  var itemName = document.createElement('p');
  item.appendChild(itemName);
  itemName.classList.add('c1-color-name');
  itemName.innerHTML = name;

  var chosenList = document.getElementById('c1-chosen-list');

  qty.value = quantity;
  incrementButton.addEventListener('click', function() {
    quantity += 1;
    qty.value = quantity;
    drawInCart();
    var amount = document.getElementById(name + '1');
    amount.getElementsByClassName('c1-qtyDonat')[0].innerHTML = quantity;
    if (quantity === 1 ){
      var picked = document.createElement('img');
      picked.src = dir + "modules/c1b291cb852/checked-sign.png";
      item.appendChild(picked);
      picked.classList.add('c1-checked-sign');
    }
    //amount.innerHTML = quantity;
  });
  decrementButton.addEventListener('click', function() {
    if (quantity === 0){
      return
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
  })

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
  }
  var removeFromCart = function() {
    if (quantity === 0) {
      chosenList.removeChild(document.getElementById(name));
    }
  }

}

var el = document.getElementById('c1-chosen-list');
var sortable = Sortable.create(el);

{/literal}

{foreach from=$combinations key=id item=combination}
  {if strpos($combination.group_name, "Color") !== false}
    new Color('{$combination.attribute_name}', '{$combination.color_value}');
  {/if}
{/foreach}


</script>

<!-- {$colors}
{foreach from=$combinations[0] key=id_attribute item=group_attribute}
  {$id_attribute} - {$group_attribute}<br/>
{/foreach} -->
