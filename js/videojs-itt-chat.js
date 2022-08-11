/*! @name videojs-itt-chat @version 0.0.0 @license UNLICENSED */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsIttChat = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var assertThisInitialized = createCommonjsModule(function (module) {
	  function _assertThisInitialized(self) {
	    if (self === void 0) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }

	    return self;
	  }

	  module.exports = _assertThisInitialized;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var inheritsLoose = createCommonjsModule(function (module) {
	  function _inheritsLoose(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    setPrototypeOf(subClass, superClass);
	  }

	  module.exports = _inheritsLoose;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var defineProperty = createCommonjsModule(function (module) {
	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  module.exports = _defineProperty;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var version = "0.0.0";

	var Plugin = videojs__default['default'].getPlugin('plugin');
	var Dom = videojs__default['default'].dom; // Plugin constants and enums.

	var CSSCustomProperty = {
	  BASE_FONT_SIZE: '--base-font-size',
	  INPUT_FONT_SIZE_RATIO: '--input-font-size-ratio',
	  CONTROL_BAR_HEIGHT: '--control-bar-height',
	  OFFSET_Y: '--offset-y',
	  MIN_WIDTH: '--min-width',
	  OPT_WIDTH: '--opt-width',
	  MAX_WIDTH: '--max-width'
	}; // Default options for the plugin.

	var defaults = {
	  // Message font-size and the base for the most sizes and indents calculation.
	  baseFontSize: 20,
	  // New message input font-size ratio relative to 'baseFontSize'.
	  inputFontSizeRatio: 1,
	  // Height of the controlBar depends on the player visual skin.
	  controlBarHeight: 30,
	  //Optional vertical adjustment.
	  offsetY: 0,
	  // Needed for widget minimum width calculation.
	  minViewportWidth: 320,
	  // Optimal width for wide players (px).
	  optWidth: 600,
	  // Maximum width for wide players (%).
	  maxPercentWidth: 45
	};
	/**
	 * VideoJS chat plugin class (Inventos Test Task)
	 */

	var IttChat = /*#__PURE__*/function (_Plugin) {
	  inheritsLoose(IttChat, _Plugin);

	  /**
	   * IttChat constructor.
	   *
	   * @param {Player} player - The videojs player instance.
	   * @param {Object} options - The plugin options.
	   */
	  function IttChat(player, options) {
	    var _this;

	    _this = _Plugin.call(this, player) || this;

	    defineProperty(assertThisInitialized(_this), "onReady", function () {
	      _this.player.addClass('vjs-videojs-itt-chat');

	      var storedMessages = localStorage.getItem('ITTChat.messages');

	      if (storedMessages) {
	        _this.setState({
	          messages: JSON.parse(storedMessages)
	        });
	      } else {
	        _this.setState({
	          messages: []
	        });
	      }
	    });

	    defineProperty(assertThisInitialized(_this), "onFirstPlaying", function () {
	      var playerEl = _this.player.el();

	      var chatBox = _this.createChatBox();

	      var messageList = _this.createMessageList();

	      var newMessageBox = _this.createNewMessageBox();

	      playerEl.appendChild(chatBox);
	      chatBox.appendChild(messageList);
	      chatBox.appendChild(newMessageBox);

	      _this.applyOptions();

	      messageList.scrollTop = messageList.scrollHeight;
	    });

	    defineProperty(assertThisInitialized(_this), "applyOptions", function () {
	      var baseFontSize = _this.options.baseFontSize + 'px';
	      var inputFontSizeRatio = _this.options.inputFontSizeRatio;
	      var controlBarHeight = _this.options.controlBarHeight + 'px';
	      var offsetY = Math.abs(_this.options.offsetY);
	      var minWidth = _this.options.minViewportWidth - _this.options.baseFontSize + 'px';
	      var optWidth = _this.options.optWidth + 'px';
	      var maxWidth = _this.options.maxPercentWidth + '%';
	      var root = document.documentElement;
	      root.style.setProperty(CSSCustomProperty.BASE_FONT_SIZE, baseFontSize);
	      root.style.setProperty(CSSCustomProperty.INPUT_FONT_SIZE_RATIO, inputFontSizeRatio);
	      root.style.setProperty(CSSCustomProperty.CONTROL_BAR_HEIGHT, controlBarHeight);
	      root.style.setProperty(CSSCustomProperty.OFFSET_Y, offsetY);
	      root.style.setProperty(CSSCustomProperty.MIN_WIDTH, minWidth);
	      root.style.setProperty(CSSCustomProperty.OPT_WIDTH, optWidth);
	      root.style.setProperty(CSSCustomProperty.MAX_WIDTH, maxWidth);
	    });

	    defineProperty(assertThisInitialized(_this), "createChatBox", function () {
	      var chatBox = Dom.createEl('div', {
	        className: 'vjs-chatbox'
	      });
	      return chatBox;
	    });

	    defineProperty(assertThisInitialized(_this), "createMessageList", function () {
	      var messageList = Dom.createEl('ul', {
	        className: 'vjs-chatbox-list'
	      });

	      _this.state.messages.forEach(function (message) {
	        var messageEl = Dom.createEl('li', {
	          className: 'vjs-chatbox-message',
	          innerText: message
	        });
	        messageList.appendChild(messageEl);
	      });

	      return messageList;
	    });

	    defineProperty(assertThisInitialized(_this), "createNewMessageBox", function () {
	      var newMessageBox = Dom.createEl('div', {
	        className: 'vjs-chatbox-new'
	      });

	      var newMessageInput = _this.createNewMessageInput();

	      var newMessageSendButton = _this.createNewMessageSendButton();

	      newMessageBox.appendChild(newMessageInput);
	      newMessageBox.appendChild(newMessageSendButton);
	      return newMessageBox;
	    });

	    defineProperty(assertThisInitialized(_this), "createNewMessageInput", function () {
	      var newMessageInput = Dom.createEl('input', {
	        className: 'vjs-chatbox-new-input',
	        type: 'text',
	        placeholder: 'Type and send...'
	      });
	      newMessageInput.addEventListener('keyup', _this.sendMessage);
	      return newMessageInput;
	    });

	    defineProperty(assertThisInitialized(_this), "createNewMessageSendButton", function () {
	      var newMessageSendButton = Dom.createEl('button', {
	        className: 'vjs-chatbox-new-send',
	        type: 'button'
	      });
	      newMessageSendButton.addEventListener('click', _this.sendMessage);
	      return newMessageSendButton;
	    });

	    defineProperty(assertThisInitialized(_this), "updateMessageList", function () {
	      var messageList = Dom.$('.vjs-chatbox-list', _this.player.el());
	      if (!messageList) return;
	      var newMessage = _this.state.messages[_this.state.messages.length - 1];
	      var messageEl = Dom.createEl('li', {
	        className: 'vjs-chatbox-message',
	        innerText: newMessage
	      });
	      messageList.appendChild(messageEl);
	      messageList.scrollTop = messageList.scrollHeight;
	    });

	    defineProperty(assertThisInitialized(_this), "sendMessage", function (event) {
	      var newMessageInput = Dom.$('.vjs-chatbox-new-input', _this.player.el());
	      if (!newMessageInput.value) return;
	      var targetIsInput = event.target.tagName === 'INPUT';
	      var targetIsButton = event.target.tagName === 'BUTTON';
	      var enterIsPressed = event.code === 'Enter';

	      if (targetIsInput && enterIsPressed || targetIsButton) {
	        _this.saveNewMessage(newMessageInput.value);

	        newMessageInput.value = '';
	      }
	    });

	    defineProperty(assertThisInitialized(_this), "saveNewMessage", function (newMessage) {
	      _this.setState({
	        messages: [].concat(_this.state.messages, [newMessage])
	      });

	      localStorage.setItem('ITTChat.messages', JSON.stringify(_this.state.messages));
	    });

	    _this.options = videojs__default['default'].mergeOptions(defaults, options);

	    _this.player.on('ready', _this.onReady);

	    _this.player.one('playing', _this.onFirstPlaying);

	    _this.on('statechanged', _this.updateMessageList);

	    return _this;
	  }

	  return IttChat;
	}(Plugin); // Default values for the plugin's `state` object.


	IttChat.defaultState = {}; // Include the version number.

	IttChat.VERSION = version; // Register the plugin with video.js.

	videojs__default['default'].registerPlugin('ittChat', IttChat);

	return IttChat;

})));
