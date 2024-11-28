// 声明全局变量
let fl, sl, word;

// 获取选择框元素
const letter1Select = document.getElementById("letter1");
const letter2Select = document.getElementById("letter2");
const wordSelect = document.getElementById("word");

// 初始化选择框为空
letter1Select.innerHTML = "<option value=''>请选择</option>";
letter2Select.innerHTML = "<option value=''>请选择</option>";
wordSelect.innerHTML = "<option value=''>请选择</option>";

// 加载 JSON 文件的通用函数
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`无法加载 JSON 文件：${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`加载或解析 JSON 文件时出错 (${url}):`, error);
    }
}

// 加载所有 JSON 数据
async function loadData() {
    [fl, sl, word] = await Promise.all([
        loadJSON("fl.json"),
        loadJSON("sl.json"),
        loadJSON("word.json")
    ]);

    if (fl) populateLetter1(); // 如果 fl 成功加载，填充 letter1 的选项
}

// 填充 letter1 选择框
function populateLetter1() {
    fl.forEach(optionText => {
        const option = document.createElement("option");
        option.text = optionText;
        option.value = optionText;
        letter1Select.add(option);
    });

    letter1Select.addEventListener("change", handleLetter1Change);
}

// 当 letter1 改变时更新 letter2
function handleLetter1Change() {
    const letter1Selected = letter1Select.value;

    // 清空 letter2 和 word 选择框
    letter2Select.innerHTML = "<option value=''>请选择</option>";
    wordSelect.innerHTML = "<option value=''>请选择</option>";

    if (sl && sl[letter1Selected]) {
        sl[letter1Selected].forEach(optionData => {
            const option = document.createElement("option");
            option.text = optionData.text;
            option.value = optionData.value;
            letter2Select.add(option);
        });

        letter2Select.addEventListener("change", handleLetter2Change);
    }
}

// 当 letter2 改变时更新 word
function handleLetter2Change() {
    const letter1Selected = letter1Select.value;
    const letter2Selected = letter2Select.value;
    const firstTwoLetters = letter1Selected + letter2Selected;

    // 清空 word 选择框
    wordSelect.innerHTML = "<option value=''>请选择</option>";

    if (word && word[firstTwoLetters]) {
        word[firstTwoLetters].forEach(optionData => {
            const option = document.createElement("option");
            option.text = optionData.text;
            option.value = optionData.value;
            wordSelect.add(option);
        });
    }
}

// 当 word 改变时打开对应的链接
wordSelect.addEventListener("change", () => {
    const wordSelected = wordSelect.value;
    if (wordSelected) {
        const openURL = `https://marco-zym.github.io/en-zh-dictionary/word/?word=${wordSelected}`;
        window.open(openURL, "_self");
    }
});

// 开始加载数据
loadData();
