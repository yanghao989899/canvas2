
// 绘制对象 2d
// canvas 标签


// 不同的方法绘制不同的图形 俩各点


function palette(cobj,canvas,copy){
	this.copy=copy;
	this.o=cobj;
	this.canvas=canvas;
	this.width=canvas.width;
	this.height=canvas.height;
	this.style="stroke"; //stroke fill
	this.type="rounded"; //line rect circle(圆) triangle(三角形) pencil(铅笔)
	this.lineWidth=1;
	this.strokeStyle="red";
	this.fillStyle="#345678"; 
	this.status=[];
	this.newstatus=[];
	this.dnum=10; //多变形边数
	this.jnum=20; //多角形角数
	this.rnum=20; //圆角矩形的圆角半径
	/*
		1.鼠标抬起 截图 保留上次绘制结果
		2.鼠标移动填充最后一次截图
		getImageDat(0,0,this.width,this.height) 
		putImageData(imgdata,0,0,0,0,that.width,that.height);
	*/

}

// 初始化
palette.prototype.draw=function(){
	var that=this;
	this.copy.onmousedown=function(e){
		that.init();
 		var dx=e.offsetX;
 		var dy=e.offsetY;
 		document.onmousemove=function(e)
 		{
 			that.o.clearRect(0,0,that.width,that.height);
 			if (that.status.length>0) 
 			{
 				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
 			}
 			var mx=e.offsetX;
 			var my=e.offsetY;
 			that[that.type](dx,dy,mx,my);
 		}
 		document.onmouseup=function()
 		{
 			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			document.onmousemove=null;
			document.onmouseup=null;
 			
 		}
	}
}
/*直线*/
palette.prototype.line=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o.stroke();
}
/*矩形*/
palette.prototype.rect=function(x1,y1,x2,y2){
	var w=x2-x1;
	var h=y2-y1;
	this.o.beginPath();
	this.o.rect(x1+.5,y1+.5,w,h);
	this.o.closePath();
	this.o[this.fillStyle];
	this.o[this.style]();
}
/*圆*/
palette.prototype.circle=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	this.o.beginPath();
	this.o.arc(x1,y1,r,0,Math.PI*2);
	this.o.closePath();
	this.o[this.style]();

}
/*半径计算*/
palette.prototype._r=function(x1,y1,x2,y2){
	// r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	var a=(x2-x1)*(x2-x1);
	var b=(y1-y1)*(y2-y1);
	var c=Math.sqrt(a+b);
	return c
}
/*绘制三角形*/
palette.prototype.triangle=function(x1,y1,x2,y2){
	this.o.beginPath();
	this.o.lineTo(x1,y1);
	this.o.lineTo(x1,y2);
	this.o.lineTo(x2,y2);
	this.o.closePath();
	this.o[this.style]();

}
/*圆角矩形*/
palette.prototype.rounded=function(x1,y1,x2,y2){
	var r=this.rnum;
	this.o.beginPath();
	this.o.moveTo(x1,y2-r);
	this.o.arcTo(x1,y1,x2,y1,r);
	this.o.arcTo(x2,y1,x2,y2,r);
	this.o.arcTo(x2,y2,x1,y2,r);
	this.o.arcTo(x1,y2,x1,y1,r);
	this.o.closePath();
	this.o[this.style]();
	

}


/*改变颜色 样式*/
palette.prototype.init=function(){
	this.o.strokeStyle=this.strokeStyle;
	this.o.fillStyle=this.fillStyle;
	this.o.lineWidth=this.lineWidth;
}
/*多边形*/
palette.prototype.poly=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var n=this.dnum;
	var ang=360/n;
	this.o.beginPath();
	for (var i=0;i<n;i++){
		this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r)
	}
	this.o.closePath();
	this.o[this.style]();
}
/*多角形*/
palette.prototype.polystar=function(x1,y1,x2,y2){
	var r=this._r(x1,y1,x2,y2);
	var r2=r*0.35;
	var n=this.jnum;
	var ang=360/n/2;
	this.o.beginPath();
	for (var i=0;i<2*n;i++){
		if (i%2==0){
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r,y1+Math.sin(ang*Math.PI/180*i)*r)
		}
		else{
			this.o.lineTo(x1+Math.cos(ang*Math.PI/180*i)*r2,y1+Math.sin(ang*Math.PI/180*i)*r2)
		}
	}
	this.o.closePath();
	this.o[this.style]();
}
/*铅笔*/
palette.prototype.pencil=function(){
	var that=this;
	this.copy.onmousedown=function(){
		that.init();
		that.o.beginPath();
		document.onmousemove=function(e){
			if (that.status.length>0) 
 			{
 				that.o.putImageData(that.status[that.status.length-1],0,0,0,0,that.width,that.height);
 			}
			var mx=e.offsetX;
			var my=e.offsetY;
			that.o.lineTo(mx,my);
			that.o.stroke();
		}
		document.onmouseup=function(){
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.o.closePath();
			document.onmousemove=null;
			document.onmouseup=null;
		}
	}
}
/*橡皮擦*/
palette.prototype.earser=function(){
	var that=this;
	var w=10;
	this.copy.onmousedown=function(e){
 		var dx=e.offsetX;
 		var dy=e.offsetY;
 		var a=document.createElement("div");
 		a.style.cssText="width:"+w+"px;height:"+w+"px;position:absolute;border:1px solid red";
 		a.style.left=dx-w/2;
 		a.style.top=dy-w/2;
 		that.copy.parentNode.appendChild(a);
 		document.onmousemove=function(e)
 		{
 			var mx=e.offsetX;
 			var my=e.offsetY;
 			that.o.clearRect(mx-w/2,my-w/2,w,w)
 			a.style.left=mx-w/2+"px";
 			a.style.top=my-w/2+"px";
 		}
 		document.onmouseup=function()
 		{
			that.status.push(that.o.getImageData(0,0,that.width,that.height));
			that.copy.parentNode.removeChild(a);
			document.onmousemove=null;
			document.onmouseup=null;
 			
 		}
	}
}



