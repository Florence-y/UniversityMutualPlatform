# CORS bug
>问题：post能用json发送数据，但是get不能发json数据

>原因：
    前端：
        get的数据是拼接在url上的，如果数据用json.stringify（）转换成json对象，就会在url上多出{},引起格式错误

> post 因为数据是放在请求体上，所以可以用json来传输数据，没问题

> 解决办法：
    get请求的数据直接写一普通js对象即可

>后端
    原因及解决办法：只有post可以获取输入流来获取json字符串，但是get请求不行，所以需要另外处理，根据表单参数名获取map对象来进行交互。

