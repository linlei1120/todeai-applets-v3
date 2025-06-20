module.exports = {
	printWidth: 180, // 指定换行的行长，默认80。设置为180可以避免不必要的换行。
	tabWidth: 2, // 指定每个缩进级别的空格数，默认2。通常情况下，2个空格的缩进更为常见。
	useTabs: true, // 用制表符而不是空格缩进，默认false。大多数项目更倾向于使用空格缩进。
	semi: true, // 在语句末尾添加分号，默认true。设置为true表示在语句末尾添加分号。
	singleQuote: false, // 使用单引号而不是双引号，默认false。如果你希望使用单引号，可以设置为true。
	quoteProps: "preserve", // object对象中key值是否加引号，默认as-needed。只有在必要时才添加引号。
	jsxSingleQuote: false, // 在 JSX 中使用单引号而不是双引号，默认false。如果你希望在 JSX 中使用双引号，可以保持此值为false。
	trailingComma: "none", // 取消尾随逗号，默认es5。设置为"none"表示不添加尾随逗号。
	bracketSpacing: true, // 对象字面量中括号之间的空格，默认true。在对象字面量中添加空格可以提高可读性。
	bracketSameLine: false, // 将>放在多行 HTML（HTML、JSX、Vue、Angular）元素最后一行的末尾，默认false。保持默认值可以提高代码的可读性。
	arrowParens: "always", // 在唯一的箭头函数参数周围包含括号，默认always。这有助于避免一些潜在的语法错误。
	proseWrap: "preserve", // 超过最大宽度是否换行，默认preserve。保持默认值可以避免不必要的换行。
	htmlWhitespaceSensitivity: "ignore", // 指定 HTML、Vue、Angular 和 Handlebars 的全局空格敏感度，默认ignore。忽略多余的空格可以提高代码的整洁度。
	vueIndentScriptAndStyle: false, // vue文件script和style标签中是否缩进，默认false。保持默认值可以避免不必要的缩进。
	endOfLine: "lf", // 行尾换行符，默认lf。使用LF换行符可以确保跨平台兼容性。
	embeddedLanguageFormatting: "auto", // 控制 Prettier 是否格式化嵌入在文件中的引用代码，默认auto。保持默认值可以让 Prettier 自动处理嵌入代码的格式化。
	singleAttributePerLine: false, // 在 HTML、Vue 和 JSX 中强制执行每行单个属性，默认false。保持默认值可以避免不必要的换行。
	parsers: {
		".nvue": "vue", // 将.nvue文件视为Vue文件进行格式化
		".ux": "vue", // 将.ux文件视为Vue文件进行格式化
		".uvue": "vue", // 将.uvue文件视为Vue文件进行格式化
		".uts": "typescript" // 将.uts文件视为TypeScript文件进行格式化
	}
};