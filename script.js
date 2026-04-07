function themHang() {
    let ten = document.getElementById("ten").value;
    let sl = document.getElementById("sl").value;
    let gia = document.getElementById("gia").value;

    if (ten === "" || sl === "" || gia === "") {
        alert("Nhập thiếu rồi kìa");
        return;
    }

    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    kho.push({ten, sl, gia});

    localStorage.setItem("kho", JSON.stringify(kho));

    loadData();
}

function xoaHang(index) {
    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    kho.splice(index, 1);

    localStorage.setItem("kho", JSON.stringify(kho));

    loadData();
}

function loadData() {
    let kho = JSON.parse(localStorage.getItem("kho")) || [];

    let ds = document.getElementById("ds");
    ds.innerHTML = "";

    kho.forEach((item, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.ten} - SL: ${item.sl} - Giá: ${item.gia}
            <button onclick="xoaHang(${index})">Xóa</button>
        `;

        ds.appendChild(li);
    });
}

loadData();
