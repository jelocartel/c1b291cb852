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
      <li class="c1-li-title">drag here to remove from cart</li>
    </ul>
  </div>
  <br style='clear: both'>
</div>
<script src="{$base_dir}modules/c1b291cb852/color-picker.js"></script>
<script>

var dir = '{$base_dir}';
{foreach from=$combinations key=id item=combination}
  {if strpos($combination.group_name, "Color") !== false && $combination.quantity > 0}
    new Color('{$combination.attribute_name}', '{$combination.color_value}');
  {/if}
{/foreach}

</script>
