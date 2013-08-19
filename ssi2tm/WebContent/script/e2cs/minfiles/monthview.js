Ext.ECalendar.monthview=function(config){this.referid='monthview';this.header=true;this.headerUseTpl=false;this.headerTpl=new Ext.XTemplate('<tpl for=".">{title}-{datetouse:this.formatx}</tpl>',{formatx:function(value){return value.format('M-Y');}});this.headerData={title:'Custom header for Month',datetouse:new Date()};this.headerFormat='M-Y';this.headerButtons=true;this.moreMenuItems=[];this.dayAction='viewday';this.showTaskcount=true;this.showTaskList=false;this.showNumTasks=5;this.task_format='d-m-Y H:i:s a';this.TaskList_launchEventOn='click';this.contextMenuLabels=e2cs.cal_locale.contextMenuLabelsDay;this.ShowMenuItems=[1,1,1,1,1,1];this.TaskList_ShowMenuItems=[1,1,1];this.TaskList_moreMenuItems=[];this.taskStyle='margin-top:10px;';this.startDay=0;this.thisview=null;this.taskBaseColor='#ffffff';Ext.apply(this,config);this.addEvents('dayClick','beforeMonthChange','afterMonthChange');Ext.ECalendar.monthview.superclass.constructor.call(this);};Ext.extend(Ext.ECalendar.monthview,Ext.util.Observable,{init:function(calendar,dateval){;this.calx=calendar;this.datetohandle=dateval;},render:function(){if(this.calx.loadMask){var myMask=new Ext.LoadMask(this.calx.id,{removeMask:true,msg:this.calx.customMaskText});myMask.show();}this.showTaskcount==true?this.showTaskList=false:this.showTaskList=this.showTaskList;var dt=new Date(this.calx.currentdate);Date.monthNames=e2cs.cal_locale.monthtitles;Date.dayNames=e2cs.cal_locale.daytitles;if(this.header){var tmpheader=this.genHeader(this.datetohandle);}var updateview=Ext.get(this.calx.body);var testrender=updateview.dom.childNodes.length;if(testrender){for(var i=testrender;i<testrender;i++){updateview.dom.removeChild(updateview.dom.childNodes[0]);}}updateview.update('');var monthbase='<div id="'+this.calx.id+'-main-calendar-header"></div>';monthbase+='<div id="'+this.calx.id+'-main-calendar-month-body"></div>';updateview.update(monthbase);if(this.header){var tmpheader=Ext.get(this.calx.id+'-main-calendar-header');var prueba2=tmpheader;var myheaderwrap=prueba2.wrap({tag:'div',cls:'x-calendar-month-header',html:''});if(this.headerButtons){var prevclick=myheaderwrap.createChild({id:this.calx.id+'-btn-pm',tag:'div',cls:'x-calendar-month-previous',html:''});var nextclick=myheaderwrap.createChild({id:this.calx.id+'-btn-nm',tag:'div',cls:'x-calendar-month-next',html:''});prevclick.dom['qtip']=e2cs.cal_locale.headerTooltipsMonth.prev;prevclick.addListener('click',this.onclickprev_month,this);prevclick.addClassOnOver('x-calendar-month-previous-over');nextclick.dom['qtip']=e2cs.cal_locale.headerTooltipsMonth.next;nextclick.addListener('click',this.onclicknext_month,this);nextclick.addClassOnOver('x-calendar-month-next-over');}if(this.headerUseTpl){var htmlinheader=this.headerTpl.apply(this.headerData);var headerx=myheaderwrap.createChild({tag:'div',id:'header',html:''+htmlinheader+''});}else{var headerx=myheaderwrap.createChild({tag:'div',id:'header',html:''+dt.format(this.headerFormat)+''});}}var tmpdays=Ext.get(this.calx.id+'-main-calendar-month-body');var day_hdrtext=this.genDaysHeader();var days_text=this.genBody(dt,{styletasks:this.taskStyle});var myheaderdayswrap=tmpdays.wrap({tag:'div',cls:'x-calendar-month-days',html:''});var mydays=myheaderdayswrap.createChild({tag:'div',id:this.calx.id+'-calendar-view-month',cls:'header-days',html:' <table id="'+this.calx.id+'-month_skel" width="100%" border="0" cellspacing="0" cellpadding="0"><tr class="skel_hdrdays" id="'+this.calx.id+'-skel_hdrdays">'+day_hdrtext+'</tr>'+days_text+'</table>'});Ext.get(this.calx.id+'-skel_hdrdays').setHeight(17);if(Ext.isIE){var numrowsbodyskel=mydays.dom.childNodes[0].childNodes[0].rows.length-1;}else{var numrowsbodyskel=mydays.dom.childNodes[1].childNodes[0].rows.length-1;}this.calx.height=this.calx.getInnerHeight();if(!this.calx.height||this.calx.height=='undefined'){if(this.calx.getEl().dom.offsetParent!=null){var tmpheight=this.calx.getEl().dom.offsetParent.clientHeight;}else{var tmpheight=0;}if(tmpheight==0){tmpheight=300;}if(this.header){tmpheight+=-27;}if(this.calx.showCal_tbar){tmpheight+=-27;}if(this.calx.header){tmpheight+=-22;}tmpheight+=-16;var morehoffst=0;Ext.get(this.calx.id+'-month_skel').setStyle({height:''+tmpheight-morehoffst+'px'});valtosethtmp=Math.round((tmpheight)/numrowsbodyskel);valtosethtmp+=-3;}else{var tmpheight=0;if(this.header){tmpheight+=-27;}if(this.calx.showCal_tbar){tmpheight+=-27;}if(this.calx.header){tmpheight+=-22;}tmpheight+=-16;tmpheight+=this.calx.height;if(this.calx.showCal_tbar){var morehoffst=77;}else{var morehoffst=24;}valtosethtmp=Math.round((tmpheight)/numrowsbodyskel);valtosethtmp+=-3;}Ext.get(this.calx.id+'-month_skel').setHeight(tmpheight);newsize=tmpheight;valtosethtmp=Math.round(newsize/numrowsbodyskel);var mydays=Ext.select('td.daybody',true);mydays.each(function(el,thisobj,index){var xtest=el;if(xtest.id==undefined||xtest==null){var testdx=el.dom.id;}else{var testdx=el.id;}if(testdx.indexOf('m-td-'+this.calx.id+'-')>=0){var myobjtowork=Ext.get(testdx);myobjtowork.setStyle({height:''+valtosethtmp+'px'});myobjtowork.addClassOnOver('daybody-over');if(Ext.isOpera){myobjtowork.addListener('mousedown',this.operabuttons,this);}else{myobjtowork.addListener('click',this.onhandler_day,this);myobjtowork.on('contextmenu',this.oncontextmenu,this,{stopPropagation:true,stopEvent:true,normalized:true,preventDefault:true});}}},this);if(this.showTaskcount==false&&this.showTaskList==true){var mydivlists=Ext.select('div.tasks_list',true);mydivlists.each(function(el,thisobj,index){if((el.id.indexOf(this.calx.id)+1)>0){element_id=el.id;testtdobjref=element_id.replace(this.calx.id+"-tasklist-",'');objtd=Ext.get('m-td-'+this.calx.id+'-'+testtdobjref);objtdtd={top:objtd.getTop(),heigth:objtd.getHeight()};tmprefdata=0;tmprefdata=Ext.get(element_id).getTop()-objtdtd.top;tmprefdata=tmprefdata+4;var newHxx=0;newHxx=objtdtd.heigth-tmprefdata;Ext.get(element_id).setHeight(newHxx);}},this);var mylist_items=Ext.select('div.tasks_list_item',true);mylist_items.each(function(el,thisobj,index){if((el.id.indexOf(this.calx.id)+1)>0){test=11;el.addClassOnOver('task_list_item_over');if(this.TaskList_launchEventOn!=''){el.addListener(this.TaskList_launchEventOn,this.onDblClick_tasklistitem,this);}if(Ext.isOpera){el.addListener('mousedown',this.operataskitembuttons,this);}else{el.on('contextmenu',this.oncontextmenuTaskitem,this,{stopPropagation:true,stopEvent:true,normalized:true,preventDefault:true});}}},this);}if(this.calx.loadMask){myMask.hide();}},refreshView:function(){this.render();},ZoomDay:function(DateToZoom){var dtx=new Date(DateToZoom);var counttasks=this.calx.store.getCount();if(counttasks>0){var count_in_day=0;taskstmp=[];for(var itask=0;itask<counttasks;itask++){var testrec=this.calx.store.getAt(itask).data;dateinit=this.calx.store.getAt(itask).data[this.calx.fieldsRefer.startdate];dateend=this.calx.store.getAt(itask).data[this.calx.fieldsRefer.enddate];checkdates=dtx.between(new Date(dateinit),new Date(dateend));chkformat=dtx.format('m/d/Y');test=new Date(dateinit);if(test.format('m/d/Y')==chkformat){checkdates=true;}test=new Date(dateend);if(test.format('m/d/Y')==chkformat){checkdates=true;}if(checkdates){taskstmp[count_in_day]=testrec;count_in_day+=1;}}if(count_in_day<=0){return false;}}else{return false;}showdata=[];for(var i=0;i<taskstmp.length;i++){showdata[i]=[taskstmp[i][this.calx.fieldsRefer.id],taskstmp[i][this.calx.fieldsRefer.subject],taskstmp[i][this.calx.fieldsRefer.description],taskstmp[i][this.calx.fieldsRefer.startdate],taskstmp[i][this.calx.fieldsRefer.enddate],taskstmp[i][this.calx.fieldsRefer.color],];}var reader=new Ext.data.ArrayReader({},[{name:this.calx.fieldsRefer.id,type:'int'},{name:this.calx.fieldsRefer.subject,type:'string'},{name:this.calx.fieldsRefer.description,type:'string'},{name:this.calx.fieldsRefer.startdate,type:'string'},{name:this.calx.fieldsRefer.enddate,type:'string'},{name:this.calx.fieldsRefer.color,type:'string'}]);tmpstore=new Ext.data.Store({reader:reader,data:showdata});tmppanel=new Ext.Panel({id:'ecal-more-task-panel',header:false,autoDestroy:true,autoScroll:true,monitorResize:true,border:false,autoWidth:false,autoHeight:false,items:new Ext.DataView({loadingText:e2cs.cal_locale.win_tasks_loading,store:tmpstore,tpl:this.calx.tplTaskZoom,autoWidth:true,autoHeight:true,overClass:'',itemSelector:'',emptyText:e2cs.cal_locale.win_tasks_empty})});var ecalwinshowmore=new Ext.Window({id:'ecal-win-moretasks',name:'ecal-win-moretasks',title:e2cs.cal_locale.win_month_zoomlabel+' '+dtx.format(e2cs.cal_locale.win_tasks_format),width:450,height:300,closeAction:'close',resizable:true,resizeHandles:'all',hideBorders:true,maximizable:true,plain:true,modal:true,layout:'fit',iconCls:'x-calendar-more-tasks-win',items:[tmppanel]});ecalwinshowmore.show();return true;},operabuttons:function(evx,elx,obx){if(Ext.isOpera){if(evx.button==0){this.onhandler_day(evx,elx,obx);}if(evx.button==2){this.oncontextmenu(evx,elx,obx);}}},oncontextmenu:function(evx,elx,obx){if(Ext.isOpera){if(evx.button!=2){return false;}}if(elx.className=="tasks_list_item"||elx.className=="tasks_list_item task_list_item_over"||elx.className.indexOf("task_list_item_over")>0){return false;}if(this.ShowMenuItems[0]!=true&&this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true&&this.ShowMenuItems[3]!=true&&this.ShowMenuItems[4]!=true&&this.ShowMenuItems[5]!=true&&this.moreMenuItems.length<=0){return false;}if(Ext.version.substr(0,1)=="2"){evx.stopEvent();}if(elx.className=='noday'||elx.className=='today'||elx.className=='monthday'){var refdate=new Date(elx.id.substring(this.calx.id.length+1));}else if(elx.className=='tasks'){var refdate=new Date(elx.parentNode.firstChild.id.substring(this.calx.id.length+1));}else if(elx.id.indexOf('-tasklist-')>0){tmpdata=elx.id.replace(this.calx.id+"-tasklist-",'');var refdate=new Date(tmpdata+"");}else{var refdate=new Date(elx.firstChild.id.substring(this.calx.id.length+1));}if(this.menu){this.menu.removeAll();}this.menu=new Ext.menu.Menu({id:this.calx.id+'-contextmenu-month',autoDestroy:true,shadow:true,items:[{id:this.calx.id+'-month_ctxbtn_task',iconCls:'x-calendar-month-btnmv_task',text:e2cs.cal_locale.contextMenuLabelsMonth.task+' ('+refdate.format(this.calx.dateformat)+')',scope:this},'-',{id:this.calx.id+'-month_ctxbtn_nextmonth',iconCls:'x-calendar-month-btnmv_nextmth',text:e2cs.cal_locale.contextMenuLabelsMonth.gonextmonth,scope:this},{id:this.calx.id+'-month_ctxbtn_prevmonth',iconCls:'x-calendar-month-btnmv_prevmth',text:e2cs.cal_locale.contextMenuLabelsMonth.goprevmonth,scope:this},'-',{id:this.calx.id+'-month_ctxbtn_viewweek',iconCls:'x-calendar-month-btnmv_viewweek',text:e2cs.cal_locale.contextMenuLabelsMonth.chgwview,scope:this},{id:this.calx.id+'-month_ctxbtn_viewday',iconCls:'x-calendar-month-btnmv_viewday',text:e2cs.cal_locale.contextMenuLabelsMonth.chgdview,scope:this},{id:this.calx.id+'-month_ctxbtn_viewsched',iconCls:'x-calendar-month-btnmv_viewsched',text:e2cs.cal_locale.contextMenuLabelsMonth.chgsview,scope:this}]});if(this.moreMenuItems.length>0){this.menu.add('-');for(var i=0;i<this.moreMenuItems.length;i++){var idmenuitem=this.moreMenuItems[i].id;this.moreMenuItems[i].rendered=false;if(this.moreMenuItems[i].hasListener('click')){this.moreMenuItems[i].purgeListeners();}this.moreMenuItems[i].addListener('click',function(parx){this.onCustomMenuAction(parx.id,Ext.get(elx),this);},this);this.menu.add(this.moreMenuItems[i]);}}this.menu.items.items[0].addListener('click',function(){this.onTaskAdd(Ext.get(elx),this);},this);this.menu.items.items[2].addListener('click',function(){this.onclicknext_month();},this);this.menu.items.items[3].addListener('click',function(){this.onclickprev_month();},this);this.menu.items.items[5].addListener('click',function(){this.changeCalview(Ext.get(elx),this,1);},this);this.menu.items.items[6].addListener('click',function(){this.changeCalview(Ext.get(elx),this,2);},this);this.menu.items.items[7].addListener('click',function(){this.changeCalview(Ext.get(elx),this,3);},this);if(this.ShowMenuItems[0]!=true){this.menu.items.items[0].hidden=true;this.menu.items.items[1].hidden=true;}if(this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true&&this.ShowMenuItems[3]!=true&&this.ShowMenuItems[4]!=true&&this.ShowMenuItems[5]!=true){this.menu.items.items[1].hidden=true;}if(this.ShowMenuItems[1]!=true){this.menu.items.items[2].hidden=true;}if(this.ShowMenuItems[2]!=true){this.menu.items.items[3].hidden=true;}if(this.ShowMenuItems[1]!=true&&this.ShowMenuItems[2]!=true){this.menu.items.items[4].hidden=true;}if(this.ShowMenuItems[3]!=true){this.menu.items.items[5].hidden=true;}if(this.ShowMenuItems[4]!=true){this.menu.items.items[6].hidden=true;}if(this.ShowMenuItems[5]!=true){this.menu.items.items[7].hidden=true;}if(this.ShowMenuItems[3]==false&&this.ShowMenuItems[4]==false&&this.ShowMenuItems[5]==false){if(this.moreMenuItems.length>0){this.menu.items.items[8].hidden=true;}}if(!this.calx.dview){this.menu.items.items[6].hidden=true;}if(!this.calx.wview){this.menu.items.items[5].hidden=true;}if(!this.calx.sview){this.menu.items.items[7].hidden=true;}if(this.menu.items.items[5].hidden&&this.menu.items.items[6].hidden&&this.menu.items.items[7].hidden){if(this.moreMenuItems.length>0){this.menu.items.items[8].hidden=true;}}if(Ext.version.substr(0,1)=="2"){this.menu.on('hide',this.onContextHide,this);this.menu.showAt([evx.getPageX(),evx.getPageY()]);}else{this.menu.on('hide',this.onContextHideBodyDAY,this);this.menu.showAt([evx.clientX,evx.clientY]);}},onCustomMenuAction:function(MenuId,MonthEl,TaskObj){var datatask=[];var tmpobj=Ext.get(MonthEl);if(MonthEl.dom.className=='noday'||MonthEl.dom.className=='today'||MonthEl.dom.className=='monthday'){datatask[0]=Ext.get(MonthEl).dom.id.substring(this.calx.id.length+1);datatask[1]=Ext.get(MonthEl).getAttributeNS('tag','class');}else if(MonthEl.dom.className=='tasks'){datatask[0]=Ext.get(MonthEl).dom.parentNode.firstChild.id.substring(this.calx.id.length+1);datatask[1]=Ext.get(MonthEl.dom.parentNode.firstChild).getAttributeNS('tag','class');}else{datatask[0]=Ext.get(MonthEl).dom.firstChild.id.substring(this.calx.id.length+1);datatask[1]=Ext.get(MonthEl.dom.firstChild).getAttributeNS('tag','class');}this.calx.fireEvent("customMenuAction",MenuId,'month',datatask,MonthEl,this);},changeCalview:function(objx,mviewx,typeview){if(objx.dom.className=='noday'||objx.dom.className=='today'||objx.dom.className=='monthday'){var refdate=new Date(objx.id.substring(this.calx.id.length+1));}else if(objx.dom.className=='tasks'){var refdate=new Date(objx.dom.parentNode.firstChild.id.substring(this.calx.id.length+1));}else{var refdate=new Date(objx.dom.firstChild.id.substring(this.calx.id.length+1));}if(typeview==1){varview='week';}else if(typeview==2){varview='day';}else{varview='schedule';}this.calx.changeView(varview);},onTaskAdd:function(objx,mviewx){if(objx.dom.className=='noday'||objx.dom.className=='today'||objx.dom.className=='monthday'){var refdate=new Date(objx.id.substring(this.calx.id.length+1));}else if(objx.dom.className=='tasks'){var refdate=new Date(objx.dom.parentNode.firstChild.id.substring(this.calx.id.length+1));}else if(objx.dom.className=="tasks_list_item"||objx.dom.className=="tasks_list_item task_list_item_over"||objx.dom.className.indexOf("task_list_item_over")>0){tmpdata=objx.id.replace(this.calx.id+"-tasklist-",'');refdate=new Date(tmpdata+"");}else if(objx.dom.className=="tasks_list"){tmpdata=objx.id.replace(this.calx.id+"-tasklist-",'');var refdate=new Date(tmpdata+"");}else if(objx.dom.className=="daybody"){tmpdata=objx.id.replace("m-td-"+this.calx.id+"-",'');refdate=new Date(tmpdata+"");}else{var refdate=new Date(objx.dom.firstChild.id.substring(this.calx.id.length+1));}this.calx.fireEvent("taskAdd",refdate);},onContextHideBodyDAY:function(obj){if(Ext.version.substr(0,1)=="3"){obj.removeAll();obj.destroy();}},onContextHide:function(){},onContextHide_Taskitem:function(menuItem){},operataskitembuttons:function(evx,elx,obx){if(Ext.isOpera){evx.stopEvent();var tmpdata=Ext.get(elx.id);var toshowOnCXmenu=this.TaskList_ShowMenuItems;var newmenuitems=this.TaskList_moreMenuItems;var actionsTaskCX=[];var dataTASKtmp=this.getTaskarray(tmpdata);var testevent=this.calx.fireEvent("beforeContextMenuTask","monthview-task",dataTASKtmp,toshowOnCXmenu,actionsTaskCX);if(testevent==false){if(actionsTaskCX[0]==false){if(actionsTaskCX[1]==true){if(actionsTaskCX[2]==true){var newmenuitems=actionsTaskCX[3];}var toshowOnCXmenu=actionsTaskCX[4];}else{var newmenuitems=this.TaskList_moreMenuItems;var toshowOnCXmenu=this.TaskList_ShowMenuItems;}}else{return false;}}else{var newmenuitems=this.TaskList_moreMenuItems;}var dateobjtoref=elx.id.replace(this.calx.id+"-tasklist-",'');if(this.taskitem_menu){this.taskitem_menu.removeAll();}this.taskitem_menu=new Ext.menu.Menu({ignoreParentClicks:true,shadow:false,items:[{id:'month_tskitem_btn_task-add',iconCls:'x-calendar-day-btnmv_add',text:this.contextMenuLabels.taskAdd,scope:this},{id:'month_tskitem_btn_task-delete',iconCls:'x-calendar-day-btnmv_delete',text:this.contextMenuLabels.taskDelete,scope:this},'-',{id:'month_tskitem_btn_task-edit',iconCls:'x-calendar-day-btnmv_task',text:this.contextMenuLabels.taskEdit+tmpdata.getAttributeNS('tag','ec_subject'),scope:this}]});if(newmenuitems.length>0){this.taskitem_menu.add('-');for(var i=0;i<newmenuitems.length;i++){newmenuitems[i].rendered=false;if(newmenuitems[i].menu==undefined){if(newmenuitems[i].ctype=="Ext.menu.Item"){newmenuitems[i].rendered=false;if(newmenuitems[i].hasListener('click')){newmenuitems[i].purgeListeners();}newmenuitems[i].addListener('click',function(parx,parz){this.onCustomMenuAction_TaskItem(parx.id,Ext.get(elx),this);},this);}else{var test=11;}this.taskitem_menu.add(newmenuitems[i]);}else{newmenuitems[i].menu.rendered=false;for(var xm=0;xm<newmenuitems[i].menu.items.length;xm++){newmenuitems[i].menu.items.items[xm].rendered=false;if(newmenuitems[i].menu.items.items[xm].ctype=="Ext.menu.Item"){if(newmenuitems[i].menu.items.items[xm].hasListener('click')){newmenuitems[i].menu.items.items[xm].purgeListeners();}newmenuitems[i].menu.items.items[xm].addListener('click',function(parx,parz){this.onCustomMenuAction_TaskItem(parx.id,Ext.get(elx),this);},this);}else{var test=11;}}this.taskitem_menu.add(newmenuitems[i]);}}}this.taskitem_menu.items.items[0].addListener('click',function(){this.onActionTask(1,Ext.get(elx),this);},this);this.taskitem_menu.items.items[1].addListener('click',function(){this.onActionTask(2,Ext.get(elx),this);},this);this.taskitem_menu.items.items[3].addListener('click',function(){this.onActionTask(3,Ext.get(elx),this);},this);if(toshowOnCXmenu[0]!=true){this.taskitem_menu.items.items[0].hidden=true;}if(toshowOnCXmenu[1]!=true){this.taskitem_menu.items.items[1].hidden=true;}if(toshowOnCXmenu[0]!=true&&toshowOnCXmenu[1]!=true){this.taskitem_menu.items.items[2].hidden=true;}if(toshowOnCXmenu[2]!=true){this.taskitem_menu.items.items[3].hidden=true;}this.taskitem_menu.on('hide',this.onContextHide_Taskitem,this);if(Ext.version.substr(0,1)=="2"){}else{evx.xy=[evx.clientX,evx.clientY];}this.taskitem_menu.showAt(evx.xy);}},onDblClick_tasklistitem:function(evx,elx,obx){var test=elx.id.indexOf(this.calx.id+'-mtask-item-')+1;if(test){var datatask=this.getTaskarray(elx);this.calx.fireEvent("taskDblClick",datatask,this,this.calx,'month');}},oncontextmenuTaskitem:function(evx,elx,obx){if(Ext.isOpera){if(evx.button!=2){return false;}}if(Ext.version.substr(0,1)=="2"){evx.stopEvent();}if(this.TaskList_ShowMenuItems[0]!=true&&this.TaskList_ShowMenuItems[1]!=true&&this.TaskList_ShowMenuItems[2]!=true&&this.TaskList_moreMenuItems.length<=0){return false;}var tmpdata=Ext.get(elx.id);var toshowOnCXmenu=this.TaskList_ShowMenuItems;var newmenuitems=this.TaskList_moreMenuItems;var actionsTaskCX=[];var dataTASKtmp=this.getTaskarray(tmpdata);var testevent=this.calx.fireEvent("beforeContextMenuTask","monthview-task",dataTASKtmp,toshowOnCXmenu,actionsTaskCX);if(testevent==false){if(actionsTaskCX[0]==false){if(actionsTaskCX[1]==true){if(actionsTaskCX[2]==true){var newmenuitems=actionsTaskCX[3];}var toshowOnCXmenu=actionsTaskCX[4];}else{var newmenuitems=this.TaskList_moreMenuItems;var toshowOnCXmenu=this.TaskList_ShowMenuItems;}}else{return false;}}else{var newmenuitems=this.TaskList_moreMenuItems;}var dateobjtoref=elx.id.replace(this.calx.id+"-tasklist-",'');if(this.taskitem_menu){this.taskitem_menu.removeAll();}this.taskitem_menu=new Ext.menu.Menu({allowOtherMenus:true,shadow:true,items:[{id:'month_tskitem_btn_task-add',iconCls:'x-calendar-day-btnmv_add',text:this.contextMenuLabels.taskAdd,scope:this},{id:'month_tskitem_btn_task-delete',iconCls:'x-calendar-day-btnmv_delete',text:this.contextMenuLabels.taskDelete,scope:this},'-',{id:'month_tskitem_btn_task-edit',iconCls:'x-calendar-day-btnmv_task',text:this.contextMenuLabels.taskEdit+tmpdata.getAttributeNS('tag','ec_subject'),scope:this}]});if(newmenuitems.length>0){this.taskitem_menu.add('-');for(var i=0;i<newmenuitems.length;i++){newmenuitems[i].rendered=false;if(newmenuitems[i].menu==undefined){newmenuitems[i].rendered=false;if(newmenuitems[i].ctype=="Ext.menu.Item"){newmenuitems[i].rendered=false;if(newmenuitems[i].hasListener('click')){newmenuitems[i].purgeListeners();}newmenuitems[i].addListener('click',function(parx,parz){this.onCustomMenuAction_TaskItem(parx.id,Ext.get(elx),this);},this);}else{}this.taskitem_menu.add(newmenuitems[i]);}else{if(newmenuitems[i].menu){newmenuitems[i].menu.rendered=false;}this.taskitem_menu.addMenuItem({iconCls:newmenuitems[i].iconCls,text:newmenuitems[i].text,menu:newmenuitems[i].menu});for(var xm=0;xm<newmenuitems[i].menu.items.length;xm++){newmenuitems[i].menu.items.items[xm].rendered=false;if(newmenuitems[i].menu.items.items[xm].ctype=="Ext.menu.Item"){if(newmenuitems[i].menu.items.items[xm].hasListener('click')){newmenuitems[i].menu.items.items[xm].purgeListeners();}newmenuitems[i].menu.items.items[xm].addListener('click',function(parx,parz){this.onCustomMenuAction_TaskItem(parx.id,Ext.get(elx),this);},this);}else{}}}}}this.taskitem_menu.items.items[0].addListener('click',function(){this.onActionTask(1,Ext.get(elx),this);},this);this.taskitem_menu.items.items[1].addListener('click',function(){this.onActionTask(2,Ext.get(elx),this);},this);this.taskitem_menu.items.items[3].addListener('click',function(){this.onActionTask(3,Ext.get(elx),this);},this);if(toshowOnCXmenu[0]!=true){this.taskitem_menu.items.items[0].hidden=true;}if(toshowOnCXmenu[1]!=true){this.taskitem_menu.items.items[1].hidden=true;}if(toshowOnCXmenu[0]!=true&&toshowOnCXmenu[1]!=true){this.taskitem_menu.items.items[2].hidden=true;}if(toshowOnCXmenu[2]!=true){this.taskitem_menu.items.items[3].hidden=true;if(newmenuitems.length>0){this.taskitem_menu.items.items[4].hidden=true;}}if(Ext.version.substr(0,1)=="2"){this.taskitem_menu.on('hide',this.onContextHide_Taskitem,this);this.taskitem_menu.showAt([evx.getPageX(),evx.getPageY()]);}else{this.taskitem_menu.on('hide',this.onContextHideBodyDAY,this);this.taskitem_menu.showAt([evx.clientX,evx.clientY]);}},onActionTask:function(action,taskEl,TaskObj){this.taskitem_menu.hide();var datatask=this.getTaskarray(taskEl);switch(action){case 1:if(taskEl.id.indexOf('-mtask-item-')>0){var dateobjtoref=taskEl.id.replace(this.calx.id+"-mtask-item-",'');}else if(taskEl.id.indexOf('-tasklist-')>0){var dateobjtoref=taskEl.id.replace(this.calx.id+"-tasklist-",'');}dateobjtoref=dateobjtoref.substr(0,10);var eventdate=new Date(dateobjtoref);this.calx.fireEvent("taskAdd",eventdate);break;case 2:var check=this.calx.fireEvent("beforeTaskDelete",datatask,this);if(check){if(this.calx.fireEvent("onTaskDelete",datatask)==true){this.calx.fireEvent("afterTaskDelete",datatask,true);}else{this.calx.fireEvent("afterTaskDelete",null,false);}}break;case 3:var check=this.calx.fireEvent("beforeTaskEdit",datatask,this);if(check){if(this.calx.fireEvent("onTaskEdit",datatask)==true){this.calx.fireEvent("afterTaskEdit",datatask,true);}else{this.calx.fireEvent("afterTaskEdit",null,false);}}break;default:break;}},onCustomMenuAction_TaskItem:function(MenuId,taskEl,TaskObj){var datatask=this.getTaskarray(taskEl);this.calx.fireEvent("customMenuAction",MenuId,'month',datatask,taskEl,this);this.taskitem_menu.hide();},onhandler_day:function(evx,elx,obx){if(elx.className=="noday"||elx.className=="today"||elx.className=="monthday"){var dateparam=new Date(elx.id.substring(this.calx.id.length+1));}else if(elx.className=="tasks"){var dateparam=new Date(elx.parentNode.firstChild.id.substring(this.calx.id.length+1));}else if(elx.className=="tasks_list_item"||elx.className=="tasks_list"||elx.className=="tasks_list_item task_list_item_over"||elx.className.indexOf("task_list_item_over")>0){var tmp=11;}else{var dateparam=new Date(elx.firstChild.id.substring(this.calx.id.length+1));}if(elx.className=="tasks_list_item"||elx.className=="tasks_list"||elx.className=="tasks_list_item task_list_item_over"||elx.className.indexOf("task_list_item_over")>0){var tmp=11;}else{if(this.dayAction=="viewday"){if(this.calx.fireEvent("beforeChangeView",'day',this.calx.currentView,this.calx)==false){return false;}else{this.calx.currentdate=dateparam;this.calx.selector_dateMenu.picker.setValue(this.calx.currentdate);this.calx.currentView='day';this.calx.viewday.render();this.calx.fireEvent("onChangeView",'day','month',this);}}if(this.dayAction=="event"){this.fireEvent("dayClick",dateparam,this,this.calx);}if(this.dayAction=='window'){this.ZoomDay(dateparam);}}},onclickprev_month:function(){var changemonthdate=this.calx.currentdate.add(Date.MONTH,-1);var check=this.fireEvent("beforeMonthChange",this.calx.currentdate,changemonthdate);if(check){this.calx.currentdate=changemonthdate;this.calx.selector_dateMenu.picker.setValue(this.calx.currentdate);this.render();this.fireEvent("afterMonthChange",changemonthdate);}},onclicknext_month:function(){var changemonthdate=this.calx.currentdate.add(Date.MONTH,1);var check=this.fireEvent("beforeMonthChange",this.calx.currentdate,changemonthdate);if(check){this.calx.currentdate=changemonthdate;this.calx.selector_dateMenu.picker.setValue(this.calx.currentdate);this.render();this.fireEvent("afterMonthChange",changemonthdate);}},genHeader:function(dateval){var dt=new Date(dateval);Date.monthNames=e2cs.cal_locale.monthtitles;var myheader='<div class="x-calendar-month-header" style="width:'+(this.calx.width-10)+'px;">';myheader+='<div id="header">'+dt.format(this.headerFormat)+'</div>';if(this.headerButtons){myheader+='<div class="x-calendar-month-previous"></div>';myheader+='<div class="x-calendar-month-next"></div>';}myheader+="</div>";return myheader;},genDaysHeader:function(){var day_hdrtext="";for(var i=0;i<e2cs.cal_locale.daytitles.length;i++){var d=this.startDay+i;if(d>6){d=d-7;}day_hdrtext+='<td width="14%"><div class="dayheader">'+e2cs.cal_locale.daytitles[d]+'</div></td>';}return day_hdrtext;},getDateRangeOfMonth:function(dateval){var dt=new Date(dateval);var initday=dt.getFirstDayOfMonth()-this.startDay;var daysgen=dt.getDaysInMonth();if(dt.getMonth()==1){if((dt.getFullYear()%4==0&&dt.getFullYear()%100!=0)||dt.getFullYear()%400==0){daysgen=29;}}if(initday<0){initday+=7;}var dtstart=new Date((dateval.getMonth()+1)+'/1/'+dateval.getFullYear()).add(Date.DAY,(initday*-1));var icount=initday;startmonthdate=new Date(dt.format('m/01/Y'));var icount=(initday+daysgen)%7;if(icount)icount=7-icount;var datenew=new Date(startmonthdate).add(Date.DAY,daysgen-1+icount);var toretn=[dtstart,datenew];return toretn;},genBody:function(dateval,configdata){var dt=new Date(dateval);var initday=dt.getFirstDayOfMonth()-this.startDay;var daysgen=dt.getDaysInMonth();var irowtmp=0;if(dt.getMonth()==1){if((dt.getFullYear()%4==0&&dt.getFullYear()%100!=0)||dt.getFullYear()%400==0){daysgen=29;}}var mybody='<tr>';if(initday<0){initday=7+(initday);}if(initday!=0){for(var iday=(initday);iday>0;iday--){writedt=new Date((dateval.getMonth()+1)+'/1/'+dateval.getFullYear()).add(Date.DAY,(iday*-1));mybody+='<td valign="top" id="m-td-'+this.calx.id+'-'+writedt.format('m/d/Y')+'" class="daybody">';mybody+='<div class="noday" id="'+this.calx.id+'-'+writedt.format('m/d/Y')+'">'+writedt.format('j-M')+'</div>';if(this.showTaskcount){tmptasks=this.getCountTask(writedt,this.calx.store);if(tmptasks>0){mybody+='<div class="tasks" style="'+configdata.styletasks+'">'+e2cs.cal_locale.labelforTasksinMonth+' ('+tmptasks+')</div>';}}else{if(this.showTaskList){var taskitems=this.getTaskList(writedt,this.calx.store);if(taskitems!=''){mybody+='<div class="tasks_list" id="'+this.calx.id+'-tasklist-'+writedt.format('m/d/Y')+'" style="height:5px;'+configdata.styletasks+'">';mybody+=taskitems;mybody+='</div>';}}}mybody+='</td>';}}icount=initday;irowtmp=1;startmonthdate=new Date(dt.format('m')+'/01/'+dt.format('Y'));for(var imonth=0;imonth<daysgen;imonth++){if(icount>=7){icount=0;mybody+='</tr><tr>';irowtmp+=1;}var datecreate=new Date(startmonthdate).add(Date.DAY,imonth);if(datecreate.format('m/d/Y')==dt.format('m/d/Y')){mybody+='<td valign="top" id="m-td-'+this.calx.id+'-'+datecreate.format('m/d/Y')+'" class="daybody" height="10px">';mybody+='<div class="today" id="'+this.calx.id+'-'+datecreate.format('m/d/Y')+'">'+datecreate.format('j')+'</div>';if(this.showTaskcount){tmptasks=this.getCountTask(datecreate,this.calx.store);if(tmptasks>0){mybody+='<div class="tasks" style="'+configdata.styletasks+'">'+e2cs.cal_locale.labelforTasksinMonth+' ('+tmptasks+')</div>';}}else{if(this.showTaskList){var taskitems=this.getTaskList(datecreate,this.calx.store);if(taskitems!=''){mybody+='<div class="tasks_list" id="'+this.calx.id+'-tasklist-'+datecreate.format('m/d/Y')+'" style="height:5px;'+configdata.styletasks+'">';mybody+=taskitems;mybody+='</div>';}}}mybody+='</td>';}else{mybody+='<td valign="top" id="m-td-'+this.calx.id+'-'+datecreate.format('m/d/Y')+'" class="daybody" height="10px">';mybody+='<div class="monthday" id="'+this.calx.id+'-'+datecreate.format('m/d/Y')+'">'+datecreate.format('j')+'</div>';if(this.showTaskcount){tmptasks=this.getCountTask(datecreate,this.calx.store);if(tmptasks>0){mybody+='<div class="tasks" style="'+configdata.styletasks+'">'+e2cs.cal_locale.labelforTasksinMonth+' ('+tmptasks+')</div>';}}else{if(this.showTaskList){var taskitems=this.getTaskList(datecreate,this.calx.store);if(taskitems!=''){mybody+='<div class="tasks_list" id="'+this.calx.id+'-tasklist-'+datecreate.format('m/d/Y')+'" style="height:5px;'+configdata.styletasks+'">';mybody+=taskitems;mybody+='</div>';}}}mybody+='</td>';}icount+=1;}if(icount<7){var datatmp=0;for(var iday=icount;iday<7;iday++){datatmp=datatmp+1;var datenew=new Date(datecreate).add(Date.DAY,datatmp);mybody+='<td valign="top"   id="m-td-'+this.calx.id+'-'+datenew.format('m/d/Y')+'" class="daybody" height="10px">';mybody+='<div class="noday" id="'+this.calx.id+'-'+datenew.format('m/d/Y')+'">'+datenew.format('j-M')+'</div>';if(this.showTaskcount){tmptasks=this.getCountTask(datenew,this.calx.store);if(tmptasks>0){mybody+='<div class="tasks" style="'+configdata.styletasks+'">'+e2cs.cal_locale.labelforTasksinMonth+' ('+tmptasks+')</div>';}}else{if(this.showTaskList){var taskitems=this.getTaskList(datenew,this.calx.store);if(taskitems!=''){mybody+='<div class="tasks_list" id="'+this.calx.id+'-tasklist-'+datenew.format('m/d/Y')+'" style="height:5px;'+configdata.styletasks+'">';mybody+=taskitems;mybody+='</div>';}}}mybody+='</td>';}}mybody+='</tr>';return mybody;},getCountTask:function(dtx,storex){var counttasks=storex.getCount();if(counttasks>0){var count_in_day=0;for(var itask=0;itask<counttasks;itask++){dateinit=storex.getAt(itask).data[this.calx.fieldsRefer.startdate];dateend=storex.getAt(itask).data[this.calx.fieldsRefer.enddate];checkdates=dtx.between(new Date(dateinit),new Date(dateend));chkformat=dtx.format('m/d/Y');test=new Date(dateinit);if(test.format('m/d/Y')==chkformat){checkdates=true;}test=new Date(dateend);if(test.format('m/d/Y')==chkformat){checkdates=true;}var initxx=new Date(dateinit);var endxx=new Date(dateend);if(initxx<dtx&&endxx>dtx){checkdates=true;}if(checkdates){count_in_day+=1;}}return count_in_day;}else{return 0;}},getTaskList:function(dtx,storex){var fields=this.calx.fieldsRefer;var daystoreturn="";var counttasks=storex.getCount();if(counttasks>0){var count_in_day=0;for(var itask=0;itask<counttasks;itask++){var data=storex.getAt(itask).data;dateinit=data[fields.startdate];dateend=data[fields.enddate];checkdates=dtx.between(new Date(dateinit),new Date(dateend));chkformat=dtx.format('m/d/Y');test=new Date(dateinit);if(test.format('m/d/Y')==chkformat){checkdates=true;}test=new Date(dateend);if(test.format('m/d/Y')==chkformat){checkdates=true;}var initxx=new Date(dateinit);var endxx=new Date(dateend);if(initxx<dtx&&endxx>dtx){checkdates=true;}if(checkdates){if(count_in_day<this.showNumTasks){var tmpdate=new Date(data[fields.startdate]);var startlabel=tmpdate.format(this.task_format);tmpdateb=new Date(data[fields.enddate]);var endlabel=tmpdateb.format(this.task_format);var tmpdescription=data[fields.description],tmpdescriptionx;if(tmpdescription=='')tmpdescription='&#160;';if(tmpdescription.length>this.calx.tipmaxLength){tmpdescriptionx=tmpdescription.substring(0,this.calx.tipmaxLength)+'...';}else{tmpdescriptionx=tmpdescription;}daystoreturn+='<div class="tasks_list_item"';daystoreturn+='style="background-color:'+data[fields.color];if(fields.textcolor)daystoreturn+=';color:'+data[fields.textcolor];daystoreturn+='" ';daystoreturn+='id="'+this.calx.id+'-mtask-item-'+chkformat+'-'+data[fields.id]+'" ';daystoreturn+='ec_id="'+data[fields.id]+'" ';daystoreturn+='ec_starts="'+startlabel+'" ';daystoreturn+='ec_ends="'+endlabel+'" ';daystoreturn+='ec_subject="'+data[fields.subject]+'" ';daystoreturn+='ec_cnt="'+tmpdescriptionx+'" ';daystoreturn+='ec_storeindex="'+itask+'" ';daystoreturn+='ec_location="'+data[fields.location]+'" ';daystoreturn+='ec_allday="'+data[fields.alldaytask]+'" ';daystoreturn+='ec_isholiday="'+data[fields.isHoliday]+'" ';daystoreturn+=' ext:qtitle="'+data[fields.subject]+'" ';var datatip={starxl:e2cs.cal_locale.task_qtip_starts,startval:startlabel,endxl:e2cs.cal_locale.task_qtip_ends,endval:endlabel,details:tmpdescriptionx,color:data[fields.color],textcolor:(fields.textcolor?data[fields.textcolor]:''),location:data[fields.location],eventid:data[fields.id]};var mylist_itemTip=this.calx.tplTaskTip.apply(datatip);daystoreturn+='ext:qtip="'+mylist_itemTip+'">';daystoreturn+=data[fields.subject]+'</div>';count_in_day+=1;}}}return daystoreturn;}else{return 0;}},getTaskarray:function(TaskElx){var tmpdata=Ext.get(TaskElx);var datatask=[];datatask[0]=tmpdata.getAttributeNS('tag','id');datatask[1]=tmpdata.getAttributeNS('tag','ec_id');datatask[2]=tmpdata.getAttributeNS('tag','ec_subject');datatask[3]=tmpdata.getAttributeNS('tag','ec_starts');datatask[4]=tmpdata.getAttributeNS('tag','ec_ends');datatask[5]=tmpdata.getAttributeNS('tag','ec_cnt');datatask[6]=tmpdata.getAttributeNS('tag','ec_storeindex');datatask[7]=tmpdata.getAttributeNS('tag','ec_location');datatask[8]=tmpdata.getAttributeNS('tag','ec_allday');datatask[9]=tmpdata.getAttributeNS('tag','ec_isholiday');return datatask;}});