var Textor;
(function(g){var b=function(a){this._tokenStack=[];this._languages=a};b.prototype.begin=function(a,b){this._textReader=a;this._tokenStack=[{type:this.readText}];this._languageToken=null;if(null!==b){var c=b.split(":");if(1<c.length){var d=c[0],e=c[1],f=this._languages[d];f&&(f.begin(this._textReader,c[2]),this.push({type:this.readLanguage,mimeType:d,language:f,closeTag:e,contentData:0}))}}};b.prototype.read=function(){this._state=null;this._token=this._tokenStack[this._tokenStack.length-1];return this._token.type===
this.readLanguage?this._token.type.apply(this):{style:this._token.type.apply(this),state:this._state}};b.prototype.readText=function(){if(this._textReader.match("<")){1===this._tokenStack.length&&(this._state="base");if(this._textReader.match("!")){if(this._textReader.match("--"))return this.push({type:this.readComment}),"comment";if(this._textReader.match("[CDATA["))return this.push({type:this.readConstantData}),"literal";this.push({type:this.readDocType});return"punctuation"}this._textReader.match("?")?
this.push({type:this.readProcessingInstruction}):this._textReader.match("/")?this.push({type:this.readEndTag}):this.push({type:this.readStartTag,name:"",hasAttributes:!1});return"punctuation"}if(this._textReader.match("&"))return this.push({type:this.readEntity}),"literal";this._textReader.read();return"text"};b.prototype.readStartTag=function(){if(this._textReader.skipWhitespaces())return this._token.hasAttributes=!0,this.push({type:this.readAttribute,name:"",hasValue:!1}),"text";if(this._textReader.match(">")||
this._textReader.match("/>"))return this.pop(),this.setLanguage(),"punctuation";var a=this._textReader.read();this._token.hasAttributes||(this._token.name+=a);return"element"};b.prototype.readEndTag=function(){if(this._textReader.match(">"))return this.pop(),"punctuation";this._token.name+=this._textReader.read();return"element"};b.prototype.readAttribute=function(){if(this._textReader.skipWhitespaces())return"text";if(this._textReader.match(">"))return this.pop(),this.pop(),this.setLanguage(),"punctuation";
if(this._textReader.match("="))return this.push({type:this.readAttributeValue,value:"",quote:""}),this._token.hasValue=!0,"punctuation";var a=this._textReader.peek();if("/"===a)return this.pop(),"punctuation";this._textReader.read();this._token.hasValue||(this._token.name+=a);return"attribute"};b.prototype.readAttributeValue=function(){var a=this._textReader.peek();if(""===this._token.quote){if("'"===a)return this._textReader.read(),this._token.quote="s","literal";if('"'===a)return this._textReader.read(),
this._token.quote="d","literal";if(this._textReader.skipWhitespaces())return"text";this._token.quote="-"}var b=!1,c="";"s"===this._token.quote&&"'"===a?(this._textReader.read(),this.pop(),c="literal"):"d"===this._token.quote&&'"'===a?(this._textReader.read(),this.pop(),c="literal"):"-"===this._token.quote&&this._textReader.skipWhitespaces()?(this.pop(),c="text"):"-"===this._token.quote&&">"===a&&(this._textReader.read(),this.pop(),b=!0,c="punctuation");if(0===c.length)return this._token.value+=this._textReader.read(),
"literal";var d=this._tokenStack[this._tokenStack.length-1].name.toUpperCase(),a=this._tokenStack[this._tokenStack.length-2].name.toUpperCase();if("TYPE"===d&&"SCRIPT"===a||"TYPE"===d&&"STYLE"===a){var d=this._token.value,e=this._languages[d];e&&(e.begin(this._textReader,null),this._languageToken={type:this.readLanguage,mimeType:d,language:e,closeTag:"</"+a+">",contentData:0})}this.pop();b?(this.pop(),this.setLanguage()):this.push({type:this.readAttribute,name:"",value:!1});return c};b.prototype.readComment=
function(){this.terminate("--\>");return"comment"};b.prototype.readConstantData=function(){this.terminate("]]\>");return"literal"};b.prototype.readEntity=function(){var a=this._textReader.read();("\n"===a||";"===a)&&this.pop();return"literal"};b.prototype.readDocType=function(){return this.terminate(">")?"punctuation":"element"};b.prototype.readProcessingInstruction=function(){return this.terminate("?>")?"punctuation":"literal"};b.prototype.readLanguage=function(){var a=this._textReader.peek();if("<"===
a||"]"===a)if(this.testIgnoreCase("<![CDATA[")?this._token.contentData++:this.testIgnoreCase("]]\>")&&0<this._token.contentData&&this._token.contentData--,0==this._token.contentData&&this.testIgnoreCase(this._token.closeTag))return this.pop(),this.read();a=this._token.language.read();a.state=null!==a.state?this._token.mimeType+":"+this._token.closeTag+":"+a.state:null;return a};b.prototype.push=function(a){this._tokenStack.push(a)};b.prototype.pop=function(){this._tokenStack.pop()};b.prototype.setLanguage=
function(){null!==this._languageToken&&(this.push(this._languageToken),this._languageToken=null)};b.prototype.terminate=function(a){if(this._textReader.match(a))return this.pop(),!0;this._textReader.read();return!1};b.prototype.testIgnoreCase=function(a){this._textReader.save();for(var b=0;b<a.length;b++){var c=this._textReader.read();if(0===c.length||c.toUpperCase()!==a[b].toUpperCase())return this._textReader.restore(),!1}this._textReader.restore();return!0};g.HtmlLanguage=b})(Textor||(Textor={}));
(function(){})(Textor||(Textor={}));(function(){})(Textor||(Textor={}));
