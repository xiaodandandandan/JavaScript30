# 彩虹渐变画板 颜色渐变 笔触大小渐变

## 实现功能
- mousedown 画笔生效
- mousemove 画笔颜色及大小渐变
- mouseup 停止画图
- mouseout 停止画图

## canvas使用
<canvas> 元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容
canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。
<canvas> 元素有一个叫做 getContext() 的方法，这个方法是用来获得渲染上下文和它的绘画功能。
getContext()接受一个参数，即上下文的类型。目前仅支持2D

CanvasRenderingContext2D.strokeStyle 是 Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是 #000 (black)。
CanvasRenderingContext2D.lineJoin 是 Canvas 2D API 用来设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性 有以下三个值
- round
- bevel
- miter
CanvasRenderingContext2D.lineCap 是 Canvas 2D API 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：butt（方形, round（圆形 and square（方形。默认值是 butt。

HSL
- hue 色相
- Saturation 饱和度
- Lightness 明度

CanvasRenderingContext2D.beginPath() 是 Canvas 2D API 通过清空子路径列表开始一个新路径的方法。 当你想创建一个新的路径时，调用此方法。
CanvasRenderingContext2D.moveTo() 是 Canvas 2D API 将一个新的子路径的起始点移动到(x，y)坐标的方法。
CanvasRenderingContext2D.lineTo() 是 Canvas 2D API 使用直线连接子路径的终点到x，y坐标的方法（并不会真正地绘制）。

## 如何使画笔颜色及大小渐变
设置初始hsl值，同时只改变色相值实现颜色变化，到达最大值时重置
鼠标移动时改变绘制路径的宽度linewidth，到达边界值变小或变大