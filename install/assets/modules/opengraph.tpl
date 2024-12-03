/**
 * RenderOpenGraphImage
 *
 * Генератор OpenGraph изображения
 *
 * @category    module
 * @internal    @modx_category Content
 * @internal    @installset base
 * @internal    @properties 
 * @internal    @guid 252acad00b679383ca59da6ac78c5365
 * @internal    @icon fa fa-image
 * @internal    @shareparams 1
 * @internal    @overwrite true
 */

/**
 * RenderOpenGraphImage
 *
 * Генератор OpenGraph изображения
 *
 * @category	module
 * @internal	@modx_category Content
 * @internal	@installset base
 * @internal	@properties 
 * @internal	@guid 252acad00b679383ca59da6ac78c5365
 * @internal    @icon fa fa-image
 * @internal	@shareparams 1
 * @internal	@overwrite true
 */
 
require_once MODX_BASE_PATH . 'assets/modules/renderogimage/render.ogimage.php';

if (!$modx->hasPermission('exec_module')) {
    $modx->sendRedirect('index.php?a=106');
}

if (!is_array($modx->event->params)) {
    $modx->event->params = [];
}

$params = $modx->event->params;

(new RenberOpenGraph($params))->processRequest();
