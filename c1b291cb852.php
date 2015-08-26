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
    $this->author = 'Misio Pysio';
    $this->need_instance = 0;
    $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);
    $this->bootstrap = true;

    parent::__construct();
    $this->displayName = $this->l('c1b291cb852 module');
    $this->description = $this->l('Description of my module.');

    $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
  }

  public function install() {
    parent::install();
    if(!$this->registerHook('displayFooterProduct')) return false;
    return true;
  }

  public function getContent() {
    global $smarty;

    if(Tools::isSubmit('submit_text')) {

      Configuration::updateValue(
        $this->name.'_our_text',
        Tools::getValue('our_text')
      );

    }

    $smarty->assign('our_text',Configuration::get($this->name.'_our_text'));
    $smarty->assign('uri', $_SERVER['REQUEST_URI']);

    return $this->display(__FILE__, 'admin.tpl');
  }

  private function _generateForm() {

    $textToShow=Configuration::get($this->name.'_text_to_show');
  }

  public function hookDisplayFooterProduct() {

    global $smarty;
    global $cookie;
    global $db;

    $this_product = new Product($_GET['id_product']);
    $combinations = $this_product->getAttributeCombinations($cookie->id_lang);
    $smarty->assign('colors', '$this_product->colors');
    $smarty->assign('our_text', $cookie->id_lang);
    $smarty->assign('combinations', $combinations);
    return $this->display(__FILE__, 'template.tpl');
  }

}
