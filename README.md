# 中安食品安全培训网


## 文档说明
> 本文档针对线上真实网站进行讲解，侧重方向为具体功能点实现，插件的使用，解决学员在接手项目后如何快速开发以及各类插件的提供使用（正常简单的功能将会省略），最后会提供源码

## 项目名称
> [中安汇金](http://www.chinafhse.org/)

## 项目依赖
+ jquery
+ swiper
+ pagination
+ additional-methods

## 首页重要要点
+ 广告栏轮播
+ 师资团队轮播
+ 登录表单验证

- - -

swiper：[链接地址](http://www.swiper.com.cn/api/index.html)
 
swiper轮播插件使用原则：不要去记每个参数，通过对项目需求的分析，参照文档找出最适合的JS初始化，以及样式的修改，多好看初始化完毕的HTML结构以及上面挂载的CSS类，通过修改常CSS类进行更改默认外观样式

``` JS
	//广告栏轮播参数详解
	+function($){
		new Swiper('.swiper-container',{
			//轮播自动开始
			autoplay:5000,
			//初始化分页器，轮播底部的小圆点
			pagination:'.swiper-pagination',
			//开启分页器功能，通过分页器可以控制轮播
			paginationClickable:true,
			//初始化上一页按钮
			prevButton:'.swiper-button-prev',
			//初始化下一页按钮
			nextButton:'.swiper-button-next',
			//修改轮播默认样式(从右向左滑动)，改为淡入淡出
			effect:'fade',
			//关闭淡出，也是默认值，可省略不写
			fade:{crossFade:fase},
			//用户操作过轮播图后继续工作，改为true则停止
			autoplayDisableOnInteraction:false,
			//开启环路，让轮播图看起来是循环的
			loop:true,
		});
		//师资团队参数详解
		new Swiper('.swiper-team',{
			//网格分布中当前页面显示的项目个数
			slidePerView:4,
			//开启轮播
			loop: true,
			//初始化上一页按钮
			prevButton: '.swiper-team-button-prev',
			//初始化下一页按钮
			nextButton: '.swiper-team-button-next',
		});
	}(jQuery);
```

jquery-validation：[github地址](https://github.com/jquery-validation/jquery-validation) | [官方文档地址](https://jqueryvalidation.org/documentation)

``` JS
	//首页登录验证详解
	+function($){
		//开启对form表单的验证初始化
		$('form').validate({
			//开启对form中元素失去焦点验证
			onfocusout: function(element) {
				//每当元素失去焦点时候，onfocusout都会捕捉到，element就是失去焦点的元素，
				//然后对当前失去焦点的元素进行验证，验证依据是rules中的规则
				$(element).valid();
			},
			//关闭键盘按下就进行的验证
			onkeyup: false,
			//验证规则
			rules: {
				//对用户名进行设置验证规则
				username: {
					//表明当前元素必填
					required: true,
					//这部分是为了教学用，实际开发登录是不会进行直接校验的
					//开启异步模式，与后台进行交互，后台必须返回true或者false
					remote: {
						//后台处理程序
						url: "test.php", 
						//数据发送方式
						type: "post", 
						//接受数据格式 
						dataType: "json", 
						//要传递的数据  
						data: { 
							username: function() {
								return $("#username").val();
							}
						}
					}
				},
				//对密码进行设置验证规则
				password: "required"
			},
			//验证失败后的显示的信息
			messages: {
				//设置用户名验证失败显示的信息
				username: {
					required: '请输入用户名',
					remote: '用户名错误'
				},
				//设置密码验证失败后显示的信息
				password: "请输入密码"
			}
		});
	}(jQuery)
```

## 课程中心/师资团队/新闻法规/在线查询要点

+ 分页功能
+ 选项卡功能

pagination：[github地址](https://github.com/esimakin/twbs-pagination)

``` JS
	+function($){
		//对id为paginationWrap的容器进行初始化
		$('#paginationWrap').twbsPagination({
			//页码总数，需要从后台查询数据库后进行传递
			totalPages: 35,
			//显示几项页码，按照需求自定义
			visiblePages: 7,
			//插件内定义的方法
			onPageClick: function(event, page) {
				$('#page-content').text('Page ' + page);
			}
		});
	}(jQuery)
```

选项卡

``` HTML
	<!--tab选项卡-->
	<!--通过选项卡中绑定的data-role属性来获取对应的列表项，控制其显示和隐藏-->
	<ul class="news-title fl">
		<li class="on" data-role=".news-detail-industry">
			<a href="javascript:;">行业新闻</a>
		</li>
		<li data-role=".news-detail-teaching">
			<a href="javascript:;">教学公告</a>
		</li>
		<li data-role=".news-detail-policy">
			<a href="javascript:;">政策法规</a>
		</li>
		<li data-role=".news-detail-local">
			<a href="javascript:;">地方新闻</a>
		</li>
	</ul>
	<div class="news-detail">
		<ul class="news-detail-industry">
			<!--详细列表项-->
		</ul>
		<ul class="news-detail-teaching">
			<!--详细列表项-->
		</ul>
		<ul class="news-detail-policy">
			<!--详细列表项-->
		</ul>
		<ul class="news-detail-local">
			<!--详细列表项-->
		</ul>
	</div>
```

``` JS
	+function($){
		//对每个选项卡上绑定点击事件
		$('.news .news-title li').on('click', function() {
			//修改选项卡的样式
			$(this).addClass('on').siblings().removeClass('on');
			//通过data-role属性值，设置选项卡对应的列表项显示，其他隐藏
			$(this.dataset.role).show().siblings().hide();
		});
	}(jQuery)
```

小结：选用插件是为了加速开发，但要考虑到是否符合我们当前的需求，如果一个项目一味的通过各种各样的插件来进行功能的开发，最终只会加大静态资源的大小，占据下载资源，拖慢访问速度，建议慎重选择。

另外，基于jQuery的插件，更多情况加建议直接到github上面搜索，要不就通过官方推荐的插件，如果依旧无法解决项目中遇到的需求，那么可以到[jQuery插件库](http://www.jq22.com/)进行搜索下载，使用前先看文档中该插件对浏览器的支持程度，测试后再使用！

## 在线查询/登录/注册重点

+ 表单验证

本章节通过对**注册页的企业用户**实例详解jquery-validation，解决文档中描述不详细，对初学者不友好的情况。

``` JS
	+function($){
	
		//用户表单验证(添加手机自定义验证)
		$.validator.addMethod('isMobile', function(value, element) {
			let length = value.length;
			let mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
			return(length == 11 && mobile.test(value));
		}, '请正确填写您的手机号码');
		
		//用户表单验证(添加身份证自定义验证)
		$.validator.addMethod('isIDCard', function(value, element) {
			let IDCard = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
			return IDCard.test(value);
		}, '请正确填写您的身份证号码');
		
		//用户表单验证(添加邮箱自定义验证)
		$.validator.addMethod('isEmail', function(value, element) {
			let Email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
			return Email.test(value);
		}, '请正确填写您的邮箱地址');
		
		//开启对id为enterpriseForm的验证初始化
		$('#enterpriseForm').validate({
		
			//表示当输入框失去焦点的时候验证该文本框的内容
			onfocusout: function(element) {
				//失去焦点进行验证的时候先将错误信息删除，避免用户第一次输入成功，
				//然后对输入内容进行修改造成的样式bug问题
				$(element).siblings().filter('label.error').remove();
				//对复选框不通过失去焦点验证，使用点击验证
				if(!$(element).is(":checkbox")) {
					$(element).valid();
				};
			},
			
			//针对复选框进行验证
			onclick: function(element) {
				//因为错误信息在验证成功后添加到当前验证信息的后面，
				//所以需要通过过滤后一个元素是否带有error类，来进行删除
				$(element).siblings().filter('label.error').remove();
				$(element).valid();
			},
			
			//表示关闭键盘按下就立即验证文本框内容
			onkeyup: false,
			
			//对省、市、区三个下拉列表框进行编组，进行统一的错误提示
			//此处需要通过官方推荐的additional-methods进行强化此处的功能
			//此处先进行编组，页面体现在error提示的位置统一了
			groups: {
				range: 'province city area'
			},
			
			//表示当前文本框验证完毕后执行的回调函数
			//意思是每一个元素在验证成功后就进行调用，不是整个表单验证完毕
			//此处我们通过对验证成功的元素添加样式并修改显示的内容
			success: function(label) {
				label.addClass('success').text('✔');
			},
			
			//设置每个字段的验证规则
			rules: {
				user: {
					//非空
					required: true,
					//开启自定义邮件规则的校验
					isEmail: true
				},
				
				enterprise: 'required',
				
				phone: {
					required: true,
					minlength: 11,
					//开启自定义手机号规则的校验
					isMobile: true
				},
				captcha: {
					required: true,
					//异步校验
					remote: {
						url: 'captcha.php',
						type: 'post',
						dataType: 'json',
						data: {
							//官方文档规定：data数据的获取必须通过function来进行执行，否则不生效
							captcha: function() {
								return $('#individualFormCaptcha').val();
							}
						}
					}
				},
				
				pass: {
					required: true,
					minlength: 6
				},
				
				again: {
					required: true,
					//必须和idWieenterpriseFormPassword中内容相同
					//校验重复密码
					equalTo: "#enterpriseFormPassword"
				},
				
				idCard: {
					required: true,
					//开启自定义身份证规则的校验
					isIDCard: true
				},
				
				name: 'required',
				
				checkbox: 'required',
				
				//此处使用到了additional-method中的方法，对编组的元素进行管理
				//groups统一了error提示的管理
				//require_from_group进行对3个select的管理，必须全部为true，结果才为true
				//其中的3是可以修改的，3代表验证通过需要几个为true
				province: {
					required: true,
					//将省、市、区进行编组，进行管理，并且三个组员信息必须都满足
					require_from_group: [3, 'select']
				},
				
				city: {
					required: true,
					require_from_group: [3, 'select']
				},
				
				area: {
					required: true,
					require_from_group: [3, 'select']
				}
			},
			
			//错误信息提示
			messages: {
				user: {
					required: '请输入您的邮箱',
					email: '邮箱格式不正确'
				},
				enterprise: '请输入您的企业名称',
				phone: {
					required: '请填写手机号',
					minlength: '请填写11位手机号'
				},
				captcha: {
					required: '请填写验证码',
					remote: '验证码错误'
				},
				pass: {
					required: '请输入密码',
					minlength: '请输入6位以上密码'
				},
				again: {
					required: '请再次输入密码',
					equalTo: '两次输入密码不同，请重新输入'
				},
				idCard: '请填写您的身份证号码',
				name: '请输入您的姓名',
				checkbox: '请阅读《服务条款》',
				province: '请选择完整区域信息',
				city: '请选择完整区域信息',
				area: '请选择完整区域信息',
			}
		});
	}(jQuery)
```

## 在线客服

+ CSS3解决滑动效果
+ 接入QQ在线客服系统

``` HTML
	<div class="online">
		<div class="enter"></div>
		<div class="panel">
			<h4><span class="close fr">X</span>在线客服</h4>
			<p>客服咨询<i class="zixun">月月</i></p>
			<p>技术支持<i class="zhichi">哲哲</i></p>
			<p>技术支持<i class="zhichi">克克</i></p>
		</div>
	</div>
```

``` CSS
	/*
	* 先将面板定位到页面最右侧
	*/
	.online {
	position: fixed;
	width: 40px;
	height: 160px;
	background: #348eea;
	right: 0;
	top: 50%;
	z-index: 1001;
	transform: translateY(-50%);
	border-radius: 3px 0 0 3px;
	cursor: pointer;
	}
	
	/*
	* 初始化面板信息，定位right到可视窗口外部，通过transition监视所有属性的变化
	* 通过落空类来解决对right属性的修改
	*/
	.online .panel {
		background: #fff;
		z-index: 1100;
		width: 124px;
		height: 210px;
		border: 1px solid #348eea;
		border-radius: 3px;
		position: absolute;
		padding: 0 10px;
		top: 0;
		right: -150px;
		transition: all 0.5s;
	}
	
	/*
	* 设置fade定位位置
	*/
	.online .panel.fade {
		right: 0;
	}
	
```

``` JS
	+function($){
		//在线客服功能，通过点击事件对panel面板进行设置落空类
		$('.online .enter').on('click', function() {
			$('.online .panel').addClass('fade');
		});
		$('.online .close').on('click', function() {
			$('.online .panel').removeClass('fade');
		})
	}(jQuery)
```

接入QQ在线客服：[QQ推广](http://shang.qq.com/v3/widget.html)

在页面设置相关样式，然后直接将生成的代码复制粘贴到项目中即可，如没有特殊要求，直接使用即可

``` HTML
	<!--QQ推广生成的代码，直接到放到项目中就可以调用本地QQ来进行与客服联系了-->
	<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1324466276&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1324466276:51" alt="点击这里给我发消息" title="点击这里给我发消息" /></a>
```

## 关于我们要点

+ 选项卡切换更改面包屑内容
+ 高德地图接入

选项卡切换同时更改面包屑内容

``` JS
	+function($){
		//关于我们选项卡功能实现
		$('.about .about-title li').on('click', function() {
			$(this).addClass('on').siblings().removeClass('on');
			$(this.dataset.role).show().siblings().hide();
			//缓存当前点击的选项卡内容
			let currentPage = $(this).children()[0].text;
			//找到对应的标签并设置内容
			$('.breadcrumb p a')[1].text = currentPage;
		});
	}(jQuery)
```

高德地图介入：关于地图中需要的经纬度，可以通过[拾取坐标系统](http://api.map.baidu.com/lbsapi/getpoint/index.html)或者[在线地图经纬度查询](http://www.gpsspg.com/maps.htm)来进行获取

``` JS
	+function($){
		//初始化高德地图，HTML中容器一定要设置id属性，new AMap.Map('容器id'，{配置项})
		var map = new AMap.Map('map', {
			//地图方法比例
			zoom: 20,
			//展示地图的中心点
			center: [116.355375, 39.890723]
		});
		//mark标记初始化
		var marker = new AMap.Marker({
			//标记在地图中的位置
			position: new AMap.LngLat(116.355375, 39.890723),
			//标记偏移位置
			offset: new AMap.Pixel(-9, -31),
			//鼠标移动到标记上显示的文字
			title: '中安汇金',
			//初始化一个标记
			icon: new AMap.Icon({
				//设置标记的大小
				size: new AMap.Size(128, 128)
			}),
			//将标记挂载到地图上面
			map: map
		});
	}(jQuery)
```

## 课程中心
+ 分享功能

分享功能连接生成地址：[bShare](http://www.bshare.cn/)

在线生成HTML代码，直接粘贴到项目中即可

``` HTML
	<!--在线生成的代码如下-->
	<!--分享功能 start-->
	<div id="share" class="none">
		<div class="bshare-custom">
			<a title="分享到QQ空间" class="bshare-qzone"></a>
			<a title="分享到新浪微博" class="bshare-sinaminiblog"></a>
			<a title="分享到人人网" class="bshare-renren"></a>
			<a title="分享到腾讯微博" class="bshare-qqmb"></a>
			<a title="分享到网易微博" class="bshare-neteasemb"></a>
			<a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a>
		</div>
		<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=1&amp;lang=zh"></script>
		<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
	</div>
	<!--分享功能 end-->
```

## 个人中心上传图片预览
+ window.FileReader

```HTML
	<form action="/" method="post" enctype="multipart/form-data">
			<p>
				<label for="">个人头像</label>
				<img id="personal" />
			</p>
			<p>上传头像
				<!--通过data-target来与img标签进行关联-->
				<input type="file" name="personal" id="" value="" data-target="#personal" />
			</p>
			<p>
				<label for="">免冠照</label>
				<img id="photo" />
			</p>
			<p>上传免冠照
				<!--通过data-target来与img标签进行关联-->
				<input type="file" name="photo" id="" value="" data-target="#photo" />
			</p>
			<p class="btn"><button>保存</button></p>
		</form>
```

```JS
	//照片上传预览功能
	//给上传文本框注册change事件
	$('input[type=file]').on('change', function() {
		//获取上传的文件对象
		var file = this.files[0];
		//缓存当前的this指针
		var _this = this;
		//检测浏览器是否支持FileReader
		if(window.FileReader) {
			//实例化FileReader
			var fr = new FileReader();
			//注册onloadend事件，图片上传完毕触发
			fr.onloadend = function(e) {
				//通过自有属性获取到img标签，进行设置标签的src路径，可以在事件对象中获取到src
				$(_this.dataset.target).attr('src', e.target.result);
			}
			//通过FileReader将文件编码成Data URL形式，内嵌到网页中
			fr.readAsDataURL(file);
		}
	});
```