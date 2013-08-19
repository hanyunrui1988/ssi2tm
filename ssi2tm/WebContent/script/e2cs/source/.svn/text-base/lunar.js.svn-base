var r = [ 19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632,
			21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450,
			38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104,
			38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104,
			100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956,
			9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872,
			42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296,
			43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925,
			19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320,
			18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256,
			19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613,
			37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680,
			37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416,
			86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726,
			42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152,
			42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864,
			42359, 42160, 43600, 111189, 27936, 44448, 84835 ];
	var o = ((new Date()).getTimezoneOffset() + 480) * 60000, m = o >= 0 ? o
			: 0;
	var j = "甲乙丙丁戊己庚辛壬癸";
	var h = "子丑寅卯辰巳午未申酉戌亥";
	var q = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
	var k = [ "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种",
			"夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪",
			"大雪", "冬至" ];
	var b = [ 0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149,
			195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350,
			375494, 397447, 419210, 440795, 462224, 483532, 504758 ];
	var a = "日一二三四五六七八九十";
	var e = [ "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊" ];
	var c = "初十廿卅";
	var y = {
		"0101" : "*1元旦节",
		"0214" : "情人节",
		"0305" : "学雷锋纪念日",
		"0308" : "妇女节",
		"0312" : "植树节",
		"0315" : "消费者权益日",
		"0401" : "愚人节",
		"0501" : "*1劳动节",
		"0504" : "青年节",
		"0601" : "国际儿童节",
		"0701" : "中国共产党诞辰",
		"0801" : "建军节",
		"0910" : "中国教师节",
		"1001" : "*3国庆节",
		"1224" : "平安夜",
		"1225" : "圣诞节"
	};
	var w = {
		"0101" : "*2春节",
		"0115" : "元宵节",
		"0505" : "*1端午节",
		"0815" : "*1中秋节",
		"0909" : "重阳节",
		"1208" : "腊八节",
		"0100" : "除夕"
	};
	var A = "元旦节除夕春节清明节劳动节端午节中秋节国庆节";
	var i = {
		"20071229" : [ "", "", "", "", 0 ],
		"20071231" : [ "", "", "", "", 1 ],
		"20080202" : [ "", "", "", "", -2 ],
		"20080211" : [ "", "", "", "", 2 ],
		"20080502" : [ "", "", "", "", 1 ],
		"20080504" : [ "青年节", "", "", "青年节", 0 ],
		"20080609" : [ "", "", "", "", 1 ],
		"20080915" : [ "", "", "", "", 1 ],
		"20080927" : [ "", "", "", "", -2 ],
		"20080929" : [ "", "", "", "", 2 ],
		"20090102" : [ "", "", "", "", 1 ],
		"20090104" : [ "", "", "", "", 0 ],
		"20090124" : [ "", "", "", "", 0 ],
		"20090128" : [ "", "", "", "", 3 ],
		"20090201" : [ "", "", "", "", 0 ],
		"20090406" : [ "", "", "", "", 1 ],
		"20090529" : [ "", "", "", "", 1 ],
		"20090531" : [ "", "", "", "", 0 ],
		"20090927" : [ "", "", "", "", 0 ],
		"20091005" : [ "", "", "", "", 4 ],
		"20091010" : [ "", "", "", "", 0 ],
		"20100216" : [ "", "", "", "", 4 ],
		"20100220" : [ "", "", "", "", -2 ],
		"20100503" : [ "", "", "", "", 1 ],
		"20100612" : [ "", "", "", "", -2 ],
		"20100614" : [ "", "", "", "", 2 ],
		"20100807" : [ "", "", "立秋", "立秋", 0 ],
		"20100808" : [ "", "", "", "廿八", 0 ],
		"20100919" : [ "", "", "", "", 0 ],
		"20100923" : [ "", "", "秋分", "秋分", 2 ],
		"20100925" : [ "", "", "", "", -2 ],
		"20101004" : [ "", "", "", "", 4 ],
		"20101009" : [ "", "", "", "", 0 ]
	};
	//计算某一天的所有农历信息
	function x(E) {
		function J(Q, P) {
			var O = new Date((31556925974.7 * (Q - 1900) + b[P] * 60000)
					+ Date.UTC(1900, 0, 6, 2, 5));
			return (O.getUTCDate());
		}
		function K(Q) {
			var O, P = 348;
			for (O = 32768; O > 8; O >>= 1) {
				P += (r[Q - 1900] & O) ? 1 : 0;
			}
			return (P + I(Q))
		}
		function H(O) {
			return (j.charAt(O % 10) + h.charAt(O % 12));
		}
		function I(O) {
			if (N(O)) {
				return ((r[O - 1900] & 65536) ? 30 : 29);
			} else {
				return (0);
			}
		}
		function N(O) {
			return (r[O - 1900] & 15);
		}
		function L(P, O) {
			return ((r[P - 1900] & (65536 >> O)) ? 30 : 29);
		}
		M(E, "M");
		function B(S) {
			var Q, P = 0, O = 0;
			var R = new Date(1900, 0, 31);
			var T = ((S - R) + m) / 86400000;
			this.dayCyl = T + 40;
			this.monCyl = 14;
			for (Q = 1900; Q < 2050 && T > 0; Q++) {
				O = K(Q);
				T -= O;
				this.monCyl += 12;
			}
			if (T < 0) {
				T += O;
				Q--;
				this.monCyl -= 12;
			}
			this.year = Q;
			this.yearCyl = Q - 1864;
			P = N(Q);
			this.isLeap = false;
			for (Q = 1; Q < 13 && T > 0; Q++) {
				if (P > 0 && Q == (P + 1) && this.isLeap == false) {
					--Q;
					this.isLeap = true;
					O = I(this.year);
				} else {
					O = L(this.year, Q);
				}
				if (this.isLeap == true && Q == (P + 1)) {
					this.isLeap = false;
				}
				T -= O;
				if (this.isLeap == false) {
					this.monCyl++;
				}
			}
			if (T == 0 && P > 0 && Q == P + 1) {
				if (this.isLeap) {
					this.isLeap = false;
				} else {
					this.isLeap = true;
					--Q;
					--this.monCyl;
				}
			}
			if (T < 0) {
				T += O;
				--Q;
				--this.monCyl;
			}
			this.month = Q;
			this.day = T + 1;
		}
		function C(O) {
			return O < 10 ? "0" + O : O;
		}
		function M(P, Q) {
			var O = P;
			return Q.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function(R) {
				switch (R) {
				case "yyyy":
					var S = "000" + O.getFullYear();
					return S.substring(S.length - 4);
				case "dd":
					return C(O.getDate());
				case "d":
					return O.getDate().toString();
				case "MM":
					return C((O.getMonth() + 1));
				case "M":
					return O.getMonth() + 1
				}
			})
		}
		function G(P, O) {
			var Q;
			switch (O) {
			case 10:
				Q = "初十";
				break;
			case 20:
				Q = "二十";
				break;
			case 30:
				Q = "三十";
				break;
			default:
				Q = c.charAt(Math.floor(O / 10));
				Q += a.charAt(O % 10);
			}
			return (Q)
		}
		this.date = E;
		this.isToday = false;
		this.solarYear = M(E, "yyyy");
		this.solarMonth = M(E, "M");
		this.solarDate = M(E, "d");
		this.solarWeekDay = E.getDay();
		this.solarWeekDayInChinese = "星期" + a.charAt(this.solarWeekDay);
		var D = new B(E);
		this.lunarYear = D.year;
		this.shengxiao = q.charAt((this.lunarYear - 4) % 12);
		this.lunarMonth = D.month;
		this.lunarIsLeapMonth = D.isLeap;
		this.lunarMonthInChinese = this.lunarIsLeapMonth ? "闰" + e[D.month - 1]
				: e[D.month - 1];
		this.lunarDate = Math.floor(D.day);
		this.showInLunar = this.lunarDateInChinese = G(this.lunarMonth,
				this.lunarDate);
		if (this.lunarDate == 1) {
			this.showInLunar = this.lunarMonthInChinese + "月"
		}
		this.ganzhiYear = H(D.yearCyl);
		this.ganzhiMonth = H(D.monCyl);
		this.ganzhiDate = H(D.dayCyl++);
		this.solarFestival = "";
		this.lunarFestival = "";
		this.jieqi = "";
		this.restDays = 0;
		if (this.solarWeekDay == 0 || this.solarWeekDay == 6) {
			this.restDays = 1;
		}
		if (J(this.solarYear, (this.solarMonth - 1) * 2) == M(E, "d")) {
			this.showInLunar = this.jieqi = k[(this.solarMonth - 1) * 2];
		}
		if (J(this.solarYear, (this.solarMonth - 1) * 2 + 1) == M(E, "d")) {
			this.showInLunar = this.jieqi = k[(this.solarMonth - 1) * 2 + 1];
		}
		if (this.showInLunar == "清明") {
			this.showInLunar = this.jieqi = "清明节";
			this.restDays = 1;
		}
		this.solarFestival = y[M(E, "MM") + M(E, "dd")] || "";
		if (/\*(\d)/.test(this.solarFestival)) {
			this.restDays = parseInt(RegExp.$1);
			this.solarFestival = this.solarFestival.replace(/\*\d/, "")
		}
		this.showInLunar = this.solarFestival ? this.solarFestival
				: this.showInLunar;
		this.lunarFestival = w[this.lunarIsLeapMonth ? "00"
				: C(this.lunarMonth) + C(this.lunarDate)]
				|| "";
		if (/\*(\d)/.test(this.lunarFestival)) {
			this.restDays = (this.restDays > parseInt(RegExp.$1)) ? this.restDays
					: parseInt(RegExp.$1);
			this.lunarFestival = this.lunarFestival.replace(/\*\d/, "");
		}
		if (this.lunarMonth == 12 && this.lunarDate == L(this.lunarYear, 12)) {
			this.lunarFestival = w["0100"];
			this.restDays = 1;
		}
		this.showInLunar = this.lunarFestival ? this.lunarFestival
				: this.showInLunar;
		this.showInLunar = (this.showInLunar.length > 5) ? this.showInLunar
				.substr(0, 4)
				+ "..." : this.showInLunar;
		var F = i[ [ this.solarYear, M(E, "MM"), M(E, "dd") ].join("")];
		if (F) {
			this.solarFestival = F[0] || "";
			this.lunarFestival = F[1] || "";
			this.jieqi = F[2] || "";
			this.showInLunar = F[3] || this.showInLunar;
			this.restDays = F[4] || 0;
		}
	}