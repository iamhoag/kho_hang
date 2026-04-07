function themHang() {
    let ten = document.getElementById("ten").value;
    let sl = document.getElementById("sl").value;
    let gia = document.getElementById("gia").value;

    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    kho.push({ten, sl, gia});
    localStorage.setItem("kho", JSON.stringify(kho));

    loadData();
}

function loadData() {
    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    kho.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.ten} - SL: ${item.sl} - Giá: ${item.gia}`;
        ds.appendChild(li);
    });
}

loadData();
