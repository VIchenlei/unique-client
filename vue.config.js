let path = require('path')
let glob = require('glob') // 用于筛选文件
const a = {
  'index.html': 'src/main.ts',
  'index-admin.html': 'src/main-admin.ts',
  'index-alarm.html': 'src/main-alarm.ts',
}
// 工厂函数 - 配置pages实现多页面获取某文件夹下的html与js
function handleEntry(entry) {
 let entries = {}
 let entryBaseName = ''
 let entryPathName = ''
 let entryTemplate = ''
 let applicationName = ''
 console.log(entry)
 glob.sync(entry).forEach(item => {
  entryBaseName = path.basename(item, path.extname(item))
  entryTemplate = item.split('/').splice(-3)
  entryPathName = entryBaseName // 正确输出js和html的路径
  entries[entryPathName] = {
   entry: a[entryTemplate[2]],
   template: 'pubilc/' + entryTemplate[2],
   title: entryTemplate[2],
   filename: entryTemplate[2]
  }
 })
 
 return entries
}
 
let pages = handleEntry('./public/*.html')
// 以下开始配置
module.exports = {
 // 入口设置
 pages,
//  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}