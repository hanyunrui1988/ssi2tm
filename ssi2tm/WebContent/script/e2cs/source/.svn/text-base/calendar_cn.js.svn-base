if (typeof window.op_calendar == "undefined" || !window.op_calendar) {
	window.op_calendar = {
		isFestMode : false,
		isMonthMode : false
	}
}
(function() {
	var v = window.op_calendar;
	document
			.writeln("<style>#cal{width:450px;border:1px solid #c3d9ff;font-size:12px;margin:8px 0 0 15px}#cal #top{height:29px;line-height:29px;background:#e7eef8;color:#003784;padding-left:20px;_padding-top:5px;}#cal #top select{font-size:12px;height:19px;line-height:19px;}#cal #top #top_cal,#cal #top #top_fest{display:inline-block;width:300px;white-space:nowrap}#cal #top #top_fest{font-size:14px;}#cal #top #s_fest{display:inline-block;width:115px;text-align:right;padding-right:15px;}#cal #fest_desc{height:24px;line-height:24px;padding-left:20px;color:#999;border-bottom:1px solid #ddd;}#cal ul#wk{margin:0;padding:0;height:25px}#cal ul#wk li{float:left;width:60px;text-align:center;line-height:25px;list-style:none}#cal ul#wk li b{font-weight:normal;color:#c60b02}#cal #cm{clear:left;border-top:1px solid #ddd;position:relative}#cal #cm .cell{position:absolute;width:60px;height:36px;text-align:center;}#cal #cm .cell .so{font:bold 16px arial;}#cal #cm .fa{background:url(http://www.baidu.com/aladdin/img/wannianli/bdop_calendar.png) no-repeat scroll -65px center transparent;width:55px;height:20px;line-height:20px;color:#fff;padding:8px 0px;font-size:14px;font-weight:bold;}#cal #cm .fc{width:16px;height:38px;_height:39px;text-align:center;writing-mode:tb-rl;color:#fff;position:absolute;}#cal #cm .fr{background:#ffb997;}#cal #cm .fw{background:#9cf;}#cal #bm{border-top:1px dotted #ddd;text-align:right;height:24px;line-height:24px;padding:0 15px 0 0;*padding-top:4px;}#cal #bm #hlink{color:7977ce}#cal #bm #bcal{font-size:12px;width:65px;height:20px;display:inline-block;line-height:20px;cursor:pointer;text-align:center;text-decoration:none;color:#000;background:url(http://www.baidu.com/aladdin/img/wannianli/bdop_calendar.png) no-repeat scroll 0px 0px transparent;}#cal #fd{display:none;position:absolute;border:1px solid #dddddf;background:#feffcd;padding:10px;line-height:21px;width:150px;_width:170px;}#cal #fd b{font-weight:normal;color:#c60a00}</style>");
	document
			.writeln( [
					'<div id="cal"><div id="top"><span id="top_cal"',
					v.isFestMode ? ' style="display:none;"' : "",
					'>公元&nbsp;<select></select>&nbsp;年&nbsp;<select></select>&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;农历<span></span>年&nbsp;[&nbsp;<span></span>年&nbsp;]</span><span id="top_fest"',
					!v.isFestMode ? ' style="display:none;"' : "",
					">",
					v.isFestMode && v.festival[v.currentFest - 1].title,
					'</span><span id="s_fest"',
					!v.festival ? ' style="display:none"' : "",
					'><select></select></span></div><div id="fest_desc"',
					!v.isFestMode ? ' style="display:none;"' : "",
					">",
					v.isFestMode && v.festival[v.currentFest - 1].desc,
					'</div><ul id="wk"><li><b>日</b></li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li><b>六</b></li></ul><div id="cm"></div><div id="bm"><a target="_blank" id="hlink" onmousedown="return c({\'fm\':\'alop\',\'title\':this.innerHTML,\'url\':this.href,\'p1\':al_c(this),\'p2\':1})" href="javascript:void(0)"',
					v.isFestMode ? ' style="display:none;"' : "",
					'>历史上的今天</a><a id="bcal" title="点击后跳转回日历"',
					!v.isFestMode ? ' style="display:none;"' : "",
					">回到日历</a></div></div>" ].join(""));
	var u = navigator.userAgent.indexOf("MSIE") != -1 && !window.opera;
	function n(B) {
		return document.getElementById(B)
	}
	function t(B) {
		return document.createElement(B)
	}
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
			return (O.getUTCDate())
		}
		function K(Q) {
			var O, P = 348;
			for (O = 32768; O > 8; O >>= 1) {
				P += (r[Q - 1900] & O) ? 1 : 0
			}
			return (P + I(Q))
		}
		function H(O) {
			return (j.charAt(O % 10) + h.charAt(O % 12))
		}
		function I(O) {
			if (N(O)) {
				return ((r[O - 1900] & 65536) ? 30 : 29)
			} else {
				return (0)
			}
		}
		function N(O) {
			return (r[O - 1900] & 15)
		}
		function L(P, O) {
			return ((r[P - 1900] & (65536 >> O)) ? 30 : 29)
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
				this.monCyl += 12
			}
			if (T < 0) {
				T += O;
				Q--;
				this.monCyl -= 12
			}
			this.year = Q;
			this.yearCyl = Q - 1864;
			P = N(Q);
			this.isLeap = false;
			for (Q = 1; Q < 13 && T > 0; Q++) {
				if (P > 0 && Q == (P + 1) && this.isLeap == false) {
					--Q;
					this.isLeap = true;
					O = I(this.year)
				} else {
					O = L(this.year, Q)
				}
				if (this.isLeap == true && Q == (P + 1)) {
					this.isLeap = false
				}
				T -= O;
				if (this.isLeap == false) {
					this.monCyl++
				}
			}
			if (T == 0 && P > 0 && Q == P + 1) {
				if (this.isLeap) {
					this.isLeap = false
				} else {
					this.isLeap = true;
					--Q;
					--this.monCyl
				}
			}
			if (T < 0) {
				T += O;
				--Q;
				--this.monCyl
			}
			this.month = Q;
			this.day = T + 1
		}
		function C(O) {
			return O < 10 ? "0" + O : O
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
				Q += a.charAt(O % 10)
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
			this.restDays = 1
		}
		if (J(this.solarYear, (this.solarMonth - 1) * 2) == M(E, "d")) {
			this.showInLunar = this.jieqi = k[(this.solarMonth - 1) * 2]
		}
		if (J(this.solarYear, (this.solarMonth - 1) * 2 + 1) == M(E, "d")) {
			this.showInLunar = this.jieqi = k[(this.solarMonth - 1) * 2 + 1]
		}
		if (this.showInLunar == "清明") {
			this.showInLunar = this.jieqi = "清明节";
			this.restDays = 1
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
			this.lunarFestival = this.lunarFestival.replace(/\*\d/, "")
		}
		if (this.lunarMonth == 12 && this.lunarDate == L(this.lunarYear, 12)) {
			this.lunarFestival = w["0100"];
			this.restDays = 1
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
			this.restDays = F[4] || 0
		}
	}
	var s = (function() {
		var D = {};
		function E(G) {
			return (((G % 4 === 0) && (G % 100 !== 0)) || (G % 400 === 0))
		}
		function C(G, H) { //某一年的各月天数
			return [ 31, (E(G) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30,
					31 ][H]
		}
		function B(H, I) {
			var G = new Date(H.solarYear, H.solarMonth - 1, H.solarDate);
			G.setDate(G.getDate() + I);
			return G
		}
		function F(J, P) {
			D.lines = 0;
			D.dateArray = [];
			var N = 0;
			var O = (v.isFestMode && J)
					|| new x(new Date(J.solarYear, J.solarMonth - 1, 1));
			var H = (v.isFestMode && (new x(B(P, 1))))
					|| new x(new Date(J.solarYear, J.solarMonth, 1));
			var R = (H.date - O.date) / 86400000;
			var L = O.solarWeekDay, G = 0;
			if (v.isFestMode) {
				if (J.solarMonth != P.solarMonth) {
					G = 7
				} else {
					if (J.solarWeekDay == 0) {
						L = 7
					}
				}
			}
			var K = L + G + R;
			D.lines = Math.ceil(K / 7);
			var M = new x(new Date());
			for ( var I = 0; I < K; I++) {
				if (N == 0) {
					N = O.restDays
				}
				O.isRestDay = N > 0 ? true : false;
				if (L-- > 0) {
					D.dateArray[I] = null;
					continue
				}
				if (v.isFestMode && J.solarMonth != O.solarMonth && G > 0) {
					G--;
					D.dateArray[I] = null;
					continue
				}
				if (!v.isFestMode && O.solarYear == M.solarYear
						&& O.solarMonth == M.solarMonth
						&& O.solarDate == M.solarDate) {
					O.isToday = true
				}
				D.dateArray[I] = O;
				O = new x(B(O, 1));
				if (N > 0) {
					N--
				} else {
					if (N < 0) {
						N++
					}
				}
			}
			if (v.isFestMode) {
				if (J.solarMonth == P.solarMonth) {
					D.dateArray[0] = {
						showMonth : true,
						solarMonth : J.solarMonth + "月"
					}
				} else {
					var Q = new Date(P.solarYear, P.solarMonth - 1, 1);
					D.dateArray[(Q - J.date) / 86400000
							+ (J.solarWeekDay + 7 - Q.getDay())] = {
						showMonth : true,
						solarMonth : P.solarMonth + "月"
					}
				}
			}
		}
		return {
			init : function(G, H) {
				F(G, H)
			},
			getJson : function() {
				return D
			}
		}
	})();
	var z = (function() {
		var B = n("top"), O = n("top_cal"), J = B
				.getElementsByTagName("SELECT"), L = J[0], C = J[1], E = O
				.getElementsByTagName("SPAN"), K = E[0], P = E[1], G = J[2], Q = n("bcal"), T = n("top_fest"), F = n("fest_desc"), N = n("hlink");
		function S(V) {
			L[V.solarYear - 1901].selected = true;
			C[V.solarMonth - 1].selected = true;
			var U = v.currentFest || 0;
			if (G[U]) {
				G[U].selected = true
			}
			K.innerHTML = V.ganzhiYear;
			P.innerHTML = V.shengxiao
		}
		function D() {
			var W = L.value;
			var U = C.value;
			var V = new x(new Date(W, U - 1, 1));
			s.init(V);
			p.draw();
			if (this == L) {
				V = new x(new Date(W, 3, 1));
				K.innerHTML = V.ganzhiYear;
				P.innerHTML = V.shengxiao
			}
		}
		function M() {
			v.currentFest = parseInt(G.value);
			if (v.currentFest == 0) {
				return false
			}
			v.isFestMode = true;
			var U = v.festival[v.currentFest - 1];
			T.innerHTML = U.title;
			O.style.display = "none";
			T.style.display = "inline-block";
			F.innerHTML = U.desc;
			F.style.display = "block";
			N.style.display = "none";
			Q.style.display = "inline-block";
			s.init(new x(new Date(U.showStartDay)), new x(
					new Date(U.showEndDay)));
			p.draw()
		}
		function H() {
			v.isFestMode = false;
			v.currentFest = 0;
			T.style.display = "none";
			F.style.display = "none";
			O.style.display = "inline-block";
			Q.style.display = "none";
			N.style.display = "inline-block";
			var U = new x(new Date());
			S(U);
			s.init(U);
			p.draw()
		}
		function I(W, aa) {
			var U = document.createDocumentFragment(), ac = document
					.createDocumentFragment(), ab = document
					.createDocumentFragment();
			for ( var Y = 1901; Y < 2050; Y++) {
				var X = t("OPTION");
				X.value = Y;
				X.innerHTML = Y;
				if (Y == W) {
					X.selected = "selected"
				}
				U.appendChild(X)
			}
			L.appendChild(U);
			for ( var Y = 1; Y < 13; Y++) {
				var X = t("OPTION");
				X.value = Y;
				X.innerHTML = Y;
				if (Y == aa) {
					X.selected = "selected"
				}
				ac.appendChild(X)
			}
			C.appendChild(ac);
			L.onchange = D;
			C.onchange = D;
			if (v.festival) {
				var X = t("OPTION"), Z = (v.festival[1] && ((new Date(
						v.festival[1].showEndDay)).getFullYear()))
						|| W;
				X.value = 0;
				X.innerHTML = Z + "年放假安排";
				ab.appendChild(X);
				for ( var Y = 0, V = v.festival.length; Y < V; Y++) {
					if (v.festival[Y]) {
						var X = t("OPTION");
						X.value = Y + 1;
						X.innerHTML = v.festival[Y].key;
						if (v.currentFest == (Y + 1)) {
							X.selected = "selected"
						}
						ab.appendChild(X)
					}
				}
				G.appendChild(ab);
				G.onchange = M
			}
		}
		function R(U) {
			I(U.solarYear, U.solarMonth);
			K.innerHTML = U.ganzhiYear;
			P.innerHTML = U.shengxiao;
			Q.onclick = H
		}
		return {
			init : function(U) {
				R(U)
			},
			reset : function(U) {
				S(U)
			}
		}
	})();
	var p = (function() {
		var C = n("cm");
		function B(R) {
			var W = s.getJson();
			var L = W.dateArray;
			C.style.height = W.lines * 40 + 2 + "px";
			C.innerHTML = "";
			var F = document.createDocumentFragment();
			var V = L.length;
			for ( var T = 0; T < V; T++) {
				var S = L[T];
				if (S == null) {
					continue
				}
				var D = t("DIV"), O, U = (T % 7) * 60, Q = Math.floor(T / 7) * 40 + 2;
				D.className = "cell";
				if (R) {
					if (R.solarDate === S.solarDate) {
						D.style.cssText = "border:1px solid #a5b9da;background:#c1d9ff"
					}
				} else {
					if (S.isToday) {
						D.style.cssText = "border:1px solid #a5b9da;background:#c1d9ff"
					}
				}
				if (S.showMonth && S.solarMonth) {
					D.className = "cell fa";
					D.innerHTML = S.solarMonth
				} else {
					var K = t("DIV");
					K.className = "so";
					if (!v.isFestMode) {
						K.style.color = (S.isRestDay) ? "#c60b02" : "#313131"
					} else {
						K.style.color = (S.isRestDay) ? "#f4cecc" : "#d6d6d6"
					}
					K.innerHTML = S.solarDate;
					D.appendChild(K);
					var X = t("DIV");
					X.style.color = (!v.isFestMode) ? "#666" : "#e0e0e0";
					X.innerHTML = S.showInLunar;
					D.appendChild(X);
					if (v.isFestMode) {
						var N = (T == 0) ? null : L[T - 1], J = (T == V - 1) ? null
								: L[T + 1];
						if ((S.solarWeekDay == 0 || S.solarWeekDay == 6)
								&& !S.isRestDay) {
							D.style.cssText = "border:1px solid #9cf;background:#d7ebff";
							K.style.color = "#313131";
							X.style.color = "#666";
							if (!N || N.isRestDay || N.solarWeekDay != 6) {
								O = t("DIV");
								O.className = "fc fw";
								O.innerHTML = "上班";
								O.style.left = U + "px";
								O.style.top = Q + "px";
								var H = S.showInLunar.length;
								if (H >= 3) {
									if (S.solarWeekDay != 0) {
										O.style.left = u ? (U - 8) + "px"
												: (U - 5) + "px"
									}
									if (H > 3) {
										X.innerHTML = S.showInLunar
												.substr(0, 3)
									}
								}
								if (S.solarWeekDay == 6) {
									D.style.borderLeft = "0px none"
								}
							}
						}
						if (S.isRestDay) {
							var M = false, G = false;
							_sfr = false;
							if (S.solarWeekDay != 0 && S.solarWeekDay != 6) {
								M = true
							} else {
								if (S.solarWeekDay == 0) {
									var I;
									if (J
											&& J.isRestDay
											|| A.indexOf(S.showInLunar) != -1
											|| (N && A.indexOf(N.showInLunar) != -1)
											|| ((I = (T > 1) ? L[T - 2] : null) && I.isRestDay)) {
										M = true;
										G = true
									}
								} else {
									if (S.solarWeekDay == 6) {
										var P;
										if ((N && N.isRestDay)
												|| A.indexOf(S.showInLunar) != -1
												|| (J && A
														.indexOf(J.showInLunar) != -1)
												|| ((P = (T > V - 3) ? null
														: L[T + 2]) && P.isRestDay)) {
											M = true;
											_sfr = true
										}
									}
								}
							}
							if (M) {
								D.style.cssText = "border-top:1px solid #ffb997;border-bottom:1px solid #ffb997;background:#ffdece";
								K.style.color = "#c60b02";
								X.style.color = "#666";
								if (G) {
									D.style.borderLeft = "1px solid #ffb997"
								}
								if (_sfr) {
									D.style.borderRight = "1px solid #ffb997"
								}
								if (!N || !N.isRestDay) {
									D.style.borderLeft = "1px solid #ffb997";
									O = t("DIV");
									O.className = "fc fr";
									O.innerHTML = "放假";
									O.style.left = U + "px";
									O.style.top = Q + "px";
									var H = S.showInLunar.length;
									if (H >= 3) {
										if (S.solarWeekDay != 0) {
											O.style.left = u ? (U - 8) + "px"
													: (U - 5) + "px"
										}
										if (H > 3) {
											X.innerHTML = S.showInLunar.substr(
													0, 3)
										}
									}
									if (S.solarWeekDay == 6) {
										D.style.borderLeft = "0px none"
									}
								}
								if (!J || !J.isRestDay) {
									D.style.borderRight = "1px solid #ffb997"
								}
							}
						}
					}
					D.onmouseover = (function(Y) {
						return function(Z) {
							d.show( {
								dateIndex : Y,
								cell : this
							})
						}
					})(T);
					D.onmouseout = function() {
						d.hide()
					}
				}
				D.style.left = U + "px";
				D.style.top = Q + "px";
				F.appendChild(D);
				if (O) {
					F.appendChild(O)
				}
			}
			C.appendChild(F);
			var E = t("DIV");
			E.id = "fd";
			C.appendChild(E);
			d.init(E)
		}
		return {
			draw : function(D) {
				B(D)
			}
		}
	})();
	var d = (function() {
		var B;
		function E(K, I) {
			if (arguments.length > 1) {
				var H = /([.*+?^=!:${}()|[\]\/\\])/g, F = "{"
						.replace(H, "\\$1"), J = "}".replace(H, "\\$1");
				var G = new RegExp("#" + F + "([^" + F + J + "]+)" + J, "g");
				if (typeof (I) == "object") {
					return K.replace(G, function(L, N) {
						var M = I[N];
						return typeof (M) == "undefined" ? "" : M
					})
				}
			}
			return K
		}
		function C(H) {
			var G = s.getJson().dateArray[H.dateIndex];
			var F = H.cell;
			var I = "#{solarYear}&nbsp;年&nbsp;#{solarMonth}&nbsp;月&nbsp;#{solarDate}&nbsp;日&nbsp;#{solarWeekDayInChinese}";
			I += "<br><b>农历&nbsp;#{lunarMonthInChinese}月#{lunarDateInChinese}</b>";
			I += "<br>#{ganzhiYear}年&nbsp;#{ganzhiMonth}月&nbsp;#{ganzhiDate}日";
			if (G.solarFestival || G.lunarFestival || G.jieqi) {
				I += "<br><b>#{lunarFestival} #{solarFestival} #{jieqi}</b>"
			}
			B.innerHTML = E(I, G);
			B.style.top = F.offsetTop + F.offsetHeight - 5 + "px";
			B.style.left = F.offsetLeft + F.offsetWidth - 5 + "px";
			B.style.display = "block"
		}
		function D() {
			B.style.display = "none"
		}
		return {
			show : function(F) {
				C(F)
			},
			hide : function() {
				D()
			},
			init : function(F) {
				B = F
			}
		}
	})();
	var f = (function() {
		var C = n("hlink");
		function B(D) {
			C.href = "http://baike.baidu.com/list-php/dispose/searchword.php?word="
					+ D.solarMonth + "%D4%C2" + D.solarDate + "%C8%D5&pic=1"
		}
		return {
			setLink : function(D) {
				B(D)
			}
		}
	})();
	var l = new x(new Date());
	var g = (function() {
		if (v.year && v.month) {
			var C = v.day || 1, B = new Date( [ v.year, v.month, C ].join("/"));
			if ((B.toString().toLowerCase() !== "invalid date")
					&& (Object.prototype.toString.apply(B).toLowerCase() === "[object date]")) {
				return new x(B)
			} else {
				return l
			}
		} else {
			if (v.isFestMode) {
				return new x(new Date(
						v.festival[v.currentFest - 1].showStartDay))
			} else {
				return l
			}
		}
	})();
	z.init(g);
	if (u && window.attachEvent) {
		window.attachEvent("onload", function() {
			z.reset(g)
		})
	}
	if (v.isFestMode) {
		s.init(g, new x(new Date(v.festival[v.currentFest - 1].showEndDay)));
		p.draw()
	} else {
		if (v.isMonthMode) {
			s.init(g);
			p.draw()
		} else {
			s.init(g);
			p.draw(g)
		}
	}
	f.setLink(l)
})();
