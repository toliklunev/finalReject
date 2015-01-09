finalReject
===========

finalReject — plugin that displays, in older versions of Internet Explorer, the plug with a proposal to upgrade your browser. The plug is superimposed over the site as popup, and may be closed by user. After closing, it does not disappear forever, and is attached to the top of the browser window, and to be displayed in the minimized view.

That simple to use, all you need its just add this code at the <head> tag:

```
<!--[if lt IE 9]>
	<link rel="stylesheet" href="/reject/reject.css" media="all" />
	<script type="text/javascript" src="/reject/reject.min.js"></script>
<![endif]-->
```