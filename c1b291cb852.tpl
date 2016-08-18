{if $enable === 1}
  <link href="{$base_dir}modules/c1b291cb852/color-picker2.css" rel="stylesheet">
  <script src="{$base_dir}modules/c1b291cb852/Sortable.min.js"></script>
  <div class='c1-main-container'>
    <div class='c1-available-colors'>
      <ul id='c1-color-list'>
      </ul>
    </div>
    <div class='c1-chosen-colors'>
      <h4 id='c1-chosen-list-title'></h4>
      <ul id='c1-chosen-list'>
      </ul>
      <ul id='c1-trash-list'>
        <li class="c1-li-title"></li>
      </ul>
    </div>
    <br style='clear: both'>
  </div>
  <script src="{$base_dir}modules/c1b291cb852/color-picker.js"></script>
  <script src="{$base_dir}modules/c1b291cb852/spectrum.js"></script>
  <script>

  // qweqwe

  // chosen color list title when empty/filled list
  var colorListTitleEmpty = '{l s='Choose colors' mod='c1b291cb852'}';
  var colorListTitleFilled = '{l s='Your colors:' mod='c1b291cb852'}';

  {literal}
  var C1 = {
    dir: baseDir,
    qtyObject: {},
    product: {
  {/literal}
      id: {$product->id},
      price: ({$product->price}*1.23).toFixed(2)
  {literal}
    }
  };

  (function(){
  var createColors = function(){
  {/literal}

    {foreach from=$combinations key=id item=combination}
      {if strpos($combination.group_name, "Color") !== false && $combination.quantity > 0}
        new Color(
          '{$combination.id_product_attribute}',
          '{$combination.attribute_name}',
          '{$combination.color_value}',
          parseFloat({$combination.price}*1.23).toFixed(2),
          C1.qtyObject['{$combination.attribute_name}'] || 0
        );
      {/if}
    {/foreach}

  {literal}
  };

  $.ajax({
        type: 'POST',
        headers: { "cache-control": "no-cache" },
        url: baseUri + '?rand=' + new Date().getTime(),
        async: true,
        cache: false,
        dataType : "json",
        data: 'controller=cart&ajax=true&token=' + static_token,
        success: function(jsonData)
        {
            jsonData.products.forEach(function(product){
              C1.qtyObject[product.attributes] = product.quantity;
            });

            createColors();
        }
      });
  })();
  {/literal}
  </script>
{/if}
