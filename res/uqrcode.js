let uQRCode={};!function(){function t(t){this.mode=r.MODE_8BIT_BYTE,this.data=t}function e(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=new Array}t.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},e.prototype={addData:function(e){var r=new t(e);this.dataList.push(r),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){var t=1;for(t=1;t<40;t++){for(var e=C.getRSBlocks(t,this.errorCorrectLevel),r=new p,o=0,n=0;n<e.length;n++)o+=e[n].dataCount;for(n=0;n<this.dataList.length;n++){var s=this.dataList[n];r.put(s.mode,4),r.put(s.getLength(),g.getLengthInBits(s.mode,t)),s.write(r)}if(r.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,r){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[o][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,r),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=e.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var o=-1;o<=7;o++)e+o<=-1||this.moduleCount<=e+o||(this.modules[t+r][e+o]=0<=r&&r<=6&&(0==o||6==o)||0<=o&&o<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=o&&o<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var o=g.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},createMovieClip:function(t,e,r){var o=t.createEmptyMovieClip(e,r);this.make();for(var n=0;n<this.modules.length;n++)for(var s=1*n,i=0;i<this.modules[n].length;i++){var a=1*i;this.modules[n][i]&&(o.beginFill(0,100),o.moveTo(a,s),o.lineTo(a+1,s),o.lineTo(a+1,s+1),o.lineTo(a,s+1),o.endFill())}return o},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=g.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],n=t[r];if(null==this.modules[o][n])for(var s=-2;s<=2;s++)for(var i=-2;i<=2;i++)this.modules[o+s][n+i]=-2==s||2==s||-2==i||2==i||0==s&&0==i}},setupTypeNumber:function(t){for(var e=g.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(r=0;r<18;r++){o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=g.getBCHTypeInfo(r),n=0;n<15;n++){var s=!t&&1==(o>>n&1);n<6?this.modules[n][8]=s:n<8?this.modules[n+1][8]=s:this.modules[this.moduleCount-15+n][8]=s}for(n=0;n<15;n++){s=!t&&1==(o>>n&1);n<8?this.modules[8][this.moduleCount-n-1]=s:n<9?this.modules[8][15-n-1+1]=s:this.modules[8][15-n-1]=s}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,o=this.moduleCount-1,n=7,s=0,i=this.moduleCount-1;i>0;i-=2)for(6==i&&i--;;){for(var a=0;a<2;a++)if(null==this.modules[o][i-a]){var u=!1;s<t.length&&(u=1==(t[s]>>>n&1)),g.getMask(e,o,i-a)&&(u=!u),this.modules[o][i-a]=u,-1==--n&&(s++,n=7)}if((o+=r)<0||this.moduleCount<=o){o-=r,r=-r;break}}}},e.PAD0=236,e.PAD1=17,e.createData=function(t,r,o){for(var n=C.getRSBlocks(t,r),s=new p,i=0;i<o.length;i++){var a=o[i];s.put(a.mode,4),s.put(a.getLength(),g.getLengthInBits(a.mode,t)),a.write(s)}var u=0;for(i=0;i<n.length;i++)u+=n[i].dataCount;if(s.getLengthInBits()>8*u)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*u+")");for(s.getLengthInBits()+4<=8*u&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*u||(s.put(e.PAD0,8),s.getLengthInBits()>=8*u));)s.put(e.PAD1,8);return e.createBytes(s,n)},e.createBytes=function(t,e){for(var r=0,o=0,n=0,s=new Array(e.length),i=new Array(e.length),a=0;a<e.length;a++){var u=e[a].dataCount,l=e[a].totalCount-u;o=Math.max(o,u),n=Math.max(n,l),s[a]=new Array(u);for(var h=0;h<s[a].length;h++)s[a][h]=255&t.buffer[h+r];r+=u;var f=g.getErrorCorrectPolynomial(l),c=new m(s[a],f.getLength()-1).mod(f);i[a]=new Array(f.getLength()-1);for(h=0;h<i[a].length;h++){var d=h+c.getLength()-i[a].length;i[a][h]=d>=0?c.get(d):0}}var C=0;for(h=0;h<e.length;h++)C+=e[h].totalCount;var p=new Array(C),v=0;for(h=0;h<o;h++)for(a=0;a<e.length;a++)h<s[a].length&&(p[v++]=s[a][h]);for(h=0;h<n;h++)for(a=0;a<e.length;a++)h<i[a].length&&(p[v++]=i[a][h]);return p};for(var r={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},o={L:1,M:0,Q:3,H:2},n=0,s=1,i=2,a=3,u=4,l=5,h=6,f=7,g={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;g.getBCHDigit(e)-g.getBCHDigit(g.G15)>=0;)e^=g.G15<<g.getBCHDigit(e)-g.getBCHDigit(g.G15);return(t<<10|e)^g.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;g.getBCHDigit(e)-g.getBCHDigit(g.G18)>=0;)e^=g.G18<<g.getBCHDigit(e)-g.getBCHDigit(g.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return g.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case n:return(e+r)%2==0;case s:return e%2==0;case i:return r%3==0;case a:return(e+r)%3==0;case u:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case l:return e*r%2+e*r%3==0;case h:return(e*r%2+e*r%3)%2==0;case f:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new m([1],0),r=0;r<t;r++)e=e.multiply(new m([1,c.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case r.MODE_NUMBER:return 10;case r.MODE_ALPHA_NUM:return 9;case r.MODE_8BIT_BYTE:case r.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case r.MODE_NUMBER:return 12;case r.MODE_ALPHA_NUM:return 11;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case r.MODE_NUMBER:return 14;case r.MODE_ALPHA_NUM:return 13;case r.MODE_8BIT_BYTE:return 16;case r.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;o<e;o++)for(var n=0;n<e;n++){for(var s=0,i=t.isDark(o,n),a=-1;a<=1;a++)if(!(o+a<0||e<=o+a))for(var u=-1;u<=1;u++)n+u<0||e<=n+u||0==a&&0==u||i==t.isDark(o+a,n+u)&&s++;s>5&&(r+=3+s-5)}for(o=0;o<e-1;o++)for(n=0;n<e-1;n++){var l=0;t.isDark(o,n)&&l++,t.isDark(o+1,n)&&l++,t.isDark(o,n+1)&&l++,t.isDark(o+1,n+1)&&l++,0!=l&&4!=l||(r+=3)}for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(o,n)&&!t.isDark(o,n+1)&&t.isDark(o,n+2)&&t.isDark(o,n+3)&&t.isDark(o,n+4)&&!t.isDark(o,n+5)&&t.isDark(o,n+6)&&(r+=40);for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(o,n)&&!t.isDark(o+1,n)&&t.isDark(o+2,n)&&t.isDark(o+3,n)&&t.isDark(o+4,n)&&!t.isDark(o+5,n)&&t.isDark(o+6,n)&&(r+=40);var h=0;for(n=0;n<e;n++)for(o=0;o<e;o++)t.isDark(o,n)&&h++;return r+=10*(Math.abs(100*h/e/e-50)/5)}},c={glog:function(t){if(t<1)throw new Error("glog("+t+")");return c.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return c.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},d=0;d<8;d++)c.EXP_TABLE[d]=1<<d;for(d=8;d<256;d++)c.EXP_TABLE[d]=c.EXP_TABLE[d-4]^c.EXP_TABLE[d-5]^c.EXP_TABLE[d-6]^c.EXP_TABLE[d-8];for(d=0;d<255;d++)c.LOG_TABLE[c.EXP_TABLE[d]]=d;function m(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}function C(t,e){this.totalCount=t,this.dataCount=e}function p(){this.buffer=new Array,this.length=0}m.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var o=0;o<t.getLength();o++)e[r+o]^=c.gexp(c.glog(this.get(r))+c.glog(t.get(o)));return new m(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=c.glog(this.get(0))-c.glog(t.get(0)),r=new Array(this.getLength()),o=0;o<this.getLength();o++)r[o]=this.get(o);for(o=0;o<t.getLength();o++)r[o]^=c.gexp(c.glog(t.get(o))+e);return new m(r,0).mod(t)}},C.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],C.getRSBlocks=function(t,e){var r=C.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var o=r.length/3,n=new Array,s=0;s<o;s++)for(var i=r[3*s+0],a=r[3*s+1],u=r[3*s+2],l=0;l<i;l++)n.push(new C(a,u));return n},C.getRsBlockTable=function(t,e){switch(e){case o.L:return C.RS_BLOCK_TABLE[4*(t-1)+0];case o.M:return C.RS_BLOCK_TABLE[4*(t-1)+1];case o.Q:return C.RS_BLOCK_TABLE[4*(t-1)+2];case o.H:return C.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},p.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},uQRCode={errorCorrectLevel:o,defaults:{size:354,margin:0,backgroundColor:"#ffffff",foregroundColor:"#000000",fileType:"png",errorCorrectLevel:o.H,typeNumber:-1},make:function(t){return new Promise((r,o)=>{var n={canvasId:t.canvasId,componentInstance:t.componentInstance,text:t.text,size:this.defaults.size,margin:this.defaults.margin,backgroundColor:this.defaults.backgroundColor,foregroundColor:this.defaults.foregroundColor,fileType:this.defaults.fileType,errorCorrectLevel:this.defaults.errorCorrectLevel,typeNumber:this.defaults.typeNumber};if(t)for(var s in t)n[s]=t[s];(t=n).canvasId?function(){var n=new e(t.typeNumber,t.errorCorrectLevel);n.addData(function(t){for(var e,r="",o=0;o<t.length;o++)(e=t.charCodeAt(o))>=1&&e<=127?r+=t.charAt(o):e>2047?(r+=String.fromCharCode(224|e>>12&15),r+=String.fromCharCode(128|e>>6&63),r+=String.fromCharCode(128|e>>0&63)):(r+=String.fromCharCode(192|e>>6&31),r+=String.fromCharCode(128|e>>0&63));return r}(t.text)),n.make();var s=uni.createCanvasContext(t.canvasId,t.componentInstance);s.setFillStyle(t.backgroundColor),s.fillRect(0,0,t.size,t.size);for(var i=(t.size-2*t.margin)/n.getModuleCount(),a=i,u=0;u<n.getModuleCount();u++)for(var l=0;l<n.getModuleCount();l++){var h=n.isDark(u,l)?t.foregroundColor:t.backgroundColor;s.setFillStyle(h);var f=Math.round(l*i)+t.margin,g=Math.round(u*a)+t.margin,c=Math.ceil((l+1)*i)-Math.floor(l*i),d=Math.ceil((u+1)*i)-Math.floor(u*i);s.fillRect(f,g,c,d)}setTimeout(function(){s.draw(!1,void setTimeout(function(){uni.canvasToTempFilePath({canvasId:t.canvasId,fileType:t.fileType,width:t.size,height:t.size,destWidth:t.size,destHeight:t.size,success:function(e){let o,n=e.tempFilePath;o=n,t.success&&t.success(o),r(o);const s=plus.io.convertLocalFileSystemURL(n);let i=new plus.io.FileReader;if(i.readAsDataURL(s),i.onloadend=(e=>{o=e.target.result,t.success&&t.success(o),r(o)}),uni.getFileSystemManager().readFile({filePath:n,encoding:"base64",success:e=>{o="data:image/png;base64,"+e.data,t.success&&t.success(o),r(o)}}),plus){const e=plus.io.convertLocalFileSystemURL(n);let s=new plus.io.FileReader;s.readAsDataURL(e),s.onloadend=(e=>{o=e.target.result,t.success&&t.success(o),r(o)})}else uni.request({url:n,method:"GET",responseType:"arraybuffer",success:e=>{o=`data:image/png;base64,${uni.arrayBufferToBase64(e.data)}`,t.success&&t.success(o),r(o)}})},fail:function(e){t.fail&&t.fail(e),o(e)},complete:function(e){t.complete&&t.complete(e)}},t.componentInstance)},t.text.length+100))},150)}():console.error("uQRCode: Please set canvasId!")})}}}();export default uQRCode;