const _scaleplate = function(ID,obj){
	this._canvas = document.createElement("canvas");
	this.ctx = this._canvas.getContext('2d');
	this._dom = document.getElementById(ID);
	this.touch1 = 0;
	if(!this._canvas.getContext) {
		alert("该浏览器不支持canvas");
		return;
	}
	this._canvas.width =300;
	this._canvas.height =50;
	this.data = {
		start:400,end:1000,x:0,num:0,length:1000
	};
	this.ctx.lineWidth = 2;
}
_scaleplate.prototype.init = function(w,h,data){
	let _this = this,_canvas = this._canvas;
	_canvas.width = w || 300;
	_canvas.height = h || 50;
	this.data = data || this.data;
	this.draw();
	_canvas.addEventListener("mousedown",function(e){
		_this.touchstart(e.clientX);
	})
	_canvas.addEventListener("touchstart",function(e){
		_this.touchstart(e.touches[0].clientX);
	})
	_canvas.addEventListener("mousemove",function(e){
		_this.touchmove(e.clientX);
	})
	_canvas.addEventListener("touchmove",function(e){
		_this.touchmove(e.touches[0].clientX);
	})
	_canvas.addEventListener("mouseup",function(e){
		_this.touchend(e.clientX);
	})
	_canvas.addEventListener("touchend",function(e){
		_this.touchend(e.changedTouches[0].clientX);
	})
	this._dom.appendChild(_canvas);
}
_scaleplate.prototype.touchstart = function(e){
	this.touch1 = e;
	this.data.x = 0;
}
_scaleplate.prototype.touchmove = function(e){
	let distance = e - this.touch1;
	console.log(distance)
    this.data.x=distance;
    this.draw();
}
_scaleplate.prototype.touchend = function(){
	console.log(this.data.num)
	this.data.num += this.data.x;
}
_scaleplate.prototype.draw = function(){
	let ctx = this.ctx, count;
      ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      ctx.strokeStyle = "#fff";
      for (let i = 0; i < Math.floor(this.data.start / 10); i++) {
        ctx.fillStyle = (10 * i < this.data.start || 10 * i > this.data.end) ? "rgb(253,117,120)" : "rgb(64,189,255)";
        count = -(10 * i + this.data.x + this.data.num);
        ctx.beginPath();
        ctx.fillRect(count, 0, 10, 50)
        ctx.moveTo(count, 0);
        (i % 10 == 0) ? ctx.lineTo(count, 20) : ctx.lineTo(count, 10);
        ctx.stroke();
        ctx.fill();
      }
      for (let i = 0; i < this.data.length / 10; i++) {
        ctx.fillStyle = (10 * i < this.data.start || 10 * i >= this.data.end) ? "rgb(253,117,120)" : "rgb(64,189,255)";
        count = 10 * i + this.data.x + this.data.num;
        ctx.beginPath();
        ctx.fillRect(count, 0, 10, 50);
        ctx.moveTo(count, 0);
        (i % 10 == 0) ? ctx.lineTo(count, 20) : ctx.lineTo(count, 10);
        ctx.stroke();
        ctx.fill();
      }
      ctx.fillStyle = "#fff";
      ctx.moveTo(150, 10);
      ctx.lineTo(140, 0);
      ctx.lineTo(160, 0);
      ctx.fill();
}

let c =new _scaleplate("scaleplate");
c.init(300,100);