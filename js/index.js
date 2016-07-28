$(function(){
	var $palette=$(".palette");
	var $palBox=$(".pal-box");
	var $divsBtn=$(".palette .pal-item[role]");
	var $add=$("#add");
	var $save=$("#save");
	var $back=$("#back");
	var $clear=$("#clear");
	var $call=$("#call");
	/*新建画布*/
	$add.click(function(){
		var canvas=null;
		var copy=null; //建议定义为全局
		var w=prompt("请输入画布宽度","600");
		var h=prompt("请输入画布高度","600");
		$palBox.css({
			"width":w,
			"height":h
		});
		canvas=$("<canvas id='con'><canvas>");
		canvas.attr("width",w);
		canvas.attr("height",h);
		copy=$("<div id='copy'></div>")
		$palBox.append(canvas).append(copy);
		patt(canvas,copy);
	})

	function patt(con,copy){
		var p=new palette(con[0].getContext("2d"),con[0],copy[0]);
		p.draw();
		$divsBtn.click(function(index){
			var that=this;
			var attr=$(this).attr("role");
			if(attr==="undefined"){
				return;
			}
			else if(attr=="pencil"){
				p.pencil();
			}
			else if (attr=="earser"){
				p.earser();
			}
			
			else{
				p.draw();
				if (attr=="strokeStyle"){
					$(this).change(function(){
						p.strokeStyle=$(this).find('input').val();
					})
					
				}
				else if (attr=="fillStyle"){
					$(this).change(function(){
						p.fillStyle=$(this).find('input').val();
					})
				}
				else if(attr=="fill"||attr=="stroke"){
					p.style=attr;
				}
				else{
					if (attr=="poly"){
						var dnum=prompt("请输入边数","6");
						p.dnum=dnum || 5;
					}
					else if (attr=="polystar"){
						var jnum=prompt("请输入角数","5");
						p.jnum=jnum || 5;
					}
					p.type=attr;
					
					
				}
			}
		})
		/*撤销*/
		$back.click(function(){
			if (p.status.length>1)
			{
				var deldata=p.status.pop();
				p.newstatus.push(deldata);
				p.o.putImageData(p.status[p.status.length-1],0,0,0,0,p.width,p.height);
			}
			else if (p.status.length==1)
			{	
				deldata=p.status.pop();
				p.newstatus.push(deldata);
				p.o.clearRect(0,0,p.width,p.height);
				
			}
			else if(p.status.length<1)
			{
				alert("该画布中没有要撤销的元素");
				return;
			}
		})
		/*取消撤销*/
		$call.click(function(){
			if (p.newstatus.length>0){
				var deldata2=p.newstatus.pop();
				p.status.push(deldata2);
				p.o.putImageData(p.status[p.status.length-1],0,0,0,0,p.width,p.height);
			}
			else{
				alert("亲你刚刚只画到这里");
				return
			}
		})
		/*清空画布*/
		$clear.click(function(){
			if (p.status.length==0)
			{
				alert("你的画布很干净,无需清空");
				return
			}
			else{
				var af=confirm("确定要清空画布吗?");
				if (af==false)
				{
					return
				}
				else{
					p.o.clearRect(0,0,p.width,p.height);
					p.status=[];
				}
			}
			
		})
		/*保存*/
		$save.click(function(){
			var convas=$("#con");
			var base64=convas[0].toDataURL();
			location.href=base64.replace("image/png","image/octet-stream");
		})
	}

	
	
	
})
