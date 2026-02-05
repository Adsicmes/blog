import type {
	ExpressiveCodeConfig,
	FriendLinksConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "我瞎写的来看什么？",
	subtitle: "别看了别看了 o((>ω< ))o",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 0, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "/Konachan.com - 398670 sample.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "konachan.net", // Credit text to be displayed
			url: "https://konachan.net/post/show/398670/2girls-braids-brown_eyes-brown_hair-fang-gloves-gr", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
		  src: '/Smiling_Devil_Emoji.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		}
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Links,
		{
			name: "GitHub",
			url: "https://github.com/Adsicmes", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const friendLinksConfig: FriendLinksConfig = {
	links: [
		// 在此添加友链，例如：
		// { name: "示例博客", url: "https://example.com", description: "一段简短描述" },
		{
			name: "imwqqA",
			url: "https://www.imwqqa.com/",
			description: "frz的大学好友，一个数学和算法痴，想做游戏图形算法",
		},
		{
			name: "Usagi no Niku",
			url: "https://turou.fun/",
			description: "兔肉的随笔，打osu认识的网友，舞萌吃程序员一个",
		},{
			name: "DAYGood_Time",
			url: "https://space.bilibili.com/13481949",
			description: "osu认识的网友。不是day为什么让我挂个b站链接啊？",
		},
		{
			name: "Remik1r3n Blog",
			url: "https://blog.remiki.ren/",
			description: "瑞米，大学期间打舞萌认识的朋友，一起开了私人音游窝。究极死板理工男",
		}
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "FrZ",
	bio: "",
	links: [
		// {
		// 	name: "Homepage",
		// 	icon: "material-symbols:home-rounded", // Visit https://icones.js.org/ for icon codes
		// 	// You will need to install the corresponding icon set if it's not already included
		// 	// `pnpm add @iconify-json/<icon-set-name>`
		// 	url: "https://twitter.com",
		// },
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/87421321",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
