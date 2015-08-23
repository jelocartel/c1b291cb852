eeelo {$our_text} yo
{foreach from=$combinations key=id item=combination}
  <!-- {foreach from=$combination key=id_attribute item=group_attribute}
    {$id_attribute} - {$combination[$id_attribute]}, {$group_attribute}<br/>
  {/foreach} -->
  {if strpos($combination.group_name, "Color") !== false}
    {$combination.attribute_name} <br/>
  {/if}
{/foreach}
