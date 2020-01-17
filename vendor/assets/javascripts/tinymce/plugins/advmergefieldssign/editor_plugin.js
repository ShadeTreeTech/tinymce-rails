/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('advmergefieldssign');

	tinymce.create('tinymce.plugins.AdvMergeFieldsSignPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceHover');
			ed.addCommand('mceAdvMergeSignFields', function(){
//				var sel=ed.selection;
//				var sel_node = sel.getNode();
//				var hover_span = ed.dom.getParent(sel_node, "SPAN.incite_hover");
//				if (hover_span == null){
//					var action = 'insert'
//				}
//				else {
//					var action = 'update?id='+ ed.dom.getAttrib(hover_span, 'hover_id');
//				}

//console.debug('ed:');
//console.debug(ed);
var m=ed.getParam("advmergefieldssign_mode");
//alert(m);
var paramSize = ed.getParam('advmergefieldssign_dialog_size');
if(paramSize === null || paramSize === undefined) {
	paramSize = { width: 480, height: 540 }; // default size
}
console.debug('Set editor custom size to %d x %d', paramSize.width, paramSize.height);
var origin_host=ed.getParam("advmergefieldssign_origin_host");
var query = [
	`mode=${m}`,
	`api_server_url=${origin_host}`
];
				var server_url=(url.match(/^.+?:\/\/.+?\//ig));
				ed.windowManager.open({
					file : `${server_url}signature/mergefields_popup_signature?${query.join('&')}`,
					width : paramSize.width,
					height : paramSize.height,
					title: ed.getParam("advmergefieldssign_title") || "Advance Merge Field Signed",
					inline : 1
				}, {
					plugin_url : url // Plugin absolute URL
//					,some_custom_arg : 'custom arg' // Custom argument
				});
			});

			// Register example button
			ed.addButton('advmergefieldssign', {
				title : 'advmergefields.desc',
				cmd : 'mceAdvMergeSignFields',
				image : url + '/img/advmergefieldssign.png'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
//			ed.onNodeChange.add(function(ed, cm, n, co){
//				cm.setDisabled('hover', co && !ed.dom.hasClass(n, 'incite_hover'));
//				cm.setActive('link', n.nodeName == 'A' && !n.name);
//				cm.setActive('hover', ed.dom.hasClass(n, 'incite_hover'));
//				return ;
//			});
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
//console.debug('createControl: n,cm');
//console.debug(n);
//console.debug(cm);
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Advanced Merge Fields Signature Dialog',
				author : 'Rost',
				authorurl : 'http://www.shadetreetechnology.com/',
				infourl : 'http://www.shadetreetechnology.com/',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('advmergefieldssign', tinymce.plugins.AdvMergeFieldsSignPlugin);
})();
