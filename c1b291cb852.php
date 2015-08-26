<?php
if (!defined('_PS_VERSION_'))
  exit;

class c1b291cb852 extends Module
{

  private $_html= '';

  function __construct() {
    $this->name = 'c1b291cb852';
    $this->tab = 'front_office_features';
    $this->version = '1.0.0';
    $this->author = 'Jelocartel';
    $this->need_instance = 0;
    $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    $this->bootstrap = true;

    parent::__construct();
    $this->displayName = $this->l('Color picker module');
    $this->description = $this->l('Select colors from the given color spectrum');

    $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
  }

  public function install() {
    parent::install();
    if(!$this->registerHook('displayFooterProduct')) return false;
    return true;
  }

  public function hookDisplayFooterProduct() {

    global $smarty;
    global $cookie;
    global $db;

    $this_product = new Product($_GET['id_product']);
    $combinations = $this_product->getAttributeCombinations($cookie->id_lang);
    for ($i = 0; $i < count($combinations); $i++) {
      $attributeId = new Attribute($combinations[$i]['id_attribute']);
      $combinations[$i]["color_value"] = $attributeId->color == '0' ? 'http://192.168.0.30/img/co/81.jpg' : $attributeId->color;
    }

    $smarty->assign('colors', '$this_product->colors');
    $smarty->assign('our_text', $cookie->id_lang);
    $smarty->assign('combinations', $combinations);
    return $this->display(__FILE__, 'template.tpl');
  }

}
