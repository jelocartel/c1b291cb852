<!--
{foreach from=$combinations key=id item=combination}
  {if strpos($combination.group_name, "Color") !== false}
    {$combination.attribute_name} <br/>
  {/if}
{/foreach} -->
{$colors}
{foreach from=$combinations[0] key=id_attribute item=group_attribute}
  {$id_attribute} - {$group_attribute}<br/>
{/foreach}
