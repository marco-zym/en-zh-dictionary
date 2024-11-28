
var fl;
var sl;
var word;
//声明列表对象变量

fetch("fl.json")
    .then(response => {
        if (!response.ok) {
        throw new Error("无法加载 JSON 文件：" + response.status);
        }
        return response.json(); // 解析响应为 JSON 数据
    })
    .then(data => {
        fl = data;
    })
    .catch(error => {
        console.error("加载或解析 JSON 文件时出错:", error);
    });

fetch("sl.json")
    .then(response => {
        if (!response.ok) {
        throw new Error("无法加载 JSON 文件：" + response.status);
        }
        return response.json(); // 解析响应为 JSON 数据
    })
    .then(data => {
        sl = data;
    })
    .catch(error => {
        console.error("加载或解析 JSON 文件时出错:", error);
    });

fetch("word.json")
    .then(response => {
        if (!response.ok) {
        throw new Error("无法加载 JSON 文件：" + response.status);
        }
        return response.json(); // 解析响应为 JSON 数据
    })
    .then(data => {
        word = data;
    })
    .catch(error => {
        console.error("加载或解析 JSON 文件时出错:", error);
    });
//解析JSON文件并转换为JavaScript对象

var letter1Select = document.getElementById("letter1");
var letter2Select = document.getElementById("letter2");
var wordSelect = document.getElementById("word");
//获取选择框

var letter1Selected;
var letter2Selected;
var wordSelected;
var firstTwoLetters;
//声明选中项变量

var openURL;
//声明打开网址变量

letter1Select.innerHTML = "";
letter2Select.innerHTML = "";
wordSelect.innerHTML = "";
//设置三个选择框的值为空

fl.forEach(optionText => {
    const option = document.createElement("option"); // 创建一个 <option> 元素
    option.text = optionText; // 设置选项的显示文本
    option.value = optionText; // 可选：将值设置为与文本相同
    letter1Select.add(option); // 将选项添加到选择框
});
letter1Selected = letter1Select.options[letter1Select.selectedIndex].text;
//设置选择框1的列表和获取选中项

sl.letter1Selected.forEach(optionData => {
    const option = document.createElement("option"); // 创建 <option> 元素
    option.text = optionData.text; // 显示文本
    option.value = optionData.value; // 选项值
    letter2Select.add(option); // 添加到 <select>
});
letter2Selected = letter2Select.options[letter2Select.selectedIndex].text;
//设置选择框2的列表和获取选中项

firstTwoLetters = letter1Selected + letter2Selected;
word.firstTwoLetters.forEach(optionData => {
    const option = document.createElement("option"); // 创建 <option> 元素
    option.text = optionData.text; // 显示文本
    option.value = optionData.value; // 选项值
    letter2Select.add(option); // 添加到 <select>
});
//设置前两个字母和单词选择框选项

wordSelected = wordSelect.options[wordSelect.selectedIndex].text;
openURL = "https://marco-zym.github.io/en-zh-dictionary/word/?word=" + wordSelected;
window.open(openURL, _self)