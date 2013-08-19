/**
 * 通用的验证控件
 */
 //
Ext.apply(Ext.form.VTypes, {
			daterange : function(val, field) {
				var date = field.parseDate(val);
				if (!date) {
					return;
				}
				if (field.startDateField
						&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
								.getTime()))) {
					var start = Ext.getCmp(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				} else if (field.endDateField
						&& (!this.dateRangeMin || (date.getTime() != this.dateRangeMin
								.getTime()))) {
					var end = Ext.getCmp(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				return true;
			}
});

//验证日期先后
Ext.apply(Ext.form.VTypes,{
    earlyThan:function(val,field){//val指这里的文本框值，field指这个文本框组件
       if(field.earlyThan){
           var date=Ext.get(field.earlyThan);
           return (val < date.getValue());
       }
       return true;
    }
});

//自定义ext的密码确认验证组件
Ext.apply(Ext.form.VTypes,{
    password:function(val,field){//val指这里的文本框值，field指这个文本框组件
       if(field.confirmTo){//confirmTo是自定义的配置参数，用来保存另外的组件的id值
           var pwd=Ext.get(field.confirmTo);//取得confirmTo的那个id的值
           return (val==pwd.getValue());
       }
       return true;
    }
});

//自定义防止空格验证组件
Ext.apply(Ext.form.VTypes,{
    trimspace:function(val){//val指这里的文本框值，field指这个文本框组件
       return val.trim() == ''?false:true;
    }
});
