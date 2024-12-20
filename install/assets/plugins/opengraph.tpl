//<?php
/**
 * OpenGraph Image
 *
 * OpenGraph Image
 *
 * @category    plugin
 * @internal    @events OnManagerMenuPrerender
 * @internal    @modx_category Content
 * @internal    @properties 
 * @internal    @disabled 0
 * @internal    @installset base
 */

/**
 * OpenGraph Image
 *
 * OpenGraph Image
 *
 * @category    plugin
 * @internal    @events OnManagerMenuPrerender
 * @internal    @modx_category Content
 * @internal    @properties 
 * @internal    @disabled 0
 * @internal    @installset base
 */
if ($modx->event->name == 'OnManagerMenuPrerender') {
	$mid = $modx->db->getValue($modx->db->select('id', $modx->getFullTablename('site_modules'), "name = 'RenderOpenGraphImage'"));
	$menuparams = [
		'render_ogimage',
		'main',
		'<i class="fa fa-image"></i>' . 'OpenGraph Image',
		'index.php?a=112&id=' . $mid,
		'RenderOpenGraphImage',
		'',
		'',
		'main',
		0,
		35,
		''
	];
	$params['menu']['render_ogimage'] = $menuparams;
	$modx->event->output(serialize($params['menu']));
}
