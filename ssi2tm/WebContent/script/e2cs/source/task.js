// JavaScript Document
// E2cs alpha 0.0.16
// Extjs-Event-Calendar Solution 
// task.js
// Author: Carlos Mendez
// Contact: cmendez21@gmail.com  (gmail and gtalk)  | Skype carlos.mendez.21
// --------------------------------------------------------------
// Tasks for Day view  ------------------------------------------
// --------------------------------------------------------------
// 07-Jul-2010
// Added scale property in order to work with day view Scale property 


// --------------------------------------------------------------
//  06/June/2010 
//  changes made in code overall in order to make it work on 3.x  also :) finally you may say 
//  Tested on firefox 3.5, IE6 Other browsers may have issues 
//  we are still testing be aware of new versions and patches  and also report the issues on  skype, gtalk, mail and also Extjs forum thread 2x section for the moment. 
// --------------------------------------------------------------
// 27-Sep-2008
// Minor fixes cause of bugs with element's ID's
// --------------------------------------------------------------
// 04-08-08
// Changes for display on opera 
// Xtemplate object added for Qtip format  
// --------------------------------------------------------------
// Note: this will not work on week view, the beheavior is different
// --------------------------------------------------------------
Ext.ECalendar.daytask = function(config){
	this.renderdatatoUse=[];
	this.previndex=0;
	this.createdelementno=0;
	this.editable=true; 
	this.parentview=null; 											//dayview object
	this.baseBody=null;   											//ext element already created  that contains the tasks in day view 
	this.datehandle=new Date();  									//date to handle 
	this.showQtip=true;												//Show Qtips on tasks
	this.tasksOffset= 5; 	
	this.task_id=0;
	this.task_index=0;
	this.task_subject='';		
	this.task_starts='';
	this.task_ends='';
	this.task_description=''; 
	this.task_zhr=''; 											//0.0.15
	this.task_clsOver=''; 
	this.task_increment=5;
	this.task_width=100; //base Task width 
	this.forceTaskFit= false;										//0.0.14 
	this.totalTasksonView=0;											//0.0.14
	this.customHtml='';												//0.0.13  Feature request  // so it can include custom HTML inside the Task/Event body 
	this.customHTMLinpos= 'before';									//0.0.13  companion porperty of customHtml Where to insert the HTML 
	this.bgcolor='#E0FFA2';			  								//base color
	this.task_format='d-m-Y H:i:s a'; 								//base format on Tasks (qtips) 
	this.moreMenuItems=[];											// Menu items  objects for custom actions 
	this.contextMenuLabels= e2cs.cal_locale.contextMenuLabelsDay;  	// Labels for  Base Menu items
	this.task_useBxStyle= false;										// 0.0.15 (will create border color for the task so it can be noticed the separation
	this.task_useBxcolor= '#225588';									// 0.0.15  companion property for task_useBxStyle
	// added on 0.0.4 
	this.tplqTip= new Ext.XTemplate( '<tpl for=".">{starxl}{startval}<br>{endxl}{endval}<hr color="#003366" noshade>{details}</tpl>' );
	this.ShowMenuItems=[1,1,1,1,1];  //0.0.11 ADD, DELETE, EDIT, NEXT day, PREV DAY 
	this.evenLaunch='dblclick'; 
	this.scale=0;
	Ext.apply(this,config);
	Ext.ECalendar.daytask.superclass.constructor.call(this);
};
Ext.extend(Ext.ECalendar.daytask, Ext.util.Observable, { 
	init: function(calendar,dayview){ 
		this.calx = calendar; 
		this.vday = dayview; 
	},
	render:function(){
		var scalepx = (this.scale==0)?60:30;
		//0.0.16B	
		var m_starttime =  this.calx.currentdate.format('m/d/Y ') + this.vday.startTime ; 
		var m_endtime =    this.calx.currentdate.format('m/d/Y ') + this.vday.endTime   ; 			
		this.totalhours =  this.calx.dateDiff(new Date(m_starttime),new Date(m_endtime),e2cs.dateParts.HOUR); 
		// check if the task hour is Ok 
		var inittimetask  = this.checkTasktime(this.task_starts); 
		var endtimetask   = this.checkTasktime(this.task_ends); 
		var checkbetwdate = this.calx.currentdate.between( new Date(m_starttime), new Date(m_endtime) ); 		
		//initial position for task
		var diffstartinipos = this.calx.dateDiff( new Date(m_starttime), new Date(inittimetask),e2cs.dateParts.MINUTE); 
		if (diffstartinipos<0 ){
			initpos = 0; 
			flagstarttasttext = e2cs.cal_locale.task_LessDaysFromTask; // sample'(-)<br>'; 
		} else { //0.0.16B
			initpos = (this.scale==0)?diffstartinipos:(diffstartinipos/2);
			flagstarttasttext = ''; 
		}
		var diffendpos = this.calx.dateDiff(new Date(m_endtime), new Date(endtimetask),e2cs.dateParts.MINUTE); 		
		diffendpos = (this.scale==0)?diffendpos:(diffendpos/2);
		var testdiff = new Date(endtimetask).add(Date.SECOND,-1);
		 
		var diffposxb = this.calx.dateDiff(testdiff,new Date(m_endtime),e2cs.dateParts.SECOND);
		diffposxb = (this.scale==0)?diffposxb:(diffposxb/2);
		if (diffendpos>0 && diffposxb!=0 ){ 
			endpos = (this.totalhours) * 60;
			endpos = (this.scale==0)?endpos:(endpos/2);
			endpos = Math.abs(initpos - endpos); 
			flagendtasttext = e2cs.cal_locale.task_MoreDaysFromTask; // sample '<br>(+)'; 
	    } else { 
			var tmpdate = new Date(inittimetask); 
			var dtstartday =  new Date(  this.calx.currentdate.format('m/d/Y') + ' ' + this.vday.startTime ); 
			if  (tmpdate<dtstartday) { 
				endpos = this.calx.dateDiff( new Date(m_starttime), new Date(endtimetask) ,e2cs.dateParts.MINUTE); 				
			}  else { 
				endpos = this.calx.dateDiff( new Date(inittimetask), new Date(endtimetask) ,e2cs.dateParts.MINUTE); 
			} 
			endpos = (this.scale==0)?endpos:endpos/2;   
			// VS: fix for situations when task is before start time
			if (endpos<0){ return;}
			flagendtasttext = ''; 			
		} 
		//0.0.16B	
		if (this.customHtml ==null || this.customHtml ==undefined){ 
			var Bfhtmlins = ''; var Afhtmlins = ''; 
		} else { 
			if (this.customHTMLinpos=='before'){ 
				var Bfhtmlins =  this.customHtml; 
				var Afhtmlins = ''; 
			} else if  (this.customHTMLinpos=='after'){ 
				var Bfhtmlins = ''; 
				var Afhtmlins = this.customHtml; 
			} else { 
				var Bfhtmlins = ''; 
				var Afhtmlins = ''; 
			} 
		} 
		this.task_index = (this.vday.tasks.length); 
		if (this.forceTaskFit) {
			this.taskobject = this.baseBody.createChild({ tag: 'div',cls: 'task',	html:Bfhtmlins + flagstarttasttext + this.task_subject  + flagendtasttext + Afhtmlins});			
		} else { 
			this.taskobject = this.baseBody.createChild({ tag: 'div',cls: 'task',	html:Bfhtmlins + flagstarttasttext + this.task_subject  + flagendtasttext + Afhtmlins});
		} 
		this.taskobject.dom.setAttribute('id', this.calx.id + '-ecaltask-' 	+  this.task_index + '');
		this.taskobject.dom.setAttribute('ec_id', '' 		+  this.task_id + '');
		this.taskobject.dom.setAttribute('ec_starts', '' 	+  inittimetask + '');
		this.taskobject.dom.setAttribute('ec_ends', '' 	 	+  endtimetask + '');
		this.taskobject.dom.setAttribute('ec_subject', '' 	+  this.task_subject + '');
		this.taskobject.dom.setAttribute('ec_cnt', '' 		+  this.task_description + '');
		this.taskobject.dom.setAttribute('ec_storeindex', ''+  this.task_index + '');
		this.taskobject.dom.setAttribute('ec_zbr'	, ''+  this.task_zbr + '');
		//this.taskobject.setY(this.baseBody.getY() + initpos); // fix for moredays task and normal tasks		
		if (this.forceTaskFit) {
			this.taskobject.setStyle({top:'' + initpos + 'px' } );	
			this.taskobject.setStyle({height:'' + endpos + 'px' } );
			this.taskobject.setStyle({position:'absolute' } );
			var datarenderthis = null;
			for (var i=0;i<this.renderdatatoUse.length;i++){
				if 	(this.renderdatatoUse[i].taskid==this.task_id){
						datarenderthis=this.renderdatatoUse[i];  //always has to appear its just needed if not report bug to see failure
				}
			}
			if (datarenderthis!=null){
				this.taskobject.setStyle ({width: '' + datarenderthis.ancho + '%'});
				if (Ext.version.substr(0, 1) == "3") { 
					this.taskobject.applyStyles('left:' +  datarenderthis.left  + '%;'); 
				} else { 
					this.taskobject.setStyle ({left:'' +  datarenderthis.left + '%'});
				} 
			} else { // emergency case 
				var overlapping = this.calx.getOtherTasksWx (this.allDayTasks, this.task_subject, new Date(inittimetask), new Date(endtimetask));	
				if (overlapping.number > 1){
					this.taskobject.setStyle ({width: '' + 99/overlapping.number + '%'});
					if (Ext.version.substr(0, 1) == "3") { 
						this.taskobject.applyStyles('left:' +  overlapping.taskIdx  + '%;'); 
					} else { 
						this.taskobject.setStyle ({left:'' + overlapping.taskIdx + '%'});
					}
				} else { 
					this.taskobject.setStyle ({width: '100%'});			
					if (Ext.version.substr(0, 1) == "3") { 
						this.taskobject.setLeft ('' + overlapping.taskIdx + '%');
					} else { 
						this.taskobject.setStyle ({left:'' + overlapping.taskIdx + '%'});
					} 
				}
			}
			var test=11; 	
		} else { 
			this.taskobject.setStyle({top:'' + initpos + 'px' } );		
			if (this.task_useBxStyle){
				this.taskobject.setStyle({border:'1px solid ' + this.task_useBxcolor + '' } ); //0.0.15 set the border 
				if (Ext.isIE){
					this.taskobject.setStyle({height:'' + (endpos) + 'px' } ); 		 //0.0.15  the borders on ie does not affect   the width and heigth
					this.taskobject.setStyle({width :'' + (this.task_width) + 'px' } );//0.0.15
				} else { 
					this.taskobject.setStyle({height:'' + (endpos-2) + 'px' } ); 		 //0.0.15  the border expands the width and heigth
					this.taskobject.setStyle({width :'' + (this.task_width-2) + 'px' } );//0.0.15  the border expands the width and heigth
				} 
			} else { 
				this.taskobject.setStyle({height:'' + (endpos) + 'px' } );
				this.taskobject.setStyle({width :'' + (this.task_width) + 'px' } );
			} 
			if (this.tasksOffset=='auto'){  //havent been in use now it does 0.0.15 
				if (this.task_index<=1){
					var anchoposx = 0; 
				}else{
					tmpoffset = this.task_width; 
					anchoposx= 0;
					for (var x=0;x<=(this.vday.tasks.length-1);x++){ 
						if (x!=0){ anchoposx+= Ext.get(this.calx.id + '-ecaltask-' + (x)).getWidth(false);	}
					}
				} 
			} else {  //is number
				var anchoposx = 0; 
				if (this.task_index<=1){
					var tmpoffset = 0;
				} else { 
					tmpoffset = this.tasksOffset; 
					this.taskobject.setStyle('margin-left' ,  (tmpoffset) + 'px');
				} 
			} 
			newancho=0; 
			for (var x=0;x<=(this.vday.tasks.length);x++){ 
				if (x!=0){	newancho+= Ext.get(this.calx.id + '-ecaltask-' + (x)).getWidth(false);	}
			}
			if (  newancho >this.baseBody.getWidth(false) ){ 
				Ext.get(this.calx.id + '-daybody').setWidth(newancho); 
				Ext.get('tdbaseday').setWidth(newancho); 
			}			
			if (Ext.isOpera) { 	
				/*fix for Opera 9x	*/	
			} else { 
				//this.taskobject.setX(this.baseBody.getX() + anchoposx);
			} 	
		}
		//this.taskobject.setY(this.baseBody.getY() + initpos); // fix for moredays task and normal tasks		
		if (this.bgcolor){ 
			this.taskobject.setStyle('background-color' ,'' + this.bgcolor + ''); 
		} else { 
			this.taskobject.setStyle('background-color' ,'#99CC99'); 
		} 
		if(Ext.isIE){ // bug fix for IE6 didnt show taks cause they ewent at the bottom and also the base day element its at the top  :(  weird IE stuff 
			this.taskobject.setStyle('z-index' ,'3001'); 
		}else{
			this.taskobject.setStyle('z-index' ,'auto');
		}
		if (this.showQtip){ 
			var tmpdate = new Date(inittimetask);  			
			var startlabel = tmpdate.format(this.task_format); 
				tmpdate = new Date(endtimetask);            
			var endlabel =   tmpdate.format(this.task_format); 
			this.taskobject.dom.qtitle= this.task_subject;	
			if (this.task_description==''){ var desctmp = '&nbsp;<br/>&nbsp;'; 	}  else {var desctmp = this.task_description;  } 
			// 0.0.4 new feature Qtip template 	
			var datatip = {starxl:   e2cs.cal_locale.task_qtip_starts,
						   startval: startlabel,
						   endxl:    e2cs.cal_locale.task_qtip_ends, 
						   endval:   endlabel,
						   details:  desctmp,
						   zbr: this.task_zbr ,
						   subject : this.task_subject
						   };
			this.taskobject.dom.qtip = this.tplqTip.apply(datatip);			
		}
		//0.0.11 task_clsOver implemented
		if (this.task_clsOver!=''){ this.taskobject.addClassOnOver(this.task_clsOver); }
		//0.0.11 changed so you can decide wheter click or dobleclick or nothing for the task object
		this.taskobject.addListener(this.evenLaunch, this.onDblclick, this );		
		if (Ext.isOpera){ 
				this.taskobject.addListener('mousedown',this.operabuttons,this); 
		} else { 
				this.taskobject.on('contextmenu',this.oncontextmenu,this, 
					{stopPropagation:true,stopEvent:true,normalized:true,preventDefault:false}
				); //new change though it seems  equal than previous version	
		} 
		if (initpos==0 && endpos>(this.totalhours * scalepx)) { //0.0.15 fix 
			//no resizable cause its all day task or more :P
			//fix for all day example 12/12/2009 00:00 to 12/13/2009 00:00 its all day but can be resizable :) 		
		}  else { //here comes the trouble :P 
			if (this.editable){ 
				if (flagendtasttext==''){ 
					if (Ext.isIE){ var checkie_pinned = true; } else { 	var checkie_pinned = false; } 
					var snap = new Ext.Resizable(this.calx.id + '-ecaltask-' + this.task_index + '', {
						pinned:checkie_pinned,
						width:this.task_width,
						handles: 's',
						heightIncrement:this.task_increment,
						minHeight: 15,
						maxHeight: ((this.totalhours * scalepx) - initpos),
						dynamic: true,
						draggable : true 
					});
					var tmpbody = this.baseBody; 						
					var tmpvday = this.vday;
					var tmptask = this;    			
					var tmpcalendar = this.calx;
					snap.on({
						'resize':{
							fn: function( objthis, width, height, evtObj){ 
								var datatask = tmptask.getTaskarray(objthis.el); 
								var check = tmpcalendar.fireEvent("beforeTaskMove", datatask, tmptask, tmpvday, tmpcalendar);
								if (check){ 
									//0.0.15 updated to accept true value and continue 
									// calc new position for - start time and end time  and updates Task's tags 
									tmptask.applyChange(objthis.el);  
									var newdatatask= tmptask.getTaskarray(objthis.el);  //with updates 
									tmpcalendar.fireEvent("TaskMoved", newdatatask, tmptask, tmpvday, null);// afterChange fires
								} 
							} 
							, scope:this	
						}
					}) ; 
					// if it has moredays (+) or (-) then drag does not apply
					if (flagstarttasttext=='' && flagendtasttext == ''){  
								var taskdrag  = new Ext.dd.DDProxy(this.calx.id + '-ecaltask-' + this.task_index + '','task-group',{xTicks : 0,	yTicks : 5});	
								// needed this vars cause in the endrag this i cant change it  :( 
								var tmpbody = this.baseBody; 	
								var tmpvday = this.vday;
								var tmptask = this;    			
								var tmpcalendar = this.calx;
								// --------------------------------------------------------------------
								taskdrag.startDrag = function(){
									  this.constrainTo( tmpbody.id );
									  this.setXConstraint(0,0,0); 
									  var dragEl = Ext.get(this.getDragEl());
									  var el = Ext.get(this.getEl());
									  dragEl.applyStyles({border:'','z-index':3600});
									  dragEl.update(el.dom.innerHTML);
									  dragEl.addClass('task-drag' + ' dd-proxy');		  
								};
								taskdrag.endDrag = function(){
										var dragEl = Ext.get(this.getDragEl());
										var el = Ext.get(this.getEl());
										var domel = Ext.get(this.handleElId);
										var datatask = tmptask.getTaskarray(domel); 
										// fire event before taskchange
										var check = tmpcalendar.fireEvent("beforeTaskMove", datatask, tmptask, tmpvday,tmpcalendar); 
										if (check){ //0.0.15 updated to accept true value and continue 
											el.setY(dragEl.getY()); // x never changes 
											tmptask.applyChange(domel);  // calc new position for - start time and end time  and updates Task's tags 
											var newdatatask= tmptask.getTaskarray(domel);  //with updates 
											// afterChange fires
											tmpcalendar.fireEvent("TaskMoved", newdatatask, tmptask, tmpvday,this); 
										} else { 
											// restore normal postion if canceled cause nothing is done to update the element to restore normal postion if canceled (beta)
											//	tmptask.resetChange(this);  
											//	** optional function no implementation yet 
										} 	
								};
					} 
				} 
			} 
		} 
	},
	operabuttons: function (evx,elx,obx){
			if (Ext.isOpera){ if (evx.button==2){ this.oncontextmenu(evx,elx,obx); }  
		}
	}, 
	oncontextmenu: function (evx,elx,obx){
		if (Ext.isOpera){ if (evx.button!=2){ return false; } }
		if (this.ShowMenuItems[0]!=true && this.ShowMenuItems[1]!=true && this.ShowMenuItems[2]!=true && this.ShowMenuItems[3]!=true  && this.ShowMenuItems[4]!=true && this.moreMenuItems.length<=0){ return false; }
		if (Ext.version.substr(0, 1) == "2") { evx.stopEvent(); } //  new on 0.0.16 	
		if (  elx.id.indexOf(this.calx.id + '-ecaltask-')<0 ) {  // if not found the check the parent 
			var tmpdata= Ext.get(elx.parentNode.id);			
		}  else {  // FOund a ELX id 
			var tmpdata= Ext.get(elx.id);		
		}	
		var dataTASKtmp = this.getTaskarray(tmpdata); 
		//Send the new event to make logical sense to the contextmenu options 
		var newmenuitems   = this.vday.moreMenuItems; 	
		var toshowOnCXmenu = this.ShowMenuItems; 
		var actionsTaskCX=[]; 
		var testevent =  this.calx.fireEvent("beforeContextMenuTask", "dayview-task",dataTASKtmp,toshowOnCXmenu,actionsTaskCX); 
		if (testevent==false) {//0.0.15 change 
			// actionsTaskCX[0]   Will tellus if we abort the context menu
			// actionsTaskCX[1]   Will tell us if we Apply the logic 
			// actionsTaskCx[2]   Will tell us if we replace the Custom MenuItems 
			// actionsTaskCX[3]   Will contain the buttons or menu items to insert
			// actionsTaskCX[4]   Will contain the new logic to Show basic items on the task 
			if 	(actionsTaskCX[0]==false){  //If false we continue 
				if 	(actionsTaskCX[1]==true){  //If true we apply the new items  instead of the set in day view 
					if (actionsTaskCX[2]==true){ 
						var newmenuitems = actionsTaskCX[3];  // new more menu Items
					} 
					var toshowOnCXmenu = actionsTaskCX[4];		// the new showitems rule 
				} else {
					var newmenuitems   = this.vday.moreMenuItems; 					
					var toshowOnCXmenu = this.ShowMenuItems; 
				} 
			} else {  //abort operation 
				return false; 
			} 
		} else { 
			// do nothing follow as planned 
			var newmenuitems = this.vday.moreMenuItems; 
		} 
	//---------------------------------------------------------------------------
		//var tmpdata= Ext.get(elx.id);
		if (this.menu){ this.menu.removeAll();	}
		this.menu = new Ext.menu.Menu({
			allowOtherMenus : true,
			shadow: false, 
			items:[{id: 'day_ctxbtn_task-add',		iconCls:'x-calendar-day-btnmv_add',		text: this.contextMenuLabels.taskAdd, 	scope:this},
				   {id: 'month_ctxbtn_task-delete', iconCls: 'x-calendar-day-btnmv_delete',	text: this.contextMenuLabels.taskDelete,scope:this},
				   '-',
				   {id:'month_ctxbtn_task-edit',	iconCls: 'x-calendar-day-btnmv_task',	text: this.contextMenuLabels.taskEdit + tmpdata.getAttributeNS('tag','ec_subject'),		scope:this	},
				   '-',
				   {id:'month_ctxbtn_task-go-nd', 	iconCls: 'x-calendar-day-btnmv_nextday',text: this.contextMenuLabels.NextDay,	 scope:this},
				   {id:'month_ctxbtn_task-go-pd', 	iconCls: 'x-calendar-day-btnmv_prevday',text: this.contextMenuLabels.PreviousDay,scope:this}
			]
		});
		if (newmenuitems.length>0) {
			this.menu.add('-'); 
//			for (var i=0; i<newmenuitems.length; i++){
//				// var idmenuitem = this.moreMenuItems[i].id;  0.0.4 bug in custom action sending the id the problem was the last id was returned always				
//				newmenuitems[i].rendered =false; 
//				newmenuitems[i].addListener('click', 
//							function(parx,parz){ 
//									this.onCustomMenuAction(parx.id,Ext.get(elx),this ); //this.onCustomMenuAction( idmenuitem , Ext.get(elx), this ); 0.0.4 bug 
//							}, this); 
//				this.menu.add( newmenuitems[i]);					
//			}
			for (var i=0; i<newmenuitems.length; i++){
				// var idmenuitem = newmenuitems[i].id;  0.0.4 bug in custom action sending the id the problem was the last id was returned always
				newmenuitems[i].rendered =false;
				// 0.0.14 modification to let the user set buttons with menu attached on the context menu 
				// Sepearators could be used also. Note: only one level its allowed
				if (newmenuitems[i].menu==undefined) {  //just plain button 
					newmenuitems[i].rendered =false;
					if (newmenuitems[i].ctype=="Ext.menu.Item"){ 
						if  (newmenuitems[i].hasListener('click')){  // remove previous listeners added 0.0.16 bug fix
							newmenuitems[i].purgeListeners(); 
						}					
						newmenuitems[i].addListener('click', 
									function(parx , parz){ 
											this.onCustomMenuAction( parx.id, Ext.get(elx),this ); 
									}, this); 
					} else { 
						//Ext.menu.BaseItem // do nothing
					} 
					this.menu.add( newmenuitems[i]);
				} else {	
					newmenuitems[i].menu.rendered =false;
					for (var xm=0;xm<newmenuitems[i].menu.items.length;xm++){
						newmenuitems[i].menu.items.items[xm].rendered=false;
						if (newmenuitems[i].menu.items.items[xm].ctype=="Ext.menu.Item"){ 
							if  (newmenuitems[i].menu.items.items[xm].hasListener('click')){  // remove previous listeners added 0.0.16 bug fix
								newmenuitems[i].menu.items.items[xm].purgeListeners(); 
							}					
							newmenuitems[i].menu.items.items[xm].addListener('click', 
										function(parx,parz){ 
												this.onCustomMenuAction( parx.id, Ext.get(elx),this ); 
										}, this);
						} else { 
							//Ext.menu.BaseItem  // do nothing 
						}
					}
					this.menu.add(newmenuitems[i]);
				} 
			}
		} 
		this.menu.items.items[0].addListener('click', function(){ this.onActionTask( 1, Ext.get(elx), this ); 	}, this); 
		this.menu.items.items[1].addListener('click', function(){ this.onActionTask( 2, Ext.get(elx), this ); 	}, this);
		//[2] Sep 
		this.menu.items.items[3].addListener('click', function(){ this.onActionTask( 3, Ext.get(elx), this ); 	}, this); 		
		//[4] Sep
		this.menu.items.items[5].addListener('click', function(){ this.vday.onclicknext_day(); }, this);  //next day
		this.menu.items.items[6].addListener('click', function(){ this.vday.onclickprev_day(); }, this);  //prev day	
		//0.0.11 - check visibility on the menu-items according to the new property 
		//ShowMenuItems:[1,1,1,1,1],  //0.0.11 ADD, DELETE, EDIT, NEXT day, PREV DAY
		if (toshowOnCXmenu[0]!=true){this.menu.items.items[0].hidden=true; } // ADD
		if (toshowOnCXmenu[1]!=true){this.menu.items.items[1].hidden=true; } // DELETE 
		if (toshowOnCXmenu[0]!=true && toshowOnCXmenu[1]!=true){	this.menu.items.items[2].hidden=true;  } //SEPARATOR 1
		if ( toshowOnCXmenu[2]!=true && toshowOnCXmenu[3]!=true & toshowOnCXmenu[4]!=true & newmenuitems.length<=0){
			this.menu.items.items[2].hidden=true; //SEPARATOR 1
		} 
		if (toshowOnCXmenu[2]!=true){ 
				this.menu.items.items[3].hidden=true;  //EDIT 
				this.menu.items.items[4].hidden=true;  //SEPARATOR 2					
		} 
		if  (toshowOnCXmenu[3]!=true && toshowOnCXmenu[4]!=true & newmenuitems.length<=0){  // if no followinf menus appear 
			this.menu.items.items[4].hidden=true;  //SEPARATOR 2					
		} 
		if (toshowOnCXmenu[3]!=true){
				this.menu.items.items[5].hidden=true; // NEXT day
		} 
		if (toshowOnCXmenu[4]!=true){
				this.menu.items.items[6].hidden=true; // PREV DAY
		} 
		if (newmenuitems.length>0) { 
			if (toshowOnCXmenu[3]!=true && toshowOnCXmenu[4]!=true){
				this.menu.items.items[7].hidden=true; //SEPARATOR 3
			}
		} 
		//--------------------------------------------------------------------------
		this.menu.on('hide', this.onContextTaskMenuHide, this);
		// ----------------------------
		if (Ext.version.substr(0, 1) == "2") {	
			this.menu.on('hide', this.onContextTaskMenuHide, this);
			this.menu.showAt( [ evx.getPageX(), evx.getPageY() ] );
		} else { 
			this.menu.on('hide', this.onContextTaskMenuHideNewEXT, this);
			this.menu.showAt( [ evx.clientX,evx.clientY ] );
		}
	}, 
	onContextTaskMenuHideNewEXT: function(obj){ 
		if (Ext.version.substr(0, 1) == "3") {	 // new on 0.0.16 3x compatibility 
			obj.removeAll(); obj.destroy();
		} 
	},
	onContextTaskMenuHide: function (){ /* nothing happens :( */ },
	onCustomMenuAction: function(MenuId,taskEl,TaskObj){
		var datatask = this.getTaskarray(taskEl); 
		this.calx.fireEvent("customMenuAction", MenuId,'day',datatask,taskEl, this.vday); 
		this.menu.hide(); 
	},
	// private use 
	applyChange: function (TaskEl){		
		//recalcs position and Start time and End time  if its from the same date also calcs the new position
		var datael = this.getTaskarray(TaskEl);		
		var initdate = new Date(datael[3]);
		var m_starttime =  this.calx.currentdate.format('m/d/Y ') + this.vday.startTime; 
		var m_endtime =    this.calx.currentdate.format('m/d/Y ') + this.vday.endTime; 					
		var tmpEl =  Ext.get(TaskEl.id); 		
		if (initdate< new Date(m_starttime)){ //we get the difference to get the right date 
		   var minutesmbefore = this.calx.dateDiff( initdate, new Date(m_starttime),e2cs.dateParts.MINUTE); 
		   var newposstart = 0; 		
		   var newposend   = tmpEl.getHeight(); 
  		   newposend = (this.hourScale==0)?newposend:newposend*2; //0.0.16B			   		   
		   var newdateTaskstart = new Date(initdate).add(Date.MINUTE, (minutesmbefore + newposstart) ); 
		   var newdateTaskEnds  = newdateTaskstart.add(Date.MINUTE,newposend);				
		}  else {
			var newposstart =  Math.abs(   tmpEl.getTop() - Ext.get(this.baseBody).getY() ); 
			newposstart = (this.hourScale==0)?newposstart:newposstart*2; //0.0.16B
			var newposend   = tmpEl.getHeight(); 
			newposend = (this.hourScale==0)?newposend:newposend*2; //0.0.16B	
			var newdateTaskstart = new Date(m_starttime).add(Date.MINUTE,newposstart); 
			var newdateTaskEnds  = newdateTaskstart.add(Date.MINUTE,newposend);			
		} 	
		tmpEl.dom.setAttribute('ec_starts', '' 	+  newdateTaskstart.format('m/d/Y H:i:s') + '');  
		tmpEl.dom.setAttribute('ec_ends'  , '' 	+  newdateTaskEnds.format('m/d/Y H:i:s')  + '');
		if (this.showQtip){ 		
			var startlabel = newdateTaskstart.format(this.task_format);            
			var endlabel =   newdateTaskEnds.format(this.task_format); 
			tmpEl.dom.qtip  = e2cs.cal_locale.task_qtip_starts + startlabel + "<br>" + e2cs.cal_locale.task_qtip_ends + endlabel + '<br>' + this.task_description ; 
		} 		
	},
	onActionTask: function (action, taskEl, TaskObj ){
		var datatask = this.getTaskarray(taskEl); 
		switch(action){
			case 1:  //add				
				this.calx.fireEvent("taskAdd",this.calx.currentdate);	
				break; 
			case 2: // delete
				var check = this.calx.fireEvent("beforeTaskDelete", datatask,this.vday );  
				if (check){ //0.0.15 updated to accept true value and continue  
					if (this.calx.fireEvent("onTaskDelete",datatask)==true){ 
						this.calx.fireEvent("afterTaskDelete",datatask,true);
					} else { 
						this.calx.fireEvent("afterTaskDelete",null,false);
					} 
				} 
				break; 
			case 3: //edit
				var check = this.calx.fireEvent("beforeTaskEdit",datatask,this.vday);  
				if (check){ // 0.0.4  - code still missing //0.0.15 updated to accept true value and continue
					if (this.calx.fireEvent("onTaskEdit",datatask)==true){ 
						this.calx.fireEvent("afterTaskEdit",datatask,true);
					} else { 
						this.calx.fireEvent("afterTaskEdit",null,false);
					}	
				}
				break; 			
			default: 
				break; 
		} 
	},
	onDblclick: function(evx,elx,obx){
		if (  elx.id.indexOf(this.calx.id + '-ecaltask-')<0 ) {  // if not found the check the parent 
			var tmpdata= Ext.get(elx.parentNode.id);			
		}  else {  // FOund a ELX id 
			var tmpdata= Ext.get(elx.id);		
		}
		var datatask = this.getTaskarray(tmpdata); 
		this.calx.fireEvent("taskDblClick",datatask,this.vday,this.calx,'day');
	},
	getTaskarray: function(TaskElx){ 
		var tmpdata= Ext.get(TaskElx);
		var datatask =[]; 
		datatask[0]=tmpdata.getAttributeNS('tag','id') ; 
		datatask[1]=tmpdata.getAttributeNS('tag','ec_storeindex') ; 
		datatask[2]=tmpdata.getAttributeNS('tag','ec_id') ; 		
		datatask[3]=tmpdata.getAttributeNS('tag','ec_starts') ; 
		datatask[4]=tmpdata.getAttributeNS('tag','ec_ends') ; 		
		datatask[5]=tmpdata.getAttributeNS('tag','ec_zbr') ; 
		datatask[6]=tmpdata.getAttributeNS('tag','ec_subject') ;
		datatask[7]=tmpdata.getAttributeNS('tag','ec_cnt') ; //description
		return 	datatask; 	
	},
	checkTasktime: function(taskvalue) { 
		if (taskvalue instanceof Date){ 
			var tochecktmpdt = taskvalue.format('m/d/Y G:i');
		} else { 
			var tochecktmpdt = taskvalue; 
		} 
		var test = tochecktmpdt.indexOf(":", 0); 
		if (test<=0){
			taskvaluefix = tochecktmpdt + ' ' + this.vday.startTime; 
		} else { 
			taskvaluefix = tochecktmpdt;  // add the time 
		}
		return taskvaluefix ; 
	},
	getTaskObject: function (){	// VS added this
		return this.taskobject;
	}	

}); 