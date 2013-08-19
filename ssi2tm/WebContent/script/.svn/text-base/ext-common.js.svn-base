//日期数据		
ies.getYearStore = function() {
	var date = new Date();
	// 年份数据源
	var yearStore = new Ext.data.SimpleStore({
				fields : ['year'],
				data : []
			});
	var yearList = new Array();
	for (var i = date.getFullYear(); i >=2002; i--) {
		yearList.push([i]);
	}
	yearStore.loadData(yearList);
	return yearStore;
}